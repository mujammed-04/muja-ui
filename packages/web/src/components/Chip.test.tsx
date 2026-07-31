import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Chip } from './Chip';

afterEach(cleanup);

describe('Chip', () => {
  it('renders a static span without handlers', () => {
    render(<Chip>Tag</Chip>);
    const chip = screen.getByText('Tag').parentElement!;
    expect(chip.tagName).toBe('SPAN');
    expect(chip.getAttribute('data-size')).toBe('md');
  });

  it('renders a toggle button with aria-pressed when onClick is given', () => {
    const onClick = vi.fn();
    render(
      <Chip selected onClick={onClick}>
        Sports
      </Chip>,
    );
    const chip = screen.getByRole('button', { name: 'Sports', pressed: true });
    expect(chip.getAttribute('data-selected')).toBe('true');
    fireEvent.click(chip);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a removable tag with an accessible remove button', () => {
    const onRemove = vi.fn();
    render(<Chip onRemove={onRemove}>music</Chip>);
    const chip = screen.getByText('music').parentElement!;
    expect(chip.tagName).toBe('SPAN');
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
