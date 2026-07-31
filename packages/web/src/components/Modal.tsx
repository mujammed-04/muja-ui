'use client';

import type { Size } from '@muja-ui/core';
import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, MouseEvent, ReactElement } from 'react';
import { useRef } from 'react';
import { useDialogBehavior } from '../internal/useDialogBehavior';

export interface ModalProps extends ComponentPropsWithRef<'div'> {
  open: boolean;
  onClose: () => void;
  size?: Size;
  /** Close when the backdrop is clicked. Defaults to true. */
  closeOnOverlayClick?: boolean;
  /** Accessible name — pair with `<ModalTitle id>` via `aria-labelledby` instead when there is a visible title. */
  'aria-label'?: string;
}

/**
 * Controlled modal dialog: backdrop, Escape to close, focus moved to the
 * panel on open, body scroll locked. Client component — import from
 * `@muja-ui/web/client`.
 *
 * ```tsx
 * <Modal open={open} onClose={() => setOpen(false)} aria-label="Book room">
 *   <ModalHeader><ModalTitle>Book room</ModalTitle></ModalHeader>
 *   <ModalBody>…</ModalBody>
 *   <ModalFooter><Button onClick={confirm}>Confirm</Button></ModalFooter>
 * </Modal>
 * ```
 */
export function Modal({
  open,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  className,
  children,
  ...rest
}: ModalProps): ReactElement | null {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogBehavior(open, onClose, panelRef);

  if (!open) return null;

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
  };

  return (
    <div className="mj-modal-overlay" onClick={handleOverlayClick}>
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={panelRef}
        className={cx('mj-modal', className)}
        data-size={size}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-modal__header', className)} {...rest} />;
}

export function ModalTitle({ className, ...rest }: ComponentPropsWithRef<'h2'>): ReactElement {
  return <h2 className={cx('mj-modal__title', className)} {...rest} />;
}

export function ModalBody({ className, ...rest }: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-modal__body', className)} {...rest} />;
}

export function ModalFooter({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-modal__footer', className)} {...rest} />;
}
