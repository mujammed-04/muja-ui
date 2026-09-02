import { Platform } from 'react-native';

/** Names that mean "the platform's own UI font" on the web; React Native spells that `undefined`. */
const SYSTEM_SANS = new Set([
  '-apple-system',
  'blinkmacsystemfont',
  'system-ui',
  'ui-sans-serif',
  'ui-rounded',
  'sans-serif',
  'system',
  'roboto',
]);

const SYSTEM_MONO = new Set(['ui-monospace', 'monospace']);
const SYSTEM_SERIF = new Set(['ui-serif', 'serif']);

/** Faces that exist on one platform only; asking the other for them logs a warning and falls back. */
const IOS_ONLY = new Set([
  'helvetica neue',
  'georgia',
  'menlo',
  'times new roman',
  'times',
  'arial',
]);
const NEVER_INSTALLED = new Set([
  'segoe ui',
  'sfmono-regular',
  'sf mono',
  'liberation mono',
  'consolas',
  'cambria',
]);

/**
 * Turns a CSS font stack from the theme into the single family React Native
 * wants. The tokens are written as web stacks
 * (`"'Gilroy', -apple-system, BlinkMacSystemFont, …"`); passing that string
 * to `fontFamily` on iOS logs "Unrecognized font family" and silently falls
 * back, so the first usable entry is picked here instead:
 *
 * - a system keyword (`-apple-system`, `system-ui`, `sans-serif`, `System`…)
 *   resolves to `undefined` — SF Pro on iOS, Roboto on Android;
 * - `ui-monospace` / `ui-serif` resolve to the platform's built-in face;
 * - web-only names (`Segoe UI`, `SF Mono`…) are skipped;
 * - anything else (`Gilroy`) is returned verbatim for the app to have loaded.
 *
 * ```ts
 * nativeFontFamily(theme.typography.fontFamily.sans) // → undefined on a stock theme
 * ```
 */
export function nativeFontFamily(stack: string | undefined): string | undefined {
  if (!stack) return undefined;
  const ios = Platform.OS === 'ios';

  for (const raw of stack.split(',')) {
    const name = raw.trim().replace(/^['"]|['"]$/g, '');
    if (!name) continue;
    const key = name.toLowerCase();

    if (SYSTEM_SANS.has(key)) return undefined;
    if (SYSTEM_MONO.has(key)) return ios ? 'Menlo' : 'monospace';
    if (SYSTEM_SERIF.has(key)) return ios ? 'Georgia' : 'serif';
    if (NEVER_INSTALLED.has(key)) continue;
    if (!ios && IOS_ONLY.has(key)) continue;
    return name;
  }
  return undefined;
}
