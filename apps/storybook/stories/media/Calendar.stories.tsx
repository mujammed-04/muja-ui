import { Stack, Text } from '@muja-ui/web';
import { Calendar } from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

/**
 * Single-date calendar on the WAI-ARIA grid pattern: arrow keys move by day and
 * week, PageUp/PageDown by month, Home/End to the week edges. Month and weekday
 * names come from `Intl` — no date library. Client component — import from
 * `@muja-ui/web/client`.
 */
const meta = {
  title: 'Media/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {
    weekStartsOn: {
      control: 'inline-radio',
      options: [0, 1],
      description: '0 = Sunday, 1 = Monday (default)',
    },
    locale: { control: 'select', options: ['en-GB', 'ru-RU', 'kk-KZ'] },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A fixed month so the story looks the same every day. */
const march = new Date(2026, 2, 1);

export const Playground: Story = {
  args: { defaultMonth: march, defaultValue: new Date(2026, 2, 12) },
};

export const WeekStart: Story = {
  name: 'Week start',
  render: () => (
    <div className="story-row" style={{ alignItems: 'flex-start' }}>
      {([1, 0] as const).map((weekStartsOn) => (
        <Stack key={weekStartsOn} gap={2}>
          <Text
            size="sm"
            color="textMuted"
            style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}
          >
            weekStartsOn={weekStartsOn}
          </Text>
          <Calendar defaultMonth={march} weekStartsOn={weekStartsOn} />
        </Stack>
      ))}
    </div>
  ),
};

/** Month and weekday names follow the `locale` prop, or the runtime locale. */
export const Locales: Story = {
  render: () => (
    <div className="story-row" style={{ alignItems: 'flex-start' }}>
      {(['en-GB', 'ru-RU', 'kk-KZ'] as const).map((locale) => (
        <Stack key={locale} gap={2}>
          <Text
            size="sm"
            color="textMuted"
            style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}
          >
            {locale}
          </Text>
          <Calendar defaultMonth={march} locale={locale} />
        </Stack>
      ))}
    </div>
  ),
};

/** `minDate` / `maxDate` disable everything outside the range. */
export const Bounded: Story = {
  args: {
    defaultMonth: march,
    minDate: new Date(2026, 2, 9),
    maxDate: new Date(2026, 2, 20),
  },
};

function ControlledCalendar() {
  const [date, setDate] = useState<Date>(new Date(2026, 2, 12));

  return (
    <Stack gap={3} align="flex-start">
      <Calendar value={date} onChange={setDate} defaultMonth={march} minDate={march} />
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        Selected: {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(date)}
      </Text>
    </Stack>
  );
}

export const Controlled: Story = {
  render: () => <ControlledCalendar />,
};
