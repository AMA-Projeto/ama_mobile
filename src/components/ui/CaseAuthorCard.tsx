import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MessageCircleMore } from 'lucide-react-native';

type CaseAuthorCardProps = {
  name: string;
  imageUri?: string;
  onMessagePress?: () => void;
};

export function CaseAuthorCard({
  name,
  imageUri,
  onMessagePress,
}: CaseAuthorCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.authorInfo}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.avatar}
          />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarInitial}>
              {name.trim().charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.caption}>Postado por</Text>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onMessagePress}
        disabled={!onMessagePress}
        accessibilityRole="button"
        accessibilityLabel={`Enviar mensagem para ${name}`}
        hitSlop={8}
        style={styles.messageButton}
      >
        <MessageCircleMore size={23} color="#FFFFFF" fill="#FFD000" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  authorInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EEEEEE',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: '#555555',
    fontSize: 18,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  caption: {
    color: '#555555',
    fontSize: 12,
    marginBottom: 3,
  },
  name: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '700',
  },
  messageButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
});