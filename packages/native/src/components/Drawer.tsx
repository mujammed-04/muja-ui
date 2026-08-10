import { XIcon } from '@muja-ui/icons';
import { useEffect, useRef, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Modal as RNModal,
  Pressable,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { Heading } from './Heading';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Edge the panel slides in from. Defaults to the right. */
  side?: 'left' | 'right';
  /** Panel width as a fraction of the screen. Defaults to 0.85. */
  widthRatio?: number;
  title?: string;
  accessibilityLabel?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Side sheet — a filter or navigation panel that slides in from an edge.
 *
 * ```tsx
 * <Drawer open={open} onClose={close} title="Filters">…</Drawer>
 * ```
 */
export function Drawer({
  open,
  onClose,
  side = 'right',
  widthRatio = 0.85,
  title,
  accessibilityLabel,
  children,
  style,
}: DrawerProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const panelWidth = width * widthRatio;
  const offset = side === 'right' ? panelWidth : -panelWidth;
  const translateX = useRef(new Animated.Value(offset)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: open ? 0 : offset,
      duration: open ? theme.motion.duration.normal : theme.motion.duration.fast,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, offset, translateX, theme.motion.duration]);

  return (
    <RNModal
      visible={open}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, flexDirection: side === 'right' ? 'row' : 'row-reverse' }}>
        <Pressable
          accessibilityLabel="Close"
          onPress={onClose}
          style={{ flex: 1, backgroundColor: theme.colors.overlay }}
        />
        <Animated.View
          accessibilityViewIsModal
          accessibilityLabel={accessibilityLabel ?? title}
          style={[
            {
              width: panelWidth,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              backgroundColor: theme.colors.surface,
              transform: [{ translateX }],
            },
            style,
          ]}
        >
          {title ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: theme.space[3],
                padding: theme.space[4],
                borderBottomWidth: theme.borderWidth.thin,
                borderBottomColor: theme.colors.border,
              }}
            >
              <Heading level={3} size="lg" style={{ flex: 1 }}>
                {title}
              </Heading>
              <IconButton
                icon={<Icon icon={XIcon} color="textSecondary" />}
                accessibilityLabel="Close"
                size="sm"
                onPress={onClose}
              />
            </View>
          ) : null}
          {children}
        </Animated.View>
      </View>
    </RNModal>
  );
}
