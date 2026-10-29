import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users') // Tên bảng trong database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  role: string; // VD: SUPER_ADMIN, INVENTORY_MANAGER

  @Column({ default: true })
  isActive: boolean;
}