---
'@muja-ui/native': patch
'@muja-ui/theme-sdu': patch
---

Fix the carousel's page indicator lagging behind the slide, and raise dark-mode contrast to WCAG AA.

- **Carousel** tracked the active slide with `onMomentumScrollEnd`, which fires only once the fling has fully decelerated — so the dots kept pointing at the previous banner for a second or more after the new one had snapped into place. The index is now read during the scroll (`onScroll`, 16ms) and clamped to the real slide range, so a rubber-band overscroll can no longer select a dot that does not exist. The active dot animates its width and colour over `duration.fast` instead of snapping.
- **Carousel dots** draw the inactive state from `textMuted` rather than `borderStrong`. The dots carry meaning, so WCAG 1.4.11 asks 3:1 against the page; the control-border tokens sat at roughly 1.5:1 in both themes, which read as an absent dot rather than an inactive one.
- **Tabs** give their labels an explicit line box and stop the scrollable variant from stretching, which together clipped the descenders off longer labels.
- **sdu-dark** `textMuted` was 3.42:1 on the page and 3.19:1 on a card, under the 4.5:1 AA floor for the list subtitles and empty-state copy it carries — now navy-300 (6.64:1 / 6.18:1). `borderStrong`, the outline of an unchecked checkbox or radio, was 1.61:1 and effectively invisible; now navy-400 (3.42:1). `primary` moves to navy-300 so the active dot and tab underline stay clearly ahead of that, and `onPrimary` becomes navy-950 — white on the lightened primary would be 3.05:1.
- The theme suite now asserts contrast for text on both the page and card backgrounds, and for the non-text marks that carry meaning. The previous test only covered the `on*` pairs, which is why the drift went unnoticed.
