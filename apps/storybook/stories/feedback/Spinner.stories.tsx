import { Button, Flex, Spinner, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * Indeterminate loading indicator. It announces itself through `role="status"`
 * plus a visually hidden label, so it never needs extra wiring.
 */
const meta = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  args: { size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <Row>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Spinner key={size} size={size} label={`Loading (${size})`} />
      ))}
    </Row>
  ),
};

/** Inline with text, and inside a button (Button has its own `loading` prop). */
export const InContext: Story = {
  name: 'In context',
  render: () => (
    <Row>
      <Flex align="center" gap={2}>
        <Spinner size="sm" label="Loading events" />
        <Text size="sm" color="textSecondary" style={{ margin: 0 }}>
          Loading events…
        </Text>
      </Flex>
      <Button loading>Saving</Button>
    </Row>
  ),
};
