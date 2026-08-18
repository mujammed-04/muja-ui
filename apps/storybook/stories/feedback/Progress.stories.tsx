import { Progress, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Labelled } from '../_layout';

/**
 * Determinate or indeterminate `role="progressbar"`. Always give it an
 * accessible name — the bar alone says nothing about what is progressing.
 */
const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { value: 64, 'aria-label': 'Upload progress', size: 'md' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Progress {...args} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={4} maxW={420}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Labelled key={size} label={size}>
          <div style={{ flex: 1 }}>
            <Progress value={45} size={size} aria-label={`Progress ${size}`} />
          </div>
        </Labelled>
      ))}
    </Stack>
  ),
};

export const Values: Story = {
  render: () => (
    <Stack gap={4} maxW={420}>
      {[0, 25, 60, 100].map((value) => (
        <Labelled key={value} label={`${value}%`}>
          <div style={{ flex: 1 }}>
            <Progress value={value} aria-label={`${value} percent`} />
          </div>
        </Labelled>
      ))}
    </Stack>
  ),
};

/** Omit `value` when the duration is unknown. */
export const Indeterminate: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Progress aria-label="Syncing" />
    </div>
  ),
};

/** A custom `max` — e.g. 7 of 12 credits. */
export const CustomMax: Story = {
  name: 'Custom max',
  render: () => (
    <Stack gap={2} maxW={420}>
      <Text size="sm" weight="medium" style={{ margin: 0 }}>
        Credits earned: 21 / 36
      </Text>
      <Progress value={21} max={36} aria-label="Credits earned" />
    </Stack>
  ),
};
