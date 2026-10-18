import { useState } from 'react';

import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ChevronLeft, ImagePlus, MapPin, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTextInput } from '../components/ui/AppTextInput';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { AnimalCase } from '../data/cases';
import { colors } from '../theme/colors';

type AddCaseScreenProps = {
  userName: string;
  userPhotoUri?: string | null;
  onBack: () => void;
  onSubmit: (newCase: AnimalCase) => void;
};

const animalTypes = ['Cachorro', 'Gato', 'Outro'];
const animalAges = ['Filhote', 'Adulto', 'Idoso', 'Não sei'];
const MAX_PHOTOS = 5;

export default function AddCaseScreen({
  userName,
  userPhotoUri,
  onBack,
  onSubmit,
}: AddCaseScreenProps) {
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [animalType, setAnimalType] = useState('Cachorro');
  const [age, setAge] = useState('Não sei');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [isUrgent, setIsUrgent] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSelectPhotos() {
    if (imageUris.length >= MAX_PHOTOS) {
      Alert.alert(
        'Limite de fotos',
        `Você pode adicionar até ${MAX_PHOTOS} fotos por caso.`,
      );
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Permita o acesso à galeria para selecionar fotos do animal.',
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: MAX_PHOTOS - imageUris.length,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const selectedUris = result.assets.map(asset => asset.uri);
      setImageUris(currentUris =>
        [...currentUris, ...selectedUris]
          .filter((uri, index, allUris) => allUris.indexOf(uri) === index)
          .slice(0, MAX_PHOTOS),
      );
      setErrors(currentErrors => {
        const { images, ...remainingErrors } = currentErrors;
        return remainingErrors;
      });
    }
  }

  function handleRemovePhoto(uriToRemove: string) {
    setImageUris(currentUris =>
      currentUris.filter(uri => uri !== uriToRemove),
    );
  }

  function handleSubmit() {
    const nextErrors: Record<string, string> = {};

    if (!title.trim()) {
      nextErrors.title = 'Informe um título para o caso.';
    }

    if (!location.trim()) {
      nextErrors.location = 'Informe a localização do animal.';
    }

    if (!description.trim()) {
      nextErrors.description = 'Descreva a situação do animal.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);

      Alert.alert(
        'Confira os campos',
        'Preencha os campos obrigatórios antes de publicar.',
      );
      return;
    }

    const tags = [
      animalType,
      ...(age !== 'Não sei' ? [age] : []),
      ...(isUrgent ? ['Urgente'] : []),
    ];

    const fallbackImage =
      animalType === 'Gato'
        ? 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900'
        : 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=900';

    const newCase: AnimalCase = {
      id: `case-${Date.now()}`,
      title: title.trim(),
      location: location.trim(),
      distance: 'Distância não calculada',
      status: isUrgent ? 'Urgente' : 'Em busca de ajuda',
      animalType,
      age,
      tags,
      description: description.trim(),
      images: imageUris.length > 0 ? imageUris : [fallbackImage],
      author: {
        name: userName.trim() || 'Usuário AMA',
        imageUri: userPhotoUri || '',
      },
    };

    setErrors({});
    setIsSubmitting(true);

    try {
      onSubmit(newCase);
    } catch {
      setIsSubmitting(false);
      Alert.alert(
        'Erro ao publicar',
        'Não foi possível cadastrar o caso. Tente novamente.',
      );
    }
  }

  function renderOptions(
    options: string[],
    selected: string,
    onSelect: (value: string) => void,
  ) {
    return (
      <View style={styles.options}>
        {options.map(option => {
          const active = selected === option;

          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => onSelect(option)}
              style={[
                styles.option,
                active && styles.optionActive,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  active && styles.optionTextActive,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  }

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top },
      ]}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar para a tela anterior"
          onPress={onBack}
          style={styles.backButton}
        >
          <ChevronLeft size={25} color={colors.text} />
        </Pressable>

        <Text style={styles.headerTitle}>Adicionar caso</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 24) + 20,
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.intro}>
          <Text style={styles.pageTitle}>Cadastre um caso</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.photoSection}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Selecionar fotos da galeria"
              onPress={handleSelectPhotos}
              style={styles.photoPicker}
            >
              {imageUris.length === 0 ? (
                <View style={styles.photoPickerEmpty}>
                  <ImagePlus size={28} color={colors.textSecondary} />
                  <Text style={styles.photoPickerTitle}>Adicionar fotos</Text>
                  <Text style={styles.photoPickerHint}>
                    Selecione até {MAX_PHOTOS} imagens da galeria
                  </Text>
                </View>
              ) : (
                <View style={styles.photoGrid}>
                  {imageUris.map(uri => (
                    <View key={uri} style={styles.photoPreview}>
                      <Image source={{ uri }} style={styles.photoImage} />
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Remover foto"
                        onPress={() => handleRemovePhoto(uri)}
                        style={styles.removePhotoButton}
                        hitSlop={8}
                      >
                        <X size={15} color="#FFFFFF" />
                      </Pressable>
                    </View>
                  ))}
                  {imageUris.length < MAX_PHOTOS && (
                    <View style={styles.addAnotherPhoto}>
                      <ImagePlus size={22} color={colors.textSecondary} />
                      <Text style={styles.addAnotherPhotoText}>Adicionar</Text>
                    </View>
                  )}
                </View>
              )}
            </Pressable>
            <Text style={styles.photoHelper}>
              Fotos são opcionais. Você pode selecionar mais de uma.
            </Text>
          </View>

          <AppTextInput
            label="Título do caso *"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex.: Cachorro encontrado ferido"
            error={errors.title}
            maxLength={80}
          />

          <View style={styles.field}>
            <Text style={styles.label}>Tipo de animal *</Text>
            {renderOptions(animalTypes, animalType, setAnimalType)}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Idade aproximada</Text>
            {renderOptions(animalAges, age, setAge)}
          </View>

          <AppTextInput
            label="Localização *"
            value={location}
            onChangeText={setLocation}
            placeholder="Ex.: Centro, Anápolis - GO"
            error={errors.location}
          />

          <View style={styles.field}>
            <View style={styles.labelRow}>
              <MapPin size={17} color={colors.primaryDark} />
              <Text style={styles.label}>Situação do animal</Text>
            </View>

            <View style={styles.urgencyOptions}>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: isUrgent }}
                onPress={() => setIsUrgent(true)}
                style={[
                  styles.urgencyOption,
                  isUrgent && styles.urgencyActive,
                ]}
              >
                <Text
                  style={[
                    styles.urgencyText,
                    isUrgent && styles.urgencyTextActive,
                  ]}
                >
                  Urgente
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: !isUrgent }}
                onPress={() => setIsUrgent(false)}
                style={[
                  styles.urgencyOption,
                  !isUrgent && styles.optionActive,
                ]}
              >
                <Text
                  style={[
                    styles.urgencyText,
                    !isUrgent && styles.optionTextActive,
                  ]}
                >
                  Não urgente
                </Text>
              </Pressable>
            </View>
          </View>

          <AppTextInput
            label="Descrição do caso *"
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva onde o animal está, seu estado e que tipo de ajuda precisa..."
            error={errors.description}
            multiline
            numberOfLines={5}
            maxLength={1000}
            inputStyle={styles.descriptionInput}
          />

          <PrimaryButton
            label="Cancelar"
            onPress={onBack}
            variant="secondary"
          />

          <PrimaryButton
            label="Publicar"
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    padding: 20,
  },

  intro: {
    alignItems: 'flex-start',
    marginBottom: 18,
    paddingHorizontal: 0,
  },

  pageTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'left',
    letterSpacing: -0.4,
  },

  form: {
    gap: 20,
  },

  photoSection: {
    gap: 8,
  },

  photoPicker: {
    minHeight: 150,
    borderRadius: 14,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoPickerEmpty: {
    minHeight: 150,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    padding: 16,
  },

  photoPickerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  photoPickerHint: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  photoGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 10,
  },

  photoPreview: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },

  photoImage: {
    width: '100%',
    height: '100%',
  },

  removePhotoButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addAnotherPhoto: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
  },

  addAnotherPhotoText: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  photoHelper: {
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },

  field: {
    gap: 9,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9,
  },

  option: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },

  optionActive: {
    borderColor: colors.primaryDark,
    backgroundColor: '#FFF5C2',
  },

  optionText: {
    fontSize: 13,
    color: colors.text,
  },

  optionTextActive: {
    fontWeight: '700',
    color: colors.text,
  },

  urgencyOptions: {
    flexDirection: 'row',
    gap: 10,
  },

  urgencyOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 45,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
  },

  urgencyActive: {
    backgroundColor: colors.dangerBackground,
    borderColor: colors.danger,
  },

  urgencyText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },

  urgencyTextActive: {
    color: colors.danger,
    fontWeight: '800',
  },

  descriptionInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  submitButton: {
    marginTop: 5,
  },
});