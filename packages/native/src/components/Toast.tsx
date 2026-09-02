import { AlertCircleIcon, AlertTriangleIcon, CheckIcon, InfoIcon, XIcon } from '@muja-ui/icons';
import type { SemanticColorToken } from '@muja-ui/tokens';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isIOS } from '../system/platform';
import { shadowStyle } from '../system/styleProps';
import { useTheme } from '../theme/ThemeProvider';
import { Icon } from './Icon';
import { Text } from './Text';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export type ToastPlacement = 'top' | 'bottom';

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** Milliseconds before auto-dismiss. `0` keeps it until dismissed. */
  duration?: number;
  /** Trailing action, e.g. Undo. */
  action?: { label: string; onPress: () => void };
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastEntry extends ToastOptions {
  id: number;
}

const DEFAULT_DURATION = 4000;

const toneIcon = {
  neutral: InfoIcon,
  success: CheckIcon,
  warning: AlertTriangleIcon,
  danger: AlertCircleIcon,
  info: InfoIcon,
} as const;

const toneColor: Record<ToastTone, SemanticColorToken> = {
  neutral: 'textSecondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
};

export interface ToastProviderProps {
  children: ReactNode;
  placement?: ToastPlacement;
  /** Most toasts visible at once; older ones are dropped. */
  max?: number;
}

/**
 * Mounts the toast host and provides `useToast()`. Put it inside the
 * `ThemeProvider` and `SafeAreaProvider`, above the navigator.
 *
 * ```tsx
 * <ToastProvider>
 *   <Stack />
 * </ToastProvider>
 * ```
 */
export function ToastProvider({ children, placement = 'top', max = 3 }: ToastProviderProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [entries, setEntries] = useState<ToastEntry[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++;
      setEntries((current) => [...current, { ...options, id }].slice(-max));
    },
    [max],
  );

  const value = useMemo<ToastContextValue>(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          [placement]: (placement === 'top' ? insets.top : insets.bottom) + theme.space[2],
          paddingHorizontal: theme.space[4],
          gap: theme.space[2],
          zIndex: theme.zIndex.toast,
        }}
      >
        {entries.map((entry) => (
          <ToastCard key={entry.id} entry={entry} onDismiss={dismiss} placement={placement} />
        ))}
      </View>
    </ToastContext.Provider>
  );
}

function ToastCard({
  entry,
  onDismiss,
  placement,
}: {
  entry: ToastEntry;
  onDismiss: (id: number) => void;
  placement: ToastPlacement;
}) {
  const theme = useTheme();
  const tone = entry.tone ?? 'neutral';
  const enter = useRef(new Animated.Value(0)).current;
  // iOS banners float on shadow alone; Android's card keeps its outline.
  const ios = isIOS();

  useEffect(() => {
    Animated.timing(enter, {
      toValue: 1,
      duration: theme.motion.duration.normal,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [enter, theme.motion.duration.normal]);

  useEffect(() => {
    const duration = entry.duration ?? DEFAULT_DURATION;
    if (duration <= 0) return;
    const timer = setTimeout(() => onDismiss(entry.id), duration);
    return () => clearTimeout(timer);
  }, [entry.duration, entry.id, onDismiss]);

  return (
    <Animated.View
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: theme.space[3],
        padding: theme.space[3.5],
        borderRadius: ios ? theme.radius.xl : theme.radius.lg,
        borderWidth: ios ? 0 : theme.borderWidth.thin,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        opacity: enter,
        transform: [
          {
            translateY: enter.interpolate({
              inputRange: [0, 1],
              outputRange: [placement === 'top' ? -16 : 16, 0],
            }),
          },
        ],
        ...shadowStyle(theme.shadow.lg),
      }}
    >
      <Icon icon={toneIcon[tone]} size={18} color={toneColor[tone]} />
      <View style={{ flex: 1, gap: theme.space[0.5] }}>
        <Text size="sm" weight="semibold">
          {entry.title}
        </Text>
        {entry.description ? (
          <Text size="sm" color="textSecondary">
            {entry.description}
          </Text>
        ) : null}
      </View>
      {entry.action ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            entry.action?.onPress();
            onDismiss(entry.id);
          }}
          hitSlop={8}
        >
          <Text size="sm" weight="semibold" color="primaryText">
            {entry.action.label}
          </Text>
        </Pressable>
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          onPress={() => onDismiss(entry.id)}
          hitSlop={8}
        >
          <Icon icon={XIcon} size={16} color="textMuted" />
        </Pressable>
      )}
    </Animated.View>
  );
}

/** Queues toasts. Must be called under a `ToastProvider`. */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('[muja-ui] useToast must be used within a <ToastProvider>.');
  }
  return context;
}
