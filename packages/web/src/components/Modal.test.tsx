import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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
