import { Pressable, Text, StyleSheet, View } from 'react-native';
import {
  AlertTriangle,
  Baby,
  Cat,
  Dog,
} from 'lucide-react-native';

type AnimalTagProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

const tagStyles = {
  urgente: {
    background: '#FEE2E2',
    border: '#FECACA',
    text: '#B91C1C',
    icon: '#DC2626',
  },
  filhote: {
    background: '#DBEAFE',
    border: '#BFDBFE',
    text: '#1D4ED8',
    icon: '#2563EB',
  },
  gato: {
    background: '#F3E8FF',
    border: '#E9D5FF',
    text: '#7E22CE',
    icon: '#9333EA',
  },
  cachorro: {
    background: '#FFEDD5',
    border: '#FED7AA',
    text: '#C2410C',
    icon: '#EA580C',
  },
};

export function AnimalTag({
  label,
  selected = false,
  onPress,
}: AnimalTagProps) {
  const normalizedLabel = label.trim().toLowerCase();

  const category =
    normalizedLabel === 'urgente'
      ? 'urgente'
      : ['filhote', 'filhotes'].includes(normalizedLabel)
        ? 'filhote'
        : ['gato', 'gata', 'gatos', 'gatas'].includes(normalizedLabel)
          ? 'gato'
          : ['cão', 'cães', 'cachorro', 'cachorros'].includes(
                normalizedLabel,
              )
            ? 'cachorro'
            : null;

  const appearance = category ? tagStyles[category] : null;

  const Icon =
    category === 'urgente'
      ? AlertTriangle
      : category === 'filhote'
        ? Baby
        : category === 'gato'
          ? Cat
          : category === 'cachorro'
            ? Dog
            : null;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`Categoria: ${label}`}
      accessibilityState={onPress ? { selected } : undefined}
      style={[
        styles.tag,
        appearance
          ? {
              backgroundColor: appearance.background,
              borderColor: appearance.border,
            }
          : styles.defaultTag,
        selected && styles.selectedTag,
      ]}
    >
      {Icon && appearance && (
        <Icon
          size={13}
          color={selected ? '#FFFFFF' : appearance.icon}
          strokeWidth={2.2}
        />
      )}

      <Text
        style={[
          styles.label,
          appearance
            ? { color: selected ? '#FFFFFF' : appearance.text }
            : styles.defaultLabel,
          selected && styles.selectedLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
  },

  defaultTag: {
    backgroundColor: '#F3F4F6',
    borderColor: '#E5E7EB',
  },

  selectedTag: {
    borderColor: '#374151',
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
  },

  defaultLabel: {
    color: '#4B5563',
  },

  selectedLabel: {
    color: '#FFFFFF',
  },
});