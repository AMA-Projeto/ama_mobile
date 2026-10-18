import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {
  AlertTriangle,
  Bookmark,
  MapPin,
  Navigation,
  ChevronRight,
} from 'lucide-react-native';

import { AppHeader } from '../components/layout/AppHeader';
import { AnimalTag } from '../components/ui/AnimalTag';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { Carousel } from '../components/ui/Carousel';
import { colors } from '../theme/colors';

type UrgentCase = {
  id: string;
  title: string;
  location: string;
  image: string;
  tags: string[];
};

type NearbyCase = {
  id: string;
  title: string;
  description: string;
  distance: string;
  image: string;
  tags: string[];
};

type HomeScreenProps = {
  userName: string;
  onLogout?: () => void;
};

const urgentCases: UrgentCase[] = [
  {
    id: '1',
    title: 'Cachorro ferido',
    location: 'Centro',
    image:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600',
    tags: ['Cachorro', 'Urgente'],
  },
  {
    id: '2',
    title: 'Gato abandonado',
    location: 'Jundiaí',
    image:
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
    tags: ['Gato', 'Urgente'],
  },
];

const nearbyCases: NearbyCase[] = [
  {
    id: '3',
    title: 'Cão procurando abrigo',
    description: 'Animal encontrado próximo a uma praça.',
    distance: '0,8 km',
    image:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600',
    tags: ['Cachorro', 'Urgente'],
  },
  {
    id: '4',
    title: 'Gatinho para resgate',
    description: 'Precisa de ajuda e avaliação.',
    distance: '1,4 km',
    image:
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
    tags: ['Gato', 'Filhote'],
  },
];

export default function HomeScreen({
  userName,
  onLogout,
}: HomeScreenProps) {
  const [savedCases, setSavedCases] = useState<string[]>([]);

  function toggleSaved(id: string) {
    setSavedCases((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function handleNavigation(tab: string) {
    if (tab === 'logout') {
      onLogout?.();
      return;
    }

    console.log('Navegação selecionada:', tab);
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      <AppHeader
        onMenuPress={() => console.log('Abrir menu')}
      />

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>
          Olá,{' '}
          <Text style={styles.highlight}>
            {userName.trim().split(/\s+/)[0] || 'Usuário'}!
          </Text>
        </Text>

        {/* Casos urgentes */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <AlertTriangle
              size={21}
              color={colors.danger}
            />

            <Text style={styles.sectionTitle}>
              Casos Urgentes
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ver todos os casos urgentes"
            onPress={() => console.log('Ver casos urgentes')}
            style={styles.seeAll}
          >
            <Text style={styles.seeAllText}>Ver todos</Text>

            <ChevronRight
              size={16}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>

        <Carousel<UrgentCase>
          data={urgentCases}
          keyExtractor={(item) => item.id}
          itemWidth={220}
          gap={14}
          contentContainerStyle={styles.urgentList}
          renderItem={(item) => {
            const isSaved = savedCases.includes(item.id);

            return (
              <View style={styles.urgentCard}>
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.urgentImage}
                    resizeMode="cover"
                    accessibilityLabel={item.title}
                  />

                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                      isSaved
                        ? `Remover ${item.title} dos salvos`
                        : `Salvar ${item.title}`
                    }
                    accessibilityState={{
                      selected: isSaved,
                    }}
                    onPress={() => toggleSaved(item.id)}
                    style={styles.bookmarkButton}
                  >
                    <Bookmark
                      size={19}
                      color={
                        isSaved
                          ? colors.primaryDark
                          : '#333333'
                      }
                      fill={
                        isSaved
                          ? colors.primary
                          : 'transparent'
                      }
                    />
                  </Pressable>
                </View>

                <View style={styles.urgentInfo}>
                  <Text
                    style={styles.caseTitle}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>

                  <View style={styles.tagList}>
                    {item.tags.map((tag) => (
                      <AnimalTag
                        key={`${item.id}-${tag}`}
                        label={tag}
                      />
                    ))}
                  </View>

                  <View style={styles.locationRow}>
                    <MapPin
                      size={14}
                      color={colors.textSecondary}
                    />

                    <Text
                      style={styles.locationText}
                      numberOfLines={1}
                    >
                      {item.location}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />

        {/* Casos próximos */}
        <View
          style={[
            styles.sectionHeader,
            styles.nearbyHeader,
          ]}
        >
          <View style={styles.sectionTitleContainer}>
            <Navigation
              size={21}
              color={colors.primaryDark}
            />

            <Text style={styles.sectionTitle}>
              Casos Próximos
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ver todos os casos próximos"
            onPress={() => console.log('Ver casos próximos')}
            style={styles.seeAll}
          >
            <Text style={styles.seeAllText}>Ver todos</Text>

            <ChevronRight
              size={16}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>

        {nearbyCases.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={`Abrir caso: ${item.title}`}
            onPress={() =>
              console.log('Caso selecionado:', item.id)
            }
            style={styles.nearbyCard}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.nearbyImage}
              resizeMode="cover"
              accessibilityLabel={item.title}
            />

            <View style={styles.nearbyInfo}>
              <Text
                style={styles.nearbyTitle}
                numberOfLines={2}
              >
                {item.title}
              </Text>

              <Text
                style={styles.description}
                numberOfLines={2}
              >
                {item.description}
              </Text>

              <View style={styles.tagList}>
                {item.tags.map((tag) => (
                  <AnimalTag
                    key={`${item.id}-${tag}`}
                    label={tag}
                  />
                ))}
              </View>

              <View style={styles.distanceRow}>
                <MapPin
                  size={14}
                  color={colors.textSecondary}
                />

                <Text style={styles.distance}>
                  {item.distance}
                </Text>
              </View>
            </View>

            <ChevronRight
              size={18}
              color="#999999"
            />
          </Pressable>
        ))}
      </ScrollView>

      <BottomNavigation
        activeTab="home"
        onNavigate={handleNavigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  mainScroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
  },

  greeting: {
    fontSize: 27,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 22,
  },

  highlight: {
    color: colors.primaryDark,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },

  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  seeAllText: {
    color: colors.textSecondary,
    fontSize: 12,
  },

  urgentList: {
    paddingBottom: 6,
    paddingRight: 4,
  },

  urgentCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    overflow: 'hidden',
  },

  urgentImage: {
    width: '100%',
    height: 130,
    backgroundColor: '#EEEEEE',
  },

  bookmarkButton: {
    position: 'absolute',
    right: 9,
    top: 9,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  urgentInfo: {
    padding: 12,
    gap: 8,
  },

  caseTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.danger,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  locationText: {
    flex: 1,
    fontSize: 11,
    color: colors.textSecondary,
  },

  nearbyHeader: {
    marginTop: 25,
  },

  nearbyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },

  nearbyImage: {
    width: 96,
    height: 104,
    borderRadius: 9,
    backgroundColor: '#EEEEEE',
  },

  nearbyInfo: {
    flex: 1,
    gap: 7,
  },

  nearbyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },

  description: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },

  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 2,
  },

  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  distance: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});