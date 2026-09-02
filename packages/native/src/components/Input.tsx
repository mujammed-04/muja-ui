import type { Size } from '@muja-ui/core';
import { forwardRef, useState, type ReactNode } from 'react';
import { TextInput, View, type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
import { nativeFontFamily } from '../system/font';
import { isIOS } from '../system/platform';
import { sizeMetrics } from '../system/variants';
import { useColorMode, useTheme } from '../theme/ThemeProvider';

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
 * On iOS the field is a filled, borderless rounded rect like a UIKit search
 * field or grouped-list cell; a stroke appears only for focus and errors. The
 * keyboard follows the color mode and shows the native clear button while
 * editing (unless a `rightElement` occupies that spot).
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
  const { resolvedColorMode } = useColorMode();
  const metrics = sizeMetrics(size, theme);
  const [focused, setFocused] = useState(false);
  const ios = isIOS();

  const borderColor = invalid
    ? theme.colors.danger
    : focused
      ? theme.colors.focusRing
      : theme.colors.border;
  const borderWidth = ios
    ? focused || invalid
      ? theme.borderWidth.thin
      : 0
    : focused || invalid
      ? theme.borderWidth.medium
      : theme.borderWidth.thin;
  const backgroundColor = ios
    ? disabled
      ? theme.colors.bgSubtle
      : theme.colors.bgMuted
    : disabled
      ? theme.colors.bgMuted
      : theme.colors.surface;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: metrics.gap,
          minHeight: metrics.height,
          paddingHorizontal: metrics.paddingHorizontal,
          borderRadius: theme.radius.md,
          borderWidth,
          borderColor,
          backgroundColor,
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
        keyboardAppearance={resolvedColorMode}
        clearButtonMode={ios && !rightElement ? 'while-editing' : undefined}
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
          // Android adds its own vertical padding; zero it so `minHeight` wins.
          paddingVertical: 0,
          fontFamily: nativeFontFamily(theme.typography.fontFamily.sans),
          fontSize: theme.typography.fontSize[metrics.fontSize],
          color: disabled ? theme.colors.textDisabled : theme.colors.text,
        }}
        {...rest}
      />
      {rightElement}
    </View>
  );
});
