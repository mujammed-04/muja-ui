import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './DropdownMenu';

afterEach(cleanup);

function renderMenu(onSelect = vi.fn()): ReturnType<typeof vi.fn> {
  render(
    <DropdownMenu>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
  return onSelect;
}

describe('DropdownMenu', () => {
  it('follows the menu-button pattern and focuses the first item on open', () => {
    renderMenu();
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    fireEvent.click(trigger);

    const menu = screen.getByRole('menu');
    expect(menu.getAttribute('aria-labelledby')).toBe(trigger.id);
    expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
  });

  it('roves focus with arrow keys and wraps around', () => {
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    const menu = screen.getByRole('menu');

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'Delete' }));
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
  });

  it('selecting an item fires onSelect, closes the menu and refocuses the trigger', () => {
    const onSelect = renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Actions' }));
  });

  it('closes on Escape and returns focus to the trigger', () => {
    renderMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    expect(screen.queryByRole('menu')).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Actions' }));
  });

  it('opens with ArrowDown from the trigger', () => {
    renderMenu();
    fireEvent.keyDown(screen.getByRole('button', { name: 'Actions' }), { key: 'ArrowDown' });
    expect(screen.getByRole('menu')).not.toBeNull();
  });
});
