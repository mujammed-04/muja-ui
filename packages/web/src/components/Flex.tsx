import { cssVar } from '@muja-ui/core';
import type { SpaceToken } from '@muja-ui/tokens';
import type { CSSProperties, ElementType, ReactElement } from 'react';
import { Box, type BoxProps } from './Box';

export interface FlexOwnProps {
  direction?: CSSProperties['flexDirection'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  gap?: SpaceToken;
  /** Renders `inline-flex` instead of `flex`. */
  inline?: boolean;
}

export type FlexProps<E extends ElementType = 'div'> = FlexOwnProps & BoxProps<E>;

/** Flexbox container with token-bound `gap`. */
export function Flex<E extends ElementType = 'div'>(props: FlexProps<E>): ReactElement {
  const { direction, align, justify, wrap, gap, inline, style, ...rest } =
    props as FlexProps<ElementType>;

  const flexStyle: CSSProperties = {
    display: inline ? 'inline-flex' : 'flex',
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    gap: gap !== undefined ? cssVar('space', gap) : undefined,
  };

  return <Box {...(rest as BoxProps)} style={{ ...flexStyle, ...style }} />;
}
