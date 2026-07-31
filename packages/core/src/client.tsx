'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { darkTheme as defaultDarkTheme, lightTheme as defaultLightTheme } from './theme/themes';
import type { ColorMode, ResolvedColorMode, Theme } from './theme/types';

const DARK_QUERY = '(prefers-color-scheme: dark)';
const DEFAULT_STORAGE_KEY = 'muja-ui-color-mode';

export interface ThemeContextValue {
  /** The active theme for the resolved color mode. */
  theme: Theme;
  /** The user preference: 'light' | 'dark' | 'system'. */
  colorMode: ColorMode;
  /** What is actually rendered: 'light' | 'dark'. */
  resolvedColorMode: ResolvedColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveMode(mode: ColorMode): ResolvedColorMode {
  if (mode !== 'system') return mode;
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light';
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

function isColorMode(value: unknown): value is ColorMode {
  return value === 'light' || value === 'dark' || value === 'system';
}

export interface ThemeProviderProps {
  /** Theme used in light mode. Defaults to the built-in light theme. */
  theme?: Theme;
  /** Theme used in dark mode. Defaults to the built-in dark theme. */
  darkTheme?: Theme;
  /** Initial preference before any stored value is read. */
  defaultColorMode?: ColorMode;
  /** localStorage key for persisting the preference. */
  storageKey?: string;
  children: ReactNode;
}

export function ThemeProvider({
  theme = defaultLightTheme,
  darkTheme = defaultDarkTheme,
  defaultColorMode = 'system',
  storageKey = DEFAULT_STORAGE_KEY,
  children,
}: ThemeProviderProps) {
  const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);
  // Server render and hydration always use the non-system fallback; effects
  // below correct it on the client (pair with <ColorModeScript /> from
  // @muja-ui/web to avoid a flash of the wrong mode).
  const [resolvedColorMode, setResolvedColorMode] = useState<ResolvedColorMode>(
    defaultColorMode === 'dark' ? 'dark' : 'light',
  );

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (isColorMode(stored)) setColorModeState(stored);
    } catch {
      // Storage may be unavailable (privacy mode, SSR sandboxes); keep default.
    }
  }, [storageKey]);

  useEffect(() => {
    const update = () => setResolvedColorMode(resolveMode(colorMode));
    update();
    if (colorMode !== 'system' || typeof window.matchMedia !== 'function') return;
    const media = window.matchMedia(DARK_QUERY);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [colorMode]);

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedColorMode;
  }, [resolvedColorMode]);

  const setColorMode = useCallback(
    (mode: ColorMode) => {
      setColorModeState(mode);
      try {
        window.localStorage.setItem(storageKey, mode);
      } catch {
        // Persisting is best-effort.
      }
    },
    [storageKey],
  );

  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedColorMode === 'dark' ? 'light' : 'dark');
  }, [resolvedColorMode, setColorMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: resolvedColorMode === 'dark' ? darkTheme : theme,
      colorMode,
      resolvedColorMode,
      setColorMode,
      toggleColorMode,
    }),
    [theme, darkTheme, colorMode, resolvedColorMode, setColorMode, toggleColorMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

function useThemeContext(hookName: string): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(`[muja-ui] ${hookName} must be used within a <ThemeProvider>.`);
  }
  return context;
}

/** The active theme object (already resolved for the current color mode). */
export function useTheme(): Theme {
  return useThemeContext('useTheme').theme;
}

/** Color mode state and controls. */
export function useColorMode(): Omit<ThemeContextValue, 'theme'> {
  const { colorMode, resolvedColorMode, setColorMode, toggleColorMode } =
    useThemeContext('useColorMode');
  return { colorMode, resolvedColorMode, setColorMode, toggleColorMode };
}

/** Picks a value based on the resolved color mode. */
export function useColorModeValue<T>(lightValue: T, darkValue: T): T {
  return useThemeContext('useColorModeValue').resolvedColorMode === 'dark' ? darkValue : lightValue;
}
