import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Text,
} from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Semantic `<table>` inside a horizontally scrollable wrapper. Header cells get
 * `scope="col"`; add a `TableCaption` so the table is named in the
 * accessibility tree.
 */
const meta = {
  title: 'Data Display/Table',
  component: Table,
  subcomponents: { TableHeader, TableBody, TableFooter, TableRow, TableHeaderCell, TableCell },
  tags: ['autodocs'],
  args: { striped: false, dense: false },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const grades = [
  { code: 'CS-101', course: 'Intro to Programming', credits: 3, grade: 'A', status: 'Passed' },
  { code: 'MATH-201', course: 'Linear Algebra', credits: 4, grade: 'B+', status: 'Passed' },
  { code: 'PHYS-110', course: 'Mechanics', credits: 3, grade: 'C', status: 'Passed' },
  { code: 'ENG-140', course: 'Academic Writing', credits: 2, grade: '—', status: 'In progress' },
];

export const Playground: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Fall semester transcript</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Code</TableHeaderCell>
          <TableHeaderCell>Course</TableHeaderCell>
          <TableHeaderCell>Credits</TableHeaderCell>
          <TableHeaderCell>Grade</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {grades.map((row) => (
          <TableRow key={row.code}>
            <TableCell>{row.code}</TableCell>
            <TableCell>{row.course}</TableCell>
            <TableCell>{row.credits}</TableCell>
            <TableCell>{row.grade}</TableCell>
            <TableCell>
              <Badge tone={row.status === 'Passed' ? 'success' : 'info'}>{row.status}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell />
          <TableCell>12</TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Striped: Story = {
  args: { striped: true },
  render: Playground.render,
};

export const Dense: Story = {
  args: { dense: true, striped: true },
  render: Playground.render,
};

/** Wide tables scroll inside their wrapper instead of stretching the page. */
export const Scrollable: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Table>
        <TableCaption>Weekly schedule</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Time</TableHeaderCell>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
              <TableHeaderCell key={day}>{day}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {['09:00', '10:30', '12:00'].map((time) => (
            <TableRow key={time}>
              <TableCell>{time}</TableCell>
              {['A101', 'B204', 'Red Hall', 'A101', '—'].map((room, index) => (
                <TableCell key={`${time}-${index}`}>{room}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Text size="sm" color="textMuted" mt={2} style={{ marginBottom: 0 }}>
        Scroll the table sideways — the page itself never overflows.
      </Text>
    </div>
  ),
};
