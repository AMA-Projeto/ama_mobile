import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

type BackButtonProps = {
  onPress: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export function BackButton({
  onPress,
  label = 'Voltar',
  style,
}: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressed : null,
        style,
      ]}
    >
      <ChevronLeft size={23} color="#222222" />

      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
  },

  label: {
    color: '#222222',
    fontSize: 14,
    fontWeight: '600',
  },

  pressed: {
    opacity: 0.65,
  },
});