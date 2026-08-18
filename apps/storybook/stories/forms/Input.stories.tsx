import { Input, Label, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col } from '../_layout';

/**
 * Semantic `<input>` with the shared field styling. Uncontrolled by default;
 * `invalid` sets both `aria-invalid` and the danger styling.
 */
const meta = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'name@sdu.edu.kz', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    type: { control: 'select', options: ['text', 'email', 'password', 'search', 'number', 'date'] },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Col>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Input {...args} key={size} size={size} placeholder={`size ${size}`} />
      ))}
    </Col>
  ),
};

export const States: Story = {
  render: () => (
    <Col>
      <Input placeholder="Default" />
      <Input defaultValue="With a value" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Read only" readOnly defaultValue="A101" />
      <Input placeholder="Invalid" invalid defaultValue="not-an-email" />
    </Col>
  ),
};

/** Wire the label with `htmlFor`, and the error text with `aria-describedby`. */
export const WithLabelAndError: Story = {
  name: 'With label & error',
  render: () => (
    <Stack gap={5} maxW={360}>
      <Stack gap={2}>
        <Label htmlFor="email" required>
          University email
        </Label>
        <Input id="email" type="email" fullWidth placeholder="name@sdu.edu.kz" required />
      </Stack>
      <Stack gap={2}>
        <Label htmlFor="student-id">Student ID</Label>
        <Input
          id="student-id"
          fullWidth
          invalid
          defaultValue="21B0"
          aria-describedby="student-id-error"
        />
        <Text id="student-id-error" size="sm" color="dangerText" style={{ margin: 0 }}>
          An ID has 9 characters, for example 210103099.
        </Text>
      </Stack>
    </Stack>
  ),
};

export const FullWidth: Story = {
  name: 'Full width',
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Input fullWidth type="search" placeholder="Search events, rooms, people" />
    </div>
  ),
};
