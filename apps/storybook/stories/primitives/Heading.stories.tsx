import { Heading, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Semantic heading. `level` picks both the rendered `<h1>`–`<h6>` and the
 * default size — override the size independently when the document outline and
 * the visual hierarchy disagree.
 */
const meta = {
  title: 'Primitives/Heading',
  component: Heading,
  tags: ['autodocs'],
  args: { children: 'Upcoming events', level: 2 },
  argTypes: {
    level: { control: 'inline-radio', options: [1, 2, 3, 4, 5, 6] },
    size: { control: 'select', options: ['md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] },
    weight: { control: 'inline-radio', options: ['medium', 'semibold', 'bold'] },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Levels: Story = {
  render: () => (
    <Stack gap={4}>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level} style={{ margin: 0 }}>
          Level {level}
        </Heading>
      ))}
    </Stack>
  ),
};

/** An `<h2>` that looks small: correct outline, quieter visual weight. */
export const LevelWithCustomSize: Story = {
  name: 'Level with custom size',
  render: () => (
    <Stack gap={2}>
      <Heading level={2} size="lg" style={{ margin: 0 }}>
        Section title
      </Heading>
      <Text color="textSecondary" style={{ margin: 0 }}>
        Still an &lt;h2&gt; in the accessibility tree.
      </Text>
    </Stack>
  ),
};
