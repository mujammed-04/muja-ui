import type { Size } from '@muja-ui/core';
import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface SelectProps extends Omit<ComponentPropsWithRef<'select'>, 'size'> {
  size?: Size;
  /** Marks the field invalid: sets `aria-invalid` and danger styling. */
  invalid?: boolean;
  fullWidth?: boolean;
  /** Renders a disabled placeholder `<option value="">` as the first entry. */
  placeholder?: string;
}

/**
 * Native `<select>` with the shared field styling and a CSS chevron. SSR-safe
 * and keyboard/mobile accessible for free; pass `<option>` children.
 *
 * ```tsx
 * <Select placeholder="Choose a room" fullWidth>
 *   <option value="a101">A101</option>
 * </Select>
 * ```
 */
export function Select({
  size = 'md',
  invalid = false,
  fullWidth = false,
  placeholder,
  className,
  children,
  defaultValue,
  ...rest
}: SelectProps): ReactElement {
  const isControlled = 'value' in rest;
  return (
    <span
      className={cx('mj-select', className)}
      data-size={size}
      data-full-width={fullWidth || undefined}
    >
      <select
        className="mj-select__control"
        data-size={size}
        data-invalid={invalid || undefined}
        aria-invalid={invalid || undefined}
        defaultValue={
          defaultValue ?? (placeholder !== undefined && !isControlled ? '' : undefined)
        }
        {...rest}
      >
        {placeholder !== undefined ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      <span className="mj-select__chevron" aria-hidden="true" />
    </span>
  );
}
