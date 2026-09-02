import type { Size } from '@muja-ui/core';
import { warnOnce } from '@muja-ui/utils';
import { createContext, useContext, type ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useControllableState } from '../internal/useControllableState';
import { isIOS } from '../system/platform';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

interface RadioGroupContextValue {
  value: string | undefined;
  setValue: (value: string) => void;
  size: Size;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: Size;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * Single-choice group. Wrap `Radio` children; selection state lives here.
 *
 * ```tsx
 * <RadioGroup value={role} onChange={setRole} accessibilityLabel="Role">
 *   <Radio value="student">Student</Radio>
 *   <Radio value="organizer">Organizer</Radio>
 * </RadioGroup>
 * ```
 */
export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onChange,
  size = 'md',
  disabled = false,
  orientation = 'vertical',
  children,
  style,
  accessibilityLabel,
}: RadioGroupProps) {
  const theme = useTheme();
  const [value, setValue] = useControllableState<string | undefined>(
    controlledValue,
    defaultValue,
    onChange as ((value: string | undefined) => void) | undefined,
  );

  return (
    <RadioGroupContext.Provider
      value={{ value, setValue: setValue as (value: string) => void, size, disabled }}
    >
      <View
        accessibilityRole="radiogroup"
        accessibilityLabel={accessibilityLabel}
        style={[
          {
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
            gap: theme.space[3],
          },
          style,
        ]}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const boxSize: Record<Size, number> = { sm: 18, md: 22, lg: 26 };

/** One option inside a `RadioGroup`. */
export function Radio({ value, disabled = false, children, style }: RadioProps) {
  const theme = useTheme();
  const group = useContext(RadioGroupContext);

  if (!group) {
    warnOnce('<Radio> must be rendered inside a <RadioGroup>.');
    return null;
  }

  const selected = group.value === value;
  const isDisabled = disabled || group.disabled;
  const dimension = boxSize[group.size];

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled: isDisabled }}
      disabled={isDisabled}
      onPress={() => group.setValue(value)}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.space[2.5],
          opacity: isDisabled ? theme.opacity.disabled : 1,
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
          borderRadius: theme.radius.full,
          borderWidth: theme.borderWidth.medium,
          borderColor: selected ? theme.colors.primary : theme.colors.borderStrong,
          backgroundColor: theme.colors.surface,
        }}
      >
        {selected ? (
          <View
            style={{
              width: dimension / 2,
              height: dimension / 2,
              borderRadius: theme.radius.full,
              backgroundColor: theme.colors.primary,
            }}
          />
        ) : null}
      </View>
      {children != null ? (
        typeof children === 'string' ? (
          <Text size={group.size === 'lg' || isIOS() ? 'md' : 'sm'} style={{ flexShrink: 1 }}>
            {children}
          </Text>
        ) : (
          children
        )
      ) : null}
    </Pressable>
  );
}
