import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { getRandomJoke } from '../services/jokesApi';
import { colors, screenStyles } from '../styles/theme';

export default function JokesScreen({ texts }) {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadJoke() {
    setLoading(true);
    setError('');
    try {
      setJoke(await getRandomJoke());
    } catch {
      setError('jokeError');
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
      <Text style={screenStyles.title}>{texts.jokes}</Text>
      <Text style={screenStyles.description}>{texts.jokesDescription}</Text>

      <View style={styles.jokeBox}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={colors.primary} />
            <Text style={screenStyles.description}>{texts.jokeLoading}</Text>
          </View>
        ) : (
          joke ? <Text style={styles.joke}>{joke}</Text> : null
        )}
        {error ? <Text accessibilityRole="alert" style={styles.error}>{texts[error]}</Text> : null}
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
          {loading ? texts.loading : texts.refresh}
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
