import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Badge } from './Badge';

afterEach(cleanup);

describe('Badge', () => {
  it('renders a neutral subtle badge by default', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge.getAttribute('data-tone')).toBe('neutral');
    expect(badge.getAttribute('data-variant')).toBe('subtle');
  });

  it('applies tone and variant attributes for CSS targeting', () => {
    render(
      <Badge tone="success" variant="solid">
        Confirmed
      </Badge>,
    );
    const badge = screen.getByText('Confirmed');
    expect(badge.getAttribute('data-tone')).toBe('success');
    expect(badge.getAttribute('data-variant')).toBe('solid');
  });
});
