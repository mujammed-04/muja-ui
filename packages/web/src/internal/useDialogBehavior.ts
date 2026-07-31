'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), ' +
  'textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

/**
 * Shared modal-dialog behaviour for Modal, Drawer and BottomSheet:
 *
 * - Escape calls `onClose`
 * - Tab/Shift+Tab are trapped inside the panel (wrapping at the edges)
 * - body scroll is locked while open
 * - focus moves to the panel on open and back to the previously focused
 *   element on close
 */
export function useDialogBehavior(
  open: boolean,
  onClose: () => void,
  panelRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    if (!open) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement;
      const activeInPanel = active instanceof HTMLElement && panel.contains(active);

      if (event.shiftKey) {
        if (!activeInPanel || active === first || active === panel) {
          event.preventDefault();
          last.focus();
        }
      } else if (!activeInPanel || active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose, panelRef]);
}
