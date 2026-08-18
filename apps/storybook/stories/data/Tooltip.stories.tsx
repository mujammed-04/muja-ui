import { Button, Icon, IconButton, Tooltip } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * CSS-only tooltip: it appears on hover **and** keyboard focus, with no JS
 * positioning, so it stays SSR-safe. Wrap a single focusable element — the
 * trigger is linked via `aria-describedby`.
 */
const meta = {
  title: 'Data Display/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    label: 'Share this booking',
    placement: 'top',
    children: (
      <IconButton aria-label="Share">
        <Icon icon="share" size={18} />
      </IconButton>
    ),
  },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ padding: 'var(--mj-space-12)' }}>
      <Tooltip {...args} />
    </div>
  ),
};

/** There is no collision detection — pick the placement that fits. */
export const Placements: Story = {
  render: () => (
    <div style={{ padding: 'var(--mj-space-16)' }}>
      <Row>
        {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
          <Tooltip key={placement} label={`Placed ${placement}`} placement={placement}>
            <Button variant="outline">{placement}</Button>
          </Tooltip>
        ))}
      </Row>
    </div>
  ),
};

export const OnText: Story = {
  name: 'On an inline element',
  render: () => (
    <div style={{ padding: 'var(--mj-space-12)' }}>
      <Tooltip label="Grade point average across all semesters">
        <Button variant="link">iGPA 3.62</Button>
      </Tooltip>
    </div>
  ),
};
