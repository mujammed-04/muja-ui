# muja-ui

A production-grade design system for **Next.js (SSR-first)** and **React Native**, built from
[DESIGN_SYSTEM_BLUEPRINT.md](./DESIGN_SYSTEM_BLUEPRINT.md).

Turborepo + pnpm workspaces, TypeScript-first, tree-shakable packages, no hardcoded colors —
every visual value flows from design tokens through the theme engine into CSS variables.

## Packages

| Package                  | Purpose                                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@muja-ui/tokens`        | Design tokens (colors, typography, spacing, radius, border, shadow, opacity, breakpoints, motion, z-index). Platform-neutral numbers so native can consume the same values.           |
| `@muja-ui/core`          | Theme engine: `lightTheme`/`darkTheme`, `createTheme`, `themeToCssVars`/`cssVar`, icon registry, shared types. `@muja-ui/core/client` ships `ThemeProvider` + hooks (`"use client"`). |
| `@muja-ui/web`           | SSR-first React components: Box, Flex, Stack, Spacer, Divider, Text, Heading, VisuallyHidden, Icon, Button, plus `ThemeStyles`, `ColorModeScript` and `@muja-ui/web/styles.css`.      |
| `@muja-ui/icons`         | Tree-shakable stroke-icon definitions (`CheckIcon`, `SunIcon`, …) + `allIcons` for registry lookup.                                                                                   |
| `@muja-ui/utils`         | Framework-free helpers (`cx`, `deepMerge`, `clamp`, …).                                                                                                                               |
| `@muja-ui/tsconfig`      | Shared TypeScript configs (private).                                                                                                                                                  |
| `@muja-ui/eslint-config` | Shared ESLint flat configs (private).                                                                                                                                                 |

## Quick start (Next.js App Router)

```tsx
// app/layout.tsx — everything here is a Server Component
import { ThemeStyles, ColorModeScript, ThemeProvider } from '@muja-ui/web';
import '@muja-ui/web/styles.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeStyles />
      </head>
      <body>
        <ColorModeScript />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
import { Box, Button, Heading, Stack, Text } from '@muja-ui/web';

export default function Page() {
  return (
    <Box as="main" p={8} bg="bg">
      <Stack gap={4}>
        <Heading level={1}>muja-ui</Heading>
        <Text color="textSecondary">Design tokens → theme → CSS variables.</Text>
        <Button variant="primary" size="lg" loading>
          Save
        </Button>
      </Stack>
    </Box>
  );
}
```

### Theming

```tsx
import { createTheme, lightTheme, ThemeStyles } from '@muja-ui/web';

const brand = createTheme(lightTheme, {
  name: 'brand',
  colors: { primary: '#7c3aed', primaryHover: '#6d28d9' },
});

<ThemeStyles theme={brand} />;
```

Dark mode: `ThemeStyles` emits light vars on `:root`, dark vars on `[data-theme="dark"]`
(plus a `prefers-color-scheme` fallback). `ThemeProvider` manages the
`light | dark | system` preference, persists it, and sets `data-theme` on `<html>`;
`ColorModeScript` prevents the SSR flash. `useColorMode()` / `useTheme()` are available
in client components.

## Architecture notes

- **Tokens are data.** Unitless numbers + structured shadows so `@muja-ui/native` can share them verbatim.
- **Components never hardcode colors.** Web styling references `var(--mj-*)` only — inline styles for token-bound style props (`p`, `bg`, `radius`, …) and a static stylesheet for stateful styles (Button variants/sizes, focus ring, spinner).
- **RSC-safe by default.** Only `@muja-ui/core/client` carries `"use client"`; every component in `@muja-ui/web` renders in Server Components.
- **Identical API across platforms** (blueprint rule): `@muja-ui/native` will mirror the `@muja-ui/web` component contracts.

## Development

```sh
pnpm install
pnpm verify        # turbo run lint typecheck test build
pnpm test          # vitest across packages
pnpm build         # tsup (ESM + CJS + d.ts) per package
pnpm changeset     # start a release note
```

## Roadmap status

| Blueprint phase                 | Status                                                               |
| ------------------------------- | -------------------------------------------------------------------- |
| 1 — Foundation                  | ✅ Turborepo, pnpm, TS, ESLint, Prettier, Changesets, GitHub Actions |
| 2 — Design tokens               | ✅ All 10 token groups                                               |
| 3 — Theme engine                | ✅ Light/dark/custom themes, CSS variables                           |
| 4 — Core package                | ✅ Provider, hooks, utilities, types, icon registry                  |
| 5 — Web package                 | ✅ SSR/RSC-compatible foundation                                     |
| 6 — Native package              | ⏳ Next milestone                                                    |
| 7 — Primitives                  | ✅ Box, Flex, Stack, Spacer, Divider, Text, Heading, Icon            |
| 8 — Form components             | 🟡 Button shipped; Input, Checkbox, … next                           |
| 9–11 — Overlays/Feedback/Layout | ⏳ Planned                                                           |
| 12 — Documentation              | 🟡 README-level; docs app planned                                    |
| 13 — Testing                    | 🟡 Vitest + Testing Library (47 tests); Playwright/Detox planned     |
| 14 — Release                    | 🟡 Changesets wired; first publish pending                           |
