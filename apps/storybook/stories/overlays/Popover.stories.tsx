import { Button, Checkbox, Heading, Stack, Text } from '@muja-ui/web';
import { Popover, PopoverContent, PopoverTrigger } from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Row } from '../_layout';

/**
 * Floating panel anchored to its trigger with pure CSS positioning — there is
 * no collision detection, so choose a `placement` that fits. Closes on Escape
 * and on outside pointer-down. Client component — import from
 * `@muja-ui/web/client`.
 */
const meta = {
  title: 'Overlays/Popover',
  component: Popover,
  subcomponents: { PopoverTrigger, PopoverContent },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <div style={{ padding: 'var(--mj-space-12)' }}>
      <Popover>
        <PopoverTrigger>Filters</PopoverTrigger>
        <PopoverContent placement="bottom" align="start">
          <Stack gap={3} style={{ minWidth: 200 }}>
            <Heading level={3} size="md" style={{ margin: 0 }}>
              Categories
            </Heading>
            <Checkbox defaultChecked>Sports</Checkbox>
            <Checkbox>Clubs</Checkbox>
            <Checkbox>Career</Checkbox>
          </Stack>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ padding: 'var(--mj-space-20)' }}>
      <Row>
        {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
          <Popover key={placement}>
            <PopoverTrigger>{placement}</PopoverTrigger>
            <PopoverContent placement={placement}>
              <Text size="sm" style={{ margin: 0, whiteSpace: 'nowrap' }}>
                placement=&quot;{placement}&quot;
              </Text>
            </PopoverContent>
          </Popover>
        ))}
      </Row>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ padding: 'var(--mj-space-16)' }}>
      <Row>
        {(['start', 'center', 'end'] as const).map((align) => (
          <Popover key={align}>
            <PopoverTrigger>align {align}</PopoverTrigger>
            <PopoverContent placement="bottom" align={align}>
              <Text size="sm" style={{ margin: 0, whiteSpace: 'nowrap' }}>
                align=&quot;{align}&quot;
              </Text>
            </PopoverContent>
          </Popover>
        ))}
      </Row>
    </div>
  ),
};

function ControlledPopover() {
  const [open, setOpen] = useState(false);

  return (
    <Stack gap={4} style={{ padding: 'var(--mj-space-12)' }}>
      <Row>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>Seat map</PopoverTrigger>
          <PopoverContent placement="bottom" align="start">
            <Stack gap={3} style={{ minWidth: 220 }}>
              <Text style={{ margin: 0 }}>Row 4 · seats 12–14 are free.</Text>
              <Button size="sm" onClick={() => setOpen(false)}>
                Take seat 12
              </Button>
            </Stack>
          </PopoverContent>
        </Popover>
        <Button variant="outline" onClick={() => setOpen((current) => !current)}>
          Toggle from outside
        </Button>
      </Row>
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        open: {String(open)}
      </Text>
    </Stack>
  );
}

/** Drive it from your own state with `open` + `onOpenChange`. */
export const Controlled: Story = {
  render: () => <ControlledPopover />,
};
