import { Pressable, View, StyleSheet } from 'react-native';
import { CircleUserRound, Bell } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors } from '../../theme/colors';

type AppHeaderProps = {
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  showNotifications?: boolean;
};

export function AppHeader({
  onMenuPress,
  onNotificationPress,
  showNotifications = false,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Abrir perfil"
        onPress={onMenuPress}
        style={styles.sideButton}
        hitSlop={8}
      >
        <CircleUserRound
          size={28}
          color={colors.text}
          strokeWidth={1.8}
        />
      </Pressable>

      <View style={styles.spacer} />

      {showNotifications ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Abrir notificações"
          onPress={onNotificationPress}
          style={styles.sideButton}
          hitSlop={8}
        >
          <Bell
            size={24}
            color={colors.text}
          />
        </Pressable>
      ) : (
        <View
          accessible={false}
          style={styles.sideButton}
        >
          <View style={styles.headerSquare} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    zIndex: 1,
  },

  sideButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  spacer: {
    flex: 1,
  },

  headerSquare: {
    width: 28,
    height: 28,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
});