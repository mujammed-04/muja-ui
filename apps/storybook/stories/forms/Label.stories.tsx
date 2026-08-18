import { Input, Label, Stack } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Semantic `<label>`. The `required` marker is decorative (`aria-hidden`) —
 * put the real `required` on the control.
 */
const meta = {
  title: 'Forms/Label',
  component: Label,
  tags: ['autodocs'],
  args: { children: 'Room' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true, children: 'University email' },
};

export const WithAField: Story = {
  name: 'With a field',
  render: () => (
    <Stack gap={2} maxW={320}>
      <Label htmlFor="room" required>
        Room
      </Label>
      <Input id="room" fullWidth placeholder="A101" required />
    </Stack>
  ),
};
