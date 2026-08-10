import type { Theme } from '@muja-ui/core';
import type {
  BorderWidthToken,
  RadiusToken,
  SemanticColorToken,
  ShadowToken,
  ShadowValue,
  SpaceToken,
  ZIndexToken,
} from '@muja-ui/tokens';
import { Platform, type FlexStyle, type ViewStyle } from 'react-native';

/**
 * Token-bound style props — the same names the web package uses, so a screen
 * reads the same on both platforms. Values resolve against the active theme at
 * render time (React Native has no CSS variables).
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
  borderColor?: SemanticColorToken;
  /** borders & effects */
  borderWidth?: BorderWidthToken;
  borderTopWidth?: BorderWidthToken;
  borderBottomWidth?: BorderWidthToken;
  radius?: RadiusToken;
  shadow?: ShadowToken;
  opacity?: number;
  zIndex?: ZIndexToken;
  /** sizing — numbers are density-independent pixels, strings pass through ('100%') */
  w?: FlexStyle['width'];
  h?: FlexStyle['height'];
  minW?: FlexStyle['minWidth'];
  maxW?: FlexStyle['maxWidth'];
  minH?: FlexStyle['minHeight'];
  maxH?: FlexStyle['maxHeight'];
  /** layout */
  flex?: number;
  alignSelf?: FlexStyle['alignSelf'];
  position?: FlexStyle['position'];
  top?: FlexStyle['top'];
  right?: FlexStyle['right'];
  bottom?: FlexStyle['bottom'];
  left?: FlexStyle['left'];
  overflow?: ViewStyle['overflow'];
}

/**
 * Translates a token shadow into React Native's two shadow models: iOS reads
 * the offset/opacity/radius quartet, Android only has `elevation`.
 */
export function shadowStyle(value: ShadowValue): ViewStyle {
  const layer = value.layers[0];
  if (!layer) return Platform.OS === 'android' ? { elevation: 0 } : { shadowOpacity: 0 };

  const alpha = /rgba?\([^)]*,\s*([\d.]+)\s*\)/.exec(layer.color)?.[1];
  return {
    shadowColor: layer.color.replace(/rgba?\(([^)]*?),\s*[\d.]+\s*\)/, 'rgb($1)'),
    shadowOffset: { width: layer.x, height: layer.y },
    shadowOpacity: alpha ? Number(alpha) : 0.1,
    shadowRadius: layer.blur / 2,
    // Android's single-number model: approximate the blur as elevation.
    elevation: Math.round(layer.blur / 2),
  };
}

type Resolver = (value: never, theme: Theme) => ViewStyle;

const space = (key: keyof ViewStyle) => (value: SpaceToken, theme: Theme) =>
  ({ [key]: theme.space[value] }) as ViewStyle;

const pair = (a: keyof ViewStyle, b: keyof ViewStyle) => (value: SpaceToken, theme: Theme) =>
  ({ [a]: theme.space[value], [b]: theme.space[value] }) as ViewStyle;

const passthrough = (key: keyof ViewStyle) => (value: unknown) => ({ [key]: value }) as ViewStyle;

const resolvers: Record<keyof StyleProps, Resolver> = {
  m: space('margin') as Resolver,
  mt: space('marginTop') as Resolver,
  mr: space('marginRight') as Resolver,
  mb: space('marginBottom') as Resolver,
  ml: space('marginLeft') as Resolver,
  mx: pair('marginLeft', 'marginRight') as Resolver,
  my: pair('marginTop', 'marginBottom') as Resolver,
  p: space('padding') as Resolver,
  pt: space('paddingTop') as Resolver,
  pr: space('paddingRight') as Resolver,
  pb: space('paddingBottom') as Resolver,
  pl: space('paddingLeft') as Resolver,
  px: pair('paddingLeft', 'paddingRight') as Resolver,
  py: pair('paddingTop', 'paddingBottom') as Resolver,
  bg: ((value: SemanticColorToken, theme: Theme) => ({
    backgroundColor: theme.colors[value],
  })) as Resolver,
  borderColor: ((value: SemanticColorToken, theme: Theme) => ({
    borderColor: theme.colors[value],
  })) as Resolver,
  borderWidth: ((value: BorderWidthToken, theme: Theme) => ({
    borderWidth: theme.borderWidth[value],
  })) as Resolver,
  borderTopWidth: ((value: BorderWidthToken, theme: Theme) => ({
    borderTopWidth: theme.borderWidth[value],
  })) as Resolver,
  borderBottomWidth: ((value: BorderWidthToken, theme: Theme) => ({
    borderBottomWidth: theme.borderWidth[value],
  })) as Resolver,
  radius: ((value: RadiusToken, theme: Theme) => ({
    borderRadius: theme.radius[value],
  })) as Resolver,
  shadow: ((value: ShadowToken, theme: Theme) => shadowStyle(theme.shadow[value])) as Resolver,
  zIndex: ((value: ZIndexToken, theme: Theme) => ({ zIndex: theme.zIndex[value] })) as Resolver,
  opacity: passthrough('opacity') as Resolver,
  w: passthrough('width') as Resolver,
  h: passthrough('height') as Resolver,
  minW: passthrough('minWidth') as Resolver,
  maxW: passthrough('maxWidth') as Resolver,
  minH: passthrough('minHeight') as Resolver,
  maxH: passthrough('maxHeight') as Resolver,
  flex: passthrough('flex') as Resolver,
  alignSelf: passthrough('alignSelf') as Resolver,
  position: passthrough('position') as Resolver,
  top: passthrough('top') as Resolver,
  right: passthrough('right') as Resolver,
  bottom: passthrough('bottom') as Resolver,
  left: passthrough('left') as Resolver,
  overflow: passthrough('overflow') as Resolver,
};

function isStyleProp(key: string): key is keyof StyleProps {
  return key in resolvers;
}

/**
 * Splits an incoming prop object into a resolved React Native style and the
 * remaining component props.
 */
export function splitStyleProps<P extends Record<string, unknown>>(
  props: P,
  theme: Theme,
): { style: ViewStyle; rest: Omit<P, keyof StyleProps> } {
  const style: ViewStyle = {};
  const rest: Record<string, unknown> = {};

  for (const key of Object.keys(props)) {
    const value = props[key];
    if (value !== undefined && isStyleProp(key)) {
      Object.assign(style, resolvers[key](value as never, theme));
    } else {
      rest[key] = value;
    }
  }

  return { style, rest: rest as Omit<P, keyof StyleProps> };
}
