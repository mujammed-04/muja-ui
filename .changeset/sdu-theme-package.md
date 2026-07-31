---
'@muja-ui/theme-sdu': minor
---

Initial release: SDU Life brand theme for muja-ui.

- `sduLightTheme` / `sduDarkTheme` — built with `createTheme`, navy-800
  (`#17173f`) brand primary matching sdu-web, navy-tinted dark surfaces,
  bronze mapped to the `warning` role
- `navy` / `bronze` palettes exported for direct use (same values as sdu-web
  `--color-navy-*` and sdu-app `constants/sdu-theme.ts`)
- `sduFontSans` — Gilroy-first stack; apps load the font files themselves

```tsx
import { sduDarkTheme, sduLightTheme } from '@muja-ui/theme-sdu';

<ThemeStyles theme={sduLightTheme} darkTheme={sduDarkTheme} />
<ThemeProvider theme={sduLightTheme} darkTheme={sduDarkTheme}>…</ThemeProvider>
```
