/** Dates are calendar dates, interpreted in Vietnam regardless of device timezone. */
export function expiryStatus(expiry: string | null, now = new Date()) {
 if (!expiry) return { label: 'Chưa có hạn', usable: false, tone: 'gray' as const };
 const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
 const get = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)?.value;
 const today = `${get('year')}-${get('month')}-${get('day')}`;
 const date = expiry.slice(0, 10);
 const days = (Date.parse(`${date}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86400000;
 if (!Number.isFinite(days)) return { label: 'Hạn không hợp lệ', usable: false, tone: 'gray' as const };
 if (days < 0) return { label: 'Hết hạn', usable: false, tone: 'red' as const };
 if (days <= 2) return { label: 'Sắp hết hạn', usable: true, tone: 'amber' as const };
 return { label: 'Còn hạn', usable: true, tone: 'green' as const };
}
