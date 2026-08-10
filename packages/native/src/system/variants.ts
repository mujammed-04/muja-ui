import type { Size, Theme, Variant } from '@muja-ui/core';
import type { SemanticColorToken } from '@muja-ui/tokens';

/** Resolved colors for one interactive variant, in its rest and pressed states. */
export interface VariantColors {
  background: string;
  backgroundPressed: string;
  foreground: SemanticColorToken;
  borderColor?: string;
  borderWidth?: number;
  /** `link` draws its label underlined instead of a container. */
  underline?: boolean;
}

/**
 * Maps a `Variant` onto semantic theme colors. Web does this in CSS via
 * `data-variant` selectors; native resolves it here so both platforms answer
 * `variant="accent"` with the same roles.
 */
export function variantColors(variant: Variant, theme: Theme): VariantColors {
  const { colors, borderWidth } = theme;
  switch (variant) {
    case 'primary':
      return {
        background: colors.primary,
        backgroundPressed: colors.primaryActive,
        foreground: 'onPrimary',
      };
    case 'secondary':
      return {
        background: colors.secondary,
        backgroundPressed: colors.secondaryActive,
        foreground: 'onSecondary',
      };
    case 'accent':
      return {
        background: colors.accent,
        backgroundPressed: colors.accentActive,
        foreground: 'onAccent',
      };
    case 'danger':
      return {
        background: colors.danger,
        backgroundPressed: colors.dangerActive,
        foreground: 'onDanger',
      };
    case 'outline':
      return {
        background: 'transparent',
        backgroundPressed: colors.surfaceActive,
        foreground: 'text',
        borderColor: colors.borderStrong,
        borderWidth: borderWidth.thin,
      };
    case 'ghost':
      return {
        background: 'transparent',
        backgroundPressed: colors.surfaceActive,
        foreground: 'text',
      };
    case 'link':
      return {
        background: 'transparent',
        backgroundPressed: 'transparent',
        foreground: 'primaryText',
        underline: true,
      };
  }
}

/** Control geometry per size — shared by Button, Input, Select and Textarea. */
export interface SizeMetrics {
  height: number;
  paddingHorizontal: number;
  fontSize: 'sm' | 'md' | 'lg';
  gap: number;
  iconSize: number;
}

export function sizeMetrics(size: Size, theme: Theme): SizeMetrics {
  switch (size) {
    case 'sm':
      return {
        height: 36,
        paddingHorizontal: theme.space[3],
        fontSize: 'sm',
        gap: theme.space[1.5],
        iconSize: 16,
      };
    case 'lg':
      return {
        height: 52,
        paddingHorizontal: theme.space[6],
        fontSize: 'lg',
        gap: theme.space[2.5],
        iconSize: 22,
      };
    case 'md':
    default:
      return {
        height: 44,
        paddingHorizontal: theme.space[4],
        fontSize: 'md',
        gap: theme.space[2],
        iconSize: 18,
      };
  }
}
