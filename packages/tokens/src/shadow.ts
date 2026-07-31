export interface ShadowLayer {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

/**
 * Shadows are stored as structured layers (consumable by React Native) with a
 * precomputed CSS `box-shadow` string for the web.
 */
export interface ShadowValue {
  layers: ShadowLayer[];
  css: string;
}

function makeShadow(layers: ShadowLayer[]): ShadowValue {
  return {
    layers,
    css: layers.map((l) => `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`).join(', '),
  };
}

export const shadow: Record<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl', ShadowValue> = {
  none: { layers: [], css: 'none' },
  xs: makeShadow([{ x: 0, y: 1, blur: 2, spread: 0, color: 'rgba(15, 23, 42, 0.06)' }]),
  sm: makeShadow([
    { x: 0, y: 1, blur: 3, spread: 0, color: 'rgba(15, 23, 42, 0.1)' },
    { x: 0, y: 1, blur: 2, spread: -1, color: 'rgba(15, 23, 42, 0.1)' },
  ]),
  md: makeShadow([
    { x: 0, y: 4, blur: 6, spread: -1, color: 'rgba(15, 23, 42, 0.1)' },
    { x: 0, y: 2, blur: 4, spread: -2, color: 'rgba(15, 23, 42, 0.1)' },
  ]),
  lg: makeShadow([
    { x: 0, y: 10, blur: 15, spread: -3, color: 'rgba(15, 23, 42, 0.1)' },
    { x: 0, y: 4, blur: 6, spread: -4, color: 'rgba(15, 23, 42, 0.1)' },
  ]),
  xl: makeShadow([
    { x: 0, y: 20, blur: 25, spread: -5, color: 'rgba(15, 23, 42, 0.1)' },
    { x: 0, y: 8, blur: 10, spread: -6, color: 'rgba(15, 23, 42, 0.1)' },
  ]),
};

export type ShadowToken = keyof typeof shadow;
