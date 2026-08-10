import { forwardRef } from 'react';
import type { View as RNView } from 'react-native';
import { Flex, type FlexProps } from './Flex';

export type StackProps = FlexProps;

/** Vertical flex layout with a default gap. Use `direction="row"` for rows. */
export const Stack = forwardRef<RNView, StackProps>(function Stack(
  { direction = 'column', gap = 4, ...rest },
  ref,
) {
  return <Flex ref={ref} direction={direction} gap={gap} {...rest} />;
});

/** Horizontal convenience wrapper around `Stack`. */
export const HStack = forwardRef<RNView, StackProps>(function HStack(props, ref) {
  return <Stack ref={ref} direction="row" align="center" {...props} />;
});
