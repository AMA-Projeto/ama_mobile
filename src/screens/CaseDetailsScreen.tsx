import { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

import {
  MapPin,
  Bookmark,
  ChevronLeft,
  Navigation,
} from 'lucide-react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimalTag } from '../components/ui/AnimalTag';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { IconActionButton } from '../components/ui/IconActionButton';
import { ExpandableText } from '../components/ui/ExpandableText';
import { CaseAuthorCard } from '../components/ui/CaseAuthorCard';
import { colors } from '../theme/colors';
import { AnimalCase } from '../data/cases';

const SCREEN_WIDTH = Dimensions.get('window').width;

type CaseDetailsScreenProps = {
  caseId: string;
  cases: AnimalCase[];
  onBack?: () => void;
  onHelpPress?: () => void;
  onMessagePress?: () => void;
};

export default function CaseDetailsScreen({
  caseId,
  cases,
  onBack,
  onHelpPress,
  onMessagePress,
}: CaseDetailsScreenProps) {
  const insets = useSafeAreaInsets();
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const animalCase = cases.find(item => item.id === caseId);

  useEffect(() => {
    setActiveImage(0);
    setIsSaved(false);
  }, [caseId]);

  function handleImageScroll(
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);

    setActiveImage(
      Math.max(0, Math.min(index, (animalCase?.images.length ?? 1) - 1)),
    );
  }

  function handleHelp() {
    if (onHelpPress) {
      onHelpPress();
      return;
    }

    console.log('Quero ajudar no caso:', animalCase?.id);
  }

  if (!animalCase) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top + 24 }]}>
        <Text style={styles.notFoundTitle}>Caso não encontrado</Text>
        <Text style={styles.notFoundDescription}>
          Não foi possível encontrar os detalhes deste animal.
        </Text>
        <PrimaryButton label="Voltar" onPress={onBack ?? (() => {})} />
      </View>
    );
  }

  const isUrgent =
    animalCase.status.toLocaleLowerCase('pt-BR').includes('urgent');

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <ScrollView
            key={animalCase.id}
            horizontal
            pagingEnabled
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleImageScroll}
            style={styles.imageCarousel}
          >
            {animalCase.images.map((image, index) => (
              <Image
                key={`${animalCase.id}-image-${index}`}
                source={{ uri: image }}
                style={styles.heroImage}
                resizeMode="cover"
                accessibilityLabel={`Foto ${index + 1} de ${animalCase.title}`}
              />
            ))}
          </ScrollView>

          <View style={[styles.topBar, { top: insets.top + 8 }]}>
            <Pressable
              onPress={onBack ?? (() => {})}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              hitSlop={8}
              style={styles.roundButton}
            >
              <ChevronLeft size={25} color={colors.text} />
            </Pressable>

            <Text style={styles.topBarTitle}>Detalhes do caso</Text>

            <View style={styles.topBarRight}>
              <IconActionButton
                icon={
                  <Bookmark
                    size={20}
                    color={isSaved ? colors.primaryDark : colors.text}
                    fill={isSaved ? colors.primary : 'transparent'}
                  />
                }
                onPress={() => setIsSaved(current => !current)}
                accessibilityLabel={isSaved ? 'Remover dos salvos' : 'Salvar caso'}
                backgroundColor="#FFFFFF"
                size={42}
              />
            </View>
          </View>

          {animalCase.images.length > 1 && (
            <>
              <View style={styles.pagination}>
                {animalCase.images.map((_, index) => (
                  <View
                    key={`dot-${index}`}
                    style={[
                      styles.paginationDot,
                      activeImage === index && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
            </>
          )}

          <View style={styles.imageBottomScrim} />
        </View>

        <View style={styles.detailsPanel}>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusBadge,
                isUrgent ? styles.statusBadgeUrgent : styles.statusBadgeNormal,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  isUrgent ? styles.statusDotUrgent : styles.statusDotNormal,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  isUrgent ? styles.statusTextUrgent : styles.statusTextNormal,
                ]}
              >
                {animalCase.status}
              </Text>
            </View>

            <Text style={styles.caseReference}>Caso #{animalCase.id}</Text>
          </View>

          <Text style={styles.title}>{animalCase.title}</Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Consultar localização do animal"
            onPress={() => console.log('Localização do caso:', animalCase.location)}
            style={styles.locationCard}
          >
            <View style={styles.locationIconWrap}>
              <MapPin size={20} color={colors.primaryDark} />
            </View>

            <View style={styles.locationContent}>
              <Text style={styles.locationEyebrow}>LOCALIZAÇÃO</Text>
              <Text style={styles.locationText}>{animalCase.location}</Text>
              <Text style={styles.distanceText}>{animalCase.distance}</Text>
            </View>

            <View style={styles.navigationButton}>
              <Navigation size={17} color={colors.primaryDark} />
            </View>
          </Pressable>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre o animal</Text>
            <View style={styles.attributesCard}>
              <Text style={styles.attributesSubtitle}>
                Características identificadas
              </Text>
              <View style={styles.attributesGrid}>
                {animalCase.tags.map(tag => (
                  <AnimalTag key={`${animalCase.id}-${tag}`} label={tag} />
                ))}
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre o caso</Text>
            <View style={styles.descriptionCard}>
              <ExpandableText text={animalCase.description} numberOfLines={4} />
            </View>
          </View>

          <View style={styles.authorSection}>
            <Text style={styles.sectionTitle}>Responsável pela publicação</Text>
            <CaseAuthorCard
              name={animalCase.author.name}
              imageUri={animalCase.author.imageUri}
              onMessagePress={onMessagePress}
            />
          </View>

        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <PrimaryButton
          label="Quero ajudar"
          onPress={handleHelp}
          style={styles.helpButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  hero: {
    height: 340,
    position: 'relative',
    backgroundColor: '#DDE8D7',
  },
  imageCarousel: {
    flex: 1,
  },
  heroImage: {
    width: SCREEN_WIDTH,
    height: 340,
    backgroundColor: '#DDE8D7',
  },
  imageBottomScrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 76,
    backgroundColor: 'rgba(0,0,0,0.08)',
    pointerEvents: 'none',
  },
  topBar: {
    position: 'absolute',
    left: 18,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roundButton: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  topBarRight: {
    width: 43,
    alignItems: 'flex-end',
  },
  pagination: {
    position: 'absolute',
    bottom: 29,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
    zIndex: 2,
  },
  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  paginationDotActive: {
    width: 19,
    backgroundColor: colors.primary,
  },
  detailsPanel: {
    marginTop: -24,
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    backgroundColor: '#FFFFFF',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    maxWidth: '75%',
  },
  statusBadgeUrgent: {
    backgroundColor: '#FFF0EB',
  },
  statusBadgeNormal: {
    backgroundColor: '#EDF5E9',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusDotUrgent: {
    backgroundColor: colors.danger,
  },
  statusDotNormal: {
    backgroundColor: colors.primaryDark,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  statusTextUrgent: {
    color: colors.danger,
  },
  statusTextNormal: {
    color: colors.primaryDark,
  },
  caseReference: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  title: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 17,
    letterSpacing: -0.5,
  },
  locationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 13,
    borderRadius: 17,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: '#E9EDE6',
    marginBottom: 25,
  },
  locationIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationContent: {
    flex: 1,
    gap: 3,
  },
  locationEyebrow: {
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: '800',
    color: colors.textSecondary,
  },
  locationText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: colors.text,
  },
  distanceText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  navigationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.2,
  },
  attributesCard: {
    padding: 16,
    borderRadius: 17,
    backgroundColor: '#F6F7F4',
    borderWidth: 1,
    borderColor: '#ECEFE9',
  },
  attributesSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },
  descriptionCard: {
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#FAFBF9',
    borderWidth: 1,
    borderColor: '#ECEFE9',
  },
  authorSection: {
    gap: 10,
    marginBottom: 0,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  helpButton: {
    width: '100%',
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: '#FFFFFF',
  },
  notFoundTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  notFoundDescription: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});