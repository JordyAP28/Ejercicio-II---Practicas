import { Text, View } from 'react-native';
import { screenStyles } from '../styles/theme';

export default function WifiScreen() {
  return (
    <View style={screenStyles.card}>
      <Text style={screenStyles.title}>Wifi</Text>
      <Text style={screenStyles.description}>Redes Wi-Fi cercanas.</Text>
    </View>
  );
}
