import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';

afterEach(cleanup);

describe('Spinner', () => {
  it('announces via role="status" with a hidden label', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner.textContent).toBe('Loading');
    expect(spinner.getAttribute('data-size')).toBe('md');
  });

  it('accepts a custom label and size', () => {
    render(<Spinner size="lg" label="Loading events" />);
    expect(screen.getByRole('status').textContent).toBe('Loading events');
    expect(screen.getByRole('status').getAttribute('data-size')).toBe('lg');
  });
});
