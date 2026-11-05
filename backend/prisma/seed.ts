import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { hashPassword } from '../src/auth/password.js';
if (process.env.DEMO_SEED !== 'true') throw new Error('Seed chỉ dành cho demo: đặt DEMO_SEED=true một cách chủ động.');
const password = process.env.DEMO_STAFF_PASSWORD;
if (!password || password.length < 12 || password.length > 128) throw new Error('DEMO_STAFF_PASSWORD phải dài 12–128 ký tự.');
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const id = (n: number) => `10000000-0000-4000-8000-${String(n).padStart(12, '0')}`;
try {
  await db.$transaction(async tx => {
    const branch = await tx.branch.upsert({ where: { code: 'STAFF-DEMO' }, update: {}, create: { id: id(1), code: 'STAFF-DEMO', name: 'Chi nhánh thực hành · Dữ liệu demo' } });
    for (let i = 1; i <= 12; i++) await tx.restaurantTable.upsert({ where: { branchId_code: { branchId: branch.id, code: `B${String(i).padStart(2, '0')}` } }, update: {}, create: { id: id(100 + i), branchId: branch.id, code: `B${String(i).padStart(2, '0')}`, name: `Bàn ${String(i).padStart(2, '0')}`, capacity: i <= 8 ? 4 : 6 } });
    const roles = ['SERVICE', 'KITCHEN', 'CASHIER', 'SUPERVISOR', 'BARISTA'] as const;
    for (const [i, role] of roles.entries()) await tx.staffUser.upsert({ where: { code: `DEMO-${role}` }, update: {}, create: { id: id(200 + i), code: `DEMO-${role}`, name: ['Nhân viên phục vụ', 'Nhân viên bếp', 'Nhân viên thu ngân', 'Quản lý ca', 'Nhân viên pha chế'][i], role, branchId: branch.id, passwordHash: hashPassword(password!) } });
    const ingredients = [ ['Bánh phở', 'g'], ['Thịt bò', 'g'], ['Trà', 'g'], ['Bột mì', 'g'] ];
    for (const [i, [name, unit]] of ingredients.entries()) {
      await tx.ingredient.upsert({ where: { id: id(300 + i) }, update: {}, create: { id: id(300 + i), name, unit } });
      await tx.stockBatch.upsert({ where: { branchId_code: { branchId: branch.id, code: `DEMO-LOT-${i}` } }, update: {}, create: { id: id(400 + i), branchId: branch.id, code: `DEMO-LOT-${i}`, ingredientId: id(300 + i), remaining: 100000, expiresAt: new Date(Date.now() + 30 * 86400000) } });
    }
    const menu = [
      { name: 'Phở Tái Nạm Gầu', category: 'Phở bò', price: 75000, description: 'Bò tái mềm, nạm giòn, gầu béo ngậy', recipe: [[0, 200], [1, 100]] },
      { name: 'Phở Bò Sốt Vang', category: 'Phở bò', price: 85000, description: 'Thịt bò hầm thơm, ăn kèm bánh phở mềm', recipe: [[0, 200], [1, 120]] },
      { name: 'Quẩy Giòn', category: 'Ăn kèm', price: 15000, description: 'Một đĩa ba chiếc quẩy giòn', recipe: [[3, 100]] },
      { name: 'Trà Đá Hoa Lài', category: 'Đồ uống', price: 5000, description: 'Hương lài thanh mát', recipe: [[2, 5]] },
    ];
    for (const [i, m] of menu.entries()) {
      const { recipe, ...item } = m;
      await tx.menuItem.upsert({ where: { id: id(500 + i) }, update: {}, create: { id: id(500 + i), branchId: branch.id, ...item, recipeConfigured: true, recipe: { create: recipe.map(([ingredient, quantity]) => ({ ingredientId: id(300 + ingredient), quantity })) } } });
    }
  });
  console.log('Đã tạo dữ liệu demo (không ghi đè dữ liệu hiện có). Tài khoản: DEMO-SERVICE, DEMO-KITCHEN, DEMO-CASHIER, DEMO-SUPERVISOR, DEMO-BARISTA.');
} finally { await db.$disconnect(); }
