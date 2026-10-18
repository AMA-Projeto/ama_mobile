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
  HandHeart,
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

  // Busca o caso na lista compartilhada pelo App.tsx.
  const animalCase = cases.find(
    item => item.id === caseId,
  );

  // Reinicia o carrossel e o estado de favorito ao trocar de caso.
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
      Math.max(
        0,
        Math.min(index, (animalCase?.images.length ?? 1) - 1),
      ),
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
      <View
        style={[
          styles.notFound,
          { paddingTop: insets.top + 24 },
        ]}
      >
        <Text style={styles.notFoundTitle}>
          Caso não encontrado
        </Text>

        <Text style={styles.notFoundDescription}>
          Não foi possível encontrar os detalhes deste animal.
        </Text>

        <PrimaryButton
          label="Voltar"
          onPress={onBack ?? (() => {})}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Imagem de destaque */}
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

          {/* Barra superior */}
          <View
            style={[
              styles.topBar,
              { top: insets.top + 8 },
            ]}
          >
            <Pressable
              onPress={onBack ?? (() => {})}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
              hitSlop={8}
              style={styles.roundButton}
            >
              <ChevronLeft
                size={25}
                color={colors.text}
              />
            </Pressable>

            <Text style={styles.topBarTitle}>
              Detalhes do caso
            </Text>

            <View style={styles.topBarRight}>
              <IconActionButton
                icon={
                  <Bookmark
                    size={20}
                    color={
                      isSaved
                        ? colors.primaryDark
                        : colors.text
                    }
                    fill={
                      isSaved
                        ? colors.primary
                        : 'transparent'
                    }
                  />
                }
                onPress={() =>
                  setIsSaved(current => !current)
                }
                accessibilityLabel={
                  isSaved
                    ? 'Remover dos salvos'
                    : 'Salvar caso'
                }
                backgroundColor="#FFFFFF"
                size={42}
              />
            </View>
          </View>

          {/* Contador de fotos */}
          <View style={styles.photoCounter}>
            <Text style={styles.photoCounterText}>
              {activeImage + 1} / {animalCase.images.length}
            </Text>
          </View>

          {/* Indicadores das fotos */}
          <View style={styles.pagination}>
            {animalCase.images.map((_, index) => (
              <View
                key={`dot-${index}`}
                style={[
                  styles.paginationDot,
                  activeImage === index &&
                    styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Painel de informações */}
        <View style={styles.detailsPanel}>
          <View style={styles.panelHandle} />

          <View style={styles.statusRow}>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>
                {animalCase.status}
              </Text>
            </View>

            <Text style={styles.caseReference}>
              Caso #{animalCase.id}
            </Text>
          </View>

          <Text style={styles.title}>
            {animalCase.title}
          </Text>

          {/* Localização */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Consultar localização do animal"
            onPress={() =>
              console.log(
                'Localização do caso:',
                animalCase.location,
              )
            }
            style={styles.locationRow}
          >
            <MapPin
              size={19}
              color={colors.primaryDark}
            />

            <View style={styles.locationContent}>
              <Text style={styles.locationText}>
                {animalCase.location}
              </Text>

              <Text style={styles.distanceText}>
                {animalCase.distance}
              </Text>
            </View>

            <Navigation
              size={19}
              color={colors.textSecondary}
            />
          </Pressable>

          {/* Informações e tags do caso */}
          <View style={styles.attributesCard}>
            <Text style={styles.attributesTitle}>
              Informações do animal
            </Text>

            <View style={styles.attributesGrid}>
              {animalCase.tags.map(tag => (
                <AnimalTag
                  key={`${animalCase.id}-${tag}`}
                  label={tag}
                />
              ))}
            </View>
          </View>

          {/* Descrição */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>
              Sobre o caso
            </Text>

            <ExpandableText
              text={animalCase.description}
              numberOfLines={4}
            />
          </View>

          <View style={styles.separator} />

          {/* Responsável pela publicação */}
          <View style={styles.authorSection}>
            <Text style={styles.sectionTitle}>
              Responsável pelo caso
            </Text>

            <CaseAuthorCard
              name={animalCase.author.name}
              imageUri={animalCase.author.imageUri}
              onMessagePress={onMessagePress}
            />
          </View>

          {/* Orientação para ajudar */}
          <View style={styles.helpInfoCard}>
            <View style={styles.helpIcon}>
              <HandHeart
                size={23}
                color={colors.primaryDark}
              />
            </View>

            <View style={styles.helpInfoText}>
              <Text style={styles.helpInfoTitle}>
                Faça parte da solução
              </Text>

              <Text style={styles.helpInfoDescription}>
                Entre em contato para combinar a melhor forma
                de ajudar este animal.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Botão fixo */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 12) },
        ]}
      >
        <PrimaryButton
          label="Quero Ajudar"
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
    paddingBottom: 16,
  },

  hero: {
    height: 390,
    position: 'relative',
    backgroundColor: '#DDE8D7',
  },

  imageCarousel: {
    flex: 1,
  },

  heroImage: {
    width: SCREEN_WIDTH,
    height: 390,
    backgroundColor: '#DDE8D7',
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
  },

  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },

  topBarRight: {
    width: 43,
    alignItems: 'flex-end',
  },

  photoCounter: {
    position: 'absolute',
    right: 18,
    bottom: 60,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  photoCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  pagination: {
    position: 'absolute',
    bottom: 27,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  paginationDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },

  paginationDotActive: {
    width: 19,
    backgroundColor: colors.primary,
  },

  detailsPanel: {
    marginTop: -34,
    paddingTop: 13,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFFFF',
  },

  panelHandle: {
    alignSelf: 'center',
    width: 38,
    height: 4,
    borderRadius: 3,
    backgroundColor: '#E2E2E2',
    marginBottom: 21,
  },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 9,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FFF0EB',
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.danger,
  },

  caseReference: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  title: {
    fontSize: 26,
    lineHeight: 33,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 13,
    paddingHorizontal: 13,
    borderRadius: 14,
    backgroundColor: colors.background,
    marginBottom: 20,
  },

  locationContent: {
    flex: 1,
    gap: 4,
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

  attributesCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#F5F6F4',
    marginBottom: 25,
  },

  attributesTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 13,
  },

  attributesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },

  descriptionSection: {
    gap: 12,
    marginBottom: 23,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },

  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 22,
  },

  authorSection: {
    gap: 13,
    marginBottom: 22,
  },

  helpInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 15,
    borderRadius: 16,
    backgroundColor: '#F0F7ED',
    borderWidth: 1,
    borderColor: '#E2EBDD',
  },

  helpIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  helpInfoText: {
    flex: 1,
    gap: 5,
  },

  helpInfoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },

  helpInfoDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },

  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 13,
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