'use client';

import { cx, warnOnce } from '@muja-ui/utils';
import type { ComponentPropsWithRef, KeyboardEvent, ReactElement } from 'react';
import { createContext, useCallback, useContext, useId, useMemo, useState } from 'react';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(component: string): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (ctx === null) {
    warnOnce(`<${component}> must be rendered inside <Tabs>.`);
    return { value: '', setValue: () => undefined, baseId: '' };
  }
  return ctx;
}

const tabId = (baseId: string, value: string): string => `${baseId}-tab-${value}`;
const panelId = (baseId: string, value: string): string => `${baseId}-panel-${value}`;

export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue'> {
  /** Controlled selected value. */
  value?: string;
  /** Initial value for uncontrolled usage. */
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

/**
 * Accessible tabs (WAI-ARIA pattern, automatic activation, arrow-key
 * navigation). Client component — import from `@muja-ui/web/client`.
 *
 * ```tsx
 * <Tabs defaultValue="upcoming">
 *   <TabList aria-label="Events">
 *     <Tab value="upcoming">Upcoming</Tab>
 *     <Tab value="past">Past</Tab>
 *   </TabList>
 *   <TabPanel value="upcoming">…</TabPanel>
 *   <TabPanel value="past">…</TabPanel>
 * </Tabs>
 * ```
 */
export function Tabs({
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  className,
  ...rest
}: TabsProps): ReactElement {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const baseId = useId();

  const setValue = useCallback(
    (next: string) => {
      if (controlledValue === undefined) setUncontrolledValue(next);
      onValueChange?.(next);
    },
    [controlledValue, onValueChange],
  );

  const ctx = useMemo(() => ({ value, setValue, baseId }), [value, setValue, baseId]);

  return (
    <TabsContext.Provider value={ctx}>
      <div className={cx('mj-tabs', className)} {...rest} />
    </TabsContext.Provider>
  );
}

export type TabListProps = ComponentPropsWithRef<'div'>;

export function TabList({ className, onKeyDown, ...rest }: TabListProps): ReactElement {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(event);
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (tabs.length === 0) return;

    let next = current;
    if (event.key === 'ArrowLeft') next = current <= 0 ? tabs.length - 1 : current - 1;
    if (event.key === 'ArrowRight') next = current === tabs.length - 1 ? 0 : current + 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;

    event.preventDefault();
    tabs[next]?.focus();
    tabs[next]?.click();
  };

  return (
    <div
      role="tablist"
      className={cx('mj-tabs__list', className)}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  );
}

export interface TabProps extends ComponentPropsWithRef<'button'> {
  value: string;
}

export function Tab({ value, className, onClick, ...rest }: TabProps): ReactElement {
  const ctx = useTabsContext('Tab');
  const selected = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={tabId(ctx.baseId, value)}
      aria-selected={selected}
      aria-controls={panelId(ctx.baseId, value)}
      tabIndex={selected ? 0 : -1}
      className={cx('mj-tabs__tab', className)}
      data-selected={selected || undefined}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.setValue(value);
      }}
      {...rest}
    />
  );
}

export interface TabPanelProps extends ComponentPropsWithRef<'div'> {
  value: string;
}

export function TabPanel({ value, className, ...rest }: TabPanelProps): ReactElement {
  const ctx = useTabsContext('TabPanel');
  const selected = ctx.value === value;
  return (
    <div
      role="tabpanel"
      id={panelId(ctx.baseId, value)}
      aria-labelledby={tabId(ctx.baseId, value)}
      hidden={!selected}
      tabIndex={0}
      className={cx('mj-tabs__panel', className)}
      {...rest}
    />
  );
}
