export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function api<T>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const res = await fetch(`/api/${path}`, {
    method,
    credentials: "same-origin",
    cache: "no-store",
    headers: { "Content-Type": "application/json", "X-Staff-Request": "1" },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new ApiError(
      res.status,
      typeof data.message === "string"
        ? data.message
        : "Không thể xử lý yêu cầu.",
    );
  return data as T;
}
export const money = (amount: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    amount,
  );
export const dateTime = (value: string) =>
  new Date(value).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
export const roles = {
  SERVICE: "Phục vụ",
  KITCHEN: "Bếp",
  BARISTA: "Pha chế",
  CASHIER: "Thu ngân",
  SUPERVISOR: "Quản lý ca",
};
export const statuses = {
  QUEUED: "Chờ chế biến",
  COOKING: "Đang chế biến",
  READY: "Sẵn sàng",
  SERVED: "Đã phục vụ",
  CANCELLED: "Đã hủy",
};
export type User = {
  id: string;
  code: string;
  name: string;
  role: keyof typeof roles;
  branchId: string;
  branch: { name: string; code: string };
};
export type Table = {
  id: string;
  code: string;
  name: string;
  capacity: number;
  invoices: { id: string; guestName: string; createdAt: string }[];
};
export type MenuItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  isAvailable: boolean;
  recipeConfigured: boolean;
};
export type Line = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  note: string;
  status: keyof typeof statuses;
};
export type Order = {
  id: string;
  createdAt: string;
  lines: Line[];
  invoice: Invoice;
};
export type Invoice = {
  id: string;
  guestName: string;
  tableId: string;
  table: Table;
  status: "OPEN" | "PAID";
  createdAt: string;
  total: number;
  orders: { id: string; createdAt: string; lines: Line[] }[];
  payment?: { amount: number; cashReceived: number; createdAt: string } | null;
};
export type Shift = {
  id: string;
  startedAt: string;
  endedAt: string | null;
  handoverNote: string | null;
};
export type Overview = {
  tables: Table[];
  invoices: Invoice[];
  kitchen: Order[];
  shift: Shift | null;
  revenue: number | null;
};
