import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma } from '../../generated/prisma/client.js';
import { CreateBomDto, BomDetailDto } from '../dto/create-bom.dto.js';
import { CheckBomStockDto } from '../dto/check-bom-stock.dto.js';
import { NewVersionBomDto, UpdateBomDto } from '../dto/update-bom.dto.js';

@Injectable()
export class BomApi {
  constructor(private readonly prisma: PrismaService) {}

  // Helper validate và chuẩn bị dữ liệu nguyên vật liệu
  private async validateAndPrepareDetails(detailsDto: BomDetailDto[]) {
    const details: {
      materialId: string;
      unitId: string;
      quantity: Prisma.Decimal;
    }[] = [];

    const usedMaterials = new Set<string>();

    for (const item of detailsDto) {
      const materialCode = item.materialCode.trim();

      if (usedMaterials.has(materialCode)) {
        throw new BadRequestException(`Nguyên vật liệu bị trùng: ${materialCode}`);
      }

      usedMaterials.add(materialCode);

      const material = await this.prisma.material.findUnique({
        where: { code: materialCode },
      });

      const unit = await this.prisma.unit.findUnique({
        where: { name: item.unitName.trim() },
      });

      if (!material || material.status !== 'ACTIVE') {
        throw new BadRequestException(
          `Nguyên vật liệu không hợp lệ hoặc đã ngừng hoạt động: ${materialCode}`,
        );
      }

      if (!unit || unit.status !== 'ACTIVE') {
        throw new BadRequestException(`Đơn vị tính không hợp lệ: ${item.unitName}`);
      }

      if (unit.id !== material.unitId && unit.baseUnitId !== material.unitId) {
        throw new BadRequestException(
          `Đơn vị tính '${item.unitName}' không phù hợp với NVL '${material.name}'`,
        );
      }

      const quantity = new Prisma.Decimal(item.quantity);

      if (quantity.lte(0)) {
        throw new BadRequestException(`Số lượng NVL '${material.name}' phải lớn hơn 0`);
      }

      details.push({
        materialId: material.id,
        unitId: unit.id,
        quantity,
      });
    }

    return details;
  }

  // 1. Tạo công thức BOM
  async createBom(dto: CreateBomDto) {
    const code = dto.code.trim();
    const productCode = dto.productCode.trim();
    const productName = dto.productName?.trim() || null;

    if (!code || !productCode) {
      throw new BadRequestException('Mã BOM hoặc mã món ăn không hợp lệ');
    }

    if (new Prisma.Decimal(dto.outputQuantity).lte(0)) {
      throw new BadRequestException('Sản lượng đầu ra phải lớn hơn 0');
    }

    const preparedDetails = await this.validateAndPrepareDetails(dto.details);

    try {
      const bom = await this.prisma.$transaction(async (tx) => {
        await this.syncProduct(tx, productCode, {
          productName: productName || productCode,
          category: dto.category,
          description: dto.description,
          price: dto.price,
        });

        return tx.bom.create({
          data: {
            code,
            productCode,
            productName,
            outputQuantity: new Prisma.Decimal(dto.outputQuantity),
            details: {
              create: details,
            },
          },
          include: {
            product: true,
            details: {
              include: {
                material: true,
                unit: true,
              },
            },
          },
        });
      });

      return {
        message: 'Tạo công thức BOM thành công',
        data: {
          code: bom.code,
          productCode: bom.productCode,
          productName: bom.productName || bom.product.name,
          version: bom.version,
          outputQuantity: bom.outputQuantity.toString(),
          status: bom.status,
          details: bom.details.map((item) => ({
            materialCode: item.material.code,
            materialName: item.material.name,
            unitName: item.unit.name,
            quantity: item.quantity.toString(),
          })),
        },
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Mã BOM hoặc phiên bản này đã tồn tại');
      }
      throw error;
    }
  }

  // 2. Lấy danh sách công thức BOM (hỗ trợ lọc theo productCode & status)
  async getBoms(productCode?: string, status?: string) {
    const where: Prisma.BomWhereInput = {};

    if (productCode && productCode.trim() !== '' && productCode !== 'Tất cả') {
      where.productCode = { equals: productCode.trim(), mode: 'insensitive' };
    }

    if (status && status.trim() !== '' && status !== 'Tất cả') {
      where.status = status.trim().toUpperCase();
    }

    const boms = await this.prisma.bom.findMany({
      where,
      include: {
        product: true,
        details: {
          include: {
            material: true,
            unit: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 200,
    });

    return {
      message: 'Lấy danh sách BOM thành công',
      data: boms.map((bom) => ({
        code: bom.code,
        productCode: bom.productCode,
        productName: bom.productName || bom.product.name,
        version: bom.version,
        outputQuantity: bom.outputQuantity.toString(),
        status: bom.status,
        createdAt: bom.createdAt,
        category: bom.product.category,
        description: bom.product.description,
        price: bom.product.price.toString(),

        totalMaterials: bom.details.length,
        details: bom.details.map((item) => ({
          materialCode: item.material.code,
          materialName: item.material.name,
          unitName: item.unit.name,
          quantity: item.quantity.toString(),
        })),
      })),
    };
  }

  // 3. Tra cứu công thức theo productCode (Lấy tất cả các phiên bản của 1 món ăn)
  async getBomsByProduct(productCode: string) {
    const code = productCode.trim().toUpperCase();

    const product = await this.prisma.product.findUnique({
      where: { code },
    });

    const boms = await this.prisma.bom.findMany({
      where: { productCode: code },
      include: {
        product: true,
        details: {
          include: {
            material: true,
            unit: true,
          },
        },
      },
      orderBy: { version: 'desc' },
    });

    return {
      message: `Danh sách công thức của món '${code}'`,
      product: product
        ? {
            code: product.code,
            name: product.name,
            category: product.category,
            price: Number(product.price),
            unit: product.unit,
            imageUrl: product.imageUrl,
          }
        : null,
      totalVersions: boms.length,
      activeVersion: boms.find((b) => b.status === 'ACTIVE')?.version ?? null,
      data: boms.map((bom) => ({
        code: bom.code,
        productCode: bom.productCode,
        version: bom.version,
        outputQuantity: bom.outputQuantity.toString(),
        status: bom.status,
        isCurrentActive: bom.status === 'ACTIVE',
        createdAt: bom.createdAt,
        totalMaterials: bom.details.length,
        details: bom.details.map((item) => ({
          materialCode: item.material.code,
          materialName: item.material.name,
          unitName: item.unit.name,
          quantity: item.quantity.toString(),
        })),
      })),
    };
  }

  // 4. Xem chi tiết công thức BOM theo mã
  async getBomByCode(code: string) {
    const bom = await this.prisma.bom.findUnique({
      where: { code: code.trim() },
      include: {
        product: true,
        details: {
          include: {
            material: true,
            unit: true,
          },
        },
        productionOrders: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          select: {
            code: true,
            status: true,
            quantity: true,
            createdAt: true,
          },
        },
      },
    });

    if (!bom) {
      throw new NotFoundException(`Không tìm thấy công thức BOM với mã '${code}'`);
    }

    return {
      message: 'Lấy chi tiết BOM thành công',
      data: {
        code: bom.code,
        productCode: bom.productCode,
        productName: bom.productName || bom.product.name,
        version: bom.version,
        outputQuantity: bom.outputQuantity.toString(),
        status: bom.status,
        createdAt: bom.createdAt,
        category: bom.product.category,
        description: bom.product.description,
        price: bom.product.price.toString(),
        versions: await this.prisma.bom.findMany({
          where: { productCode: bom.productCode },
          orderBy: { version: 'desc' },
          select: {
            code: true,
            version: true,
            status: true,
            createdAt: true,
          },
        }),

        totalMaterials: bom.details.length,
        recentOrders: bom.productionOrders.map((o) => ({
          code: o.code,
          status: o.status,
          quantity: o.quantity.toString(),
          createdAt: o.createdAt,
        })),
        details: bom.details.map((item) => ({
          materialCode: item.material.code,
          materialName: item.material.name,
          unitName: item.unit.name,
          quantity: item.quantity.toString(),
        })),
      },
    };
  }

  async updateBom(code: string, dto: UpdateBomDto) {
    const bom = await this.prisma.bom.findUnique({
      where: { code: code.trim() },
      include: { details: true },
    });

    if (!bom) {
      throw new NotFoundException('Không tìm thấy công thức BOM');
    }

    if (bom.status !== 'ACTIVE') {
      throw new ConflictException(
        'Công thức đã ngừng áp dụng. Hãy tạo version mới.',
      );
    }

    const outputQuantity = new Prisma.Decimal(dto.outputQuantity);
    if (outputQuantity.lte(0)) {
      throw new BadRequestException('Sản lượng phải lớn hơn 0');
    }

    const details = await this.resolveDetails(dto.details);
    const openOrders = await this.prisma.productionOrder.count({
      where: {
        bomId: bom.id,
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
      },
    });

    if (openOrders > 0 && !this.sameRecipe(bom, outputQuantity, details)) {
      throw new BadRequestException(
        'Công thức đang có lệnh sản xuất chưa xong. Hãy tạo version mới thay vì sửa định mức.',
      );
    }

    let updated;
    try {
      updated = await this.prisma.$transaction(async (tx) => {
        await this.syncProduct(tx, bom.productCode, dto);

        if (!this.sameRecipe(bom, outputQuantity, details)) {
          await tx.bomDetail.deleteMany({ where: { bomId: bom.id } });
          await tx.bomDetail.createMany({
            data: details.map((item) => ({
              bomId: bom.id,
              materialId: item.materialId,
              unitId: item.unitId,
              quantity: item.quantity,
            })),
          });
        }

        return tx.bom.update({
          where: { id: bom.id },
          data: {
            productName: dto.productName.trim(),
            outputQuantity,
          },
          include: {
            product: true,
            details: { include: { material: true, unit: true } },
          },
        });
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException(
          'Định mức đã gắn với lệnh sản xuất. Hãy tạo version mới.',
        );
      }

      throw error;
    }

    return {
      message: 'Cập nhật món và BOM thành công',
      data: this.presentBom(updated),
    };
  }

  async createNewVersion(code: string, dto: NewVersionBomDto) {
    const source = await this.prisma.bom.findUnique({
      where: { code: code.trim() },
    });

    if (!source) {
      throw new NotFoundException('Không tìm thấy công thức BOM');
    }

    const outputQuantity = new Prisma.Decimal(dto.outputQuantity);
    if (outputQuantity.lte(0)) {
      throw new BadRequestException('Sản lượng phải lớn hơn 0');
    }

    const details = await this.resolveDetails(dto.details);
    const latest = await this.prisma.bom.aggregate({
      where: { productCode: source.productCode },
      _max: { version: true },
    });
    const version = (latest._max.version ?? source.version) + 1;
    const nextCode = await this.nextBomCode(
      dto.code?.trim(),
      source.productCode,
      version,
    );

    try {
      const bom = await this.prisma.$transaction(async (tx) => {
        await this.syncProduct(tx, source.productCode, dto);

        return tx.bom.create({
          data: {
            code: nextCode,
            productCode: source.productCode,
            productName: dto.productName.trim(),
            version,
            outputQuantity,
            status: 'ACTIVE',
            details: {
              create: details.map((item) => ({
                material: { connect: { id: item.materialId } },
                unit: { connect: { id: item.unitId } },
                quantity: item.quantity,
              })),
            },
          },
          include: {
            product: true,
            details: { include: { material: true, unit: true } },
          },
        });
      });

      return {
        message: 'Đã tạo version mới của món',
        data: this.presentBom(bom),
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Mã BOM hoặc phiên bản đã tồn tại');
      }

      throw error;
    }
  }

  async deactivateBom(code: string) {
    const bom = await this.prisma.bom.findUnique({
      where: { code: code.trim() },
    });

    if (!bom) {
      throw new NotFoundException('Không tìm thấy công thức BOM');
    }

    if (bom.status !== 'ACTIVE') {
      throw new ConflictException('Công thức đã ngừng áp dụng');
    }

    const openOrders = await this.prisma.productionOrder.count({
      where: {
        bomId: bom.id,
        status: { notIn: ['COMPLETED', 'CANCELLED'] },
      },
    });

    if (openOrders > 0) {
      throw new ConflictException(
        'Còn lệnh sản xuất chưa hoàn thành. Hãy xử lý lệnh trước khi ngừng áp dụng.',
      );
    }

    const updated = await this.prisma.bom.updateMany({
      where: { id: bom.id, status: 'ACTIVE' },
      data: { status: 'INACTIVE' },
    });

    if (updated.count !== 1) {
      throw new ConflictException('Công thức đã được xử lý');
    }

    return {
      message: 'Đã ngừng áp dụng công thức',
      data: { code: bom.code, status: 'INACTIVE' },
    };
  }
// Kiểm tra nguyên vật liệu theo BOM
  async checkBomStock(dto: CheckBomStockDto) {
    const bom = await this.prisma.bom.findUnique({
      where: { code: dto.bomCode.trim() },
      include: {
        details: {
          include: {
            material: {
              include: { unit: true },
            },
            unit: true,
          },
        },
      },
    });

    if (!bom) {
      throw new NotFoundException('Không tìm thấy BOM');
    }

    if (
      bom.status !== 'ACTIVE' ||
      bom.outputQuantity.lte(0) ||
      bom.details.length === 0
    ) {
      throw new BadRequestException('Công thức BOM không hoạt động hoặc không hợp lệ');
    }

    const branch = await this.prisma.branch.findUnique({
      where: { code: dto.branchCode.trim() },
    });

    if (!branch) {
      throw new NotFoundException('Không tìm thấy chi nhánh');
    }

    const productionQuantity = new Prisma.Decimal(dto.productionQuantity);

    if (productionQuantity.lte(0)) {
      throw new BadRequestException('Số lượng sản xuất phải lớn hơn 0');
    }

    const materials = [];
    let canProduce = true;

    const formatter = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const today = formatter.format(new Date());

    for (const item of bom.details) {
      if (item.material.status !== 'ACTIVE') {
        throw new BadRequestException(
          `NVL không hoạt động: ${item.material.code}`,
        );
      }

      let factor = new Prisma.Decimal(1);

      if (item.unitId !== item.material.unitId) {
        if (
          item.unit.baseUnitId !== item.material.unitId ||
          item.unit.conversionFactor.lte(0)
        ) {
          throw new BadRequestException(
            `Đơn vị không phù hợp: ${item.material.code}`,
          );
        }

        factor = item.unit.conversionFactor;
      }

      const required = item.quantity
        .mul(factor)
        .mul(productionQuantity)
        .div(bom.outputQuantity)
        .toDecimalPlaces(3, Prisma.Decimal.ROUND_UP);

      const balances = await this.prisma.materialBalance.findMany({
        where: {
          location: {
            branchId: branch.id,
          },
          materialLot: {
            materialId: item.materialId,
            status: 'ACTIVE',
          },
        },
        select: {
          quantity: true,
          materialLot: {
            select: {
              expiryDate: true,
            },
          },
        },
      });

      let available = new Prisma.Decimal(0);

      for (const balance of balances) {
        const expiry = balance.materialLot.expiryDate;

        if (expiry && formatter.format(expiry) < today) {
          continue;
        }

        available = available.plus(balance.quantity);
      }

      const missing = Prisma.Decimal.max(
        required.minus(available),
        new Prisma.Decimal(0),
      );

      const status = missing.gt(0) ? 'SHORTAGE' : 'ENOUGH';

      if (missing.gt(0)) {
        canProduce = false;
      }

      materials.push({
        materialCode: item.material.code,
        materialName: item.material.name,
        unitName: item.material.unit.name,
        required: required.toString(),
        available: available.toString(),
        missing: missing.toString(),
        status,
      });
    }

    return {
      message: 'Kiểm tra tồn kho BOM thành công',
      data: {
        bomCode: bom.code,
        productCode: bom.productCode,
        branchCode: branch.code,
        productionQuantity: productionQuantity.toString(),
        canProduce,
        materials,
      },
    };
  }

  private async resolveDetails(items: UpdateBomDto['details']) {
    const details: {
      materialId: string;
      unitId: string;
      quantity: Prisma.Decimal;
    }[] = [];
    const usedMaterials = new Set<string>();

    for (const item of items) {
      const materialCode = item.materialCode.trim();

      if (usedMaterials.has(materialCode)) {
        throw new BadRequestException('Nguyên vật liệu bị trùng');
      }

      usedMaterials.add(materialCode);

      const material = await this.prisma.material.findUnique({
        where: { code: materialCode },
      });
      const unit = await this.prisma.unit.findUnique({
        where: { name: item.unitName.trim() },
      });

      if (!material || material.status !== 'ACTIVE') {
        throw new BadRequestException(
          `Nguyên vật liệu không hợp lệ: ${materialCode}`,
        );
      }

      if (!unit || unit.status !== 'ACTIVE') {
        throw new BadRequestException('Đơn vị tính không hợp lệ');
      }

      if (unit.id !== material.unitId && unit.baseUnitId !== material.unitId) {
        throw new BadRequestException('Đơn vị tính không phù hợp');
      }

      const quantity = new Prisma.Decimal(item.quantity);

      if (quantity.lte(0)) {
        throw new BadRequestException('Số lượng NVL phải lớn hơn 0');
      }

      details.push({ materialId: material.id, unitId: unit.id, quantity });
    }

    return details;
  }

  private sameRecipe(
    bom: {
      outputQuantity: Prisma.Decimal;
      details: {
        materialId: string;
        unitId: string;
        quantity: Prisma.Decimal;
      }[];
    },
    outputQuantity: Prisma.Decimal,
    details: {
      materialId: string;
      unitId: string;
      quantity: Prisma.Decimal;
    }[],
  ) {
    if (
      !bom.outputQuantity.equals(outputQuantity) ||
      bom.details.length !== details.length
    ) {
      return false;
    }

    const current = [...bom.details].sort((a, b) =>
      a.materialId.localeCompare(b.materialId),
    );
    const next = [...details].sort((a, b) =>
      a.materialId.localeCompare(b.materialId),
    );

    return current.every(
      (item, index) =>
        item.materialId === next[index].materialId &&
        item.unitId === next[index].unitId &&
        item.quantity.equals(next[index].quantity),
    );
  }

  private async syncProduct(
    tx: Prisma.TransactionClient,
    productCode: string,
    dto: {
      productName?: string | null;
      category?: string;
      description?: string;
      price?: string;
    },
  ) {
    const name = dto.productName?.trim() || productCode;
    const existing = await tx.product.findUnique({
      where: { code: productCode },
    });

    if (!existing) {
      await tx.product.create({
        data: {
          code: productCode,
          name,
          category: dto.category?.trim() || 'Món ăn',
          price: new Prisma.Decimal(dto.price || 0),
          unit: 'phần',
          description: dto.description?.trim() || null,
        },
      });
      return;
    }

    await tx.product.update({
      where: { code: productCode },
      data: {
        name,
        ...(dto.category?.trim() ? { category: dto.category.trim() } : {}),
        ...(dto.description !== undefined
          ? { description: dto.description.trim() || null }
          : {}),
        ...(dto.price ? { price: new Prisma.Decimal(dto.price) } : {}),
      },
    });
  }

  private async nextBomCode(
    requested: string | undefined,
    productCode: string,
    version: number,
  ) {
    const fallback = `${productCode}-V${version}`.slice(0, 50);
    const code = requested || fallback;
    const taken = await this.prisma.bom.findUnique({ where: { code } });

    if (!taken) {
      return code;
    }

    const generated = `${productCode}-V${version}-${Date.now()}`.slice(0, 50);
    return generated;
  }

  private presentBom(bom: {
    code: string;
    productCode: string;
    productName: string | null;
    version: number;
    outputQuantity: Prisma.Decimal;
    status: string;
    product: { name: string };
    details: {
      quantity: Prisma.Decimal;
      material: { code: string; name: string };
      unit: { name: string };
    }[];
  }) {
    return {
      code: bom.code,
      productCode: bom.productCode,
      productName: bom.productName || bom.product.name,
      version: bom.version,
      outputQuantity: bom.outputQuantity.toString(),
      status: bom.status,
      details: bom.details.map((item) => ({
        materialCode: item.material.code,
        materialName: item.material.name,
        unitName: item.unit.name,
        quantity: item.quantity.toString(),
      })),
    };
  }
}
