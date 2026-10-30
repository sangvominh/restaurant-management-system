import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service.js';
import { Prisma } from '../../generated/prisma/client.js';
import { CreateSupplierDto } from '../dto/create-supplier.dto.js';
import { UpdateSupplierDto } from '../dto/update-supplier.dto.js';

@Injectable()
export class SupplierApi {
  constructor(private readonly prisma: PrismaService) {}

  // Danh sách và tìm kiếm
  async getSuppliers(search?: string) {
    const keyword = search?.trim();

    const suppliers = await this.prisma.supplier.findMany({
      where: keyword
        ? {
            OR: [
              { code: { contains: keyword, mode: 'insensitive' } },
              { name: { contains: keyword, mode: 'insensitive' } },
              { phone: { contains: keyword, mode: 'insensitive' } },
              { email: { contains: keyword, mode: 'insensitive' } },
              { address: { contains: keyword, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { name: 'asc' },
      take: 50,
    });

    return {
      message: 'Lấy danh sách nhà cung cấp thành công',
      data: suppliers,
    };
  }

  // Xem chi tiết
  async getSupplierByCode(code: string) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { code: code.trim() },
    });

    if (!supplier) {
      throw new NotFoundException('Không tìm thấy nhà cung cấp');
    }

    return {
      message: 'Lấy chi tiết nhà cung cấp thành công',
      data: supplier,
    };
  }

  //Thêm nhà cung cấp
  async createSupplier(dto: CreateSupplierDto) {
    const code = dto.code.trim();
    const name = dto.name.trim();

    if (!code || !name) {
      throw new BadRequestException('Mã và tên không được để trống');
    }

    try {
      const supplier = await this.prisma.supplier.create({
        data: {
          code,
          name,
          phone: this.normalizeOptional(dto.phone),
          email: this.normalizeOptional(dto.email),
          address: this.normalizeOptional(dto.address),
        },
      });

      return {
        message: 'Thêm nhà cung cấp thành công',
        data: supplier,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Mã nhà cung cấp đã tồn tại');
      }

      throw error;
    }
  }

  //Sửa nhà cung cấp
  async updateSupplier(code: string, dto: UpdateSupplierDto) {
    const data: Prisma.SupplierUpdateInput = {};

    if (dto.name !== undefined) {
      const name = dto.name?.trim();

      if (!name) {
        throw new BadRequestException('Tên không được để trống');
      }

      data.name = name;
    }

    if (dto.phone !== undefined) {
      data.phone = this.normalizeOptional(dto.phone);
    }

    if (dto.email !== undefined) {
      data.email = this.normalizeOptional(dto.email);
    }

    if (dto.address !== undefined) {
      data.address = this.normalizeOptional(dto.address);
    }

    if (Object.keys(data).length === 0) {
      throw new BadRequestException(
        'Cần cung cấp ít nhất một thông tin để cập nhật',
      );
    }

    try {
      const supplier = await this.prisma.supplier.update({
        where: { code: code.trim() },
        data,
      });

      return {
        message: 'Cập nhật nhà cung cấp thành công',
        data: supplier,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Không tìm thấy nhà cung cấp');
      }

      throw error;
    }
  }

  private normalizeOptional(value?: string | null): string | null {
    const normalized = value?.trim();
    return normalized || null;
  }

  //Xóa nhà cung cấp chưa có phiếu nhập
  async deleteSupplier(code: string) {
    try {
      await this.prisma.supplier.delete({
        where: { code: code.trim() },
      });

      return {
        message: 'Xóa nhà cung cấp thành công',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Không tìm thấy nhà cung cấp');
        }

        if (error.code === 'P2003') {
          throw new ConflictException(
            'Nhà cung cấp đã có dữ liệu liên quan, không thể xóa',
          );
        }
      }

      throw error;
    }
  }
}
