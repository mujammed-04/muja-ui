'use client';

/**
 * Client-only components (they use state/effects). Import from
 * `@muja-ui/web/client` so the main entry stays React Server
 * Components-safe — mirrors `@muja-ui/core/client`.
 */

export { Avatar, type AvatarProps } from './components/Avatar';
export {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  type TabListProps,
  type TabPanelProps,
  type TabProps,
  type TabsProps,
} from './components/Tabs';
export {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  type ModalProps,
} from './components/Modal';
export {
  Popover,
  PopoverContent,
  PopoverTrigger,
  type PopoverContentProps,
  type PopoverProps,
  type PopoverTriggerProps,
} from './components/Popover';
export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuProps,
  type DropdownMenuTriggerProps,
} from './components/DropdownMenu';
export {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  type DrawerProps,
} from './components/Drawer';
export { Calendar, type CalendarProps } from './components/Calendar';
export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselContentProps,
  type CarouselControlProps,
  type CarouselItemProps,
  type CarouselProps,
} from './components/Carousel';
export { Radio, RadioGroup, type RadioGroupProps, type RadioProps } from './components/Radio';
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionContentProps,
  type AccordionItemProps,
  type AccordionProps,
  type AccordionTriggerProps,
} from './components/Accordion';
export {
  ToastProvider,
  useToast,
  type ToastContextValue,
  type ToastOptions,
  type ToastPlacement,
  type ToastProviderProps,
  type ToastTone,
} from './components/Toast';
export { BottomSheet, type BottomSheetProps } from './components/BottomSheet';
