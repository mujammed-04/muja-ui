import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ScrollArea } from './ScrollArea';

afterEach(cleanup);

describe('ScrollArea', () => {
  it('renders a vertical scroll container by default', () => {
    render(<ScrollArea>Long content</ScrollArea>);
    const area = screen.getByText('Long content');
    expect(area.className).toBe('mj-scroll-area');
    expect(area.getAttribute('data-orientation')).toBe('vertical');
  });

  it('applies bounds and orientation', () => {
    render(
      <ScrollArea orientation="horizontal" maxHeight={320} maxWidth="100%">
        Content
      </ScrollArea>,
    );
    const area = screen.getByText('Content') as HTMLElement;
    expect(area.getAttribute('data-orientation')).toBe('horizontal');
    expect(area.style.maxHeight).toBe('320px');
    expect(area.style.maxWidth).toBe('100%');
  });
});
