import { describe, expect, it } from 'vitest';
import { getIcon, getRegisteredIconNames, hasIcon, registerIcons } from './registry';

describe('icon registry', () => {
  it('registers and resolves icons by name', () => {
    const check = { name: 'test-check', paths: ['M20 6 9 17l-5-5'] };
    registerIcons([check]);

    expect(hasIcon('test-check')).toBe(true);
    expect(getIcon('test-check')).toEqual(check);
    expect(getRegisteredIconNames()).toContain('test-check');
  });

  it('returns undefined for unknown icons', () => {
    expect(getIcon('nope')).toBeUndefined();
    expect(hasIcon('nope')).toBe(false);
  });

  it('later registrations override earlier ones', () => {
    registerIcons([{ name: 'dup', paths: ['a'] }]);
    registerIcons([{ name: 'dup', paths: ['b'] }]);
    expect(getIcon('dup')?.paths).toEqual(['b']);
  });
});
