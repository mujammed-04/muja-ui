import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast, type ToastOptions } from './Toast';

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function Trigger({ options }: { options: ToastOptions }): ReactElement {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast(options)}>
      Notify
    </button>
  );
}

function fire(options: ToastOptions, providerProps = {}): void {
  render(
    <ToastProvider {...providerProps}>
      <Trigger options={options} />
    </ToastProvider>,
  );
  fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
}

describe('Toast', () => {
  it('shows a polite status toast with title and description', () => {
    fire({ title: 'Saved', description: 'Booking confirmed', tone: 'success' });
    const toast = screen.getByRole('status');
    expect(toast.getAttribute('data-tone')).toBe('success');
    expect(toast.textContent).toContain('Saved');
    expect(toast.textContent).toContain('Booking confirmed');
  });

  it('announces danger tones as alerts', () => {
    fire({ title: 'Request failed', tone: 'danger' });
    expect(screen.getByRole('alert')).not.toBeNull();
  });

  it('auto-dismisses after the duration', () => {
    fire({ title: 'Saved' }, { duration: 3000 });
    expect(screen.getByRole('status')).not.toBeNull();
    act(() => vi.advanceTimersByTime(3001));
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('keeps duration-0 toasts until dismissed via the close button', () => {
    fire({ title: 'Sticky', duration: 0 });
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByRole('status')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('renders an action for snackbar-style usage', () => {
    fire({
      title: 'Deleted',
      action: (
        <button type="button" onClick={() => undefined}>
          Undo
        </button>
      ),
    });
    expect(screen.getByRole('button', { name: 'Undo' })).not.toBeNull();
  });
});
