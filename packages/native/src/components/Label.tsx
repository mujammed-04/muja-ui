import { forwardRef } from 'react';
import type { Text as RNText } from 'react-native';
import { Text, type TextProps } from './Text';

export interface LabelProps extends TextProps {
  /** Appends a danger-colored asterisk. */
  required?: boolean;
}

/** Field label. Pair with `FormField` to also render help and error text. */
export const Label = forwardRef<RNText, LabelProps>(function Label(
  { required = false, size = 'sm', weight = 'medium', children, ...rest },
  ref,
) {
  return (
    <Text ref={ref} size={size} weight={weight} {...rest}>
      {children}
      {required ? (
        <Text size={size} weight={weight} color="danger" accessibilityLabel="required">
          {' *'}
        </Text>
      ) : null}
    </Text>
  );
});
