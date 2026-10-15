import { useState } from 'react';
import { Alert, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, screenStyles } from '../styles/theme';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleLoginPress() {
    Keyboard.dismiss();
    // El ejercicio pide una interfaz de login, sin autenticación real.
    Alert.alert('Inicio de sesión', 'No se inició sesión porque esta pantalla es una demostración.');
  }

  return (
    <View style={[screenStyles.card, styles.card]}>
      <Text style={styles.eyebrow}>ACCESO A LA APLICACIÓN</Text>
      <Text style={[screenStyles.title, styles.title]}>Iniciar sesión</Text>
      <Text style={screenStyles.description}>Ingresa tu usuario y contraseña.</Text>

      <Text style={screenStyles.label}>Usuario</Text>
      <TextInput
        accessibilityLabel="Usuario"
        style={screenStyles.input}
        placeholder="Escribe tu usuario"
        placeholderTextColor={colors.secondary}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={screenStyles.label}>Contraseña</Text>
      <View style={styles.passwordField}>
        <TextInput
          accessibilityLabel="Contraseña"
          style={[screenStyles.input, styles.passwordInput]}
          placeholder="Escribe tu contraseña"
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
          accessibilityLabel={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          onPress={() => setShowPassword((previous) => !previous)}
          style={({ pressed }) => [styles.visibilityButton, pressed && screenStyles.buttonPressed]}
        >
          <Text style={styles.visibilityText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
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
        <Text style={screenStyles.buttonText}>Ingresar</Text>
      </Pressable>
      <Text style={[screenStyles.note, styles.note]}>Demostración de inicio de sesión.</Text>
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
