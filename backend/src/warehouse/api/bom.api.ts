import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma } from '../../generated/prisma/client.js';
import { CreateBomDto } from '../dto/create-bom.dto.js';
import { CheckBomStockDto } from '../dto/check-bom-stock.dto.js';

@Injectable()
export class BomApi {
  constructor(private readonly prisma: PrismaService) {}

  async createBom(dto: CreateBomDto) {
    // 1. Kiểm tra thông tin BOM
    const code = dto.code.trim();
    const productCode = dto.productCode.trim();

    if (!code || !productCode) {
      throw new BadRequestException('Mã BOM hoặc sản phẩm không hợp lệ');
    }

    if (new Prisma.Decimal(dto.outputQuantity).lte(0)) {
      throw new BadRequestException('Sản lượng phải lớn hơn 0');
    }

    // 2. Kiểm tra từng nguyên vật liệu
    const details: {
      material: { connect: { id: string } };
      unit: { connect: { id: string } };
      quantity: Prisma.Decimal;
    }[] = [];

    const usedMaterials = new Set<string>();

    for (const item of dto.details) {
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

      details.push({
        material: { connect: { id: material.id } },
        unit: { connect: { id: unit.id } },
        quantity,
      });
    }

    // 3. Lưu BOM và các nguyên vật liệu
    try {
      const bom = await this.prisma.bom.create({
        data: {
          code,
          productCode,
          outputQuantity: new Prisma.Decimal(dto.outputQuantity),
          details: {
            create: details,
          },
        },
        include: {
          details: {
            include: {
              material: true,
              unit: true,
            },
          },
        },
      });

      // 4. Trả kết quả
      return {
        message: 'Tạo BOM thành công',
        data: {
          code: bom.code,
          productCode: bom.productCode,
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
        throw new ConflictException('Mã BOM hoặc phiên bản đã tồn tại');
      }

      throw error;
    }
  }

  async getBoms() {
    // 1. Lấy danh sách công thức BOM
    const boms = await this.prisma.bom.findMany({
      include: {
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
      take: 50,
    });

    // 2. Trả kết quả
    return {
      message: 'Lấy danh sách BOM thành công',
      data: boms.map((bom) => ({
        code: bom.code,
        productCode: bom.productCode,
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

  async getBomByCode(code: string) {
    // 1. Tìm công thức BOM theo mã
    const bom = await this.prisma.bom.findUnique({
      where: { code },
      include: {
        details: {
          include: {
            material: true,
            unit: true,
          },
        },
      },
    });

    // 2. Kiểm tra BOM có tồn tại không
    if (!bom) {
      throw new NotFoundException('Không tìm thấy công thức BOM');
    }

    // 3. Trả kết quả
    return {
      message: 'Lấy chi tiết BOM thành công',
      data: {
        code: bom.code,
        productCode: bom.productCode,
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
      },
    };
  }

  async checkBomStock(dto: CheckBomStockDto) {
    // 1. Tìm công thức BOM
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
      throw new BadRequestException('Công thức BOM không hợp lệ');
    }

    // 2. Kiểm tra chi nhánh
    const branch = await this.prisma.branch.findUnique({
      where: { code: dto.branchCode.trim() },
    });

    if (!branch) {
      throw new NotFoundException('Không tìm thấy chi nhánh');
    }

    // 3. Số lượng cần sản xuất
    const productionQuantity = new Prisma.Decimal(dto.productionQuantity);

    if (productionQuantity.lte(0)) {
      throw new BadRequestException('Số lượng sản xuất phải lớn hơn 0');
    }

    // 4. Chuẩn bị kiểm tra các nguyên vật liệu
    const materials = [];
    let canProduce = true;

    // Ngày hiện tại theo giờ Việt Nam
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

      // 5. Quy đổi về đơn vị tồn kho của NVL
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

      // 6. Tính số lượng nguyên vật liệu cần
      const required = item.quantity
        .mul(factor)
        .mul(productionQuantity)
        .div(bom.outputQuantity)
        .toDecimalPlaces(3, Prisma.Decimal.ROUND_UP);

      // 7. Lấy tồn kho theo chi nhánh và lô NVL
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

      // 8. Cộng tồn các lô chưa hết hạn
      let available = new Prisma.Decimal(0);

      for (const balance of balances) {
        const expiry = balance.materialLot.expiryDate;

        if (expiry && formatter.format(expiry) < today) {
          continue;
        }

        available = available.plus(balance.quantity);
      }

      // 9. Tính số lượng còn thiếu
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

    // 10. Trả kết quả
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
