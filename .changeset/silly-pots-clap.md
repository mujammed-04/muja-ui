---
'@muja-ui/web': patch
---

Fix Button label wrapping when an icon is composed as a child

`.mj-button__label` had no layout of its own, so `<Button><Icon />Save</Button>`
broke onto two lines under any CSS reset that sets `svg { display: block }` —
Tailwind Preflight being the common one. The label is now an inline flex row
with the standard gap, matching what `leftIcon`/`rightIcon` already produced.
