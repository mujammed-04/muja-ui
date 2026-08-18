import { space } from '@muja-ui/tokens';
import { Box, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Labelled } from '../_layout';

/**
 * A 4px-based scale. Layout primitives take the token key directly
 * (`p={6}`, `gap={2}`), which resolves to `var(--mj-space-6)`.
 */
const meta: Meta = {
  title: 'Foundations/Spacing',
};

export default meta;

export const Scale: StoryObj = {
  render: () => (
    <Stack gap={2}>
      {Object.entries(space).map(([token, px]) => (
        <Labelled key={token} label={`${token} · ${px}px`}>
          <span
            aria-hidden="true"
            style={{
              height: 16,
              width: px === 0 ? 1 : px,
              background: 'var(--mj-color-primary)',
              borderRadius: 'var(--mj-radius-xs)',
            }}
          />
        </Labelled>
      ))}
    </Stack>
  ),
};

export const Padding: StoryObj = {
  render: () => (
    <Stack gap={4}>
      {([2, 4, 6, 8] as const).map((token) => (
        <Box key={token} p={token} bg="bgMuted" radius="lg" w={280}>
          <Box bg="surface" radius="md" borderWidth="thin" borderColor="border" p={3}>
            <Text size="sm" style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}>
              p={'{'}
              {token}
              {'}'}
            </Text>
          </Box>
        </Box>
      ))}
    </Stack>
  ),
};
