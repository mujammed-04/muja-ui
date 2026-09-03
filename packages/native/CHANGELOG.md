# @muja-ui/native

## 0.4.0

### Minor Changes

- e79d457: Render like a native iOS app on iOS, following the Apple Human Interface Guidelines. Android is unchanged.

  - **Platform metrics.** `ThemeProvider` now lays Apple's type scale (Body 17, Footnote 13, Large Title 34…) and UIKit radii (10 / 12 / 14 / 20) over the theme on iOS. Colors are untouched. Opt out with `platformAdaptive={false}`; the override is exported as `iosThemeOverride` and applied by `adaptThemeToPlatform()`.
  - **Fonts.** The theme's CSS font stack is reduced to one loadable family via the new `nativeFontFamily()` — the system font (SF Pro / Roboto) unless the theme names a brand face. Passing the raw stack to `fontFamily` used to log "Unrecognized font family" on iOS.
  - **Buttons.** `outline` renders as UIKit's _tinted_ configuration and `ghost` as _plain_ (tint-coloured label). Pressing dims the control instead of recolouring it. Heights are now minimums so labels grow with Dynamic Type; `size="sm"` widens its touch area to 44pt. `size="lg"` uses the larger radius. `pressFeedback()` is exported for app-built pressables.
  - **Switch** is the real `UISwitch` on iOS, tinted with the theme primary.
  - **Checkbox** is round on iOS (the Reminders idiom). Checkbox, Radio and Switch labels use body size on iOS.
  - **Input / Textarea / Select** are filled, borderless fields on iOS with a stroke only for focus and errors; the keyboard follows the color mode and `Input` shows the native clear button while editing.
  - **Tabs `segmented`** is drawn as a `UISegmentedControl` on iOS.
  - **ActionSheet** takes the `UIAlertController` form on iOS: inset grouped cards, centred tint-coloured rows, red destructive rows, a separate bold Cancel card.
  - **BottomSheet** arrives on a critically-damped spring with a fading backdrop; the iOS grabber is 36×5.
  - **Card** `outline` is a hairline on iOS; **ListRow** follows a 44pt table cell; **ModalFooter** gains a hairline separator; **Toast** drops its border on iOS; **Screen** dismisses the keyboard interactively on iOS.

## 0.3.1

### Patch Changes

- Updated dependencies [22963fe]
  - @muja-ui/icons@0.4.0

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
