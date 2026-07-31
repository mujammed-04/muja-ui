import { describe, expect, it } from 'vitest';
import { palette } from './colors';
import { darkColors, lightColors } from './semantic';
import { shadow } from './shadow';
import { space } from './spacing';
import { breakpoints, media } from './breakpoints';

describe('palette', () => {
  it('every scale step is a 6-digit hex color', () => {
    const { white, black, ...scales } = palette;
    expect(white).toMatch(/^#[0-9a-f]{6}$/);
    expect(black).toMatch(/^#[0-9a-f]{6}$/);
    for (const scale of Object.values(scales)) {
      for (const value of Object.values(scale)) {
        expect(value).toMatch(/^#[0-9a-f]{6}$/);
      }
    }
  });
});

describe('semantic colors', () => {
  it('light and dark themes expose exactly the same roles', () => {
    expect(Object.keys(darkColors).sort()).toEqual(Object.keys(lightColors).sort());
  });

  it('every role has a non-empty value', () => {
    for (const colors of [lightColors, darkColors]) {
      for (const [role, value] of Object.entries(colors)) {
        expect(value, `role ${role}`).toMatch(/^(#[0-9a-f]{6}|rgba?\()/);
      }
    }
  });
});

describe('space', () => {
  it('is a 4px-based scale', () => {
    expect(space[1]).toBe(4);
    expect(space[4]).toBe(16);
    expect(space[0.5]).toBe(2);
    expect(space.px).toBe(1);
  });
});

describe('shadow', () => {
  it('precomputes css strings from layers', () => {
    expect(shadow.none.css).toBe('none');
    expect(shadow.md.css).toContain('px');
    expect(shadow.md.layers.length).toBeGreaterThan(0);
  });
});

describe('breakpoints', () => {
  it('media queries match breakpoint values', () => {
    for (const [key, value] of Object.entries(breakpoints)) {
      expect(media[key as keyof typeof media]).toBe(`(min-width: ${value}px)`);
    }
  });
});
