// API base URL — dùng Next.js rewrite proxy (/api -> localhost:3001)
const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || 'API error');
  }
  return res.json() as Promise<T>;
}

// ---- Products API ----
export const productsApi = {
  getAll: (params?: Record<string, string>) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return request(`/products${qs}`);
  },
  getOne: (id: number) => request(`/products/${id}`),
  create: (data: unknown) =>
    request('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: unknown) =>
    request(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  remove: (id: number) => request(`/products/${id}`, { method: 'DELETE' }),
  getCategories: () => request('/products/categories'),
};

// ---- Recipes API ----
export const recipesApi = {
  getAll: () => request('/recipes'),
  getOne: (id: number) => request(`/recipes/${id}`),
};

// ---- Export Orders API ----
export const exportOrdersApi = {
  getAll: () => request('/export-orders'),
  getOne: (id: number) => request(`/export-orders/${id}`),
  approve: (id: number) =>
    request(`/export-orders/${id}/approve`, { method: 'PATCH' }),
  reject: (id: number, reason?: string) =>
    request(`/export-orders/${id}/reject`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    }),
};

