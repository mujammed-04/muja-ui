import { Chip, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Row } from '../_layout';

/**
 * Compact filter or tag element. With `onClick` it is a toggle `<button>`
 * (`aria-pressed` follows `selected`); with `onRemove` it is a `<span>` tag
 * carrying its own remove button — a button cannot nest a button, so the two
 * are mutually exclusive.
 */
const meta = {
  title: 'Data Display/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { children: 'Sports', size: 'md' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    onRemove: { control: false },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <Row>
      <Chip size="sm">sm</Chip>
      <Chip size="md">md</Chip>
      <Chip size="sm" selected>
        sm selected
      </Chip>
      <Chip size="md" selected>
        md selected
      </Chip>
    </Row>
  ),
};

const categories = ['All', 'Sports', 'Clubs', 'Career', 'Science', 'Volunteering'];

function FilterDemo() {
  const [active, setActive] = useState('All');

  return (
    <Stack gap={3}>
      <Row>
        {categories.map((category) => (
          <Chip key={category} selected={active === category} onClick={() => setActive(category)}>
            {category}
          </Chip>
        ))}
      </Row>
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        Filtering by: {active}
      </Text>
    </Stack>
  );
}

/** Toggle chips: the pressed state is `aria-pressed`, not just a colour. */
export const FilterRow: Story = {
  name: 'Filter row',
  render: () => <FilterDemo />,
};

function RemovableDemo() {
  const [tags, setTags] = useState(['machine learning', 'robotics', 'debate']);

  return (
    <Stack gap={3}>
      <Row>
        {tags.map((tag) => (
          <Chip key={tag} onRemove={() => setTags((current) => current.filter((t) => t !== tag))}>
            {tag}
          </Chip>
        ))}
      </Row>
      {tags.length === 0 ? (
        <Text size="sm" color="textMuted" style={{ margin: 0 }}>
          All interests removed.
        </Text>
      ) : null}
    </Stack>
  );
}

/** Removable tags render a `<span>` with an inner remove button. */
export const Removable: Story = {
  render: () => <RemovableDemo />,
};

/** Without `onClick` or `onRemove` a chip is a static tag. */
export const StaticTags: Story = {
  name: 'Static tags',
  render: () => (
    <Row>
      <Chip>CS-101</Chip>
      <Chip>3 credits</Chip>
      <Chip>Prof. Bekova</Chip>
    </Row>
  ),
};
