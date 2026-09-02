import { lightTheme } from '@muja-ui/core';
import { sduLightTheme } from '@muja-ui/theme-sdu';
import { describe, expect, it } from 'vitest';
import { __setPlatformOS } from '../../test/react-native-stub';
import { adaptThemeToPlatform, isIOS } from './platform';

describe('adaptThemeToPlatform', () => {
  it('on iOS lays the HIG type scale and radii over the theme', () => {
    const theme = adaptThemeToPlatform(sduLightTheme);
    expect(isIOS()).toBe(true);
    expect(theme.typography.fontSize.md).toBe(17);
    expect(theme.typography.fontSize.xs).toBe(13);
    expect(theme.typography.fontSize['3xl']).toBe(34);
    expect(theme.radius.md).toBe(10);
    expect(theme.radius.xl).toBe(14);
  });

  it('keeps everything that is not a metric — name, colors, spacing', () => {
    const theme = adaptThemeToPlatform(sduLightTheme);
    expect(theme.name).toBe('sdu-light');
    expect(theme.colors).toEqual(sduLightTheme.colors);
    expect(theme.space).toEqual(sduLightTheme.space);
    expect(theme.radius.full).toBe(sduLightTheme.radius.full);
  });

  it('does not mutate the theme it was given', () => {
    adaptThemeToPlatform(lightTheme);
    expect(lightTheme.typography.fontSize.md).toBe(16);
    expect(lightTheme.radius.md).toBe(8);
  });

  it('returns the theme untouched on Android', () => {
    __setPlatformOS('android');
    expect(adaptThemeToPlatform(sduLightTheme)).toBe(sduLightTheme);
  });
});
