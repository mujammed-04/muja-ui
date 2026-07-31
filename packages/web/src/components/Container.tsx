import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface ContainerProps extends ComponentPropsWithRef<'div'> {
  /** Max content width, matching the breakpoint tokens. Defaults to `lg`. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Centered page-width wrapper with horizontal padding. Max widths follow the
 * breakpoint tokens (640/768/1024/1280).
 *
 * ```tsx
 * <Container size="lg">…</Container>
 * ```
 */
export function Container({ size = 'lg', className, ...rest }: ContainerProps): ReactElement {
  return <div className={cx('mj-container', className)} data-size={size} {...rest} />;
}
