'use client';

import { useCallback, useState } from 'react';

/**
 * Controlled/uncontrolled state pair. When `controlled` is defined the
 * internal state is ignored and only `onChange` fires.
 */
export function useControllableState<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (value: T) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled !== undefined ? controlled : uncontrolled;

  const setValue = useCallback(
    (next: T) => {
      if (controlled === undefined) setUncontrolled(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );

  return [value, setValue];
}
