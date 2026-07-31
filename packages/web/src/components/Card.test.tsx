import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

afterEach(cleanup);

describe('Card', () => {
  it('composes header, title, description, content and footer', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Room A101</CardTitle>
          <CardDescription>Available today</CardDescription>
        </CardHeader>
        <CardContent>Details</CardContent>
        <CardFooter>Actions</CardFooter>
      </Card>,
    );
    const title = screen.getByRole('heading', { name: 'Room A101', level: 3 });
    expect(title.className).toContain('mj-card__title');
    expect(screen.getByText('Available today').className).toContain('mj-card__description');
    expect(screen.getByText('Details').className).toContain('mj-card__content');
    expect(screen.getByText('Actions').className).toContain('mj-card__footer');
  });

  it('defaults to the outline variant and accepts others', () => {
    const { container, rerender } = render(<Card>Body</Card>);
    expect(container.firstElementChild!.getAttribute('data-variant')).toBe('outline');
    rerender(<Card variant="elevated">Body</Card>);
    expect(container.firstElementChild!.getAttribute('data-variant')).toBe('elevated');
  });
});
