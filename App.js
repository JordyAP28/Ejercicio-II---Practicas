import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar as NativeStatusBar,
  StyleSheet, Text, View,
} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import JokesScreen from './screens/JokesScreen';
import WifiScreen from './screens/WifiScreen';
import { colors } from './styles/theme';

const menuItems = [
  { id: 'login', label: 'Login' },
  { id: 'jokes', label: 'Jokes' },
  { id: 'wifi', label: 'Wifi' },
];

export default function App() {
  // La selección del menú decide qué pantalla se muestra.
  const [activeScreen, setActiveScreen] = useState('login');

  const navigationHeader = (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>App</Text>
        <Text style={styles.description}>Selecciona una opción</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeScreen === item.id }}
            onPress={() => setActiveScreen(item.id)}
            style={({ pressed }) => [
              styles.menuButton,
              activeScreen === item.id && styles.activeButton,
              pressed && styles.pressedButton,
            ]}
          >
            <Text style={[
              styles.menuLabel,
              activeScreen === item.id && styles.activeLabel,
            ]}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      {/* Wifi usa su propia lista; Login y Jokes comparten el desplazamiento. */}
      {activeScreen === 'wifi' ? <WifiScreen navigationHeader={navigationHeader} /> : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
        >
          {navigationHeader}
          <View style={styles.content}>
            {activeScreen === 'login' && <LoginScreen />}
            {activeScreen === 'jokes' && <JokesScreen />}
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? NativeStatusBar.currentHeight : 48,
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    color: colors.title,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    color: colors.secondary,
    fontSize: 16,
  },
  menu: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  menuButton: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  activeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressedButton: {
    opacity: 0.8,
  },
  menuLabel: {
    color: colors.title,
    fontSize: 16,
    fontWeight: '600',
  },
  activeLabel: {
    color: colors.surface,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
