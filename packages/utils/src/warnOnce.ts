declare const process: { env?: Record<string, string | undefined> } | undefined;
declare const console: { warn: (...args: unknown[]) => void };

const warned = new Set<string>();

/** Logs a development-only warning a single time per unique message. */
export function warnOnce(message: string): void {
  const isProduction = typeof process !== 'undefined' && process?.env?.NODE_ENV === 'production';
  if (isProduction || warned.has(message)) return;
  warned.add(message);
  console.warn(`[muja-ui] ${message}`);
}
