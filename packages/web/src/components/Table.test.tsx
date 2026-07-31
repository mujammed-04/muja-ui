import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from './Table';

afterEach(cleanup);

describe('Table', () => {
  it('renders a semantic table inside a scrollable wrapper', () => {
    render(
      <Table>
        <TableCaption>Students</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Aruzhan</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const table = screen.getByRole('table', { name: 'Students' });
    expect(table.parentElement!.className).toBe('mj-table-wrapper');
    expect(screen.getByRole('columnheader', { name: 'Name' }).getAttribute('scope')).toBe('col');
    expect(screen.getByRole('cell', { name: 'Aruzhan' })).not.toBeNull();
  });

  it('applies striped and dense modes via data attributes', () => {
    render(
      <Table striped dense>
        <TableBody>
          <TableRow>
            <TableCell>Row</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    const table = screen.getByRole('table');
    expect(table.getAttribute('data-striped')).toBe('true');
    expect(table.getAttribute('data-dense')).toBe('true');
  });
});
