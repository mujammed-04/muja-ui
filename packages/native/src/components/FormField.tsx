import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Label } from './Label';
import { Text } from './Text';

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  /** Hint shown under the control while it is valid. */
  help?: string;
  /** Replaces `help` and marks the row invalid. */
  error?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Label + control + help/error row. Keeps every form in the app spacing the
 * three parts identically, and makes the error text a live region so screen
 * readers announce validation failures.
 *
 * ```tsx
 * <FormField label="Email" required error={errors.email?.message}>
 *   <Input value={email} onChangeText={setEmail} invalid={!!errors.email} />
 * </FormField>
 * ```
 */
export function FormField({
  label,
  required = false,
  help,
  error,
  children,
  style,
}: FormFieldProps) {
  const theme = useTheme();
  return (
    <View style={[{ gap: theme.space[1.5] }, style]}>
      {label ? (
        <Label required={required} color="textSecondary">
          {label}
        </Label>
      ) : null}
      {children}
      {error ? (
        <Text size="xs" color="dangerText" accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : help ? (
        <Text size="xs" color="textMuted">
          {help}
        </Text>
      ) : null}
    </View>
  );
}
