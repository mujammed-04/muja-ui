import type { ElementType, ReactElement } from 'react';
import { Flex, type FlexProps } from './Flex';

export type StackProps<E extends ElementType = 'div'> = FlexProps<E>;

/** Vertical flex layout with a default gap. Use `direction="row"` for rows. */
export function Stack<E extends ElementType = 'div'>(props: StackProps<E>): ReactElement {
  const { direction = 'column', gap = 4, ...rest } = props as StackProps<ElementType>;
  return <Flex direction={direction} gap={gap} {...(rest as FlexProps)} />;
}
