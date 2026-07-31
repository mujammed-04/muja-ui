import type { Theme } from './types';

/** Prefix for every muja-ui CSS custom property. */
export const CSS_VAR_PREFIX = 'mj';

export type CssVarGroup =
  | 'color'
  | 'space'
  | 'radius'
  | 'border-width'
  | 'font'
  | 'font-size'
  | 'font-weight'
  | 'leading'
  | 'tracking'
  | 'shadow'
  | 'opacity'
  | 'z'
  | 'duration'
  | 'ease';

/** `onPrimary` → `on-primary`, `0.5` → `0-5`, `2xl` → `2xl`. */
function toKebab(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[.\s_]/g, '-')
    .toLowerCase();
}

/** Full custom property name, e.g. `cssVarName('color', 'onPrimary')` → `--mj-color-on-primary`. */
export function cssVarName(group: CssVarGroup, key: string | number): string {
  return `--${CSS_VAR_PREFIX}-${group}-${toKebab(String(key))}`;
}

/** `var()` reference, e.g. `cssVar('space', 4)` → `var(--mj-space-4)`. */
export function cssVar(group: CssVarGroup, key: string | number): string {
  return `var(${cssVarName(group, key)})`;
}

const px = (value: number): string => `${value}px`;
const rem = (value: number): string => `${value / 16}rem`;
const ms = (value: number): string => `${value}ms`;

/**
 * Flattens a theme into a CSS custom property map. Font sizes become rem (so
 * they scale with user font-size preferences); spacing/radius/borders become
 * px; durations become ms.
 */
export function themeToCssVars(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};
  const set = (group: CssVarGroup, key: string | number, value: string): void => {
    vars[cssVarName(group, key)] = value;
  };

  for (const [key, value] of Object.entries(theme.colors)) set('color', key, value);
  for (const [key, value] of Object.entries(theme.space)) set('space', key, px(value));
  for (const [key, value] of Object.entries(theme.radius)) set('radius', key, px(value));
  for (const [key, value] of Object.entries(theme.borderWidth)) set('border-width', key, px(value));
  for (const [key, value] of Object.entries(theme.typography.fontFamily)) set('font', key, value);
  for (const [key, value] of Object.entries(theme.typography.fontSize))
    set('font-size', key, rem(value));
  for (const [key, value] of Object.entries(theme.typography.fontWeight))
    set('font-weight', key, value);
  for (const [key, value] of Object.entries(theme.typography.lineHeight))
    set('leading', key, String(value));
  for (const [key, value] of Object.entries(theme.typography.letterSpacing))
    set('tracking', key, px(value));
  for (const [key, value] of Object.entries(theme.shadow)) set('shadow', key, value.css);
  for (const [key, value] of Object.entries(theme.opacity)) set('opacity', key, String(value));
  for (const [key, value] of Object.entries(theme.zIndex)) set('z', key, String(value));
  for (const [key, value] of Object.entries(theme.motion.duration)) set('duration', key, ms(value));
  for (const [key, value] of Object.entries(theme.motion.easing)) set('ease', key, value);

  return vars;
}

/** Serializes a declaration map into a CSS rule for the given selector. */
export function cssVarsToString(vars: Record<string, string>, selector = ':root'): string {
  const body = Object.entries(vars)
    .map(([name, value]) => `${name}:${value};`)
    .join('');
  return `${selector}{${body}}`;
}
