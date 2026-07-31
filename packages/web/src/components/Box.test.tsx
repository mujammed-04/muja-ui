import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Box } from './Box';
import { Flex } from './Flex';
import { Stack } from './Stack';

afterEach(cleanup);

describe('Box', () => {
  it('resolves token style props to CSS variable references', () => {
    render(<Box data-testid="box" p={4} bg="surface" radius="md" shadow="sm" />);
    const el = screen.getByTestId('box');
    expect(el.style.padding).toBe('var(--mj-space-4)');
    expect(el.style.background).toBe('var(--mj-color-surface)');
    expect(el.style.borderRadius).toBe('var(--mj-radius-md)');
    expect(el.style.boxShadow).toBe('var(--mj-shadow-sm)');
  });

  it('handles fractional space tokens and raw dimensions', () => {
    render(<Box data-testid="box" px={0.5} w={320} maxW="100%" />);
    const el = screen.getByTestId('box');
    expect(el.style.paddingLeft).toBe('var(--mj-space-0-5)');
    expect(el.style.width).toBe('320px');
    expect(el.style.maxWidth).toBe('100%');
  });

  it('renders as another element and forwards its props', () => {
    render(
      <Box as="a" href="https://example.com">
        link
      </Box>,
    );
    const link = screen.getByRole('link', { name: 'link' });
    expect(link.getAttribute('href')).toBe('https://example.com');
  });

  it('merges user style over token styles', () => {
    render(<Box data-testid="box" p={4} style={{ padding: '3px' }} />);
    expect(screen.getByTestId('box').style.padding).toBe('3px');
  });
});

describe('Flex / Stack', () => {
  it('Flex sets display and gap from tokens', () => {
    render(<Flex data-testid="flex" gap={2} align="center" />);
    const el = screen.getByTestId('flex');
    expect(el.style.display).toBe('flex');
    expect(el.style.gap).toBe('var(--mj-space-2)');
    expect(el.style.alignItems).toBe('center');
  });

  it('Stack defaults to a column with gap 4', () => {
    render(<Stack data-testid="stack" />);
    const el = screen.getByTestId('stack');
    expect(el.style.flexDirection).toBe('column');
    expect(el.style.gap).toBe('var(--mj-space-4)');
  });
});
