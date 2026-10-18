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

type LoginScreenProps = {
  onRegisterPress?: () => void;
  onForgotPasswordPress?: () => void;
  onLogin?: (data: {
    email: string;
    password: string;
  }) => boolean;
};

export default function LoginScreen({
  onRegisterPress,
  onForgotPasswordPress,
  onLogin,
}: LoginScreenProps) {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    setError('');

    if (!email.trim() || !password) {
      setError('Preencha o e-mail e a senha.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Digite um endereço de e-mail válido.');
      return;
    }

    if (!onLogin) {
      setError('A autenticação ainda não foi configurada.');
      return;
    }

    const authenticated = onLogin({
      email: normalizedEmail,
      password,
    });

    if (!authenticated) {
      setError('E-mail ou senha incorretos.');
    }
  }

  return (
    <View style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 8) },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hero}>
            <View style={styles.logo} />

            <Text style={styles.welcomeTitle}>
              Seja
              {'\n'}
              Bem-Vindo!
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Login</Text>

            <View style={styles.form}>
              <AppTextInput
                placeholder="email@dominio.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={254}
                returnKeyType="next"
                accessibilityLabel="E-mail"
                containerStyle={styles.field}
              />

              <PasswordInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
                accessibilityLabel="Senha"
                containerStyle={styles.field}
              />

              <Pressable
                onPress={onForgotPasswordPress}
                accessibilityRole="button"
                accessibilityLabel="Recuperar senha"
                hitSlop={8}
                style={styles.forgotPasswordContainer}
              >
                <Text style={styles.forgotPassword}>
                  Esqueceu sua senha?
                </Text>
              </Pressable>

              {error ? (
                <FormMessage
                  message={error}
                  variant="error"
                  style={styles.message}
                />
              ) : null}

              <PrimaryButton
                label="Login"
                onPress={handleLogin}
                style={styles.submitButton}
              />

              <View style={styles.registerRow}>
                <Text style={styles.registerText}>
                  Não tem uma conta?
                </Text>

                <Pressable
                  onPress={onRegisterPress}
                  accessibilityRole="button"
                  accessibilityLabel="Criar conta"
                  hitSlop={8}
                >
                  <Text style={styles.registerLink}>Criar.</Text>
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
    minHeight: 0,
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 36,
    backgroundColor: '#EAEAEA',
  },

  logo: {
    width: 42,
    height: 42,
    borderRadius: 6,
    backgroundColor: '#FFD000',
    marginBottom: 20,
  },

  welcomeTitle: {
    color: '#E5BC00',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    marginBottom: 16,
  },

  formContainer: {
    flexGrow: 1,
    marginTop: -18,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 48,
  },

  title: {
    marginBottom: 30,
    color: '#000000',
    fontSize: 26,
    fontWeight: '800',
  },

  form: {
    width: '100%',
  },

  field: {
    marginBottom: 14,
  },

  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginTop: -4,
    marginBottom: 24,
  },

  forgotPassword: {
    color: '#DDB500',
    fontSize: 15,
    textDecorationLine: 'underline',
  },

  message: {
    marginTop: 0,
    marginBottom: 12,
  },

  submitButton: {
    marginTop: 12,
    marginBottom: 14,
  },

  registerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
  },

  registerText: {
    color: '#111111',
    fontSize: 15,
  },

  registerLink: {
    color: '#DDB500',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});