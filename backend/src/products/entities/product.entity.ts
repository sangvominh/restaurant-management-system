import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('products')
export class Product {
  @ApiProperty({ description: 'ID sản phẩm' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Tên sản phẩm' })
  @Column({ length: 255 })
  name: string;

  @ApiProperty({ description: 'Mô tả sản phẩm', required: false })
  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ApiProperty({ description: 'Danh mục' })
  @Column({ length: 100 })
  category: string;

  @ApiProperty({ description: 'Giá bán (VND)' })
  @Column({ type: 'decimal', precision: 12, scale: 0 })
  price: number;

  @ApiProperty({ description: 'Đơn vị tính (cái, hộp, phần...)' })
  @Column({ length: 50, default: 'cái' })
  unit: string;

  @ApiProperty({ enum: ProductStatus, description: 'Trạng thái sản phẩm' })
  @Column({
    type: 'text',
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  @ApiProperty({ description: 'Ngày tạo' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Ngày cập nhật' })
  @UpdateDateColumn()
  updatedAt: Date;
}

