import { StyleSheet, Text, View, Image } from 'react-native';

export default function ProPreferences() {
  return (
    <View style={styles.main}>
      <Text>Mon profil</Text>
      <View style = {styles.accredit}>
          <View style = {styles.imageContainer}>
            <Image source={{ uri : '.../assets/welcomepage.jpg' }} style={styles.photo}/>
            <Text>Modifiez votre photo</Text>
          </View>
          <View>
            <Text>Alice du Pays</Text>
            <Text>alice.dypays@merveilles.fr</Text>
            <Text>Agence des Merveilles</Text>
          </View>
      </View>
      <Text>Mes préférences</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accredit: {
    flexDirection: "row",
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
},
  photo: {
    width: 100,
    height: 100,
    borderRadius: 30
    borderColor: 'black',
    borderWidth: 4,
},
})