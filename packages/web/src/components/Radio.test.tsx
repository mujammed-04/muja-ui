import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Radio, RadioGroup } from './Radio';

afterEach(cleanup);

describe('RadioGroup', () => {
  it('renders native radios sharing one name inside a radiogroup', () => {
    render(
      <RadioGroup aria-label="Role">
        <Radio value="student">Student</Radio>
        <Radio value="organizer">Organizer</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole('radiogroup', { name: 'Role' })).not.toBeNull();
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios).toHaveLength(2);
    expect(radios[0]!.name).toBe(radios[1]!.name);
    expect(radios[0]!.name).not.toBe('');
  });

  it('selects on click and reports through onChange', () => {
    const onChange = vi.fn();
    render(
      <RadioGroup aria-label="Role" onChange={onChange}>
        <Radio value="student">Student</Radio>
        <Radio value="organizer">Organizer</Radio>
      </RadioGroup>,
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Organizer' }));
    expect(onChange).toHaveBeenCalledWith('organizer');
    expect((screen.getByRole('radio', { name: 'Organizer' }) as HTMLInputElement).checked).toBe(
      true,
    );
  });

  it('respects controlled value and defaultValue', () => {
    render(
      <RadioGroup aria-label="Role" value="student" onChange={() => undefined}>
        <Radio value="student">Student</Radio>
        <Radio value="organizer">Organizer</Radio>
      </RadioGroup>,
    );
    expect((screen.getByRole('radio', { name: 'Student' }) as HTMLInputElement).checked).toBe(
      true,
    );
  });

  it('disables every radio when the group is disabled', () => {
    render(
      <RadioGroup aria-label="Role" disabled>
        <Radio value="student">Student</Radio>
      </RadioGroup>,
    );
    expect((screen.getByRole('radio') as HTMLInputElement).disabled).toBe(true);
  });
});
