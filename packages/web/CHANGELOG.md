# @muja-ui/web

## 0.2.0

### Minor Changes

- 98c0d18: Add the component set that sdu-web and sdu-app rely on:

  - Form: `Input`, `Textarea`, `Label`, `Checkbox`, `Switch`, `Select`, `IconButton`
  - Feedback: `Skeleton`, `Spinner`, `Progress`
  - Layout & data: `Badge`, `Card` (+ sections), `Table` (+ sections), `Tooltip` (CSS-only)
  - Client (`@muja-ui/web/client`, new entry): `Avatar`, `Tabs`, `Modal`

  All components are semantic HTML themed via `--mj-*` variables; the main
  entry stays RSC-safe — stateful components ship from the new `/client`
  subpath, mirroring `@muja-ui/core/client`.

## 0.1.0

### Minor Changes

- daf08ac: Initial release of the muja-ui design system.

  - `@muja-ui/tokens` — design tokens: color palette + semantic roles (light/dark), typography, spacing, radius, borders, shadows, opacity, breakpoints, motion, z-index
  - `@muja-ui/core` — theme engine (`lightTheme`/`darkTheme`, `createTheme`, CSS variable generation), icon registry, shared types; `@muja-ui/core/client` with `ThemeProvider`, `useTheme`, `useColorMode`
  - `@muja-ui/web` — SSR-first React 19 components: Box, Flex, Stack, Spacer, Divider, Text, Heading, VisuallyHidden, Icon, Button, plus `ThemeStyles`, `ColorModeScript` and `styles.css`
  - `@muja-ui/icons` — tree-shakable stroke icon set
  - `@muja-ui/utils` — framework-free helpers (`cx`, `deepMerge`, `clamp`, …)

### Patch Changes

- Updated dependencies [daf08ac]
  - @muja-ui/tokens@0.1.0
  - @muja-ui/utils@0.1.0
  - @muja-ui/core@0.1.0
