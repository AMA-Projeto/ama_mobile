import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  ViewStyle,
} from 'react-native';

type IconActionButtonProps = {
  icon: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
  backgroundColor?: string;
  size?: number;
  style?: ViewStyle;
  disabled?: boolean;
};

export function IconActionButton({
  icon,
  onPress,
  accessibilityLabel,
  backgroundColor = 'transparent',
  size = 44,
  style,
  disabled = false,
}: IconActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});