/**
 * Platform-neutral icon definition: stroke-style SVG path data on a 24×24
 * viewBox by default. Web renders `<svg>`; native will render via
 * react-native-svg with the same data.
 */
export interface IconDefinition {
  name: string;
  paths: readonly string[];
  viewBox?: string;
}

const registry = new Map<string, IconDefinition>();

/** Registers icons for lookup by string name (e.g. `<Icon icon="check" />`). */
export function registerIcons(icons: Iterable<IconDefinition>): void {
  for (const icon of icons) {
    registry.set(icon.name, icon);
  }
}

export function getIcon(name: string): IconDefinition | undefined {
  return registry.get(name);
}

export function hasIcon(name: string): boolean {
  return registry.has(name);
}

export function getRegisteredIconNames(): string[] {
  return [...registry.keys()];
}
