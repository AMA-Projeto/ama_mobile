import { useRef } from 'react';
import type { ReactNode, ComponentRef } from 'react';

import {
  ScrollView,
  View,
  Pressable,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

type CarouselProps<T> = {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
  itemWidth: number;
  gap?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function Carousel<T>({
  data,
  renderItem,
  keyExtractor,
  itemWidth,
  gap = 14,
  contentContainerStyle,
}: CarouselProps<T>) {
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const initialPositionSet = useRef(false);

  const itemSize = itemWidth + gap;
  const cycleWidth = data.length * itemSize;
  const carouselData = [...data, ...data, ...data];

  function handleContentSizeChange() {
    if (initialPositionSet.current || data.length === 0) {
      return;
    }

    initialPositionSet.current = true;

    scrollRef.current?.scrollTo({
      x: cycleWidth,
      animated: false,
    });
  }

  function handleScrollEnd(
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    const offsetX = event.nativeEvent.contentOffset.x;

    if (offsetX < cycleWidth - itemSize / 2) {
      scrollRef.current?.scrollTo({
        x: offsetX + cycleWidth,
        animated: false,
      });
    } else if (offsetX >= cycleWidth * 2 - itemSize / 2) {
      scrollRef.current?.scrollTo({
        x: offsetX - cycleWidth,
        animated: false,
      });
    }
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={itemSize}
      snapToAlignment="start"
      disableIntervalMomentum
      onContentSizeChange={handleContentSizeChange}
      onMomentumScrollEnd={handleScrollEnd}
      contentContainerStyle={[
        { gap },
        contentContainerStyle,
      ]}
    >
      {carouselData.map((item, index) => (
        <View
          key={`${keyExtractor(item)}-${index}`}
          style={{ width: itemWidth }}
        >
          {renderItem(item, index % data.length)}
        </View>
      ))}
    </ScrollView>
  );
}