---
'@muja-ui/theme-sdu': patch
---

Fix accent and danger buttons failing WCAG AA

Two on-color pairs in the SDU theme sat under the 4.5:1 floor, so
`<Button variant="accent">` and `<Button variant="danger">` shipped
inaccessible label contrast:

- **accent**: white on bronze-500 was 2.9:1. The label is now navy-900 (7.0:1).
- **danger (light)**: white on rose-500 was 3.7:1. The ramp moves one step
  darker — rose-600 base, rose-700 hover, rose-800 active (4.7:1).
- **danger (dark)**: the bright rose keeps its place and the label becomes
  navy-950 (5.5:1) instead of white.

A test now asserts every `on*` / surface pair in both themes clears AA, so this
cannot regress.
