import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Section } from './Section';

afterEach(cleanup);

describe('Section', () => {
  it('renders a semantic section with default spacing', () => {
    render(<Section aria-label="Events">Content</Section>);
    const section = screen.getByRole('region', { name: 'Events' });
    expect(section.tagName).toBe('SECTION');
    expect(section.getAttribute('data-spacing')).toBe('md');
  });

  it('applies the spacing attribute', () => {
    render(<Section spacing="lg">Content</Section>);
    expect(screen.getByText('Content').getAttribute('data-spacing')).toBe('lg');
  });
});
