---
'@muja-ui/web': patch
---

Make Label block-level so it stops sharing a line with its control

`.mj-label` was `inline-flex`, so a label followed by an input rendered on the
same line whenever the control was narrow enough to fit beside it. It is now
`display: flex` with `width: fit-content` — own line, clickable area still
hugging the text.
