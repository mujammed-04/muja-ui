/** Border width scale in unitless pixels. */
export const borderWidth = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 4,
} as const;

export type BorderWidthToken = keyof typeof borderWidth;
