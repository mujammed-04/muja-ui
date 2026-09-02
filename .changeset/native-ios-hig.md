---
'@muja-ui/native': minor
---

Render like a native iOS app on iOS, following the Apple Human Interface Guidelines. Android is unchanged.

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
