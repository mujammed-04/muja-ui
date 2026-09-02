import { forwardRef, type ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type View as RNView,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { isIOS } from '../system/platform';
import { shadowStyle } from '../system/styleProps';
import { useTheme } from '../theme/ThemeProvider';
import { Heading } from './Heading';
import { Text } from './Text';

export interface CardProps {
  /** `outline` (default) is bordered, `elevated` adds a shadow, `filled` uses a muted background. */
  variant?: 'outline' | 'elevated' | 'filled';
  /** Makes the whole card a button. */
  onPress?: () => void;
  accessibilityLabel?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Surface container. Compose with `CardHeader`, `CardTitle`,
 * `CardDescription`, `CardContent` and `CardFooter`. On iOS the `outline`
 * stroke is a hairline, the way grouped cells are separated.
 *
 * ```tsx
 * <Card variant="elevated" onPress={open}>
 *   <CardHeader>
 *     <CardTitle>Room A101</CardTitle>
 *     <CardDescription>Available today</CardDescription>
 *   </CardHeader>
 *   <CardContent>…</CardContent>
 * </Card>
 * ```
 */
export const Card = forwardRef<RNView, CardProps>(function Card(
  { variant = 'outline', onPress, accessibilityLabel, children, style },
  ref,
) {
  const theme = useTheme();

  const base: ViewStyle = {
    borderRadius: theme.radius.lg,
    backgroundColor: variant === 'filled' ? theme.colors.bgSubtle : theme.colors.surface,
    borderWidth:
      variant === 'outline' ? (isIOS() ? StyleSheet.hairlineWidth : theme.borderWidth.thin) : 0,
    borderColor: theme.colors.border,
    ...(variant === 'elevated' ? shadowStyle(theme.shadow.sm) : null),
  };

  if (!onPress) {
    return (
      <View ref={ref} style={[base, style]}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [
        base,
        pressed ? { backgroundColor: theme.colors.surfaceActive } : null,
        style,
      ]}
    >
      {children}
    </Pressable>
  );
});

interface SectionProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface TextSectionProps {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
}

export function CardHeader({ children, style }: SectionProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        { padding: theme.space[4], paddingBottom: theme.space[2], gap: theme.space[1] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardTitle({ children, style }: TextSectionProps) {
  return (
    <Heading level={3} size="md" style={style}>
      {children}
    </Heading>
  );
}

export function CardDescription({ children, style }: TextSectionProps) {
  return (
    <Text size="sm" color="textMuted" style={style}>
      {children}
    </Text>
  );
}

export function CardContent({ children, style }: SectionProps) {
  const theme = useTheme();
  return (
    <View style={[{ padding: theme.space[4], paddingTop: theme.space[2] }, style]}>{children}</View>
  );
}

export function CardFooter({ children, style }: SectionProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.space[2],
          padding: theme.space[4],
          paddingTop: 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
