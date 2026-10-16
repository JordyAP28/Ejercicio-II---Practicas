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
import { languages, languageOptions } from './translations/languages';

const menuItems = [
  { id: 'login' },
  { id: 'jokes' },
  { id: 'wifi' },
];

export default function App() {
  // La selección del menú decide qué pantalla se muestra.
  const [activeScreen, setActiveScreen] = useState('login');
  const [language, setLanguage] = useState('es');
  const texts = languages[language];

  const navigationHeader = (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>App</Text>
        <Text style={styles.description}>{texts.selectOption}</Text>
        <Text style={styles.languageLabel}>{texts.language}</Text>
        <View style={styles.languageOptions}>
          {languageOptions.map((option) => (
            <Pressable
              key={option.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: language === option.id }}
              onPress={() => setLanguage(option.id)}
              style={[styles.languageButton, language === option.id && styles.activeButton]}
            >
              <Text style={[styles.languageText, language === option.id && styles.activeLabel]}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
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
              {texts[item.id]}
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
      {activeScreen === 'wifi' ? <WifiScreen navigationHeader={navigationHeader} texts={texts} /> : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="none"
        >
          {navigationHeader}
          <View style={styles.content}>
            {activeScreen === 'login' && <LoginScreen texts={texts} />}
            {activeScreen === 'jokes' && <JokesScreen texts={texts} />}
          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  languageLabel: { color: colors.secondary, fontSize: 14, marginTop: 20, marginBottom: 8 },
  languageOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  languageButton: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  languageText: { color: colors.title, fontSize: 14, fontWeight: '600' },
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
