import { Icon, Stack, Text } from '@muja-ui/web';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Row } from '../_layout';

/**
 * Action menu following the WAI-ARIA menu-button pattern: arrow-key roving
 * focus, Home/End, Escape returns focus to the trigger, and selecting an item
 * closes the menu. Client component — import from `@muja-ui/web/client`.
 */
const meta = {
  title: 'Overlays/DropdownMenu',
  component: DropdownMenu,
  subcomponents: {
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ padding: 'var(--mj-space-12)' }}>
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Booking</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem disabled>Move (unavailable)</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem tone="danger">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ padding: 'var(--mj-space-20)' }}>
      <Row>
        {(['bottom', 'top'] as const).map((placement) =>
          (['start', 'center', 'end'] as const).map((align) => (
            <DropdownMenu key={`${placement}-${align}`}>
              <DropdownMenuTrigger>
                {placement}/{align}
              </DropdownMenuTrigger>
              <DropdownMenuContent placement={placement} align={align}>
                <DropdownMenuItem>First</DropdownMenuItem>
                <DropdownMenuItem>Second</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )),
        )}
      </Row>
    </div>
  ),
};

function SelectionDemo() {
  const [last, setLast] = useState('nothing yet');
  const [visible, setVisible] = useState({ sports: true, clubs: false });

  return (
    <Stack gap={4} style={{ padding: 'var(--mj-space-12)' }}>
      <Row>
        <DropdownMenu>
          <DropdownMenuTrigger>Event actions</DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onSelect={() => setLast('Share')}>Share</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setLast('Add to calendar')}>
              Add to calendar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Show categories</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={visible.sports}
              onCheckedChange={(checked) => setVisible((v) => ({ ...v, sports: checked }))}
            >
              Sports
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={visible.clubs}
              onCheckedChange={(checked) => setVisible((v) => ({ ...v, clubs: checked }))}
            >
              Clubs
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem tone="danger" onSelect={() => setLast('Delete')}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        Last action: {last} · sports: {String(visible.sports)} · clubs: {String(visible.clubs)}
      </Text>
    </Stack>
  );
}

/** `onSelect` for actions, `DropdownMenuCheckboxItem` for toggles that stay open. */
export const ItemsAndCheckboxes: Story = {
  name: 'Items & checkboxes',
  render: () => <SelectionDemo />,
};

/** The trigger takes any content — here an icon-only button. */
export const IconTrigger: Story = {
  name: 'Icon trigger',
  render: () => (
    <div style={{ padding: 'var(--mj-space-12)' }}>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="More actions">
          <Icon icon="more-vertical" size={18} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem tone="danger">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ),
};
