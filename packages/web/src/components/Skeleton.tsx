import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface SkeletonProps extends ComponentPropsWithRef<'div'> {
  /** `text` matches a line of text, `circle` is round, `rect` is a plain block. */
  variant?: 'text' | 'circle' | 'rect';
  width?: number | string;
  height?: number | string;
}

/**
 * Loading placeholder with a pulse animation. Hidden from assistive
 * technology — announce loading state on the container (`aria-busy`).
 *
 * ```tsx
 * <Skeleton variant="text" width="60%" />
 * <Skeleton variant="circle" width={40} height={40} />
 * ```
 */
export function Skeleton({
  variant = 'rect',
  width,
  height,
  className,
  style,
  ...rest
}: SkeletonProps): ReactElement {
  return (
    <div
      aria-hidden="true"
      className={cx('mj-skeleton', className)}
      data-variant={variant}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}
