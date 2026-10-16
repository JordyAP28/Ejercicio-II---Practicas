import { useState } from 'react';
import { ActivityIndicator, FlatList, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { scanWifiNetworks } from '../services/wifiService';
import { colors, screenStyles } from '../styles/theme';

export default function WifiScreen({ navigationHeader }) {
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasScanned, setHasScanned] = useState(false);

  async function scanNetworks() {
    setLoading(true);
    setError('');
    setNetworks([]);
    setHasScanned(false);
    try {
      setNetworks(await scanWifiNetworks());
      setHasScanned(true);
    } catch (scanError) {
      setError(scanError.message || 'No se pudieron detectar las redes. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={networks}
      keyExtractor={(item) => item.BSSID}
      ListHeaderComponent={(
        <>
          {navigationHeader}
          <View style={styles.header}>
            <View style={screenStyles.card}>
              <Text style={screenStyles.title}>Wifi</Text>
              <Text style={screenStyles.description}>Detecta las redes Wi-Fi cercanas.</Text>
              <Text style={styles.hint}>Activa Wi-Fi y ubicación. Android necesita permiso de ubicación precisa para escanear.</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: loading }}
                disabled={loading}
                onPress={scanNetworks}
                style={({ pressed }) => [screenStyles.button, (pressed || loading) && screenStyles.buttonPressed]}
              >
                {loading && <ActivityIndicator color={colors.surface} />}
                <Text style={screenStyles.buttonText}>{loading ? 'Escaneando...' : 'Escanear redes'}</Text>
              </Pressable>
              {error ? (
                <>
                  <Text accessibilityRole="alert" style={styles.error}>{error}</Text>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => Linking.openSettings().catch(() => setError('Abre los ajustes del teléfono y revisa los permisos de App.'))}
                    style={styles.settingsButton}
                  >
                    <Text style={styles.settingsText}>Abrir ajustes de la app</Text>
                  </Pressable>
                </>
              ) : null}
              {hasScanned && <Text style={screenStyles.note}>Redes encontradas: {networks.length}</Text>}
            </View>
          </View>
        </>
      )}
      ListEmptyComponent={hasScanned && !loading ? (
        <Text style={styles.empty}>No se encontraron redes cercanas. Puedes volver a escanear.</Text>
      ) : null}
      renderItem={({ item }) => (
        <View style={styles.network}>
          <Text style={styles.networkName}>
            {!item.SSID || item.SSID === '(hidden SSID)' ? 'Red oculta' : item.SSID}
          </Text>
          <Text style={styles.hint}>Señal: {item.level} dBm · Frecuencia: {item.frequency} MHz</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  listContent: { paddingBottom: 24 },
  header: { marginHorizontal: 24 },
  hint: { color: colors.secondary, fontSize: 14, lineHeight: 21, marginTop: 8 },
  error: { color: '#B91C1C', fontSize: 15, lineHeight: 22, marginTop: 16 },
  settingsButton: { paddingVertical: 12 },
  settingsText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  empty: { color: colors.secondary, padding: 24, textAlign: 'center', lineHeight: 22 },
  network: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 24,
    marginTop: 12,
  },
  networkName: { color: colors.title, fontSize: 17, fontWeight: '600' },
});
