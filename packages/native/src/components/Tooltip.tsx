import { useState, type ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { shadowStyle } from '../system/styleProps';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface TooltipProps {
  /** Tooltip copy. Keep it short — there is no room for a paragraph. */
  label: string;
  /** Side the bubble appears on. Defaults to above the trigger. */
  placement?: 'top' | 'bottom';
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Long-press hint. Phones have no hover, so the trigger reveals the bubble on
 * long press and hides it on release; the label is also the trigger's
 * accessibility hint so screen-reader users get it without the gesture.
 *
 * ```tsx
 * <Tooltip label="Points earned this semester">
 *   <Icon icon={InfoIcon} />
 * </Tooltip>
 * ```
 */
export function Tooltip({ label, placement = 'top', children, style }: TooltipProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View style={[{ position: 'relative' }, style]}>
      <Pressable
        accessibilityHint={label}
        delayLongPress={200}
        onLongPress={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
      >
        {children}
      </Pressable>
      {visible ? (
        <View
          accessibilityRole="alert"
          pointerEvents="none"
          style={{
            position: 'absolute',
            [placement === 'top' ? 'bottom' : 'top']: '100%',
            left: 0,
            marginVertical: theme.space[1.5],
            maxWidth: 240,
            paddingHorizontal: theme.space[2.5],
            paddingVertical: theme.space[1.5],
            borderRadius: theme.radius.md,
            backgroundColor: theme.colors.text,
            ...shadowStyle(theme.shadow.md),
          }}
        >
          <Text size="xs" style={{ color: theme.colors.textInverse }}>
            {label}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
