/** Test-only stand-in for `react-native-svg`. */
import type { ReactNode } from 'react';

type AnyProps = Record<string, unknown>;

/**
 * Maps the RN accessibility props the kit sets onto their ARIA equivalents, so
 * tests can query an icon by role and label (see react-native-stub.tsx).
 */
function svgProps({
  accessibilityRole,
  accessibilityLabel,
  accessibilityElementsHidden,
  importantForAccessibility: _importantForAccessibility,
  ...rest
}: AnyProps): AnyProps {
  const props: AnyProps = { ...rest };
  if (accessibilityRole) props.role = accessibilityRole === 'image' ? 'img' : accessibilityRole;
  if (accessibilityLabel) props['aria-label'] = accessibilityLabel;
  if (accessibilityElementsHidden) props['aria-hidden'] = 'true';
  return props;
}

const Svg = ({ children, ...rest }: AnyProps & { children?: ReactNode }) => (
  <svg data-rn="Svg" {...svgProps(rest)}>
    {children}
  </svg>
);

export const Path = (props: AnyProps) => <path data-rn="Path" {...props} />;
export const Circle = (props: AnyProps) => <circle data-rn="Circle" {...props} />;
export const Rect = (props: AnyProps) => <rect data-rn="Rect" {...props} />;
export const G = ({ children, ...rest }: AnyProps & { children?: ReactNode }) => (
  <g data-rn="G" {...rest}>
    {children}
  </g>
);

export default Svg;
