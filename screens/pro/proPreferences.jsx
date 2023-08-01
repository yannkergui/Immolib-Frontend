import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function ProPreferences() {
  return (
    <View style={styles.main}>
      <Text>Page PRO préférences Profil</Text>
      <Image source={{ uri: '../assets/alice.jpeg' }} style={styles.photo}/>
      
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  photo: {
    margin: 10,
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 4,
},
})