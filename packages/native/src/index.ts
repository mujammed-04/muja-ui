// Primitives
export { Box, type BoxProps } from './components/Box';
export { Flex, type FlexOwnProps, type FlexProps } from './components/Flex';
export { HStack, Stack, type StackProps } from './components/Stack';
export { Spacer, type SpacerProps } from './components/Spacer';
export { Divider, type DividerProps } from './components/Divider';
export { Text, type TextOwnProps, type TextProps } from './components/Text';
export { Heading, type HeadingLevel, type HeadingProps } from './components/Heading';
export { Icon, type IconProps } from './components/Icon';

// Form
export { Button, type ButtonProps } from './components/Button';
export { IconButton, type IconButtonProps } from './components/IconButton';
export { Input, type InputProps } from './components/Input';
export { Textarea, type TextareaProps } from './components/Textarea';
export { Label, type LabelProps } from './components/Label';
export { FormField, type FormFieldProps } from './components/FormField';
export { Checkbox, type CheckboxProps } from './components/Checkbox';
export { Switch, type SwitchProps } from './components/Switch';
export { Radio, RadioGroup, type RadioGroupProps, type RadioProps } from './components/Radio';
export { Select, type SelectOption, type SelectProps } from './components/Select';

// Feedback
export { Skeleton, type SkeletonProps } from './components/Skeleton';
export { Spinner, type SpinnerProps } from './components/Spinner';
export { Progress, type ProgressProps } from './components/Progress';
export {
  ToastProvider,
  useToast,
  type ToastContextValue,
  type ToastOptions,
  type ToastPlacement,
  type ToastProviderProps,
  type ToastTone,
} from './components/Toast';
export { EmptyState, type EmptyStateProps } from './components/EmptyState';

// Layout & data display
export { Badge, type BadgeProps, type BadgeTone } from './components/Badge';
export { Chip, type ChipProps } from './components/Chip';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from './components/Card';
export { Container, Section, type ContainerProps, type SectionProps } from './components/Container';
export { Screen, type ScreenProps } from './components/Screen';
export { ListRow, type ListRowProps } from './components/ListRow';
export { Avatar, type AvatarProps } from './components/Avatar';
export { Tabs, type TabItem, type TabsProps } from './components/Tabs';
export {
  Accordion,
  Collapse,
  type AccordionItemData,
  type AccordionProps,
  type CollapseProps,
} from './components/Accordion';
export { Calendar, type CalendarProps } from './components/Calendar';
export { Carousel, type CarouselProps } from './components/Carousel';
export { Tooltip, type TooltipProps } from './components/Tooltip';

// Overlays
export {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  type ModalBodyProps,
  type ModalHeaderProps,
  type ModalProps,
} from './components/Modal';
export { BottomSheet, type BottomSheetProps } from './components/BottomSheet';
export { Drawer, type DrawerProps } from './components/Drawer';
export {
  ActionSheet,
  type ActionSheetAction,
  type ActionSheetProps,
} from './components/ActionSheet';

// Theming
export {
  ThemeProvider,
  useColorMode,
  useColorModeValue,
  useTheme,
  type ThemeContextValue,
  type ThemeProviderProps,
} from './theme/ThemeProvider';

// Style system
export { shadowStyle, splitStyleProps, type StyleProps } from './system/styleProps';
export {
  pressFeedback,
  sizeMetrics,
  variantColors,
  type SizeMetrics,
  type VariantColors,
} from './system/variants';
export { adaptThemeToPlatform, iosThemeOverride, isIOS } from './system/platform';
export { nativeFontFamily } from './system/font';

// Date helpers the Calendar is built on — screens need the same whole-day math.
export {
  addDays,
  addMonths,
  dayKey,
  isSameDay,
  monthGrid,
  startOfDay,
  startOfMonth,
} from './internal/date';

// Re-exported theme engine for one-import DX (mirrors @muja-ui/web).
export {
  createTheme,
  darkTheme,
  lightTheme,
  registerIcons,
  type ColorMode,
  type IconDefinition,
  type ResolvedColorMode,
  type Size,
  type Status,
  type Theme,
  type ThemeOverride,
  type Variant,
} from '@muja-ui/core';
