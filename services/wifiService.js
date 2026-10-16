import WifiManager from 'react-native-wifi-reborn';
import { PermissionsAndroid, Platform } from 'react-native';

export async function scanWifiNetworks() {
  // La pantalla traduce estas claves según el idioma seleccionado.
  if (Platform.OS !== 'android') throw new Error('androidOnly');
  if (!WifiManager) throw new Error('updateApk');
  if (!await WifiManager.isEnabled()) throw new Error('wifiOff');

  // Android pide ambos permisos juntos para poder elegir ubicación precisa.
  const permissions = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ]);
  const location = permissions[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
  if (location !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error(location === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ? 'locationBlocked'
      : 'locationDenied');
  }

  let timeout;
  try {
    const networks = await Promise.race([
      WifiManager.reScanAndLoadWifiList(),
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(new Error('scanTimeout')), 20000);
      }),
    ]);
    // La librería devuelve un mensaje si Android rechaza un escaneo frecuente.
    if (!Array.isArray(networks)) {
      throw new Error('scanLimited');
    }
    return networks.sort((first, second) => second.level - first.level);
  } catch (error) {
    if (error.code === 'locationServicesOff') {
      throw new Error('locationOff');
    }
    if (error.code === 'locationPermissionMissing') {
      throw new Error('locationMissing');
    }
    if (error.code) throw new Error('scanError');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
