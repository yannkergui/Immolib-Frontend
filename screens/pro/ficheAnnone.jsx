import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";

export default function FicheAnnonce() {
  const [selectedBien, setSelectedBien] = useState(""); // État pour stocker l'option sélectionnée

  const handleOptionChange = (itemValue) => {
    setSelectedBien(itemValue);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.Title}>Mon annonce</Text>
          <TouchableOpacity style={styles.iconcontainer}>
            <FontAwesome
              style={styles.icon}
              name="user"
              size={30}
              color="#1F2937"
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.formContainer}>
          <View style={styles.lineCard}>
            <Text> Titre de l'annonce : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Type de bien : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Type de transaction : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Nombre de pièces : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Nombre de chambres : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Nombre de sdb : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Description du bien : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Adresse du bien : : </Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Je charge mes photos : : </Text>
            <TouchableOpacity >
              <FontAwesome name="cloud-upload" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.lastLineCard}>
            <TouchableOpacity style={styles.next} >
              <Text> Je publie mon annonce </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  header: {
    flexDirection: "row",
    width: "100%",
    top: 40,
    alignItems: "center", // Center the content horizontally
    justifyContent: "center",
  },
  iconcontainer: {
    position: "absolute",
    left: 330,
    top: 0,
    backgroundColor: "white",
    width: 50,
    height: 50,
    paddingLeft: 15,
    paddingTop: 8.5,
    borderRadius: 100,
  },

  Title: {
    fontFamily: "Nunitobold",
    color: "white",
    fontSize: 35,
    fontStyle: "normal",
    fontWeight: "600",
    letterSpacing: -1.5,
    textAlign: "center",
  },
  lineCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  lastLineCard: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 15,
  },

  formContainer: {
    width: "100%",
    height: "100%",
    top: 50,
  }, 
  input: {
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.2)",
    backgroundColor : "rgba(128, 128, 128, 0.2)",
    width:"50%",

  },

  next: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 50,
    backgroundColor: "#47AFA5",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
});
