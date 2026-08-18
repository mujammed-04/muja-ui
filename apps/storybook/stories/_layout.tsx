import type { ReactNode } from 'react';

/** Horizontal group of variants, wrapping on narrow viewports. */
export function Row({ children }: { children: ReactNode }) {
  return <div className="story-row">{children}</div>;
}

/** Vertical group of variants. */
export function Col({ children }: { children: ReactNode }) {
  return <div className="story-col">{children}</div>;
}

/** A labelled line: monospace token/prop name on the left, the sample on the right. */
export function Labelled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="story-row" style={{ width: '100%' }}>
      <span className="story-label">{label}</span>
      {children}
    </div>
  );
}
