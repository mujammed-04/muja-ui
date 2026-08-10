import { forwardRef } from 'react';
import { View, type StyleProp, type View as RNView, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { splitStyleProps, type StyleProps } from '../system/styleProps';

export type BoxProps = StyleProps &
  Omit<ViewProps, 'style'> & {
    style?: StyleProp<ViewStyle>;
  };

/**
 * The base layout primitive — a `View` with token-bound style props. Same prop
 * names as `@muja-ui/web`'s Box, so layout code ports between platforms.
 *
 * ```tsx
 * <Box p={6} bg="surface" radius="lg" shadow="sm" />
 * ```
 */
export const Box = forwardRef<RNView, BoxProps>(function Box(props, ref) {
  const theme = useTheme();
  const { style: styleProp, ...restProps } = props;
  const { style, rest } = splitStyleProps(restProps as Record<string, unknown>, theme);
  return <View ref={ref} {...(rest as ViewProps)} style={[style, styleProp]} />;
});
