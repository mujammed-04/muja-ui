import { Button, Divider, Flex, Heading, Icon, Stack, Text } from '@muja-ui/web';
import { BottomSheet } from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

/**
 * Mobile-style sheet: the Modal behaviours plus a grab handle you can drag
 * down to dismiss. Client component — import from `@muja-ui/web/client`.
 */
const meta = {
  title: 'Overlays/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  // Each story owns its own open state below; these keep the required
  // controlled props satisfied for the prop table.
  args: { open: false, onClose: () => undefined, closeOnOverlayClick: true },
  argTypes: {
    open: { control: false },
    onClose: { control: false },
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

function TicketSheet({ closeOnOverlayClick }: { closeOnOverlayClick?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show ticket</Button>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        closeOnOverlayClick={closeOnOverlayClick}
        aria-labelledby="ticket-title"
      >
        <Stack gap={4} p={5}>
          <Heading level={2} size="lg" id="ticket-title" style={{ margin: 0 }}>
            Hackathon 2026
          </Heading>
          <Flex align="center" gap={3} color="textSecondary">
            <Icon icon="map-pin" size={18} />
            <Text size="sm" style={{ margin: 0 }}>
              Red Hall · 18 April, 10:00
            </Text>
          </Flex>
          <Divider />
          <Flex justify="center" py={4}>
            <Icon icon="qr-code" size={120} />
          </Flex>
          <Text size="sm" color="textMuted" align="center" style={{ margin: 0 }}>
            Drag the handle down, press Escape, or tap outside to close.
          </Text>
          <Button fullWidth onClick={() => setOpen(false)}>
            Done
          </Button>
        </Stack>
      </BottomSheet>
    </>
  );
}

export const Playground: Story = {
  render: (args) => <TicketSheet closeOnOverlayClick={args.closeOnOverlayClick} />,
};

function ActionsSheet() {
  const [open, setOpen] = useState(false);
  const actions = [
    { icon: 'share', label: 'Share event' },
    { icon: 'calendar', label: 'Add to calendar' },
    { icon: 'bell', label: 'Remind me' },
    { icon: 'trash', label: 'Remove from saved' },
  ] as const;

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Actions
      </Button>
      <BottomSheet open={open} onClose={() => setOpen(false)} aria-label="Event actions">
        <Stack gap={0} py={2}>
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="ghost"
              fullWidth
              leftIcon={<Icon icon={action.icon} size={18} />}
              onClick={() => setOpen(false)}
              style={{ justifyContent: 'flex-start', height: 'var(--mj-space-12)' }}
            >
              {action.label}
            </Button>
          ))}
        </Stack>
      </BottomSheet>
    </>
  );
}

/** An action list — the common mobile use for a sheet. */
export const ActionList: Story = {
  name: 'Action list',
  render: () => <ActionsSheet />,
};
