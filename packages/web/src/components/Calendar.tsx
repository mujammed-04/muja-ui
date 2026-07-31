'use client';

import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, KeyboardEvent, ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useControllableState } from '../internal/useControllableState';

/* Local-time day helpers — the calendar works in whole local days. */

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addDays(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

/** Same day-of-month `amount` months away, clamped to the target month's length. */
function addMonthsClamped(date: Date, amount: number): Date {
  const month = addMonths(date, amount);
  const lastDay = addDays(addMonths(month, 1), -1).getDate();
  return new Date(month.getFullYear(), month.getMonth(), Math.min(date.getDate(), lastDay));
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function dayKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

const WEEKS_SHOWN = 6;

export interface CalendarProps
  extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue' | 'onChange'> {
  /** Controlled selected date. */
  value?: Date;
  /** Initial selection for uncontrolled usage. */
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  /** First visible month; defaults to the selected date's month, else today's. */
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  /** 0 = Sunday, 1 = Monday. Defaults to Monday. */
  weekStartsOn?: 0 | 1;
  /** BCP 47 locale for month/weekday names; defaults to the runtime locale. */
  locale?: string;
}

/**
 * Single-date calendar following the WAI-ARIA grid pattern: arrow keys move
 * by day/week, PageUp/PageDown by month, Home/End to the week edges. Month
 * and weekday names come from `Intl` — no date library. Client component —
 * import from `@muja-ui/web/client`.
 *
 * ```tsx
 * <Calendar value={date} onChange={setDate} minDate={new Date()} />
 * ```
 */
export function Calendar({
  value: controlledValue,
  defaultValue,
  onChange,
  defaultMonth,
  minDate,
  maxDate,
  weekStartsOn = 1,
  locale,
  className,
  ...rest
}: CalendarProps): ReactElement {
  const [selected, setSelected] = useControllableState<Date | undefined>(
    controlledValue,
    defaultValue,
    onChange as ((date: Date | undefined) => void) | undefined,
  );

  const today = startOfDay(new Date());
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(defaultMonth ?? selected ?? today),
  );
  const [focusedDay, setFocusedDay] = useState(() => startOfDay(selected ?? today));
  const gridRef = useRef<HTMLDivElement | null>(null);
  const shouldRestoreFocus = useRef(false);

  const min = minDate ? startOfDay(minDate) : undefined;
  const max = maxDate ? startOfDay(maxDate) : undefined;
  const isDisabled = (date: Date): boolean =>
    Boolean((min && date < min) || (max && date > max));

  const monthFormat = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' });
  const weekdayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const dayLabelFormat = new Intl.DateTimeFormat(locale, { dateStyle: 'full' });

  const firstOfMonth = startOfMonth(visibleMonth);
  const gridStart = addDays(
    firstOfMonth,
    -((firstOfMonth.getDay() - weekStartsOn + 7) % 7),
  );
  const weeks: Date[][] = Array.from({ length: WEEKS_SHOWN }, (_, week) =>
    Array.from({ length: 7 }, (_, day) => addDays(gridStart, week * 7 + day)),
  );

  /* After keyboard navigation the focused day may render in a new month —
     move DOM focus once the button exists. */
  useEffect(() => {
    if (!shouldRestoreFocus.current) return;
    shouldRestoreFocus.current = false;
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-date='${dayKey(focusedDay)}']`)
      ?.focus();
  });

  const moveFocus = (next: Date): void => {
    shouldRestoreFocus.current = true;
    setFocusedDay(next);
    if (next.getMonth() !== visibleMonth.getMonth() || next.getFullYear() !== visibleMonth.getFullYear()) {
      setVisibleMonth(startOfMonth(next));
    }
  };

  const handleGridKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focusedDay, -1),
      ArrowRight: () => addDays(focusedDay, 1),
      ArrowUp: () => addDays(focusedDay, -7),
      ArrowDown: () => addDays(focusedDay, 7),
      PageUp: () => addMonthsClamped(focusedDay, -1),
      PageDown: () => addMonthsClamped(focusedDay, 1),
      Home: () => addDays(focusedDay, -((focusedDay.getDay() - weekStartsOn + 7) % 7)),
      End: () => addDays(focusedDay, 6 - ((focusedDay.getDay() - weekStartsOn + 7) % 7)),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    moveFocus(move());
  };

  const changeMonth = (amount: number): void => {
    setVisibleMonth(addMonths(visibleMonth, amount));
    setFocusedDay((day) => addMonthsClamped(day, amount));
  };

  return (
    <div className={cx('mj-calendar', className)} {...rest}>
      <div className="mj-calendar__header">
        <button
          type="button"
          className="mj-calendar__nav"
          aria-label="Previous month"
          onClick={() => changeMonth(-1)}
        >
          <span className="mj-calendar__chevron" aria-hidden="true" data-direction="left" />
        </button>
        <div className="mj-calendar__caption" aria-live="polite">
          {monthFormat.format(visibleMonth)}
        </div>
        <button
          type="button"
          className="mj-calendar__nav"
          aria-label="Next month"
          onClick={() => changeMonth(1)}
        >
          <span className="mj-calendar__chevron" aria-hidden="true" data-direction="right" />
        </button>
      </div>

      <div
        role="grid"
        ref={gridRef}
        className="mj-calendar__grid"
        onKeyDown={handleGridKeyDown}
      >
        <div role="row" className="mj-calendar__weekdays">
          {weeks[0]!.map((date) => (
            <div role="columnheader" className="mj-calendar__weekday" key={dayKey(date)}>
              {weekdayFormat.format(date)}
            </div>
          ))}
        </div>
        {weeks.map((week) => (
          <div role="row" className="mj-calendar__week" key={dayKey(week[0]!)}>
            {week.map((date) => {
              const isSelected = selected !== undefined && isSameDay(date, selected);
              const outside = date.getMonth() !== visibleMonth.getMonth();
              return (
                <div role="gridcell" aria-selected={isSelected} key={dayKey(date)}>
                  <button
                    type="button"
                    className="mj-calendar__day"
                    data-date={dayKey(date)}
                    data-selected={isSelected || undefined}
                    data-outside={outside || undefined}
                    aria-current={isSameDay(date, today) ? 'date' : undefined}
                    aria-label={dayLabelFormat.format(date)}
                    disabled={isDisabled(date)}
                    tabIndex={isSameDay(date, focusedDay) ? 0 : -1}
                    onClick={() => {
                      setSelected(date);
                      setFocusedDay(date);
                      if (outside) setVisibleMonth(startOfMonth(date));
                    }}
                  >
                    {date.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
