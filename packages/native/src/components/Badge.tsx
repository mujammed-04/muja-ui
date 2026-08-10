import type { SemanticColorToken } from '@muja-ui/tokens';
import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export type BadgeTone = 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  tone?: BadgeTone;
  /** `subtle` = tinted background, `solid` = filled, `outline` = bordered. */
  variant?: 'subtle' | 'solid' | 'outline';
  children?: ReactNode;
  /** Icon rendered before the label. */
  leftIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface ToneColors {
  solidBg: SemanticColorToken;
  solidFg: SemanticColorToken;
  subtleBg: SemanticColorToken;
  subtleFg: SemanticColorToken;
}

const tones: Record<BadgeTone, ToneColors> = {
  neutral: {
    solidBg: 'secondaryActive',
    solidFg: 'onSecondary',
    subtleBg: 'bgMuted',
    subtleFg: 'textSecondary',
  },
  primary: {
    solidBg: 'primary',
    solidFg: 'onPrimary',
    subtleBg: 'primarySubtle',
    subtleFg: 'primaryText',
  },
  accent: { solidBg: 'accent', solidFg: 'onAccent', subtleBg: 'accentSubtle', subtleFg: 'accentText' },
  success: {
    solidBg: 'success',
    solidFg: 'onSuccess',
    subtleBg: 'successSubtle',
    subtleFg: 'successText',
  },
  warning: {
    solidBg: 'warning',
    solidFg: 'onWarning',
    subtleBg: 'warningSubtle',
    subtleFg: 'warningText',
  },
  danger: { solidBg: 'danger', solidFg: 'onDanger', subtleBg: 'dangerSubtle', subtleFg: 'dangerText' },
  info: { solidBg: 'info', solidFg: 'onInfo', subtleBg: 'infoSubtle', subtleFg: 'infoText' },
};

/**
 * Small status label. Tones map to the semantic status colors, so dark mode and
 * brand themes apply automatically.
 *
 * ```tsx
 * <Badge tone="success">Confirmed</Badge>
 * ```
 */
export function Badge({
  tone = 'neutral',
  variant = 'subtle',
  children,
  leftIcon,
  style,
}: BadgeProps) {
  const theme = useTheme();
  const palette = tones[tone];

  const background =
    variant === 'solid'
      ? theme.colors[palette.solidBg]
      : variant === 'subtle'
        ? theme.colors[palette.subtleBg]
        : 'transparent';
  const foreground = variant === 'solid' ? palette.solidFg : palette.subtleFg;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          gap: theme.space[1],
          paddingHorizontal: theme.space[2],
          paddingVertical: theme.space[0.5],
          borderRadius: theme.radius.full,
          backgroundColor: background,
          borderWidth: variant === 'outline' ? theme.borderWidth.thin : 0,
          borderColor: variant === 'outline' ? theme.colors[palette.solidBg] : undefined,
        },
        style,
      ]}
    >
      {leftIcon}
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text size="xs" weight="medium" color={foreground}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
