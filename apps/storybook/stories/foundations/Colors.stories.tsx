import { cssVarName, type Theme } from '@muja-ui/core';
import { useTheme } from '@muja-ui/core/client';
import { Heading, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * Semantic color roles. Components only ever reference these — never a palette
 * value — which is what makes a new brand a single `createTheme()` call.
 * Switch the **Theme** and **Mode** toolbars to see the same roles re-point.
 */
const meta: Meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'padded' },
};

export default meta;

const groups: { title: string; match: (token: string) => boolean }[] = [
  { title: 'Background', match: (t) => t === 'bg' || t.startsWith('bgS') || t.startsWith('bgM') },
  {
    title: 'Surface',
    match: (t) => t.startsWith('surface') || t === 'overlay',
  },
  { title: 'Text', match: (t) => t.startsWith('text') },
  {
    title: 'Border',
    match: (t) => t.startsWith('border') || t === 'focusRing',
  },
  { title: 'Primary', match: (t) => t.startsWith('primary') || t === 'onPrimary' },
  { title: 'Accent', match: (t) => t.startsWith('accent') || t === 'onAccent' },
  { title: 'Secondary', match: (t) => t.startsWith('secondary') || t === 'onSecondary' },
  {
    title: 'Status',
    match: (t) => /^(success|warning|danger|info|onSuccess|onWarning|onDanger|onInfo)/.test(t),
  },
];

function Swatch({ token, value }: { token: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--mj-space-3)', alignItems: 'center' }}>
      <span
        aria-hidden="true"
        style={{
          width: 44,
          height: 44,
          flex: '0 0 auto',
          background: value,
          borderRadius: 'var(--mj-radius-md)',
          border: '1px solid var(--mj-color-border)',
        }}
      />
      <span style={{ minWidth: 0 }}>
        <Text size="sm" weight="medium" style={{ margin: 0 }}>
          {token}
        </Text>
        <Text size="xs" color="textMuted" style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}>
          {cssVarName('color', token)} · {value}
        </Text>
      </span>
    </div>
  );
}

function Palette() {
  const theme: Theme = useTheme();
  const entries = Object.entries(theme.colors);

  return (
    <Stack gap={8}>
      <Text color="textSecondary" style={{ margin: 0 }}>
        Active theme: <strong>{theme.name}</strong>
      </Text>
      {groups.map((group) => (
        <section key={group.title}>
          <Heading level={3} size="lg" mb={4}>
            {group.title}
          </Heading>
          <div
            style={{
              display: 'grid',
              gap: 'var(--mj-space-4)',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            }}
          >
            {entries
              .filter(([token]) => group.match(token))
              .map(([token, value]) => (
                <Swatch key={token} token={token} value={value} />
              ))}
          </div>
        </section>
      ))}
    </Stack>
  );
}

export const SemanticRoles: StoryObj = {
  name: 'Semantic roles',
  render: () => <Palette />,
};
