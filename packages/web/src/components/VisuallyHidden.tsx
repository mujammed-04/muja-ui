import type { ComponentPropsWithRef, CSSProperties, ReactElement } from 'react';

const hiddenStyle: CSSProperties = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

/** Content available to assistive technology but visually hidden. */
export function VisuallyHidden(props: ComponentPropsWithRef<'span'>): ReactElement {
  const { style, ...rest } = props;
  return <span style={{ ...hiddenStyle, ...style }} {...rest} />;
}
