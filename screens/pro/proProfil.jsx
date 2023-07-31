import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function proProfil() {
  return (
    <View style={styles.container}>
      <Text>Page PRO profil</Text>
      <StatusBar style="auto" />
    </View>
  );
}