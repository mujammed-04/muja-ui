import { allIcons } from '@muja-ui/icons';
import { Icon, Text } from '@muja-ui/web';
import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * The full stroke icon set from `@muja-ui/icons`. Import a definition for
 * tree-shaking (`<Icon icon={CalendarIcon} />`), or call
 * `registerIcons(allIcons)` once and use the string name — this Storybook does
 * the latter, which is why `<Icon icon="calendar" />` works everywhere.
 */
const meta: Meta = {
  title: 'Foundations/Icons',
};

export default meta;

export const All: StoryObj = {
  name: `All ${allIcons.length} icons`,
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 'var(--mj-space-4)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
      }}
    >
      {allIcons.map((icon) => (
        <div
          key={icon.name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--mj-space-2)',
            padding: 'var(--mj-space-3)',
            borderRadius: 'var(--mj-radius-md)',
            border: '1px solid var(--mj-color-border)',
            background: 'var(--mj-color-surface)',
          }}
        >
          <Icon icon={icon} size={24} />
          <Text
            size="xs"
            color="textMuted"
            align="center"
            style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}
          >
            {icon.name}
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: StoryObj = {
  render: () => (
    <div className="story-row">
      {[16, 20, 24, 32, 48].map((size) => (
        <Icon key={size} icon="graduation-cap" size={size} label={`${size} pixels`} />
      ))}
    </div>
  ),
};

export const StrokeWidth: StoryObj = {
  render: () => (
    <div className="story-row">
      {[1, 1.5, 2, 2.5].map((strokeWidth) => (
        <Icon key={strokeWidth} icon="bell" size={32} strokeWidth={strokeWidth} />
      ))}
    </div>
  ),
};
