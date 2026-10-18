import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  AlertCircle,
  CheckCircle2,
  Info,
  TriangleAlert,
} from 'lucide-react-native';

type FormMessageProps = {
  message: string;
  variant?: 'error' | 'success' | 'warning' | 'info';
  style?: StyleProp<ViewStyle>;
};

const appearances = {
  error: {
    background: '#FEE2E2',
    border: '#FECACA',
    text: '#B91C1C',
    icon: AlertCircle,
  },
  success: {
    background: '#DCFCE7',
    border: '#BBF7D0',
    text: '#166534',
    icon: CheckCircle2,
  },
  warning: {
    background: '#FEF3C7',
    border: '#FDE68A',
    text: '#92400E',
    icon: TriangleAlert,
  },
  info: {
    background: '#DBEAFE',
    border: '#BFDBFE',
    text: '#1D4ED8',
    icon: Info,
  },
};

export function FormMessage({
  message,
  variant = 'error',
  style,
}: FormMessageProps) {
  const appearance = appearances[variant];
  const Icon = appearance.icon;

  if (!message.trim()) {
    return null;
  }

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.container,
        {
          backgroundColor: appearance.background,
          borderColor: appearance.border,
        },
        style,
      ]}
    >
      <Icon size={18} color={appearance.text} />

      <Text style={[styles.message, { color: appearance.text }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },

  message: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
});