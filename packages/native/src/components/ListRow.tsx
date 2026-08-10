import { ChevronRightIcon } from '@muja-ui/icons';
import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Icon } from './Icon';
import { Text } from './Text';

export interface ListRowProps {
  title: string;
  /** Secondary line under the title. */
  subtitle?: string;
  /** Leading slot — icon, avatar or a small image. */
  left?: ReactNode;
  /** Trailing slot; replaced by a chevron when `onPress` is set and this is empty. */
  right?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  /** Hides the trailing chevron on a pressable row. */
  hideChevron?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Settings/list row: leading slot, two lines of text, trailing slot. Pressable
 * rows get a chevron and a button role.
 *
 * ```tsx
 * <ListRow title="Notifications" subtitle="Push and email" onPress={open} />
 * ```
 */
export function ListRow({
  title,
  subtitle,
  left,
  right,
  onPress,
  disabled = false,
  hideChevron = false,
  style,
}: ListRowProps) {
  const theme = useTheme();

  const content = (
    <>
      {left}
      <View style={{ flex: 1, gap: theme.space[0.5] }}>
        <Text size="md" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text size="sm" color="textMuted" numberOfLines={2}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right ??
        (onPress && !hideChevron ? (
          <Icon icon={ChevronRightIcon} size={18} color="textMuted" />
        ) : null)}
    </>
  );

  const layout: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space[3],
    paddingHorizontal: theme.space[4],
    paddingVertical: theme.space[3.5],
    minHeight: 56,
    opacity: disabled ? theme.opacity.disabled : 1,
  };

  if (!onPress) return <View style={[layout, style]}>{content}</View>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        layout,
        pressed ? { backgroundColor: theme.colors.surfaceActive } : null,
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}
