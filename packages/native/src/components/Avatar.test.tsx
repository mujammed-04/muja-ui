import { sduLightTheme } from '@muja-ui/theme-sdu';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderThemed, styleOf } from '../../test/utils';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders the image with the name as its accessible label', () => {
    renderThemed(<Avatar source="/photo.jpg" name="Aruzhan Bekova" />);
    expect(screen.getByLabelText('Aruzhan Bekova')).toBeTruthy();
  });

  it('falls back to initials when there is no image', () => {
    renderThemed(<Avatar name="Aruzhan Bekova" />);
    expect(screen.getByText('AB')).toBeTruthy();
  });

  it('switches to initials when the image fails to load', () => {
    renderThemed(<Avatar source="/broken.jpg" name="Aruzhan Bekova" />);
    fireEvent.error(screen.getByLabelText('Aruzhan Bekova'));
    expect(screen.getByText('AB')).toBeTruthy();
  });

  it('shows a "?" when there is neither an image nor a name', () => {
    renderThemed(<Avatar />);
    expect(screen.getByText('?')).toBeTruthy();
  });

  // The fill is a near-page colour in both themes, so the ring is the only thing
  // separating the circle from the page behind it.
  it('rings the circle so it is visible against the page', () => {
    renderThemed(<Avatar name="Aruzhan Bekova" />);
    const style = styleOf(screen.getByText('AB').parentElement as HTMLElement);
    expect(style.borderColor).toBe(sduLightTheme.colors.borderStrong);
    expect(style.borderWidth).toBeGreaterThan(0);
  });

  it('keeps the ring inside the requested size', () => {
    renderThemed(<Avatar name="Aruzhan Bekova" size={96} />);
    const style = styleOf(screen.getByText('AB').parentElement as HTMLElement);
    expect(style.width).toBe(96);
    expect(style.height).toBe(96);
  });
});
