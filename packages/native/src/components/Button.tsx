import type { Size, Variant } from '@muja-ui/core';
import { forwardRef, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  View,
  type PressableProps,
  type StyleProp,
  type View as RNView,
  type ViewStyle,
} from 'react-native';
import { pressFeedback, sizeMetrics, variantColors } from '../system/variants';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  variant?: Variant;
  size?: Size;
  /** Shows a spinner, marks the control busy and blocks presses. */
  loading?: boolean;
  fullWidth?: boolean;
  /** Decorative icon before the label (replaced by the spinner while loading). */
  leftIcon?: ReactNode;
  /** Decorative icon after the label. */
  rightIcon?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Pressable button. Same variant/size vocabulary as `@muja-ui/web`'s Button;
 * every color resolves from a semantic theme token. Heights are minimums so
 * the label can grow with Dynamic Type; a `sm` button widens its touch area
 * to the 44pt floor.
 *
 * ```tsx
 * <Button variant="primary" size="lg" loading onPress={save}>Save</Button>
 * ```
 */
export const Button = forwardRef<RNView, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled = false,
    children,
    style,
    accessibilityLabel,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const colors = variantColors(variant, theme);
  const metrics = sizeMetrics(size, theme);
  const isInert = disabled || loading;
  const isLink = variant === 'link';
  const slop = metrics.height < 44 ? (44 - metrics.height) / 2 : 0;

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{ disabled: isInert, busy: loading }}
      accessibilityLabel={accessibilityLabel}
      disabled={isInert}
      hitSlop={slop > 0 ? { top: slop, bottom: slop } : undefined}
      style={({ pressed }) => {
        const feedback = pressFeedback(pressed, colors);
        return [
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: metrics.gap,
            minHeight: isLink ? undefined : metrics.height,
            paddingHorizontal: isLink ? 0 : metrics.paddingHorizontal,
            borderRadius: isLink ? 0 : size === 'lg' ? theme.radius.lg : theme.radius.md,
            backgroundColor: feedback.backgroundColor,
            borderColor: colors.borderColor,
            borderWidth: colors.borderWidth,
            alignSelf: fullWidth ? 'stretch' : 'flex-start',
            opacity: isInert ? theme.opacity.disabled : feedback.opacity,
          },
          style,
        ];
      }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors[colors.foreground]} />
      ) : leftIcon ? (
        <View>{leftIcon}</View>
      ) : null}
      {children != null && children !== false ? (
        typeof children === 'string' || typeof children === 'number' ? (
          <Text
            size={metrics.fontSize}
            weight="semibold"
            color={colors.foreground}
            style={colors.underline ? { textDecorationLine: 'underline' } : undefined}
          >
            {children}
          </Text>
        ) : (
          children
        )
      ) : null}
      {rightIcon && !loading ? <View>{rightIcon}</View> : null}
    </Pressable>
  );
});
