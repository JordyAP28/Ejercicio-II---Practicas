import { useState } from 'react';
import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, screenStyles } from '../styles/theme';

export default function LoginScreen({ texts }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleLoginPress() {
    Keyboard.dismiss();
    // Mensaje para indicar que solo es una demostracion de inicio de sesion
    Alert.alert(texts.loginAlertTitle, texts.loginAlert, [{ text: texts.ok }]);
  }

  return (
    <View style={[screenStyles.card, styles.card]}>
      <Text style={styles.eyebrow}>{texts.access}</Text>
      <Text style={[screenStyles.title, styles.title]}>{texts.signIn}</Text>
      <Text style={screenStyles.description}>{texts.loginDescription}</Text>

      <Text style={screenStyles.label}>{texts.username}</Text>
      <TextInput
        accessibilityLabel={texts.username}
        style={screenStyles.input}
        placeholder={texts.usernamePlaceholder}
        placeholderTextColor={colors.secondary}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={screenStyles.label}>{texts.password}</Text>
      <View style={styles.passwordField}>
        <TextInput
          accessibilityLabel={texts.password}
          style={[screenStyles.input, styles.passwordInput]}
          placeholder={texts.passwordPlaceholder}
          placeholderTextColor={colors.secondary}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={!showPassword}
          returnKeyType="done"
          onSubmitEditing={handleLoginPress}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={showPassword ? texts.hidePassword : texts.showPassword}
          onPress={() => setShowPassword((previous) => !previous)}
          style={({ pressed }) => [styles.visibilityButton, pressed && screenStyles.buttonPressed]}
        >
          <Text style={styles.visibilityText}>{showPassword ? texts.hide : texts.show}</Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={handleLoginPress}
        style={({ pressed }) => [
          screenStyles.button,
          pressed && screenStyles.buttonPressed,
        ]}
      >
        <Text style={screenStyles.buttonText}>{texts.enter}</Text>
      </Pressable>
      <Text style={[screenStyles.note, styles.note]}>{texts.loginNote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderTopWidth: 4,
    borderTopColor: colors.primary,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.background,
  },
  passwordInput: {
    flex: 1,
    minWidth: 0,
    borderWidth: 0,
  },
  visibilityButton: {
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  visibilityText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  note: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 24,
    paddingTop: 16,
  },
});
