import { ChevronDownIcon } from '@muja-ui/icons';
import { useState, type ReactNode } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useControllableState } from '../internal/useControllableState';
import { useTheme } from '../theme/ThemeProvider';
import { Icon } from './Icon';
import { Text } from './Text';

export interface AccordionItemData {
  value: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: readonly AccordionItemData[];
  /** Controlled open values. */
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  /** Only one section open at a time. */
  single?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * Collapsible sections.
 *
 * ```tsx
 * <Accordion single items={[{ value: 'rules', title: 'Rules', content: <Text>…</Text> }]} />
 * ```
 */
export function Accordion({
  items,
  value: controlledValue,
  defaultValue = [],
  onChange,
  single = false,
  style,
}: AccordionProps) {
  const theme = useTheme();
  const [open, setOpen] = useControllableState<string[]>(controlledValue, defaultValue, onChange);

  const toggle = (itemValue: string) => {
    const isOpen = open.includes(itemValue);
    if (single) {
      setOpen(isOpen ? [] : [itemValue]);
      return;
    }
    setOpen(isOpen ? open.filter((entry) => entry !== itemValue) : [...open, itemValue]);
  };

  return (
    <View style={style}>
      {items.map((item, index) => {
        const isOpen = open.includes(item.value);
        return (
          <View
            key={item.value}
            style={{
              borderTopWidth: index === 0 ? 0 : theme.borderWidth.thin,
              borderTopColor: theme.colors.border,
            }}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: isOpen }}
              onPress={() => toggle(item.value)}
              style={({ pressed }) => ({
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: theme.space[3],
                paddingVertical: theme.space[4],
                backgroundColor: pressed ? theme.colors.surfaceActive : 'transparent',
              })}
            >
              <Text size="md" weight="medium" style={{ flex: 1 }}>
                {item.title}
              </Text>
              <View style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}>
                <Icon icon={ChevronDownIcon} size={18} color="textSecondary" />
              </View>
            </Pressable>
            {isOpen ? <View style={{ paddingBottom: theme.space[4] }}>{item.content}</View> : null}
          </View>
        );
      })}
    </View>
  );
}

export interface CollapseProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** A single collapsible block, for when there is no list to group. */
export function Collapse({ title, defaultOpen = false, children, style }: CollapseProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Accordion
      items={[{ value: 'only', title, content: children }]}
      value={open ? ['only'] : []}
      onChange={(next) => setOpen(next.length > 0)}
      style={style}
    />
  );
}
