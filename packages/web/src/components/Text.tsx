import { cssVar } from '@muja-ui/core';
import type {
  FontSizeToken,
  FontWeightToken,
  LetterSpacingToken,
  LineHeightToken,
} from '@muja-ui/tokens';
import type { CSSProperties, ElementType, ReactElement } from 'react';
import { Box, type BoxProps } from './Box';

export interface TextOwnProps {
  size?: FontSizeToken;
  weight?: FontWeightToken;
  leading?: LineHeightToken;
  tracking?: LetterSpacingToken;
  align?: CSSProperties['textAlign'];
  /** Clips overflowing text to a single line with an ellipsis. */
  truncate?: boolean;
}

export type TextProps<E extends ElementType = 'p'> = TextOwnProps & BoxProps<E>;

/**
 * Typography primitive. Renders `<p>` by default; use `as` for `span`,
 * `label`, etc. Color comes from the inherited `color` style prop
 * (a semantic token), never a raw value.
 *
 * ```tsx
 * <Text size="sm" color="textSecondary" truncate>…</Text>
 * ```
 */
export function Text<E extends ElementType = 'p'>(props: TextProps<E>): ReactElement {
  const { as, size, weight, leading, tracking, align, truncate, style, ...rest } =
    props as TextProps<ElementType>;

  const textStyle: CSSProperties = {
    fontSize: size !== undefined ? cssVar('font-size', size) : undefined,
    fontWeight:
      weight !== undefined
        ? (cssVar('font-weight', weight) as CSSProperties['fontWeight'])
        : undefined,
    lineHeight: leading !== undefined ? cssVar('leading', leading) : undefined,
    letterSpacing: tracking !== undefined ? cssVar('tracking', tracking) : undefined,
    textAlign: align,
    ...(truncate
      ? { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }
      : null),
  };

  return <Box as={as ?? 'p'} {...(rest as BoxProps)} style={{ ...textStyle, ...style }} />;
}
