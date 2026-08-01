import { palette } from './colors';

/**
 * Semantic color roles. Components reference ONLY these tokens (through the
 * theme / CSS variables), never raw palette values. Light and dark themes
 * provide a value for every role.
 */
export interface SemanticColors {
  /** App background layers */
  bg: string;
  bgSubtle: string;
  bgMuted: string;

  /** Elevated surfaces (cards, menus, inputs) */
  surface: string;
  surfaceHover: string;
  surfaceActive: string;
  overlay: string;

  /** Foreground */
  text: string;
  textSecondary: string;
  textMuted: string;
  textDisabled: string;
  textInverse: string;

  /** Strokes */
  border: string;
  borderStrong: string;
  borderMuted: string;
  focusRing: string;

  /** Brand */
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primarySubtle: string;
  primarySubtleHover: string;
  primaryText: string;
  onPrimary: string;

  /** Secondary brand hue for emphasis next to `primary` (CTAs, highlights) */
  accent: string;
  accentHover: string;
  accentActive: string;
  accentSubtle: string;
  accentText: string;
  onAccent: string;

  /** Neutral action */
  secondary: string;
  secondaryHover: string;
  secondaryActive: string;
  onSecondary: string;

  /** Statuses */
  success: string;
  successSubtle: string;
  successText: string;
  onSuccess: string;

  warning: string;
  warningSubtle: string;
  warningText: string;
  onWarning: string;

  danger: string;
  dangerHover: string;
  dangerActive: string;
  dangerSubtle: string;
  dangerText: string;
  onDanger: string;

  info: string;
  infoSubtle: string;
  infoText: string;
  onInfo: string;
}

export type SemanticColorToken = keyof SemanticColors;

export const lightColors: SemanticColors = {
  bg: palette.white,
  bgSubtle: palette.gray[50],
  bgMuted: palette.gray[100],

  surface: palette.white,
  surfaceHover: palette.gray[50],
  surfaceActive: palette.gray[100],
  overlay: 'rgba(15, 23, 42, 0.48)',

  text: palette.gray[900],
  textSecondary: palette.gray[600],
  textMuted: palette.gray[500],
  textDisabled: palette.gray[400],
  textInverse: palette.white,

  border: palette.gray[200],
  borderStrong: palette.gray[300],
  borderMuted: palette.gray[100],
  focusRing: palette.primary[500],

  primary: palette.primary[600],
  primaryHover: palette.primary[700],
  primaryActive: palette.primary[800],
  primarySubtle: palette.primary[50],
  primarySubtleHover: palette.primary[100],
  primaryText: palette.primary[700],
  onPrimary: palette.white,

  accent: palette.accent[600],
  accentHover: palette.accent[700],
  accentActive: palette.accent[800],
  accentSubtle: palette.accent[50],
  accentText: palette.accent[700],
  onAccent: palette.white,

  secondary: palette.gray[100],
  secondaryHover: palette.gray[200],
  secondaryActive: palette.gray[300],
  onSecondary: palette.gray[900],

  success: palette.success[600],
  successSubtle: palette.success[50],
  successText: palette.success[700],
  onSuccess: palette.white,

  warning: palette.warning[500],
  warningSubtle: palette.warning[50],
  warningText: palette.warning[700],
  onWarning: palette.gray[900],

  danger: palette.danger[600],
  dangerHover: palette.danger[700],
  dangerActive: palette.danger[800],
  dangerSubtle: palette.danger[50],
  dangerText: palette.danger[700],
  onDanger: palette.white,

  info: palette.info[600],
  infoSubtle: palette.info[50],
  infoText: palette.info[700],
  onInfo: palette.white,
};

export const darkColors: SemanticColors = {
  bg: palette.gray[950],
  bgSubtle: palette.gray[900],
  bgMuted: palette.gray[800],

  surface: palette.gray[900],
  surfaceHover: palette.gray[800],
  surfaceActive: palette.gray[700],
  overlay: 'rgba(2, 6, 23, 0.64)',

  text: palette.gray[50],
  textSecondary: palette.gray[300],
  textMuted: palette.gray[500],
  textDisabled: palette.gray[600],
  textInverse: palette.gray[950],

  border: palette.gray[800],
  borderStrong: palette.gray[600],
  borderMuted: palette.gray[900],
  focusRing: palette.primary[400],

  primary: palette.primary[500],
  primaryHover: palette.primary[400],
  primaryActive: palette.primary[300],
  primarySubtle: palette.primary[950],
  primarySubtleHover: palette.primary[900],
  primaryText: palette.primary[300],
  onPrimary: palette.white,

  accent: palette.accent[500],
  accentHover: palette.accent[400],
  accentActive: palette.accent[300],
  accentSubtle: palette.accent[950],
  accentText: palette.accent[300],
  onAccent: palette.gray[950],

  secondary: palette.gray[800],
  secondaryHover: palette.gray[700],
  secondaryActive: palette.gray[600],
  onSecondary: palette.gray[50],

  success: palette.success[500],
  successSubtle: palette.success[950],
  successText: palette.success[300],
  onSuccess: palette.gray[950],

  warning: palette.warning[400],
  warningSubtle: palette.warning[950],
  warningText: palette.warning[300],
  onWarning: palette.gray[950],

  danger: palette.danger[500],
  dangerHover: palette.danger[400],
  dangerActive: palette.danger[300],
  dangerSubtle: palette.danger[950],
  dangerText: palette.danger[300],
  onDanger: palette.white,

  info: palette.info[500],
  infoSubtle: palette.info[950],
  infoText: palette.info[300],
  onInfo: palette.gray[950],
};
