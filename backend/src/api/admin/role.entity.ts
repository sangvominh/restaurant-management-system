import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  name: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ default: false })
  isSystem: boolean;

  /** Danh sách khóa quyền (xem common/permissions.ts). ['*'] = toàn quyền. */
  @Column('text', { array: true, default: () => "'{}'" })
  permissions: string[];

  @CreateDateColumn()
  createdAt: Date;
}
