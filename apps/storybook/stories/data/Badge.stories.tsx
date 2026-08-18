import { Badge, type BadgeTone } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * Small status label. Tones map to the semantic status colours, so a theme
 * change or dark mode needs no work here.
 */
const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Confirmed', tone: 'success', variant: 'subtle' },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    variant: { control: 'inline-radio', options: ['subtle', 'solid', 'outline'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const tones: BadgeTone[] = ['neutral', 'primary', 'success', 'warning', 'danger', 'info'];

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <Row>
      {tones.map((tone) => (
        <Badge key={tone} tone={tone}>
          {tone}
        </Badge>
      ))}
    </Row>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="story-col">
      {(['subtle', 'solid', 'outline'] as const).map((variant) => (
        <Row key={variant}>
          {tones.map((tone) => (
            <Badge key={tone} tone={tone} variant={variant}>
              {variant}/{tone}
            </Badge>
          ))}
        </Row>
      ))}
    </div>
  ),
};

export const InUse: Story = {
  name: 'Real labels',
  render: () => (
    <Row>
      <Badge tone="success">Checked in</Badge>
      <Badge tone="warning">Waitlisted</Badge>
      <Badge tone="danger" variant="solid">
        Cancelled
      </Badge>
      <Badge tone="info" variant="outline">
        Online
      </Badge>
      <Badge tone="primary">12 seats left</Badge>
    </Row>
  ),
};
