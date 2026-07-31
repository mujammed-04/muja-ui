import { cx, warnOnce } from '@muja-ui/utils';
import type { ComponentPropsWithRef, MouseEventHandler, ReactElement } from 'react';

export interface ChipProps extends Omit<ComponentPropsWithRef<'button'>, 'onSelect'> {
  size?: 'sm' | 'md';
  /** Marks a toggle chip as active; renders `aria-pressed`. */
  selected?: boolean;
  /** Shows a remove button. Mutually exclusive with `onClick` (a button cannot nest a button). */
  onRemove?: () => void;
  /** Accessible name for the remove button. Defaults to "Remove". */
  removeLabel?: string;
}

/**
 * Compact filter/tag element. With `onClick` it renders a toggle `<button>`
 * (`aria-pressed` from `selected`); with `onRemove` it renders a `<span>` tag
 * with a remove button.
 *
 * ```tsx
 * <Chip selected={active} onClick={toggle}>Sports</Chip>
 * <Chip onRemove={() => removeTag(tag)}>{tag}</Chip>
 * ```
 */
export function Chip({
  size = 'md',
  selected,
  onRemove,
  removeLabel = 'Remove',
  onClick,
  className,
  children,
  ...rest
}: ChipProps): ReactElement {
  if (onRemove) {
    if (onClick) warnOnce('<Chip> ignores `onClick` when `onRemove` is set.');
    return (
      <span
        className={cx('mj-chip', className)}
        data-size={size}
        data-selected={selected || undefined}
        {...(rest as ComponentPropsWithRef<'span'>)}
      >
        <span className="mj-chip__label">{children}</span>
        <button
          type="button"
          className="mj-chip__remove"
          aria-label={removeLabel}
          onClick={onRemove}
        >
          <span aria-hidden="true">×</span>
        </button>
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        className={cx('mj-chip', className)}
        data-size={size}
        data-selected={selected || undefined}
        aria-pressed={selected}
        onClick={onClick as MouseEventHandler<HTMLButtonElement>}
        {...rest}
      >
        <span className="mj-chip__label">{children}</span>
      </button>
    );
  }

  return (
    <span
      className={cx('mj-chip', className)}
      data-size={size}
      data-selected={selected || undefined}
      {...(rest as ComponentPropsWithRef<'span'>)}
    >
      <span className="mj-chip__label">{children}</span>
    </span>
  );
}
