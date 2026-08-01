import { lightTheme } from '@muja-ui/core';
import { describe, expect, it } from 'vitest';
import { bronze, navy, sduDarkTheme, sduLightTheme } from './index';

describe('sduLightTheme', () => {
  it('uses navy-800 as the brand primary, matching sdu-web', () => {
    expect(sduLightTheme.colors.primary).toBe(navy[800]);
    expect(sduLightTheme.colors.primary).toBe('#17173f');
    expect(sduLightTheme.colors.onPrimary).toBe('#ffffff');
  });

  it('maps bronze to the accent role', () => {
    expect(sduLightTheme.colors.accent).toBe(bronze[500]);
    expect(sduLightTheme.colors.onAccent).toBe('#ffffff');
    expect(sduDarkTheme.colors.accent).toBe(bronze[400]);
  });

  it('leaves warning as the base amber — bronze is emphasis, not a warning', () => {
    expect(sduLightTheme.colors.warning).toBe(lightTheme.colors.warning);
    expect(sduLightTheme.colors.warning).not.toBe(bronze[500]);
  });

  it('puts Gilroy first in the sans stack on both themes', () => {
    expect(sduLightTheme.typography.fontFamily.sans).toMatch(/^'Gilroy'/);
    expect(sduDarkTheme.typography.fontFamily.sans).toMatch(/^'Gilroy'/);
  });

  it('keeps non-overridden tokens from the base theme without mutating it', () => {
    expect(sduLightTheme.colors.success).toBe(lightTheme.colors.success);
    expect(sduLightTheme.space).toEqual(lightTheme.space);
    expect(lightTheme.name).toBe('light');
    expect(lightTheme.typography.fontFamily.sans).not.toMatch(/Gilroy/);
  });

  it('provides a value for every semantic color role', () => {
    for (const theme of [sduLightTheme, sduDarkTheme]) {
      for (const [role, value] of Object.entries(theme.colors)) {
        expect(value, `${theme.name}: ${role}`).toBeTruthy();
      }
    }
  });
});
