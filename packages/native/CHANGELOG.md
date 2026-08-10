# @muja-ui/native

## 0.3.0

### Minor Changes

- 30ea0c0: `Icon` gains a `tint` escape hatch for platform APIs that hand you an
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

### Patch Changes

- Updated dependencies [30ea0c0]
  - @muja-ui/icons@0.3.0

## 0.2.0

### Minor Changes

- 3bb903c: Add `@muja-ui/native` — the React Native / Expo renderer for muja-ui
  (blueprint Phase 6). It shares `@muja-ui/tokens`, `@muja-ui/core`'s theme
  engine and `@muja-ui/theme-sdu` with the web package, and keeps the same prop
  vocabulary (`variant`, `size`, `tone`, `loading`, `invalid`, token style props)
  so a screen reads the same on both platforms.

  Ships primitives (Box, Flex, Stack, HStack, Spacer, Divider, Text, Heading,
  Icon), form components (Button, IconButton, Input, Textarea, Label, FormField,
  Checkbox, Switch, RadioGroup/Radio, Select), feedback (Spinner, Skeleton,
  Progress, EmptyState, ToastProvider/useToast), layout and data display (Screen,
  Container, Section, Card, ListRow, Badge, Chip, Avatar, Tabs, Accordion,
  Calendar, Carousel, Tooltip) and overlays (Modal, BottomSheet, Drawer,
  ActionSheet). Platform-forced API differences from `@muja-ui/web` — value
  callbacks instead of DOM events, `ActionSheet` in place of anchored dropdowns,
  no `Table` — are documented in the package README.

  `@muja-ui/icons` grows from 15 to 60 glyphs (navigation, people, events,
  places, analytics, status and actions) to cover the app screens; the new icons
  use the same 24×24 stroke grid and are added to `allIcons`.

### Patch Changes

- Updated dependencies [3bb903c]
  - @muja-ui/icons@0.2.0
