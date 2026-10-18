import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import type { ReactNode } from 'react';

export type AppTextInputProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  error?: string;
  rightElement?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function AppTextInput({
  label,
  error,
  rightElement,
  containerStyle,
  inputStyle,
  ...inputProps
}: AppTextInputProps) {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : null,
        ]}
      >
        <TextInput
          {...inputProps}
          style={[styles.input, inputStyle]}
          placeholderTextColor={
            inputProps.placeholderTextColor ?? '#858585'
          }
        />

        {rightElement ? (
          <View style={styles.rightElement}>
            {rightElement}
          </View>
        ) : null}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },

  label: {
    marginBottom: 8,
    color: '#222222',
    fontSize: 14,
    fontWeight: '600',
  },

  inputContainer: {
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#858585',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },

  input: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 10,
    paddingVertical: 9,
    color: '#111111',
    fontSize: 16,
  },

  rightElement: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10,
  },

  inputError: {
    borderColor: '#C62828',
  },

  errorText: {
    marginTop: 5,
    color: '#C62828',
    fontSize: 12,
  },
});