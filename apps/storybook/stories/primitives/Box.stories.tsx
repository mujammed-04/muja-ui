import { Box, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * The base layout primitive. Token-bound style props resolve to `var(--mj-*)`
 * inline styles, so Box renders in Server Components and re-themes without a
 * re-render. `as` changes the element.
 */
const meta = {
  title: 'Primitives/Box',
  component: Box,
  tags: ['autodocs'],
  args: {
    p: 6,
    bg: 'surface',
    radius: 'lg',
    shadow: 'sm',
    children: 'A themed surface',
  },
  argTypes: {
    p: { control: 'select', options: [0, 1, 2, 3, 4, 6, 8, 12] },
    bg: { control: 'select', options: ['bg', 'bgSubtle', 'bgMuted', 'surface', 'primarySubtle'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    shadow: { control: 'select', options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Spacing, color, radius, border, shadow and sizing props, all token-bound. */
export const StyleProps: Story = {
  name: 'Style props',
  render: () => (
    <Row>
      <Box p={4} bg="bgMuted" radius="md">
        p=4 bg=bgMuted
      </Box>
      <Box px={6} py={3} bg="primarySubtle" color="primaryText" radius="full">
        pill
      </Box>
      <Box p={4} borderWidth="thin" borderColor="border" radius="lg">
        bordered
      </Box>
      <Box p={4} bg="surface" radius="lg" shadow="md">
        elevated
      </Box>
      <Box p={4} bg="surface" radius="lg" w={160} h={96}>
        w=160 h=96
      </Box>
    </Row>
  ),
};

/** `as` renders any element or component while keeping the style props. */
export const PolymorphicAs: Story = {
  name: 'Polymorphic `as`',
  render: () => (
    <Box as="section" p={6} bg="bgSubtle" radius="lg" maxW={520}>
      <Box as="header" mb={3}>
        <Text weight="semibold" style={{ margin: 0 }}>
          Rendered as &lt;section&gt;
        </Text>
      </Box>
      <Box as="p" m={0} color="textSecondary">
        Semantics stay yours; Box only owns layout and theming.
      </Box>
    </Box>
  ),
};
