import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
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
 * ```tsx
 * <ActionSheet open={open} onClose={close} actions={[
 *   { label: 'Share ticket', onPress: share },
 *   { label: 'Cancel registration', onPress: cancel, destructive: true },
 * ]} />
 * ```
 */
export function ActionSheet({
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
