'use client';

import { warnOnce } from '@muja-ui/utils';
import type { ReactElement, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** Auto-dismiss delay in ms; overrides the provider default. `0` keeps the toast until dismissed. */
  duration?: number;
  /** Optional action (e.g. an "Undo" button) — snackbar-style usage. */
  action?: ReactNode;
}

interface ToastRecord extends ToastOptions {
  id: number;
}

export interface ToastContextValue {
  /** Shows a toast; returns its id for manual dismissal. */
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** Access `toast()`/`dismiss()`. Must be called under `<ToastProvider>`. */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (ctx === null) {
    warnOnce('useToast() must be called inside <ToastProvider>.');
    return { toast: () => -1, dismiss: () => undefined };
  }
  return ctx;
}

export interface ToastProviderProps {
  children?: ReactNode;
  placement?: ToastPlacement;
  /** Default auto-dismiss delay in ms. Defaults to 5000. */
  duration?: number;
  /** Accessible name of the notifications region. */
  regionLabel?: string;
  /** Accessible name of each toast's close button. */
  dismissLabel?: string;
}

/**
 * Toast notifications: wrap the app once, then call `useToast().toast(…)`
 * anywhere below. Statuses announce politely; `tone="danger"` announces as an
 * alert. Client component — import from `@muja-ui/web/client`.
 *
 * ```tsx
 * const { toast } = useToast();
 * toast({ title: 'Booking confirmed', tone: 'success' });
 * toast({ title: 'Deleted', action: <Button size="sm" variant="ghost" onClick={undo}>Undo</Button> });
 * ```
 */
export function ToastProvider({
  children,
  placement = 'bottom-right',
  duration = 5000,
  regionLabel = 'Notifications',
  dismissLabel = 'Dismiss notification',
}: ToastProviderProps): ReactElement {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    const timer = timers.current.get(id);
    if (timer !== undefined) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++;
      setToasts((current) => [...current, { ...options, id }]);
      const delay = options.duration ?? duration;
      if (delay > 0) timers.current.set(id, setTimeout(() => dismiss(id), delay));
      return id;
    },
    [duration, dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((timer) => clearTimeout(timer));
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="mj-toaster" data-placement={placement} aria-label={regionLabel}>
        {toasts.map(({ id, title, description, tone = 'neutral', action }) => (
          <div
            key={id}
            role={tone === 'danger' ? 'alert' : 'status'}
            className="mj-toast"
            data-tone={tone}
          >
            <div className="mj-toast__content">
              <div className="mj-toast__title">{title}</div>
              {description != null ? (
                <div className="mj-toast__description">{description}</div>
              ) : null}
            </div>
            {action != null ? <div className="mj-toast__action">{action}</div> : null}
            <button
              type="button"
              className="mj-toast__close"
              aria-label={dismissLabel}
              onClick={() => dismiss(id)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
