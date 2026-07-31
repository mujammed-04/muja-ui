import type { ColorMode } from '@muja-ui/core';
import type { ReactElement } from 'react';

export interface ColorModeScriptProps {
  /** Must match the ThemeProvider's `defaultColorMode`. */
  defaultColorMode?: ColorMode;
  /** Must match the ThemeProvider's `storageKey`. */
  storageKey?: string;
  /** CSP nonce for the inline `<script>`. */
  nonce?: string;
}

/**
 * Blocking inline script that sets `data-theme` on `<html>` before first
 * paint, preventing a dark-mode flash on SSR pages. Render it as early as
 * possible in `<body>` (or `<head>`).
 */
export function ColorModeScript({
  defaultColorMode = 'system',
  storageKey = 'muja-ui-color-mode',
  nonce,
}: ColorModeScriptProps): ReactElement {
  const code =
    '(function(){try{' +
    `var m=localStorage.getItem(${JSON.stringify(storageKey)})||${JSON.stringify(defaultColorMode)};` +
    "var d=m==='dark'||(m!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);" +
    "document.documentElement.dataset.theme=d?'dark':'light';" +
    '}catch(e){}})();';

  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: code }} />;
}
