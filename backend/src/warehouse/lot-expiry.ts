/** Material lot expiry dates are PostgreSQL DATE values, inclusive in Vietnam. */
export function isUsableLotExpiry(expiry: Date | null, now = new Date()): boolean {
  if (!expiry || Number.isNaN(expiry.getTime())) return false;
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find(part => part.type === type)?.value;
  const today = `${get('year')}-${get('month')}-${get('day')}`;
  return expiry.toISOString().slice(0, 10) >= today;
}
