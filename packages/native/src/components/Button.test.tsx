import { sduLightTheme } from '@muja-ui/theme-sdu';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
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
    expect(styleOf(screen.getByRole('button')).backgroundColor).toBe(
      sduLightTheme.colors.accent,
    );
  });

  it('outline draws a border instead of a fill', () => {
    renderThemed(<Button variant="outline">Cancel</Button>);
    const style = styleOf(screen.getByRole('button'));
    expect(style.backgroundColor).toBe('transparent');
    expect(style.borderColor).toBe(sduLightTheme.colors.borderStrong);
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
