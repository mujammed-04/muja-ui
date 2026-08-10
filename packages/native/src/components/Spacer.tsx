import type { SpaceToken } from '@muja-ui/tokens';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface SpacerProps {
  /** Fixed size along the parent's main axis. Omit to grow and fill. */
  size?: SpaceToken;
  axis?: 'horizontal' | 'vertical';
}

/** Flexible or fixed empty space. Without `size` it expands to fill. */
export function Spacer({ size, axis = 'vertical' }: SpacerProps) {
  const theme = useTheme();
  if (size === undefined) return <View style={{ flex: 1 }} />;
  const length = theme.space[size];
  return <View style={axis === 'vertical' ? { height: length } : { width: length }} />;
}
