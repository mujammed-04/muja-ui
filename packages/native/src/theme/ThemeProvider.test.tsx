import { sduDarkTheme, sduLightTheme } from '@muja-ui/theme-sdu';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider, useColorMode, useTheme } from './ThemeProvider';

function ThemeProbe() {
  const theme = useTheme();
  const { colorMode, resolvedColorMode, toggleColorMode } = useColorMode();
  return (
    <button onClick={toggleColorMode} data-testid="probe">
      {`${theme.name}|${colorMode}|${resolvedColorMode}`}
    </button>
  );
}

describe('ThemeProvider', () => {
  it('serves the light theme in light mode', () => {
    render(
      <ThemeProvider theme={sduLightTheme} darkTheme={sduDarkTheme} defaultColorMode="light">
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('probe').textContent).toBe('sdu-light|light|light');
  });

  it('serves the dark theme in dark mode', () => {
    render(
      <ThemeProvider theme={sduLightTheme} darkTheme={sduDarkTheme} defaultColorMode="dark">
        <ThemeProbe />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('probe').textContent).toBe('sdu-dark|dark|dark');
  });

  it('toggles the uncontrolled mode', () => {
    render(
      <ThemeProvider theme={sduLightTheme} darkTheme={sduDarkTheme} defaultColorMode="light">
        <ThemeProbe />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByTestId('probe'));
    expect(screen.getByTestId('probe').textContent).toBe('sdu-dark|dark|dark');
  });

  it('when controlled, reports changes instead of applying them itself', () => {
    const onColorModeChange = vi.fn();
    render(
      <ThemeProvider
        theme={sduLightTheme}
        darkTheme={sduDarkTheme}
        colorMode="light"
        onColorModeChange={onColorModeChange}
      >
        <ThemeProbe />
      </ThemeProvider>,
    );
    fireEvent.click(screen.getByTestId('probe'));
    expect(onColorModeChange).toHaveBeenCalledWith('dark');
    expect(screen.getByTestId('probe').textContent).toBe('sdu-light|light|light');
  });

  it('throws when a hook is used outside the provider', () => {
    // React logs the error boundary trace; silence it for this expected throw.
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ThemeProbe />)).toThrow(/must be used within a <ThemeProvider>/);
    spy.mockRestore();
  });
});
