import { useEffect } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlertCircle, X } from 'lucide-react-native';

type ErrorPopupProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

export function ErrorPopup({
  visible,
  message,
  onClose,
}: ErrorPopupProps) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(onClose, 4000);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

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
          {
            paddingTop: Math.max(insets.top, 20) + 12,
          },
        ]}
      >
        <View
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={styles.popup}
        >
          <View style={styles.iconContainer}>
            <AlertCircle size={24} color="#B42318" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>Não foi possível cadastrar</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Fechar aviso"
            hitSlop={10}
            style={styles.closeButton}
          >
            <X size={20} color="#666666" />
          </Pressable>
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
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  popup: {
    width: '100%',
    maxWidth: 440,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 4,
    borderLeftColor: '#B42318',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  iconContainer: {
    marginRight: 12,
    paddingTop: 2,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#202020',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 5,
  },
  message: {
    color: '#555555',
    fontSize: 14,
    lineHeight: 20,
  },
  closeButton: {
    padding: 2,
    marginLeft: 8,
  },
});