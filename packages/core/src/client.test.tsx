import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import { ThemeProvider, useColorMode, useColorModeValue, useTheme } from './client';
import { createTheme } from './theme/createTheme';
import { lightTheme } from './theme/themes';

// Node 25 ships its own experimental `localStorage` global that shadows
// jsdom's and is non-functional without --localstorage-file. Install a
// deterministic in-memory implementation instead.
class MemoryStorage {
  private store = new Map<string, string>();
  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  clear(): void {
    this.store.clear();
  }
}

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: new MemoryStorage(),
    configurable: true,
  });
});

function Probe() {
  const theme = useTheme();
  const { resolvedColorMode, toggleColorMode } = useColorMode();
  const label = useColorModeValue('sun', 'moon');
  return (
    <button onClick={toggleColorMode}>
      {theme.name}:{resolvedColorMode}:{label}
    </button>
  );
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  delete document.documentElement.dataset.theme;
});

describe('ThemeProvider', () => {
  it('provides the light theme by default (jsdom has no matchMedia)', () => {
    render(
      <ThemeProvider defaultColorMode="light">
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button').textContent).toBe('light:light:sun');
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('toggles to dark, updates the DOM attribute and persists the choice', () => {
    render(
      <ThemeProvider defaultColorMode="light">
        <Probe />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button').textContent).toBe('dark:dark:moon');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(window.localStorage.getItem('muja-ui-color-mode')).toBe('dark');
  });

  it('restores a stored preference on mount', () => {
    window.localStorage.setItem('muja-ui-color-mode', 'dark');
    render(
      <ThemeProvider defaultColorMode="light">
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button').textContent).toBe('dark:dark:moon');
  });

  it('serves custom themes', () => {
    const brand = createTheme(lightTheme, { name: 'brand' });
    render(
      <ThemeProvider theme={brand} defaultColorMode="light">
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByRole('button').textContent).toBe('brand:light:sun');
  });
});
