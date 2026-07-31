import { createTheme, darkTheme, lightTheme, type Theme } from '@muja-ui/core';

/**
 * SDU brand navy scale — the same values as sdu-web `--color-navy-*` and
 * sdu-app `constants/sdu-theme.ts`. Keep all three in sync.
 */
export const navy = {
  50: '#f0f0f5',
  100: '#dcdce8',
  200: '#babcd2',
  300: '#8e91b8',
  400: '#5c6094',
  500: '#3d407c',
  600: '#2c2e60',
  700: '#1f2152',
  800: '#17173f',
  900: '#0e0e2a',
  950: '#050514',
} as const;

/** SDU brand bronze (accent) scale. Mapped to the `warning` role and exported for direct use. */
export const bronze = {
  50: '#fdf3e7',
  100: '#fbe2c4',
  200: '#f6c896',
  300: '#f1a96b',
  400: '#e88f4f',
  500: '#d58549',
  600: '#b96b33',
  700: '#a35335',
  800: '#7e3d24',
  900: '#5b2b18',
} as const;

/**
 * Gilroy-first font stack. The theme only *names* the family — the app must
 * load the font files itself (sdu-web already does via `next/font/local`).
 * With `next/font` use the generated variable instead:
 *
 * ```ts
 * createTheme(sduLightTheme, {
 *   typography: { fontFamily: { sans: 'var(--font-gilroy), sans-serif' } },
 * });
 * ```
 */
export const sduFontSans =
  "'Gilroy', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

/**
 * SDU Life light theme. Brand primary is navy-800 (`#17173f`) — the same
 * color sdu-web uses for its primary buttons; hover lightens (navy-700)
 * because darkening a near-black navy is imperceptible.
 *
 * ```tsx
 * <ThemeStyles theme={sduLightTheme} darkTheme={sduDarkTheme} />
 * <ThemeProvider theme={sduLightTheme} darkTheme={sduDarkTheme}>…</ThemeProvider>
 * ```
 */
export const sduLightTheme: Theme = createTheme(lightTheme, {
  name: 'sdu-light',
  colors: {
    bg: '#ffffff',
    bgSubtle: '#f6f6fa',
    bgMuted: navy[50],

    surface: '#ffffff',
    surfaceHover: navy[50],
    surfaceActive: navy[100],
    overlay: 'rgba(14, 14, 42, 0.48)',

    text: navy[900],
    textSecondary: '#475569',
    textMuted: '#64748b',
    textDisabled: '#94a3b8',
    textInverse: '#ffffff',

    border: '#e2e8f0',
    borderStrong: '#cbd5e1',
    borderMuted: '#e7e7f0',
    focusRing: navy[500],

    primary: navy[800],
    primaryHover: navy[700],
    primaryActive: navy[900],
    primarySubtle: navy[50],
    primarySubtleHover: navy[100],
    primaryText: navy[700],
    onPrimary: '#ffffff',

    secondary: navy[100],
    secondaryHover: navy[200],
    secondaryActive: navy[300],
    onSecondary: navy[900],

    warning: bronze[500],
    warningSubtle: bronze[50],
    warningText: bronze[700],
    onWarning: '#ffffff',

    danger: '#f43f5e',
    dangerHover: '#e11d48',
    dangerActive: '#be123c',
    dangerSubtle: '#fff1f2',
    dangerText: '#be123c',
    onDanger: '#ffffff',
  },
  typography: {
    fontFamily: { sans: sduFontSans },
  },
});

/** SDU Life dark theme — navy-tinted surfaces instead of neutral gray. */
export const sduDarkTheme: Theme = createTheme(darkTheme, {
  name: 'sdu-dark',
  colors: {
    bg: navy[950],
    bgSubtle: navy[900],
    bgMuted: navy[800],

    surface: navy[900],
    surfaceHover: navy[800],
    surfaceActive: navy[700],
    overlay: 'rgba(5, 5, 20, 0.64)',

    text: navy[50],
    textSecondary: navy[200],
    textMuted: navy[400],
    textDisabled: navy[600],
    textInverse: navy[950],

    border: navy[800],
    borderStrong: navy[600],
    borderMuted: navy[900],
    focusRing: navy[300],

    primary: navy[400],
    primaryHover: navy[300],
    primaryActive: navy[200],
    primarySubtle: navy[900],
    primarySubtleHover: navy[800],
    primaryText: navy[300],
    onPrimary: '#ffffff',

    secondary: navy[800],
    secondaryHover: navy[700],
    secondaryActive: navy[600],
    onSecondary: navy[50],

    warning: bronze[400],
    warningSubtle: bronze[900],
    warningText: bronze[300],
    onWarning: navy[950],

    danger: '#f43f5e',
    dangerHover: '#fb7185',
    dangerActive: '#fda4af',
    dangerSubtle: '#4c0519',
    dangerText: '#fda4af',
    onDanger: '#ffffff',
  },
  typography: {
    fontFamily: { sans: sduFontSans },
  },
});
