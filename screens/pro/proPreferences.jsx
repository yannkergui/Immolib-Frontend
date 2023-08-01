import { StyleSheet, Text, View, Image } from 'react-native';

export default function ProPreferences() {
  return (
    <View style={styles.main}>
      <Text>Mon profil</Text>
      <View style = {styles.accredit}>
          <View style = {styles.accreditImage}>
            <Image source={{ uri : '.../assets/welcomepage.jpg' }} style={styles.photo}/>
            <Text>Modifiez votre photo</Text>
          </View>
          <View style = {styles.accreditTexts}>
            <Text>Alice du Pays</Text>
            <Text>alice.dupays@merveilles.fr</Text>
            <Text>Agence des Merveilles</Text>
          </View>
      </View>
      <Text>Mes préférences</Text>
      <View style = {styles.pref}>
        <View style = {styles.prefLine}>
          <Text>Durée d'une visite</Text>
          <Text>30mn</Text>
        </View>
        <Text>Restreindre les visites aux utilisateurs avec dossier complet</Text>
        <Text>Validation automatique des demandes de visite</Text>
        <Text>Notification pour chaque demande de visite</Text>
      </View>
      
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
    width: '90%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: 'red',
    borderWidth: 4,
  },
  accreditImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 4,
  },
  accreditTexts: {
    marginBottom: 30,
  },
  pref: {
    alignItems: "left",
    width: "90%",
    borderColor: 'green',
    borderWidth: 4,
  },
  prefLine: {
   flexDirection: "row",
   justifyContent: "space-between",
  },
})