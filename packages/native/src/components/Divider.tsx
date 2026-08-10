import type { SemanticColorToken } from '@muja-ui/tokens';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: SemanticColorToken;
  style?: StyleProp<ViewStyle>;
}

/** A one-hairline rule. Decorative — hidden from screen readers. */
export function Divider({ orientation = 'horizontal', color = 'border', style }: DividerProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        orientation === 'horizontal'
          ? { height: StyleSheet.hairlineWidth, alignSelf: 'stretch' }
          : { width: StyleSheet.hairlineWidth, alignSelf: 'stretch' },
        { backgroundColor: theme.colors[color] },
        style,
      ]}
    />
  );
}
