import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Textarea } from './Textarea';

afterEach(cleanup);

describe('Textarea', () => {
  it('renders a textarea with vertical resize by default', () => {
    render(<Textarea placeholder="Description" />);
    const textarea = screen.getByPlaceholderText('Description');
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea.getAttribute('data-resize')).toBe('vertical');
  });

  it('exposes invalid state via aria-invalid', () => {
    render(<Textarea placeholder="Bio" invalid />);
    expect(screen.getByPlaceholderText('Bio').getAttribute('aria-invalid')).toBe('true');
  });
});
