import type { Size } from '@muja-ui/core';
import { CheckIcon, ChevronDownIcon } from '@muja-ui/icons';
import { useState } from 'react';
import { Pressable, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { isIOS } from '../system/platform';
import { sizeMetrics } from '../system/variants';
import { useTheme } from '../theme/ThemeProvider';
import { BottomSheet } from './BottomSheet';
import { Icon } from './Icon';
import { Text } from './Text';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  /** Secondary line under the label. */
  description?: string;
  disabled?: boolean;
}

export interface SelectProps<T extends string = string> {
  options: readonly SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  /** Shown when nothing is selected. */
  placeholder?: string;
  /** Sheet heading. */
  title?: string;
  size?: Size;
  invalid?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * Field that opens a bottom sheet of options — the native counterpart to the
 * web package's `<select>`. Options are data, not `<option>` children, because
 * React Native has no equivalent element.
 *
 * ```tsx
 * <Select options={rooms} value={roomId} onChange={setRoomId} placeholder="Choose a room" />
 * ```
 */
export function Select<T extends string = string>({
  options,
  value,
  onChange,
  placeholder,
  title,
  size = 'md',
  invalid = false,
  disabled = false,
  style,
  accessibilityLabel,
}: SelectProps<T>) {
  const theme = useTheme();
  const metrics = sizeMetrics(size, theme);
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);
  const ios = isIOS();

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? title ?? placeholder}
        accessibilityValue={{ text: selected?.label }}
        accessibilityState={{ disabled, expanded: open }}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: metrics.gap,
            minHeight: metrics.height,
            paddingHorizontal: metrics.paddingHorizontal,
            borderRadius: theme.radius.md,
            // Mirrors Input: iOS is a filled rect that only gains a stroke when invalid.
            borderWidth: invalid
              ? ios
                ? theme.borderWidth.thin
                : theme.borderWidth.medium
              : ios
                ? 0
                : theme.borderWidth.thin,
            borderColor: invalid ? theme.colors.danger : theme.colors.border,
            backgroundColor: ios
              ? disabled
                ? theme.colors.bgSubtle
                : theme.colors.bgMuted
              : disabled
                ? theme.colors.bgMuted
                : theme.colors.surface,
            opacity: disabled ? theme.opacity.disabled : 1,
          },
          style,
        ]}
      >
        <Text
          size={metrics.fontSize}
          color={selected ? 'text' : 'textMuted'}
          truncate
          style={{ flex: 1 }}
        >
          {selected?.label ?? placeholder ?? ''}
        </Text>
        <Icon icon={ChevronDownIcon} size={metrics.iconSize} color="textSecondary" />
      </Pressable>

      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title={title ?? placeholder}
        accessibilityLabel={accessibilityLabel}
      >
        <ScrollView style={{ marginTop: theme.space[2] }}>
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="menuitem"
                accessibilityState={{ selected: isSelected, disabled: option.disabled }}
                disabled={option.disabled}
                onPress={() => {
                  onChange?.(option.value);
                  setOpen(false);
                }}
                style={({ pressed }) => ({
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: theme.space[3],
                  paddingHorizontal: theme.space[5],
                  paddingVertical: theme.space[3.5],
                  backgroundColor: pressed ? theme.colors.surfaceActive : 'transparent',
                  opacity: option.disabled ? theme.opacity.disabled : 1,
                })}
              >
                <View style={{ flex: 1 }}>
                  <Text size="md" weight={isSelected ? 'semibold' : 'regular'}>
                    {option.label}
                  </Text>
                  {option.description ? (
                    <Text size="sm" color="textMuted">
                      {option.description}
                    </Text>
                  ) : null}
                </View>
                {isSelected ? <Icon icon={CheckIcon} color="primary" /> : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </BottomSheet>
    </>
  );
}
