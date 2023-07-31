import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { useState } from "react";

export default function persoMonDossierLoc2() {

  
  // 3 Etats relatif au bien recherché choisie (util au changement de couleur du choix et au push en BDD)

  const [maisonChoice, setChoice] = useState(false);
  const [appartementChoice, setAppartementChoice] = useState(false);
  const [autreChoice, setAutreChoice] = useState(false);


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <View style={styles.smallTextContainer}>
          <Text>Je cherche une location</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>15/03/2023 à 17h</Text>
          <Text>66 rue Victor Hugo, 75001 Paris</Text>
        </View>
        <Text style={styles.title}>Mon Dossier</Text>
        <View style={styles.pageContainer}>
          <View style={styles.pageNumber}>
            <Text>1/3</Text>
          </View>
          <View style={styles.pageNumberActive}>
            <Text>2/3</Text>
          </View>
          <View style={styles.pageNumber}>
            <Text>3/3</Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style= {styles.lineContainer}>
            <Text>Budget Mensuel Maximum</Text>
            <TextInput style= {styles.input}>/€</TextInput>
          </View>
          <View style= {styles.lineContainer}>
            <Text>Bien recherché</Text>
            <TouchableOpacity style= {styles.button}>
              <Text>Maison</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button}>
              <Text>Appartement</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button}>
              <Text>Autre</Text>
            </TouchableOpacity>
          </View>
          <View style= {styles.lineContainer}>
            <Text>Surface minimum</Text>
            <TextInput style= {styles.input}>m²</TextInput>
          </View>
          <View style= {styles.lineContainer}>
            <Text>Nombre de pièces minimum</Text>
            <TextInput style= {styles.input}>0</TextInput>
          </View>
          <View style= {styles.lineContainer}>
            <Text>Nombre de locataire</Text>
            <TouchableOpacity style= {styles.button}>
              <Text>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button}>
              <Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button}>
              <Text>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button}>
              <Text>+ de 3</Text>
            </TouchableOpacity>
          </View>
          <View style= {styles.lineContainer}>
            <Text>Bien meublé</Text>
            <TouchableOpacity style= {styles.button}>
              <Text>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button}>
              <Text>Non</Text>
            </TouchableOpacity>
            <TouchableOpacity style= {styles.button}>
              <Text>Indifférent</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nextBtnContainer}>
          <TouchableOpacity style={styles.skip}>
            <Text>Passer cette étape</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.next}>
            <Text>Etape suivante</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#e8be4b",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  textContainer: {
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  smallTextContainer: {
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 15,
    width: "60%",
    height: "4%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  title: {
    fontFamily: "Nunito",
    color: "white",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "600",
    marginTop: "7%",
  },

  pageNumberActive: {
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
  pageNumber: {
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

  pageContainer: {
    flexDirection: "row",
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    height: "4%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "5%",
  },

  nextBtnContainer: {
    flexDirection: "row",
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 10,
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 70,
  }, 

  skip: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "80%",
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
  },

  next: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "80%",
    backgroundColor: "#47AFA5",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
  },

  formContainer: {
    width: '90%'
  },

  lineContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 20
  },

  input: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius:10,
    width: 100,
    height: 40,
    textAlign: "center"
  },

  button: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius:10,
    width: 60,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }, 



  
});
