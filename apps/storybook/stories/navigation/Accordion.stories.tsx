import { Stack, Text } from '@muja-ui/web';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

/**
 * Disclosure list. One item open at a time by default; `multiple` allows
 * several, and `collapsible={false}` keeps one always open. Client component —
 * import from `@muja-ui/web/client`.
 */
const meta = {
  title: 'Navigation/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem, AccordionTrigger, AccordionContent },
  tags: ['autodocs'],
  args: { multiple: false, collapsible: true, defaultValue: ['booking'] },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const faq = [
  {
    value: 'booking',
    question: 'How far ahead can I book a room?',
    answer: 'Up to seven days. A booking is held for 15 minutes before it expires.',
  },
  {
    value: 'seats',
    question: 'Can I pick a specific seat in the Red Hall?',
    answer: 'Yes — open the seat map and tap a free seat. Held seats appear greyed out.',
  },
  {
    value: 'igpa',
    question: 'Why does my iGPA differ from the transcript?',
    answer: 'iGPA counts the current semester’s provisional grades; the transcript does not.',
  },
];

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <Accordion {...args}>
        {faq.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <Text style={{ margin: 0 }}>{item.answer}</Text>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

/** `multiple` lets readers keep several answers open while comparing them. */
export const Multiple: Story = {
  args: { multiple: true, defaultValue: ['booking', 'seats'] },
  render: Playground.render,
};

/** With `collapsible={false}` the open item cannot be closed, only replaced. */
export const AlwaysOne: Story = {
  name: 'Always one open',
  args: { collapsible: false, defaultValue: ['booking'] },
  render: Playground.render,
};

export const WithDisabledItem: Story = {
  name: 'With a disabled item',
  render: () => (
    <div style={{ maxWidth: 560 }}>
      <Accordion defaultValue={['open']}>
        <AccordionItem value="open">
          <AccordionTrigger>Available section</AccordionTrigger>
          <AccordionContent>
            <Text style={{ margin: 0 }}>Open and closable as usual.</Text>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="locked" disabled>
          <AccordionTrigger>Locked until enrolment closes</AccordionTrigger>
          <AccordionContent>
            <Text style={{ margin: 0 }}>Not reachable while disabled.</Text>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

function ControlledAccordion() {
  const [open, setOpen] = useState<string[]>(['seats']);

  return (
    <Stack gap={4} maxW={560}>
      <Accordion multiple value={open} onValueChange={setOpen}>
        {faq.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>
              <Text style={{ margin: 0 }}>{item.answer}</Text>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        Open: {open.length > 0 ? open.join(', ') : 'none'}
      </Text>
    </Stack>
  );
}

export const Controlled: Story = {
  render: () => <ControlledAccordion />,
};
