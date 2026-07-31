// Primitives
export { Box, type BoxProps } from './components/Box';
export { Flex, type FlexOwnProps, type FlexProps } from './components/Flex';
export { Stack, type StackProps } from './components/Stack';
export { Spacer } from './components/Spacer';
export { Divider, type DividerProps } from './components/Divider';
export { Text, type TextOwnProps, type TextProps } from './components/Text';
export { Heading, type HeadingLevel, type HeadingProps } from './components/Heading';
export { VisuallyHidden } from './components/VisuallyHidden';
export { Icon, type IconProps } from './components/Icon';

// Form
export { Button, type ButtonProps } from './components/Button';

// SSR theming
export { ThemeStyles, type ThemeStylesProps } from './theme/ThemeStyles';
export { ColorModeScript, type ColorModeScriptProps } from './theme/ColorModeScript';

// Style props
export { splitStyleProps, type StyleProps } from './system/styleProps';

// Re-exported theme engine for one-import DX.
export {
  createTheme,
  cssVar,
  darkTheme,
  lightTheme,
  registerIcons,
  type ColorMode,
  type IconDefinition,
  type Size,
  type Theme,
  type ThemeOverride,
  type Variant,
} from '@muja-ui/core';
export {
  ThemeProvider,
  useColorMode,
  useColorModeValue,
  useTheme,
  type ThemeContextValue,
  type ThemeProviderProps,
} from '@muja-ui/core/client';
