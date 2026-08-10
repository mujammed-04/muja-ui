import { sduLightTheme } from '@muja-ui/theme-sdu';
import { describe, expect, it } from 'vitest';
import { shadowStyle, splitStyleProps } from './styleProps';

describe('splitStyleProps', () => {
  it('resolves space tokens to theme pixel values', () => {
    const { style } = splitStyleProps({ p: 4, mx: 2 }, sduLightTheme);
    expect(style).toMatchObject({
      padding: 16,
      marginLeft: 8,
      marginRight: 8,
    });
  });

  it('resolves color tokens to the active theme, never raw values', () => {
    const { style } = splitStyleProps({ bg: 'primary', borderColor: 'border' }, sduLightTheme);
    expect(style.backgroundColor).toBe(sduLightTheme.colors.primary);
    expect(style.borderColor).toBe(sduLightTheme.colors.border);
  });

  it('passes unknown props through untouched', () => {
    const { style, rest } = splitStyleProps(
      { p: 2, testID: 'card', onLayout: undefined },
      sduLightTheme,
    );
    expect(style).toEqual({ padding: 8 });
    expect(rest).toEqual({ testID: 'card', onLayout: undefined });
  });

  it('ignores undefined values so callers can spread optional props', () => {
    const { style } = splitStyleProps({ p: undefined, m: 1 }, sduLightTheme);
    expect(style).toEqual({ margin: 4 });
  });
});

describe('shadowStyle', () => {
  it('splits a token shadow into the iOS quartet and an Android elevation', () => {
    const style = shadowStyle(sduLightTheme.shadow.md);
    expect(style.shadowOffset).toEqual({ width: 0, height: 4 });
    expect(style.shadowOpacity).toBeCloseTo(0.1);
    expect(style.shadowRadius).toBe(3);
    expect(style.elevation).toBe(3);
    // The alpha moves to shadowOpacity, so the color itself must be opaque.
    expect(style.shadowColor).not.toContain('rgba');
  });

  it('renders `none` as no shadow at all', () => {
    expect(shadowStyle(sduLightTheme.shadow.none).shadowOpacity).toBe(0);
  });
});
