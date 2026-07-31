'use client';

import type { Size } from '@muja-ui/core';
import { cx, warnOnce } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';
import { createContext, useContext, useId } from 'react';
import { useControllableState } from '../internal/useControllableState';

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  setValue: (value: string) => void;
  size: Size;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps
  extends Omit<ComponentPropsWithRef<'div'>, 'defaultValue' | 'onChange'> {
  /** Shared form field name; auto-generated when omitted. */
  name?: string;
  /** Controlled selected value. */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: Size;
  disabled?: boolean;
  /** Lay the radios out in a row instead of a column. */
  orientation?: 'vertical' | 'horizontal';
}

/**
 * Group of native radio buttons — arrow-key movement comes from the browser.
 * Client component — import from `@muja-ui/web/client`.
 *
 * ```tsx
 * <RadioGroup aria-label="Role" value={role} onChange={setRole}>
 *   <Radio value="student">Student</Radio>
 *   <Radio value="organizer">Organizer</Radio>
 * </RadioGroup>
 * ```
 */
export function RadioGroup({
  name,
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'md',
  disabled = false,
  orientation = 'vertical',
  className,
  ...rest
}: RadioGroupProps): ReactElement {
  const [value, setValue] = useControllableState<string | undefined>(
    controlledValue,
    defaultValue,
    onChange as ((value: string | undefined) => void) | undefined,
  );
  const autoName = useId();

  return (
    <RadioGroupContext.Provider
      value={{ name: name ?? autoName, value, setValue, size, disabled }}
    >
      <div
        role="radiogroup"
        className={cx('mj-radio-group', className)}
        data-orientation={orientation}
        {...rest}
      />
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type' | 'value' | 'name'> {
  value: string;
  children?: ReactNode;
}

export function Radio({
  value,
  disabled,
  className,
  children,
  onChange,
  ...rest
}: RadioProps): ReactElement {
  const ctx = useContext(RadioGroupContext);
  if (ctx === null) {
    warnOnce('<Radio> must be rendered inside <RadioGroup>.');
  }

  return (
    <label className={cx('mj-radio', className)} data-size={ctx?.size ?? 'md'}>
      <input
        type="radio"
        className="mj-radio__input"
        name={ctx?.name}
        value={value}
        checked={ctx ? ctx.value === value : undefined}
        disabled={disabled || ctx?.disabled}
        onChange={(event) => {
          onChange?.(event);
          if (!event.defaultPrevented) ctx?.setValue(value);
        }}
        {...rest}
      />
      <span className="mj-radio__circle" aria-hidden="true" />
      {children != null ? <span className="mj-radio__label">{children}</span> : null}
    </label>
  );
}
