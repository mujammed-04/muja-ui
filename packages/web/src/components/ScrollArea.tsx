import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface ScrollAreaProps extends ComponentPropsWithRef<'div'> {
  orientation?: 'vertical' | 'horizontal' | 'both';
  maxHeight?: number | string;
  maxWidth?: number | string;
}

/**
 * Scroll container with slim, theme-aware scrollbars (pure CSS via
 * `scrollbar-*`/`::-webkit-scrollbar` — no JS thumb tracking). SSR-safe.
 * Give it a bounded size via `maxHeight`/`maxWidth` or your own styles.
 *
 * ```tsx
 * <ScrollArea maxHeight={320}>{longList}</ScrollArea>
 * ```
 */
export function ScrollArea({
  orientation = 'vertical',
  maxHeight,
  maxWidth,
  className,
  style,
  ...rest
}: ScrollAreaProps): ReactElement {
  return (
    <div
      className={cx('mj-scroll-area', className)}
      data-orientation={orientation}
      style={{ maxHeight, maxWidth, ...style }}
      {...rest}
    />
  );
}
