import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Container } from './Container';

afterEach(cleanup);

describe('Container', () => {
  it('defaults to the lg width', () => {
    render(<Container>Content</Container>);
    const container = screen.getByText('Content');
    expect(container.className).toBe('mj-container');
    expect(container.getAttribute('data-size')).toBe('lg');
  });

  it('applies the size attribute for CSS targeting', () => {
    render(<Container size="sm">Content</Container>);
    expect(screen.getByText('Content').getAttribute('data-size')).toBe('sm');
  });
});
