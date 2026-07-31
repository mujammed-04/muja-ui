import type { Size } from '@muja-ui/core';
import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  size?: Size;
  /** Marks the field invalid: sets `aria-invalid` and danger styling. */
  invalid?: boolean;
  fullWidth?: boolean;
}

/**
 * Semantic `<input>`. Uncontrolled or controlled by the consumer; styling
 * comes from `@muja-ui/web/styles.css` via `data-*` selectors, every color a
 * `var(--mj-*)` reference.
 *
 * ```tsx
 * <Input size="md" placeholder="Email" invalid={!!error} />
 * ```
 */
export function Input({
  size = 'md',
  invalid = false,
  fullWidth = false,
  className,
  type = 'text',
  ...rest
}: InputProps): ReactElement {
  return (
    <input
      type={type}
      className={cx('mj-input', className)}
      data-size={size}
      data-invalid={invalid || undefined}
      data-full-width={fullWidth || undefined}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
