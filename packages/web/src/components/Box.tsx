import type { ComponentPropsWithRef, CSSProperties, ElementType, ReactElement } from 'react';
import { splitStyleProps, type StyleProps } from '../system/styleProps';

export type BoxProps<E extends ElementType = 'div'> = StyleProps & {
  /** The element or component to render. Defaults to `div`. */
  as?: E;
  style?: CSSProperties;
} & Omit<ComponentPropsWithRef<E>, keyof StyleProps | 'as' | 'style'>;

/**
 * The base layout primitive. Token-bound style props resolve to CSS variable
 * references applied as inline styles, so Box works in Server Components and
 * re-themes without re-rendering.
 *
 * ```tsx
 * <Box as="section" p={6} bg="surface" radius="lg" shadow="sm" />
 * ```
 */
export function Box<E extends ElementType = 'div'>(props: BoxProps<E>): ReactElement {
  const { as, style, ...restProps } = props as BoxProps<ElementType> &
    Record<string, unknown> & { as?: ElementType };
  const { style: tokenStyle, rest } = splitStyleProps(restProps);
  const Component: ElementType = as ?? 'div';
  return <Component {...rest} style={{ ...tokenStyle, ...style }} />;
}
