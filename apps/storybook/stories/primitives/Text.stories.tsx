import { Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col } from '../_layout';

/**
 * Typography primitive — renders `<p>` by default. Color comes from the
 * semantic `color` token prop; size/weight/leading/tracking are tokens too.
 */
const meta = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children: 'Booking confirmed for Room A101 at 09:00.',
    size: 'md',
  },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    weight: { control: 'inline-radio', options: ['regular', 'medium', 'semibold', 'bold'] },
    color: {
      control: 'select',
      options: ['text', 'textSecondary', 'textMuted', 'primaryText', 'dangerText'],
    },
    align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Colors: Story = {
  render: () => (
    <Col>
      {(
        ['text', 'textSecondary', 'textMuted', 'textDisabled', 'primaryText', 'dangerText'] as const
      ).map((color) => (
        <Text key={color} color={color} style={{ margin: 0 }}>
          {color}
        </Text>
      ))}
    </Col>
  ),
};

/** `truncate` clips to a single line with an ellipsis. */
export const Truncate: Story = {
  render: () => (
    <div style={{ width: 260 }}>
      <Text truncate style={{ margin: 0 }}>
        A very long room description that will not fit on one line in this narrow container
      </Text>
    </div>
  ),
};

/** `as` keeps the typography but changes the element (`span`, `label`, …). */
export const AsElement: Story = {
  name: 'Polymorphic `as`',
  render: () => (
    <Col>
      <Text as="span" size="sm" color="textMuted" style={{ margin: 0 }}>
        rendered as &lt;span&gt;
      </Text>
      <Text as="label" size="sm" weight="medium" style={{ margin: 0 }}>
        rendered as &lt;label&gt;
      </Text>
    </Col>
  ),
};
