import { borderWidth, opacity, radius, shadow, zIndex } from '@muja-ui/tokens';
import { Box, Heading, Stack, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Labelled, Row } from '../_layout';

/**
 * Radius, elevation, border widths, opacity and z-index. Shadows are defined as
 * layer data in `@muja-ui/tokens` so React Native can consume the same values.
 */
const meta: Meta = {
  title: 'Foundations/Radius & Shadows',
};

export default meta;

export const Radius: StoryObj = {
  render: () => (
    <Row>
      {Object.entries(radius).map(([token, px]) => (
        <Stack key={token} gap={2} align="center">
          <Box
            w={88}
            h={88}
            bg="primarySubtle"
            radius={token as keyof typeof radius}
            borderWidth="thin"
            borderColor="primary"
          />
          <Text
            size="xs"
            color="textMuted"
            style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}
          >
            {token} · {px}px
          </Text>
        </Stack>
      ))}
    </Row>
  ),
};

export const Shadows: StoryObj = {
  render: () => (
    <Row>
      {Object.keys(shadow).map((token) => (
        <Stack key={token} gap={2} align="center">
          <Box w={120} h={88} bg="surface" radius="lg" shadow={token as keyof typeof shadow} />
          <Text
            size="xs"
            color="textMuted"
            style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}
          >
            {token}
          </Text>
        </Stack>
      ))}
    </Row>
  ),
};

export const BordersOpacityAndLayers: StoryObj = {
  name: 'Borders, opacity & layers',
  render: () => (
    <Stack gap={8}>
      <section>
        <Heading level={3} size="lg" mb={4}>
          Border width
        </Heading>
        <Stack gap={3}>
          {Object.entries(borderWidth).map(([token, px]) => (
            <Labelled key={token} label={`${token} · ${px}px`}>
              <Box
                w={200}
                h={40}
                radius="md"
                borderWidth={token as keyof typeof borderWidth}
                borderColor="borderStrong"
              />
            </Labelled>
          ))}
        </Stack>
      </section>
      <section>
        <Heading level={3} size="lg" mb={4}>
          Opacity
        </Heading>
        <Row>
          {Object.entries(opacity).map(([token, value]) => (
            <Stack key={token} gap={2} align="center">
              <Box w={72} h={72} bg="primary" radius="md" opacity={value} />
              <Text
                size="xs"
                color="textMuted"
                style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}
              >
                {token} · {value}
              </Text>
            </Stack>
          ))}
        </Row>
      </section>
      <section>
        <Heading level={3} size="lg" mb={4}>
          z-index
        </Heading>
        <Stack gap={1}>
          {Object.entries(zIndex).map(([token, value]) => (
            <Text key={token} size="sm" style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}>
              {token} — {value}
            </Text>
          ))}
        </Stack>
      </section>
    </Stack>
  ),
};
