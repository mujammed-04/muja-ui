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
 */
export function Carousel({ className, children, ...rest }: CarouselProps): ReactElement {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setCanPrev(viewport.scrollLeft > 0);
    setCanNext(viewport.scrollLeft < viewport.scrollWidth - viewport.clientWidth - 1);
  }, []);

  const scrollByPage = useCallback(
    (direction: 1 | -1) => {
      const viewport = viewportRef.current;
      viewport?.scrollBy?.({ left: direction * viewport.clientWidth, behavior: 'smooth' });
    },
    [],
  );

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
