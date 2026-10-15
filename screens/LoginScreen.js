import { Text, View } from 'react-native';
import { screenStyles } from '../styles/theme';

export default function LoginScreen() {
  return (
    <View style={screenStyles.card}>
      <Text style={screenStyles.title}>Login</Text>
      <Text style={screenStyles.description}>Acceso con usuario y contraseña.</Text>
    </View>
  );
}
