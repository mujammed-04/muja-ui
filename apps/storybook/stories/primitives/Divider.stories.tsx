import { Box, Divider, Flex, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Semantic separator: horizontal renders `<hr>`, vertical renders a
 * `role="separator"` element (an `<hr>` cannot be vertical semantically).
 */
const meta = {
  title: 'Primitives/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <Stack gap={4} maxW={420}>
      <Text style={{ margin: 0 }}>Library</Text>
      <Divider />
      <Text style={{ margin: 0 }}>Red Hall</Text>
      <Divider />
      <Text style={{ margin: 0 }}>Sports complex</Text>
    </Stack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Flex align="center" gap={4} h={40}>
      <Text style={{ margin: 0 }}>09:00</Text>
      <Divider orientation="vertical" />
      <Text style={{ margin: 0 }}>Room A101</Text>
      <Divider orientation="vertical" />
      <Text style={{ margin: 0 }}>Confirmed</Text>
    </Flex>
  ),
};

export const InACard: Story = {
  name: 'Separating sections',
  render: () => (
    <Box maxW={420} bg="surface" radius="lg" borderWidth="thin" borderColor="border">
      <Box p={4}>
        <Text weight="semibold" style={{ margin: 0 }}>
          Booking details
        </Text>
      </Box>
      <Divider />
      <Box p={4}>
        <Text color="textSecondary" style={{ margin: 0 }}>
          Tuesday, 09:00 — 10:30
        </Text>
      </Box>
    </Box>
  ),
};
