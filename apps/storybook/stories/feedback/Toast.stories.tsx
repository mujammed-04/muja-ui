import { Button, Stack, Text } from '@muja-ui/web';
import { ToastProvider, useToast, type ToastTone } from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * Wrap the app once in `<ToastProvider>`, then call `useToast().toast(…)`
 * anywhere below it. Status tones announce politely; `danger` announces as an
 * alert. An `action` slot covers snackbar-style “Undo”.
 *
 * Client component — import from `@muja-ui/web/client`.
 */
const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    duration: { control: { type: 'number', min: 0, step: 500 } },
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const tones: ToastTone[] = ['neutral', 'success', 'warning', 'danger', 'info'];

function Triggers() {
  const { toast } = useToast();

  return (
    <Stack gap={5}>
      <Row>
        {tones.map((tone) => (
          <Button
            key={tone}
            variant={tone === 'danger' ? 'danger' : 'outline'}
            onClick={() =>
              toast({
                title: `${tone[0]!.toUpperCase()}${tone.slice(1)} notification`,
                description: 'Room A101 · Tuesday, 09:00',
                tone,
              })
            }
          >
            {tone}
          </Button>
        ))}
      </Row>
      <Row>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: 'Booking deleted',
              tone: 'neutral',
              action: (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast({ title: 'Restored', tone: 'success' })}
                >
                  Undo
                </Button>
              ),
            })
          }
        >
          With an action
        </Button>
        <Button
          variant="secondary"
          onClick={() =>
            toast({
              title: 'Stays until dismissed',
              description: 'duration: 0 keeps the toast on screen.',
              duration: 0,
            })
          }
        >
          No auto-dismiss
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            toast({ title: 'First', tone: 'info' });
            toast({ title: 'Second', tone: 'success' });
            toast({ title: 'Third', tone: 'warning' });
          }}
        >
          Stack three
        </Button>
      </Row>
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        Toasts render in a fixed region — change the corner with the
        <code> placement</code> control.
      </Text>
    </Stack>
  );
}

export const Playground: Story = {
  args: { placement: 'bottom-right', duration: 5000 },
  render: (args) => (
    <ToastProvider {...args}>
      <Triggers />
    </ToastProvider>
  ),
};

/** The provider's `placement` moves the whole region — here to the top centre. */
export const Placements: Story = {
  render: () => (
    <ToastProvider placement="top-center" duration={4000}>
      <Triggers />
    </ToastProvider>
  ),
};
