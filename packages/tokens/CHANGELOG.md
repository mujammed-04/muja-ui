# @muja-ui/tokens

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

## 0.1.0

### Minor Changes

- daf08ac: Initial release of the muja-ui design system.

  - `@muja-ui/tokens` — design tokens: color palette + semantic roles (light/dark), typography, spacing, radius, borders, shadows, opacity, breakpoints, motion, z-index
  - `@muja-ui/core` — theme engine (`lightTheme`/`darkTheme`, `createTheme`, CSS variable generation), icon registry, shared types; `@muja-ui/core/client` with `ThemeProvider`, `useTheme`, `useColorMode`
  - `@muja-ui/web` — SSR-first React 19 components: Box, Flex, Stack, Spacer, Divider, Text, Heading, VisuallyHidden, Icon, Button, plus `ThemeStyles`, `ColorModeScript` and `styles.css`
  - `@muja-ui/icons` — tree-shakable stroke icon set
  - `@muja-ui/utils` — framework-free helpers (`cx`, `deepMerge`, `clamp`, …)
