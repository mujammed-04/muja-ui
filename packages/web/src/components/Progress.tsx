import type { Size } from '@muja-ui/core';
import { clamp, cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface ProgressProps extends ComponentPropsWithRef<'div'> {
  /** Current value. Omit for an indeterminate bar. */
  value?: number;
  /** Upper bound. Defaults to 100. */
  max?: number;
  size?: Size;
  /** Accessible name for the progressbar. */
  'aria-label'?: string;
}

/**
 * Determinate or indeterminate progress bar using `role="progressbar"`.
 *
 * ```tsx
 * <Progress value={64} aria-label="Upload progress" />
 * <Progress aria-label="Loading" />
 * ```
 */
export function Progress({
  value,
  max = 100,
  size = 'md',
  className,
  ...rest
}: ProgressProps): ReactElement {
  const indeterminate = value === undefined;
  const clamped = indeterminate ? undefined : clamp(value, 0, max);
  return (
    <div
      role="progressbar"
      className={cx('mj-progress', className)}
      data-size={size}
      data-indeterminate={indeterminate || undefined}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={clamped}
      {...rest}
    >
      <div
        className="mj-progress__fill"
        style={indeterminate ? undefined : { width: `${(clamped! / max) * 100}%` }}
      />
    </div>
  );
}
