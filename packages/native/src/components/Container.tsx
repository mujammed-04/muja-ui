import type { SpaceToken } from '@muja-ui/tokens';
import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Heading } from './Heading';
import { Text } from './Text';

export interface ContainerProps {
  /** Horizontal page gutter. Defaults to 4 (16dp). */
  gutter?: SpaceToken;
  /** Caps the width and centres the block on tablets. */
  maxWidth?: number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Page-level horizontal gutter, so every screen indents its content equally. */
export function Container({ gutter = 4, maxWidth, children, style }: ContainerProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          paddingHorizontal: theme.space[gutter],
          width: '100%',
          maxWidth,
          alignSelf: maxWidth ? 'center' : undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface SectionProps {
  title?: string;
  description?: string;
  /** Rendered on the title row's trailing edge, e.g. a "See all" link. */
  action?: ReactNode;
  /** Gap between the header and the content. Defaults to 3 (12dp). */
  gap?: SpaceToken;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Titled block of content — the repeating unit of every screen in the app.
 *
 * ```tsx
 * <Section title="Upcoming events" action={<Button variant="link">See all</Button>}>
 *   …
 * </Section>
 * ```
 */
export function Section({ title, description, action, gap = 3, children, style }: SectionProps) {
  const theme = useTheme();
  return (
    <View style={[{ gap: theme.space[gap] }, style]}>
      {title || action ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: theme.space[3],
          }}
        >
          <View style={{ flex: 1, gap: theme.space[0.5] }}>
            {title ? (
              <Heading level={2} size="lg">
                {title}
              </Heading>
            ) : null}
            {description ? (
              <Text size="sm" color="textMuted">
                {description}
              </Text>
            ) : null}
          </View>
          {action}
        </View>
      ) : null}
      {children}
    </View>
  );
}
