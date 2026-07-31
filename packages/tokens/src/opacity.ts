/** Named opacity levels (0–1). */
export const opacity = {
  none: 0,
  subtle: 0.08,
  muted: 0.16,
  disabled: 0.45,
  overlay: 0.5,
  strong: 0.8,
  full: 1,
} as const;

export type OpacityToken = keyof typeof opacity;
