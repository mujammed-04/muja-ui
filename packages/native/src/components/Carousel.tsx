import { useRef, useState, type ReactNode } from 'react';
import {
  ScrollView,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface CarouselProps {
  /** One element per slide. */
  children: ReactNode[];
  /** Slide width. Defaults to the full screen width minus the gutter. */
  slideWidth?: number;
  /** Horizontal page gutter used to compute the default slide width. */
  gutter?: number;
  /** Shows the page dots. Defaults to true. */
  dots?: boolean;
  onSlideChange?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

/**
 * Snap-scrolling horizontal carousel with page dots. Uses a paging ScrollView
 * rather than a gesture library, so it needs no extra native dependency.
 *
 * ```tsx
 * <Carousel accessibilityLabel="Featured events">
 *   {events.map((event) => <EventCard key={event.id} event={event} />)}
 * </Carousel>
 * ```
 */
export function Carousel({
  children,
  slideWidth,
  gutter = 16,
  dots = true,
  onSlideChange,
  style,
  accessibilityLabel,
}: CarouselProps) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const itemWidth = slideWidth ?? width - gutter * 2;
  const [index, setIndex] = useState(0);
  const lastIndex = useRef(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(event.nativeEvent.contentOffset.x / (itemWidth + theme.space[3]));
    if (next === lastIndex.current) return;
    lastIndex.current = next;
    setIndex(next);
    onSlideChange?.(next);
  };

  return (
    <View style={style}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={itemWidth + theme.space[3]}
        snapToAlignment="start"
        onMomentumScrollEnd={handleScroll}
        accessibilityLabel={accessibilityLabel}
        contentContainerStyle={{ gap: theme.space[3], paddingHorizontal: gutter }}
      >
        {children.map((child, slideIndex) => (
          <View key={slideIndex} style={{ width: itemWidth }}>
            {child}
          </View>
        ))}
      </ScrollView>
      {dots && children.length > 1 ? (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            gap: theme.space[1.5],
            paddingTop: theme.space[3],
          }}
        >
          {children.map((_, dotIndex) => (
            <View
              key={dotIndex}
              style={{
                width: dotIndex === index ? 18 : 6,
                height: 6,
                borderRadius: theme.radius.full,
                backgroundColor:
                  dotIndex === index ? theme.colors.primary : theme.colors.borderStrong,
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
