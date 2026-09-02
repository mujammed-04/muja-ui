# @muja-ui/native

React Native / Expo components for muja-ui. Same design tokens, same theme
engine and the same prop vocabulary as [`@muja-ui/web`](../web) — one design
system, two renderers.

```sh
pnpm add @muja-ui/native @muja-ui/theme-sdu
```

Peer dependencies: `react`, `react-native`, `react-native-safe-area-context`,
`react-native-svg`.

## Setup

Wrap the app once. `SafeAreaProvider` must be outside `ThemeProvider`, because
`Screen`, `BottomSheet`, `Drawer` and `ToastProvider` all read safe-area insets.

```tsx
import { sduDarkTheme, sduLightTheme } from '@muja-ui/theme-sdu';
import { ThemeProvider, ToastProvider } from '@muja-ui/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={sduLightTheme} darkTheme={sduDarkTheme}>
        <ToastProvider>
          <Stack />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

`colorMode` defaults to `'system'` and follows the OS through
`useColorScheme()`. React Native has no synchronous storage, so persistence is
the app's job — pass the stored value as `colorMode` and save from
`onColorModeChange`.

## How it differs from the web package

Both packages take the same props for the same concepts (`variant`, `size`,
`tone`, `loading`, `fullWidth`, `invalid`, and the token style props `p`, `px`,
`bg`, `radius`, `shadow`, `w`, `h`, …). The differences are all forced by the
platform:

|                 | Web                            | Native                                                                  |
| --------------- | ------------------------------ | ----------------------------------------------------------------------- |
| Styling         | `mj-*` classes + `var(--mj-*)` | `useTheme()` resolves tokens to a `StyleSheet` object                   |
| Entry points    | `.` (RSC-safe) + `./client`    | one entry — there are no Server Components                              |
| Change handlers | DOM events (`onChange(event)`) | value callbacks (`onChange(nextValue)`)                                 |
| `Select`        | `<option>` children            | an `options` array                                                      |
| Anchored menus  | `DropdownMenu`, `Popover`      | `ActionSheet` — a dropdown anchored to a tap target is wrong on a phone |
| `Table`         | semantic `<table>`             | not provided; use `ListRow` or a `FlatList`                             |
| Tooltip         | hover                          | long-press, and the label doubles as the accessibility hint             |
| `Tabs`          | `TabList` / `Tab` / `TabPanel` | an `items` array; the screen renders the panel for the active value     |

Native-only additions, for things every screen needs: `Screen` (safe-area page
shell with pull-to-refresh), `ListRow`, `EmptyState`, `FormField`, `HStack`.

## iOS follows the Human Interface Guidelines

The same component renders as a native iOS control on iOS and as the shared
design elsewhere. Nothing in the API changes; `Platform.OS` picks the branch.

|                               | iOS                                                                                 | Android                                |
| ----------------------------- | ----------------------------------------------------------------------------------- | -------------------------------------- |
| Type scale                    | Dynamic Type sizes: `xs` 13, `sm` 15, `md` 17, `lg` 20, `xl` 22, `2xl` 28, `3xl` 34 | shared tokens (`md` 16)                |
| Radii                         | UIKit: `md` 10, `lg` 12, `xl` 14, `2xl` 20                                          | shared tokens                          |
| Font                          | SF Pro (system) unless the theme names a loaded face                                | Roboto (system)                        |
| `Button` `outline` / `ghost`  | tinted / plain (UIKit configurations); press dims                                   | stroked / transparent; press recolours |
| `Switch`                      | `UISwitch`, tinted with `primary`                                                   | drawn from primitives                  |
| `Checkbox`                    | round (Reminders idiom)                                                             | square                                 |
| `Input`, `Textarea`, `Select` | filled, borderless; stroke on focus/error; native clear button                      | outlined on a surface                  |
| `Tabs variant="segmented"`    | `UISegmentedControl` look                                                           | pill switch                            |
| `ActionSheet`                 | `UIAlertController` action sheet: inset cards, centred tint labels, separate Cancel | list in a `BottomSheet`                |
| `Card` `outline`              | hairline                                                                            | 1pt border                             |
| `ListRow`                     | 44pt table cell                                                                     | 56pt list item                         |

The metrics are applied by `ThemeProvider` through `adaptThemeToPlatform()`
(the override itself is exported as `iosThemeOverride`), so `useTheme()` in
your own screens sees iOS values too — `theme.typography.fontSize.md` is 17 on
an iPhone. Pass `platformAdaptive={false}` to render the shared tokens
verbatim everywhere. Colors are never adapted: brand and dark mode stay the
theme's business.

Two helpers are exported for app-built controls:

- `nativeFontFamily(stack)` reduces a theme font stack to the one family React
  Native can load (`undefined` means the system font).
- `pressFeedback(pressed, variantColors(variant, theme))` returns the
  background/opacity a button-like pressable should show — dimming on iOS,
  recolouring on Android.

## Components

**Primitives** — `Box`, `Flex`, `Stack`, `HStack`, `Spacer`, `Divider`, `Text`,
`Heading`, `Icon`

**Form** — `Button`, `IconButton`, `Input`, `Textarea`, `Label`, `FormField`,
`Checkbox`, `Switch`, `RadioGroup` / `Radio`, `Select`

**Feedback** — `Spinner`, `Skeleton`, `Progress`, `EmptyState`,
`ToastProvider` / `useToast`

**Layout & data** — `Screen`, `Container`, `Section`, `Card` (+ `CardHeader`,
`CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), `ListRow`,
`Badge`, `Chip`, `Avatar`, `Tabs`, `Accordion` / `Collapse`, `Calendar`,
`Carousel`, `Tooltip`

**Overlays** — `Modal` (+ `ModalHeader`, `ModalTitle`, `ModalBody`,
`ModalFooter`), `BottomSheet`, `Drawer`, `ActionSheet`

## Conventions

- Every colour comes from a semantic token (`theme.colors.*`). No component
  contains a raw colour value, so brand themes and dark mode apply for free.
- Sizes come from `sizeMetrics` and variants from `variantColors`
  (`src/system/variants.ts`), so a `size="lg"` Button, Input and Select all
  agree on height.
- Interactive components carry `accessibilityRole` and `accessibilityState`;
  `IconButton` requires `accessibilityLabel` at the type level.

## Testing

React Native can't load under vitest/jsdom (untranspiled Flow, native
runtime), so `test/react-native-stub.tsx` renders each RN primitive as a host
element and maps `accessibility*` props to their ARIA equivalents. Tests then
query by role and label, and read resolved styles via `styleOf()`. The stub is
test-only and never ships.

```sh
pnpm test
```
