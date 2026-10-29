import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

/** Nhật ký thao tác hệ thống (ERD: NHAT_KY_HE_THONG). Một phiên đăng nhập tạo nhiều dòng. */
@Entity('audit_logs')
export class AuditLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  /** Phiên đăng nhập đã thực hiện thao tác (login_logs.id). */
  @Index()
  @Column({ type: 'int', nullable: true })
  loginLogId: number | null;

  @Column({ type: 'int', nullable: true })
  accountId: number | null;

  /** Tên người thực hiện tại thời điểm đó (bản chụp). */
  @Column({ type: 'varchar', length: 150 })
  actorName: string;

  /** Mã hành động, ví dụ account.create, role.update. */
  @Index()
  @Column({ type: 'varchar', length: 50 })
  action: string;

  /** account | role | category | setting */
  @Index()
  @Column({ type: 'varchar', length: 50 })
  entityName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  entityId: string | null;

  @Column({ type: 'text', default: '' })
  description: string;

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
