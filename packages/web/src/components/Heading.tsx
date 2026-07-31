import type { FontSizeToken } from '@muja-ui/tokens';
import type { ElementType, ReactElement } from 'react';
import { Text, type TextProps } from './Text';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const defaultSizes: Record<HeadingLevel, FontSizeToken> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'md',
};

export type HeadingProps<E extends ElementType = 'h2'> = TextProps<E> & {
  /** Semantic heading level; also picks the default size. */
  level?: HeadingLevel;
};

/**
 * Semantic heading. `level` controls the rendered `<h1>`–`<h6>` and the
 * default size; both can be overridden independently (`as`, `size`).
 */
export function Heading<E extends ElementType = 'h2'>(props: HeadingProps<E>): ReactElement {
  const {
    level = 2,
    as,
    size,
    weight = 'semibold',
    leading = 'tight',
    tracking = 'tight',
    ...rest
  } = props as HeadingProps<ElementType>;

  return (
    <Text
      as={as ?? (`h${level}` as ElementType)}
      size={size ?? defaultSizes[level]}
      weight={weight}
      leading={leading}
      tracking={tracking}
      {...(rest as TextProps)}
    />
  );
}
