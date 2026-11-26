/**
 * Chuẩn hóa chuỗi tiếng Việt về dạng chữ thường không dấu để tìm kiếm linh hoạt
 * (ví dụ: "Sườn heo hun khói" -> "suon heo hun khoi").
 */
export function normalizeVietnamese(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Kiểm tra mọi từ khóa người dùng gõ (có dấu hoặc không dấu) đều xuất hiện trong thông tin món.
 */
export function matchesVietnameseSearch(
  query: string,
  ...fields: (string | null | undefined)[]
): boolean {
  const normalizedQuery = normalizeVietnamese(query);
  if (!normalizedQuery) {
    return true;
  }

  const haystack = normalizeVietnamese(fields.filter(Boolean).join(' '));
  const tokens = normalizedQuery.split(' ').filter(Boolean);
  return tokens.every(token => haystack.includes(token));
}
