import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

afterEach(cleanup);

function renderTabs(props: Parameters<typeof Tabs>[0] = {}): void {
  render(
    <Tabs defaultValue="upcoming" {...props}>
      <TabList aria-label="Events">
        <Tab value="upcoming">Upcoming</Tab>
        <Tab value="past">Past</Tab>
      </TabList>
      <TabPanel value="upcoming">Upcoming events</TabPanel>
      <TabPanel value="past">Past events</TabPanel>
    </Tabs>,
  );
}

describe('Tabs', () => {
  it('wires the WAI-ARIA tabs pattern', () => {
    renderTabs();
    const selected = screen.getByRole('tab', { name: 'Upcoming' });
    expect(selected.getAttribute('aria-selected')).toBe('true');
    const panel = screen.getByRole('tabpanel');
    expect(panel.textContent).toBe('Upcoming events');
    expect(selected.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(selected.id);
  });

  it('switches panels on click and reports the change', () => {
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });
    fireEvent.click(screen.getByRole('tab', { name: 'Past' }));
    expect(onValueChange).toHaveBeenCalledWith('past');
    expect(screen.getByRole('tabpanel').textContent).toBe('Past events');
  });

  it('moves selection with arrow keys', () => {
    renderTabs();
    const first = screen.getByRole('tab', { name: 'Upcoming' });
    first.focus();
    fireEvent.keyDown(first.parentElement!, { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'Past' }).getAttribute('aria-selected')).toBe('true');
  });

  it('supports controlled usage', () => {
    render(
      <Tabs value="past" onValueChange={() => undefined}>
        <TabList aria-label="Events">
          <Tab value="upcoming">Upcoming</Tab>
          <Tab value="past">Past</Tab>
        </TabList>
        <TabPanel value="past">Past events</TabPanel>
      </Tabs>,
    );
    expect(screen.getByRole('tab', { name: 'Past' }).getAttribute('aria-selected')).toBe('true');
    fireEvent.click(screen.getByRole('tab', { name: 'Upcoming' }));
    // Still controlled by the prop.
    expect(screen.getByRole('tab', { name: 'Past' }).getAttribute('aria-selected')).toBe('true');
  });
});
