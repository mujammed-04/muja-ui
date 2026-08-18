import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Icon,
  Text,
} from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Row } from '../_layout';

/**
 * Surface container composed from `CardHeader`, `CardTitle`,
 * `CardDescription`, `CardContent` and `CardFooter`. `CardTitle` renders an
 * `<h3>` — pass `level` when the outline needs something else.
 */
const meta = {
  title: 'Data Display/Card',
  component: Card,
  subcomponents: { CardHeader, CardTitle, CardDescription, CardContent, CardFooter },
  tags: ['autodocs'],
  args: { variant: 'outline' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['outline', 'elevated', 'filled'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 380 }}>
      <CardHeader>
        <CardTitle>Room A101</CardTitle>
        <CardDescription>Second floor · 6 seats · projector</CardDescription>
      </CardHeader>
      <CardContent>
        <Text style={{ margin: 0 }}>Free today between 09:00 and 12:30.</Text>
      </CardContent>
      <CardFooter>
        <Button size="sm">Book</Button>
        <Button size="sm" variant="ghost">
          Details
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <Row>
      {(['outline', 'elevated', 'filled'] as const).map((variant) => (
        <Card key={variant} variant={variant} style={{ width: 240 }}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>variant=&quot;{variant}&quot;</CardDescription>
          </CardHeader>
          <CardContent>
            <Text size="sm" color="textSecondary" style={{ margin: 0 }}>
              The same content on three surfaces.
            </Text>
          </CardContent>
        </Card>
      ))}
    </Row>
  ),
};

/** Header slot with a badge, footer as a metadata row — no extra components. */
export const EventCard: Story = {
  name: 'Event card',
  render: () => (
    <Card variant="elevated" style={{ maxWidth: 380 }}>
      <CardHeader>
        <Flex align="center" justify="space-between" gap={3}>
          <CardTitle>Hackathon 2026</CardTitle>
          <Badge tone="success">Registered</Badge>
        </Flex>
        <CardDescription>Red Hall · 18 April, 10:00</CardDescription>
      </CardHeader>
      <CardContent>
        <Text style={{ margin: 0 }}>
          36 hours, 40 teams, and one demo stage. Bring a laptop and a charger.
        </Text>
      </CardContent>
      <CardFooter>
        <Flex align="center" gap={2} color="textMuted">
          <Icon icon="users" size={16} />
          <Text size="sm" style={{ margin: 0 }}>
            128 going
          </Text>
        </Flex>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  name: 'Content only',
  render: () => (
    <Card style={{ maxWidth: 320 }}>
      <CardContent>
        <Text style={{ margin: 0 }}>
          A card is just a surface — the header and footer slots are optional.
        </Text>
      </CardContent>
    </Card>
  ),
};
