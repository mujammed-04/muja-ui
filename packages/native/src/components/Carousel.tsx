import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Easing,
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

  // Tracked during the scroll rather than at momentum end: waiting for
  // deceleration to finish leaves the dots pointing at the previous slide for
  // as long as the fling takes to settle.
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const stride = itemWidth + theme.space[3];
    const next = Math.max(
      0,
      Math.min(children.length - 1, Math.round(event.nativeEvent.contentOffset.x / stride)),
    );
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
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
            <Dot key={dotIndex} active={dotIndex === index} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

/**
 * A single page dot. Width and colour are animated so the active dot grows
 * into place alongside the slide instead of snapping between states — width
 * and colour cannot use the native driver, hence the JS-driven timing.
 */
function Dot({ active }: { active: boolean }) {
  const theme = useTheme();
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration: theme.motion.duration.fast,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    });
    animation.start();
    return () => animation.stop();
  }, [active, progress, theme.motion.duration]);

  return (
    <Animated.View
      style={{
        width: progress.interpolate({ inputRange: [0, 1], outputRange: [6, 18] }),
        height: 6,
        borderRadius: theme.radius.full,
        // `textMuted` rather than a border token: the dots carry meaning, so
        // they need 3:1 against the page, which the control-border tokens do
        // not promise (they sat at ~1.5:1 in both themes).
        backgroundColor: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [theme.colors.textMuted, theme.colors.primary],
        }),
      }}
    />
  );
}
