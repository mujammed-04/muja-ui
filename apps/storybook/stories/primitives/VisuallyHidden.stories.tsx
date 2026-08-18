import { Button, Icon, VisuallyHidden } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * Content that stays in the accessibility tree but is not painted. Use it to
 * name something whose visual form already carries the meaning.
 */
const meta = {
  title: 'Primitives/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The button reads as “Delete booking” to a screen reader, as a bin icon on screen. */
export const Default: Story = {
  render: () => (
    <Row>
      <Button variant="danger">
        <Icon icon="trash" size={16} />
        <VisuallyHidden>Delete booking</VisuallyHidden>
      </Button>
      <Button variant="ghost">
        Filters
        <VisuallyHidden>, 3 applied</VisuallyHidden>
      </Button>
    </Row>
  ),
};
