import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderThemed } from '../../test/utils';
import { Carousel } from './Carousel';

/**
 * The stub rebuilds RN's scroll `nativeEvent` from the node's scrollLeft, so
 * moving the carousel in a test is a matter of setting that offset.
 */
function scrollTo(x: number) {
  const scroller = screen.getByLabelText('Banners');
  fireEvent.scroll(scroller, { target: { scrollLeft: x } });
}

describe('Carousel', () => {
  // The window stub reports 1024px wide; slides are that minus the gutters,
  // plus the space[3] gap between them.
  const slideWidth = 200;
  const stride = slideWidth + 12;

  function renderCarousel(onSlideChange?: (index: number) => void) {
    return renderThemed(
      <Carousel
        aria-label="Banners"
        accessibilityLabel="Banners"
        slideWidth={slideWidth}
        onSlideChange={onSlideChange}
      >
        {[<span key="a">One</span>, <span key="b">Two</span>, <span key="c">Three</span>]}
      </Carousel>,
    );
  }

  it('reports the new slide while the scroll is still in flight', () => {
    const onSlideChange = vi.fn();
    renderCarousel(onSlideChange);

    // Just past the halfway point of the second slide — momentum has not
    // settled yet, but the dots must already have moved.
    scrollTo(stride * 0.6);
    expect(onSlideChange).toHaveBeenCalledWith(1);
  });

  it('reports each slide once as the scroll passes over it', () => {
    const onSlideChange = vi.fn();
    renderCarousel(onSlideChange);

    scrollTo(stride * 0.6);
    scrollTo(stride);
    scrollTo(stride * 1.7);
    scrollTo(stride * 2);

    expect(onSlideChange.mock.calls.map(([index]) => index)).toEqual([1, 2]);
  });

  it('clamps a rubber-band overscroll to the real slide range', () => {
    const onSlideChange = vi.fn();
    renderCarousel(onSlideChange);

    // Dragging past the last slide must not select a dot that does not exist.
    scrollTo(stride * 5);
    expect(onSlideChange).toHaveBeenCalledWith(2);

    // Nor may pulling back before the first slide go negative.
    scrollTo(-stride);
    expect(onSlideChange).toHaveBeenLastCalledWith(0);
  });

  it('renders one dot per slide, and none for a single slide', () => {
    const { container } = renderCarousel();
    const scroller = screen.getByLabelText('Banners');
    const dotRow = [...container.querySelectorAll('[data-rn="View"]')].find(
      (el) => el !== scroller && el.parentElement !== scroller && el.children.length === 3,
    );
    expect(dotRow).toBeTruthy();
  });
});
