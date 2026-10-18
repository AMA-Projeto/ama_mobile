import { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SuccessPopupProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
};

export function SuccessPopup({
  visible,
  message,
  onClose,
  duration = 2500,
}: SuccessPopupProps) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!visible) return;

    const timeout = setTimeout(onClose, duration);

    return () => clearTimeout(timeout);
  }, [visible, duration, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.overlay,
          { paddingTop: insets.top + 12 },
        ]}
        pointerEvents="box-none"
      >
        <View
          style={styles.popup}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          <CheckCircle2
            size={24}
            color="#2E9D63"
          />

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Cadastro realizado!
            </Text>

            <Text style={styles.message} numberOfLines={2}>
              {message}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },

  popup: {
    width: '100%',
    maxWidth: 340,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D9EDE0',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222222',
  },

  message: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 16,
    color: '#666666',
  },
});