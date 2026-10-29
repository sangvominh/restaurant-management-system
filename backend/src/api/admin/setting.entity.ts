import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('system_settings')
export class SettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, default: 'Hệ thống Quản lý MRP' })
  restaurantName: string;

  @Column({ length: 150, default: 'admin@mrpsystem.vn' })
  email: string;

  @Column({ length: 20, nullable: true, default: '0901234567' })
  phone: string;

  @Column({ type: 'varchar', length: 10, default: 'VND' })
  currency: 'VND' | 'USD';

  @Column({ type: 'float', default: 8 })
  tax: number;

  @UpdateDateColumn()
  updatedAt: Date;
}