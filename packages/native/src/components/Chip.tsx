import { XIcon } from '@muja-ui/icons';
import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Icon } from './Icon';
import { Text } from './Text';

export interface ChipProps {
  children?: ReactNode;
  /** Filled/primary styling for an active filter. */
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  /** Renders a trailing × that calls this instead of `onPress`. */
  onRemove?: () => void;
  leftIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Compact toggle used for filters and tags. Pressable when `onPress` or
 * `onRemove` is given, static otherwise.
 *
 * ```tsx
 * <Chip selected={filter === 'today'} onPress={() => setFilter('today')}>Today</Chip>
 * ```
 */
export function Chip({
  children,
  selected = false,
  disabled = false,
  onPress,
  onRemove,
  leftIcon,
  style,
}: ChipProps) {
  const theme = useTheme();

  const body = (
    <>
      {leftIcon}
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text size="sm" weight="medium" color={selected ? 'onPrimary' : 'textSecondary'}>
          {children}
        </Text>
      ) : (
        children
      )}
      {onRemove ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Remove"
          hitSlop={8}
          onPress={onRemove}
        >
          <Icon icon={XIcon} size={14} color={selected ? 'onPrimary' : 'textSecondary'} />
        </Pressable>
      ) : null}
    </>
  );

  const shape = (pressed: boolean): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: theme.space[1.5],
    height: 32,
    paddingHorizontal: theme.space[3],
    borderRadius: theme.radius.full,
    borderWidth: theme.borderWidth.thin,
    borderColor: selected ? theme.colors.primary : theme.colors.border,
    backgroundColor: selected
      ? theme.colors.primary
      : pressed
        ? theme.colors.surfaceActive
        : theme.colors.surface,
    opacity: disabled ? theme.opacity.disabled : 1,
  });

  if (!onPress) return <View style={[shape(false), style]}>{body}</View>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [shape(pressed), style]}
    >
      {body}
    </Pressable>
  );
}
