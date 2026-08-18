import { Box, Container, Heading, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col } from '../_layout';

/**
 * Centred page-width wrapper with horizontal padding. The max widths follow the
 * breakpoint tokens: 640 / 768 / 1024 / 1280.
 */
const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
  args: { size: 'lg' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] } },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Box py={8} bg="bgSubtle">
      <Container {...args}>
        <Box p={6} bg="surface" radius="lg" borderWidth="thin" borderColor="border">
          <Heading level={2} size="xl" mb={2}>
            size=&quot;{args.size}&quot;
          </Heading>
          <Text color="textSecondary" style={{ margin: 0 }}>
            Resize the preview: the container stays centred and stops growing at its breakpoint.
          </Text>
        </Box>
      </Container>
    </Box>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Box py={8} bg="bgSubtle">
      <Col>
        {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Container key={size} size={size}>
            <Box p={4} mb={4} bg="primarySubtle" color="primaryText" radius="md">
              <Text weight="medium" style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}>
                size=&quot;{size}&quot;
              </Text>
            </Box>
          </Container>
        ))}
      </Col>
    </Box>
  ),
};
