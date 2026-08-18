import { Badge, Flex, Stack, Text } from '@muja-ui/web';
import { Tab, TabList, TabPanel, Tabs } from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

/**
 * WAI-ARIA tabs with automatic activation: arrow keys move and select,
 * Home/End jump to the ends. Client component — import from
 * `@muja-ui/web/client`.
 */
const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  subcomponents: { TabList, Tab, TabPanel },
  tags: ['autodocs'],
  args: { defaultValue: 'upcoming' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList aria-label="Events">
        <Tab value="upcoming">Upcoming</Tab>
        <Tab value="saved">Saved</Tab>
        <Tab value="past">Past</Tab>
      </TabList>
      <TabPanel value="upcoming">
        <Text style={{ marginBottom: 0 }}>Three events this week.</Text>
      </TabPanel>
      <TabPanel value="saved">
        <Text style={{ marginBottom: 0 }}>Hackathon 2026 and one more.</Text>
      </TabPanel>
      <TabPanel value="past">
        <Text style={{ marginBottom: 0 }}>Nothing from last semester.</Text>
      </TabPanel>
    </Tabs>
  ),
};

export const WithBadgesAndDisabled: Story = {
  name: 'With badges & a disabled tab',
  render: () => (
    <Tabs defaultValue="all">
      <TabList aria-label="Bookings">
        <Tab value="all">
          <Flex as="span" align="center" gap={2}>
            All <Badge tone="neutral">12</Badge>
          </Flex>
        </Tab>
        <Tab value="today">
          <Flex as="span" align="center" gap={2}>
            Today <Badge tone="primary">2</Badge>
          </Flex>
        </Tab>
        <Tab value="archive" disabled>
          Archive
        </Tab>
      </TabList>
      <TabPanel value="all">
        <Text style={{ marginBottom: 0 }}>Every booking you have made.</Text>
      </TabPanel>
      <TabPanel value="today">
        <Text style={{ marginBottom: 0 }}>A101 at 09:00, Red Hall at 18:00.</Text>
      </TabPanel>
      <TabPanel value="archive">
        <Text style={{ marginBottom: 0 }}>Unreachable while disabled.</Text>
      </TabPanel>
    </Tabs>
  ),
};

function ControlledTabs() {
  const [value, setValue] = useState('grades');

  return (
    <Stack gap={4}>
      <Tabs value={value} onValueChange={setValue}>
        <TabList aria-label="Student record">
          <Tab value="grades">Grades</Tab>
          <Tab value="attendance">Attendance</Tab>
          <Tab value="fees">Fees</Tab>
        </TabList>
        <TabPanel value="grades">
          <Text style={{ marginBottom: 0 }}>iGPA 3.62 across 21 credits.</Text>
        </TabPanel>
        <TabPanel value="attendance">
          <Text style={{ marginBottom: 0 }}>94% this semester.</Text>
        </TabPanel>
        <TabPanel value="fees">
          <Text style={{ marginBottom: 0 }}>Nothing outstanding.</Text>
        </TabPanel>
      </Tabs>
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        Active tab in your own state: {value}
      </Text>
    </Stack>
  );
}

/** Controlled: keep the active tab in your own state (e.g. in the URL). */
export const Controlled: Story = {
  render: () => <ControlledTabs />,
};
