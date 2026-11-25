import type { CategoryItem, ProductItem } from "./types";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
).replace(/\/+$/, "");

export class ApiError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode = 0) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

async function requestPublicApi<T>(
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw err;
    }
    throw new ApiError(
      "Không thể kết nối đến máy chủ thực đơn. Vui lòng kiểm tra kết nối và thử lại.",
      0,
    );
  }

  if (!response.ok) {
    let errorMessage = `Không thể tải dữ liệu (mã lỗi ${response.status}).`;
    try {
      const payload = (await response.json()) as {
        message?: string | string[];
      };
      if (Array.isArray(payload?.message) && payload.message.length > 0) {
        errorMessage = payload.message.join(", ");
      } else if (typeof payload?.message === "string" && payload.message.trim()) {
        errorMessage = payload.message.trim();
      }
    } catch {
      // Giữ thông báo mặc định nếu response lỗi không phải JSON
    }
    throw new ApiError(errorMessage, response.status);
  }

  return (await response.json()) as T;
}

/**
 * GET /api/public/categories — Lấy danh sách danh mục món ăn đang mở bán.
 */
export async function fetchCategories(
  signal?: AbortSignal,
): Promise<CategoryItem[]> {
  return requestPublicApi<CategoryItem[]>("/api/public/categories", signal);
}

/**
 * GET /api/public/products?categoryId=&q= — Lấy danh sách món ăn theo danh mục & từ khóa.
 */
export async function fetchProducts(
  params?: { categoryId?: string; q?: string },
  signal?: AbortSignal,
): Promise<ProductItem[]> {
  const searchParams = new URLSearchParams();
  if (params?.categoryId?.trim()) {
    searchParams.set("categoryId", params.categoryId.trim());
  }
  if (params?.q?.trim()) {
    searchParams.set("q", params.q.trim());
  }
  const queryString = searchParams.toString();
  const path = queryString
    ? `/api/public/products?${queryString}`
    : "/api/public/products";
  return requestPublicApi<ProductItem[]>(path, signal);
}

/**
 * GET /api/public/products/:id — Lấy thông tin chi tiết 1 món ăn.
 */
export async function fetchProductById(
  id: string,
  signal?: AbortSignal,
): Promise<ProductItem> {
  return requestPublicApi<ProductItem>(
    `/api/public/products/${encodeURIComponent(id.trim())}`,
    signal,
  );
}
