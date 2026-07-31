import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Select } from './Select';

afterEach(cleanup);

describe('Select', () => {
  it('renders a native select with options', () => {
    render(
      <Select aria-label="Room">
        <option value="a101">A101</option>
        <option value="b202">B202</option>
      </Select>,
    );
    const select = screen.getByRole('combobox', { name: 'Room' });
    expect(select.tagName).toBe('SELECT');
    expect(screen.getAllByRole('option')).toHaveLength(2);
  });

  it('renders a disabled placeholder option selected by default', () => {
    render(
      <Select aria-label="Room" placeholder="Choose a room">
        <option value="a101">A101</option>
      </Select>,
    );
    const select = screen.getByRole('combobox', { name: 'Room' }) as HTMLSelectElement;
    expect(select.value).toBe('');
    const placeholder = screen.getByRole('option', { name: 'Choose a room' });
    expect((placeholder as HTMLOptionElement).disabled).toBe(true);
  });

  it('fires onChange with the picked value', () => {
    const onChange = vi.fn();
    render(
      <Select aria-label="Room" onChange={onChange}>
        <option value="a101">A101</option>
        <option value="b202">B202</option>
      </Select>,
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'b202' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('combobox') as HTMLSelectElement).value).toBe('b202');
  });

  it('exposes invalid state via aria-invalid', () => {
    render(
      <Select aria-label="Room" invalid>
        <option value="a">A</option>
      </Select>,
    );
    expect(screen.getByRole('combobox').getAttribute('aria-invalid')).toBe('true');
  });
});
