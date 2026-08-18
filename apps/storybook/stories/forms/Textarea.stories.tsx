import { Label, Stack, Textarea } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col } from '../_layout';

/** Semantic `<textarea>` sharing the Input field styling. */
const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'What is this event about?', rows: 4 },
  argTypes: {
    resize: { control: 'inline-radio', options: ['none', 'vertical', 'horizontal', 'both'] },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 420 }}>
      <Textarea {...args} fullWidth />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <Col>
      <Textarea placeholder="Default" rows={3} />
      <Textarea defaultValue="Weekly club meeting in the Red Hall." rows={3} />
      <Textarea placeholder="Disabled" rows={3} disabled />
      <Textarea placeholder="Invalid" rows={3} invalid />
      <Textarea placeholder="resize='none'" rows={3} resize="none" />
    </Col>
  ),
};

export const WithLabel: Story = {
  name: 'With label',
  render: () => (
    <Stack gap={2} maxW={420}>
      <Label htmlFor="description">Description</Label>
      <Textarea id="description" fullWidth rows={5} placeholder="Describe the event" />
    </Stack>
  ),
};
