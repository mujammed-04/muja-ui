import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

afterEach(cleanup);

function renderPopover(props: Parameters<typeof Popover>[0] = {}): void {
  render(
    <Popover {...props}>
      <PopoverTrigger>Filters</PopoverTrigger>
      <PopoverContent>Panel content</PopoverContent>
    </Popover>,
  );
}

describe('Popover', () => {
  it('is closed initially and opens on trigger click', () => {
    renderPopover();
    const trigger = screen.getByRole('button', { name: 'Filters' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByRole('dialog')).toBeNull();

    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    const content = screen.getByRole('dialog');
    expect(content.textContent).toBe('Panel content');
    expect(trigger.getAttribute('aria-controls')).toBe(content.id);
    expect(document.activeElement).toBe(content);
  });

  it('closes on Escape and returns focus to the trigger', () => {
    renderPopover({ defaultOpen: true });
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Filters' }));
  });

  it('closes on outside pointer-down but not on inside clicks', () => {
    renderPopover({ defaultOpen: true });
    fireEvent.pointerDown(screen.getByRole('dialog'));
    expect(screen.queryByRole('dialog')).not.toBeNull();

    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('supports controlled usage', () => {
    const onOpenChange = vi.fn();
    render(
      <Popover open onOpenChange={onOpenChange}>
        <PopoverTrigger>Filters</PopoverTrigger>
        <PopoverContent>Panel</PopoverContent>
      </Popover>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Filters' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    // Still open — the prop controls the state.
    expect(screen.getByRole('dialog')).not.toBeNull();
  });
});
