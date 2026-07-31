---
'@muja-ui/web': minor
---

Modal, Drawer and BottomSheet now trap focus: Tab/Shift+Tab wrap inside the
panel, and focus returns to the previously focused element on close. The
shared behaviour (Escape, scroll lock, focus management) lives in one internal
hook used by all three dialogs.
