# Design System Blueprint

> Version: 1.0

## Vision

Build a production-ready Design System that powers both:

- **Next.js (SSR-first)**
- **React Native**

The system must provide a unified API while allowing platform-specific
implementations.

---

# Goals

- Shared Design Tokens
- Shared Theme Engine
- SSR support for Next.js
- React Native support
- TypeScript-first
- Accessibility
- Tree-shakable packages
- Production-ready architecture

---

# Repository Structure

```text
ui-system/
├── apps/
│   ├── docs/
│   ├── web-playground/
│   └── mobile-playground/
│
├── packages/
│   ├── core/
│   ├── tokens/
│   ├── icons/
│   ├── web/
│   ├── native/
│   ├── utils/
│   ├── eslint-config/
│   └── tsconfig/
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

# Development Roadmap

## Phase 1 --- Foundation

- Create Turborepo
- Configure pnpm workspaces
- Configure TypeScript
- Configure ESLint
- Configure Prettier
- Configure Changesets
- Configure GitHub Actions

## Phase 2 --- Design Tokens

Create tokens for:

- Colors
- Typography
- Spacing
- Radius
- Border
- Shadow
- Opacity
- Breakpoints
- Motion
- Z-index

## Phase 3 --- Theme Engine

Support:

- Light
- Dark
- Custom themes

No component may contain hardcoded colors.

## Phase 4 --- Core Package

Contains:

- Theme Provider
- Hooks
- Utilities
- Shared Types
- Icon Registry

## Phase 5 --- Web Package

Requirements:

- SSR compatible
- Semantic HTML
- App Router compatible
- React Server Components friendly
- CSS Variables
- Accessibility

## Phase 6 --- Native Package

Requirements:

- View
- Text
- Pressable
- ScrollView
- SafeAreaView

## Phase 7 --- Primitive Components

- Box
- Flex
- Stack
- Spacer
- Divider
- Text
- Heading
- Icon

## Phase 8 --- Form Components

- Button
- IconButton
- Input
- Textarea
- Checkbox
- Radio
- Switch
- Select

## Phase 9 --- Overlay Components

- Modal
- Drawer
- Dialog
- Popover
- Tooltip
- BottomSheet

## Phase 10 --- Feedback

- Toast
- Snackbar
- Progress
- Spinner
- Skeleton

## Phase 11 --- Layout

- Card
- Avatar
- Badge
- Chip
- Tabs
- Accordion
- Container
- Section

## Phase 12 --- Documentation

Every component must include:

- API
- Props
- Accessibility
- SSR Notes
- Native Notes
- Examples

## Phase 13 --- Testing

- Vitest
- React Testing Library
- Playwright
- Detox

## Phase 14 --- Release

- npm publish
- Changelog
- GitHub Releases

---

# Component Rules

Every component must have:

- TypeScript types
- Tests
- Documentation
- Storybook examples
- Accessibility
- Theme support
- Dark mode support

API must remain identical between Web and Native.

Example:

```tsx
<Button variant="primary" size="lg" loading>
  Save
</Button>
```

Internal implementations may differ.

---

# SSR Rules

Never sacrifice SSR compatibility for code sharing.

Prefer semantic HTML:

- button
- input
- section
- article
- nav
- main

Avoid unnecessary client components.

---

# React Native Rules

Prefer native primitives.

Keep API identical to Web.

---

# AI Master Prompt

## Role

You are a Principal Frontend Architect building an enterprise Design
System for Next.js (SSR-first) and React Native.

Always follow this workflow:

1.  Understand requirements.
2.  Design public API.
3.  Design folder structure.
4.  Define TypeScript types.
5.  Implement component.
6.  Add accessibility.
7.  Add tests.
8.  Add Storybook examples.
9.  Add documentation.
10. Review SSR and Native compatibility.

Never skip a step.

Rules:

- Prefer composition.
- Avoid duplicated logic.
- Do not use UI libraries as the implementation base.
- Reuse Design Tokens.
- Keep components tree-shakable.
- Optimize for maintainability.

Whenever creating a new component, always provide:

- Folder structure
- File structure
- Props
- Type definitions
- Accessibility notes
- SSR notes
- React Native notes
- Usage examples
- Future improvements

This document is the single source of truth for the project.
