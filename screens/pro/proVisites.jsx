import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";

export default function ProVisites() {

  // constante relative au switch de changement de page 

  const page = [
    { label: "en attente de validation", value: "en attente" },
    { label: "à venir", value: "aVenir" },
  ];

  // Etat relatif au changement de page via le switch

  const [activPage, setActivePage] = useState("en attente");

  // visiteData (en dur pour le moment, sera par la suite un fetch de la BDD)

  const visitesPerso = [
    {
      nom: "Appartement 3 pièces",
      adresse: "77 rue victor hugo, 75000 Paris",
      date: "21/09/2023",
      statut: "en attente",
    },
    {
      nom: "Maison 160m²",
      adresse: "77 rue victor hugo, 75000 Paris",
      date: "24/12/2023",
      statut: "en attente",
    },
    {
      nom: "studio 20 m²",
      adresse: "77 rue victor hugo, 75000 Paris",
      date: "11/01/2024",
      statut: "aVenir",
    },
    {
      nom: "Villa 220 m²",
      adresse: "77 rue victor hugo, 75000 Paris",
      date: "21/09/2023",
      statut: "en attente",
    },
    {
      nom: "Chateau ",
      adresse: "77 rue victor hugo, 75000 Paris",
      date: "21/05/2023",
      statut: "aVenir",
    },
  ];
  
  return (
    <View style={styles.container}>
    <LinearGradient
      colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
      start={{ x: 0, y: 0 }} // Start point of the gradient
      end={{ x: 1, y: 1 }} // End point of the gradient
      style={styles.background}
    >
      <View style={styles.container}>
        <Text>PRO Visit</Text>
        <StatusBar style="auto" />
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
},
});
