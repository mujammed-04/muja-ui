import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderThemed } from '../../test/utils';
import { Calendar } from './Calendar';

const AUGUST_2026 = new Date(2026, 7, 1);

describe('Calendar', () => {
  it('renders six weeks of day buttons plus the two month arrows', () => {
    renderThemed(<Calendar defaultMonth={AUGUST_2026} locale="en-GB" />);
    expect(screen.getAllByRole('button')).toHaveLength(42 + 2);
  });

  it('labels the visible month from Intl', () => {
    renderThemed(<Calendar defaultMonth={AUGUST_2026} locale="en-GB" />);
    expect(screen.getByText('August 2026')).toBeTruthy();
  });

  it('moves to the next month and reports the change', () => {
    const onMonthChange = vi.fn();
    renderThemed(
      <Calendar defaultMonth={AUGUST_2026} locale="en-GB" onMonthChange={onMonthChange} />,
    );
    fireEvent.click(screen.getByLabelText('Next month'));
    expect(screen.getByText('September 2026')).toBeTruthy();
    expect(onMonthChange).toHaveBeenCalledOnce();
  });

  it('selects a day and reports it', () => {
    const onChange = vi.fn();
    renderThemed(<Calendar defaultMonth={AUGUST_2026} locale="en-GB" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Monday, 10 August 2026'));
    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange.mock.calls[0]?.[0]).toBeInstanceOf(Date);
  });

  it('disables days outside the min/max range', () => {
    renderThemed(
      <Calendar
        defaultMonth={AUGUST_2026}
        locale="en-GB"
        minDate={new Date(2026, 7, 10)}
        maxDate={new Date(2026, 7, 20)}
      />,
    );
    expect(screen.getByLabelText('Sunday, 9 August 2026').getAttribute('data-disabled')).toBe('true');
    expect(screen.getByLabelText('Monday, 10 August 2026').getAttribute('data-disabled')).toBeNull();
    expect(screen.getByLabelText('Friday, 21 August 2026').getAttribute('data-disabled')).toBe('true');
  });
});
