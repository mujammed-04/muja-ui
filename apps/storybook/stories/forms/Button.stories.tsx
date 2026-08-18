import { Button } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '@muja-ui/web';
import { Row } from '../_layout';

const meta = {
  title: 'Forms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Book a room',
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost', 'link', 'danger'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    onClick: { action: 'click' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Row>
      {(['primary', 'secondary', 'accent', 'outline', 'ghost', 'link', 'danger'] as const).map(
        (variant) => (
          <Button key={variant} {...args} variant={variant}>
            {variant}
          </Button>
        ),
      )}
    </Row>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Row>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Button key={size} {...args} size={size}>
          Size {size}
        </Button>
      ))}
    </Row>
  ),
};

export const WithIcons: Story = {
  name: 'With icons',
  render: (args) => (
    <Row>
      <Button {...args} leftIcon={<Icon icon="calendar" size={16} />}>
        Pick a date
      </Button>
      <Button {...args} variant="outline" rightIcon={<Icon icon="arrow-right" size={16} />}>
        Continue
      </Button>
      <Button {...args} variant="ghost" aria-label="Refresh">
        <Icon icon="refresh" size={16} />
      </Button>
    </Row>
  ),
};

/** `loading` shows the spinner, sets `aria-busy` and blocks interaction. */
export const Loading: Story = {
  args: { loading: true },
  render: (args) => (
    <Row>
      <Button {...args}>Saving</Button>
      <Button {...args} variant="secondary">
        Saving
      </Button>
      <Button {...args} variant="outline">
        Saving
      </Button>
    </Row>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Row>
      <Button {...args}>Primary</Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
    </Row>
  ),
};

export const FullWidth: Story = {
  name: 'Full width',
  args: { fullWidth: true, children: 'Confirm booking' },
  parameters: { layout: 'padded' },
  render: (args) => (
    <div style={{ maxWidth: 360 }}>
      <Button {...args} />
    </div>
  ),
};

/** Renders as an `<a>` when you need a link that looks like a button. */
export const AsLink: Story = {
  name: 'Link variant',
  render: () => (
    <Row>
      <Button variant="link">Read the docs</Button>
      <Button variant="link" rightIcon={<Icon icon="external-link" size={16} />}>
        Open portal
      </Button>
    </Row>
  ),
};
