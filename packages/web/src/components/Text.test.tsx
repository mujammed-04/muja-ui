import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Divider } from './Divider';
import { Heading } from './Heading';
import { Text } from './Text';

afterEach(cleanup);

describe('Text', () => {
  it('renders a paragraph with token-driven typography', () => {
    render(
      <Text data-testid="text" size="sm" weight="medium" color="textSecondary">
        hello
      </Text>,
    );
    const el = screen.getByTestId('text');
    expect(el.tagName).toBe('P');
    expect(el.style.fontSize).toBe('var(--mj-font-size-sm)');
    expect(el.style.fontWeight).toBe('var(--mj-font-weight-medium)');
    expect(el.style.color).toBe('var(--mj-color-text-secondary)');
  });

  it('truncates to a single line when asked', () => {
    render(
      <Text data-testid="text" truncate>
        long
      </Text>,
    );
    const el = screen.getByTestId('text');
    expect(el.style.whiteSpace).toBe('nowrap');
    expect(el.style.textOverflow).toBe('ellipsis');
  });
});

describe('Heading', () => {
  it('maps level to the semantic tag and a default size', () => {
    render(<Heading level={3}>Title</Heading>);
    const el = screen.getByRole('heading', { level: 3 });
    expect(el.tagName).toBe('H3');
    expect(el.style.fontSize).toBe('var(--mj-font-size-2xl)');
  });

  it('defaults to h2', () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole('heading', { level: 2 }).tagName).toBe('H2');
  });
});

describe('Divider', () => {
  it('renders a horizontal hr separator', () => {
    render(<Divider />);
    const el = screen.getByRole('separator');
    expect(el.tagName).toBe('HR');
    expect(el.className).toBe('mj-divider');
  });

  it('renders a vertical div separator with aria-orientation', () => {
    render(<Divider orientation="vertical" />);
    const el = screen.getByRole('separator');
    expect(el.tagName).toBe('DIV');
    expect(el.getAttribute('aria-orientation')).toBe('vertical');
  });
});
