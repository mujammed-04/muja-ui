import type { Ref, RefCallback } from 'react';

/** Merges multiple refs (callback or object) into a single callback ref. */
export function mergeRefs<T>(...refs: Array<Ref<T> | null | undefined>): RefCallback<T> {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as { current: T | null }).current = node;
      }
    }
  };
}

/**
 * Runs the external (consumer) handler first, then the internal one unless
 * the consumer called `event.preventDefault()`.
 */
export function composeEventHandlers<E extends { defaultPrevented: boolean }>(
  external: ((event: E) => void) | undefined,
  internal: (event: E) => void,
): (event: E) => void {
  return (event) => {
    external?.(event);
    if (!event.defaultPrevented) {
      internal(event);
    }
  };
}
