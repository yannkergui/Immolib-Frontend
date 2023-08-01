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
import SwitchSelector from "react-native-switch-selector";
import { useState } from "react";

export default function PersoMonDossier3Achat({ navigation }) {
  // 3 Etats relatif au bien recherché choisie (utile au changement de couleur du choix et au push en BDD)

  const [maisonChoice, setMaisonChoice] = useState(false);
  const [appartementChoice, setAppartementChoice] = useState(false);
  const [autreChoice, setAutreChoice] = useState(false);

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
  const handleEtapeSuivante = () => {
    navigation.navigate("PersoHome");
  };
  
  //mise en place des options pour les switchs selectors :
  const [valuePrimo, setValuePrimo] = useState(false);
  const [valueTypeInvest, setValueTypeInvest] = useState("principale");
  const [valueTypeFinancement, setValueTypeFinancement] =useState("pretbancaire");
  const [valuePreAccord, setValuePreAccord] = useState(false);

  //mise en place des options pour le switch selector du primo accédant :
  const optionsPrimo = [
    { label: "Non", value: false },
    { label: "Oui", value: true },
  ];

  //mise en place des options pour le switch selector du type d'investissement :
  const optionsTypeInvest = [
    { label: "Résidence principale", value: "principale" },
    { label: "Résidence secondaire", value: "secondaire" },
    { label: "Autre", value: "autre" },
  ];

  //mise en place des options pour le switch selector du type d'investissement :
  const optionsTypeFinancement = [
    { label: "Prêt bancaire", value: "pretbancaire" },
    { label: "Fonds propres", value: "fondspropres" },
    { label: "Prêt relais", value: "pretrelais" },
  ];

  //mise en place des options pour le switch selector du pré-accord bancaire  :
  const optionsPreAccord = [
    { label: "Non", value: false },
    { label: "Oui", value: true },
  ];

  console.log(
    valuePrimo,
    valueTypeInvest,
    valueTypeFinancement,
    valuePreAccord
  );

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
            <View style={styles.pageNumber}>
              <Text>2/3</Text>
            </View>
            <View style={styles.pageNumberActive}>
              <Text>3/3</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.lineContainer2choix}>
              <Text style={styles.sousTitre}>Primo accédant ?</Text>
              <SwitchSelector
                options={optionsPrimo}
                value={false}
                initial={0}
                onPress={(value) => setValuePrimo(value)}
                valuePadding={2.5}
                hasPadding
                buttonMargin={1.5}
                style={styles.SwitchSelector}
                buttonColor="#47AFA5"
                animationDuration={250}
                height={45}
              />
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.sousTitre}>Type d'investissement :</Text>
              <SwitchSelector
                options={optionsTypeInvest}
                initial={0}
                onPress={(value) => setValueTypeInvest(value)}
                valuePadding={2.5}
                hasPadding
                style={styles.SwitchSelector3choix}
                buttonColor="#47AFA5"
                buttonMargin={1.5}
                animationDuration={250}
                height={45}
              />
            </View>

            <View style={styles.lineContainer}>
              <Text style={styles.sousTitre}>Type de financement :</Text>
              <SwitchSelector
                options={optionsTypeFinancement}
                initial={0}
                onPress={(value) => setValueTypeFinancement(value)}
                valuePadding={2.5}
                hasPadding
                style={styles.SwitchSelector3choix}
                buttonColor="#47AFA5"
                buttonMargin={1.5}
                animationDuration={250}
                height={45}
              />
            </View>

            <View style={styles.lineContainer}>
              <Text style={styles.sousTitre}>Pré-accord bancaire :</Text>
              <SwitchSelector
                options={optionsPreAccord}
                initial={0}
                onPress={(value) => setValuePreAccord(value)}
                valuePadding={2.5}
                hasPadding
                style={styles.SwitchSelector}
                buttonColor="#47AFA5"
                buttonMargin={1.5}
                animationDuration={250}
                height={45}
              />
            </View>
          </View>
          <View style={styles.nextBtnContainer}>
            <TouchableOpacity style={styles.skip}>
              <Text>Passer cette étape</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.next}
              onPress={() => handleEtapeSuivante()}
            >
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
    marginVertical: "5%",
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
    marginTop: 15,
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
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 15,
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
    flexDirection: "row",
    marginVertical: 10,
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
  SwitchSelector: {
    width: 120,
  },
  SwitchSelector3choix: {
    width: "100%",
  },
  sousTitre: {
    marginBottom: 10,
  },
});
