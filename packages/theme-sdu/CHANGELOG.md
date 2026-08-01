# @muja-ui/theme-sdu

## 0.2.0

### Minor Changes

- a2f0c52: Add an `accent` color role, `accent`/`link` button variants and `DropdownMenuCheckboxItem`

  - **tokens**: new `accent` palette scale (teal by default) and six semantic
    roles — `accent`, `accentHover`, `accentActive`, `accentSubtle`, `accentText`,
    `onAccent`. Brands with a secondary hue no longer have to overload `warning`.
  - **core**: `Variant` gains `'accent'` and `'link'`.
  - **web**: `<Button variant="accent">` for emphasis CTAs and
    `<Button variant="link">`, which drops the button box so it aligns with
    surrounding copy. New `<DropdownMenuCheckboxItem>` (`role="menuitemcheckbox"`)
    for multi-select menus — it keeps the menu open by default and joins the
    existing roving-focus order.
  - **theme-sdu**: bronze now maps to `accent` instead of `warning`, so
    `variant="accent"` is the brandbook's bronze CTA and `warning` goes back to
    the base amber.

### Patch Changes

- Updated dependencies [a2f0c52]
  - @muja-ui/tokens@0.2.0
  - @muja-ui/core@0.2.0

## 0.1.0

### Minor Changes

- 3319b53: Initial release: SDU Life brand theme for muja-ui.

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
