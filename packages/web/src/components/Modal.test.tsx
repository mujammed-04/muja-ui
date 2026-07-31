import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useState, type ReactElement } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from './Modal';

afterEach(cleanup);

describe('Modal', () => {
  it('renders nothing while closed', () => {
    render(
      <Modal open={false} onClose={() => undefined} aria-label="Book">
        Content
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders an aria-modal dialog with sections and focuses the panel', () => {
    render(
      <Modal open onClose={() => undefined} aria-label="Book room">
        <ModalHeader>
          <ModalTitle>Book room</ModalTitle>
        </ModalHeader>
        <ModalBody>Details</ModalBody>
        <ModalFooter>Actions</ModalFooter>
      </Modal>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Book room' });
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(document.activeElement).toBe(dialog);
    expect(screen.getByRole('heading', { name: 'Book room' }).className).toContain(
      'mj-modal__title',
    );
  });

  it('closes on Escape and on backdrop click, but not on panel click', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} aria-label="Book">
        Content
      </Modal>,
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('traps Tab focus inside the panel, wrapping at both edges', () => {
    render(
      <Modal open onClose={() => undefined} aria-label="Book">
        <button type="button">First</button>
        <button type="button">Last</button>
      </Modal>,
    );
    const first = screen.getByRole('button', { name: 'First' });
    const last = screen.getByRole('button', { name: 'Last' });

    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(first);

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('returns focus to the previously focused element on close', () => {
    function Harness(): ReactElement {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open modal
          </button>
          <Modal open={open} onClose={() => setOpen(false)} aria-label="Book">
            Content
          </Modal>
        </>
      );
    }
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'Open modal' });
    trigger.focus();
    fireEvent.click(trigger);
    expect(document.activeElement).toBe(screen.getByRole('dialog'));

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });

  it('respects closeOnOverlayClick={false} and locks body scroll while open', () => {
    const onClose = vi.fn();
    const { unmount } = render(
      <Modal open onClose={onClose} closeOnOverlayClick={false} aria-label="Book">
        Content
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(screen.getByRole('dialog').parentElement!);
    expect(onClose).not.toHaveBeenCalled();
    unmount();
    expect(document.body.style.overflow).toBe('');
  });
});
