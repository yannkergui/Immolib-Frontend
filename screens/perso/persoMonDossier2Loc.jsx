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

export default function persoMonDossier2Loc() {

  //Etat relatif au budget renseigné (util au push en BDD)

  const [monBudget, setMonBudget] = useState(0);

  // 3 Etats relatifs au bien recherché choisie (util au changement de couleur du choix et au push en BDD)

  const [maisonChoice, setMaisonChoice] = useState(false);
  const [appartementChoice, setAppartementChoice] = useState(false);
  const [autreChoice, setAutreChoice] = useState(false);

  //  Etat relatif à la surface minimum (util au push en BDD)

  const [surface, setSurface] = useState(0);

   //  Etat relatif à la surface minimum (util au push en BDD)

   const [nbPiece, setNbPiece] = useState(0);

  //  Etat relatif au nombre de locataire (util au push en BDD)

  const [nbLocataire, setNbLocataire] = useState(0);

  // 3 Etats relatifs au bien recherché choisie (util au changement de couleur du choix et au push en BDD)

  const [bienMeuble, setBienMeuble] = useState(false);
  const [bienNonMeuble, setBienNonMeuble] = useState(false);
  const [indifferent, setIndifferent] = useState(false);

  // fonctions relatives au type de bien (changement du booléens et du style)

  const handleMaison = () => {
    setMaisonChoice(!maisonChoice);
    setAppartementChoice(false);
    setAutreChoice(false);
  };

  const handleAppartement = () => {
    setAppartementChoice(!appartementChoice);
    setMaisonChoice(false);
    setAutreChoice(false);
  };

  const handleAutre = () => {
    setAutreChoice(!autreChoice);
    setAppartementChoice(false);
    setMaisonChoice(false);
  };

   // fonctions relatives au bien meublé (changement du booléens et du style)
   const handleMeuble = () => {
    setBienMeuble(!bienMeuble);
    setBienNonMeuble(false);
    setIndifferent(false);
  };

  const handleNonMeuble = () => {
    setBienNonMeuble(!bienNonMeuble);
    setBienMeuble(false);
    setIndifferent(false);
  };

  const handleIndifferent = () => {
    setIndifferent(!indifferent);
    setBienNonMeuble(false);
    setBienMeuble(false);
  };

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
          <View style={styles.lineContainer}>
            <Text>Budget Mensuel Maximum</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="/€" onChangeText={(value) => setMonBudget(value)} value={monBudget}></TextInput>
          </View>
          <View style={styles.lineContainer}>
            <Text>Bien recherché</Text>
            <TouchableOpacity style={maisonChoice ? styles.buttonSelected : styles.button} onPress={() => handleMaison()}>
              <Text>Maison</Text>
            </TouchableOpacity>
            <TouchableOpacity style={appartementChoice ? styles.buttonSelected : styles.button} onPress={() => handleAppartement()}>
              <Text>Appartement</Text>
            </TouchableOpacity>
            <TouchableOpacity style={autreChoice ? styles.buttonSelected : styles.button} onPress={() => handleAutre()}>
              <Text>Autre</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.lineContainer}>
            <Text>Surface minimum</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="m²" onChangeText={(value) => setSurface(value)} value={surface}></TextInput>
          </View>
          <View style={styles.lineContainer}>
            <Text>Nombre de pièces minimum</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="0" onChangeText={(value) => setNbPiece(value)} value={nbPiece}></TextInput>
          </View>
          <View style={styles.lineContainer}>
            <Text>Nombre de locataire</Text>
            <TextInput style={styles.input}keyboardType="numeric" placeholder="0" onChangeText={(value) => setNbLocataire(value)} value={nbLocataire}></TextInput>
          </View>
          <View style={styles.lineContainer}>
            <Text>Bien meublé</Text>
            <TouchableOpacity style={bienMeuble ? styles.buttonSelected : styles.button}  onPress={() => handleMeuble()}>
              <Text>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity style={bienNonMeuble ? styles.buttonSelected : styles.button} onPress={() => handleNonMeuble()}>
              <Text>Non</Text>
            </TouchableOpacity>
            <TouchableOpacity style={indifferent ? styles.buttonSelected : styles.button} onPress={() => handleIndifferent()}>
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
    marginTop: 35,
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
    width: "90%",
  },

  lineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  input: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 40,
    textAlign: "center",
  },

  button: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonSelected: {
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
