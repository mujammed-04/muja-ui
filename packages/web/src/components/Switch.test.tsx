import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch';

afterEach(cleanup);

describe('Switch', () => {
  it('renders a native checkbox with role="switch"', () => {
    render(<Switch>Notifications</Switch>);
    const control = screen.getByRole('switch', { name: 'Notifications' });
    expect((control as HTMLInputElement).type).toBe('checkbox');
  });

  it('toggles and fires onChange', () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange}>Dark mode</Switch>);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('switch') as HTMLInputElement).checked).toBe(true);
  });

  it('respects disabled', () => {
    render(<Switch disabled>Locked</Switch>);
    expect((screen.getByRole('switch') as HTMLInputElement).disabled).toBe(true);
  });
});
