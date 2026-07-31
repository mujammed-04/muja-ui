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
];
