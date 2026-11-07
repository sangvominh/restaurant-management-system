import type { PrismaService } from '../../src/prisma/prisma.service.js';

// Integration fixtures use the same BOM relationship as production code.
export async function configureMenuRecipe(db: PrismaService, menuId: string, materialId: string, quantity: number) {
  const material = await db.material.findUniqueOrThrow({ where: { id: materialId } });
  const menu = await db.menuItem.findUniqueOrThrow({ where: { id: menuId } });
  const code = `TEST-${menuId}`;
  const product = await db.product.upsert({ where: { code }, update: {}, create: { code, name: menu.name, category: menu.category, price: menu.price } });
  const bom = await db.bom.upsert({ where: { code }, update: {}, create: { code, productCode: product.code } });
  await db.bomDetail.upsert({ where: { bomId_materialId: { bomId: bom.id, materialId } }, update: { quantity }, create: { bomId: bom.id, materialId, unitId: material.unitId, quantity } });
  await db.menuItem.update({ where: { id: menuId }, data: { bomId: bom.id, recipeConfigured: true } });
}
