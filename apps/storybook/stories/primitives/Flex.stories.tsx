import { Box, Flex, Spacer, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * `Flex` is a Box with flexbox props and a token-bound `gap`. `Stack` is Flex
 * with `direction="column"` and `gap={4}` by default. `Spacer` eats the
 * remaining space in a row.
 */
const meta = {
  title: 'Primitives/Flex & Stack',
  component: Flex,
  tags: ['autodocs'],
  args: {
    gap: 3,
    align: 'center',
    justify: 'flex-start',
  },
  argTypes: {
    gap: { control: 'select', options: [0, 1, 2, 3, 4, 6, 8] },
    direction: { control: 'inline-radio', options: ['row', 'column', 'row-reverse'] },
    align: { control: 'select', options: ['flex-start', 'center', 'flex-end', 'stretch'] },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <Box px={4} py={3} bg="primarySubtle" color="primaryText" radius="md">
      {children}
    </Box>
  );
}

export const Playground: Story = {
  render: (args) => (
    <Flex {...args}>
      <Tile>one</Tile>
      <Tile>two</Tile>
      <Tile>three</Tile>
    </Flex>
  ),
};

export const StackDirections: Story = {
  name: 'Stack',
  render: () => (
    <Flex gap={8} align="flex-start">
      <Stack>
        <Tile>column</Tile>
        <Tile>is the</Tile>
        <Tile>default</Tile>
      </Stack>
      <Stack direction="row" gap={2}>
        <Tile>row</Tile>
        <Tile>with</Tile>
        <Tile>gap 2</Tile>
      </Stack>
    </Flex>
  ),
};

/** A toolbar row: content on the left, actions pushed right by `Spacer`. */
export const WithSpacer: Story = {
  name: 'With Spacer',
  render: () => (
    <Flex
      align="center"
      gap={3}
      p={4}
      bg="surface"
      radius="lg"
      borderWidth="thin"
      borderColor="border"
    >
      <Text weight="semibold" style={{ margin: 0 }}>
        Room A101
      </Text>
      <Spacer />
      <Tile>09:00</Tile>
      <Tile>10:30</Tile>
    </Flex>
  ),
};
