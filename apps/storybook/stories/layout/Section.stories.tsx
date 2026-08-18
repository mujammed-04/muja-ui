import { Container, Heading, Section, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Semantic `<section>` with consistent vertical rhythm. Name it with
 * `aria-labelledby` when it should be a landmark.
 */
const meta = {
  title: 'Layout/Section',
  component: Section,
  tags: ['autodocs'],
  args: { spacing: 'md' },
  argTypes: { spacing: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <>
      {(['sm', 'md', 'lg'] as const).map((spacing, index) => (
        <Section
          key={spacing}
          {...args}
          spacing={spacing}
          aria-labelledby={`section-${spacing}`}
          style={{ background: index % 2 === 0 ? 'var(--mj-color-bg-subtle)' : undefined }}
        >
          <Container>
            <Heading level={2} size="xl" id={`section-${spacing}`} mb={2}>
              spacing=&quot;{spacing}&quot;
            </Heading>
            <Text color="textSecondary" style={{ margin: 0 }}>
              Sections stack without collapsing margins — the padding is the rhythm.
            </Text>
          </Container>
        </Section>
      ))}
    </>
  ),
};
