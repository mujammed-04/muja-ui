# @muja-ui/web

## 0.7.0

### Minor Changes

- 7b388b3: Carousel: looping, slide observation and an imperative handle

  `<Carousel>` gains three optional props so apps can build autoplay banners and
  indicator dots without reaching for an animation engine:

  - `loop` — the controls wrap around instead of disabling at the ends.
  - `onSlideChange(index)` — fires when the snapped slide changes.
  - `apiRef` — receives a `CarouselApi` with `scrollTo`, `scrollNext` and
    `scrollPrev`.

  The default behaviour is unchanged: without these props the carousel is still
  the plain CSS scroll-snap one.

### Patch Changes

- cf2fdc9: Fix Button label wrapping when an icon is composed as a child

  `.mj-button__label` had no layout of its own, so `<Button><Icon />Save</Button>`
  broke onto two lines under any CSS reset that sets `svg { display: block }` —
  Tailwind Preflight being the common one. The label is now an inline flex row
  with the standard gap, matching what `leftIcon`/`rightIcon` already produced.

- 4aa3d6a: Make Label block-level so it stops sharing a line with its control

  `.mj-label` was `inline-flex`, so a label followed by an input rendered on the
  same line whenever the control was narrow enough to fit beside it. It is now
  `display: flex` with `width: fit-content` — own line, clickable area still
  hugging the text.

## 0.6.0

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

## 0.5.0

### Minor Changes

- 3319b53: Modal, Drawer and BottomSheet now trap focus: Tab/Shift+Tab wrap inside the
  panel, and focus returns to the previously focused element on close. The
  shared behaviour (Escape, scroll lock, focus management) lives in one internal
  hook used by all three dialogs.

## 0.4.0

### Minor Changes

- f47e9d2: Complete the blueprint component roadmap (phases 8–11):

  - `Toast` — `ToastProvider` + `useToast()`, tones, auto-dismiss, optional
    action for snackbar-style usage (covers the blueprint's Snackbar too),
    danger toasts announce as alerts
  - `RadioGroup` / `Radio` — native radios, arrow keys for free
  - `Accordion` — WAI-ARIA pattern, single/multiple, header arrow navigation
  - `BottomSheet` — Modal behaviours plus a grab handle with drag-to-dismiss
  - `Chip` — static tag, toggle button (`aria-pressed`) or removable tag
  - `Container` / `Section` — layout primitives in the RSC-safe main entry

  Chip, Container and Section ship from the main entry; the rest from
  `@muja-ui/web/client`.

## 0.3.0

### Minor Changes

- 26cd332: Add the overlay/navigation set that previously required Radix in sdu-web —
  written from scratch per the blueprint's no-UI-library rule:

  - `Popover` and `DropdownMenu` (WAI-ARIA menu-button pattern) — CSS-anchored
    positioning, outside-click and Escape handling
  - `Drawer` — edge-anchored sheet with the Modal behaviours (backdrop, Escape,
    focus, scroll lock)
  - `Calendar` — single-date WAI-ARIA grid with full keyboard navigation,
    month/weekday names via `Intl` (no date library)
  - `Carousel` — CSS scroll-snap based, native swiping, paging controls
  - `ScrollArea` — slim theme-aware scrollbars, SSR-safe (main entry)

  All stateful components ship from `@muja-ui/web/client`; `ScrollArea` is pure
  CSS and stays in the RSC-safe main entry.

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
