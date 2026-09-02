import { fontFamily } from '@muja-ui/tokens';
import { sduFontSans } from '@muja-ui/theme-sdu';
import { describe, expect, it } from 'vitest';
import { __setPlatformOS } from '../../test/react-native-stub';
import { nativeFontFamily } from './font';

describe('nativeFontFamily', () => {
  it('maps the stock sans stack to the system font', () => {
    expect(nativeFontFamily(fontFamily.sans)).toBeUndefined();
    __setPlatformOS('android');
    expect(nativeFontFamily(fontFamily.sans)).toBeUndefined();
  });

  it('keeps a brand face the app is expected to load, dropping the CSS quotes', () => {
    expect(nativeFontFamily(sduFontSans)).toBe('Gilroy');
  });

  it("treats React Native's own 'System' alias as the system font", () => {
    expect(nativeFontFamily('System')).toBeUndefined();
  });

  it('resolves the generic mono and serif stacks per platform', () => {
    expect(nativeFontFamily(fontFamily.mono)).toBe('Menlo');
    expect(nativeFontFamily(fontFamily.serif)).toBe('Georgia');
    __setPlatformOS('android');
    expect(nativeFontFamily(fontFamily.mono)).toBe('monospace');
    expect(nativeFontFamily(fontFamily.serif)).toBe('serif');
  });

  it('skips faces that are not installed on the platform', () => {
    expect(nativeFontFamily("'Segoe UI', 'SF Mono', Menlo")).toBe('Menlo');
    __setPlatformOS('android');
    expect(nativeFontFamily("'Helvetica Neue', Arial, sans-serif")).toBeUndefined();
  });

  it('is safe on empty input', () => {
    expect(nativeFontFamily(undefined)).toBeUndefined();
    expect(nativeFontFamily('')).toBeUndefined();
  });
});
