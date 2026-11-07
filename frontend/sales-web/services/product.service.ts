import { apiFetch as authenticatedFetch } from '@/lib/session';
export interface ProductItem {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  imageUrl?: string | null;
  description?: string | null;
  status: string;
  totalStock: number;
  bomCount: number;
  activeBom?: {
    id: string;
    code: string;
    version: number;
    status: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export async function fetchBomProducts(): Promise<{data: Pick<ProductItem, 'id' | 'code' | 'name' | 'category' | 'price' | 'unit' | 'imageUrl'>[]}> {
  const response = await authenticatedFetch('/warehouse/bom-products');
  if (!response.ok) throw new Error('Không tải được danh sách sản phẩm cấu hình BOM');
  return response.json();
}

export interface ProductDetail extends ProductItem {
  boms: {
    id: string;
    code: string;
    version: number;
    outputQuantity: number;
    status: string;
    materialsCount: number;
    materials: {
      materialCode: string;
      materialName: string;
      quantity: number;
      unitName: string;
    }[];
  }[];
  stockLocations: {
    locationName: string;
    branchName: string;
    quantity: number;
  }[];
}

export interface ProductsResponse {
  data: ProductItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductFilterParams {
  search?: string;
  category?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'code' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}


export async function fetchProducts(params: ProductFilterParams = {}): Promise<ProductsResponse> {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.category && params.category !== 'Tất cả') query.set('category', params.category);
  if (params.status && params.status !== 'Tất cả') query.set('status', params.status);
  if (params.minPrice !== undefined) query.set('minPrice', params.minPrice.toString());
  if (params.maxPrice !== undefined) query.set('maxPrice', params.maxPrice.toString());
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.sortOrder) query.set('sortOrder', params.sortOrder);
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());

  const res = await authenticatedFetch(`/products?${query.toString()}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Lỗi khi tải danh sách món ăn từ máy chủ');
  }
  return res.json();
}

export async function fetchProductDetail(code: string): Promise<ProductDetail> {
  const res = await authenticatedFetch(`/products/${code}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Không thể tải thông tin món ăn '${code}'`);
  }
  return res.json();
}

export async function fetchProductCategories(): Promise<string[]> {
  const res = await authenticatedFetch(`/products/categories`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Không thể tải danh mục món ăn từ máy chủ');
  return res.json();
}

export async function createProduct(data: {
  code: string;
  name: string;
  category: string;
  price: number;
  unit?: string;
  imageUrl?: string;
  description?: string;
  status?: string;
}): Promise<ProductItem> {
  const res = await authenticatedFetch(`/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Không thể tạo món ăn');
  }
  return res.json();
}

export async function updateProduct(
  code: string,
  data: Partial<ProductItem>,
): Promise<ProductItem> {
  const res = await authenticatedFetch(`/products/${code}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Không thể cập nhật món ăn');
  }
  return res.json();
}

export async function deleteProduct(code: string): Promise<void> {
  const res = await authenticatedFetch(`/products/${code}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Không thể xóa món ăn');
  }
}

export async function fetchFinishedGoodsStockReal(): Promise<any[]> {
  const res = await authenticatedFetch(`/products/finished-goods-stock`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Lỗi khi tải dữ liệu tồn kho thành phẩm');
  }
  return res.json();
}

