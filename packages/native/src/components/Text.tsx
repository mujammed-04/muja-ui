import type {
  FontFamilyToken,
  FontSizeToken,
  FontWeightToken,
  LetterSpacingToken,
  LineHeightToken,
  SemanticColorToken,
} from '@muja-ui/tokens';
import { forwardRef } from 'react';
import {
  Text as RNText,
  type StyleProp,
  type TextProps as RNTextProps,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { splitStyleProps, type StyleProps } from '../system/styleProps';

export interface TextOwnProps {
  size?: FontSizeToken;
  weight?: FontWeightToken;
  family?: FontFamilyToken;
  leading?: LineHeightToken;
  tracking?: LetterSpacingToken;
  align?: TextStyle['textAlign'];
  /** Semantic color token. Defaults to the theme's body text color. */
  color?: SemanticColorToken;
  /** Clips overflowing text to a single line with an ellipsis. */
  truncate?: boolean;
}

export type TextProps = TextOwnProps &
  StyleProps &
  Omit<RNTextProps, 'style'> & { style?: StyleProp<TextStyle> };

/**
 * Typography primitive. Color always comes from a semantic token, never a raw
 * value. React Native needs an absolute `lineHeight`, so the unitless token
 * multiplier is resolved against the font size here.
 *
 * ```tsx
 * <Text size="sm" color="textSecondary" truncate>…</Text>
 * ```
 */
export const Text = forwardRef<RNText, TextProps>(function Text(props, ref) {
  const theme = useTheme();
  const {
    size = 'md',
    weight,
    family = 'sans',
    leading,
    tracking,
    align,
    color = 'text',
    truncate,
    style: styleProp,
    numberOfLines,
    ...restProps
  } = props;

  const { style: tokenStyle, rest } = splitStyleProps(
    restProps as Record<string, unknown>,
    theme,
  );

  const fontSize = theme.typography.fontSize[size];
  const textStyle: TextStyle = {
    fontFamily: theme.typography.fontFamily[family],
    fontSize,
    color: theme.colors[color],
    fontWeight: weight ? (theme.typography.fontWeight[weight] as TextStyle['fontWeight']) : undefined,
    lineHeight: leading ? Math.round(fontSize * theme.typography.lineHeight[leading]) : undefined,
    letterSpacing: tracking ? theme.typography.letterSpacing[tracking] : undefined,
    textAlign: align,
  };

  return (
    <RNText
      ref={ref}
      numberOfLines={truncate ? 1 : numberOfLines}
      ellipsizeMode={truncate ? 'tail' : undefined}
      {...(rest as RNTextProps)}
      style={[textStyle, tokenStyle as TextStyle, styleProp]}
    />
  );
});
