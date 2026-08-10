import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Heading } from './Heading';
import { Text } from './Text';

export interface EmptyStateProps {
  title: string;
  description?: string;
  /** Illustration or icon above the title. */
  icon?: ReactNode;
  /** Primary action, e.g. a Button. */
  action?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Placeholder for an empty list or a failed-but-recoverable state. Consistent
 * empty states are what stop a list screen from looking broken.
 *
 * ```tsx
 * <EmptyState title="No tickets yet" description="Register for an event to get one." />
 * ```
 */
export function EmptyState({ title, description, icon, action, style }: EmptyStateProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.space[2],
          paddingVertical: theme.space[10],
          paddingHorizontal: theme.space[6],
        },
        style,
      ]}
    >
      {icon ? <View style={{ marginBottom: theme.space[2] }}>{icon}</View> : null}
      <Heading level={3} size="md" align="center">
        {title}
      </Heading>
      {description ? (
        <Text size="sm" color="textMuted" align="center" leading="normal">
          {description}
        </Text>
      ) : null}
      {action ? <View style={{ marginTop: theme.space[3] }}>{action}</View> : null}
    </View>
  );
}
