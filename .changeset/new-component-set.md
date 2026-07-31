---
'@muja-ui/web': minor
---

Add the component set that sdu-web and sdu-app rely on:

- Form: `Input`, `Textarea`, `Label`, `Checkbox`, `Switch`, `Select`, `IconButton`
- Feedback: `Skeleton`, `Spinner`, `Progress`
- Layout & data: `Badge`, `Card` (+ sections), `Table` (+ sections), `Tooltip` (CSS-only)
- Client (`@muja-ui/web/client`, new entry): `Avatar`, `Tabs`, `Modal`

All components are semantic HTML themed via `--mj-*` variables; the main
entry stays RSC-safe — stateful components ship from the new `/client`
subpath, mirroring `@muja-ui/core/client`.
