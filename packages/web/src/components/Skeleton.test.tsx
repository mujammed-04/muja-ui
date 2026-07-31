import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Skeleton } from './Skeleton';

afterEach(cleanup);

describe('Skeleton', () => {
  it('is hidden from assistive technology', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstElementChild!;
    expect(skeleton.getAttribute('aria-hidden')).toBe('true');
    expect(skeleton.getAttribute('data-variant')).toBe('rect');
  });

  it('applies dimensions and variant', () => {
    const { container } = render(<Skeleton variant="circle" width={40} height={40} />);
    const skeleton = container.firstElementChild as HTMLElement;
    expect(skeleton.getAttribute('data-variant')).toBe('circle');
    expect(skeleton.style.width).toBe('40px');
    expect(skeleton.style.height).toBe('40px');
  });
});
