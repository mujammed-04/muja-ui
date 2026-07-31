import { deepMerge } from '@muja-ui/utils';
import type { Theme, ThemeOverride } from './types';

/**
 * Creates a custom theme by deep-merging overrides onto a base theme.
 * Neither input is mutated.
 *
 * ```ts
 * const brand = createTheme(lightTheme, {
 *   name: 'brand',
 *   colors: { primary: '#7c3aed' },
 * });
 * ```
 */
export function createTheme(base: Theme, override: ThemeOverride = {}): Theme {
  return deepMerge(base, override);
}
