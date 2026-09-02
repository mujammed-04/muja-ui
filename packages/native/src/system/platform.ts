import { createTheme, type Theme, type ThemeOverride } from '@muja-ui/core';
import { Platform } from 'react-native';

/**
 * Read at call time (not module load) so a test can flip the stubbed
 * `Platform.OS` and exercise both branches of a component.
 */
export function isIOS(): boolean {
  return Platform.OS === 'ios';
}

/**
 * Apple HIG metrics layered over the shared tokens on iOS.
 *
 * - Type scale follows the Dynamic Type default sizes: `xs` Footnote 13,
 *   `sm` Subheadline 15, `md` Body 17, `lg` Title 3 20, `xl` Title 2 22,
 *   `2xl` Title 1 28, `3xl` Large Title 34.
 * - Radii follow UIKit: 10 for controls and grouped cells, 12 for large
 *   buttons and cards, 14 for alerts, 20 for sheets.
 *
 * Colors are untouched — brand and dark mode stay the theme's business.
 */
export const iosThemeOverride: ThemeOverride = {
  typography: {
    fontSize: { xs: 13, sm: 15, md: 17, lg: 20, xl: 22, '2xl': 28, '3xl': 34, '4xl': 40 },
  },
  radius: { sm: 6, md: 10, lg: 12, xl: 14, '2xl': 20 },
};

/**
 * Returns the theme the current platform should render: on iOS the HIG
 * metrics above are merged in, elsewhere the theme is returned as-is.
 * `ThemeProvider` applies this automatically (`platformAdaptive`).
 */
export function adaptThemeToPlatform(theme: Theme): Theme {
  return isIOS() ? createTheme(theme, iosThemeOverride) : theme;
}

/**
 * UIKit highlights a pressed control by dimming it rather than recolouring
 * it. Used for every pressable on iOS; Android keeps the pressed colour.
 */
export const IOS_PRESSED_OPACITY = 0.6;

/** Spring for sheets sliding in — critically damped, no overshoot, like UIKit's sheet presentation. */
export const sheetSpring = {
  stiffness: 320,
  damping: 34,
  mass: 1,
  overshootClamping: true,
} as const;
