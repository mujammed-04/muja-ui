import { describe, expect, it } from 'vitest';
import { addDays, addMonths, dayKey, isSameDay, monthGrid, startOfDay } from './date';

describe('date helpers', () => {
  it('keys days in local time', () => {
    expect(dayKey(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(dayKey(new Date(2026, 11, 31))).toBe('2026-12-31');
  });

  it('rolls over month and year boundaries', () => {
    expect(dayKey(addDays(new Date(2026, 0, 31), 1))).toBe('2026-02-01');
    expect(dayKey(addDays(new Date(2026, 11, 31), 1))).toBe('2027-01-01');
  });

  it('addMonths lands on the first of the target month', () => {
    const result = addMonths(new Date(2026, 0, 31), 1);
    expect(dayKey(result)).toBe('2026-02-01');
  });

  it('startOfDay drops the time', () => {
    const result = startOfDay(new Date(2026, 4, 9, 23, 59, 59));
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
  });

  it('isSameDay ignores the time of day', () => {
    expect(isSameDay(new Date(2026, 4, 9, 1), new Date(2026, 4, 9, 22))).toBe(true);
    expect(isSameDay(new Date(2026, 4, 9), new Date(2026, 4, 10))).toBe(false);
  });

  describe('monthGrid', () => {
    it('always returns six full weeks so the grid height never jumps', () => {
      for (let month = 0; month < 12; month++) {
        expect(monthGrid(new Date(2026, month, 1), 1)).toHaveLength(42);
      }
    });

    it('starts on the configured first weekday', () => {
      const monday = monthGrid(new Date(2026, 7, 1), 1)[0];
      const sunday = monthGrid(new Date(2026, 7, 1), 0)[0];
      expect(monday?.getDay()).toBe(1);
      expect(sunday?.getDay()).toBe(0);
    });

    it('covers the whole month it was asked for', () => {
      const grid = monthGrid(new Date(2026, 1, 1), 1);
      const keys = grid.map(dayKey);
      expect(keys).toContain('2026-02-01');
      expect(keys).toContain('2026-02-28');
    });
  });
});
