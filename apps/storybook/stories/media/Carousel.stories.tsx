import { Box, Button, Card, CardContent, CardTitle, Flex, Stack, Text } from '@muja-ui/web';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@muja-ui/web/client';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';

/**
 * CSS scroll-snap carousel: native touch and trackpad swiping, no animation
 * engine. The controls page by viewport width; `loop` makes them wrap instead of
 * disabling at the ends. Client component — import from `@muja-ui/web/client`.
 */
const meta = {
  title: 'Media/Carousel',
  component: Carousel,
  subcomponents: { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext },
  tags: ['autodocs'],
  args: { 'aria-label': 'Featured events', loop: false },
  argTypes: { onSlideChange: { action: 'slide change' } },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const slides = [
  { title: 'Hackathon 2026', meta: 'Red Hall · 18 April' },
  { title: 'Career fair', meta: 'Atrium · 24 April' },
  { title: 'Chess tournament', meta: 'Library · 2 May' },
  { title: 'Robotics demo', meta: 'Block C · 9 May' },
  { title: 'Volunteering day', meta: 'Campus · 16 May' },
];

export const Playground: Story = {
  render: (args) => (
    <div style={{ maxWidth: 560 }}>
      <Carousel {...args}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.title} style={{ flex: '0 0 50%' }}>
              <Card variant="elevated" style={{ marginRight: 'var(--mj-space-3)' }}>
                <CardContent>
                  <CardTitle>{slide.title}</CardTitle>
                  <Text size="sm" color="textMuted" style={{ marginBottom: 0 }}>
                    {slide.meta}
                  </Text>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <Flex gap={2} mt={4}>
          <CarouselPrevious />
          <CarouselNext />
        </Flex>
      </Carousel>
    </div>
  ),
};

/** With `loop` the controls never disable — the ends wrap around. */
export const Loop: Story = {
  args: { loop: true },
  render: Playground.render,
};

export const FullWidthSlides: Story = {
  name: 'Full-width slides',
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Carousel aria-label="Onboarding">
        <CarouselContent>
          {['Find a room', 'Scan in', 'Track your iGPA'].map((title, index) => (
            <CarouselItem key={title} style={{ flex: '0 0 100%' }}>
              <Box p={8} bg="primarySubtle" color="primaryText" radius="lg" h={180}>
                <Text size="xs" style={{ margin: 0, fontFamily: 'var(--mj-font-mono)' }}>
                  Step {index + 1}
                </Text>
                <Text size="2xl" weight="semibold" style={{ marginBottom: 0 }}>
                  {title}
                </Text>
              </Box>
            </CarouselItem>
          ))}
        </CarouselContent>
        <Flex gap={2} mt={4}>
          <CarouselPrevious />
          <CarouselNext />
        </Flex>
      </Carousel>
    </div>
  ),
};

function ApiDemo() {
  const api = useRef<CarouselApi>(null);
  const [index, setIndex] = useState(0);

  return (
    <Stack gap={4} maxW={480}>
      <Carousel aria-label="Banners" loop apiRef={api} onSlideChange={setIndex}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.title} style={{ flex: '0 0 100%' }}>
              <Box p={6} bg="surface" radius="lg" borderWidth="thin" borderColor="border" h={140}>
                <Text weight="semibold" style={{ margin: 0 }}>
                  {slide.title}
                </Text>
                <Text size="sm" color="textMuted" style={{ marginBottom: 0 }}>
                  {slide.meta}
                </Text>
              </Box>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <Flex align="center" gap={2}>
        <Button size="sm" variant="outline" onClick={() => api.current?.scrollPrev()}>
          Prev
        </Button>
        <Button size="sm" variant="outline" onClick={() => api.current?.scrollNext()}>
          Next
        </Button>
        <Flex gap={2} ml={3}>
          {slides.map((slide, dot) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Go to slide ${dot + 1}`}
              aria-current={dot === index}
              onClick={() => api.current?.scrollTo(dot)}
              style={{
                width: 10,
                height: 10,
                padding: 0,
                borderRadius: 'var(--mj-radius-full)',
                border: 'none',
                cursor: 'pointer',
                background:
                  dot === index ? 'var(--mj-color-primary)' : 'var(--mj-color-border-strong)',
              }}
            />
          ))}
        </Flex>
      </Flex>
      <Text size="sm" color="textMuted" style={{ margin: 0 }}>
        Slide {index + 1} of {slides.length}
      </Text>
    </Stack>
  );
}

/** `apiRef` + `onSlideChange` drive custom controls and indicator dots. */
export const ImperativeApi: Story = {
  name: 'Imperative API',
  render: () => <ApiDemo />,
};
