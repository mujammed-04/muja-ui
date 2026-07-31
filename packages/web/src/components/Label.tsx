import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface LabelProps extends ComponentPropsWithRef<'label'> {
  /** Appends a decorative required marker (`*`). Hidden from screen readers — set `required` on the control itself. */
  required?: boolean;
}

/**
 * Semantic `<label>` for form fields.
 *
 * ```tsx
 * <Label htmlFor="email" required>Email</Label>
 * ```
 */
export function Label({ required = false, className, children, ...rest }: LabelProps): ReactElement {
  return (
    <label className={cx('mj-label', className)} {...rest}>
      {children}
      {required ? (
        <span className="mj-label__required" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}
