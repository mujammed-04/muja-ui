---
"@muja-ui/native": patch
---

`Tabs` with `scrollable` no longer lets its row be squeezed by a sibling that
overflows the column (typically a `FlatList` without `flex: 1`). The scroller
kept React Native's default `flexShrink: 1`, so it gave up height first, and
the labels — measured against the squeezed row — were cut off just above the
baseline. The row now opts out of shrinking as well as growing.
