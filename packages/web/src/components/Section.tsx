import { cx } from '@muja-ui/utils';
import type { ComponentPropsWithRef, ReactElement } from 'react';

export interface SectionProps extends ComponentPropsWithRef<'section'> {
  /** Vertical rhythm. Defaults to `md`. */
  spacing?: 'sm' | 'md' | 'lg';
}

/**
 * Semantic `<section>` with consistent vertical padding. Name it via
 * `aria-label`/`aria-labelledby` when it needs landmark semantics.
 *
 * ```tsx
 * <Section spacing="lg" aria-labelledby="events-heading">…</Section>
 * ```
 */
export function Section({ spacing = 'md', className, ...rest }: SectionProps): ReactElement {
  return <section className={cx('mj-section', className)} data-spacing={spacing} {...rest} />;
}
