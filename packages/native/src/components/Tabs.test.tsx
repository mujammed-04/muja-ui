import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderThemed, styleOf } from '../../test/utils';
import { Tabs } from './Tabs';

const items = [
  { value: 'clubs', label: 'Клубы' },
  { value: 'departments', label: 'Департаменты' },
  { value: 'faculties', label: 'Факультеты' },
];

describe('Tabs', () => {
  it('keeps the scrollable row at its own height inside an overflowing column', () => {
    renderThemed(<Tabs scrollable items={items} accessibilityLabel="Kinds" />);

    // RN's ScrollView defaults to `flexGrow: 1, flexShrink: 1`. A sibling list
    // measured at its content height overflows the column, and a shrinkable
    // tab bar is what gives — squeezed below its row, its labels lose their
    // descenders. Both flex factors must be off.
    const scroller = screen.getByLabelText('Kinds');
    expect(scroller.getAttribute('data-rn')).toBe('ScrollView');
    expect(styleOf(scroller)).toMatchObject({ flexGrow: 0, flexShrink: 0 });
  });

  it('renders a plain row when not scrollable', () => {
    renderThemed(<Tabs items={items} accessibilityLabel="Kinds" />);

    expect(screen.getByLabelText('Kinds').getAttribute('data-rn')).toBe('View');
  });

  it('gives every label an explicit line box', () => {
    renderThemed(<Tabs scrollable items={items} accessibilityLabel="Kinds" />);

    for (const { label } of items) {
      expect(styleOf(screen.getByText(label)).lineHeight).toBeGreaterThan(0);
    }
  });
});
