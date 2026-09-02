import { forwardRef, useState } from 'react';
import { TextInput, type StyleProp, type TextInputProps, type TextStyle } from 'react-native';
import { nativeFontFamily } from '../system/font';
import { isIOS } from '../system/platform';
import { useColorMode, useTheme } from '../theme/ThemeProvider';

export interface TextareaProps extends Omit<TextInputProps, 'style' | 'editable' | 'multiline'> {
  invalid?: boolean;
  disabled?: boolean;
  /** Visible rows at rest (the field grows with content beyond this). */
  rows?: number;
  style?: StyleProp<TextStyle>;
}

/** Multi-line text field. Same states — and the same iOS filled look — as `Input`. */
export const Textarea = forwardRef<TextInput, TextareaProps>(function Textarea(
  { invalid = false, disabled = false, rows = 4, style, onFocus, onBlur, ...rest },
  ref,
) {
  const theme = useTheme();
  const { resolvedColorMode } = useColorMode();
  const [focused, setFocused] = useState(false);
  const ios = isIOS();
  const lineHeight = Math.round(theme.typography.fontSize.md * theme.typography.lineHeight.normal);

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
    <TextInput
      ref={ref}
      multiline
      textAlignVertical="top"
      editable={!disabled}
      aria-invalid={invalid || undefined}
      placeholderTextColor={theme.colors.textMuted}
      selectionColor={theme.colors.primary}
      keyboardAppearance={resolvedColorMode}
      onFocus={(event) => {
        setFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setFocused(false);
        onBlur?.(event);
      }}
      style={[
        {
          minHeight: rows * lineHeight + theme.space[4],
          padding: theme.space[3],
          borderRadius: theme.radius.md,
          borderWidth,
          borderColor: invalid
            ? theme.colors.danger
            : focused
              ? theme.colors.focusRing
              : theme.colors.border,
          backgroundColor,
          fontFamily: nativeFontFamily(theme.typography.fontFamily.sans),
          fontSize: theme.typography.fontSize.md,
          lineHeight,
          color: disabled ? theme.colors.textDisabled : theme.colors.text,
        },
        style,
      ]}
      {...rest}
    />
  );
});
