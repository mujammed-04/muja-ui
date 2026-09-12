import type { Size } from '@muja-ui/core';
import { useState } from 'react';
import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface AvatarProps {
  /** Image URL. Falls back to initials when absent or if loading fails. */
  source?: string | null;
  /** Full name — initials are derived from it, and it names the image for a11y. */
  name?: string;
  size?: Size | number;
  style?: StyleProp<ViewStyle>;
}

const sizeMap: Record<Size, number> = { sm: 32, md: 40, lg: 56 };

/** First letters of the first two words, e.g. "Aida Serik" → "AS". */
function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

/**
 * Circular avatar with an initials fallback.
 *
 * The ring is what makes the circle visible: `primarySubtle` is a near-black in
 * the dark theme and a near-white in the light one, so on a page of `bg` or
 * `surface` the fill alone contrasts about 1.1:1 and the avatar reads as loose
 * initials with no shape around them. `borderStrong` clears 3:1 against both
 * page colours, the threshold for a non-text element.
 *
 * ```tsx
 * <Avatar source={user.photoUrl} name={user.fullName} size="lg" />
 * ```
 */
export function Avatar({ source, name, size = 'md', style }: AvatarProps) {
  const theme = useTheme();
  const [failed, setFailed] = useState(false);
  const dimension = typeof size === 'number' ? size : sizeMap[size];
  const showImage = !!source && !failed;

  return (
    <View
      style={[
        {
          width: dimension,
          height: dimension,
          borderRadius: theme.radius.full,
          backgroundColor: theme.colors.primarySubtle,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: theme.colors.borderStrong,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {showImage ? (
        <Image
          source={{ uri: source }}
          accessibilityLabel={name}
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <Text
          size={dimension >= 56 ? 'lg' : dimension >= 40 ? 'md' : 'sm'}
          weight="semibold"
          color="primaryText"
          accessibilityLabel={name}
        >
          {name ? initials(name) : '?'}
        </Text>
      )}
    </View>
  );
}
