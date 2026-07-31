import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends ComponentPropsWithRef<'span'> {
  tone?: BadgeTone;
  /** `subtle` = tinted background, `solid` = filled, `outline` = bordered. */
  variant?: 'subtle' | 'solid' | 'outline';
}

/**
 * Small status label. Tones map to the semantic status colors so themes and
 * dark mode apply automatically.
 *
 * ```tsx
 * <Badge tone="success">Confirmed</Badge>
 * ```
 */
export function Badge({
  tone = 'neutral',
  variant = 'subtle',
  className,
  ...rest
}: BadgeProps): ReactElement {
  return (
    <span
      className={cx('mj-badge', className)}
      data-tone={tone}
      data-variant={variant}
      {...rest}
    />
  );
}
