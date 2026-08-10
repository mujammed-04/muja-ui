/**
 * A minimal `react-native` stand-in for unit tests.
 *
 * The real react-native package ships untranspiled Flow and expects a native
 * runtime, so it cannot be loaded under vitest/jsdom. Component tests here are
 * about *our* logic — which style a variant resolves to, whether `loading`
 * blocks a press, what accessibility props land on the host element — not about
 * React Native's own rendering. This stub renders each RN primitive as a plain
 * host element carrying the same props, so Testing Library can assert on them.
 *
 * It is test-only: nothing in `src/` imports it, and it never ships.
 */
import {
  createContext,
  createElement,
  forwardRef,
  useContext,
  useMemo,
  type ComponentType,
  type ReactNode,
} from 'react';

type AnyProps = Record<string, unknown>;

const FLATTEN_DEPTH = 12;

function flattenStyle(style: unknown, depth = 0): AnyProps {
  if (!style || depth > FLATTEN_DEPTH) return {};
  if (Array.isArray(style)) {
    return style.reduce<AnyProps>((acc, entry) => ({ ...acc, ...flattenStyle(entry, depth + 1) }), {});
  }
  // Pressable takes `style` as a function of the press state; resolve the rest
  // state so tests can assert on it.
  if (typeof style === 'function') {
    return flattenStyle((style as (state: { pressed: boolean }) => unknown)({ pressed: false }), depth + 1);
  }
  if (typeof style === 'object') return { ...(style as AnyProps) };
  return {};
}

interface A11yState {
  checked?: boolean | 'mixed';
  disabled?: boolean;
  selected?: boolean;
  expanded?: boolean;
  busy?: boolean;
}

/**
 * React Native's accessibility props are the equivalents of ARIA attributes.
 * Translating them lets the tests query by role and label — i.e. assert the
 * accessibility contract the component actually ships.
 */
function a11yProps({
  accessibilityRole,
  accessibilityLabel,
  accessibilityState,
  accessibilityValue,
  accessibilityLiveRegion,
  accessibilityElementsHidden,
  accessibilityHint,
  ...rest
}: AnyProps): AnyProps {
  const state = (accessibilityState ?? {}) as A11yState;
  // A few RN role names differ from their ARIA equivalents.
  const ROLE_ALIASES: Record<string, string> = { image: 'img', header: 'heading' };
  const value = (accessibilityValue ?? {}) as { text?: string; min?: number; max?: number; now?: number };
  const props: AnyProps = { ...rest };

  if (accessibilityRole) {
    const role = String(accessibilityRole);
    props.role = ROLE_ALIASES[role] ?? role;
  }
  if (accessibilityLabel) props['aria-label'] = accessibilityLabel;
  if (accessibilityHint) props['aria-description'] = accessibilityHint;
  if (accessibilityLiveRegion) props['aria-live'] = accessibilityLiveRegion;
  if (accessibilityElementsHidden) props['aria-hidden'] = true;
  if (state.checked !== undefined) props['aria-checked'] = String(state.checked);
  if (state.selected !== undefined) props['aria-selected'] = String(state.selected);
  if (state.expanded !== undefined) props['aria-expanded'] = String(state.expanded);
  if (state.busy !== undefined) props['aria-busy'] = String(state.busy);
  if (state.disabled) {
    props['aria-disabled'] = true;
    props['data-disabled'] = 'true';
  }
  if (value.text !== undefined) props['aria-valuetext'] = value.text;
  if (value.now !== undefined) props['aria-valuenow'] = value.now;

  return props;
}

/**
 * Host elements can't take an object `style` with RN-only keys in jsdom without
 * React warning, so the flattened style is exposed as a `data-style` JSON
 * attribute and tests read it through `styleOf()`.
 */
function hostProps({ style, children, ...rest }: AnyProps): AnyProps {
  const flat = flattenStyle(style);
  const props: AnyProps = { ...a11yProps(rest), children };
  if (Object.keys(flat).length > 0) props['data-style'] = JSON.stringify(flat);
  return props;
}

function makeHost(tag: string, testId: string): ComponentType<AnyProps> {
  const Component = forwardRef<unknown, AnyProps>(function Host(props, ref) {
    const { onPress, onPressIn, onPressOut, onLongPress, disabled, children, ...rest } = props;
    const resolvedChildren =
      typeof children === 'function'
        ? (children as (state: { pressed: boolean }) => ReactNode)({ pressed: false })
        : children;

    const handlers: AnyProps = {};
    if (onPress) handlers.onClick = disabled ? undefined : onPress;
    if (onPressIn) handlers.onMouseDown = onPressIn;
    if (onPressOut) handlers.onMouseUp = onPressOut;
    if (onLongPress) handlers.onDoubleClick = onLongPress;

    return createElement(tag, {
      ref,
      'data-rn': testId,
      ...hostProps({ ...rest, children: resolvedChildren }),
      ...handlers,
      // `disabled` is only a valid DOM attribute on form elements.
      ...(disabled && (tag === 'button' || tag === 'input') ? { disabled: true } : {}),
      ...(disabled ? { 'data-disabled': 'true' } : {}),
    });
  });
  Component.displayName = testId;
  return Component as ComponentType<AnyProps>;
}

export const View = makeHost('div', 'View');
export const Text = makeHost('span', 'Text');
export const Pressable = makeHost('button', 'Pressable');
export const TouchableOpacity = makeHost('button', 'TouchableOpacity');
export const ScrollView = makeHost('div', 'ScrollView');
export const Image = makeHost('img', 'Image');
export const ActivityIndicator = makeHost('div', 'ActivityIndicator');
export const KeyboardAvoidingView = makeHost('div', 'KeyboardAvoidingView');
export const FlatList = makeHost('div', 'FlatList');
export const SafeAreaView = makeHost('div', 'SafeAreaView');

export const TextInput = forwardRef<unknown, AnyProps>(function TextInput(props, ref) {
  const {
    style,
    value,
    onChangeText,
    placeholderTextColor: _placeholderTextColor,
    multiline,
    numberOfLines: _numberOfLines,
    editable,
    secureTextEntry,
    keyboardType: _keyboardType,
    autoCapitalize: _autoCapitalize,
    autoCorrect: _autoCorrect,
    textAlignVertical: _textAlignVertical,
    selectionColor: _selectionColor,
    returnKeyType: _returnKeyType,
    onSubmitEditing: _onSubmitEditing,
    maxLength,
    ...rest
  } = props;
  const flat = flattenStyle(style);
  const Tag = (multiline ? 'textarea' : 'input') as 'input';
  return (
    <Tag
      ref={ref as never}
      data-rn="TextInput"
      data-style={Object.keys(flat).length > 0 ? JSON.stringify(flat) : undefined}
      value={value as string | undefined}
      onChange={(event) => (onChangeText as ((text: string) => void) | undefined)?.(event.target.value)}
      readOnly={editable === false}
      type={secureTextEntry ? 'password' : undefined}
      maxLength={maxLength as number | undefined}
      {...(rest as AnyProps)}
    />
  );
});

export const Modal = ({ visible = true, children, ...rest }: AnyProps) =>
  visible ? (
    <div data-rn="Modal" {...(rest as AnyProps)}>
      {children as ReactNode}
    </div>
  ) : null;

export const StyleSheet = {
  create: <T extends Record<string, unknown>>(styles: T): T => styles,
  flatten: (style: unknown): AnyProps => flattenStyle(style),
  hairlineWidth: 1,
  absoluteFill: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } as const,
};

export const Platform = {
  OS: 'ios' as const,
  select: <T,>(spec: { ios?: T; android?: T; native?: T; default?: T }): T | undefined =>
    spec.ios ?? spec.native ?? spec.default,
};

export const Dimensions = {
  get: () => ({ width: 390, height: 844, scale: 3, fontScale: 1 }),
  addEventListener: () => ({ remove: () => {} }),
};

export const useWindowDimensions = () => ({ width: 390, height: 844, scale: 3, fontScale: 1 });

let stubColorScheme: 'light' | 'dark' = 'light';

export const Appearance = {
  getColorScheme: () => stubColorScheme,
  setColorScheme: (scheme: 'light' | 'dark') => {
    stubColorScheme = scheme;
  },
  addChangeListener: () => ({ remove: () => {} }),
};

export const useColorScheme = () => stubColorScheme;

class StubAnimatedValue {
  constructor(public value: number) {}
  setValue(next: number) {
    this.value = next;
  }
  interpolate() {
    return this;
  }
  addListener() {
    return '0';
  }
  removeListener() {}
  stopAnimation() {}
}

const stubAnimation = () => ({
  start: (callback?: (result: { finished: boolean }) => void) => callback?.({ finished: true }),
  stop: () => {},
  reset: () => {},
});

export const Animated = {
  View,
  Text,
  ScrollView,
  Value: StubAnimatedValue,
  timing: stubAnimation,
  spring: stubAnimation,
  decay: stubAnimation,
  loop: stubAnimation,
  sequence: stubAnimation,
  parallel: stubAnimation,
  delay: stubAnimation,
  event: () => () => {},
  createAnimatedComponent: <P,>(component: ComponentType<P>) => component,
};

export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t,
  in: (fn: (t: number) => number) => fn,
  out: (fn: (t: number) => number) => fn,
  inOut: (fn: (t: number) => number) => fn,
  bezier: () => (t: number) => t,
};

export const PanResponder = {
  create: (config: AnyProps) => ({ panHandlers: {}, ...config }),
};

export const LayoutAnimation = {
  configureNext: () => {},
  Presets: { easeInEaseOut: {}, linear: {}, spring: {} },
};

export const AccessibilityInfo = {
  isReduceMotionEnabled: () => Promise.resolve(false),
  addEventListener: () => ({ remove: () => {} }),
  announceForAccessibility: () => {},
};

export const BackHandler = {
  addEventListener: () => ({ remove: () => {} }),
};

const SafeAreaContext = createContext({ top: 0, bottom: 0, left: 0, right: 0 });

export const useSafeAreaInsetsStub = () => useContext(SafeAreaContext);

export const I18nManager = { isRTL: false };

export const Keyboard = {
  dismiss: () => {},
  addListener: () => ({ remove: () => {} }),
};

export const useAnimatedValueStub = (initial: number) =>
  useMemo(() => new StubAnimatedValue(initial), [initial]);

export default {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
  Platform,
  Animated,
};
