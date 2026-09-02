import { sduLightTheme } from '@muja-ui/theme-sdu';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { __setPlatformOS } from '../../test/react-native-stub';
import { renderThemed, styleOf } from '../../test/utils';
import { ActionSheet } from './ActionSheet';

const actions = (onShare = vi.fn(), onCancelRegistration = vi.fn()) => [
  { label: 'Share ticket', onPress: onShare },
  { label: 'Cancel registration', onPress: onCancelRegistration, destructive: true },
];

describe('ActionSheet', () => {
  it('on iOS lays actions out as an alert-style sheet with a separate Cancel card', () => {
    renderThemed(<ActionSheet open onClose={() => {}} title="Ticket" actions={actions()} />);

    const items = screen.getAllByRole('menuitem');
    expect(items).toHaveLength(2);
    // Centred rows, hairline between them.
    expect(styleOf(items[0]!).justifyContent).toBe('center');
    expect(styleOf(items[1]!).borderTopWidth).toBe(1);

    // Tint-coloured labels, red for destructive.
    expect(styleOf(screen.getByText('Share ticket')).color).toBe(sduLightTheme.colors.primaryText);
    expect(styleOf(screen.getByText('Cancel registration')).color).toBe(
      sduLightTheme.colors.dangerText,
    );

    const cancel = screen.getByRole('button', { name: 'Cancel' });
    expect(styleOf(cancel).borderRadius).toBe(14);
    expect(styleOf(screen.getByText('Cancel')).fontWeight).toBe('600');
  });

  it('runs the action and closes', () => {
    const onClose = vi.fn();
    const onShare = vi.fn();
    renderThemed(<ActionSheet open onClose={onClose} actions={actions(onShare)} />);
    fireEvent.click(screen.getByText('Share ticket'));
    expect(onShare).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('omits the Cancel row when asked', () => {
    renderThemed(<ActionSheet open onClose={() => {}} actions={actions()} cancelLabel={null} />);
    expect(screen.queryByText('Cancel')).toBeNull();
  });

  it('elsewhere renders inside the shared bottom sheet', () => {
    __setPlatformOS('android');
    renderThemed(<ActionSheet open onClose={() => {}} title="Ticket" actions={actions()} />);
    expect(screen.getByRole('heading', { name: 'Ticket' })).toBeTruthy();
    expect(styleOf(screen.getAllByRole('menuitem')[0]!).justifyContent).toBeUndefined();
  });
});
