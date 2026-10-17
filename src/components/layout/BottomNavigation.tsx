import { StyleSheet, Text, View, Pressable } from 'react-native';
import {
  House,
  Map,
  Plus,
  MessageCircle,
  LogOut,
} from 'lucide-react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme/colors';

type BottomNavigationProps = {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
};

export function BottomNavigation({
  activeTab = 'home',
  onNavigate,
}: BottomNavigationProps) {
  const insets = useSafeAreaInsets();

  const items = [
    { id: 'home', label: 'Início', Icon: House },
    { id: 'map', label: 'Mapa', Icon: Map },
    { id: 'create', label: 'Criar', Icon: Plus },
    { id: 'messages', label: 'Mensagens', Icon: MessageCircle },
    { id: 'logout', label: 'Sair', Icon: LogOut },
  ];

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      {items.map(({ id, label, Icon }) => {
        const active = id === activeTab;

        const color =
          id === 'logout'
            ? colors.danger
            : active
              ? colors.primaryDark
              : '#888888';

        return (
          <Pressable
            key={id}
            accessibilityRole="button"
            accessibilityLabel={label}
            onPress={() => onNavigate?.(id)}
            style={styles.item}
          >
            <View
              style={[
                styles.iconContainer,
                id === 'create' && styles.createButton,
              ]}
            >
              <Icon
                size={id === 'create' ? 27 : 23}
                color={id === 'create' ? '#222222' : color}
                strokeWidth={2}
              />
            </View>

            <Text
              style={[
                styles.label,
                { color },
                active && styles.activeLabel,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },

  iconContainer: {
    width: 38,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  createButton: {
    width: 46,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },

  label: {
    fontSize: 10,
  },

  activeLabel: {
    fontWeight: '700',
  },
});