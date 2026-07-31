import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './Carousel';

const scrollBy = vi.fn();

beforeEach(() => {
  scrollBy.mockClear();
  // jsdom has no layout: fake a scrollable viewport (1000px content, 500px visible).
  Object.defineProperties(HTMLElement.prototype, {
    scrollWidth: { configurable: true, get: () => 1000 },
    clientWidth: { configurable: true, get: () => 500 },
  });
  HTMLElement.prototype.scrollBy = scrollBy as unknown as HTMLElement['scrollBy'];
});

afterEach(cleanup);

function renderCarousel(): void {
  render(
    <Carousel aria-label="Featured events">
      <CarouselContent>
        <CarouselItem>Slide one</CarouselItem>
        <CarouselItem>Slide two</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>,
  );
}

describe('Carousel', () => {
  it('exposes carousel/slide semantics', () => {
    renderCarousel();
    const region = screen.getByRole('region', { name: 'Featured events' });
    expect(region.getAttribute('aria-roledescription')).toBe('carousel');
    const slides = screen.getAllByRole('group');
    expect(slides).toHaveLength(2);
    expect(slides[0]!.getAttribute('aria-roledescription')).toBe('slide');
  });

  it('pages forward by the viewport width', () => {
    renderCarousel();
    const next = screen.getByRole('button', { name: 'Next slide' });
    expect((next as HTMLButtonElement).disabled).toBe(false);
    fireEvent.click(next);
    expect(scrollBy).toHaveBeenCalledWith({ left: 500, behavior: 'smooth' });
  });

  it('disables the previous control at the start', () => {
    renderCarousel();
    expect(
      (screen.getByRole('button', { name: 'Previous slide' }) as HTMLButtonElement).disabled,
    ).toBe(true);
  });
});
