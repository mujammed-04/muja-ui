import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IconButton } from './IconButton';

afterEach(cleanup);

describe('IconButton', () => {
  it('renders a button named by aria-label with ghost variant by default', () => {
    render(
      <IconButton aria-label="Share">
        <svg />
      </IconButton>,
    );
    const button = screen.getByRole('button', { name: 'Share' });
    expect(button.getAttribute('data-variant')).toBe('ghost');
    expect(button.className).toContain('mj-icon-button');
  });

  it('blocks interaction and shows a spinner while loading', () => {
    const onClick = vi.fn();
    render(
      <IconButton aria-label="Save" loading onClick={onClick}>
        <svg />
      </IconButton>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.querySelector('.mj-button__spinner')).not.toBeNull();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
