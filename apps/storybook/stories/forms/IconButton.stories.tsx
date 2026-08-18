import { Icon, IconButton } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * Square icon-only button sharing the Button variants. `aria-label` is
 * required — there is no visible label to fall back on.
 */
const meta = {
  title: 'Forms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Add to calendar',
    variant: 'ghost',
    size: 'md',
    children: <Icon icon="plus" size={18} />,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'outline', 'ghost', 'danger'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    children: { control: false },
    onClick: { action: 'click' },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Row>
      {(['primary', 'secondary', 'accent', 'outline', 'ghost', 'danger'] as const).map(
        (variant) => (
          <IconButton {...args} key={variant} variant={variant} aria-label={`Add (${variant})`} />
        ),
      )}
    </Row>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Row>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <IconButton {...args} key={size} size={size} aria-label={`Add (${size})`} />
      ))}
    </Row>
  ),
};

export const CommonActions: Story = {
  name: 'Common actions',
  render: () => (
    <Row>
      <IconButton aria-label="Search">
        <Icon icon="search" size={18} />
      </IconButton>
      <IconButton aria-label="Notifications">
        <Icon icon="bell" size={18} />
      </IconButton>
      <IconButton aria-label="Share">
        <Icon icon="share" size={18} />
      </IconButton>
      <IconButton aria-label="More actions">
        <Icon icon="more-vertical" size={18} />
      </IconButton>
      <IconButton aria-label="Delete" variant="danger">
        <Icon icon="trash" size={18} />
      </IconButton>
    </Row>
  ),
};

export const LoadingAndDisabled: Story = {
  name: 'Loading & disabled',
  render: (args) => (
    <Row>
      <IconButton {...args} loading aria-label="Refreshing" />
      <IconButton {...args} disabled aria-label="Unavailable" />
    </Row>
  ),
};
