import type { Size } from '@muja-ui/core';
import { forwardRef, useState, type ReactNode } from 'react';
import {
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { sizeMetrics } from '../system/variants';
import { useTheme } from '../theme/ThemeProvider';

export interface InputProps extends Omit<TextInputProps, 'style' | 'editable'> {
  size?: Size;
  /** Marks the field invalid: danger border and `aria-invalid` for a11y. */
  invalid?: boolean;
  disabled?: boolean;
  /** Adornment rendered inside the field, before the text. */
  leftElement?: ReactNode;
  /** Adornment rendered inside the field, after the text. */
  rightElement?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Single-line text field. Focus and invalid states are drawn on the wrapper so
 * adornments sit inside the border.
 *
 * ```tsx
 * <Input size="md" placeholder="Email" invalid={!!error} />
 * ```
 */
export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    size = 'md',
    invalid = false,
    disabled = false,
    leftElement,
    rightElement,
    style,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const metrics = sizeMetrics(size, theme);
  const [focused, setFocused] = useState(false);

  const borderColor = invalid
    ? theme.colors.danger
    : focused
      ? theme.colors.focusRing
      : theme.colors.border;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: metrics.gap,
          height: metrics.height,
          paddingHorizontal: metrics.paddingHorizontal,
          borderRadius: theme.radius.md,
          borderWidth: focused || invalid ? theme.borderWidth.medium : theme.borderWidth.thin,
          borderColor,
          backgroundColor: disabled ? theme.colors.bgMuted : theme.colors.surface,
        },
        style,
      ]}
    >
      {leftElement}
      <TextInput
        ref={ref}
        editable={!disabled}
        aria-invalid={invalid || undefined}
        aria-disabled={disabled || undefined}
        placeholderTextColor={theme.colors.textMuted}
        selectionColor={theme.colors.primary}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        style={{
          flex: 1,
          // Android adds its own vertical padding; zero it so `height` wins.
          paddingVertical: 0,
          fontFamily: theme.typography.fontFamily.sans,
          fontSize: theme.typography.fontSize[metrics.fontSize],
          color: disabled ? theme.colors.textDisabled : theme.colors.text,
        }}
        {...rest}
      />
      {rightElement}
    </View>
  );
});
