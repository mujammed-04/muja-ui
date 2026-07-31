'use client';

import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, MouseEvent, ReactElement } from 'react';
import { useRef } from 'react';
import { useDialogBehavior } from '../internal/useDialogBehavior';

export interface DrawerProps extends ComponentPropsWithRef<'div'> {
  open: boolean;
  onClose: () => void;
  /** Edge the panel slides from. Defaults to `right`. */
  side?: 'left' | 'right' | 'top' | 'bottom';
  /** Close when the backdrop is clicked. Defaults to true. */
  closeOnOverlayClick?: boolean;
  /** Accessible name — pair with `<DrawerTitle id>` via `aria-labelledby` instead when there is a visible title. */
  'aria-label'?: string;
}

/**
 * Controlled sliding panel (sheet): backdrop, Escape to close, focus moved to
 * the panel, body scroll locked — the Modal behaviour with edge-anchored
 * layout. Client component — import from `@muja-ui/web/client`.
 *
 * ```tsx
 * <Drawer open={open} onClose={() => setOpen(false)} side="right" aria-label="Filters">
 *   <DrawerHeader><DrawerTitle>Filters</DrawerTitle></DrawerHeader>
 *   <DrawerBody>…</DrawerBody>
 * </Drawer>
 * ```
 */
export function Drawer({
  open,
  onClose,
  side = 'right',
  closeOnOverlayClick = true,
  className,
  children,
  ...rest
}: DrawerProps): ReactElement | null {
  const panelRef = useRef<HTMLDivElement>(null);
  useDialogBehavior(open, onClose, panelRef);

  if (!open) return null;

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
  };

  return (
    <div className="mj-drawer-overlay" data-side={side} onClick={handleOverlayClick}>
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={panelRef}
        className={cx('mj-drawer', className)}
        data-side={side}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
}

export function DrawerHeader({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-drawer__header', className)} {...rest} />;
}

export function DrawerTitle({ className, ...rest }: ComponentPropsWithRef<'h2'>): ReactElement {
  return <h2 className={cx('mj-drawer__title', className)} {...rest} />;
}

export function DrawerBody({ className, ...rest }: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-drawer__body', className)} {...rest} />;
}

export function DrawerFooter({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-drawer__footer', className)} {...rest} />;
}
