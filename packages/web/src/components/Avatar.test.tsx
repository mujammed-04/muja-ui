import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Avatar } from './Avatar';

afterEach(cleanup);

describe('Avatar', () => {
  it('renders the image with the name as alt text', () => {
    render(<Avatar src="/photo.jpg" name="Aruzhan Bekova" />);
    const image = screen.getByRole('img', { name: 'Aruzhan Bekova' });
    expect(image.getAttribute('src')).toBe('/photo.jpg');
  });

  it('falls back to initials when there is no image', () => {
    render(<Avatar name="Aruzhan Bekova" />);
    const avatar = screen.getByRole('img', { name: 'Aruzhan Bekova' });
    expect(avatar.textContent).toBe('AB');
  });

  it('switches to the initials fallback when the image fails to load', () => {
    render(<Avatar src="/broken.jpg" name="Aruzhan Bekova" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('img', { name: 'Aruzhan Bekova' }).textContent).toBe('AB');
  });

  it('applies size and shape attributes', () => {
    render(<Avatar name="A" size="lg" shape="square" />);
    const avatar = screen.getByRole('img');
    expect(avatar.getAttribute('data-size')).toBe('lg');
    expect(avatar.getAttribute('data-shape')).toBe('square');
  });
});
