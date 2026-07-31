import {
  cssVarsToString,
  darkTheme as defaultDarkTheme,
  lightTheme as defaultLightTheme,
  themeToCssVars,
  type Theme,
} from '@muja-ui/core';
import type { ReactElement } from 'react';

export interface ThemeStylesProps {
  /** Light-mode theme. Defaults to the built-in light theme. */
  theme?: Theme;
  /** Dark-mode theme. Pass `null` to opt out of dark mode entirely. */
  darkTheme?: Theme | null;
  /** Follow `prefers-color-scheme` when no explicit `data-theme` is set. */
  includeSystemFallback?: boolean;
  /** Apply font/background/color defaults to `<body>`. */
  includeBaseStyles?: boolean;
  /** CSP nonce for the inline `<style>`. */
  nonce?: string;
}

/**
 * Server component that injects the theme as CSS custom properties.
 * Render once near the root (e.g. in the Next.js root layout `<head>`):
 *
 * - `:root` gets the light theme;
 * - `[data-theme="dark"]` gets the dark theme (set by ThemeProvider);
 * - a `prefers-color-scheme` fallback covers system preference before
 *   hydration or without a provider.
 */
export function ThemeStyles({
  theme = defaultLightTheme,
  darkTheme = defaultDarkTheme,
  includeSystemFallback = true,
  includeBaseStyles = true,
  nonce,
}: ThemeStylesProps): ReactElement {
  let css = cssVarsToString({ 'color-scheme': 'light', ...themeToCssVars(theme) }, ':root');

  if (darkTheme) {
    const darkVars = { 'color-scheme': 'dark', ...themeToCssVars(darkTheme) };
    css += cssVarsToString(darkVars, '[data-theme="dark"]');
    if (includeSystemFallback) {
      css += `@media (prefers-color-scheme: dark){${cssVarsToString(
        darkVars,
        ':root:not([data-theme="light"])',
      )}}`;
    }
  }

  if (includeBaseStyles) {
    css +=
      'body{font-family:var(--mj-font-sans);background-color:var(--mj-color-bg);color:var(--mj-color-text);}';
  }

  return <style data-muja-ui="theme" nonce={nonce} dangerouslySetInnerHTML={{ __html: css }} />;
}
