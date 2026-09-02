import {
  darkTheme as defaultDarkTheme,
  lightTheme as defaultLightTheme,
  type ColorMode,
  type ResolvedColorMode,
  type Theme,
} from '@muja-ui/core';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { adaptThemeToPlatform } from '../system/platform';

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

export interface ThemeProviderProps {
  /** Theme used in light mode. Defaults to the built-in light theme. */
  theme?: Theme;
  /** Theme used in dark mode. Defaults to the built-in dark theme. */
  darkTheme?: Theme;
  /** Uncontrolled initial preference. */
  defaultColorMode?: ColorMode;
  /**
   * Controlled preference. React Native has no synchronous storage, so
   * persistence belongs to the app (SecureStore, AsyncStorage, MMKV…): pass the
   * stored value here and write it back from `onColorModeChange`.
   */
  colorMode?: ColorMode;
  onColorModeChange?: (mode: ColorMode) => void;
  /**
   * Lay the platform's own metrics over the theme — on iOS the HIG type scale
   * (Body 17, Footnote 13…) and UIKit radii. Colors are never touched. Defaults
   * to true; turn off to render the shared tokens verbatim on every platform.
   */
  platformAdaptive?: boolean;
  children: ReactNode;
}

/**
 * Provides the resolved theme to every native component. `'system'` follows the
 * OS appearance through React Native's `useColorScheme()`. On iOS the theme is
 * rendered through Apple HIG metrics (see `adaptThemeToPlatform`).
 *
 * ```tsx
 * <ThemeProvider theme={sduLightTheme} darkTheme={sduDarkTheme}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({
  theme = defaultLightTheme,
  darkTheme = defaultDarkTheme,
  defaultColorMode = 'system',
  colorMode: colorModeProp,
  onColorModeChange,
  platformAdaptive = true,
  children,
}: ThemeProviderProps) {
  const [uncontrolledMode, setUncontrolledMode] = useState<ColorMode>(defaultColorMode);
  const colorMode = colorModeProp ?? uncontrolledMode;

  const systemScheme = useColorScheme();
  const resolvedColorMode: ResolvedColorMode =
    colorMode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : colorMode;

  const setColorMode = useCallback(
    (mode: ColorMode) => {
      if (colorModeProp === undefined) setUncontrolledMode(mode);
      onColorModeChange?.(mode);
    },
    [colorModeProp, onColorModeChange],
  );

  const toggleColorMode = useCallback(() => {
    setColorMode(resolvedColorMode === 'dark' ? 'light' : 'dark');
  }, [resolvedColorMode, setColorMode]);

  const activeTheme = resolvedColorMode === 'dark' ? darkTheme : theme;
  const renderedTheme = useMemo(
    () => (platformAdaptive ? adaptThemeToPlatform(activeTheme) : activeTheme),
    [activeTheme, platformAdaptive],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: renderedTheme,
      colorMode,
      resolvedColorMode,
      setColorMode,
      toggleColorMode,
    }),
    [renderedTheme, colorMode, resolvedColorMode, setColorMode, toggleColorMode],
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
