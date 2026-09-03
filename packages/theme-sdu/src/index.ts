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

/**
 * SDU brand bronze scale — the 25% half of the brandbook's 75/25 navy/bronze
 * split. Mapped to the `accent` role (so `<Button variant="accent">` is a
 * bronze CTA); `warning` keeps the base theme's amber, since a bronze
 * emphasis colour is not a warning signal.
 */
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

    accent: bronze[500],
    accentHover: bronze[600],
    accentActive: bronze[700],
    accentSubtle: bronze[50],
    accentText: bronze[700],
    // Navy, not white: white on bronze-500 is 2.9:1, below the 4.5:1 AA floor.
    // Navy-900 on the same bronze is 7:1.
    onAccent: navy[900],

    secondary: navy[100],
    secondaryHover: navy[200],
    secondaryActive: navy[300],
    onSecondary: navy[900],

    // Rose-600 rather than rose-500: white on rose-500 is 3.7:1, under AA.
    danger: '#e11d48',
    dangerHover: '#be123c',
    dangerActive: '#9f1239',
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
    // Navy-300, not 400: navy-400 is 3.42:1 on bg and 3.19:1 on a surface —
    // under the 4.5:1 AA floor for the secondary text this token carries most
    // (list subtitles, empty-state copy). Navy-300 is 6.64:1 / 6.18:1.
    textMuted: navy[300],
    textDisabled: navy[600],
    textInverse: navy[950],

    border: navy[800],
    // The outline of an unchecked checkbox/radio, i.e. the only thing showing
    // the control is there. Navy-600 was 1.61:1 against these near-black
    // surfaces and read as nothing at all; navy-400 is 3.42:1.
    borderStrong: navy[400],
    borderMuted: navy[900],
    focusRing: navy[300],

    // Navy-300 so the active carousel dot and tab underline stay clearly ahead
    // of the brightened borderStrong above (6.64:1 vs 3.42:1).
    primary: navy[300],
    primaryHover: navy[200],
    primaryActive: navy[100],
    primarySubtle: navy[900],
    primarySubtleHover: navy[800],
    primaryText: navy[300],
    // Navy, not white: on the lightened primary above white is only 3.05:1,
    // while navy-950 is 6.64:1 — same reasoning as onAccent/onDanger below.
    onPrimary: navy[950],

    accent: bronze[400],
    accentHover: bronze[300],
    accentActive: bronze[200],
    accentSubtle: bronze[900],
    accentText: bronze[300],
    onAccent: navy[950],

    secondary: navy[800],
    secondaryHover: navy[700],
    secondaryActive: navy[600],
    onSecondary: navy[50],

    danger: '#f43f5e',
    dangerHover: '#fb7185',
    dangerActive: '#fda4af',
    dangerSubtle: '#4c0519',
    dangerText: '#fda4af',
    // Navy label on the bright rose: white would be 3.7:1, navy-950 is 5.5:1.
    onDanger: navy[950],
  },
  typography: {
    fontFamily: { sans: sduFontSans },
  },
});
