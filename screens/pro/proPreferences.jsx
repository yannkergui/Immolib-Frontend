import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import SwitchSelector from "react-native-switch-selector";

import { useState } from "react";

export default function ProPreferences() {

  const [dureeVisite, setDureeVisite] = useState(30);

function changePhoto (){}

  //switch selector restriction visite aux dossiers complets :
  const [restrict, setRestrict] = useState(false);
  const [restrictColor, setRestrictColor] = useState("grey");
  const restrictOptions = [
    { label: "N", value: false },
    { label: "O", value: true },
  ];
  function restrictBackground (value) {
    if (value) {
      setRestrictColor("green")
    } else {
      setRestrictColor("grey")
    }
  }

  //switch selector validation auto des demandes de visites :
  const [valid, setValid] = useState(false);
  const [validColor, setValidColor] = useState("grey");
  const validOptions = [
    { label: "N", value: false },
    { label: "O", value: true },
  ];
  function validBackground (value) {
    if (value) {
      setValidColor("green")
    } else {
      setValidColor("grey")
    }
  }

  //switch selector notification pour chaque demande :
  const [notif, setNotif] = useState(false);
  const [notifColor, setNotifColor] = useState("grey");
  const notifOptions = [
    { label: "N", value: false },
    { label: "O", value: true },
  ];
  function notifBackground (value) {
    if (value) {
      setNotifColor("green")
    } else {
      setNotifColor("grey")
    }
  }
  
  return (

  <LinearGradient
          colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
          start={{ x: 0, y: 0 }} // Start point of the gradient
          end={{ x: 1, y: 1 }} // End point of the gradient
          style={styles.background}
  >
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyBoardContainer}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.main}>
          <Text style={styles.title}>Mon profil</Text>
          <View style = {styles.accredit}>
                  <View style = {styles.accreditImage}>
                    <Image source={{ uri : '.../assets/welcomepage.jpg' }} style={styles.photo}/>
                    <TouchableOpacity
                      style={styles.buttonSelected}
                      onPress={() => changePhoto()}
                    >
                      <Text>Modifiez votre photo</Text>
                    </TouchableOpacity> 
                  </View>
                  <View style = {styles.accreditTexts}>
                    <Text>Alice du Pays</Text>
                    <Text>alice.dupays@merveilles.fr</Text>
                    <Text>Agence des Merveilles</Text>
                  </View>
          </View>
          <Text style={styles.subTitle}>Mes préférences</Text>
          <View style = {styles.pref}>
                <View style = {styles.prefLine}>
                  <Text style = {styles.prefTexts}>Durée d'une visite</Text>
                  <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      placeholder="mn"
                      onChangeText={(value) => setDureeVisite(value)}
                      value={dureeVisite}>
                  </TextInput>
                </View>
                <View style = {styles.prefLine}>
                  <Text style = {styles.prefTexts}>Restreindre les visites aux utilisateurs avec dossier complet</Text>
                  <SwitchSelector
                      options={restrictOptions}
                      initial={0}
                      onPress={(value)=>
                        {
                        setRestrict(value)
                        restrictBackground(value)
                        }
                      }
                      valuePadding={2.5}
                      hasPadding
                      style={styles.switchSelector}
                      buttonColor="white"
                      height={30} 
                      backgroundColor={restrictColor}
                      borderWidth={0}
                      textColor= 'rgba(245, 40, 145, 0)'
                  />
                </View>
                <View style = {styles.prefLine}>
                  <Text style = {styles.prefTexts}>Validation automatique des demandes de visite</Text>
                  <SwitchSelector
                      options={validOptions}
                      initial={0}
                      onPress={(value)=>
                        {
                        setValid(value)
                        validBackground(value)
                        }
                      }
                      valuePadding={2.5}
                      hasPadding
                      style={styles.switchSelector}
                      buttonColor="white"
                      height={30} 
                      backgroundColor={validColor}
                      borderWidth={0}
                      textColor= 'rgba(245, 40, 145, 0)'
                      //"#ff0000" Changer la couleur de fond ici (par exemple, rouge) 
                  />
                </View>
                <View style = {styles.prefLine}>
                  <Text style = {styles.prefTexts}>Notification pour chaque demande de visite</Text>
                  <SwitchSelector
                      options={notifOptions}
                      initial={0}
                      onPress={(value)=>
                        {
                        setNotif(value)
                        notifBackground(value)
                        }
                      }
                      valuePadding={2.5}
                      hasPadding
                      style={styles.switchSelector}
                      buttonColor="white"
                      height={30} 
                      backgroundColor={notifColor}
                      borderWidth={0}
                      textColor= 'rgba(245, 40, 145, 0)'
                      //"#ff0000" Changer la couleur de fond ici (par exemple, rouge) 
                  />
                </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  </LinearGradient>

  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  main: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    marginTop: 60,
  },
  subTitle: {
    marginBottom: 30,
  },
  accredit: {
    width: 350,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 100,
    marginTop: 20,
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
    borderWidth: 1,
  },
  accreditTexts: {
    marginBottom: 30,
  },
  pref: {
    alignItems: "center",
    justifyContent: "center",
    width: 350,
    borderColor: 'red',
    borderWidth: 1,
  },
  prefLine: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  prefTexts: {
    width: "70%",
    margin: 8,
    borderColor: 'blue',
    borderWidth: 1,
  },
  background: {
    flex: 1,
    width: "100%",
  },
  switchSelector: {
    width: 60,
  },
  keyBoardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    width: 60,
    height: 30,
    textAlign: "center",
  },
})