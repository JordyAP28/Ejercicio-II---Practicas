import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { getRandomJoke } from '../services/jokesApi';
import { colors, screenStyles } from '../styles/theme';

export default function JokesScreen() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadJoke() {
    setLoading(true);
    setError('');
    try {
      setJoke(await getRandomJoke());
    } catch {
      setError('No se pudo cargar el chiste. Revisa tu conexión e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  // Al entrar a esta pantalla se pide el primer chiste.
  useEffect(() => {
    loadJoke();
  }, []);

  return (
    <View style={screenStyles.card}>
      <Text style={screenStyles.title}>Jokes</Text>
      <Text style={screenStyles.description}>Chistes de Chuck Norris.</Text>

      <View style={styles.jokeBox}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} />
            <Text style={screenStyles.description}>Cargando chiste...</Text>
          </View>
        ) : (
          joke ? <Text style={styles.joke}>{joke}</Text> : null
        )}
        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityState={{ disabled: loading }}
        disabled={loading}
        onPress={loadJoke}
        style={({ pressed }) => [
          screenStyles.button,
          (pressed || loading) && screenStyles.buttonPressed,
        ]}
      >
        <Text style={screenStyles.buttonText}>
          {loading ? 'Cargando...' : 'Actualizar'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  jokeBox: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    minHeight: 120,
    justifyContent: 'center',
  },
  joke: {
    color: colors.title,
    fontSize: 18,
    lineHeight: 28,
  },
  loading: {
    alignItems: 'center',
    gap: 12,
  },
  error: {
    color: '#B91C1C',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
});
