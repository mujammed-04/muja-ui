import { describe, expect, it } from 'vitest';
import { clamp } from './clamp';
import { cx } from './cx';
import { deepMerge } from './deepMerge';

describe('cx', () => {
  it('joins truthy values and skips falsy ones', () => {
    expect(cx('a', undefined, 'b', false, null, 'c')).toBe('a b c');
  });

  it('returns an empty string when nothing is passed', () => {
    expect(cx()).toBe('');
  });
});

describe('clamp', () => {
  it('clamps below, inside and above the range', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(15, 0, 10)).toBe(10);
  });
});

describe('deepMerge', () => {
  it('merges nested plain objects', () => {
    const base = { a: 1, nested: { x: 1, y: 2 } };
    const merged = deepMerge(base, { nested: { y: 3 } });
    expect(merged).toEqual({ a: 1, nested: { x: 1, y: 3 } });
  });

  it('does not mutate the base object', () => {
    const base = { nested: { x: 1 } };
    deepMerge(base, { nested: { x: 2 } });
    expect(base.nested.x).toBe(1);
  });

  it('ignores undefined overrides and replaces arrays wholesale', () => {
    const base = { list: [1, 2, 3], keep: 'yes' };
    const merged = deepMerge(base, { list: [9], keep: undefined });
    expect(merged.list).toEqual([9]);
    expect(merged.keep).toBe('yes');
  });
});
