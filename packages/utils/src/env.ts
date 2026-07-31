declare const document: unknown;

/** True when running in a browser-like environment with a DOM. */
export const isBrowser = typeof document !== 'undefined';
