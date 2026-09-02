import type { Size } from '@muja-ui/core';
import { XIcon } from '@muja-ui/icons';
import type { ReactNode } from 'react';
import {
  Modal as RNModal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { isIOS } from '../system/platform';
import { useTheme } from '../theme/ThemeProvider';
import { Heading } from './Heading';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: Size;
  /** Close when the backdrop is pressed. Defaults to true. */
  closeOnOverlayPress?: boolean;
  /** Accessible name for the dialog. */
  accessibilityLabel?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const maxWidth: Record<Size, number> = { sm: 340, md: 420, lg: 560 };

/**
 * Centered dialog on a dimmed backdrop. Built on React Native's `Modal`, so
 * the Android back button and native stacking are handled for us.
 *
 * ```tsx
 * <Modal open={open} onClose={close} accessibilityLabel="Book room">
 *   <ModalHeader onClose={close}><ModalTitle>Book room</ModalTitle></ModalHeader>
 *   <ModalBody>…</ModalBody>
 *   <ModalFooter><Button onPress={confirm}>Confirm</Button></ModalFooter>
 * </Modal>
 * ```
 */
export function Modal({
  open,
  onClose,
  size = 'md',
  closeOnOverlayPress = true,
  accessibilityLabel,
  children,
  style,
}: ModalProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable
        accessibilityLabel={closeOnOverlayPress ? 'Close' : undefined}
        onPress={closeOnOverlayPress ? onClose : undefined}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.space[5],
          backgroundColor: theme.colors.overlay,
        }}
      >
        {/* Swallows presses so tapping the panel doesn't reach the backdrop. */}
        <Pressable
          accessibilityRole="alert"
          accessibilityViewIsModal
          accessibilityLabel={accessibilityLabel}
          onPress={() => {}}
          style={[
            {
              width: Math.min(maxWidth[size], width - theme.space[10]),
              maxHeight: '85%',
              borderRadius: theme.radius.xl,
              backgroundColor: theme.colors.surface,
              overflow: 'hidden',
            },
            style,
          ]}
        >
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

export interface ModalHeaderProps {
  children?: ReactNode;
  /** Renders a close button on the right when provided. */
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function ModalHeader({ children, onClose, style }: ModalHeaderProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: theme.space[3],
          paddingHorizontal: theme.space[5],
          paddingTop: theme.space[5],
          paddingBottom: theme.space[3],
        },
        style,
      ]}
    >
      <View style={{ flex: 1 }}>{children}</View>
      {onClose ? (
        <IconButton
          icon={<Icon icon={XIcon} color="textSecondary" />}
          accessibilityLabel="Close"
          size="sm"
          variant="ghost"
          onPress={onClose}
        />
      ) : null}
    </View>
  );
}

export function ModalTitle({ children }: { children?: ReactNode }) {
  return (
    <Heading level={3} size="lg">
      {children}
    </Heading>
  );
}

export interface ModalBodyProps {
  children?: ReactNode;
  /** Wraps the content in a ScrollView. Defaults to true. */
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ModalBody({ children, scrollable = true, style }: ModalBodyProps) {
  const theme = useTheme();
  const padding = { paddingHorizontal: theme.space[5], paddingBottom: theme.space[4] } as const;
  if (!scrollable) return <View style={[padding, style]}>{children}</View>;
  return (
    <ScrollView contentContainerStyle={[padding, style]} keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
}

/** Action row. On iOS a hairline separates it from the body, as in an alert. */
export function ModalFooter({
  children,
  style,
}: {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const ios = isIOS();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: theme.space[2],
          paddingHorizontal: theme.space[5],
          paddingTop: ios ? theme.space[4] : theme.space[3],
          paddingBottom: theme.space[5],
          borderTopWidth: ios ? StyleSheet.hairlineWidth : 0,
          borderTopColor: theme.colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
