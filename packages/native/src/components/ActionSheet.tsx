import type { ReactNode } from 'react';
import {
  Animated,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSheetTransition } from '../internal/useSheetTransition';
import { isIOS } from '../system/platform';
import { useTheme } from '../theme/ThemeProvider';
import { BottomSheet } from './BottomSheet';
import { Text } from './Text';

export interface ActionSheetAction {
  label: string;
  onPress: () => void;
  /** Danger styling for destructive actions. */
  destructive?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface ActionSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  actions: readonly ActionSheetAction[];
  /** Label for the trailing cancel row. Pass `null` to omit it. */
  cancelLabel?: string | null;
  style?: StyleProp<ViewStyle>;
}

/**
 * Menu of actions in a bottom sheet — the native counterpart to the web
 * package's `DropdownMenu`. Anchored dropdowns don't belong on a phone, so the
 * same intent surfaces as a sheet.
 *
 * On iOS it takes the `UIAlertController` action-sheet form: a floating inset
 * group of centred, tint-coloured rows separated by hairlines, destructive
 * rows in red, and Cancel as its own bold card underneath. Elsewhere it is a
 * list inside `BottomSheet`.
 *
 * ```tsx
 * <ActionSheet open={open} onClose={close} actions={[
 *   { label: 'Share ticket', onPress: share },
 *   { label: 'Cancel registration', onPress: cancel, destructive: true },
 * ]} />
 * ```
 */
export function ActionSheet(props: ActionSheetProps) {
  return isIOS() ? <IOSActionSheet {...props} /> : <SheetActionSheet {...props} />;
}

/** UIKit-style action sheet: inset grouped cards above the home indicator. */
function IOSActionSheet({
  open,
  onClose,
  title,
  description,
  actions,
  cancelLabel = 'Cancel',
  style,
}: ActionSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { translateY, backdrop } = useSheetTransition(open, height);
  const hasHeader = Boolean(title || description);

  const group: ViewStyle = {
    borderRadius: theme.radius.xl,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  };
  const separator: ViewStyle = {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  };
  const row = (pressed: boolean, leading: boolean): ViewStyle => ({
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: leading ? 'flex-start' : 'center',
    gap: theme.space[3],
    paddingHorizontal: theme.space[4],
    backgroundColor: pressed ? theme.colors.surfaceActive : 'transparent',
  });

  return (
    <RNModal
      visible={open}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View
          style={{ flex: 1, backgroundColor: theme.colors.overlay, opacity: backdrop }}
        >
          <Pressable accessibilityLabel="Close" onPress={onClose} style={{ flex: 1 }} />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
          accessibilityLabel={title}
          style={[
            {
              paddingHorizontal: theme.space[2],
              paddingBottom: insets.bottom + theme.space[2],
              gap: theme.space[2],
              transform: [{ translateY }],
            },
            style,
          ]}
        >
          <View style={group} accessibilityRole="menu">
            {hasHeader ? (
              <View
                style={{
                  alignItems: 'center',
                  gap: theme.space[1],
                  paddingHorizontal: theme.space[4],
                  paddingVertical: theme.space[3.5],
                }}
              >
                {title ? (
                  <Text size="xs" weight="semibold" color="textSecondary" align="center">
                    {title}
                  </Text>
                ) : null}
                {description ? (
                  <Text size="xs" color="textSecondary" align="center">
                    {description}
                  </Text>
                ) : null}
              </View>
            ) : null}
            {actions.map((action, index) => (
              <Pressable
                key={action.label}
                accessibilityRole="menuitem"
                accessibilityState={{ disabled: action.disabled }}
                disabled={action.disabled}
                onPress={() => {
                  onClose();
                  action.onPress();
                }}
                style={({ pressed }) => [
                  row(pressed, action.icon != null),
                  index > 0 || hasHeader ? separator : null,
                  action.disabled ? { opacity: theme.opacity.disabled } : null,
                ]}
              >
                {action.icon}
                <Text
                  size="lg"
                  color={action.destructive ? 'dangerText' : 'primaryText'}
                  numberOfLines={1}
                >
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
          {cancelLabel ? (
            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={({ pressed }) => [group, row(pressed, false)]}
            >
              <Text size="lg" weight="semibold" color="primaryText">
                {cancelLabel}
              </Text>
            </Pressable>
          ) : null}
        </Animated.View>
      </View>
    </RNModal>
  );
}

/** List of actions inside the shared `BottomSheet` (Android and everything else). */
function SheetActionSheet({
  open,
  onClose,
  title,
  description,
  actions,
  cancelLabel = 'Cancel',
  style,
}: ActionSheetProps) {
  const theme = useTheme();

  return (
    <BottomSheet open={open} onClose={onClose} title={title} style={style}>
      {description ? (
        <Text
          size="sm"
          color="textMuted"
          style={{ paddingHorizontal: theme.space[5], paddingTop: theme.space[2] }}
        >
          {description}
        </Text>
      ) : null}
      <View style={{ paddingTop: theme.space[3] }} accessibilityRole="menu">
        {actions.map((action) => (
          <Pressable
            key={action.label}
            accessibilityRole="menuitem"
            accessibilityState={{ disabled: action.disabled }}
            disabled={action.disabled}
            onPress={() => {
              onClose();
              action.onPress();
            }}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              gap: theme.space[3],
              paddingHorizontal: theme.space[5],
              paddingVertical: theme.space[4],
              backgroundColor: pressed ? theme.colors.surfaceActive : 'transparent',
              opacity: action.disabled ? theme.opacity.disabled : 1,
            })}
          >
            {action.icon}
            <Text size="md" weight="medium" color={action.destructive ? 'dangerText' : 'text'}>
              {action.label}
            </Text>
          </Pressable>
        ))}
        {cancelLabel ? (
          <Pressable
            accessibilityRole="button"
            onPress={onClose}
            style={({ pressed }) => ({
              paddingHorizontal: theme.space[5],
              paddingVertical: theme.space[4],
              borderTopWidth: theme.borderWidth.thin,
              borderTopColor: theme.colors.border,
              backgroundColor: pressed ? theme.colors.surfaceActive : 'transparent',
            })}
          >
            <Text size="md" weight="semibold" color="textSecondary">
              {cancelLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </BottomSheet>
  );
}
