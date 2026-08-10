import type { Size, Variant } from '@muja-ui/core';
import { forwardRef, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type PressableProps,
  type StyleProp,
  type View as RNView,
  type ViewStyle,
} from 'react-native';
import { variantColors } from '../system/variants';
import { useTheme } from '../theme/ThemeProvider';

export interface IconButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  /** Required: an icon-only control has no visible label. */
  accessibilityLabel: string;
  icon: ReactNode;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  /** Fully rounded instead of the default `md` radius. */
  round?: boolean;
  style?: StyleProp<ViewStyle>;
}

const boxSize: Record<Size, number> = { sm: 36, md: 44, lg: 52 };

/**
 * A square, icon-only button. `accessibilityLabel` is mandatory — there is no
 * text for a screen reader to fall back on.
 *
 * ```tsx
 * <IconButton icon={<Icon icon={XIcon} />} accessibilityLabel="Close" variant="ghost" />
 * ```
 */
export const IconButton = forwardRef<RNView, IconButtonProps>(function IconButton(
  {
    icon,
    variant = 'ghost',
    size = 'md',
    loading = false,
    round = false,
    disabled = false,
    style,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const colors = variantColors(variant, theme);
  const dimension = boxSize[size];
  const isInert = disabled || loading;

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ disabled: isInert, busy: loading }}
      disabled={isInert}
      // Icon-only targets are small; widen the touch area to the 44pt minimum.
      hitSlop={dimension < 44 ? (44 - dimension) / 2 : undefined}
      style={({ pressed }) => [
        {
          width: dimension,
          height: dimension,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: round ? theme.radius.full : theme.radius.md,
          backgroundColor: pressed ? colors.backgroundPressed : colors.background,
          borderColor: colors.borderColor,
          borderWidth: colors.borderWidth,
          opacity: isInert ? theme.opacity.disabled : 1,
        },
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors[colors.foreground]} />
      ) : (
        icon
      )}
    </Pressable>
  );
});
