import type { RadiusToken } from '@muja-ui/tokens';
import { useEffect, useRef } from 'react';
import { Animated, Easing, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: RadiusToken;
  /** Turns off the pulse (useful in tests and for reduced-motion screens). */
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Loading placeholder with a pulsing opacity. Hidden from screen readers —
 * announce loading state on the container instead.
 *
 * ```tsx
 * <Skeleton height={20} width="60%" />
 * ```
 */
export function Skeleton({
  width = '100%',
  height = 16,
  radius = 'sm',
  animated = true,
  style,
}: SkeletonProps) {
  const theme = useTheme();
  const pulse = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (!animated) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: theme.motion.duration.slower,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.5,
          duration: theme.motion.duration.slower,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [animated, pulse, theme.motion.duration.slower]);

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width,
          height,
          borderRadius: theme.radius[radius],
          backgroundColor: theme.colors.bgMuted,
          opacity: animated ? pulse : 0.7,
        },
        style,
      ]}
    />
  );
}
