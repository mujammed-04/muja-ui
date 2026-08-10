import type { FontSizeToken } from '@muja-ui/tokens';
import { forwardRef } from 'react';
import type { Text as RNText } from 'react-native';
import { Text, type TextProps } from './Text';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingProps extends Omit<TextProps, 'accessibilityRole'> {
  /** Semantic heading level — sets the screen-reader heading role and default size. */
  level?: HeadingLevel;
}

const defaultSize: Record<HeadingLevel, FontSizeToken> = {
  1: '3xl',
  2: '2xl',
  3: 'xl',
  4: 'lg',
  5: 'md',
  6: 'sm',
};

/**
 * A heading with the correct accessibility role. Sizes follow the level unless
 * `size` overrides them.
 *
 * ```tsx
 * <Heading level={2}>Upcoming events</Heading>
 * ```
 */
export const Heading = forwardRef<RNText, HeadingProps>(function Heading(
  { level = 2, size, weight = 'semibold', leading = 'tight', ...rest },
  ref,
) {
  return (
    <Text
      ref={ref}
      accessibilityRole="header"
      aria-level={level}
      size={size ?? defaultSize[level]}
      weight={weight}
      leading={leading}
      {...rest}
    />
  );
});
