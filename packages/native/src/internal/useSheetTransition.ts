import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { sheetSpring } from '../system/platform';
import { useTheme } from '../theme/ThemeProvider';

/**
 * Drives a surface sliding up from the bottom edge with a fading backdrop.
 * Entering uses a spring (UIKit's sheet presentation feel); leaving uses a
 * short ease-in so dismissal reads faster than arrival.
 *
 * `distance` is how far off-screen the closed surface sits — usually the
 * window height.
 */
export function useSheetTransition(open: boolean, distance: number) {
  const theme = useTheme();
  const translateY = useRef(new Animated.Value(distance)).current;
  const backdrop = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = open
      ? Animated.parallel([
          Animated.spring(translateY, { toValue: 0, ...sheetSpring, useNativeDriver: true }),
          Animated.timing(backdrop, {
            toValue: 1,
            duration: theme.motion.duration.normal,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      : Animated.parallel([
          Animated.timing(translateY, {
            toValue: distance,
            duration: theme.motion.duration.fast,
            easing: Easing.in(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(backdrop, {
            toValue: 0,
            duration: theme.motion.duration.fast,
            useNativeDriver: true,
          }),
        ]);
    animation.start();
    return () => animation.stop();
  }, [open, distance, translateY, backdrop, theme.motion.duration]);

  return { translateY, backdrop };
}
