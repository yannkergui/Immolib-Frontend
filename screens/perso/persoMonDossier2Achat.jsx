import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  SafeAreaView,
  CheckBox,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { useState } from "react";

export default function PersoMonDossier2Achat({navigation}) {
  // 3 Etats relatif au bien recherché choisie (utile au changement de couleur du choix et au push en BDD)

  const [maisonChoice, setChoice] = useState(false);
  const [appartementChoice, setAppartementChoice] = useState(false);
  const [autreChoice, setAutreChoice] = useState(false);

  //  Etat relatif à la surface minimum (util au push en BDD)

  const [nbPiece, setNbPiece] = useState(0);

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

  //Gestion des inputs qui ne doivent recevoir que des nombres (alors que c'est un TextInput, donc il faut appliquer une Regex) :
  const [inputBudget, setInputBudget] = useState("");
  const [inputSurface, setInputSurface] = useState("");
  const [inputNbPiece, setInputNbPiece] = useState("");

  const handleBudgetChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, ""); // élimine tous les caractères non numériques
    setInputBudget(formattedText);
  };

  const handleSurfaceChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, ""); // élimine tous les caractères non numériques
    setInputSurface(formattedText);
  };

  const handleNbPieceChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, ""); // élimine tous les caractères non numériques
    setInputNbPiece(formattedText);
  };

  //préparation des fonctions pour envoyer en base de données les inputs de budget, surface, nbPiece retravaillés:

  const saveBudgetToDatabase = () => {
    // Enregistrez 'budget' dans la base de données ici.
  };

  const saveSurfaceToDatabase = () => {
    // Enregistrez 'budget' dans la base de données ici.
  };

  const saveNbPieceToDatabase = () => {
    // Enregistrez 'budget' dans la base de données ici.
  };


//navigation en cliquant sur "Etape suivante":
const handleEtapeSuivante =()=>{
  navigation.navigate('persoMonDossier3Achat');
}


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.smallTextContainer}>
            <Text>Je cherche à acheter</Text>
          </View>

          {/* {Il faudra ajouter ici le composant des visites} */}
          <View style={styles.textContainer}>
            <Text>15/03/2023 à 17h</Text>
            <Text>66 rue Victor Hugo, 75001 Paris</Text>
          </View>

          <Text style={styles.title}> Mon Dossier</Text>

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
              <Text>Budget Maximum</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={inputBudget}
                onChangeText={handleBudgetChange}
              >
                <Text>/€</Text>
              </TextInput>
            </View>
            <View style={styles.lineContainer}>
              <Text>Bien recherché</Text>
              <View style={styles.choixBien}>
                <TouchableOpacity
                  style={maisonChoice ? styles.buttonSelected : styles.button}
                  onPress={() => handleMaison()}
                >
                  <Text>Maison</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    appartementChoice ? styles.buttonSelected : styles.button
                  }
                  onPress={() => handleAppartement()}
                >
                  <Text>Appartement</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={autreChoice ? styles.buttonSelected : styles.button}
                  onPress={() => handleAutre()}
                >
                  <Text>Autre</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.lineContainer}>
              <Text>Surface minimum</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="9m²"
                onChangeText={handleSurfaceChange}
                value={inputSurface}
              ></TextInput>
            </View>
            <View style={styles.lineContainer}>
              <Text>Nombre de pièces minimum</Text>
              <TextInput
                style={styles.input}
                keyboardType={"numeric"}
                placeholder="0"
                onChangeText={handleNbPieceChange}
                value={inputNbPiece}
              ></TextInput>
            </View>
          </View>
          <View style={styles.nextBtnContainer}>
            <TouchableOpacity style={styles.skip}>
              <Text>Passer cette étape</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.next} onPress={()=> handleEtapeSuivante()}>
              <Text>Etape suivante</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#e8be4b",
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
    marginTop: 50,
    marginBottom: 50,
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
    alignItems: "center",
    marginTop: 20,
  },

  input: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 120,
    height: 40,
    textAlign: "center",
  },

  button: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 120,
    height: 40,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  choixBien: {
    display: "flex",
    flexDirection: "column",
    marginVertical: 15,
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
