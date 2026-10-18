import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';

import { SuccessPopup } from './src/components/ui/SuccessPopup';
import { ErrorPopup } from './src/components/ui/ErrorPopup';

type Screen = 'login' | 'register' | 'home';

type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState('');

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleRegister(data: User) {
    const normalizedEmail = data.email.trim().toLowerCase();
    const normalizedPhone = data.phone.replace(/\D/g, '');

    const emailExists = users.some(
      user => user.email.trim().toLowerCase() === normalizedEmail
    );

    const phoneExists = users.some(
      user => user.phone.replace(/\D/g, '') === normalizedPhone
    );

   if (emailExists || phoneExists) {
     setErrorMessage(
       'Esse e-mail ou esse telefone já estão cadastrados.'
      );
     setShowErrorPopup(true);
     return;
   }

    setUsers(currentUsers => [
      ...currentUsers,
      {
        ...data,
        email: normalizedEmail,
        phone: normalizedPhone,
      },
    ]);

    setSuccessMessage('Sua conta foi criada com sucesso.');
    setCurrentScreen('login');
    setShowSuccess(true);
  }

  function handleLogin(data: {
    email: string;
    password: string;
  }): boolean {
    const normalizedEmail = data.email.trim().toLowerCase();

    const user = users.find(
      registeredUser =>
        registeredUser.email === normalizedEmail &&
        registeredUser.password === data.password
    );

    if (!user) {
      return false;
    }

    setUserName(user.name);
    setCurrentScreen('home');
    return true;
  }

  function handleLogout() {
    setUserName('');
    setCurrentScreen('login');
  }

  function handleOpenRegister() {
    setShowErrorPopup(false);
    setCurrentScreen('register');
  }

  function handleOpenLogin() {
    setShowErrorPopup(false);
    setCurrentScreen('login');
  }

  return (
    <SafeAreaProvider>
      {currentScreen === 'login' && (
        <LoginScreen
          onRegisterPress={handleOpenRegister}
          onForgotPasswordPress={() =>
            console.log(
              'Recuperação de senha ainda não implementada.'
            )
          }
          onLogin={handleLogin}
        />
      )}

      {currentScreen === 'register' && (
        <RegisterScreen
          onLoginPress={handleOpenLogin}
          onRegister={handleRegister}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen
          userName={userName}
          onLogout={handleLogout}
        />
      )}

      <SuccessPopup
        visible={showSuccess && currentScreen === 'login'}
        message={successMessage}
        onClose={() => setShowSuccess(false)}
        duration={2500}
      />

      <ErrorPopup
        visible={showErrorPopup && currentScreen === 'register'}
        message={errorMessage}
        onClose={() => setShowErrorPopup(false)}
      />
    </SafeAreaProvider>
  );
}