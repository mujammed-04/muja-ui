import { getIcon, type IconDefinition } from '@muja-ui/core';
import { warnOnce } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface IconProps extends Omit<ComponentPropsWithRef<'svg'>, 'children'> {
  /** An icon definition (preferred, tree-shakable) or a registered icon name. */
  icon: IconDefinition | string;
  /** Width and height. Numbers are px. */
  size?: number | string;
  /** Accessible label. Without it the icon is treated as decorative. */
  label?: string;
  strokeWidth?: number;
}

/**
 * Renders a stroke-style icon from `@muja-ui/icons` (or any IconDefinition).
 * Decorative by default (`aria-hidden`); pass `label` for a semantic image.
 *
 * ```tsx
 * <Icon icon={CheckIcon} />
 * <Icon icon="check" label="Completed" />  // requires registerIcons()
 * ```
 */
export function Icon({
  icon,
  size = 20,
  label,
  strokeWidth = 2,
  ...rest
}: IconProps): ReactElement | null {
  const definition = typeof icon === 'string' ? getIcon(icon) : icon;

  if (!definition) {
    warnOnce(
      `Icon "${String(icon)}" is not registered. Call registerIcons() from @muja-ui/core or pass an IconDefinition directly.`,
    );
    return null;
  }

  const a11yProps = label
    ? ({ role: 'img', 'aria-label': label } as const)
    : ({ 'aria-hidden': true } as const);

  return (
    <svg
      viewBox={definition.viewBox ?? '0 0 24 24'}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      {...a11yProps}
      {...rest}
    >
      {definition.paths.map((d, index) => (
        <path key={index} d={d} />
      ))}
    </svg>
  );
}
