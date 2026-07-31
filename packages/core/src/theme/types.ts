import type {
  BorderWidthToken,
  BreakpointToken,
  DurationToken,
  EasingToken,
  FontFamilyToken,
  FontSizeToken,
  FontWeightToken,
  LetterSpacingToken,
  LineHeightToken,
  OpacityToken,
  RadiusToken,
  SemanticColors,
  ShadowToken,
  ShadowValue,
  SpaceToken,
  ZIndexToken,
} from '@muja-ui/tokens';
import type { DeepPartial } from '@muja-ui/utils';

export interface ThemeTypography {
  fontFamily: Record<FontFamilyToken, string>;
  /** Unitless pixels. */
  fontSize: Record<FontSizeToken, number>;
  fontWeight: Record<FontWeightToken, string>;
  /** Unitless multipliers. */
  lineHeight: Record<LineHeightToken, number>;
  /** Pixels. */
  letterSpacing: Record<LetterSpacingToken, number>;
}

export interface ThemeMotion {
  /** Milliseconds. */
  duration: Record<DurationToken, number>;
  easing: Record<EasingToken, string>;
}

/**
 * A complete theme. Token *keys* are fixed by the design system contract;
 * custom themes change values via `createTheme`, never the shape.
 */
export interface Theme {
  name: string;
  colors: SemanticColors;
  typography: ThemeTypography;
  space: Record<SpaceToken, number>;
  radius: Record<RadiusToken, number>;
  borderWidth: Record<BorderWidthToken, number>;
  shadow: Record<ShadowToken, ShadowValue>;
  opacity: Record<OpacityToken, number>;
  breakpoints: Record<BreakpointToken, number>;
  zIndex: Record<ZIndexToken, number>;
  motion: ThemeMotion;
}

export type ThemeOverride = DeepPartial<Theme>;

export type ColorMode = 'light' | 'dark' | 'system';
export type ResolvedColorMode = 'light' | 'dark';
