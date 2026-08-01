import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import type { CarouselApi } from './Carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './Carousel';

const scrollBy = vi.fn();
const scrollTo = vi.fn();

beforeEach(() => {
  scrollBy.mockClear();
  scrollTo.mockClear();
  // jsdom has no layout: fake a scrollable viewport (1000px content, 500px visible).
  Object.defineProperties(HTMLElement.prototype, {
    scrollWidth: { configurable: true, get: () => 1000 },
    clientWidth: { configurable: true, get: () => 500 },
  });
  HTMLElement.prototype.scrollBy = scrollBy as unknown as HTMLElement['scrollBy'];
  HTMLElement.prototype.scrollTo = scrollTo as unknown as HTMLElement['scrollTo'];
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

  it('keeps both controls enabled when looping', () => {
    render(
      <Carousel aria-label="Banners" loop>
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );
    expect(
      (screen.getByRole('button', { name: 'Previous slide' }) as HTMLButtonElement).disabled,
    ).toBe(false);
    expect(
      (screen.getByRole('button', { name: 'Next slide' }) as HTMLButtonElement).disabled,
    ).toBe(false);
  });

  it('wraps to the last slide when stepping back from the start with loop', () => {
    render(
      <Carousel aria-label="Banners" loop>
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    // scrollLeft is 0 in jsdom, so this is the start -> wrap to the last slide.
    expect(scrollTo).toHaveBeenCalled();
    expect(scrollBy).not.toHaveBeenCalled();
  });

  it('hands out an imperative api for autoplay', () => {
    const api = createRef<CarouselApi>();
    render(
      <Carousel aria-label="Banners" apiRef={api}>
        <CarouselContent>
          <CarouselItem>One</CarouselItem>
          <CarouselItem>Two</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );
    expect(api.current).not.toBeNull();
    api.current?.scrollNext();
    expect(scrollBy).toHaveBeenCalledWith({ left: 500, behavior: 'smooth' });
  });
});
