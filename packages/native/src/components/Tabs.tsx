import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { useControllableState } from '../internal/useControllableState';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface TabItem<T extends string = string> {
  value: T;
  label: string;
  /** Trailing count, e.g. a number of tickets. */
  badge?: number | string;
}

export interface TabsProps<T extends string = string> {
  items: readonly TabItem<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  /** `underline` for page-level tabs, `segmented` for a pill switch. */
  variant?: 'underline' | 'segmented';
  /** Lets tabs overflow horizontally instead of splitting the width. */
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * Tab bar. Panels are the caller's business — render by the selected value —
 * because native screens usually swap whole lists rather than mounting all
 * panels at once.
 *
 * ```tsx
 * <Tabs items={tabs} value={tab} onChange={setTab} variant="segmented" />
 * ```
 */
export function Tabs<T extends string = string>({
  items,
  value: controlledValue,
  defaultValue,
  onChange,
  variant = 'underline',
  scrollable = false,
  style,
  accessibilityLabel,
}: TabsProps<T>) {
  const theme = useTheme();
  const [value, setValue] = useControllableState<T | undefined>(
    controlledValue,
    defaultValue ?? items[0]?.value,
    onChange as ((value: T | undefined) => void) | undefined,
  );

  const isSegmented = variant === 'segmented';

  const tabs = items.map((item) => {
    const selected = item.value === value;
    return (
      <Pressable
        key={item.value}
        accessibilityRole="tab"
        accessibilityState={{ selected }}
        onPress={() => setValue(item.value)}
        style={{
          flex: scrollable ? undefined : 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme.space[1.5],
          paddingHorizontal: theme.space[3],
          paddingVertical: isSegmented ? theme.space[2] : theme.space[3],
          borderRadius: isSegmented ? theme.radius.md : 0,
          backgroundColor: isSegmented && selected ? theme.colors.surface : 'transparent',
          borderBottomWidth: isSegmented ? 0 : theme.borderWidth.medium,
          borderBottomColor: selected ? theme.colors.primary : 'transparent',
        }}
      >
        <Text
          size="sm"
          weight={selected ? 'semibold' : 'medium'}
          color={selected ? (isSegmented ? 'text' : 'primaryText') : 'textMuted'}
          numberOfLines={1}
        >
          {item.label}
        </Text>
        {item.badge !== undefined ? (
          <Text size="xs" color="textMuted">
            {item.badge}
          </Text>
        ) : null}
      </Pressable>
    );
  });

  const container: ViewStyle = isSegmented
    ? {
        flexDirection: 'row',
        gap: theme.space[1],
        padding: theme.space[1],
        borderRadius: theme.radius.lg,
        backgroundColor: theme.colors.bgMuted,
      }
    : {
        flexDirection: 'row',
        borderBottomWidth: theme.borderWidth.thin,
        borderBottomColor: theme.colors.border,
      };

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        accessibilityRole="tablist"
        accessibilityLabel={accessibilityLabel}
        contentContainerStyle={[container, style]}
      >
        {tabs}
      </ScrollView>
    );
  }

  return (
    <View accessibilityRole="tablist" accessibilityLabel={accessibilityLabel} style={[container, style]}>
      {tabs}
    </View>
  );
}
