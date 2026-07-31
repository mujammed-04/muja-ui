import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Tooltip } from './Tooltip';

afterEach(cleanup);

describe('Tooltip', () => {
  it('links the trigger to the tooltip via aria-describedby', () => {
    render(
      <Tooltip label="Copy to clipboard">
        <button type="button">Copy</button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.textContent).toBe('Copy to clipboard');
    const trigger = screen.getByRole('button', { name: 'Copy' }).parentElement!;
    expect(trigger.getAttribute('aria-describedby')).toBe(tooltip.id);
  });

  it('positions via a placement data attribute', () => {
    render(
      <Tooltip label="Hint" placement="right">
        <button type="button">Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole('tooltip').getAttribute('data-placement')).toBe('right');
  });
});
