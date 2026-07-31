import {
  borderWidth,
  breakpoints,
  darkColors,
  duration,
  easing,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lightColors,
  lineHeight,
  opacity,
  radius,
  shadow,
  space,
  zIndex,
} from '@muja-ui/tokens';
import type { Theme } from './types';

const baseTokens: Omit<Theme, 'name' | 'colors'> = {
  typography: { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing },
  space,
  radius,
  borderWidth,
  shadow,
  opacity,
  breakpoints,
  zIndex,
  motion: { duration, easing },
};

export const lightTheme: Theme = {
  name: 'light',
  colors: lightColors,
  ...baseTokens,
};

export const darkTheme: Theme = {
  name: 'dark',
  colors: darkColors,
  ...baseTokens,
};
