import { ChevronLeftIcon, ChevronRightIcon } from '@muja-ui/icons';
import { useMemo, useState } from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useControllableState } from '../internal/useControllableState';
import { addDays, addMonths, dayKey, isSameDay, monthGrid, startOfDay } from '../internal/date';
import { useTheme } from '../theme/ThemeProvider';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import { Text } from './Text';

export interface CalendarProps {
  /** Controlled selected date. */
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  /** First visible month; defaults to the selected date's month, else today's. */
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  /** 0 = Sunday, 1 = Monday. Defaults to Monday. */
  weekStartsOn?: 0 | 1;
  /** BCP 47 locale for month and weekday names. Defaults to the runtime locale. */
  locale?: string;
  /**
   * Days to mark with a dot, keyed `YYYY-MM-DD` — e.g. days that already have
   * bookings. The value is the dot's semantic color role.
   */
  markedDates?: Readonly<Record<string, 'primary' | 'accent' | 'success' | 'danger'>>;
  /** Called when the visible month changes — use it to fetch that month's data. */
  onMonthChange?: (month: Date) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * Single-date month grid. Month and weekday names come from `Intl` — no date
 * library, matching the web package.
 *
 * ```tsx
 * <Calendar value={date} onChange={setDate} minDate={new Date()} />
 * ```
 */
export function Calendar({
  value: controlledValue,
  defaultValue,
  onChange,
  defaultMonth,
  minDate,
  maxDate,
  weekStartsOn = 1,
  locale,
  markedDates,
  onMonthChange,
  style,
}: CalendarProps) {
  const theme = useTheme();
  const [selected, setSelected] = useControllableState<Date | undefined>(
    controlledValue,
    defaultValue,
    onChange as ((date: Date | undefined) => void) | undefined,
  );
  const [month, setMonth] = useState(() => defaultMonth ?? selected ?? new Date());

  const today = startOfDay(new Date());
  const days = useMemo(() => monthGrid(month, weekStartsOn), [month, weekStartsOn]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(month),
    [month, locale],
  );

  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    // Any known Sunday works as the anchor for the weekday cycle.
    const anchor = new Date(2024, 0, 7);
    return Array.from({ length: 7 }, (_, index) =>
      formatter.format(addDays(anchor, index + weekStartsOn)),
    );
  }, [locale, weekStartsOn]);

  const goToMonth = (amount: number) => {
    const next = addMonths(month, amount);
    setMonth(next);
    onMonthChange?.(next);
  };

  const isDisabled = (date: Date) =>
    (minDate !== undefined && date < startOfDay(minDate)) ||
    (maxDate !== undefined && date > startOfDay(maxDate));

  return (
    <View style={style}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: theme.space[2],
        }}
      >
        <IconButton
          icon={<Icon icon={ChevronLeftIcon} color="textSecondary" />}
          accessibilityLabel="Previous month"
          size="sm"
          onPress={() => goToMonth(-1)}
        />
        <Text size="md" weight="semibold" accessibilityLiveRegion="polite">
          {monthLabel}
        </Text>
        <IconButton
          icon={<Icon icon={ChevronRightIcon} color="textSecondary" />}
          accessibilityLabel="Next month"
          size="sm"
          onPress={() => goToMonth(1)}
        />
      </View>

      <View style={{ flexDirection: 'row' }}>
        {weekdayLabels.map((label) => (
          <Text
            key={label}
            size="xs"
            weight="medium"
            color="textMuted"
            align="center"
            style={{ flex: 1, paddingVertical: theme.space[1.5] }}
          >
            {label}
          </Text>
        ))}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {days.map((day) => {
          const outside = day.getMonth() !== month.getMonth();
          const isSelected = selected !== undefined && isSameDay(day, selected);
          const isToday = isSameDay(day, today);
          const disabled = isDisabled(day);
          const mark = markedDates?.[dayKey(day)];

          return (
            <Pressable
              key={dayKey(day)}
              accessibilityRole="button"
              accessibilityLabel={new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(day)}
              accessibilityState={{ selected: isSelected, disabled }}
              disabled={disabled}
              onPress={() => setSelected(day)}
              style={{
                width: `${100 / 7}%`,
                aspectRatio: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <View
                style={{
                  width: 34,
                  height: 34,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: theme.radius.full,
                  backgroundColor: isSelected ? theme.colors.primary : 'transparent',
                  borderWidth: !isSelected && isToday ? theme.borderWidth.thin : 0,
                  borderColor: theme.colors.primary,
                  opacity: disabled ? theme.opacity.disabled : outside ? 0.4 : 1,
                }}
              >
                <Text
                  size="sm"
                  weight={isSelected || isToday ? 'semibold' : 'regular'}
                  color={isSelected ? 'onPrimary' : outside ? 'textMuted' : 'text'}
                >
                  {day.getDate()}
                </Text>
              </View>
              {mark && !isSelected ? (
                <View
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: theme.radius.full,
                    backgroundColor: theme.colors[mark],
                  }}
                />
              ) : (
                <View style={{ height: 4 }} />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
