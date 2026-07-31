'use client';

import { cx, warnOnce } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement, RefObject } from 'react';
import { createContext, useContext, useEffect, useId, useRef } from 'react';
import { useControllableState } from '../internal/useControllableState';

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (ctx === null) {
    warnOnce(`<${component}> must be rendered inside <Popover>.`);
    return {
      open: false,
      setOpen: () => undefined,
      contentId: '',
      triggerRef: { current: null },
    };
  }
  return ctx;
}

export interface PopoverProps extends ComponentPropsWithRef<'span'> {
  /** Controlled open state. */
  open?: boolean;
  /** Initial state for uncontrolled usage. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Floating panel anchored to its trigger with pure CSS positioning (no
 * collision detection — pick a `placement` that fits). Closes on Escape and
 * on outside pointer-down. Client component — import from
 * `@muja-ui/web/client`.
 *
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Filters</PopoverTrigger>
 *   <PopoverContent placement="bottom">…</PopoverContent>
 * </Popover>
 * ```
 */
export function Popover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...rest
}: PopoverProps): ReactElement {
  const [open, setOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange);
  const contentId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent): void => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, setOpen]);

  return (
    <PopoverContext.Provider value={{ open, setOpen, contentId, triggerRef }}>
      <span ref={wrapperRef} className={cx('mj-popover', className)} {...rest}>
        {children}
      </span>
    </PopoverContext.Provider>
  );
}

export type PopoverTriggerProps = ComponentPropsWithRef<'button'>;

export function PopoverTrigger({
  className,
  onClick,
  ...rest
}: PopoverTriggerProps): ReactElement {
  const ctx = usePopoverContext('PopoverTrigger');
  return (
    <button
      type="button"
      ref={ctx.triggerRef}
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      className={cx('mj-popover__trigger', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.setOpen(!ctx.open);
      }}
      {...rest}
    />
  );
}

export interface PopoverContentProps extends ComponentPropsWithRef<'div'> {
  placement?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

export function PopoverContent({
  placement = 'bottom',
  align = 'start',
  className,
  ...rest
}: PopoverContentProps): ReactElement | null {
  const ctx = usePopoverContext('PopoverContent');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ctx.open) ref.current?.focus();
  }, [ctx.open]);

  if (!ctx.open) return null;

  return (
    <div
      role="dialog"
      id={ctx.contentId}
      ref={ref}
      tabIndex={-1}
      className={cx('mj-popover__content', className)}
      data-placement={placement}
      data-align={align}
      {...rest}
    />
  );
}
