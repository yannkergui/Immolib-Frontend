import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function clients() {
  return (
    <View style={styles.container}>
      <Text>Page clients</Text>
      <StatusBar style="auto" />
    </View>
  );
}