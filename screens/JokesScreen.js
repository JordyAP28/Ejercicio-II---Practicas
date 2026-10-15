import { Text, View } from 'react-native';
import { screenStyles } from '../styles/theme';

export default function JokesScreen() {
  return (
    <View style={screenStyles.card}>
      <Text style={screenStyles.title}>Jokes</Text>
      <Text style={screenStyles.description}>Chistes de Chuck Norris.</Text>
    </View>
  );
}
