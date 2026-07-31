---
'@muja-ui/web': minor
---

Complete the blueprint component roadmap (phases 8–11):

- `Toast` — `ToastProvider` + `useToast()`, tones, auto-dismiss, optional
  action for snackbar-style usage (covers the blueprint's Snackbar too),
  danger toasts announce as alerts
- `RadioGroup` / `Radio` — native radios, arrow keys for free
- `Accordion` — WAI-ARIA pattern, single/multiple, header arrow navigation
- `BottomSheet` — Modal behaviours plus a grab handle with drag-to-dismiss
- `Chip` — static tag, toggle button (`aria-pressed`) or removable tag
- `Container` / `Section` — layout primitives in the RSC-safe main entry

Chip, Container and Section ship from the main entry; the rest from
`@muja-ui/web/client`.
