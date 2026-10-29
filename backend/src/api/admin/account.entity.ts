import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 150 })
  email: string;

  /** Tên vai trò (khớp roles.name). Được kiểm tra tồn tại ở tầng service. */
  @Column({ length: 100 })
  role: string;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: 'active' | 'locked';

  /**
   * Mật khẩu đã băm (bcrypt). select:false để KHÔNG bao giờ lọt vào response JSON;
   * muốn đọc phải addSelect tường minh (xem AuthService).
   * nullable để không làm hỏng các dòng cũ khi synchronize; seed sẽ điền mật khẩu mặc định.
   */
  @Column({ type: 'varchar', length: 100, nullable: true, select: false })
  passwordHash: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
