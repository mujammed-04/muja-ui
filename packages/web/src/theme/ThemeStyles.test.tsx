import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ColorModeScript } from './ColorModeScript';
import { ThemeStyles } from './ThemeStyles';

afterEach(cleanup);

describe('ThemeStyles', () => {
  it('emits light vars on :root and dark vars on [data-theme="dark"]', () => {
    const { container } = render(<ThemeStyles />);
    const css = container.querySelector('style[data-muja-ui="theme"]')?.textContent ?? '';

    expect(css).toContain(':root{color-scheme:light;');
    expect(css).toContain('--mj-color-bg:#ffffff;');
    expect(css).toContain('[data-theme="dark"]{color-scheme:dark;');
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain('body{font-family:var(--mj-font-sans);');
  });

  it('can opt out of dark mode and base styles', () => {
    const { container } = render(<ThemeStyles darkTheme={null} includeBaseStyles={false} />);
    const css = container.querySelector('style[data-muja-ui="theme"]')?.textContent ?? '';
    expect(css).not.toContain('data-theme="dark"');
    expect(css).not.toContain('body{');
  });
});

describe('ColorModeScript', () => {
  it('inlines the storage key and default mode', () => {
    const { container } = render(<ColorModeScript storageKey="my-key" defaultColorMode="light" />);
    const code = container.querySelector('script')?.textContent ?? '';
    expect(code).toContain('"my-key"');
    expect(code).toContain('"light"');
    expect(code).toContain('dataset.theme');
  });
});
