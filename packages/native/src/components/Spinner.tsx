import type { Size } from '@muja-ui/core';
import type { SemanticColorToken } from '@muja-ui/tokens';
import { ActivityIndicator, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface SpinnerProps {
  size?: Size;
  color?: SemanticColorToken;
  /** Accessible label; announced while the spinner is on screen. */
  label?: string;
  style?: StyleProp<ViewStyle>;
}

/** Indeterminate activity indicator. */
export function Spinner({ size = 'md', color = 'primary', label, style }: SpinnerProps) {
  const theme = useTheme();
  return (
    <ActivityIndicator
      size={size === 'sm' ? 'small' : 'large'}
      color={theme.colors[color]}
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      style={[size === 'md' ? { transform: [{ scale: 0.8 }] } : null, style]}
    />
  );
}
