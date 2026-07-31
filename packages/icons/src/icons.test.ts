import { describe, expect, it } from 'vitest';
import { allIcons } from './index';

describe('icons', () => {
  it('every icon has a unique name and non-empty path data', () => {
    const names = allIcons.map((icon) => icon.name);
    expect(new Set(names).size).toBe(names.length);

    for (const icon of allIcons) {
      expect(icon.viewBox).toBe('0 0 24 24');
      expect(icon.paths.length).toBeGreaterThan(0);
      for (const path of icon.paths) {
        expect(path).toMatch(/^[Mm]/);
      }
    }
  });
});
