import { fontSize, fontWeight, letterSpacing, lineHeight } from '@muja-ui/tokens';
import { Heading, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Labelled } from '../_layout';

/**
 * Type scale, weights, line heights and tracking. Font sizes are emitted as
 * `rem` so they scale with the reader's browser font-size setting; every other
 * typographic value is a token too.
 */
const meta: Meta = {
  title: 'Foundations/Typography',
};

export default meta;

export const Scale: StoryObj = {
  render: () => (
    <Stack gap={4}>
      {Object.entries(fontSize).map(([token, px]) => (
        <Labelled key={token} label={`${token} · ${px}px`}>
          <Text size={token as keyof typeof fontSize} style={{ margin: 0 }}>
            SDU Life — Университет
          </Text>
        </Labelled>
      ))}
    </Stack>
  ),
};

export const Weights: StoryObj = {
  render: () => (
    <Stack gap={4}>
      {Object.entries(fontWeight).map(([token, value]) => (
        <Labelled key={token} label={`${token} · ${value}`}>
          <Text size="xl" weight={token as keyof typeof fontWeight} style={{ margin: 0 }}>
            The quick brown fox
          </Text>
        </Labelled>
      ))}
    </Stack>
  ),
};

export const Headings: StoryObj = {
  render: () => (
    <Stack gap={5}>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level} style={{ margin: 0 }}>
          Heading level {level}
        </Heading>
      ))}
    </Stack>
  ),
};

export const LineHeightAndTracking: StoryObj = {
  name: 'Line height & tracking',
  render: () => (
    <Stack gap={8}>
      <section>
        <Heading level={3} size="lg" mb={4}>
          Line height
        </Heading>
        <Stack gap={5}>
          {Object.entries(lineHeight).map(([token, value]) => (
            <div key={token}>
              <Text
                size="xs"
                color="textMuted"
                style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}
              >
                {token} · {value}
              </Text>
              <Text leading={token as keyof typeof lineHeight} maxW={520} style={{ margin: 0 }}>
                Booking a room in the library takes three taps: pick a slot, confirm, show the QR
                code at the door.
              </Text>
            </div>
          ))}
        </Stack>
      </section>
      <section>
        <Heading level={3} size="lg" mb={4}>
          Letter spacing
        </Heading>
        <Stack gap={3}>
          {Object.entries(letterSpacing).map(([token, value]) => (
            <Labelled key={token} label={`${token} · ${value}px`}>
              <Text size="xl" tracking={token as keyof typeof letterSpacing} style={{ margin: 0 }}>
                Campus events
              </Text>
            </Labelled>
          ))}
        </Stack>
      </section>
    </Stack>
  ),
};

export const Families: StoryObj = {
  render: () => (
    <Stack gap={5}>
      {(['sans', 'serif', 'mono'] as const).map((family) => (
        <Labelled key={family} label={family}>
          <Text size="lg" style={{ margin: 0, fontFamily: `var(--mj-font-${family})` }}>
            Aa Bb Cc — 0123456789
          </Text>
        </Labelled>
      ))}
    </Stack>
  ),
};
