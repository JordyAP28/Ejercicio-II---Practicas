import WifiManager from 'react-native-wifi-reborn';
import { PermissionsAndroid, Platform } from 'react-native';

export async function scanWifiNetworks() {
  if (Platform.OS !== 'android') throw new Error('El escaneo está disponible en Android.');
  if (!WifiManager) throw new Error('Instala el APK actualizado para usar el escaneo Wi-Fi.');
  if (!await WifiManager.isEnabled()) throw new Error('Activa el Wi-Fi del teléfono y vuelve a escanear.');

  // Android pide ambos permisos juntos para poder elegir ubicación precisa.
  const permissions = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  ]);
  const location = permissions[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
  if (location !== PermissionsAndroid.RESULTS.GRANTED) {
    throw new Error(location === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ? 'Habilita la ubicación precisa para App desde los ajustes de permisos.'
      : 'Permite la ubicación precisa para poder detectar redes Wi-Fi.');
  }

  let timeout;
  try {
    const networks = await Promise.race([
      WifiManager.reScanAndLoadWifiList(),
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(new Error('El escaneo tardó demasiado. Intenta de nuevo.')), 20000);
      }),
    ]);
    // La librería devuelve un mensaje si Android rechaza un escaneo frecuente.
    if (!Array.isArray(networks)) {
      throw new Error('Android no pudo iniciar otro escaneo. Espera un momento antes de reintentar.');
    }
    return networks.sort((first, second) => second.level - first.level);
  } catch (error) {
    if (error.code === 'locationServicesOff') {
      throw new Error('Activa la ubicación del teléfono y vuelve a escanear.');
    }
    if (error.code === 'locationPermissionMissing') {
      throw new Error('Permite la ubicación precisa en los ajustes de App.');
    }
    if (error.code) throw new Error('No se pudo completar el escaneo. Revisa Wi-Fi y ubicación e intenta de nuevo.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
