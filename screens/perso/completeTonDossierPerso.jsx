import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import { useState, useEffect } from "react";
import { maVisiteData } from '../../reducers/maVisite';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment"; 


export default function CompleteTonDossier ({navigation}) {


  const maVisite = useSelector((state) => state.maVisite.value);

  let selectedDate = `aujourd'hui`
  // formattage de la date afin d'avoir un affichage plus fluide
  if(maVisite.newVisit.dateOfVisit){
  selectedDate = maVisite.newVisit.dateOfVisit}
  let frenchDate = moment(selectedDate).format("DD/MM/YYYY");

  return (
    <View style={styles.container}>
    <LinearGradient
      colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
      start={{ x: 0, y: 0 }} // Start point of the gradient
      end={{ x: 1, y: 1 }} // End point of the gradient
      style={styles.background}
    >
      <View style={styles.headerTitle}>
      <Image style={styles.image} source={require('../../assets/IMMOLIB.png')} /> 
      </View>
      <View style={styles.composant}>
      <View style={styles.lineCard}>
        <Text style={styles.Title}>Visite Enregistrée le :</Text>
        <Text style={styles.Title}> {frenchDate} à {maVisite.newVisit.startTimeVisit}</Text>
      </View>
      <View>
        <Text style={styles.Title}>tu recevras un mail de ton agence pour savoir si ta visite est validée</Text>
      </View>
      </View>
      <View style={styles.composant}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('PersoMonDossier1')}>
        <Text style={styles.titleButton}>click et complètes ton dossier pour faciliter tes visites 😉</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.titleButton}>Tu ne monteras ton dossier qu'une seule fois. Il sera transmit aux agences.
         Plus il sera complet moins tu rateras d'opportunités !!</Text>
        <Text style={styles.titleButton}>Le petit plus : tu peux également envoyer ton dossier à des agences en dehors de la plateforme. 😊</Text> 
      </View>
      </View>
    </LinearGradient>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
},
background: {
  flex: 1,
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
},
lineCard: {
    alignItems:'center',
    justifyContent:'center',
    width: 370,
    height:70,
    borderRadius: 20,
    backgroundColor: "#BCCDB6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    marginBottom: 25,
    marginTop: 30,
  },
  Title: {
    color: 'white',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '600', 
    letterSpacing: -1.5, 
    textAlign:'center',
  },
  button : {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "20%",
    backgroundColor: "#47AFA5",
    borderRadius: 15,
    marginBottom: "10%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  titleButton:{
    color: 'white',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '600', 
    letterSpacing: -1.5, 
    textAlign:'center',
    margin:5,
  },
  composant:{
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 40,
  },
  image:{
    marginTop: 40,
    height:100
  }
});