import type { Size } from '@muja-ui/core';
import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';
import { VisuallyHidden } from './VisuallyHidden';

export interface SpinnerProps extends ComponentPropsWithRef<'span'> {
  size?: Size;
  /** Screen-reader announcement. Defaults to "Loading". */
  label?: string;
}

/**
 * Indeterminate loading indicator. Announces via `role="status"` and a
 * visually hidden label.
 *
 * ```tsx
 * <Spinner size="lg" label="Loading events" />
 * ```
 */
export function Spinner({
  size = 'md',
  label = 'Loading',
  className,
  ...rest
}: SpinnerProps): ReactElement {
  return (
    <span role="status" className={cx('mj-spinner', className)} data-size={size} {...rest}>
      <span className="mj-spinner__circle" aria-hidden="true" />
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
}
