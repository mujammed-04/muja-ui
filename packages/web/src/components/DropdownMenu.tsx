'use client';

import { cx, warnOnce } from '@muja-ui/utils';
import type { ComponentPropsWithRef, KeyboardEvent, ReactElement, RefObject } from 'react';
import { createContext, useContext, useEffect, useId, useRef } from 'react';
import { useControllableState } from '../internal/useControllableState';

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuId: string;
  triggerId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext(component: string): DropdownMenuContextValue {
  const ctx = useContext(DropdownMenuContext);
  if (ctx === null) {
    warnOnce(`<${component}> must be rendered inside <DropdownMenu>.`);
    return {
      open: false,
      setOpen: () => undefined,
      menuId: '',
      triggerId: '',
      triggerRef: { current: null },
    };
  }
  return ctx;
}

function menuItems(menu: HTMLElement): HTMLElement[] {
  return Array.from(
    menu.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])'),
  );
}

export interface DropdownMenuProps extends ComponentPropsWithRef<'span'> {
  /** Controlled open state. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Action menu following the WAI-ARIA menu-button pattern: arrow-key roving
 * focus, Home/End, Escape returns focus to the trigger, selecting an item
 * closes the menu. CSS-positioned like Popover. Client component — import
 * from `@muja-ui/web/client`.
 *
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem onSelect={edit}>Edit</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem tone="danger" onSelect={remove}>Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
export function DropdownMenu({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...rest
}: DropdownMenuProps): ReactElement {
  const [open, setOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange);
  const menuId = useId();
  const triggerId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent): void => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open, setOpen]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen, menuId, triggerId, triggerRef }}>
      <span ref={wrapperRef} className={cx('mj-dropdown', className)} {...rest}>
        {children}
      </span>
    </DropdownMenuContext.Provider>
  );
}

export type DropdownMenuTriggerProps = ComponentPropsWithRef<'button'>;

export function DropdownMenuTrigger({
  className,
  onClick,
  onKeyDown,
  ...rest
}: DropdownMenuTriggerProps): ReactElement {
  const ctx = useDropdownMenuContext('DropdownMenuTrigger');
  return (
    <button
      type="button"
      id={ctx.triggerId}
      ref={ctx.triggerRef}
      aria-haspopup="menu"
      aria-expanded={ctx.open}
      aria-controls={ctx.menuId}
      className={cx('mj-dropdown__trigger', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.setOpen(!ctx.open);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.key === 'ArrowDown' && !ctx.open) {
          event.preventDefault();
          ctx.setOpen(true);
        }
      }}
      {...rest}
    />
  );
}

export interface DropdownMenuContentProps extends ComponentPropsWithRef<'div'> {
  placement?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
}

export function DropdownMenuContent({
  placement = 'bottom',
  align = 'start',
  className,
  onKeyDown,
  ...rest
}: DropdownMenuContentProps): ReactElement | null {
  const ctx = useDropdownMenuContext('DropdownMenuContent');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ctx.open && ref.current) menuItems(ref.current)[0]?.focus();
  }, [ctx.open]);

  const close = (refocusTrigger: boolean): void => {
    ctx.setOpen(false);
    if (refocusTrigger) ctx.triggerRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !ref.current) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key === 'Tab') {
      close(false);
      return;
    }

    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    const items = menuItems(ref.current);
    if (items.length === 0) return;

    const current = items.indexOf(document.activeElement as HTMLElement);
    let next = current;
    if (event.key === 'ArrowDown') next = current === items.length - 1 ? 0 : current + 1;
    if (event.key === 'ArrowUp') next = current <= 0 ? items.length - 1 : current - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = items.length - 1;

    event.preventDefault();
    items[next]?.focus();
  };

  if (!ctx.open) return null;

  return (
    <div
      role="menu"
      id={ctx.menuId}
      aria-labelledby={ctx.triggerId}
      ref={ref}
      className={cx('mj-dropdown__content', className)}
      data-placement={placement}
      data-align={align}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
}

export interface DropdownMenuItemProps extends ComponentPropsWithRef<'button'> {
  /** Called when the item is activated; the menu closes afterwards. */
  onSelect?: () => void;
  /** `danger` colors the item for destructive actions. */
  tone?: 'default' | 'danger';
}

export function DropdownMenuItem({
  onSelect,
  tone = 'default',
  disabled,
  className,
  onClick,
  ...rest
}: DropdownMenuItemProps): ReactElement {
  const ctx = useDropdownMenuContext('DropdownMenuItem');
  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={cx('mj-dropdown__item', className)}
      data-tone={tone}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) return;
        onSelect?.();
        ctx.setOpen(false);
        ctx.triggerRef.current?.focus();
      }}
      {...rest}
    />
  );
}

export function DropdownMenuLabel({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>): ReactElement {
  return <div className={cx('mj-dropdown__label', className)} {...rest} />;
}

export function DropdownMenuSeparator({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>): ReactElement {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cx('mj-dropdown__separator', className)}
      {...rest}
    />
  );
}
