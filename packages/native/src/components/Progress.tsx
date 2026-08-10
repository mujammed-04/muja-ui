import type { SemanticColorToken } from '@muja-ui/tokens';
import { clamp } from '@muja-ui/utils';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface ProgressProps {
  /** Current value, 0–`max`. */
  value: number;
  max?: number;
  /** Track thickness in dp. */
  height?: number;
  color?: SemanticColorToken;
  trackColor?: SemanticColorToken;
  /** Accessible name, e.g. "Semester progress". */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Determinate progress bar.
 *
 * ```tsx
 * <Progress value={earned} max={total} label="iGPA points" />
 * ```
 */
export function Progress({
  value,
  max = 100,
  height = 8,
  color = 'primary',
  trackColor = 'bgMuted',
  label,
  style,
}: ProgressProps) {
  const theme = useTheme();
  const ratio = max > 0 ? clamp(value / max, 0, 1) : 0;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max, now: Math.round(value) }}
      style={[
        {
          height,
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors[trackColor],
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${ratio * 100}%`,
          height: '100%',
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors[color],
        }}
      />
    </View>
  );
}
