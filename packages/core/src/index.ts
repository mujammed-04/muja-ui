// Theme engine (React Server Components-safe — no client-only code here).
export type {
  ColorMode,
  ResolvedColorMode,
  Theme,
  ThemeMotion,
  ThemeOverride,
  ThemeTypography,
} from './theme/types';
export { darkTheme, lightTheme } from './theme/themes';
export { createTheme } from './theme/createTheme';
export {
  CSS_VAR_PREFIX,
  cssVar,
  cssVarName,
  cssVarsToString,
  themeToCssVars,
  type CssVarGroup,
} from './theme/cssVars';

// Icon registry.
export {
  getIcon,
  getRegisteredIconNames,
  hasIcon,
  registerIcons,
  type IconDefinition,
} from './icons/registry';

// React helpers (server-safe pure functions).
export { composeEventHandlers, mergeRefs } from './react';

// Shared component contract types.
export type { Size, Status, Variant } from './types';
