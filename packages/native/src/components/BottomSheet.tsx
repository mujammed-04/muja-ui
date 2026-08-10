import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal as RNModal,
  PanResponder,
  Pressable,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { Heading } from './Heading';

const DISMISS_THRESHOLD = 96;

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  /** Close when the backdrop is pressed. Defaults to true. */
  closeOnOverlayPress?: boolean;
  /** Visible title rendered next to the grab handle. */
  title?: string;
  /** Accessible name when there is no visible `title`. */
  accessibilityLabel?: string;
  /** Cap the sheet height as a fraction of the screen. Defaults to 0.9. */
  maxHeightRatio?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Sheet that slides up from the bottom edge, with a grab handle and
 * drag-to-dismiss. The bottom inset is padded so content clears the home
 * indicator.
 *
 * ```tsx
 * <BottomSheet open={open} onClose={close} title="Pick a room">…</BottomSheet>
 * ```
 */
export function BottomSheet({
  open,
  onClose,
  closeOnOverlayPress = true,
  title,
  accessibilityLabel,
  maxHeightRatio = 0.9,
  children,
  style,
}: BottomSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const translateY = useRef(new Animated.Value(height)).current;
  const dragY = useRef(0);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: open ? 0 : height,
      duration: open ? theme.motion.duration.normal : theme.motion.duration.fast,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, height, translateY, theme.motion.duration]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_event, gesture) => gesture.dy > 4,
      onPanResponderMove: (_event, gesture) => {
        if (gesture.dy > 0) {
          dragY.current = gesture.dy;
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: () => {
        if (dragY.current > DISMISS_THRESHOLD) {
          onClose();
        } else {
          Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
        }
        dragY.current = 0;
      },
    }),
  ).current;

  return (
    <RNModal
      visible={open}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Pressable
          accessibilityLabel={closeOnOverlayPress ? 'Close' : undefined}
          onPress={closeOnOverlayPress ? onClose : undefined}
          style={{ flex: 1, backgroundColor: theme.colors.overlay }}
        />
        <Animated.View
          accessibilityViewIsModal
          accessibilityLabel={accessibilityLabel ?? title}
          style={[
            {
              maxHeight: height * maxHeightRatio,
              paddingBottom: insets.bottom + theme.space[4],
              borderTopLeftRadius: theme.radius['2xl'],
              borderTopRightRadius: theme.radius['2xl'],
              backgroundColor: theme.colors.surface,
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          <View {...panResponder.panHandlers} style={{ paddingTop: theme.space[3] }}>
            <View
              style={{
                alignSelf: 'center',
                width: 40,
                height: 4,
                borderRadius: theme.radius.full,
                backgroundColor: theme.colors.borderStrong,
              }}
            />
            {title ? (
              <Heading
                level={3}
                size="lg"
                style={{
                  paddingHorizontal: theme.space[5],
                  paddingTop: theme.space[4],
                }}
              >
                {title}
              </Heading>
            ) : null}
          </View>
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
}
