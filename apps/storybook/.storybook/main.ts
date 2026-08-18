import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import type { StorybookConfig } from '@storybook/react-vite';

/** Absolute path to a file inside the monorepo, relative to this config. */
const repoPath = (relative: string): string =>
  fileURLToPath(new URL(`../../../${relative}`, import.meta.url));

/**
 * Workspace packages resolve to their **sources**, not `dist`, so Storybook
 * runs without building the packages first and picks up component and
 * `styles.css` edits immediately. Longest specifier first — Vite matches
 * these in order.
 */
const workspaceAliases = [
  { find: '@muja-ui/web/styles.css', replacement: repoPath('packages/web/src/styles.css') },
  { find: '@muja-ui/web/client', replacement: repoPath('packages/web/src/client.ts') },
  { find: '@muja-ui/web', replacement: repoPath('packages/web/src/index.ts') },
  { find: '@muja-ui/core/client', replacement: repoPath('packages/core/src/client.tsx') },
  { find: '@muja-ui/core', replacement: repoPath('packages/core/src/index.ts') },
  { find: '@muja-ui/theme-sdu', replacement: repoPath('packages/theme-sdu/src/index.ts') },
  { find: '@muja-ui/tokens', replacement: repoPath('packages/tokens/src/index.ts') },
  { find: '@muja-ui/icons', replacement: repoPath('packages/icons/src/index.ts') },
  { find: '@muja-ui/utils', replacement: repoPath('packages/utils/src/index.ts') },
];

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    // Prop tables come from the TypeScript interfaces, including the JSDoc
    // comment on each prop. The components live outside this app, so docgen
    // needs both the wider file filter and a project that has those sources as
    // root files (see tsconfig.docgen.json).
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: 'tsconfig.docgen.json',
      include: ['**/*.tsx', repoPath('packages/*/src/**/*.tsx')],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Drop props inherited from React's DOM typings — the component's own
      // API is what the table should show.
      propFilter: (prop) => !prop.parent || !/node_modules/.test(prop.parent.fileName),
    },
  },
  core: { disableWhatsNewNotifications: true, disableTelemetry: true },
  viteFinal: (viteConfig) => {
    const existing = viteConfig.resolve?.alias;
    const inherited = Array.isArray(existing)
      ? existing
      : Object.entries(existing ?? {}).map(([find, replacement]) => ({ find, replacement }));

    return {
      ...viteConfig,
      // The framework preset does not add the React plugin; without it there
      // is no Fast Refresh.
      plugins: [...(viteConfig.plugins ?? []), react()],
      resolve: { ...viteConfig.resolve, alias: [...inherited, ...workspaceAliases] },
    };
  },
};

export default config;
