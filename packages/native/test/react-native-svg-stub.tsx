/** Test-only stand-in for `react-native-svg`. */
import type { ReactNode } from 'react';

type AnyProps = Record<string, unknown>;

const Svg = ({ children, ...rest }: AnyProps & { children?: ReactNode }) => (
  <svg data-rn="Svg" {...(rest as AnyProps)}>
    {children}
  </svg>
);

export const Path = (props: AnyProps) => <path data-rn="Path" {...props} />;
export const Circle = (props: AnyProps) => <circle data-rn="Circle" {...props} />;
export const Rect = (props: AnyProps) => <rect data-rn="Rect" {...props} />;
export const G = ({ children, ...rest }: AnyProps & { children?: ReactNode }) => (
  <g data-rn="G" {...(rest as AnyProps)}>
    {children}
  </g>
);

export default Svg;
