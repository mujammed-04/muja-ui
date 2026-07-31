import type { Size } from '@muja-ui/core';
import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';

export interface SwitchProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  size?: Size;
  /** Optional label rendered next to the track, inside the wrapping `<label>`. */
  children?: ReactNode;
}

/**
 * Toggle switch backed by a native `<input type="checkbox" role="switch">`,
 * so it stays SSR-safe and form-compatible. The track/thumb are CSS siblings
 * driven by `:checked`.
 *
 * ```tsx
 * <Switch name="notifications" defaultChecked>Notifications</Switch>
 * ```
 */
export function Switch({ size = 'md', className, children, ...rest }: SwitchProps): ReactElement {
  return (
    <label className={cx('mj-switch', className)} data-size={size}>
      <input type="checkbox" role="switch" className="mj-switch__input" {...rest} />
      <span className="mj-switch__track" aria-hidden="true">
        <span className="mj-switch__thumb" />
      </span>
      {children != null ? <span className="mj-switch__label">{children}</span> : null}
    </label>
  );
}
