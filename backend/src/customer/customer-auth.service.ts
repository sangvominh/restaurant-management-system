import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createHash, randomBytes, scrypt, scryptSync, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { PrismaService } from '../prisma/prisma.service.js';

const derive = promisify(scrypt);
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface CustomerUser {
  id: string;
  phone: string;
  name: string;
  createdAt: Date;
}

interface CustomerSession {
  customerId: string;
  passwordHash: string;
  expiresAt: number;
}

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

function asObject(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new BadRequestException('Dữ liệu không hợp lệ');
  }
  return input as Record<string, unknown>;
}

/** Chuẩn hóa số điện thoại (bỏ khoảng trắng, dấu chấm, dấu gạch ngang) */
export function normalizePhone(value: unknown): string {
  if (typeof value !== 'string') {
    throw new BadRequestException('Số điện thoại không hợp lệ (9–15 chữ số)');
  }
  const normalized = value.replaceAll(/[\s.-]/g, '').trim();
  if (!/^[0-9]{9,15}$/.test(normalized)) {
    throw new BadRequestException('Số điện thoại không hợp lệ (9–15 chữ số)');
  }
  return normalized;
}

function validateName(value: unknown): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > 100) {
    throw new BadRequestException('Tên khách hàng cần từ 1 đến 100 ký tự');
  }
  return value.trim();
}

function validatePassword(value: unknown): string {
  if (typeof value !== 'string' || !value.trim() || value.length < 6 || value.length > 128) {
    throw new BadRequestException('Mật khẩu cần từ 6 đến 128 ký tự');
  }
  return value;
}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

@Injectable()
export class CustomerAuthService {
  // Phiên khách hàng lưu trong RAM (hạn 7 ngày). Khởi động lại backend thì khách đăng nhập lại.
  private readonly sessions = new Map<string, CustomerSession>();

  constructor(private readonly db: PrismaService) {}

  private createSession(customerId: string, passwordHash: string): string {
    const now = Date.now();
    for (const [id, session] of this.sessions) {
      if (session.expiresAt <= now) {
        this.sessions.delete(id);
      }
    }
    const token = randomBytes(32).toString('hex');
    this.sessions.set(hashToken(token), {
      customerId,
      passwordHash,
      expiresAt: now + SESSION_TTL_MS,
    });
    return token;
  }

  /** Đăng ký tài khoản khách hàng bằng số điện thoại + mật khẩu */
  async register(body: unknown) {
    const b = asObject(body);
    const phone = normalizePhone(b.phone);
    const name = validateName(b.name);
    const password = validatePassword(b.password);

    const existing = await this.db.customer.findUnique({ where: { phone } });
    if (existing) {
      throw new ConflictException('Số điện thoại đã được đăng ký');
    }

    const passwordHash = hashPassword(password);
    const customer = await this.db.customer.create({
      data: { phone, name, passwordHash, status: 'ACTIVE' },
      select: { id: true, phone: true, name: true, createdAt: true },
    });

    const token = this.createSession(customer.id, passwordHash);
    return { token, customer };
  }

  /** Đăng nhập tài khoản khách hàng */
  async login(body: unknown) {
    const b = asObject(body);
    const phone = normalizePhone(b.phone);
    if (typeof b.password !== 'string' || b.password.length > 128) {
      throw new BadRequestException('Vui lòng nhập mật khẩu hợp lệ');
    }

    const customer = await this.db.customer.findUnique({ where: { phone } });
    const hash = customer?.passwordHash;
    const validFormat = Boolean(hash && /^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/.test(hash));
    const [, salt, stored] = validFormat
      ? hash!.split('$')
      : ['scrypt', '0'.repeat(32), '0'.repeat(128)];
    const derived = (await derive(b.password, salt, 64)) as Buffer;

    if (!customer || !validFormat || !timingSafeEqual(derived, Buffer.from(stored, 'hex'))) {
      throw new UnauthorizedException('Số điện thoại hoặc mật khẩu không đúng');
    }
    if (customer.status !== 'ACTIVE') {
      throw new ForbiddenException('Tài khoản khách hàng đã bị khóa');
    }

    const token = this.createSession(customer.id, customer.passwordHash);
    return {
      token,
      customer: {
        id: customer.id,
        phone: customer.phone,
        name: customer.name,
        createdAt: customer.createdAt,
      },
    };
  }

  /** Xác thực token Bearer bắt buộc */
  async authenticate(token: string): Promise<CustomerUser> {
    const session = this.sessions.get(hashToken(token));
    if (!session || session.expiresAt <= Date.now()) {
      this.sessions.delete(hashToken(token));
      throw new UnauthorizedException('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
    }

    const customer = await this.db.customer.findUnique({ where: { id: session.customerId } });
    if (!customer || customer.status !== 'ACTIVE' || customer.passwordHash !== session.passwordHash) {
      this.sessions.delete(hashToken(token));
      throw new UnauthorizedException('Tài khoản đã thay đổi hoặc bị khóa, vui lòng đăng nhập lại');
    }

    return {
      id: customer.id,
      phone: customer.phone,
      name: customer.name,
      createdAt: customer.createdAt,
    };
  }

  /**
   * Xác thực tùy chọn khi đặt món:
   * - Không gửi header Authorization -> trả null (khách vãng lai).
   * - Có gửi header -> phải hợp lệ, nếu sai/hết hạn báo 401 để app biết đăng nhập lại.
   */
  async tryAuthenticate(authorizationHeader?: string): Promise<CustomerUser | null> {
    if (!authorizationHeader || !authorizationHeader.trim()) {
      return null;
    }
    if (!/^Bearer [0-9a-f]{64}$/.test(authorizationHeader)) {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    }
    return this.authenticate(authorizationHeader.slice(7));
  }

  logout(token: string) {
    this.sessions.delete(hashToken(token));
    return { message: 'Đã đăng xuất' };
  }
}
