import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BottomSheet } from './BottomSheet';

afterEach(cleanup);

describe('BottomSheet', () => {
  it('renders nothing while closed', () => {
    render(
      <BottomSheet open={false} onClose={() => undefined} aria-label="Ticket">
        Content
      </BottomSheet>,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders an aria-modal dialog with a grab handle and focuses the panel', () => {
    render(
      <BottomSheet open onClose={() => undefined} aria-label="Ticket">
        Content
      </BottomSheet>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Ticket' });
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(document.activeElement).toBe(dialog);
    expect(dialog.querySelector('.mj-bottom-sheet__handle')).not.toBeNull();
  });

  it('closes on Escape and backdrop click', () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose} aria-label="Ticket">
        Content
      </BottomSheet>,
    );
    fireEvent.click(screen.getByRole('dialog').parentElement!);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('dismisses when dragged down past the threshold, but not on short drags', () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose} aria-label="Ticket">
        Content
      </BottomSheet>,
    );
    const handle = screen.getByRole('dialog').querySelector('.mj-bottom-sheet__handle')!;

    fireEvent.pointerDown(handle, { clientY: 10, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 50, pointerId: 1 });
    fireEvent.pointerUp(handle, { clientY: 50, pointerId: 1 });
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.pointerDown(handle, { clientY: 10, pointerId: 1 });
    fireEvent.pointerMove(handle, { clientY: 200, pointerId: 1 });
    fireEvent.pointerUp(handle, { clientY: 200, pointerId: 1 });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
