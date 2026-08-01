---
'@muja-ui/tokens': minor
'@muja-ui/core': minor
'@muja-ui/web': minor
'@muja-ui/theme-sdu': minor
---

Add an `accent` color role, `accent`/`link` button variants and `DropdownMenuCheckboxItem`

- **tokens**: new `accent` palette scale (teal by default) and six semantic
  roles — `accent`, `accentHover`, `accentActive`, `accentSubtle`, `accentText`,
  `onAccent`. Brands with a secondary hue no longer have to overload `warning`.
- **core**: `Variant` gains `'accent'` and `'link'`.
- **web**: `<Button variant="accent">` for emphasis CTAs and
  `<Button variant="link">`, which drops the button box so it aligns with
  surrounding copy. New `<DropdownMenuCheckboxItem>` (`role="menuitemcheckbox"`)
  for multi-select menus — it keeps the menu open by default and joins the
  existing roving-focus order.
- **theme-sdu**: bronze now maps to `accent` instead of `warning`, so
  `variant="accent"` is the brandbook's bronze CTA and `warning` goes back to
  the base amber.
