<div align="center">

# 🎨 muja-ui

**A cross-platform design system for Next.js (SSR-first) and React Native.**

Design tokens → theme engine → CSS variables. One API, every platform.

[![CI](https://github.com/mujammed-04/muja-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/mujammed-04/muja-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/%40muja-ui%2Fweb?label=%40muja-ui%2Fweb&color=4f46e5)](https://www.npmjs.com/package/@muja-ui/web)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## ✨ Highlights

- 🧬 **Token-driven** — colors, typography, spacing, radius, shadows, motion, z-index. No component ever hardcodes a value.
- 🌗 **Dark mode done right** — `light / dark / system` with persistence and zero SSR flash.
- ⚡ **SSR & RSC-first** — every component renders in React Server Components; only the theme provider is a client module.
- 🎨 **Custom themes in one call** — `createTheme(lightTheme, { colors: { primary: '#7c3aed' } })`.
- 🌲 **Tree-shakable** — ESM + CJS, `sideEffects: false`, import only what you use.
- ♿ **Accessible** — semantic HTML, focus-visible rings, `aria-busy` loading states, reduced-motion support.
- 📱 **React Native on the roadmap** — tokens are platform-neutral data; the native package will share the same API.

## 📦 Packages

| Package                                                            | What's inside                                                                                                                                                                                                                                                  |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@muja-ui/web`](https://www.npmjs.com/package/@muja-ui/web)       | SSR-first React components: primitives (Box, Flex, Stack, Text, …), forms (Button, Input, Select, Checkbox, Switch, …), feedback (Spinner, Skeleton, Progress), layout (Card, Badge, Table, Tooltip) and client components (Avatar, Tabs, Modal via `/client`) |
| [`@muja-ui/core`](https://www.npmjs.com/package/@muja-ui/core)     | Theme engine, CSS-variable generator, icon registry, `ThemeProvider` + hooks (`/client`)                                                                                                                                                                       |
| [`@muja-ui/tokens`](https://www.npmjs.com/package/@muja-ui/tokens) | Design tokens — platform-neutral values shared by web and native                                                                                                                                                                                               |
| [`@muja-ui/icons`](https://www.npmjs.com/package/@muja-ui/icons)   | Tree-shakable stroke icon set                                                                                                                                                                                                                                  |
| [`@muja-ui/utils`](https://www.npmjs.com/package/@muja-ui/utils)   | Framework-free helpers (`cx`, `deepMerge`, `clamp`, …)                                                                                                                                                                                                         |

## 🚀 Quick start

```sh
pnpm add @muja-ui/web
```

Wire up the theme once in your root layout (Next.js App Router — everything below is a Server Component):

```tsx
// app/layout.tsx
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

Then build UI with token-bound props:

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

## 🎨 Theming

```tsx
import { createTheme, lightTheme, ThemeStyles } from '@muja-ui/web';

const brand = createTheme(lightTheme, {
  name: 'brand',
  colors: { primary: '#7c3aed', primaryHover: '#6d28d9' },
});

<ThemeStyles theme={brand} />;
```

**How dark mode works:**

- `ThemeStyles` emits light variables on `:root`, dark variables on `[data-theme="dark"]`, plus a `prefers-color-scheme` fallback — themes apply with **zero re-renders**.
- `ThemeProvider` manages the `light | dark | system` preference, persists it to `localStorage`, and sets `data-theme` on `<html>`.
- `ColorModeScript` runs before first paint, so SSR pages never flash the wrong mode.
- In client components: `useColorMode()`, `useTheme()`, `useColorModeValue(a, b)`.

## 🧱 Style props

Layout primitives accept token-bound style props that resolve to CSS variables — type-checked against the design scale:

```tsx
<Box p={4} px={6} bg="surface" radius="lg" shadow="md" borderWidth="thin" borderColor="border" />
<Flex gap={2} align="center" justify="space-between" />
```

## 🏗 Architecture

```
tokens (data) ──► core (theme engine) ──► CSS variables (--mj-*) ──► web components
                     │
                     └──► native components (planned) — same tokens, same API
```

- **Tokens are data** — unitless numbers and structured shadows, consumable by web (as rem/px) and React Native (as-is).
- **Semantic colors only** — components reference roles (`bg`, `surface`, `primary`, `textSecondary`, …), never raw palette values.
- **RSC-safe by default** — only `@muja-ui/core/client` carries `"use client"`.
- **Identical API across platforms** — the blueprint rule: `<Button variant="primary" size="lg" loading>` must work the same on web and native.

## 🛠 Development

```sh
pnpm install
pnpm verify        # turbo run lint typecheck test build
pnpm test          # vitest across packages
pnpm build         # tsup (ESM + CJS + d.ts) per package
pnpm changeset     # start a release note
```

Releases are automated with [Changesets](https://github.com/changesets/changesets): merge the **Version Packages** PR and CI publishes to npm.

## 📖 Storybook

```sh
pnpm storybook        # dev server on http://localhost:6006
pnpm build-storybook  # static build into apps/storybook/storybook-static
```

Every component has stories, grouped as Foundations / Primitives / Forms /
Feedback / Data Display / Layout / Overlays / Navigation / Media. Two toolbar
controls drive the whole canvas:

- **Theme** — base (`@muja-ui/core`) or SDU brand (`@muja-ui/theme-sdu`).
- **Mode** — light or dark, applied the way an app applies it (`data-theme` on
  `<html>`, no component re-render).

Prop tables and descriptions are generated from the components' TypeScript
interfaces, so the docs cannot drift from the API. Stories import the workspace
**sources** (not `dist`), so `pnpm storybook` works without building first and
edits to a component or to `styles.css` hot-reload.

## 🗺 Roadmap

| Phase                             | Status                                                               |
| --------------------------------- | -------------------------------------------------------------------- |
| 1 — Foundation                    | ✅ Turborepo, pnpm, TS, ESLint, Prettier, Changesets, GitHub Actions |
| 2 — Design tokens                 | ✅ All 10 token groups                                               |
| 3 — Theme engine                  | ✅ Light / dark / custom themes via CSS variables                    |
| 4 — Core package                  | ✅ Provider, hooks, utilities, types, icon registry                  |
| 5 — Web package                   | ✅ SSR/RSC-compatible foundation                                     |
| 6 — Native package                | ⏳ Next milestone                                                    |
| 7 — Primitives                    | ✅ Box, Flex, Stack, Spacer, Divider, Text, Heading, Icon            |
| 8 — Form components               | 🟡 Button shipped; Input, Checkbox, Switch, Select next              |
| 9–11 — Overlays, Feedback, Layout | ⏳ Planned                                                           |
| 12 — Documentation site           | 🟡 Storybook workbench shipped (`pnpm storybook`); docs site planned |
| 13 — Testing                      | 🟡 Vitest + Testing Library; Playwright / Detox planned              |
| 14 — Release                      | ✅ Automated npm publishing via Changesets                           |

Built from [DESIGN_SYSTEM_BLUEPRINT.md](./DESIGN_SYSTEM_BLUEPRINT.md) — the single source of truth for this project.

## 📄 License

[MIT](./LICENSE)
