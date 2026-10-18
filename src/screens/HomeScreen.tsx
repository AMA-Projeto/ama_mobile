import { useState } from 'react';
import {
  Alert,
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
import { IconActionButton } from '../components/ui/IconActionButton';
import { colors } from '../theme/colors';
import { AnimalCase } from '../data/cases';

type HomeScreenProps = {
  userName: string;
  cases: AnimalCase[];
  onLogout?: () => void;
  onCasePress?: (caseId: string) => void;
  onAddCasePress?: () => void;
};

export default function HomeScreen({
  userName,
  cases,
  onLogout,
  onCasePress,
  onAddCasePress,
}: HomeScreenProps) {
  const [savedCases, setSavedCases] = useState<string[]>([]);

  // Casos urgentes e demais casos vêm da lista compartilhada.
  const urgentCases = cases.filter(
    item => item.status.toLowerCase() === 'urgente',
  );

  const nearbyCases = cases.filter(
    item => item.status.toLowerCase() !== 'urgente',
  );

  function toggleSaved(id: string) {
    setSavedCases(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id],
    );
  }

  function openCase(caseId: string) {
    if (!onCasePress) {
      Alert.alert(
        'Não foi possível abrir o caso',
        'A navegação para os detalhes não está configurada.',
      );
      return;
    }

    onCasePress(caseId);
  }

  function handleNavigation(tab: string) {
    if (tab === 'logout') {
      onLogout?.();
      return;
    }

    if (tab === 'create') {
      if (!onAddCasePress) {
        Alert.alert(
          'Cadastro indisponível',
          'A navegação para adicionar um caso ainda não está configurada.',
        );
        return;
      }

      onAddCasePress();
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
            <Text style={styles.seeAllText}>
              Ver todos
            </Text>

            <ChevronRight
              size={16}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>

        {urgentCases.length > 0 ? (
          <Carousel<AnimalCase>
            data={urgentCases}
            keyExtractor={item => item.id}
            itemWidth={220}
            gap={14}
            contentContainerStyle={styles.urgentList}
            renderItem={item => {
              const isSaved = savedCases.includes(item.id);

              return (
                <View style={styles.urgentCard}>
                  <Pressable
                    onPress={() => openCase(item.id)}
                    accessibilityRole="button"
                    accessibilityLabel={`Abrir caso: ${item.title}`}
                    style={styles.urgentCardPressable}
                  >
                    <Image
                      source={{ uri: item.images[0] }}
                      style={styles.urgentImage}
                      resizeMode="cover"
                      accessibilityLabel={item.title}
                    />

                    <View style={styles.urgentInfo}>
                      <Text
                        style={styles.caseTitle}
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>

                      <View style={styles.tagList}>
                        {item.tags.map(tag => (
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
                  </Pressable>

                  <IconActionButton
                    icon={
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
                    }
                    onPress={() => toggleSaved(item.id)}
                    accessibilityLabel={
                      isSaved
                        ? `Remover ${item.title} dos salvos`
                        : `Salvar ${item.title}`
                    }
                    backgroundColor="#FFFFFF"
                    size={34}
                    style={styles.bookmarkButton}
                  />
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.emptyMessage}>
            Nenhum caso urgente no momento.
          </Text>
        )}

        {/* Outros casos */}
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
              Outros Casos
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ver todos os outros casos"
            onPress={() => console.log('Ver outros casos')}
            style={styles.seeAll}
          >
            <Text style={styles.seeAllText}>
              Ver todos
            </Text>

            <ChevronRight
              size={16}
              color={colors.textSecondary}
            />
          </Pressable>
        </View>

        {nearbyCases.length > 0 ? (
          nearbyCases.map(item => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={`Abrir caso: ${item.title}`}
              onPress={() => openCase(item.id)}
              style={styles.nearbyCard}
            >
              <Image
                source={{ uri: item.images[0] }}
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
                  {item.tags.map(tag => (
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
          ))
        ) : (
          <Text style={styles.emptyMessage}>
            Não há outros casos cadastrados no momento.
          </Text>
        )}
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

  urgentCardPressable: {
    width: '100%',
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
    zIndex: 2,
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

  emptyMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    paddingVertical: 12,
  },
});