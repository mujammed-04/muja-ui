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
