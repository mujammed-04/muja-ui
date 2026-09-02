import { sduLightTheme } from '@muja-ui/theme-sdu';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { __setPlatformOS } from '../../test/react-native-stub';
import { renderThemed, styleOf } from '../../test/utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders its label and calls onPress', () => {
    const onPress = vi.fn();
    renderThemed(<Button onPress={onPress}>Save</Button>);

    const button = screen.getByRole('button');
    expect(screen.getByText('Save')).toBeTruthy();
    fireEvent.click(button);
    expect(onPress).toHaveBeenCalledOnce();
  });

  it('resolves the variant to semantic theme colors', () => {
    renderThemed(<Button variant="accent">Book</Button>);
    expect(styleOf(screen.getByRole('button')).backgroundColor).toBe(sduLightTheme.colors.accent);
  });

  it('on iOS, outline is a tinted fill — UIKit has no stroked buttons', () => {
    renderThemed(<Button variant="outline">Cancel</Button>);
    const style = styleOf(screen.getByRole('button'));
    expect(style.backgroundColor).toBe(sduLightTheme.colors.primarySubtle);
    expect(style.borderWidth).toBeUndefined();
    expect(styleOf(screen.getByText('Cancel')).color).toBe(sduLightTheme.colors.primaryText);
  });

  it('elsewhere, outline draws a border instead of a fill', () => {
    __setPlatformOS('android');
    renderThemed(<Button variant="outline">Cancel</Button>);
    const style = styleOf(screen.getByRole('button'));
    expect(style.backgroundColor).toBe('transparent');
    expect(style.borderColor).toBe(sduLightTheme.colors.borderStrong);
  });

  it('uses the platform radius and a minimum height that can grow with Dynamic Type', () => {
    renderThemed(<Button size="lg">Save</Button>);
    const style = styleOf(screen.getByRole('button'));
    expect(style.minHeight).toBe(52);
    expect(style.height).toBeUndefined();
    expect(style.borderRadius).toBe(12);
  });

  it('widens a small button to the 44pt touch floor, and leaves taller ones alone', () => {
    const { unmount } = renderThemed(<Button size="sm">Save</Button>);
    expect(JSON.parse(screen.getByRole('button').getAttribute('data-hit-slop') ?? 'null')).toEqual({
      top: 4,
      bottom: 4,
    });
    unmount();
    renderThemed(<Button size="md">Save</Button>);
    expect(screen.getByRole('button').getAttribute('data-hit-slop')).toBeNull();
  });

  it('blocks presses while loading and marks itself busy', () => {
    const onPress = vi.fn();
    renderThemed(
      <Button loading onPress={onPress}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onPress).not.toHaveBeenCalled();
    expect(button.getAttribute('data-disabled')).toBe('true');
  });

  it('hides the left icon while loading', () => {
    renderThemed(
      <Button loading leftIcon={<span data-testid="left" />}>
        Save
      </Button>,
    );
    expect(screen.queryByTestId('left')).toBeNull();
  });

  it('stretches when fullWidth', () => {
    renderThemed(<Button fullWidth>Save</Button>);
    expect(styleOf(screen.getByRole('button')).alignSelf).toBe('stretch');
  });
});
