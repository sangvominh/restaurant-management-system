import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/** Lịch sử đăng nhập (ERD: NHAT_KY_DANG_NHAP). Mỗi dòng là một phiên hoặc một lần thử đăng nhập. */
@Entity('login_logs')
export class LoginLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** null khi email không tồn tại (đăng nhập sai). */
  @Index()
  @Column({ type: 'int', nullable: true })
  accountId: number | null;

  /** Email đã nhập (lưu bản chụp để xem lại kể cả khi tài khoản bị xóa). */
  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 60, nullable: true })
  ipAddress: string | null;

  @Column({ type: 'varchar', length: 20 })
  status: 'success' | 'failed' | 'locked';

  // timestamptz để giờ hiển thị đúng bất kể múi giờ máy chạy backend.
  @CreateDateColumn({ type: 'timestamptz' })
  loginAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  logoutAt: Date | null;
}
