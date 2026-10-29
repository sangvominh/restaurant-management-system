import type { ApiResponse, InventoryDetail, InventoryItem } from "@/types/inventory";

const API_BASE_URL = (process.env.API_BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const REQUEST_TIMEOUT_MS = 10_000;

export class InventoryApiError extends Error {
  constructor(message: string, readonly status?: number) {
    super(message);
    this.name = "InventoryApiError";
  }
}

async function get<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: { Accept: "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error && error.name === "TimeoutError"
      ? "Hết thời gian chờ phản hồi từ máy chủ."
      : "Không thể kết nối đến máy chủ kho.";
    throw new InventoryApiError(message);
  }

  const payload = await response.json().catch(() => null) as ApiResponse<T> | { message?: string } | null;
  if (!response.ok) {
    const apiMessage = payload && "message" in payload && typeof payload.message === "string"
      ? payload.message
      : "Yêu cầu dữ liệu tồn kho thất bại.";
    throw new InventoryApiError(apiMessage, response.status);
  }
  if (!payload || !("data" in payload)) {
    throw new InventoryApiError("Phản hồi tồn kho từ máy chủ không đúng định dạng.", response.status);
  }
  return payload.data as T;
}

export function getInventory(): Promise<InventoryItem[]> {
  return get<InventoryItem[]>("/warehouse/inventory");
}

export function getInventoryByCode(code: string): Promise<InventoryDetail> {
  return get<InventoryDetail>(`/warehouse/inventory/${encodeURIComponent(code)}`);
}
