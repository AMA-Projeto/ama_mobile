import { StyleSheet, Text, View } from 'react-native';

type CaseTagProps = {
  label: string;
  type: 'urgent' | 'puppy' | 'default';
};

const tagColors = {
  urgent: {
    background: '#FCE8E8',
    text: '#C62828',
  },
  puppy: {
    background: '#DCEBFF',
    text: '#2458A6',
  },
  default: {
    background: '#F0F0F0',
    text: '#555555',
  },
};

export function CaseTag({ label, type }: CaseTagProps) {
  const colors = tagColors[type];

  return (
    <View
      style={[
        styles.tag,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.label, { color: colors.text }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});