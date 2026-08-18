import { Checkbox, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Col, Row } from '../_layout';

/**
 * A native `<input type="checkbox">` inside a `<label>`: the input is visually
 * hidden and the box is a CSS sibling driven by `:checked`, so it works in
 * plain HTML forms and needs no JavaScript.
 */
const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { children: 'Remind me an hour before', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    onChange: { action: 'change' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <Row>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Checkbox key={size} size={size} defaultChecked>
          {size}
        </Checkbox>
      ))}
    </Row>
  ),
};

export const States: Story = {
  render: () => (
    <Col>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled defaultChecked>
        Disabled and checked
      </Checkbox>
      <Checkbox invalid>Invalid — consent is required</Checkbox>
    </Col>
  ),
};

/** No label child: name it with `aria-label` (e.g. a row selector in a table). */
export const WithoutLabel: Story = {
  name: 'Without a visible label',
  render: () => (
    <Row>
      <Checkbox aria-label="Select row" />
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        aria-label=&quot;Select row&quot;
      </Text>
    </Row>
  ),
};

export const InAForm: Story = {
  name: 'Group of options',
  render: () => (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <Stack gap={3}>
        <Text as="legend" weight="semibold" style={{ margin: 0 }}>
          Notify me about
        </Text>
        <Checkbox name="topics" value="events" defaultChecked>
          Campus events
        </Checkbox>
        <Checkbox name="topics" value="grades">
          Grade updates
        </Checkbox>
        <Checkbox name="topics" value="clubs">
          Club announcements
        </Checkbox>
      </Stack>
    </fieldset>
  ),
};
