import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ExpandableTextProps = {
  text: string;
  numberOfLines?: number;
};

export function ExpandableText({
  text,
  numberOfLines = 5,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [textExceedsLimit, setTextExceedsLimit] = useState(false);

  return (
    <View>
      <Text
        style={styles.text}
        numberOfLines={expanded ? undefined : numberOfLines}
        onTextLayout={event => {
          if (!expanded) {
            setTextExceedsLimit(
              event.nativeEvent.lines.length > numberOfLines
            );
          }
        }}
      >
        {text}
      </Text>

      {textExceedsLimit && (
        <Pressable
          onPress={() => setExpanded(current => !current)}
          accessibilityRole="button"
          accessibilityLabel={expanded ? 'Ver menos' : 'Ver mais'}
          hitSlop={8}
        >
          <Text style={styles.link}>
            {expanded ? 'ver menos' : 'ver mais'}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#111111',
    fontSize: 15,
    lineHeight: 19,
  },
  link: {
    color: '#E5B900',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
});