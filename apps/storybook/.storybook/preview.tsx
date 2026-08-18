import { darkTheme, lightTheme, registerIcons, type Theme } from '@muja-ui/core';
import { ThemeProvider } from '@muja-ui/core/client';
import { allIcons } from '@muja-ui/icons';
import { sduDarkTheme, sduLightTheme } from '@muja-ui/theme-sdu';
import { ThemeStyles } from '@muja-ui/web';
import type { Decorator, Preview } from '@storybook/react-vite';
import { useEffect, type ReactNode } from 'react';
import '@muja-ui/web/styles.css';
import './preview.css';

// Lets every story use the string form: <Icon icon="calendar" />
registerIcons(allIcons);

const brands: Record<string, { light: Theme; dark: Theme }> = {
  base: { light: lightTheme, dark: darkTheme },
  sdu: { light: sduLightTheme, dark: sduDarkTheme },
};

interface ThemedProps {
  brand: { light: Theme; dark: Theme };
  mode: 'light' | 'dark';
  storyKey: string;
  children: ReactNode;
}

/**
 * `<ThemeStyles>` emits the `--mj-*` custom properties for the chosen brand and
 * `<ThemeProvider>` puts `data-theme` on `<html>`, which is what switches
 * light/dark — the same wiring a consuming app uses.
 */
function Themed({ brand, mode, storyKey, children }: ThemedProps) {
  // Docs pages render several stories into one document, so keep the attribute
  // in sync from here rather than relying on a single provider mount.
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  return (
    <>
      <ThemeStyles theme={brand.light} darkTheme={brand.dark} includeSystemFallback={false} />
      <ThemeProvider
        key={storyKey}
        theme={brand.light}
        darkTheme={brand.dark}
        defaultColorMode={mode}
        // Per-mode key so the toolbar stays authoritative: a story that calls
        // setColorMode() persists under its own key instead of overriding the
        // toolbar on the next render.
        storageKey={`muja-ui-storybook-${mode}`}
      >
        {children}
      </ThemeProvider>
    </>
  );
}

/** Wraps every story in the theme the toolbar selects. */
const withTheme: Decorator = (Story, context) => {
  const brand = brands[context.globals.brand as string] ?? brands.base!;
  const mode = context.globals.colorMode === 'dark' ? 'dark' : 'light';

  return (
    <Themed brand={brand} mode={mode} storyKey={`${context.globals.brand}-${mode}`}>
      <Story />
    </Themed>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: {
    brand: 'base',
    colorMode: 'light',
  },
  globalTypes: {
    brand: {
      description: 'Theme package the components are rendered with',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'base', title: 'Base (@muja-ui/core)' },
          { value: 'sdu', title: 'SDU (@muja-ui/theme-sdu)' },
        ],
        dynamicTitle: true,
      },
    },
    colorMode: {
      description: 'Color mode',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    layout: 'padded',
    // The theme paints the background; Storybook's own backgrounds would
    // fight it.
    backgrounds: { disable: true },
    controls: { expanded: true, sort: 'requiredFirst' },
    docs: { toc: true },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          ['Colors', 'Typography', 'Spacing', 'Radius & Shadows', 'Icons'],
          'Primitives',
          'Forms',
          'Feedback',
          'Data Display',
          'Layout',
          'Overlays',
          'Navigation',
          'Media',
        ],
      },
    },
  },
};

export default preview;
