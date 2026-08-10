/** Shared helpers for the native component tests. */
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import { sduLightTheme } from '@muja-ui/theme-sdu';
import type { ReactElement, ReactNode } from 'react';
import { ThemeProvider } from '../src/theme/ThemeProvider';

/** Reads the flattened style the stub serialised onto a host element. */
export function styleOf(element: Element | null): Record<string, unknown> {
  const raw = element?.getAttribute('data-style');
  return raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
}

/** Renders inside a ThemeProvider so `useTheme()` resolves. */
export function renderThemed(ui: ReactElement, options?: RenderOptions): RenderResult {
  const Wrapper = ({ children }: { children?: ReactNode }) => (
    <ThemeProvider theme={sduLightTheme} defaultColorMode="light">
      {children}
    </ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
}
