import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Drawer, DrawerBody, DrawerHeader, DrawerTitle } from './Drawer';

afterEach(cleanup);

describe('Drawer', () => {
  it('renders nothing while closed', () => {
    render(
      <Drawer open={false} onClose={() => undefined} aria-label="Filters">
        Content
      </Drawer>,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders an aria-modal dialog anchored to a side and focuses the panel', () => {
    render(
      <Drawer open onClose={() => undefined} side="left" aria-label="Filters">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>Body</DrawerBody>
      </Drawer>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Filters' });
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('data-side')).toBe('left');
    expect(document.activeElement).toBe(dialog);
  });

  it('closes on Escape and on backdrop click, locking body scroll while open', () => {
    const onClose = vi.fn();
    const { unmount } = render(
      <Drawer open onClose={onClose} aria-label="Filters">
        Content
      </Drawer>,
    );
    expect(document.body.style.overflow).toBe('hidden');

    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);

    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
