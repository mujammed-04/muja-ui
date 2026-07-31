import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface DividerProps extends ComponentPropsWithRef<'hr'> {
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Semantic separator. Horizontal renders `<hr>`; vertical renders a
 * `role="separator"` div (an `<hr>` cannot be vertical semantically).
 */
export function Divider({
  orientation = 'horizontal',
  className,
  ...rest
}: DividerProps): ReactElement {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cx('mj-divider', 'mj-divider--vertical', className)}
        {...(rest as ComponentPropsWithRef<'div'>)}
      />
    );
  }
  return <hr className={cx('mj-divider', className)} {...rest} />;
}
