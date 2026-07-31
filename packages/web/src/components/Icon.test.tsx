import { registerIcons } from '@muja-ui/core';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Icon } from './Icon';

const check = { name: 'check', viewBox: '0 0 24 24', paths: ['M20 6 9 17l-5-5'] };

afterEach(cleanup);

describe('Icon', () => {
  it('is decorative by default', () => {
    const { container } = render(<Icon icon={check} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.getAttribute('stroke')).toBe('currentColor');
    expect(svg?.querySelector('path')?.getAttribute('d')).toBe(check.paths[0]);
  });

  it('becomes a labelled image when given a label', () => {
    render(<Icon icon={check} label="Completed" />);
    const svg = screen.getByRole('img', { name: 'Completed' });
    expect(svg.getAttribute('aria-hidden')).toBeNull();
  });

  it('resolves registered icons by name and sizes in px', () => {
    registerIcons([check]);
    const { container } = render(<Icon icon="check" size={16} />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('16');
    expect(svg?.getAttribute('height')).toBe('16');
  });

  it('renders nothing for unknown icon names', () => {
    const { container } = render(<Icon icon="does-not-exist" />);
    expect(container.querySelector('svg')).toBeNull();
  });
});
