import { Box, Flex, Skeleton, Stack } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * Loading placeholder with a pulse animation, hidden from assistive technology
 * — announce the loading state on the container instead (`aria-busy`).
 */
const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { variant: 'rect', width: 240, height: 20 },
  argTypes: {
    variant: { control: 'inline-radio', options: ['text', 'circle', 'rect'] },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Row>
      <Skeleton variant="text" width={220} />
      <Skeleton variant="circle" width={44} height={44} />
      <Skeleton variant="rect" width={140} height={80} />
    </Row>
  ),
};

/** Mirror the real layout: same sizes, same rhythm, no layout shift on load. */
export const CardPlaceholder: Story = {
  name: 'Card placeholder',
  render: () => (
    <Box
      aria-busy="true"
      aria-label="Loading booking"
      maxW={420}
      p={5}
      bg="surface"
      radius="lg"
      borderWidth="thin"
      borderColor="border"
    >
      <Flex align="center" gap={3} mb={4}>
        <Skeleton variant="circle" width={40} height={40} />
        <Stack gap={2} style={{ flex: 1 }}>
          <Skeleton variant="text" width="55%" />
          <Skeleton variant="text" width="35%" />
        </Stack>
      </Flex>
      <Stack gap={2}>
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </Stack>
    </Box>
  ),
};

export const ListPlaceholder: Story = {
  name: 'List placeholder',
  render: () => (
    <Stack gap={4} maxW={480} aria-busy="true" aria-label="Loading events">
      {[0, 1, 2].map((row) => (
        <Flex key={row} align="center" gap={3}>
          <Skeleton variant="rect" width={64} height={64} />
          <Stack gap={2} style={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
          </Stack>
        </Flex>
      ))}
    </Stack>
  ),
};
