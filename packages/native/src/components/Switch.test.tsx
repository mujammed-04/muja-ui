import { sduLightTheme } from '@muja-ui/theme-sdu';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { __setPlatformOS } from '../../test/react-native-stub';
import { renderThemed } from '../../test/utils';
import { Switch } from './Switch';

describe('Switch', () => {
  it('on iOS renders the system switch tinted with the brand primary', () => {
    renderThemed(<Switch defaultChecked>Notifications</Switch>);
    const native = screen.getByRole('switch');
    expect(native.getAttribute('data-rn')).toBe('Switch');
    expect(native.getAttribute('aria-checked')).toBe('true');
    expect(native.getAttribute('aria-label')).toBe('Notifications');
    expect(JSON.parse(native.getAttribute('data-track') ?? '{}')).toEqual({
      false: sduLightTheme.colors.secondaryActive,
      true: sduLightTheme.colors.primary,
    });
    expect(native.getAttribute('data-thumb')).toBe(sduLightTheme.colors.onPrimary);
    expect(screen.getByText('Notifications')).toBeTruthy();
  });

  it('on iOS reports value changes through onChange', () => {
    const onChange = vi.fn();
    renderThemed(<Switch checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('on iOS a disabled switch ignores presses', () => {
    const onChange = vi.fn();
    renderThemed(<Switch disabled onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('elsewhere draws its own track and toggles the whole row', () => {
    __setPlatformOS('android');
    renderThemed(<Switch>Notifications</Switch>);
    const row = screen.getByRole('switch');
    expect(row.getAttribute('data-rn')).toBe('Pressable');
    expect(row.getAttribute('aria-checked')).toBe('false');
    fireEvent.click(row);
    expect(screen.getByRole('switch').getAttribute('aria-checked')).toBe('true');
  });
});
