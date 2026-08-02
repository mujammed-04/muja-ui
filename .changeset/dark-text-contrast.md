---
'@muja-ui/theme-sdu': patch
---

Bring muted text up to WCAG AA on the surfaces it is actually used on.

Dark `textMuted` was navy-400, which is 3.2:1 on the navy-900 surface, and
light `textMuted` was slate-500, which is 4.4:1 on `bgSubtle` and 4.2:1 on
`bgMuted`. Both are content, not disabled state, so both needed to clear 4.5:1.

The contrast test now covers every text role against `bg`, `bgSubtle`,
`bgMuted` and `surface` in both themes, alongside the existing `on*` pairs.
`textDisabled` is excluded on purpose: WCAG 1.4.3 exempts inactive controls.
