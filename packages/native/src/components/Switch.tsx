import type { Size } from '@muja-ui/core';
import type { ReactNode } from 'react';
import { Pressable, Switch as RNSwitch, View, type StyleProp, type ViewStyle } from 'react-native';
import { useControllableState } from '../internal/useControllableState';
import { isIOS } from '../system/platform';
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

/** UISwitch is a fixed 51×31; `sm` scales it down, `lg` stays native size. */
const iosScale: Record<Size, number> = { sm: 0.8, md: 1, lg: 1 };

/**
 * Toggle switch.
 *
 * On iOS this is the real `UISwitch` (through React Native's `Switch`), tinted
 * with the theme's primary colour — native motion, haptics and VoiceOver
 * semantics for free, as the HIG asks. Elsewhere it is drawn from primitives so
 * it follows the theme's metrics on both platforms.
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
  const [checked, setChecked] = useControllableState(controlledChecked, defaultChecked, onChange);

  const row: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.space[3],
  };

  if (isIOS()) {
    const label = typeof children === 'string' ? children : undefined;
    const scale = iosScale[size];
    return (
      <View style={[row, style]}>
        {children != null ? (
          label !== undefined ? (
            <Text
              size="md"
              style={{ flexShrink: 1, opacity: disabled ? theme.opacity.disabled : 1 }}
            >
              {label}
            </Text>
          ) : (
            children
          )
        ) : null}
        <RNSwitch
          value={checked}
          onValueChange={setChecked}
          disabled={disabled}
          accessibilityLabel={label}
          trackColor={{ false: theme.colors.secondaryActive, true: theme.colors.primary }}
          thumbColor={theme.colors.onPrimary}
          ios_backgroundColor={theme.colors.secondaryActive}
          style={scale !== 1 ? { transform: [{ scale }] } : undefined}
        />
      </View>
    );
  }

  const metrics = track[size];
  const inset = (metrics.height - metrics.thumb) / 2;

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={() => setChecked(!checked)}
      style={[row, { opacity: disabled ? theme.opacity.disabled : 1 }, style]}
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
