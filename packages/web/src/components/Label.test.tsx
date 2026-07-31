import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Label } from './Label';

afterEach(cleanup);

describe('Label', () => {
  it('renders a semantic label linked to a control', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    const label = screen.getByText('Email');
    expect(label.tagName).toBe('LABEL');
    expect(label.getAttribute('for')).toBe('email');
  });

  it('shows a decorative required marker hidden from screen readers', () => {
    render(<Label required>Name</Label>);
    const marker = screen.getByText('*');
    expect(marker.getAttribute('aria-hidden')).toBe('true');
  });
});
