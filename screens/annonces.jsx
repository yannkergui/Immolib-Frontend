import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function annonces() {
  return (
    <View style={styles.container}>
      <Text>Page annonces</Text>
      <StatusBar style="auto" />
    </View>
  );
}