import { cssVar } from '@muja-ui/core';
import type {
  BorderWidthToken,
  RadiusToken,
  SemanticColorToken,
  ShadowToken,
  SpaceToken,
  ZIndexToken,
} from '@muja-ui/tokens';
import type { CSSProperties } from 'react';

/**
 * Token-bound style props. Every value resolves to a CSS variable reference
 * (`var(--mj-*)`) applied as an inline style — zero runtime CSS generation,
 * fully SSR/RSC compatible, and theme changes apply without re-rendering.
 */
export interface StyleProps {
  /** margin */
  m?: SpaceToken;
  mt?: SpaceToken;
  mr?: SpaceToken;
  mb?: SpaceToken;
  ml?: SpaceToken;
  mx?: SpaceToken;
  my?: SpaceToken;
  /** padding */
  p?: SpaceToken;
  pt?: SpaceToken;
  pr?: SpaceToken;
  pb?: SpaceToken;
  pl?: SpaceToken;
  px?: SpaceToken;
  py?: SpaceToken;
  /** colors */
  bg?: SemanticColorToken;
  color?: SemanticColorToken;
  borderColor?: SemanticColorToken;
  /** borders & effects */
  borderWidth?: BorderWidthToken;
  radius?: RadiusToken;
  shadow?: ShadowToken;
  opacity?: number;
  zIndex?: ZIndexToken;
  /** sizing — numbers are px, strings pass through (e.g. '100%', '32rem') */
  w?: number | string;
  h?: number | string;
  minW?: number | string;
  maxW?: number | string;
  minH?: number | string;
  maxH?: number | string;
}

const spaceVar = (token: SpaceToken): string => cssVar('space', token);
const colorVar = (token: SemanticColorToken): string => cssVar('color', token);
const dim = (value: number | string): string => (typeof value === 'number' ? `${value}px` : value);

type Resolvers = {
  [K in keyof StyleProps]-?: (value: NonNullable<StyleProps[K]>) => CSSProperties;
};

const resolvers: Resolvers = {
  m: (v) => ({ margin: spaceVar(v) }),
  mt: (v) => ({ marginTop: spaceVar(v) }),
  mr: (v) => ({ marginRight: spaceVar(v) }),
  mb: (v) => ({ marginBottom: spaceVar(v) }),
  ml: (v) => ({ marginLeft: spaceVar(v) }),
  mx: (v) => ({ marginLeft: spaceVar(v), marginRight: spaceVar(v) }),
  my: (v) => ({ marginTop: spaceVar(v), marginBottom: spaceVar(v) }),
  p: (v) => ({ padding: spaceVar(v) }),
  pt: (v) => ({ paddingTop: spaceVar(v) }),
  pr: (v) => ({ paddingRight: spaceVar(v) }),
  pb: (v) => ({ paddingBottom: spaceVar(v) }),
  pl: (v) => ({ paddingLeft: spaceVar(v) }),
  px: (v) => ({ paddingLeft: spaceVar(v), paddingRight: spaceVar(v) }),
  py: (v) => ({ paddingTop: spaceVar(v), paddingBottom: spaceVar(v) }),
  bg: (v) => ({ background: colorVar(v) }),
  color: (v) => ({ color: colorVar(v) }),
  borderColor: (v) => ({ borderColor: colorVar(v) }),
  borderWidth: (v) => ({ borderWidth: cssVar('border-width', v), borderStyle: 'solid' }),
  radius: (v) => ({ borderRadius: cssVar('radius', v) }),
  shadow: (v) => ({ boxShadow: cssVar('shadow', v) }),
  opacity: (v) => ({ opacity: v }),
  zIndex: (v) => ({ zIndex: cssVar('z', v) as CSSProperties['zIndex'] }),
  w: (v) => ({ width: dim(v) }),
  h: (v) => ({ height: dim(v) }),
  minW: (v) => ({ minWidth: dim(v) }),
  maxW: (v) => ({ maxWidth: dim(v) }),
  minH: (v) => ({ minHeight: dim(v) }),
  maxH: (v) => ({ maxHeight: dim(v) }),
};

function isStylePropKey(key: string): key is keyof StyleProps {
  return key in resolvers;
}

/**
 * Splits an incoming prop object into resolved inline styles (from token
 * props) and the remaining DOM props.
 */
export function splitStyleProps<P extends Record<string, unknown>>(
  props: P,
): { style: CSSProperties; rest: Omit<P, keyof StyleProps> } {
  const style: CSSProperties = {};
  const rest: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined && isStylePropKey(key)) {
      Object.assign(style, resolvers[key](value as never));
    } else {
      rest[key] = value;
    }
  }

  return { style, rest: rest as Omit<P, keyof StyleProps> };
}
