import { Flex, Text } from '@muja-ui/web';
import { Avatar } from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * Avatar with an initials fallback when there is no image, or when the image
 * fails to load. It tracks that load error, which is why it is a client
 * component — import from `@muja-ui/web/client`.
 */
const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Aruzhan Bekova', size: 'md', shape: 'circle' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['circle', 'square'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const photo =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="%2317173f"/><stop offset="1" stop-color="%23d58549"/></linearGradient></defs><rect width="96" height="96" fill="url(%23g)"/></svg>`,
  );

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <Row>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Avatar key={size} size={size} name="Aruzhan Bekova" />
      ))}
    </Row>
  ),
};

export const Shapes: Story = {
  render: () => (
    <Row>
      <Avatar name="Aruzhan Bekova" src={photo} size="lg" />
      <Avatar name="Aruzhan Bekova" src={photo} size="lg" shape="square" />
    </Row>
  ),
};

/** No `src`, a broken `src`, or custom children — the fallback always renders. */
export const Fallbacks: Story = {
  render: () => (
    <Row>
      <Avatar name="Aruzhan Bekova" />
      <Avatar name="Daniyar" />
      <Avatar name="Aruzhan Bekova" src="https://example.invalid/missing.jpg" />
      <Avatar aria-label="SDU Life">SL</Avatar>
    </Row>
  ),
};

export const InAList: Story = {
  name: 'In a list row',
  render: () => (
    <Flex
      align="center"
      gap={3}
      p={4}
      bg="surface"
      radius="lg"
      borderWidth="thin"
      borderColor="border"
      maxW={380}
    >
      <Avatar name="Aruzhan Bekova" src={photo} />
      <div>
        <Text weight="medium" style={{ margin: 0 }}>
          Aruzhan Bekova
        </Text>
        <Text size="sm" color="textMuted" style={{ margin: 0 }}>
          Computer Science · 3rd year
        </Text>
      </div>
    </Flex>
  ),
};
