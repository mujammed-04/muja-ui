import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

afterEach(cleanup);

describe('Checkbox', () => {
  it('renders a native checkbox wrapped in a label', () => {
    render(<Checkbox>I agree</Checkbox>);
    const checkbox = screen.getByRole('checkbox', { name: 'I agree' });
    expect((checkbox as HTMLInputElement).type).toBe('checkbox');
    expect(checkbox.closest('label')).not.toBeNull();
  });

  it('toggles via label click and fires onChange', () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange}>Terms</Checkbox>);
    fireEvent.click(screen.getByText('Terms'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
  });

  it('supports defaultChecked and invalid state', () => {
    render(<Checkbox defaultChecked invalid />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
    expect(checkbox.getAttribute('aria-invalid')).toBe('true');
  });

  it('renders without a visible label', () => {
    render(<Checkbox aria-label="Select row" />);
    expect(screen.getByRole('checkbox', { name: 'Select row' })).not.toBeNull();
  });
});
