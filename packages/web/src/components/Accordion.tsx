'use client';

import { cx, warnOnce } from '@muja-ui/utils';
import type { ComponentPropsWithRef, KeyboardEvent, ReactElement } from 'react';
import { createContext, useContext, useId } from 'react';
import { useControllableState } from '../internal/useControllableState';

interface AccordionContextValue {
  openValues: string[];
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionContexts(
  component: string,
): { root: AccordionContextValue; item: AccordionItemContextValue } {
  const root = useContext(AccordionContext);
  const item = useContext(AccordionItemContext);
  if (root === null || item === null) {
    warnOnce(`<${component}> must be rendered inside <Accordion> → <AccordionItem>.`);
    return {
      root: { openValues: [], toggle: () => undefined },
      item: { value: '', open: false, disabled: false, triggerId: '', contentId: '' },
    };
  }
  return { root, item };
}

export interface AccordionProps
  extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue' | 'onChange'> {
  /** Allow several items open at once. Defaults to false (one at a time). */
  multiple?: boolean;
  /** In single mode, allow closing the open item. Defaults to true. */
  collapsible?: boolean;
  /** Controlled open values. */
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (values: string[]) => void;
}

/**
 * WAI-ARIA accordion: header buttons toggle labelled regions;
 * ArrowUp/ArrowDown/Home/End move between headers. Client component — import
 * from `@muja-ui/web/client`.
 *
 * ```tsx
 * <Accordion defaultValue={['faq-1']}>
 *   <AccordionItem value="faq-1">
 *     <AccordionTrigger>How do I book a room?</AccordionTrigger>
 *     <AccordionContent>…</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
export function Accordion({
  multiple = false,
  collapsible = true,
  value: controlledValue,
  defaultValue = [],
  onValueChange,
  className,
  onKeyDown,
  ...rest
}: AccordionProps): ReactElement {
  const [openValues, setOpenValues] = useControllableState(
    controlledValue,
    defaultValue,
    onValueChange,
  );

  const toggle = (value: string): void => {
    const isOpen = openValues.includes(value);
    if (isOpen) {
      if (multiple || collapsible) setOpenValues(openValues.filter((v) => v !== value));
      return;
    }
    setOpenValues(multiple ? [...openValues, value] : [value]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(event);
    const keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (event.defaultPrevented || !keys.includes(event.key)) return;

    const triggers = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>(
        '.mj-accordion__trigger:not(:disabled)',
      ),
    );
    const current = triggers.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1 || triggers.length === 0) return;

    let next = current;
    if (event.key === 'ArrowDown') next = current === triggers.length - 1 ? 0 : current + 1;
    if (event.key === 'ArrowUp') next = current === 0 ? triggers.length - 1 : current - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = triggers.length - 1;

    event.preventDefault();
    triggers[next]?.focus();
  };

  return (
    <AccordionContext.Provider value={{ openValues, toggle }}>
      <div className={cx('mj-accordion', className)} onKeyDown={handleKeyDown} {...rest} />
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends ComponentPropsWithRef<'div'> {
  value: string;
  disabled?: boolean;
}

export function AccordionItem({
  value,
  disabled = false,
  className,
  ...rest
}: AccordionItemProps): ReactElement {
  const root = useContext(AccordionContext);
  const open = root?.openValues.includes(value) ?? false;
  const triggerId = useId();
  const contentId = useId();

  return (
    <AccordionItemContext.Provider value={{ value, open, disabled, triggerId, contentId }}>
      <div
        className={cx('mj-accordion__item', className)}
        data-state={open ? 'open' : 'closed'}
        {...rest}
      />
    </AccordionItemContext.Provider>
  );
}

export type AccordionTriggerProps = ComponentPropsWithRef<'button'>;

export function AccordionTrigger({
  className,
  onClick,
  children,
  ...rest
}: AccordionTriggerProps): ReactElement {
  const { root, item } = useAccordionContexts('AccordionTrigger');
  return (
    <h3 className="mj-accordion__header">
      <button
        type="button"
        id={item.triggerId}
        aria-expanded={item.open}
        aria-controls={item.contentId}
        disabled={item.disabled}
        className={cx('mj-accordion__trigger', className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) root.toggle(item.value);
        }}
        {...rest}
      >
        <span className="mj-accordion__trigger-label">{children}</span>
        <span className="mj-accordion__chevron" aria-hidden="true" />
      </button>
    </h3>
  );
}

export type AccordionContentProps = ComponentPropsWithRef<'div'>;

export function AccordionContent({
  className,
  children,
  ...rest
}: AccordionContentProps): ReactElement {
  const { item } = useAccordionContexts('AccordionContent');
  return (
    <div
      role="region"
      id={item.contentId}
      aria-labelledby={item.triggerId}
      hidden={!item.open}
      className={cx('mj-accordion__content', className)}
      {...rest}
    >
      <div className="mj-accordion__content-inner">{children}</div>
    </div>
  );
}
