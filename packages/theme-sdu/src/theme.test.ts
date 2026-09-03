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
    expect(sduLightTheme.colors.onAccent).toBe(navy[900]);
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

/** WCAG 2.1 relative luminance / contrast ratio, for the on-* pairs below. */
function luminance(hex: string): number {
  const channel = (value: number): number => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const int = parseInt(hex.replace('#', ''), 16);
  return (
    0.2126 * channel((int >> 16) & 255) +
    0.7152 * channel((int >> 8) & 255) +
    0.0722 * channel(int & 255)
  );
}

function contrast(a: string, b: string): number {
  const first = luminance(a);
  const second = luminance(b);
  const hi = Math.max(first, second);
  const lo = Math.min(first, second);
  return (hi + 0.05) / (lo + 0.05);
}

describe('contrast', () => {
  it('clears WCAG AA for every on-color pair', () => {
    for (const theme of [sduLightTheme, sduDarkTheme]) {
      const pairs: Array<[string, string, string]> = [
        ['onPrimary', theme.colors.onPrimary, theme.colors.primary],
        ['onAccent', theme.colors.onAccent, theme.colors.accent],
        ['onSecondary', theme.colors.onSecondary, theme.colors.secondary],
        ['onDanger', theme.colors.onDanger, theme.colors.danger],
      ];
      for (const [name, fg, bg] of pairs) {
        expect(contrast(fg, bg), `${theme.name} ${name}: ${fg} on ${bg}`).toBeGreaterThanOrEqual(
          4.5,
        );
      }
    }
  });

  // The on-* pairs above only cover text sitting on a filled brand colour.
  // Body copy on the page and card backgrounds is the far more common case,
  // and dark mode drifted under AA there while light mode passed.
  it('clears WCAG AA for text on both page and card backgrounds', () => {
    for (const theme of [sduLightTheme, sduDarkTheme]) {
      const grounds: Array<[string, string]> = [
        ['bg', theme.colors.bg],
        ['surface', theme.colors.surface],
      ];
      const foregrounds: Array<[string, string]> = [
        ['text', theme.colors.text],
        ['textSecondary', theme.colors.textSecondary],
        ['textMuted', theme.colors.textMuted],
        ['primaryText', theme.colors.primaryText],
        ['accentText', theme.colors.accentText],
        ['dangerText', theme.colors.dangerText],
      ];
      for (const [groundName, ground] of grounds) {
        for (const [name, fg] of foregrounds) {
          expect(
            contrast(fg, ground),
            `${theme.name} ${name} on ${groundName}: ${fg} on ${ground}`,
          ).toBeGreaterThanOrEqual(4.5);
        }
      }
    }
  });

  // WCAG 1.4.11: non-text UI marks that carry meaning need 3:1. The carousel
  // draws its active dot with `primary` and its inactive one with `textMuted`,
  // so both have to clear the bar — a dot at 1.5:1 reads as absent rather than
  // inactive. `border`/`borderStrong` are exempt: purely decorative dividers
  // and control outlines, which the spec does not hold to a ratio.
  it('clears WCAG AA for meaningful non-text marks', () => {
    for (const theme of [sduLightTheme, sduDarkTheme]) {
      for (const [name, fg] of [
        ['primary', theme.colors.primary],
        ['textMuted', theme.colors.textMuted],
      ] as Array<[string, string]>) {
        expect(
          contrast(fg, theme.colors.bg),
          `${theme.name} ${name} on bg: ${fg} on ${theme.colors.bg}`,
        ).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
