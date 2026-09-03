# @muja-ui/theme-sdu

## 0.2.2

### Patch Changes

- 519b000: Fix the carousel's page indicator lagging behind the slide, and raise dark-mode contrast to WCAG AA.

  - **Carousel** tracked the active slide with `onMomentumScrollEnd`, which fires only once the fling has fully decelerated — so the dots kept pointing at the previous banner for a second or more after the new one had snapped into place. The index is now read during the scroll (`onScroll`, 16ms) and clamped to the real slide range, so a rubber-band overscroll can no longer select a dot that does not exist. The active dot animates its width and colour over `duration.fast` instead of snapping.
  - **Carousel dots** draw the inactive state from `textMuted` rather than `borderStrong`. The dots carry meaning, so WCAG 1.4.11 asks 3:1 against the page; the control-border tokens sat at roughly 1.5:1 in both themes, which read as an absent dot rather than an inactive one.
  - **Tabs** give their labels an explicit line box and stop the scrollable variant from stretching, which together clipped the descenders off longer labels.
  - **sdu-dark** `textMuted` was 3.42:1 on the page and 3.19:1 on a card, under the 4.5:1 AA floor for the list subtitles and empty-state copy it carries — now navy-300 (6.64:1 / 6.18:1). `borderStrong`, the outline of an unchecked checkbox or radio, was 1.61:1 and effectively invisible; now navy-400 (3.42:1). `primary` moves to navy-300 so the active dot and tab underline stay clearly ahead of that, and `onPrimary` becomes navy-950 — white on the lightened primary would be 3.05:1.
  - The theme suite now asserts contrast for text on both the page and card backgrounds, and for the non-text marks that carry meaning. The previous test only covered the `on*` pairs, which is why the drift went unnoticed.

## 0.2.1

### Patch Changes

- 241cac5: Fix accent and danger buttons failing WCAG AA

  Two on-color pairs in the SDU theme sat under the 4.5:1 floor, so
  `<Button variant="accent">` and `<Button variant="danger">` shipped
  inaccessible label contrast:

  - **accent**: white on bronze-500 was 2.9:1. The label is now navy-900 (7.0:1).
  - **danger (light)**: white on rose-500 was 3.7:1. The ramp moves one step
    darker — rose-600 base, rose-700 hover, rose-800 active (4.7:1).
  - **danger (dark)**: the bright rose keeps its place and the label becomes
    navy-950 (5.5:1) instead of white.

  A test now asserts every `on*` / surface pair in both themes clears AA, so this
  cannot regress.

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
