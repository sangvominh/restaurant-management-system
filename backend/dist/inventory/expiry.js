export function vietnamDay(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
    const part = (type) => parts.find(p => p.type === type).value;
    return `${part('year')}-${part('month')}-${part('day')}`;
}
export function daysRemaining(expiry, today = vietnamDay()) {
    return expiry ? Math.round((Date.parse(expiry.slice(0, 10) + 'T00:00:00Z') - Date.parse(today + 'T00:00:00Z')) / 86400000) : null;
}
//# sourceMappingURL=expiry.js.map