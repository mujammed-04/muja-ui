---
'@muja-ui/web': minor
---

Add the overlay/navigation set that previously required Radix in sdu-web —
written from scratch per the blueprint's no-UI-library rule:

- `Popover` and `DropdownMenu` (WAI-ARIA menu-button pattern) — CSS-anchored
  positioning, outside-click and Escape handling
- `Drawer` — edge-anchored sheet with the Modal behaviours (backdrop, Escape,
  focus, scroll lock)
- `Calendar` — single-date WAI-ARIA grid with full keyboard navigation,
  month/weekday names via `Intl` (no date library)
- `Carousel` — CSS scroll-snap based, native swiping, paging controls
- `ScrollArea` — slim theme-aware scrollbars, SSR-safe (main entry)

All stateful components ship from `@muja-ui/web/client`; `ScrollArea` is pure
CSS and stays in the RSC-safe main entry.
