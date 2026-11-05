import { BadRequestException } from '@nestjs/common';
export function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new BadRequestException('Dữ liệu không hợp lệ.');
  return value as Record<string, unknown>;
}
export function text(value: unknown, label: string, max = 150): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) throw new BadRequestException(`${label} không hợp lệ.`);
  return value.trim();
}
export function uuid(value: unknown): string {
  const result = text(value, 'Mã định danh', 36);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(result)) throw new BadRequestException('Mã định danh không hợp lệ.');
  return result;
}
export function integer(value: unknown, label: string, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < min || value > max) throw new BadRequestException(`${label} không hợp lệ.`);
  return value;
}
