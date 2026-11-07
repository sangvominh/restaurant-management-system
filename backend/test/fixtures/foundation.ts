import * as bcrypt from 'bcryptjs';
import type { PrismaClient } from '../../dist/generated/prisma/client.js';
import { seedSystemAdmin } from '../../dist/prisma/seed-admin.js';


export async function seedFoundationFixture(db: PrismaClient, password: string) {
  if (!password || password.length < 8 || Buffer.byteLength(password) > 72)
    throw new Error('Fixture password cần từ 8 ký tự, tối đa 72 byte.');
  if (await db.branch.count())
    throw new Error('Fixture chỉ được nạp vào DB trống.');
  await seedSystemAdmin(db, { email: 'owner@demo.local', password });
  const passwordHash = await bcrypt.hash(password, 10);
  await db.$transaction(async (tx) => {
    const branch = await tx.branch.create({
      data: { code: 'DEMO-CN01', name: 'Nhà hàng Demo' },
    });
    await tx.restaurantTable.create({
      data: { branchId: branch.id, code: 'B01', name: 'Bàn 01', capacity: 4 },
    });
    const location = await tx.warehouseLocation.create({
      data: { branchId: branch.id, name: 'Kho chính', locationType: 'MAIN' },
    });
    const kg = await tx.unit.upsert({
      where: { name: 'kg' },
      update: {},
      create: { name: 'kg' },
    });
    const category = await tx.category.create({
      data: { code: 'DEMO-TP', name: 'Thực phẩm', categoryType: 'MATERIAL' },
    });
    const supplier = await tx.supplier.create({
      data: { code: 'DEMO-NCC01', name: 'Nhà cung cấp Demo' },
    });
    const material = await tx.material.create({
      data: {
        code: 'DEMO-NVL01',
        name: 'Gạo',
        unitId: kg.id,
        categoryId: category.id,
        minStock: 5,
      },
    });
    const lot = await tx.materialLot.create({
      data: {
        materialId: material.id,
        lotCode: 'DEMO-LO01',
        expiryDate: new Date('2099-12-31'),
      },
    });
    const receipt = await tx.goodsReceipt.create({
      data: {
        receiptCode: 'DEMO-NK01',
        branchId: branch.id,
        supplierId: supplier.id,
        status: 'POSTED',
        postedAt: new Date(),
      },
    });
    const detail = await tx.goodsReceiptDetail.create({
      data: {
        receiptId: receipt.id,
        materialId: material.id,
        materialLotId: lot.id,
        locationId: location.id,
        unitId: kg.id,
        quantity: 20,
        unitPrice: 25000,
      },
    });
    await tx.materialBalance.create({
      data: { locationId: location.id, materialLotId: lot.id, quantity: 20 },
    });
    await tx.inventoryMovement.create({
      data: {
        receiptDetailId: detail.id,
        materialLotId: lot.id,
        locationId: location.id,
        movementType: 'IMPORT',
        quantityBefore: 0,
        quantityChange: 20,
        quantityAfter: 20,
      },
    });
    const product = await tx.product.create({
      data: {
        code: 'DEMO-MON01',
        name: 'Cơm trắng',
        category: 'Món ăn',
        price: 15000,
        unit: 'phần',
      },
    });
    const bom = await tx.bom.create({
      data: {
        code: 'DEMO-BOM01',
        productCode: product.code,
        outputQuantity: 1,
        details: {
          create: { materialId: material.id, unitId: kg.id, quantity: '0.1' },
        },
      },
    });
    await tx.menuItem.create({
      data: {
        branchId: branch.id,
        name: product.name,
        category: product.category,
        price: Number(product.price),
        description: 'Một phần cơm dùng 0,1 kg gạo',
        recipeConfigured: true,
        bomId: bom.id,
      },
    });
    for (const [email, name, roleName, position] of [
      ['warehouse@demo.local', 'Quản lý kho Demo', 'Quản lý kho', null],
      [
        'restaurant@demo.local',
        'Quản lý nhà hàng Demo',
        'Quản lý nhà hàng',
        null,
      ],
      ['service@demo.local', 'Phục vụ Demo', 'Nhân viên', 'SERVICE'],
      ['kitchen@demo.local', 'Bếp Demo', 'Nhân viên', 'KITCHEN'],
      ['cashier@demo.local', 'Thu ngân Demo', 'Nhân viên', 'CASHIER'],
      ['supervisor@demo.local', 'Quản lý ca Demo', 'Nhân viên', 'SUPERVISOR'],
    ] as const) {
      const role = await tx.role.findUniqueOrThrow({
        where: { name: roleName },
      });
      await tx.account.create({
        data: {
          email,
          name,
          passwordHash,
          roleId: role.id,
          ...(position
            ? {
                staffProfile: {
                  create: {
                    code: email.split('@')[0].toUpperCase(),
                    name,
                    role: position,
                    branchId: branch.id,
                  },
                },
              }
            : {}),
        },
      });
    }
  });
}
