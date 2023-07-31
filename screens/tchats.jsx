import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function tchats() {
  return (
    <View style={styles.container}>
      <Text>Page tchats</Text>
      <StatusBar style="auto" />
    </View>
  );
}