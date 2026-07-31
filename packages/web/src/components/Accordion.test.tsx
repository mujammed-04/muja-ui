import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

afterEach(cleanup);

function renderAccordion(props: Parameters<typeof Accordion>[0] = {}): void {
  render(
    <Accordion {...props}>
      <AccordionItem value="one">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>First content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionContent>Second content</AccordionContent>
      </AccordionItem>
    </Accordion>,
  );
}

describe('Accordion', () => {
  it('wires triggers to labelled regions and starts closed', () => {
    renderAccordion();
    const trigger = screen.getByRole('button', { name: 'First' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByText('First content').closest('[role="region"]')!.hasAttribute('hidden')).toBe(
      true,
    );
    expect(trigger.closest('h3')).not.toBeNull();
  });

  it('opens on click and closes others in single mode', () => {
    renderAccordion({ defaultValue: ['one'] });
    expect(
      screen.getByRole('button', { name: 'First' }).getAttribute('aria-expanded'),
    ).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(
      screen.getByRole('button', { name: 'First' }).getAttribute('aria-expanded'),
    ).toBe('false');
    expect(
      screen.getByRole('button', { name: 'Second' }).getAttribute('aria-expanded'),
    ).toBe('true');
  });

  it('keeps several items open in multiple mode and reports changes', () => {
    const onValueChange = vi.fn();
    renderAccordion({ multiple: true, defaultValue: ['one'], onValueChange });
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(onValueChange).toHaveBeenCalledWith(['one', 'two']);
  });

  it('collapses the open item when collapsible', () => {
    renderAccordion({ defaultValue: ['one'] });
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    expect(
      screen.getByRole('button', { name: 'First' }).getAttribute('aria-expanded'),
    ).toBe('false');
  });

  it('moves focus between headers with arrow keys', () => {
    renderAccordion();
    const first = screen.getByRole('button', { name: 'First' });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Second' }));
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
    expect(document.activeElement).toBe(first);
  });
});
