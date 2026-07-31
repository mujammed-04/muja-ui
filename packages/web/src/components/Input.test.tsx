import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Input } from './Input';

afterEach(cleanup);

describe('Input', () => {
  it('renders a text input with default size', () => {
    render(<Input placeholder="Email" />);
    const input = screen.getByPlaceholderText('Email');
    expect(input.tagName).toBe('INPUT');
    expect(input.getAttribute('type')).toBe('text');
    expect(input.getAttribute('data-size')).toBe('md');
  });

  it('exposes invalid state via aria-invalid and a data attribute', () => {
    render(<Input placeholder="Email" invalid />);
    const input = screen.getByPlaceholderText('Email');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('data-invalid')).toBe('true');
  });

  it('keeps custom classes and native props', () => {
    render(<Input placeholder="Age" type="number" className="custom" fullWidth />);
    const input = screen.getByPlaceholderText('Age');
    expect(input.getAttribute('type')).toBe('number');
    expect(input.className).toBe('mj-input custom');
    expect(input.getAttribute('data-full-width')).toBe('true');
  });
});
