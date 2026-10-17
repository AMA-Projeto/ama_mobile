import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from './src/theme/colors';
import { typography } from './src/theme/typography';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AMA</Text>
      <Text style={styles.subtitle}>
        Assistência e Mobilização Animal
      </Text>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    ...typography.title,
    color: colors.primaryDark,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
  },
});
