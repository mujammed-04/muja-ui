import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  /** Marks the field invalid: sets `aria-invalid` and danger styling. */
  invalid?: boolean;
  fullWidth?: boolean;
  /** CSS `resize` behaviour. Defaults to `vertical`. */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

/**
 * Semantic `<textarea>` sharing the Input field styling.
 *
 * ```tsx
 * <Textarea rows={4} placeholder="Description" />
 * ```
 */
export function Textarea({
  invalid = false,
  fullWidth = false,
  resize = 'vertical',
  className,
  ...rest
}: TextareaProps): ReactElement {
  return (
    <textarea
      className={cx('mj-textarea', className)}
      data-invalid={invalid || undefined}
      data-full-width={fullWidth || undefined}
      data-resize={resize}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  );
}
