import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

afterEach(cleanup);

describe('Button', () => {
  it('renders a semantic button with default variant and size', () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.tagName).toBe('BUTTON');
    expect(button.getAttribute('type')).toBe('button');
    expect(button.getAttribute('data-variant')).toBe('primary');
    expect(button.getAttribute('data-size')).toBe('md');
  });

  it('applies variant and size attributes for CSS targeting', () => {
    render(
      <Button variant="danger" size="lg">
        Delete
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button.getAttribute('data-variant')).toBe('danger');
    expect(button.getAttribute('data-size')).toBe('lg');
  });

  it('announces busy state, blocks clicks and shows a spinner while loading', () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.querySelector('.mj-button__spinner')).not.toBeNull();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('fires onClick when enabled', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('hides the left icon while loading and keeps custom classes', () => {
    render(
      <Button loading leftIcon={<span data-testid="left" />} className="custom">
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(screen.queryByTestId('left')).toBeNull();
    expect(button.className).toBe('mj-button custom');
  });

  it('supports fullWidth via a data attribute', () => {
    render(<Button fullWidth>Wide</Button>);
    expect(screen.getByRole('button', { name: 'Wide' }).getAttribute('data-full-width')).toBe(
      'true',
    );
  });
});
