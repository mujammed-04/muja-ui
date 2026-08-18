import { Button, Checkbox, Stack, Text } from '@muja-ui/web';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerTitle } from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

/**
 * Sliding panel with the Modal behaviours (backdrop, Escape, focus trap, scroll
 * lock) and edge-anchored layout. Client component — import from
 * `@muja-ui/web/client`.
 */
const meta = {
  title: 'Overlays/Drawer',
  component: Drawer,
  subcomponents: { DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter },
  tags: ['autodocs'],
  // Each story owns its own open state below; these keep the required
  // controlled props satisfied for the prop table.
  args: { open: false, onClose: () => undefined, side: 'right', closeOnOverlayClick: true },
  argTypes: {
    side: { control: 'inline-radio', options: ['left', 'right', 'top', 'bottom'] },
    open: { control: false },
    onClose: { control: false },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const categories = ['Sports', 'Clubs', 'Career', 'Science', 'Volunteering'];

function FiltersDrawer({
  side,
  closeOnOverlayClick,
}: {
  side?: 'left' | 'right' | 'top' | 'bottom';
  closeOnOverlayClick?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open filters
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        side={side}
        closeOnOverlayClick={closeOnOverlayClick}
        aria-labelledby="filters-title"
      >
        <DrawerHeader>
          <DrawerTitle id="filters-title">Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack gap={3}>
            <Text size="sm" color="textMuted" style={{ margin: 0 }}>
              Categories
            </Text>
            {categories.map((category) => (
              <Checkbox key={category} defaultChecked={category === 'Sports'}>
                {category}
              </Checkbox>
            ))}
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Reset
          </Button>
          <Button onClick={() => setOpen(false)}>Apply</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}

export const Playground: Story = {
  render: (args) => (
    <FiltersDrawer side={args.side} closeOnOverlayClick={args.closeOnOverlayClick} />
  ),
};

function SidesDemo() {
  const [side, setSide] = useState<'left' | 'right' | 'top' | 'bottom' | null>(null);

  return (
    <div className="story-row">
      {(['left', 'right', 'top', 'bottom'] as const).map((value) => (
        <Button key={value} variant="outline" onClick={() => setSide(value)}>
          {value}
        </Button>
      ))}
      <Drawer
        open={side !== null}
        onClose={() => setSide(null)}
        side={side ?? 'right'}
        aria-labelledby="side-title"
      >
        <DrawerHeader>
          <DrawerTitle id="side-title">side=&quot;{side}&quot;</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Text style={{ margin: 0 }}>
            Left and right panels fill the height; top and bottom fill the width.
          </Text>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={() => setSide(null)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
}

export const Sides: Story = {
  render: () => <SidesDemo />,
};
