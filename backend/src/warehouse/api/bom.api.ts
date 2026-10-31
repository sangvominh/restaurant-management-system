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
import { UpdateBomDto } from '../dto/update-bom.dto.js';
import { CreateBomVersionDto } from '../dto/create-bom-version.dto.js';

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

    if (!code || !productCode) {
      throw new BadRequestException('Mã BOM hoặc mã món ăn không hợp lệ');
    }

    if (new Prisma.Decimal(dto.outputQuantity).lte(0)) {
      throw new BadRequestException('Sản lượng đầu ra phải lớn hơn 0');
    }

    const preparedDetails = await this.validateAndPrepareDetails(dto.details);

    try {
      const bom = await this.prisma.bom.create({
        data: {
          code,
          productCode,
          outputQuantity: new Prisma.Decimal(dto.outputQuantity),
          version: 1,
          status: 'ACTIVE',
          details: {
            create: preparedDetails.map((d) => ({
              material: { connect: { id: d.materialId } },
              unit: { connect: { id: d.unitId } },
              quantity: d.quantity,
            })),
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

      return {
        message: 'Tạo công thức BOM thành công',
        data: {
          code: bom.code,
          productCode: bom.productCode,
          productName: bom.product?.name ?? null,
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
      orderBy: [
        { productCode: 'asc' },
        { version: 'desc' },
      ],
      take: 100,
    });

    return {
      message: 'Lấy danh sách BOM thành công',
      data: boms.map((bom) => ({
        code: bom.code,
        productCode: bom.productCode,
        productName: bom.product?.name ?? null,
        productCategory: bom.product?.category ?? null,
        productPrice: bom.product ? Number(bom.product.price) : null,
        productImage: bom.product?.imageUrl ?? null,
        version: bom.version,
        outputQuantity: bom.outputQuantity.toString(),
        status: bom.status,
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

  // 3. Tra cứu công thức theo productCode (Lấy tất cả các phiên bản của 1 món ăn)
  async getBomsByProduct(productCode: string) {
    const code = productCode.trim().toUpperCase();

    const product = await this.prisma.product.findUnique({
      where: { code },
    });

    const boms = await this.prisma.bom.findMany({
      where: { productCode: code },
      include: {
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
        productName: bom.product?.name ?? null,
        productCategory: bom.product?.category ?? null,
        productPrice: bom.product ? Number(bom.product.price) : null,
        productUnit: bom.product?.unit ?? 'phần',
        productImage: bom.product?.imageUrl ?? null,
        version: bom.version,
        outputQuantity: bom.outputQuantity.toString(),
        status: bom.status,
        createdAt: bom.createdAt,
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

  // 5. Cập nhật / Sửa công thức BOM
  async updateBom(code: string, dto: UpdateBomDto) {
    const bomCode = code.trim();

    const bom = await this.prisma.bom.findUnique({
      where: { code: bomCode },
      include: {
        productionOrders: {
          where: { status: { in: ['CONFIRMED', 'IN_PROGRESS'] } },
        },
      },
    });

    if (!bom) {
      throw new NotFoundException(`Không tìm thấy công thức BOM '${bomCode}'`);
    }

    // Nghiệp vụ: Cảnh báo nếu đang có lệnh sản xuất chạy
    if (dto.details && bom.productionOrders.length > 0) {
      throw new BadRequestException(
        `Không thể sửa trực tiếp danh sách NVL của BOM '${bomCode}' vì đang có ${bom.productionOrders.length} lệnh sản xuất đang chạy. Vui lòng tạo Version mới.`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      const updateData: Prisma.BomUpdateInput = {};

      if (dto.outputQuantity) {
        const outQty = new Prisma.Decimal(dto.outputQuantity);
        if (outQty.lte(0)) {
          throw new BadRequestException('Sản lượng đầu ra phải lớn hơn 0');
        }
        updateData.outputQuantity = outQty;
      }

      if (dto.status) {
        updateData.status = dto.status;
      }

      // Nếu có cập nhật danh sách nguyên vật liệu
      if (dto.details && dto.details.length > 0) {
        const preparedDetails = await this.validateAndPrepareDetails(dto.details);

        // Xóa các chi tiết cũ
        await tx.bomDetail.deleteMany({
          where: { bomId: bom.id },
        });

        // Tạo các chi tiết mới
        await tx.bomDetail.createMany({
          data: preparedDetails.map((d) => ({
            bomId: bom.id,
            materialId: d.materialId,
            unitId: d.unitId,
            quantity: d.quantity,
          })),
        });
      }

      const updated = await tx.bom.update({
        where: { code: bomCode },
        data: updateData,
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

      return {
        message: 'Cập nhật công thức BOM thành công',
        data: {
          code: updated.code,
          productCode: updated.productCode,
          version: updated.version,
          outputQuantity: updated.outputQuantity.toString(),
          status: updated.status,
          details: updated.details.map((item) => ({
            materialCode: item.material.code,
            materialName: item.material.name,
            unitName: item.unit.name,
            quantity: item.quantity.toString(),
          })),
        },
      };
    });
  }

  // 6. Tạo Version mới cho công thức BOM
  async createNextVersion(code: string, dto: CreateBomVersionDto) {
    const baseBom = await this.prisma.bom.findUnique({
      where: { code: code.trim() },
      include: {
        details: {
          include: {
            material: true,
            unit: true,
          },
        },
      },
    });

    if (!baseBom) {
      throw new NotFoundException(`Không tìm thấy công thức BOM gốc '${code}'`);
    }

    // Tìm version lớn nhất hiện tại của món ăn này
    const maxBom = await this.prisma.bom.findFirst({
      where: { productCode: baseBom.productCode },
      orderBy: { version: 'desc' },
    });

    const nextVersion = (maxBom?.version ?? baseBom.version) + 1;

    // Tự sinh mã BOM mới nếu không truyền
    const cleanPrefix = baseBom.code.replace(/-v\d+$/i, '');
    const newBomCode = dto.newCode?.trim() || `${cleanPrefix}-v${nextVersion}`;

    // Kiểm tra trùng mã
    const existingCode = await this.prisma.bom.findUnique({
      where: { code: newBomCode },
    });
    if (existingCode) {
      throw new ConflictException(`Mã BOM mới '${newBomCode}' đã tồn tại.`);
    }

    // Xác định chi tiết NVL: nếu dto có truyền thì dùng, nếu không thì clone từ BOM gốc
    let detailsToCreate: { materialId: string; unitId: string; quantity: Prisma.Decimal }[] = [];

    if (dto.details && dto.details.length > 0) {
      detailsToCreate = await this.validateAndPrepareDetails(dto.details);
    } else {
      detailsToCreate = baseBom.details.map((d) => ({
        materialId: d.materialId,
        unitId: d.unitId,
        quantity: d.quantity,
      }));
    }

    const outputQuantity = dto.outputQuantity
      ? new Prisma.Decimal(dto.outputQuantity)
      : baseBom.outputQuantity;

    if (outputQuantity.lte(0)) {
      throw new BadRequestException('Sản lượng đầu ra phải lớn hơn 0');
    }

    return this.prisma.$transaction(async (tx) => {
      // Nếu có tùy chọn ngừng áp dụng các phiên bản cũ
      if (dto.deactivateOldVersion ?? true) {
        await tx.bom.updateMany({
          where: { productCode: baseBom.productCode, status: 'ACTIVE' },
          data: { status: 'ARCHIVED' },
        });
      }

      // Tạo BOM phiên bản mới
      const newBom = await tx.bom.create({
        data: {
          code: newBomCode,
          productCode: baseBom.productCode,
          version: nextVersion,
          outputQuantity,
          status: 'ACTIVE',
          details: {
            create: detailsToCreate.map((d) => ({
              material: { connect: { id: d.materialId } },
              unit: { connect: { id: d.unitId } },
              quantity: d.quantity,
            })),
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

      return {
        message: `Đã tạo phiên bản mới v${nextVersion} cho công thức '${baseBom.productCode}' thành công`,
        data: {
          code: newBom.code,
          productCode: newBom.productCode,
          version: newBom.version,
          outputQuantity: newBom.outputQuantity.toString(),
          status: newBom.status,
          previousVersion: baseBom.version,
          details: newBom.details.map((item) => ({
            materialCode: item.material.code,
            materialName: item.material.name,
            unitName: item.unit.name,
            quantity: item.quantity.toString(),
          })),
        },
      };
    });
  }

  // 7. Ngừng áp dụng / Thay đổi trạng thái BOM (ACTIVE <-> INACTIVE / ARCHIVED)
  async updateStatus(code: string, status: string) {
    const bomCode = code.trim();
    const newStatus = status.trim().toUpperCase();

    const bom = await this.prisma.bom.findUnique({
      where: { code: bomCode },
    });

    if (!bom) {
      throw new NotFoundException(`Không tìm thấy công thức BOM '${bomCode}'`);
    }

    return this.prisma.$transaction(async (tx) => {
      // Nếu kích hoạt (ACTIVE) công thức này, chuyển các phiên bản khác của cùng món sang ARCHIVED/INACTIVE
      if (newStatus === 'ACTIVE') {
        await tx.bom.updateMany({
          where: {
            productCode: bom.productCode,
            id: { not: bom.id },
            status: 'ACTIVE',
          },
          data: { status: 'INACTIVE' },
        });
      }

      const updated = await tx.bom.update({
        where: { code: bomCode },
        data: { status: newStatus },
      });

      return {
        message:
          newStatus === 'INACTIVE' || newStatus === 'ARCHIVED'
            ? `Đã ngừng áp dụng công thức BOM '${bomCode}'`
            : `Đã kích hoạt áp dụng công thức BOM '${bomCode}'`,
        data: {
          code: updated.code,
          productCode: updated.productCode,
          version: updated.version,
          status: updated.status,
        },
      };
    });
  }

  // 8. Kiểm tra nguyên vật liệu theo BOM
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
}
