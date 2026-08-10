import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderThemed } from '../../test/utils';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles when uncontrolled', () => {
    renderThemed(<Checkbox>I agree</Checkbox>);
    const box = screen.getByRole('checkbox');
    expect(box.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(box);
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe('true');
  });

  it('when controlled, reports the next value without changing itself', () => {
    const onChange = vi.fn();
    renderThemed(
      <Checkbox checked={false} onChange={onChange}>
        I agree
      </Checkbox>,
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe('false');
  });

  it('reports indeterminate as a mixed state', () => {
    renderThemed(<Checkbox indeterminate />);
    expect(screen.getByRole('checkbox').getAttribute('aria-checked')).toBe('mixed');
  });

  it('does not toggle while disabled', () => {
    const onChange = vi.fn();
    renderThemed(<Checkbox disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });
});
