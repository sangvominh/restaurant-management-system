export interface ApiResponse<T> {
  message: string;
  data: T;
}

const API_BASE_URL = (
  process.env.API_BASE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export class WarehouseApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "WarehouseApiError";
  }
}

export async function warehouseRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const base =
    typeof window === "undefined"
      ? `${API_BASE_URL}/warehouse`
      : "/api/warehouse";
  let response: Response;

  try {
    response = await fetch(`${base}${path}`, {
      ...init,
      cache: "no-store",
      signal: init.signal ?? AbortSignal.timeout(10_000),
      headers: { Accept: "application/json", ...init.headers },
    });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "TimeoutError"
        ? "Hết thời gian chờ phản hồi từ máy chủ kho."
        : "Không thể kết nối đến máy chủ kho.";
    throw new WarehouseApiError(message);
  }

  const payload = (await response.json().catch(() => null)) as
    ApiResponse<T> | { message?: string } | null;
  if (!response.ok) {
    const apiMessage =
      payload && "message" in payload && typeof payload.message === "string"
        ? payload.message
        : `Yêu cầu thất bại (HTTP ${response.status}).`;
    throw new WarehouseApiError(apiMessage, response.status);
  }
  if (
    payload &&
    "message" in payload &&
    typeof payload.message === "string" &&
    !("data" in payload)
  ) {
    return undefined as T;
  }
  if (!payload || !("data" in payload)) {
    throw new WarehouseApiError(
      "Phản hồi từ máy chủ kho không đúng định dạng.",
      response.status,
    );
  }
  return payload.data as T;
}

export function warehouseJson(
  method: "POST" | "PATCH" | "DELETE",
  data?: unknown,
): RequestInit {
  return {
    method,
    ...(data === undefined
      ? {}
      : {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }),
  };
}
