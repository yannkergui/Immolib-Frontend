import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import SwitchSelector from "react-native-switch-selector";

import { useState } from "react";

export default function ProPreferences() {


  //switch selector restriction visite aux dossiers complets :
  const [restrict, setRestrict] = useState(false);
  const [color, setColor] = useState("blue");
  const restrictOptions = [
    { label: "N", restrict: false },
    { label: "O", restrict: true },
  ];

  function colorButton () {
    if (restrict) {
      setColor("white")
      return "white"
    } else {
      setColor("blue")
      return "blue"
    }
  }
  
  return (

  <LinearGradient
          colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
          start={{ x: 0, y: 0 }} // Start point of the gradient
          end={{ x: 1, y: 1 }} // End point of the gradient
          style={styles.background}
  >
    <SafeAreaView style={styles.main}>
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
            <Text style = {styles.prefTexts}>Durée d'une visite</Text>
            <Text>30mn</Text>
          </View>
          <View style = {styles.prefLine}>
            <Text style = {styles.prefTexts}>Restreindre les visites aux utilisateurs avec dossier complet</Text>
            <SwitchSelector
                options={restrictOptions}
                initial={0}
                onPress={()=>setRestrict(!restrict)}
                valuePadding={2.5}
                hasPadding
                style={styles.switchSelector}
                buttonColor="#47AFA5"
                height={30} 
                backgroundColor={()=>colorButton()}
                //"#ff0000" Changer la couleur de fond ici (par exemple, rouge) 
            />
          </View>
          <View style = {styles.prefLine}>
            <Text style = {styles.prefTexts}>Validation automatique des demandes de visite</Text>
            <Text>30mn</Text>
          </View>
          <View style = {styles.prefLine}>
            <Text style = {styles.prefTexts}>Notification pour chaque demande de visite</Text>
            <Text>30mn</Text>
          </View>
        </View>
    </SafeAreaView>
  </LinearGradient>

  );
}


const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prefTexts: {
    width: "70%",
    margin: 8,
  },
  background: {
    flex: 1,
    width: "100%",
  },
  switchSelector: {
    width: 60,
  },
})