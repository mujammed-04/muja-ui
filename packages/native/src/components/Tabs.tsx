import { ScrollView, View, type StyleProp, type ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { useControllableState } from '../internal/useControllableState';
import { isIOS } from '../system/platform';
import { shadowStyle } from '../system/styleProps';
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
 * On iOS `segmented` is drawn as a `UISegmentedControl`: a 2pt inset track,
 * the selected segment lifted on a white pill with a soft shadow, 13pt labels.
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
  const iosSegmented = isSegmented && isIOS();

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
          minHeight: iosSegmented ? 28 : undefined,
          paddingHorizontal: theme.space[3],
          paddingVertical: iosSegmented
            ? theme.space[1]
            : isSegmented
              ? theme.space[2]
              : theme.space[3],
          borderRadius: iosSegmented ? theme.radius.md - 2 : isSegmented ? theme.radius.md : 0,
          backgroundColor: isSegmented && selected ? theme.colors.surface : 'transparent',
          borderBottomWidth: isSegmented ? 0 : theme.borderWidth.medium,
          borderBottomColor: selected ? theme.colors.primary : 'transparent',
          ...(iosSegmented && selected ? shadowStyle(theme.shadow.sm) : null),
        }}
      >
        <Text
          size={iosSegmented ? 'xs' : 'sm'}
          // An explicit line box: RN's implicit ~1.2em leaves no room for the
          // descenders of a face whose metrics run taller (the app sets a
          // display font on some rows), and it clips rather than overflowing.
          leading="normal"
          weight={selected ? 'semibold' : 'medium'}
          color={
            selected ? (isSegmented ? 'text' : 'primaryText') : iosSegmented ? 'text' : 'textMuted'
          }
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

  const container: ViewStyle = iosSegmented
    ? {
        flexDirection: 'row',
        padding: theme.space[0.5],
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.bgMuted,
      }
    : isSegmented
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
        // `flexGrow: 0` keeps the scroller hugging the row's own height: a
        // horizontal ScrollView otherwise stretches to fill its parent, and any
        // height the caller's style implies gets applied to the content box.
        style={{ flexGrow: 0 }}
        contentContainerStyle={[container, style]}
      >
        {tabs}
      </ScrollView>
    );
  }

  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      style={[container, style]}
    >
      {tabs}
    </View>
  );
}
