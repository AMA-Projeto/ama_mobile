import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

import { AppTextInput } from './AppTextInput';

import type { AppTextInputProps } from './AppTextInput';

type PasswordInputProps = Omit<
  AppTextInputProps,
  'rightElement' | 'secureTextEntry'
>;

export function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <AppTextInput
      {...props}
      secureTextEntry={!visible}
      rightElement={
        <Pressable
          onPress={() => setVisible((current) => !current)}
          accessibilityRole="button"
          accessibilityLabel={
            visible ? 'Ocultar senha' : 'Mostrar senha'
          }
          hitSlop={10}
          style={styles.eyeButton}
        >
          {visible ? (
            <Eye size={22} color="#777777" />
          ) : (
            <EyeOff size={22} color="#777777" />
          )}
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  eyeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});