import { getIcon, type IconDefinition } from '@muja-ui/core';
import type { SemanticColorToken } from '@muja-ui/tokens';
import { warnOnce } from '@muja-ui/utils';
import type { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../theme/ThemeProvider';

export interface IconProps {
  /** An icon definition (preferred, tree-shakable) or a registered icon name. */
  icon: IconDefinition | string;
  size?: number;
  /** Semantic color token. Defaults to the current text color. */
  color?: SemanticColorToken;
  /** Accessible label. Without it the icon is treated as decorative. */
  label?: string;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a stroke-style icon from `@muja-ui/icons` through react-native-svg,
 * from the same platform-neutral path data the web package uses.
 *
 * ```tsx
 * <Icon icon={CheckIcon} color="success" />
 * ```
 */
export function Icon({
  icon,
  size = 20,
  color = 'text',
  label,
  strokeWidth = 2,
  style,
}: IconProps) {
  const theme = useTheme();
  const definition = typeof icon === 'string' ? getIcon(icon) : icon;

  if (!definition) {
    warnOnce(
      `Icon "${String(icon)}" is not registered. Call registerIcons() from @muja-ui/core or pass an IconDefinition directly.`,
    );
    return null;
  }

  return (
    <Svg
      viewBox={definition.viewBox ?? '0 0 24 24'}
      width={size}
      height={size}
      fill="none"
      style={style}
      accessibilityRole={label ? 'image' : undefined}
      accessibilityLabel={label}
      accessibilityElementsHidden={label ? undefined : true}
      importantForAccessibility={label ? undefined : 'no-hide-descendants'}
    >
      {definition.paths.map((d, index) => (
        <Path
          key={index}
          d={d}
          stroke={theme.colors[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}
