import { Label, Select, Stack } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col } from '../_layout';

/**
 * A native `<select>` with the shared field styling and a CSS chevron —
 * keyboard and mobile accessible for free. For a menu of actions use
 * **Overlays → DropdownMenu** instead.
 */
const meta = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  args: { placeholder: 'Choose a room', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    onChange: { action: 'change' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const rooms = ['A101', 'A102', 'B204', 'Red Hall'];

export const Playground: Story = {
  render: (args) => (
    <Select {...args}>
      {rooms.map((room) => (
        <option key={room} value={room}>
          {room}
        </option>
      ))}
    </Select>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Col>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Select key={size} size={size} placeholder={`size ${size}`}>
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </Select>
      ))}
    </Col>
  ),
};

export const States: Story = {
  render: () => (
    <Col>
      <Select placeholder="Placeholder">
        <option value="a101">A101</option>
      </Select>
      <Select defaultValue="a101">
        <option value="a101">A101</option>
        <option value="a102">A102</option>
      </Select>
      <Select placeholder="Disabled" disabled>
        <option value="a101">A101</option>
      </Select>
      <Select placeholder="Invalid" invalid>
        <option value="a101">A101</option>
      </Select>
    </Col>
  ),
};

export const WithLabelAndGroups: Story = {
  name: 'With label & option groups',
  render: () => (
    <Stack gap={2} maxW={360}>
      <Label htmlFor="venue" required>
        Venue
      </Label>
      <Select id="venue" fullWidth placeholder="Choose a venue" required>
        <optgroup label="Study rooms">
          <option value="a101">A101 — 6 seats</option>
          <option value="a102">A102 — 4 seats</option>
        </optgroup>
        <optgroup label="Halls">
          <option value="red">Red Hall — 300 seats</option>
          <option value="blue">Blue Hall — 120 seats</option>
        </optgroup>
      </Select>
    </Stack>
  ),
};
