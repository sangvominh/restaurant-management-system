const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export interface BomMaterialDetail {
  materialCode: string;
  materialName: string;
  unitName: string;
  quantity: string;
}

export interface BomItem {
  code: string;
  productCode: string;
  productName?: string | null;
  productCategory?: string | null;
  productPrice?: number | null;
  productImage?: string | null;
  productUnit?: string;
  version: number;
  outputQuantity: string;
  status: string;
  createdAt: string;
  totalMaterials: number;
  details: BomMaterialDetail[];
  recentOrders?: {
    code: string;
    status: string;
    quantity: string;
    createdAt: string;
  }[];
}

export interface BomsByProductResponse {
  message: string;
  product?: {
    code: string;
    name: string;
    category: string;
    price: number;
    unit: string;
    imageUrl?: string | null;
  } | null;
  totalVersions: number;
  activeVersion?: number | null;
  data: BomItem[];
}

export async function fetchBoms(productCode?: string, status?: string): Promise<BomItem[]> {
  const query = new URLSearchParams();
  if (productCode && productCode !== 'Tất cả') query.set('productCode', productCode);
  if (status && status !== 'Tất cả') query.set('status', status);

  const res = await fetch(`${API_BASE}/warehouse/boms?${query.toString()}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Không thể tải danh sách công thức BOM');
  const json = await res.json();
  return json.data || [];
}

export async function fetchBomsByProduct(productCode: string): Promise<BomsByProductResponse> {
  const res = await fetch(`${API_BASE}/warehouse/boms/product/${productCode}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Không thể tra cứu công thức của món '${productCode}'`);
  return res.json();
}

export async function fetchBomDetail(code: string): Promise<BomItem> {
  const res = await fetch(`${API_BASE}/warehouse/boms/${code}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Không tìm thấy công thức BOM '${code}'`);
  const json = await res.json();
  return json.data;
}

export async function createBom(data: {
  code: string;
  productCode: string;
  outputQuantity: string;
  details: { materialCode: string; unitName: string; quantity: string }[];
}): Promise<any> {
  const res = await fetch(`${API_BASE}/warehouse/boms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Lỗi khi tạo công thức BOM');
  }
  return res.json();
}

export async function updateBom(
  code: string,
  data: {
    outputQuantity?: string;
    status?: string;
    details?: { materialCode: string; unitName: string; quantity: string }[];
  },
): Promise<any> {
  const res = await fetch(`${API_BASE}/warehouse/boms/${code}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Lỗi khi cập nhật công thức BOM');
  }
  return res.json();
}

export async function createBomNextVersion(
  code: string,
  data: {
    newCode?: string;
    outputQuantity?: string;
    deactivateOldVersion?: boolean;
    details?: { materialCode: string; unitName: string; quantity: string }[];
  },
): Promise<any> {
  const res = await fetch(`${API_BASE}/warehouse/boms/${code}/version`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Lỗi khi tạo phiên bản mới');
  }
  return res.json();
}

export async function updateBomStatus(code: string, status: string): Promise<any> {
  const res = await fetch(`${API_BASE}/warehouse/boms/${code}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Lỗi khi thay đổi trạng thái BOM');
  }
  return res.json();
}

