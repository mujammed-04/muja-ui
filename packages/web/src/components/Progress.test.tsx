import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Progress } from './Progress';

afterEach(cleanup);

describe('Progress', () => {
  it('exposes value through progressbar semantics', () => {
    render(<Progress value={64} aria-label="Upload" />);
    const bar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(bar.getAttribute('aria-valuenow')).toBe('64');
    expect(bar.getAttribute('aria-valuemax')).toBe('100');
    const fill = bar.querySelector('.mj-progress__fill') as HTMLElement;
    expect(fill.style.width).toBe('64%');
  });

  it('clamps out-of-range values against max', () => {
    render(<Progress value={150} max={100} aria-label="Upload" />);
    expect(screen.getByRole('progressbar').getAttribute('aria-valuenow')).toBe('100');
  });

  it('is indeterminate without a value', () => {
    render(<Progress aria-label="Loading" />);
    const bar = screen.getByRole('progressbar');
    expect(bar.getAttribute('aria-valuenow')).toBeNull();
    expect(bar.getAttribute('data-indeterminate')).toBe('true');
  });
});
