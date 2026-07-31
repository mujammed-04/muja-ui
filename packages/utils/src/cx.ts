export type ClassValue = string | number | false | null | undefined;

/** Joins truthy class names into a single string. */
export function cx(...values: ClassValue[]): string {
  let out = '';
  for (const value of values) {
    if (value === 0 || value) {
      out += (out ? ' ' : '') + String(value);
    }
  }
  return out;
}
