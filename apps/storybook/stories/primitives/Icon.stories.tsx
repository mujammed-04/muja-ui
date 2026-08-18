import { BellIcon, CalendarIcon, CheckCircleIcon, TicketIcon } from '@muja-ui/icons';
import { Flex, Icon, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * Renders a stroke icon from an `IconDefinition` (tree-shakable) or a
 * registered name. Decorative by default (`aria-hidden`) — pass `label` when
 * the icon carries meaning on its own. Colour is `currentColor`, so it follows
 * the surrounding text.
 *
 * See **Foundations → Icons** for the full set.
 */
const meta = {
  title: 'Primitives/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { icon: CalendarIcon, size: 24 },
  argTypes: {
    icon: {
      control: 'select',
      options: ['calendar', 'bell', 'ticket', 'check-circle'],
      description: 'An IconDefinition, or a registered name once `registerIcons()` has run.',
    },
    size: { control: { type: 'range', min: 12, max: 64, step: 2 } },
    strokeWidth: { control: { type: 'range', min: 1, max: 3, step: 0.25 } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

/** Imported definitions tree-shake; the string form needs `registerIcons()`. */
export const DefinitionsAndNames: Story = {
  name: 'Definitions & names',
  render: () => (
    <Row>
      <Icon icon={CalendarIcon} size={28} />
      <Icon icon={BellIcon} size={28} />
      <Icon icon={TicketIcon} size={28} />
      <Icon icon={CheckCircleIcon} size={28} />
      <Icon icon="graduation-cap" size={28} />
      <Icon icon="qr-code" size={28} />
    </Row>
  ),
};

/** `currentColor` means an icon inherits the text colour it sits in. */
export const InheritsColor: Story = {
  name: 'Inherits colour',
  render: () => (
    <Row>
      {(['text', 'textMuted', 'primaryText', 'successText', 'dangerText'] as const).map((color) => (
        <Flex key={color} align="center" gap={2} color={color}>
          <Icon icon="check-circle" size={20} />
          <Text size="sm" style={{ margin: 0 }}>
            {color}
          </Text>
        </Flex>
      ))}
    </Row>
  ),
};

/** With `label` the icon becomes `role="img"` with an accessible name. */
export const Labelled: Story = {
  render: () => (
    <Row>
      <Icon icon="bell" size={28} label="3 unread notifications" />
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        Announced as “3 unread notifications”.
      </Text>
    </Row>
  ),
};
