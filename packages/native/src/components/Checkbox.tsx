import type { Size } from '@muja-ui/core';
import { CheckIcon, MinusIcon } from '@muja-ui/icons';
import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useControllableState } from '../internal/useControllableState';
import { useTheme } from '../theme/ThemeProvider';
import { Icon } from './Icon';
import { Text } from './Text';

export interface CheckboxProps {
  /** Controlled state. Omit for uncontrolled use with `defaultChecked`. */
  checked?: boolean;
  defaultChecked?: boolean;
  /**
   * Fires with the next state. React Native has no form submission, so unlike
   * the web package this is a value callback rather than a change event.
   */
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  size?: Size;
  invalid?: boolean;
  disabled?: boolean;
  /** Label rendered next to the box; the whole row is the touch target. */
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const boxSize: Record<Size, number> = { sm: 18, md: 22, lg: 26 };

/**
 * Checkbox with an optional inline label.
 *
 * ```tsx
 * <Checkbox checked={agreed} onChange={setAgreed}>I agree</Checkbox>
 * ```
 */
export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  indeterminate = false,
  size = 'md',
  invalid = false,
  disabled = false,
  children,
  style,
}: CheckboxProps) {
  const theme = useTheme();
  const [checked, setChecked] = useControllableState(
    controlledChecked,
    defaultChecked,
    onChange,
  );
  const dimension = boxSize[size];
  const filled = checked || indeterminate;

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{
        checked: indeterminate ? 'mixed' : checked,
        disabled,
      }}
      aria-invalid={invalid || undefined}
      disabled={disabled}
      onPress={() => setChecked(!checked)}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.space[2.5],
          opacity: disabled ? theme.opacity.disabled : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: dimension,
          height: dimension,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme.radius.sm,
          borderWidth: theme.borderWidth.medium,
          borderColor: invalid
            ? theme.colors.danger
            : filled
              ? theme.colors.primary
              : theme.colors.borderStrong,
          backgroundColor: filled ? theme.colors.primary : theme.colors.surface,
        }}
      >
        {filled ? (
          <Icon
            icon={indeterminate ? MinusIcon : CheckIcon}
            size={dimension - 6}
            color="onPrimary"
            strokeWidth={3}
          />
        ) : null}
      </View>
      {children != null ? (
        typeof children === 'string' ? (
          <Text size={size === 'lg' ? 'md' : 'sm'} style={{ flexShrink: 1 }}>
            {children}
          </Text>
        ) : (
          children
        )
      ) : null}
    </Pressable>
  );
}
