import { CheckIcon } from '@muja-ui/icons';
import { sduLightTheme } from '@muja-ui/theme-sdu';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderThemed } from '../../test/utils';
import { Icon } from './Icon';

describe('Icon', () => {
  it('strokes the path with the semantic token colour', () => {
    renderThemed(<Icon icon={CheckIcon} color="success" />);
    expect(document.querySelector('path')?.getAttribute('stroke')).toBe(
      sduLightTheme.colors.success,
    );
  });

  it('tint overrides the token, for platform APIs that supply a colour', () => {
    renderThemed(<Icon icon={CheckIcon} color="success" tint="#ff00ff" />);
    expect(document.querySelector('path')?.getAttribute('stroke')).toBe('#ff00ff');
  });

  it('is decorative unless given a label', () => {
    const { unmount } = renderThemed(<Icon icon={CheckIcon} />);
    expect(document.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
    unmount();

    renderThemed(<Icon icon={CheckIcon} label="Completed" />);
    expect(screen.getByRole('img', { name: 'Completed' })).toBeTruthy();
  });

  it('renders nothing for an unregistered name instead of throwing', () => {
    renderThemed(<Icon icon="not-registered" />);
    expect(document.querySelector('svg')).toBeNull();
  });
});
