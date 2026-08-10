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

| | Web | Native |
|---|---|---|
| Styling | `mj-*` classes + `var(--mj-*)` | `useTheme()` resolves tokens to a `StyleSheet` object |
| Entry points | `.` (RSC-safe) + `./client` | one entry — there are no Server Components |
| Change handlers | DOM events (`onChange(event)`) | value callbacks (`onChange(nextValue)`) |
| `Select` | `<option>` children | an `options` array |
| Anchored menus | `DropdownMenu`, `Popover` | `ActionSheet` — a dropdown anchored to a tap target is wrong on a phone |
| `Table` | semantic `<table>` | not provided; use `ListRow` or a `FlatList` |
| Tooltip | hover | long-press, and the label doubles as the accessibility hint |
| `Tabs` | `TabList` / `Tab` / `TabPanel` | an `items` array; the screen renders the panel for the active value |

Native-only additions, for things every screen needs: `Screen` (safe-area page
shell with pull-to-refresh), `ListRow`, `EmptyState`, `FormField`, `HStack`.

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
