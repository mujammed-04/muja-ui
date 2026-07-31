import type { Size, Variant } from '@muja-ui/core';
import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';

export interface IconButtonProps extends ComponentPropsWithRef<'button'> {
  /** Accessible name — icon-only buttons have no visible label. */
  'aria-label': string;
  variant?: Variant;
  size?: Size;
  /** Shows a spinner, sets `aria-busy` and disables interaction. */
  loading?: boolean;
  children?: ReactNode;
}

/**
 * Square icon-only `<button>`. Shares the Button variants; `aria-label` is
 * required because there is no visible label.
 *
 * ```tsx
 * <IconButton aria-label="Share" variant="ghost"><Icon name="share" /></IconButton>
 * ```
 */
export function IconButton({
  variant = 'ghost',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  children,
  type = 'button',
  ...rest
}: IconButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={cx('mj-button', 'mj-icon-button', className)}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="mj-button__spinner" aria-hidden="true" />
      ) : (
        <span className="mj-button__icon" aria-hidden="true">
          {children}
        </span>
      )}
    </button>
  );
}
