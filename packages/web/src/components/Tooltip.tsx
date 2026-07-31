import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';
import { useId } from 'react';

export interface TooltipProps extends ComponentPropsWithRef<'span'> {
  /** Tooltip text. */
  label: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
}

/**
 * CSS-only tooltip: shows on hover and keyboard focus, no JS positioning, so
 * it stays SSR-safe. The trigger is linked via `aria-describedby`. Wrap a
 * single focusable element.
 *
 * ```tsx
 * <Tooltip label="Copy to clipboard">
 *   <IconButton aria-label="Copy"><Icon name="copy" /></IconButton>
 * </Tooltip>
 * ```
 */
export function Tooltip({
  label,
  placement = 'top',
  className,
  children,
  ...rest
}: TooltipProps): ReactElement {
  const id = useId();
  return (
    <span className={cx('mj-tooltip', className)} data-tooltip-wrapper="" {...rest}>
      <span className="mj-tooltip__trigger" aria-describedby={id}>
        {children}
      </span>
      <span role="tooltip" id={id} className="mj-tooltip__content" data-placement={placement}>
        {label}
      </span>
    </span>
  );
}
