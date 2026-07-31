'use client';

import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, MouseEvent, PointerEvent, ReactElement } from 'react';
import { useRef } from 'react';
import { useDialogBehavior } from '../internal/useDialogBehavior';

const DISMISS_THRESHOLD_PX = 96;

export interface BottomSheetProps extends ComponentPropsWithRef<'div'> {
  open: boolean;
  onClose: () => void;
  /** Close when the backdrop is clicked. Defaults to true. */
  closeOnOverlayClick?: boolean;
  /** Accessible name — pair with a heading via `aria-labelledby` instead when there is a visible title. */
  'aria-label'?: string;
}

/**
 * Mobile-style bottom sheet: the Modal behaviours (backdrop, Escape, focus,
 * body scroll lock) plus a grab handle with drag-to-dismiss. Client
 * component — import from `@muja-ui/web/client`.
 *
 * ```tsx
 * <BottomSheet open={open} onClose={() => setOpen(false)} aria-label="Ticket">
 *   …
 * </BottomSheet>
 * ```
 */
export function BottomSheet({
  open,
  onClose,
  closeOnOverlayClick = true,
  className,
  children,
  ...rest
}: BottomSheetProps): ReactElement | null {
  const panelRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  useDialogBehavior(open, onClose, panelRef);

  if (!open) return null;

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    dragStartY.current = event.clientY;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    panelRef.current?.setAttribute('data-dragging', 'true');
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (dragStartY.current === null || !panelRef.current) return;
    const offset = Math.max(0, event.clientY - dragStartY.current);
    panelRef.current.style.transform = `translateY(${offset}px)`;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>): void => {
    if (dragStartY.current === null || !panelRef.current) return;
    const offset = Math.max(0, event.clientY - dragStartY.current);
    panelRef.current.style.transform = '';
    panelRef.current.removeAttribute('data-dragging');
    dragStartY.current = null;
    if (offset > DISMISS_THRESHOLD_PX) onClose();
  };

  return (
    <div className="mj-bottom-sheet-overlay" onClick={handleOverlayClick}>
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        ref={panelRef}
        className={cx('mj-bottom-sheet', className)}
        {...rest}
      >
        <div
          className="mj-bottom-sheet__handle"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <span className="mj-bottom-sheet__grabber" aria-hidden="true" />
        </div>
        {children}
      </div>
    </div>
  );
}
