import type { Size, Variant } from '@muja-ui/core';
import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: Variant;
  size?: Size;
  /** Shows a spinner, sets `aria-busy` and disables interaction. */
  loading?: boolean;
  fullWidth?: boolean;
  /** Decorative icon before the label (replaced by the spinner while loading). */
  leftIcon?: ReactNode;
  /** Decorative icon after the label. */
  rightIcon?: ReactNode;
}

/**
 * Semantic `<button>`. Styling comes from `@muja-ui/web/styles.css` via
 * `data-*` attribute selectors — every color is a `var(--mj-*)` reference, so
 * themes and dark mode apply automatically.
 *
 * ```tsx
 * <Button variant="primary" size="lg" loading>Save</Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled = false,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps): ReactElement {
  return (
    <button
      type={type}
      className={cx('mj-button', className)}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      data-full-width={fullWidth || undefined}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="mj-button__spinner" aria-hidden="true" />
      ) : leftIcon ? (
        <span className="mj-button__icon" aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}
      {children != null && children !== false ? (
        <span className="mj-button__label">{children}</span>
      ) : null}
      {rightIcon && !loading ? (
        <span className="mj-button__icon" aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}
