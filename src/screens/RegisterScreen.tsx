import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTextInput } from '../components/ui/AppTextInput';
import { PasswordInput } from '../components/ui/PasswordInput';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import { FormMessage } from '../components/ui/FormMessage';

type RegisterData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type RegisterScreenProps = {
  onLoginPress?: () => void;
  onRegister?: (data: RegisterData) => void;
  externalError?: string;
};

export default function RegisterScreen({
  onLoginPress,
  onRegister,
  externalError,
}: RegisterScreenProps) {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function handlePhoneChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11);

    let formatted = '';

    if (digits.length > 0) {
      formatted = `(${digits.slice(0, 2)}`;

      if (digits.length >= 3) {
        formatted += `) ${digits[2]}`;
      }

      if (digits.length >= 4) {
        formatted += ` ${digits.slice(3, 7)}`;
      }

      if (digits.length >= 8) {
        formatted += `-${digits.slice(7, 11)}`;
      }
    }

    setPhone(formatted);
  }

  function handleRegister() {
    setError('');

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError('Preencha todos os campos.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@gmail\.com$/.test(normalizedEmail)) {
      setError('Digite um e-mail válido terminado em @gmail.com.');
      return;
    }

    const phoneDigits = phone.replace(/\D/g, '');

    if (phoneDigits.length !== 11) {
      setError('Digite um celular válido no formato (00) 0 0000-0000.');
      return;
    }

    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (!/\d/.test(password)) {
      setError('A senha deve conter pelo menos um número.');
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setError('A senha deve conter pelo menos um caractere especial.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (!onRegister) {
      setError('Não foi possível concluir o cadastro.');
      return;
    }

    onRegister({
      name: name.trim(),
      email: normalizedEmail,
      phone: phoneDigits,
      password,
    });
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 12) },
          ]}
        >
          <View style={styles.hero}>
            <View style={styles.logo} />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Criar Conta</Text>

            <View style={styles.form}>
              <AppTextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                accessibilityLabel="Nome completo"
                containerStyle={styles.field}
              />

              <AppTextInput
                placeholder="Email@dominio.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={254}
                returnKeyType="next"
                accessibilityLabel="E-mail Gmail"
                containerStyle={styles.field}
              />

              <AppTextInput
                placeholder="(00) 0 0000-0000"
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                maxLength={16}
                returnKeyType="next"
                accessibilityLabel="Celular com DDD"
                containerStyle={styles.field}
              />

              <PasswordInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                returnKeyType="next"
                accessibilityLabel="Senha"
                containerStyle={styles.field}
              />

              <PasswordInput
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                returnKeyType="done"
                onSubmitEditing={handleRegister}
                accessibilityLabel="Confirmar senha"
                containerStyle={styles.field}
              />

              {error ? (
                <FormMessage
                  message={error}
                  variant="error"
                  style={styles.message}
                />
              ) : externalError ? (
                <FormMessage
                  message={externalError}
                  variant="error"
                  style={styles.message}
                />
              ) : null}

              <PrimaryButton
                label="Criar"
                onPress={handleRegister}
                style={styles.submitButton}
              />

              <View style={styles.loginRow}>
                <Text style={styles.loginText}>
                  Já tem uma conta?
                </Text>

                <Pressable
                  onPress={onLoginPress}
                  accessibilityRole="button"
                  accessibilityLabel="Ir para Login"
                  hitSlop={8}
                >
                  <Text style={styles.loginLink}>Login.</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },

  hero: {
    height: 140,
    paddingHorizontal: 24,
    paddingTop: 48,
    backgroundColor: '#EAEAEA',
  },

  logo: {
    width: 38,
    height: 38,
    borderRadius: 5,
    backgroundColor: '#FFD000',
  },

  formContainer: {
    flex: 1,
    marginTop: -18,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 48,
  },

  title: {
    marginBottom: 22,
    color: '#000000',
    fontSize: 23,
    fontWeight: '800',
  },

  form: {
    width: '100%',
  },

  field: {
    marginBottom: 13,
  },

  message: {
    marginTop: 0,
    marginBottom: 10,
  },

  submitButton: {
    marginTop: 18,
    marginBottom: 10,
  },

  loginRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },

  loginText: {
    color: '#111111',
    fontSize: 14,
  },

  loginLink: {
    color: '#DDB500',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});