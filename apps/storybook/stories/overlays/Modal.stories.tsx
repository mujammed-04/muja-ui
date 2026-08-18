import { Button, Input, Label, Select, Stack, Text } from '@muja-ui/web';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

/**
 * Controlled dialog: backdrop, Escape to close, focus moved into the panel and
 * trapped there, body scroll locked, focus restored on close. Client component
 * — import from `@muja-ui/web/client`.
 */
const meta = {
  title: 'Overlays/Modal',
  component: Modal,
  subcomponents: { ModalHeader, ModalTitle, ModalBody, ModalFooter },
  tags: ['autodocs'],
  // Each story owns its own open state below; these keep the required
  // controlled props satisfied for the prop table.
  args: { open: false, onClose: () => undefined, size: 'md', closeOnOverlayClick: true },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    open: { control: false },
    onClose: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function BookingModal({
  size,
  closeOnOverlayClick,
}: {
  size?: 'sm' | 'md' | 'lg';
  closeOnOverlayClick?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Book a room</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size={size}
        closeOnOverlayClick={closeOnOverlayClick}
        aria-labelledby="book-room-title"
      >
        <ModalHeader>
          <ModalTitle id="book-room-title">Book a room</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Stack gap={4}>
            <Stack gap={2}>
              <Label htmlFor="modal-room">Room</Label>
              <Select id="modal-room" fullWidth placeholder="Choose a room">
                <option value="a101">A101 — 6 seats</option>
                <option value="a102">A102 — 4 seats</option>
              </Select>
            </Stack>
            <Stack gap={2}>
              <Label htmlFor="modal-time">Start time</Label>
              <Input id="modal-time" type="time" fullWidth defaultValue="09:00" />
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export const Playground: Story = {
  render: (args) => (
    <BookingModal size={args.size} closeOnOverlayClick={args.closeOnOverlayClick} />
  ),
};

function SizesDemo() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null);

  return (
    <div className="story-row">
      {(['sm', 'md', 'lg'] as const).map((value) => (
        <Button key={value} variant="outline" onClick={() => setSize(value)}>
          Open {value}
        </Button>
      ))}
      <Modal
        open={size !== null}
        onClose={() => setSize(null)}
        size={size ?? 'md'}
        aria-labelledby="size-title"
      >
        <ModalHeader>
          <ModalTitle id="size-title">size=&quot;{size}&quot;</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Text style={{ margin: 0 }}>
            The panel width comes from the size; the height always follows the content.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setSize(null)}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export const Sizes: Story = {
  render: () => <SizesDemo />,
};

function DestructiveDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Cancel booking
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        size="sm"
        closeOnOverlayClick={false}
        aria-labelledby="confirm-title"
      >
        <ModalHeader>
          <ModalTitle id="confirm-title">Cancel this booking?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Text style={{ margin: 0 }}>
            Room A101 on Tuesday at 09:00 will be released. This cannot be undone.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Keep it
          </Button>
          <Button variant="danger" onClick={() => setOpen(false)}>
            Cancel booking
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

/** A destructive confirm: `closeOnOverlayClick={false}` so a stray click cannot dismiss it. */
export const Confirmation: Story = {
  render: () => <DestructiveDemo />,
};
