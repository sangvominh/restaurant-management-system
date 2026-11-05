export async function loadReceipts<T extends { createdAt: string }>(resource: string, status: string): Promise<T[]> {
  const statuses = status === "ALL" ? ["PENDING", "APPROVED", "REJECTED"] : [status];
  const groups = await Promise.all(statuses.map(async value => {
    const response = await fetch(`/api/mrp/${resource}?status=${value}`, { cache: "no-store" });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(typeof body.message === "string" ? body.message : "Không tải được phiếu.");
    return body.data as T[];
  }));
  return groups.flat().sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}
