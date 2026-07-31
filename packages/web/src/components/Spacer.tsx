import type { ComponentPropsWithRef, ReactElement } from 'react';

/** Fills available space inside a Flex/Stack row. Purely presentational. */
export function Spacer(props: ComponentPropsWithRef<'div'>): ReactElement {
  const { style, ...rest } = props;
  return (
    <div aria-hidden="true" style={{ flex: '1 1 0%', alignSelf: 'stretch', ...style }} {...rest} />
  );
}
