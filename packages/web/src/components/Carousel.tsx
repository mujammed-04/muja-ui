'use client';

import { cx, warnOnce } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement, RefObject } from 'react';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface CarouselContextValue {
  viewportRef: RefObject<HTMLDivElement | null>;
  canPrev: boolean;
  canNext: boolean;
  scrollByPage: (direction: 1 | -1) => void;
  update: () => void;
}

/**
 * Imperative handle for driving a carousel from outside — autoplay timers,
 * custom indicator dots, "jump to slide" links.
 */
export interface CarouselApi {
  /** Scroll a slide (by index) to the start of the viewport. */
  scrollTo: (index: number) => void;
  /** Next slide, wrapping to the first when `loop` is set. */
  scrollNext: () => void;
  /** Previous slide, wrapping to the last when `loop` is set. */
  scrollPrev: () => void;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarouselContext(component: string): CarouselContextValue {
  const ctx = useContext(CarouselContext);
  if (ctx === null) {
    warnOnce(`<${component}> must be rendered inside <Carousel>.`);
    return {
      viewportRef: { current: null },
      canPrev: false,
      canNext: false,
      scrollByPage: () => undefined,
      update: () => undefined,
    };
  }
  return ctx;
}

export interface CarouselProps extends ComponentPropsWithRef<'section'> {
  /** Accessible name for the carousel region. */
  'aria-label': string;
  /** Wrap around at the ends, so the controls never disable. */
  loop?: boolean;
  /** Fires with the slide index whenever the snapped slide changes. */
  onSlideChange?: (index: number) => void;
  /** Receives an imperative handle — use it for autoplay or custom indicators. */
  apiRef?: RefObject<CarouselApi | null>;
}

function slidesOf(viewport: HTMLDivElement): HTMLElement[] {
  return Array.from(viewport.children) as HTMLElement[];
}

/** Index of the slide whose left edge sits closest to the scroll position. */
function nearestSlide(viewport: HTMLDivElement): number {
  const slides = slidesOf(viewport);
  if (slides.length === 0) return 0;
  let best = 0;
  let bestDistance = Infinity;
  slides.forEach((slide, index) => {
    const distance = Math.abs(slide.offsetLeft - viewport.offsetLeft - viewport.scrollLeft);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });
  return best;
}

/**
 * CSS scroll-snap carousel — native touch/trackpad swiping, no animation
 * engine. Slides are regular flex children; control buttons page by the
 * viewport width. Client component — import from `@muja-ui/web/client`.
 *
 * ```tsx
 * <Carousel aria-label="Featured events">
 *   <CarouselContent>
 *     <CarouselItem>…</CarouselItem>
 *     <CarouselItem>…</CarouselItem>
 *   </CarouselContent>
 *   <CarouselPrevious />
 *   <CarouselNext />
 * </Carousel>
 * ```
 *
 * For autoplay or indicator dots, take the imperative handle and watch the
 * selected slide:
 *
 * ```tsx
 * const api = useRef<CarouselApi>(null);
 * const [index, setIndex] = useState(0);
 * <Carousel aria-label="Banners" loop apiRef={api} onSlideChange={setIndex}>…</Carousel>
 * ```
 */
export function Carousel({
  loop = false,
  onSlideChange,
  apiRef,
  className,
  children,
  ...rest
}: CarouselProps): ReactElement {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const selectedIndex = useRef(0);
  const onSlideChangeRef = useRef(onSlideChange);
  onSlideChangeRef.current = onSlideChange;

  const update = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const atStart = viewport.scrollLeft <= 0;
    const atEnd = viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 1;
    const multiple = slidesOf(viewport).length > 1;
    setCanPrev(loop ? multiple : !atStart);
    setCanNext(loop ? multiple : !atEnd);

    const index = nearestSlide(viewport);
    if (index !== selectedIndex.current) {
      selectedIndex.current = index;
      onSlideChangeRef.current?.(index);
    }
  }, [loop]);

  const scrollTo = useCallback((index: number) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const slide = slidesOf(viewport)[index];
    if (!slide) return;
    viewport.scrollTo?.({ left: slide.offsetLeft - viewport.offsetLeft, behavior: 'smooth' });
  }, []);

  const scrollByPage = useCallback(
    (direction: 1 | -1) => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      if (loop) {
        const count = slidesOf(viewport).length;
        const atStart = viewport.scrollLeft <= 0;
        const atEnd = viewport.scrollLeft >= viewport.scrollWidth - viewport.clientWidth - 1;
        if (direction === 1 && atEnd) return scrollTo(0);
        if (direction === -1 && atStart) return scrollTo(count - 1);
      }

      viewport.scrollBy?.({ left: direction * viewport.clientWidth, behavior: 'smooth' });
    },
    [loop, scrollTo],
  );

  useEffect(() => {
    if (!apiRef) return;
    apiRef.current = {
      scrollTo,
      scrollNext: () => scrollByPage(1),
      scrollPrev: () => scrollByPage(-1),
    };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef, scrollTo, scrollByPage]);

  useEffect(() => {
    update();
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  return (
    <CarouselContext.Provider value={{ viewportRef, canPrev, canNext, scrollByPage, update }}>
      <section
        role="region"
        aria-roledescription="carousel"
        className={cx('mj-carousel', className)}
        {...rest}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

export type CarouselContentProps = ComponentPropsWithRef<'div'>;

export function CarouselContent({
  className,
  onScroll,
  ...rest
}: CarouselContentProps): ReactElement {
  const ctx = useCarouselContext('CarouselContent');
  return (
    <div
      ref={ctx.viewportRef}
      className={cx('mj-carousel__viewport', className)}
      onScroll={(event) => {
        onScroll?.(event);
        ctx.update();
      }}
      {...rest}
    />
  );
}

export type CarouselItemProps = ComponentPropsWithRef<'div'>;

export function CarouselItem({ className, ...rest }: CarouselItemProps): ReactElement {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cx('mj-carousel__item', className)}
      {...rest}
    />
  );
}

export interface CarouselControlProps extends ComponentPropsWithRef<'button'> {
  /** Accessible name. Defaults to "Previous slide" / "Next slide". */
  'aria-label'?: string;
}

export function CarouselPrevious({
  className,
  onClick,
  'aria-label': ariaLabel = 'Previous slide',
  ...rest
}: CarouselControlProps): ReactElement {
  const ctx = useCarouselContext('CarouselPrevious');
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={!ctx.canPrev}
      className={cx('mj-carousel__control', 'mj-carousel__control--prev', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.scrollByPage(-1);
      }}
      {...rest}
    >
      <span className="mj-carousel__chevron" aria-hidden="true" data-direction="left" />
    </button>
  );
}

export function CarouselNext({
  className,
  onClick,
  'aria-label': ariaLabel = 'Next slide',
  ...rest
}: CarouselControlProps): ReactElement {
  const ctx = useCarouselContext('CarouselNext');
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={!ctx.canNext}
      className={cx('mj-carousel__control', 'mj-carousel__control--next', className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.scrollByPage(1);
      }}
      {...rest}
    >
      <span className="mj-carousel__chevron" aria-hidden="true" data-direction="right" />
    </button>
  );
}
