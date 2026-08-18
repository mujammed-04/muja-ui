import { Stack, Switch, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col, Row } from '../_layout';

/**
 * Toggle backed by a native `<input type="checkbox" role="switch">` — SSR-safe
 * and form-compatible; the track and thumb are CSS siblings driven by
 * `:checked`.
 */
const meta = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { children: 'Push notifications', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    onChange: { action: 'change' },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <Row>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Switch key={size} size={size} defaultChecked>
          {size}
        </Switch>
      ))}
    </Row>
  ),
};

export const States: Story = {
  render: () => (
    <Col>
      <Switch>Off</Switch>
      <Switch defaultChecked>On</Switch>
      <Switch disabled>Disabled</Switch>
      <Switch disabled defaultChecked>
        Disabled and on
      </Switch>
    </Col>
  ),
};

export const SettingsRows: Story = {
  name: 'Settings list',
  render: () => (
    <Stack
      gap={4}
      maxW={420}
      p={5}
      bg="surface"
      radius="lg"
      borderWidth="thin"
      borderColor="border"
    >
      {[
        ['Event reminders', 'An hour before each event you saved'],
        ['Grade updates', 'When a teacher publishes a new grade'],
        ['Club digest', 'A weekly summary from your clubs'],
      ].map(([title, description], index) => (
        <Stack key={title} gap={1}>
          <Switch defaultChecked={index === 0}>{title}</Switch>
          <Text
            size="sm"
            color="textMuted"
            style={{ margin: 0, paddingLeft: 'var(--mj-space-12)' }}
          >
            {description}
          </Text>
        </Stack>
      ))}
    </Stack>
  ),
};
