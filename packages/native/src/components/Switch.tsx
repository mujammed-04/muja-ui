import type { Size } from '@muja-ui/core';
import type { ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useControllableState } from '../internal/useControllableState';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: Size;
  disabled?: boolean;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const track: Record<Size, { width: number; height: number; thumb: number }> = {
  sm: { width: 36, height: 20, thumb: 16 },
  md: { width: 44, height: 26, thumb: 22 },
  lg: { width: 52, height: 32, thumb: 28 },
};

/**
 * Toggle switch. Built from primitives rather than RN's `Switch` so it follows
 * the theme on both platforms (RN's own switch only takes raw colors and
 * renders with platform-specific metrics).
 *
 * ```tsx
 * <Switch checked={enabled} onChange={setEnabled}>Notifications</Switch>
 * ```
 */
export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  size = 'md',
  disabled = false,
  children,
  style,
}: SwitchProps) {
  const theme = useTheme();
  const [checked, setChecked] = useControllableState(
    controlledChecked,
    defaultChecked,
    onChange,
  );
  const metrics = track[size];
  const inset = (metrics.height - metrics.thumb) / 2;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => setChecked(!checked)}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: theme.space[3],
          opacity: disabled ? theme.opacity.disabled : 1,
        },
        style,
      ]}
    >
      {children != null ? (
        typeof children === 'string' ? (
          <Text size="sm" style={{ flexShrink: 1 }}>
            {children}
          </Text>
        ) : (
          children
        )
      ) : null}
      <View
        style={{
          width: metrics.width,
          height: metrics.height,
          borderRadius: theme.radius.full,
          padding: inset,
          justifyContent: 'center',
          backgroundColor: checked ? theme.colors.primary : theme.colors.secondaryActive,
        }}
      >
        <View
          style={{
            width: metrics.thumb,
            height: metrics.thumb,
            borderRadius: theme.radius.full,
            backgroundColor: theme.colors.surface,
            transform: [{ translateX: checked ? metrics.width - metrics.thumb - inset * 2 : 0 }],
          }}
        />
      </View>
    </Pressable>
  );
}
