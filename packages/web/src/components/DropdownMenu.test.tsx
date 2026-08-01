import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
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

function renderCheckboxMenu(
  onCheckedChange = vi.fn(),
  closeOnSelect = false,
): ReturnType<typeof vi.fn> {
  render(
    <DropdownMenu>
      <DropdownMenuTrigger>Categories</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckboxItem
          checked={false}
          onCheckedChange={onCheckedChange}
          closeOnSelect={closeOnSelect}
        >
          Sports
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked>Music</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
  return onCheckedChange;
}

describe('DropdownMenuCheckboxItem', () => {
  it('exposes checked state through aria-checked', () => {
    renderCheckboxMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Categories' }));
    expect(screen.getByRole('menuitemcheckbox', { name: 'Sports' }).getAttribute('aria-checked'))
      .toBe('false');
    expect(screen.getByRole('menuitemcheckbox', { name: 'Music' }).getAttribute('aria-checked'))
      .toBe('true');
  });

  it('toggles and keeps the menu open so several boxes can be ticked', () => {
    const onCheckedChange = renderCheckboxMenu();
    fireEvent.click(screen.getByRole('button', { name: 'Categories' }));
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Sports' }));

    expect(onCheckedChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('menu')).not.toBeNull();
  });

  it('closes and refocuses the trigger when closeOnSelect is set', () => {
    renderCheckboxMenu(vi.fn(), true);
    fireEvent.click(screen.getByRole('button', { name: 'Categories' }));
    fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Sports' }));

    expect(screen.queryByRole('menu')).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Categories' }));
  });

  it('joins the roving focus order alongside plain items', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Filters</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Reset</DropdownMenuItem>
          <DropdownMenuCheckboxItem checked={false}>Sports</DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Filters' }));
    expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'Reset' }));

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByRole('menuitemcheckbox', { name: 'Sports' }));
  });
});
