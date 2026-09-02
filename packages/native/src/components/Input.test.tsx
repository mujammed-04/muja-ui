import { sduLightTheme } from '@muja-ui/theme-sdu';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { __setPlatformOS } from '../../test/react-native-stub';
import { renderThemed, styleOf } from '../../test/utils';
import { Input } from './Input';

const wrapperOf = (input: HTMLElement) => input.parentElement;

describe('Input', () => {
  it('on iOS is a filled, borderless field at rest', () => {
    renderThemed(<Input placeholder="Email" />);
    const wrapper = styleOf(wrapperOf(screen.getByPlaceholderText('Email')));
    expect(wrapper.borderWidth).toBe(0);
    expect(wrapper.backgroundColor).toBe(sduLightTheme.colors.bgMuted);
    expect(wrapper.borderRadius).toBe(10);
    expect(wrapper.minHeight).toBe(44);
  });

  it('on iOS gains a danger stroke when invalid', () => {
    renderThemed(<Input placeholder="Email" invalid />);
    const wrapper = styleOf(wrapperOf(screen.getByPlaceholderText('Email')));
    expect(wrapper.borderWidth).toBe(sduLightTheme.borderWidth.thin);
    expect(wrapper.borderColor).toBe(sduLightTheme.colors.danger);
    expect(screen.getByPlaceholderText('Email').getAttribute('aria-invalid')).toBe('true');
  });

  it('shows the native clear button only when nothing occupies the trailing slot', () => {
    const { unmount } = renderThemed(<Input placeholder="Search" />);
    expect(screen.getByPlaceholderText('Search').getAttribute('clearButtonMode')).toBe(
      'while-editing',
    );
    unmount();
    renderThemed(<Input placeholder="Search" rightElement={<span />} />);
    expect(screen.getByPlaceholderText('Search').getAttribute('clearButtonMode')).toBeNull();
  });

  it('elsewhere keeps the outlined field on a surface', () => {
    __setPlatformOS('android');
    renderThemed(<Input placeholder="Email" />);
    const wrapper = styleOf(wrapperOf(screen.getByPlaceholderText('Email')));
    expect(wrapper.borderWidth).toBe(sduLightTheme.borderWidth.thin);
    expect(wrapper.backgroundColor).toBe(sduLightTheme.colors.surface);
    expect(wrapper.borderRadius).toBe(8);
  });
});
