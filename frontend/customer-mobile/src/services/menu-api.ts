import type { DiningTableInfo, MenuCategory, MenuProduct } from '@/types/menu';

import { apiRequest, resolveAssetUrl } from './api-client';

export interface GetMenuProductsParams {
  categoryId?: string;
  q?: string;
}

function normalizeProduct(product: MenuProduct): MenuProduct {
  return {
    ...product,
    imageUrl: resolveAssetUrl(product.imageUrl),
  };
}

/**
 * Lấy danh sách danh mục món ăn đang mở bán (`GET /api/public/categories`).
 */
export async function getMenuCategories(signal?: AbortSignal): Promise<MenuCategory[]> {
  return apiRequest<MenuCategory[]>('/api/public/categories', { signal });
}

/**
 * Lấy danh sách thực đơn có lọc theo danh mục & từ khóa tìm kiếm (`GET /api/public/products`).
 */
export async function getMenuProducts(
  params: GetMenuProductsParams = {},
  signal?: AbortSignal,
): Promise<MenuProduct[]> {
  const searchParams = new URLSearchParams();
  const categoryId = params.categoryId?.trim();
  const query = params.q?.trim();

  if (categoryId) {
    searchParams.set('categoryId', categoryId);
  }
  if (query) {
    searchParams.set('q', query);
  }

  const queryString = searchParams.toString();
  const path = queryString ? `/api/public/products?${queryString}` : '/api/public/products';
  const products = await apiRequest<MenuProduct[]>(path, { signal });
  return products.map(normalizeProduct);
}

/**
 * Lấy chi tiết 1 món ăn kèm lượng tồn khả dụng mới nhất (`GET /api/public/products/:id`).
 */
export async function getMenuProductById(
  productId: string,
  signal?: AbortSignal,
): Promise<MenuProduct> {
  const encodedId = encodeURIComponent(productId.trim());
  const product = await apiRequest<MenuProduct>(`/api/public/products/${encodedId}`, {
    signal,
  });
  return normalizeProduct(product);
}

/**
 * Kiểm tra thông tin bàn từ mã QR hoặc mã nhập tay (`GET /api/public/tables/:code`).
 */
export async function lookupDiningTable(
  codeOrId: string,
  signal?: AbortSignal,
): Promise<DiningTableInfo> {
  const encodedCode = encodeURIComponent(codeOrId.trim());
  return apiRequest<DiningTableInfo>(`/api/public/tables/${encodedCode}`, { signal });
}
