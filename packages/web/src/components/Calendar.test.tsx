import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Calendar } from './Calendar';

afterEach(cleanup);

const JULY_2026 = new Date(2026, 6, 1);

describe('Calendar', () => {
  it('renders the month caption, weekday headers and a 6-week grid', () => {
    render(<Calendar defaultMonth={JULY_2026} locale="en-US" />);
    expect(screen.getByText('July 2026')).not.toBeNull();
    expect(screen.getAllByRole('columnheader')).toHaveLength(7);
    const grid = screen.getByRole('grid');
    expect(grid.querySelectorAll('[role="gridcell"]')).toHaveLength(42);
  });

  it('selects a day on click and reports it through onChange', () => {
    const onChange = vi.fn();
    render(<Calendar defaultMonth={JULY_2026} locale="en-US" onChange={onChange} />);
    const day = screen.getByRole('button', { name: 'Monday, July 20, 2026' });
    fireEvent.click(day);

    expect(onChange).toHaveBeenCalledTimes(1);
    const picked = onChange.mock.calls[0]![0] as Date;
    expect([picked.getFullYear(), picked.getMonth(), picked.getDate()]).toEqual([2026, 6, 20]);
    expect(day.getAttribute('data-selected')).toBe('true');
    expect(day.closest('[role="gridcell"]')!.getAttribute('aria-selected')).toBe('true');
  });

  it('disables days outside the min/max range', () => {
    render(
      <Calendar
        defaultMonth={JULY_2026}
        locale="en-US"
        minDate={new Date(2026, 6, 10)}
        maxDate={new Date(2026, 6, 25)}
      />,
    );
    expect(
      (screen.getByRole('button', { name: 'Sunday, July 5, 2026' }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
    expect(
      (screen.getByRole('button', { name: 'Wednesday, July 15, 2026' }) as HTMLButtonElement)
        .disabled,
    ).toBe(false);
    expect(
      (screen.getByRole('button', { name: 'Thursday, July 30, 2026' }) as HTMLButtonElement)
        .disabled,
    ).toBe(true);
  });

  it('moves focus with arrow keys and changes month with PageDown', () => {
    render(
      <Calendar defaultValue={new Date(2026, 6, 15)} defaultMonth={JULY_2026} locale="en-US" />,
    );
    const grid = screen.getByRole('grid');
    const day15 = screen.getByRole('button', { name: 'Wednesday, July 15, 2026' });
    day15.focus();

    fireEvent.keyDown(grid, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Thursday, July 16, 2026' }),
    );

    fireEvent.keyDown(grid, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Thursday, July 23, 2026' }),
    );

    fireEvent.keyDown(grid, { key: 'PageDown' });
    expect(screen.getByText('August 2026')).not.toBeNull();
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Sunday, August 23, 2026' }),
    );
  });

  it('navigates months with the header buttons', () => {
    render(<Calendar defaultMonth={JULY_2026} locale="en-US" />);
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('August 2026')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByText('June 2026')).not.toBeNull();
  });
});
