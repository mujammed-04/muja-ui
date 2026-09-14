---
'@muja-ui/native': patch
---

ActionSheet (iOS): give the Cancel row its card back

The Cancel row is meant to be its own inset card under the action group, but
its style stacked the shared row style after the card style, and the row's
transparent rest background won — Cancel floated over the dimmed backdrop with
no card until it was pressed. The row now takes its rest colour as a
parameter, and Cancel passes the surface.
