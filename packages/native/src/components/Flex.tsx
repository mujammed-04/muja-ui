import type { SpaceToken } from '@muja-ui/tokens';
import { forwardRef } from 'react';
import type { FlexStyle, View as RNView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Box, type BoxProps } from './Box';

export interface FlexOwnProps {
  direction?: FlexStyle['flexDirection'];
  align?: FlexStyle['alignItems'];
  justify?: FlexStyle['justifyContent'];
  wrap?: FlexStyle['flexWrap'];
  gap?: SpaceToken;
  rowGap?: SpaceToken;
  columnGap?: SpaceToken;
}

export type FlexProps = FlexOwnProps & BoxProps;

/** Flexbox container with token-bound `gap`. */
export const Flex = forwardRef<RNView, FlexProps>(function Flex(
  { direction = 'row', align, justify, wrap, gap, rowGap, columnGap, style, ...rest },
  ref,
) {
  const theme = useTheme();
  return (
    <Box
      ref={ref}
      {...rest}
      style={[
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
          gap: gap !== undefined ? theme.space[gap] : undefined,
          rowGap: rowGap !== undefined ? theme.space[rowGap] : undefined,
          columnGap: columnGap !== undefined ? theme.space[columnGap] : undefined,
        },
        style,
      ]}
    />
  );
});
