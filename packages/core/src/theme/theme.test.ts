import { describe, expect, it } from 'vitest';
import { createTheme } from './createTheme';
import { cssVar, cssVarName, cssVarsToString, themeToCssVars } from './cssVars';
import { darkTheme, lightTheme } from './themes';

describe('themes', () => {
  it('light and dark themes share the same token shape', () => {
    expect(Object.keys(darkTheme).sort()).toEqual(Object.keys(lightTheme).sort());
    expect(Object.keys(darkTheme.colors).sort()).toEqual(Object.keys(lightTheme.colors).sort());
  });
});

describe('createTheme', () => {
  it('deep-merges overrides without mutating the base', () => {
    const brand = createTheme(lightTheme, {
      name: 'brand',
      colors: { primary: '#7c3aed' },
    });

    expect(brand.name).toBe('brand');
    expect(brand.colors.primary).toBe('#7c3aed');
    expect(brand.colors.bg).toBe(lightTheme.colors.bg);
    expect(brand.space).toEqual(lightTheme.space);
    expect(lightTheme.colors.primary).not.toBe('#7c3aed');
  });
});

describe('css variables', () => {
  it('flattens the theme into --mj-* custom properties', () => {
    const vars = themeToCssVars(lightTheme);
    expect(vars['--mj-color-bg']).toBe('#ffffff');
    expect(vars['--mj-color-on-primary']).toBe('#ffffff');
    expect(vars['--mj-space-4']).toBe('16px');
    expect(vars['--mj-space-0-5']).toBe('2px');
    expect(vars['--mj-space-px']).toBe('1px');
    expect(vars['--mj-font-size-md']).toBe('1rem');
    expect(vars['--mj-font-size-2xl']).toBe('1.5rem');
    expect(vars['--mj-duration-fast']).toBe('150ms');
    expect(vars['--mj-radius-full']).toBe('9999px');
    expect(vars['--mj-shadow-none']).toBe('none');
    expect(vars['--mj-z-modal']).toBe('1400');
  });

  it('builds var() references and rule strings', () => {
    expect(cssVarName('color', 'onPrimary')).toBe('--mj-color-on-primary');
    expect(cssVar('space', 4)).toBe('var(--mj-space-4)');
    expect(cssVarsToString({ '--a': '1', '--b': '2' }, ':root')).toBe(':root{--a:1;--b:2;}');
  });
});
