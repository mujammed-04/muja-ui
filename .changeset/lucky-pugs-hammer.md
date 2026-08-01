---
'@muja-ui/web': minor
---

Carousel: looping, slide observation and an imperative handle

`<Carousel>` gains three optional props so apps can build autoplay banners and
indicator dots without reaching for an animation engine:

- `loop` — the controls wrap around instead of disabling at the ends.
- `onSlideChange(index)` — fires when the snapped slide changes.
- `apiRef` — receives a `CarouselApi` with `scrollTo`, `scrollNext` and
  `scrollPrev`.

The default behaviour is unchanged: without these props the carousel is still
the plain CSS scroll-snap one.
