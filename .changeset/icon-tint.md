---
'@muja-ui/native': minor
'@muja-ui/icons': minor
---

`Icon` gains a `tint` escape hatch for platform APIs that hand you an
already-resolved colour instead of letting you choose a token — React
Navigation's `tabBarIcon({ color })` is the case it was added for. Without it a
consumer has to hand-roll its own `Svg`/`Path` wrapper to honour the tab tint.
Documented as not being a licence for new colour values; `color` stays the way
to pick one.

Adds `delete`, `fingerprint` and `scan-face` icons for PIN entry and biometric
unlock UI.

The test stubs now translate React Native accessibility props on SVG elements
too, so `Icon`'s decorative-vs-labelled behaviour is actually asserted rather
than assumed.
