import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";

export default function PersoVisites() {

  // constante relative au switch de changement de page 
  const page = [
    { label: "en attente de validation", value: "en attente" },
    { label: "confirmées", value: "confirmées" },
    { label: "passées", value: "passées" },
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
      statut: "confirmées",
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
      statut: "passées",
    },
  ];

  // 1er map relatif aux visites en attente 

  const visiteEnAttente = visitesPerso.map((data) => {
    if (data.statut === "en attente") {
      return (
        <View style={styles.visiteCard}>
          <View style={styles.lineCard}>
            <Text> Le {data.date} </Text>
            <TouchableOpacity>
              <FontAwesome name="edit" size={30} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineCard}>
            <Text> {data.adresse}</Text>
            <TouchableOpacity>
              <FontAwesome name="remove" size={30} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  });

  // 2iem map relatif aux visites passées

  const visitePassees = visitesPerso.map((data) => {
    if (data.statut === "passées") {
      return (
        <View style={styles.visiteCard}>
          <View style={styles.lineCard}>
            <Text> Le {data.date} </Text>
            <TouchableOpacity>
              <FontAwesome name="edit" size={30} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineCard}>
            <Text> {data.adresse}</Text>
            <TouchableOpacity>
              <FontAwesome name="remove" size={30} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  });

  // 3iem map relatif aux visites confirmées

  const visiteConfirmees = visitesPerso.map((data) => {
    if (data.statut === "confirmées") {
      return (
        <View style={styles.visiteCard}>
          <View style={styles.lineCard}>
            <Text> Le {data.date} </Text>
            <TouchableOpacity>
              <FontAwesome name="edit" size={30} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineCard}>
            <Text> {data.adresse}</Text>
            <TouchableOpacity>
              <FontAwesome name="remove" size={30} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  });

  return (
    <View style={styles.container}>
      {/* Use LinearGradient as the container's background */}
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <Text style={styles.title}>Mes visites</Text>
        <View style={styles.pageContainer}>
          <SwitchSelector
            options={page}
            initial={0}
            onPress={(value) => setActivePage(value)}
            valuePadding={2.5}
            hasPadding
            style={styles.SwitchSelector3choix}
            buttonColor="#47AFA5"
            buttonMargin={1.5}
            animationDuration={250}
            height={45}
          />
        </View>
        <View style={styles.cardContainer}>
          {activPage === "en attente" && visiteEnAttente}
          {activPage === "passées" && visitePassees}
          {activPage === "confirmées" && visiteConfirmees}
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
    justifyContent: "flex-start",
  },

  pageContainer: {
    flexDirection: "row",
    borderColor: "#47AFA5",
    width: "90%",
    height: "10%",
    marginTop: 20,
  },

  pageActive: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "80%",
    backgroundColor: "#47AFA5",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: 3,
  },
  page: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "80%",
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
  },
  title: {
    fontFamily: "Nunito",
    color: "white",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "600",
    marginTop: "10%",
  },

  cardContainer: {
    width: "100%",
    alignItems: "center",
  },

  visiteCard: {
    justifyContent: "space-between",
    // alignItems: "center",
    height: 150,
    width: "90%",
    borderRadius: 25,
    backgroundColor: "#BCCDB6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    margin: 10,
  },
  lineCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  SwitchSelector3choix: {
    width: "100%",
  },
});
