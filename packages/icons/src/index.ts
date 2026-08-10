import type { IconDefinition } from '@muja-ui/core';

/**
 * Stroke-style icons on a 24×24 grid (2px stroke, round caps/joins).
 * Import individual icons for full tree-shaking, or register `allIcons`
 * once via `registerIcons(allIcons)` to enable string lookup.
 */
function defineIcon(name: string, paths: readonly string[]): IconDefinition {
  return { name, viewBox: '0 0 24 24', paths };
}

export const CheckIcon = defineIcon('check', ['M20 6 9 17l-5-5']);

export const XIcon = defineIcon('x', ['M18 6 6 18', 'M6 6l12 12']);

export const ChevronDownIcon = defineIcon('chevron-down', ['m6 9 6 6 6-6']);

export const ChevronUpIcon = defineIcon('chevron-up', ['m18 15-6-6-6 6']);

export const ChevronLeftIcon = defineIcon('chevron-left', ['m15 18-6-6 6-6']);

export const ChevronRightIcon = defineIcon('chevron-right', ['m9 18 6-6-6-6']);

export const PlusIcon = defineIcon('plus', ['M5 12h14', 'M12 5v14']);

export const MinusIcon = defineIcon('minus', ['M5 12h14']);

export const SearchIcon = defineIcon('search', [
  'M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16',
  'm21 21-4.35-4.35',
]);

export const InfoIcon = defineIcon('info', [
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20',
  'M12 16v-4',
  'M12 8h.01',
]);

export const AlertCircleIcon = defineIcon('alert-circle', [
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20',
  'M12 8v4',
  'M12 16h.01',
]);

export const AlertTriangleIcon = defineIcon('alert-triangle', [
  'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z',
  'M12 9v4',
  'M12 17h.01',
]);

export const SunIcon = defineIcon('sun', [
  'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  'M12 2v2',
  'M12 20v2',
  'm4.93 4.93 1.41 1.41',
  'm17.66 17.66 1.41 1.41',
  'M2 12h2',
  'M20 12h2',
  'm6.34 17.66-1.41 1.41',
  'm19.07 4.93-1.41 1.41',
]);

export const MoonIcon = defineIcon('moon', ['M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z']);

export const LoaderIcon = defineIcon('loader', ['M21 12a9 9 0 1 1-6.22-8.56']);

/* --- Navigation & chrome --- */

export const ArrowLeftIcon = defineIcon('arrow-left', ['M19 12H5', 'm12 19-7-7 7-7']);

export const ArrowRightIcon = defineIcon('arrow-right', ['M5 12h14', 'm12 5 7 7-7 7']);

export const ArrowUpRightIcon = defineIcon('arrow-up-right', ['M7 17 17 7', 'M7 7h10v10']);

export const HomeIcon = defineIcon('home', [
  'm3 10.5 9-7 9 7V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z',
  'M9 21v-7h6v7',
]);

export const MenuIcon = defineIcon('menu', ['M4 6h16', 'M4 12h16', 'M4 18h16']);

export const MoreVerticalIcon = defineIcon('more-vertical', [
  'M12 5.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1',
  'M12 11.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1',
  'M12 17.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1',
]);

export const SettingsIcon = defineIcon('settings', [
  'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  'M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.7 15a1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.7a1.7 1.7 0 0 0 1.03-1.56V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15.1 4.7a1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.3 9c.2.6.75 1.02 1.4 1.03H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z',
]);

export const LogOutIcon = defineIcon('log-out', [
  'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4',
  'm16 17 5-5-5-5',
  'M21 12H9',
]);

export const ExternalLinkIcon = defineIcon('external-link', [
  'M15 3h6v6',
  'M10 14 21 3',
  'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6',
]);

export const RefreshIcon = defineIcon('refresh', [
  'M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.36-2.64L3 16',
  'M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.36 2.64L21 8',
  'M21 3v5h-5',
  'M3 21v-5h5',
]);

/* --- Domain: people, events, places --- */

export const UserIcon = defineIcon('user', [
  'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  'M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1',
]);

export const UsersIcon = defineIcon('users', [
  'M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  'M2 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1',
  'M16 3.5a4 4 0 0 1 0 7.5',
  'M18 14a6 6 0 0 1 4 5.6V21',
]);

export const CalendarIcon = defineIcon('calendar', [
  'M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z',
  'M4 10h16',
  'M8 3v4',
  'M16 3v4',
]);

export const ClockIcon = defineIcon('clock', [
  'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18',
  'M12 7v5l3.5 2',
]);

export const MapPinIcon = defineIcon('map-pin', [
  'M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11',
  'M12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5',
]);

export const BuildingIcon = defineIcon('building', [
  'M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17',
  'M3 21h18',
  'M9 7h2',
  'M13 7h2',
  'M9 11h2',
  'M13 11h2',
  'M10 21v-5h4v5',
]);

export const TicketIcon = defineIcon('ticket', [
  'M3 9V7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a3 3 0 0 0 0 6v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a3 3 0 0 0 0-6',
  'M13 6v12',
]);

export const QrCodeIcon = defineIcon('qr-code', [
  'M4 4h6v6H4z',
  'M14 4h6v6h-6z',
  'M4 14h6v6H4z',
  'M14 14h2v2h-2z',
  'M18 14h2v2h-2z',
  'M14 18h2v2h-2z',
  'M18 18h2v2h-2z',
]);

export const BellIcon = defineIcon('bell', [
  'M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6',
  'M10 19a2 2 0 0 0 4 0',
]);

export const StarIcon = defineIcon('star', [
  'm12 3.5 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8z',
]);

export const HeartIcon = defineIcon('heart', [
  'M12 20s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5c0 5.1-7 9.5-7 9.5',
]);

export const AwardIcon = defineIcon('award', [
  'M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10',
  'm9 13-1.5 8L12 18.5 16.5 21 15 13',
]);

export const BookIcon = defineIcon('book', [
  'M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z',
  'M8 3v18',
]);

export const GraduationCapIcon = defineIcon('graduation-cap', [
  'm2 9 10-5 10 5-10 5z',
  'M6 11.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5',
]);

/* --- Data & analytics --- */

export const TrendingUpIcon = defineIcon('trending-up', ['m3 17 6-6 4 4 8-8', 'M15 7h6v6']);

export const TrendingDownIcon = defineIcon('trending-down', ['m3 7 6 6 4-4 8 8', 'M15 17h6v-6']);

export const BarChartIcon = defineIcon('bar-chart', [
  'M4 20V10',
  'M10 20V4',
  'M16 20v-7',
  'M22 20H2',
]);

export const PieChartIcon = defineIcon('pie-chart', [
  'M12 3a9 9 0 1 0 9 9h-9z',
  'M12 3a9 9 0 0 1 9 9',
]);

export const FilterIcon = defineIcon('filter', ['M3 5h18l-7 8v6l-4-2v-4z']);

export const ListIcon = defineIcon('list', [
  'M8 6h13',
  'M8 12h13',
  'M8 18h13',
  'M3.5 6h.01',
  'M3.5 12h.01',
  'M3.5 18h.01',
]);

/* --- Status & actions --- */

export const CheckCircleIcon = defineIcon('check-circle', [
  'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18',
  'm8 12 2.5 2.5L16 9',
]);

export const XCircleIcon = defineIcon('x-circle', [
  'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18',
  'm9 9 6 6',
  'm15 9-6 6',
]);

export const EditIcon = defineIcon('edit', [
  'M12 20h9',
  'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z',
]);

export const TrashIcon = defineIcon('trash', [
  'M4 7h16',
  'M9 7V4h6v3',
  'M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7',
  'M10 11v6',
  'M14 11v6',
]);

export const ShareIcon = defineIcon('share', [
  'M12 3v12',
  'm8 7 4-4 4 4',
  'M6 13v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6',
]);

export const DownloadIcon = defineIcon('download', [
  'M12 3v12',
  'm8 11 4 4 4-4',
  'M5 20h14',
]);

export const CameraIcon = defineIcon('camera', [
  'M4 8a1 1 0 0 1 1-1h2l1.5-2h7L17 7h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z',
  'M12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7',
]);

export const ImageIcon = defineIcon('image', [
  'M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z',
  'M8.5 9.5a1 1 0 1 0 0 .01',
  'm4 16 4.5-4.5L14 17',
  'm14 14 2.5-2.5L20 15',
]);

export const EyeIcon = defineIcon('eye', [
  'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6',
  'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
]);

export const EyeOffIcon = defineIcon('eye-off', [
  'M4 4l16 16',
  'M9.9 5.2A9.5 9.5 0 0 1 12 5c6.4 0 10 6 10 6a17 17 0 0 1-2.7 3.3',
  'M6.5 7.3A16.6 16.6 0 0 0 2 11s3.6 6 10 6c1 0 1.9-.1 2.7-.4',
  'M9.9 9.9a3 3 0 0 0 4.2 4.2',
]);

export const LockIcon = defineIcon('lock', [
  'M5 11a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z',
  'M8 10V7a4 4 0 0 1 8 0v3',
]);

export const MailIcon = defineIcon('mail', [
  'M3 6a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z',
  'm3 7 9 6 9-6',
]);

export const PhoneIcon = defineIcon('phone', [
  'M7 3h3l1.5 4-2 1.5a11 11 0 0 0 6 6L17 12.5 21 14v3a2 2 0 0 1-2.2 2A17 17 0 0 1 5 5.2 2 2 0 0 1 7 3',
]);

export const CreditCardIcon = defineIcon('credit-card', [
  'M3 7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z',
  'M3 10h18',
]);

export const FileTextIcon = defineIcon('file-text', [
  'M6 3h8l5 5v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1',
  'M14 3v5h5',
  'M9 13h6',
  'M9 17h6',
]);

export const DeleteIcon = defineIcon('delete', [
  'M9 5h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9L3 12z',
  'm12 9 4 6',
  'm16 9-4 6',
]);

export const FingerprintIcon = defineIcon('fingerprint', [
  'M12 4a8 8 0 0 0-8 8',
  'M20 12a8 8 0 0 0-8-8',
  'M7 12a5 5 0 0 1 10 0v3',
  'M10 12a2 2 0 0 1 4 0v5',
  'M6.5 16.5A8 8 0 0 0 9 21',
  'M17.5 16.5A8 8 0 0 1 15 21',
]);

export const ScanFaceIcon = defineIcon('scan-face', [
  'M4 8V5a1 1 0 0 1 1-1h3',
  'M16 4h3a1 1 0 0 1 1 1v3',
  'M20 16v3a1 1 0 0 1-1 1h-3',
  'M8 20H5a1 1 0 0 1-1-1v-3',
  'M9 10h.01',
  'M15 10h.01',
  'M9.5 14.5a3.5 3.5 0 0 0 5 0',
]);

export const allIcons: readonly IconDefinition[] = [
  CheckIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  SearchIcon,
  InfoIcon,
  AlertCircleIcon,
  AlertTriangleIcon,
  SunIcon,
  MoonIcon,
  LoaderIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  HomeIcon,
  MenuIcon,
  MoreVerticalIcon,
  SettingsIcon,
  LogOutIcon,
  ExternalLinkIcon,
  RefreshIcon,
  UserIcon,
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  BuildingIcon,
  TicketIcon,
  QrCodeIcon,
  BellIcon,
  StarIcon,
  HeartIcon,
  AwardIcon,
  BookIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  BarChartIcon,
  PieChartIcon,
  FilterIcon,
  ListIcon,
  CheckCircleIcon,
  XCircleIcon,
  EditIcon,
  TrashIcon,
  ShareIcon,
  DownloadIcon,
  CameraIcon,
  ImageIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  CreditCardIcon,
  FileTextIcon,
  DeleteIcon,
  FingerprintIcon,
  ScanFaceIcon,
];
