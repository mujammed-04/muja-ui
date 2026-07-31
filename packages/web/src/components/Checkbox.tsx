import type { Size } from '@muja-ui/core';
import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';

export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  size?: Size;
  /** Marks the field invalid: sets `aria-invalid` and danger styling. */
  invalid?: boolean;
  /** Optional label rendered next to the box, inside the wrapping `<label>`. */
  children?: ReactNode;
}

/**
 * Native `<input type="checkbox">` wrapped in a `<label>`. The input itself is
 * visually hidden; the box is a sibling span styled from `:checked` via CSS —
 * SSR-safe, works in plain HTML forms.
 *
 * ```tsx
 * <Checkbox name="agree" defaultChecked>I agree</Checkbox>
 * ```
 */
export function Checkbox({
  size = 'md',
  invalid = false,
  className,
  children,
  ...rest
}: CheckboxProps): ReactElement {
  return (
    <label className={cx('mj-checkbox', className)} data-size={size}>
      <input
        type="checkbox"
        className="mj-checkbox__input"
        data-invalid={invalid || undefined}
        aria-invalid={invalid || undefined}
        {...rest}
      />
      <span className="mj-checkbox__box" aria-hidden="true" />
      {children != null ? <span className="mj-checkbox__label">{children}</span> : null}
    </label>
  );
}
