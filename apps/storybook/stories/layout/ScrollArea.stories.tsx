import { Box, Divider, ScrollArea, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Scroll container with slim, theme-aware scrollbars — pure CSS, no JS thumb
 * tracking. Give it a bound with `maxHeight` / `maxWidth`.
 */
const meta = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  args: { orientation: 'vertical', maxHeight: 240 },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal', 'both'] },
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const rooms = Array.from({ length: 24 }, (_, index) => `Room ${101 + index}`);

export const Playground: Story = {
  render: (args) => (
    <Box maxW={320} bg="surface" radius="lg" borderWidth="thin" borderColor="border">
      <ScrollArea {...args}>
        <Stack gap={0} p={2}>
          {rooms.map((room, index) => (
            <div key={room}>
              <Text px={3} py={2} style={{ margin: 0 }}>
                {room}
              </Text>
              {index < rooms.length - 1 ? <Divider /> : null}
            </div>
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea orientation="horizontal" maxWidth={420}>
      <div style={{ display: 'flex', gap: 'var(--mj-space-3)', padding: 'var(--mj-space-2)' }}>
        {Array.from({ length: 10 }, (_, index) => (
          <Box
            key={index}
            w={160}
            h={96}
            p={4}
            bg="primarySubtle"
            color="primaryText"
            radius="lg"
            style={{ flex: '0 0 auto' }}
          >
            Card {index + 1}
          </Box>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Both: Story = {
  name: 'Both axes',
  render: () => (
    <ScrollArea orientation="both" maxHeight={240} maxWidth={420}>
      <div style={{ width: 720 }}>
        <Stack gap={3} p={3}>
          {Array.from({ length: 12 }, (_, index) => (
            <Text key={index} truncate style={{ margin: 0 }}>
              {index + 1}. A long line of content that is wider than the viewport, so both
              scrollbars come into play.
            </Text>
          ))}
        </Stack>
      </div>
    </ScrollArea>
  ),
};
