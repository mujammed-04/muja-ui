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
export { IconButton, type IconButtonProps } from './components/IconButton';
export { Input, type InputProps } from './components/Input';
export { Textarea, type TextareaProps } from './components/Textarea';
export { Label, type LabelProps } from './components/Label';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Switch, type SwitchProps } from './components/Switch';
export { Select, type SelectProps } from './components/Select';

// Feedback
export { Skeleton, type SkeletonProps } from './components/Skeleton';
export { Spinner, type SpinnerProps } from './components/Spinner';
export { Progress, type ProgressProps } from './components/Progress';

// Layout & data display
export { Badge, type BadgeProps, type BadgeTone } from './components/Badge';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
  type CardTitleProps,
} from './components/Card';
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
  type TableProps,
} from './components/Table';
export { Tooltip, type TooltipProps } from './components/Tooltip';
export { ScrollArea, type ScrollAreaProps } from './components/ScrollArea';

// Client-only components (Avatar, Tabs, Modal, Popover, DropdownMenu, Drawer,
// Calendar, Carousel) live in `@muja-ui/web/client` so this entry stays React
// Server Components-safe.

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
