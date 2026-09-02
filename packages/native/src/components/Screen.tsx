import type { SemanticColorToken } from '@muja-ui/tokens';
import type { ReactNode } from 'react';
import { RefreshControl, ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIOS } from '../system/platform';
import { useTheme } from '../theme/ThemeProvider';

export interface ScreenProps {
  children?: ReactNode;
  /** Page background. Defaults to the app background token. */
  bg?: SemanticColorToken;
  /** Wraps content in a ScrollView. Off for screens that own a FlatList. */
  scrollable?: boolean;
  /** Pull-to-refresh; only meaningful when `scrollable`. */
  refreshing?: boolean;
  onRefresh?: () => void;
  /** Which safe-area edges to pad. Defaults to top and bottom. */
  edges?: readonly ('top' | 'bottom')[];
  /** Extra bottom padding so content clears a tab bar or sticky footer. */
  bottomInset?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

/**
 * Screen shell: safe-area padding, themed background and optional scrolling
 * with pull-to-refresh. Every route in an app should start with one. A
 * scrollable Screen keeps focused inputs above the keyboard on iOS.
 *
 * ```tsx
 * <Screen scrollable refreshing={isRefetching} onRefresh={refetch}>
 *   <Container>…</Container>
 * </Screen>
 * ```
 */
export function Screen({
  children,
  bg = 'bg',
  scrollable = false,
  refreshing,
  onRefresh,
  edges = ['top', 'bottom'],
  bottomInset = 0,
  contentContainerStyle,
  style,
}: ScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: (edges.includes('bottom') ? insets.bottom : 0) + bottomInset,
  };

  if (!scrollable) {
    return (
      <View style={[{ flex: 1, backgroundColor: theme.colors[bg] }, padding, style]}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={[{ flex: 1, backgroundColor: theme.colors[bg] }, style]}
      contentContainerStyle={[padding, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      // iOS lets the keyboard follow the finger down, and scroll views inset
      // themselves for it so a focused field is never hidden behind it. Android
      // resizes the window instead (adjustResize) and has no such mode.
      keyboardDismissMode={isIOS() ? 'interactive' : 'on-drag'}
      automaticallyAdjustKeyboardInsets={isIOS()}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  );
}
