import { describe, expect, it } from 'vitest';
import { isUsableLotExpiry } from './lot-expiry.js';

describe('lot expiry in Vietnam', () => {
  it('includes the expiry date and changes at midnight in Vietnam', () => {
    const expiry = new Date('2026-11-05T00:00:00.000Z');
    expect(isUsableLotExpiry(expiry, new Date('2026-11-05T16:59:59.000Z'))).toBe(true);
    expect(isUsableLotExpiry(expiry, new Date('2026-11-05T17:00:00.000Z'))).toBe(false);
  });
  it('rejects missing or invalid expiry dates', () => {
    expect(isUsableLotExpiry(null)).toBe(false);
    expect(isUsableLotExpiry(new Date('invalid'))).toBe(false);
  });
});
