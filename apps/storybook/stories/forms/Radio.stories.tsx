import { Radio, RadioGroup } from '@muja-ui/web/client';
import { Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

/**
 * `RadioGroup` owns the value and the shared `name`; arrow-key movement comes
 * from the browser's native radio behaviour. Client component — import from
 * `@muja-ui/web/client`.
 */
const meta = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ['autodocs'],
  args: { 'aria-label': 'Role', defaultValue: 'student' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    onChange: { action: 'change' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="student">Student</Radio>
      <Radio value="organizer">Organizer</Radio>
      <Radio value="staff">Staff</Radio>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup aria-label="Semester" orientation="horizontal" defaultValue="fall">
      <Radio value="fall">Fall</Radio>
      <Radio value="spring">Spring</Radio>
      <Radio value="summer">Summer</Radio>
    </RadioGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap={6}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <RadioGroup
          key={size}
          aria-label={`Size ${size}`}
          size={size}
          defaultValue="a"
          orientation="horizontal"
        >
          <Radio value="a">Option A</Radio>
          <Radio value="b">Option B</Radio>
        </RadioGroup>
      ))}
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack gap={6}>
      <RadioGroup aria-label="Whole group disabled" defaultValue="a" disabled>
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
      </RadioGroup>
      <RadioGroup aria-label="One option disabled" defaultValue="a">
        <Radio value="a">Available</Radio>
        <Radio value="b" disabled>
          Fully booked
        </Radio>
      </RadioGroup>
    </Stack>
  ),
};

function ControlledDemo() {
  const [value, setValue] = useState('90');

  return (
    <Stack gap={3}>
      <RadioGroup aria-label="Duration" value={value} onChange={setValue} orientation="horizontal">
        <Radio value="30">30 min</Radio>
        <Radio value="60">1 hour</Radio>
        <Radio value="90">1.5 hours</Radio>
      </RadioGroup>
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        Selected: {value} minutes
      </Text>
    </Stack>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
