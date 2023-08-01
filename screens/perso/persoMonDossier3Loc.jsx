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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import SwitchSelector from "react-native-switch-selector";

export default function PersoMonDossier3Loc() {
  //Etat relatif au revenu renseigné (util au push en BDD)

  const [monRevenu, setMonRevenu] = useState(0);

  //3 Etats relatifs à la situation pro renseignée (util au push en BDD)

  const [situationAutre, setSituationAutre] = useState("");
  const [contrat, setContrat] = useState("cdi");
  
  const SwitchContrat = [
    { label: "CDI", value: "cdi" },
    { label: "CDD", value: "cdd" },
  ];

 


  // fonction relative à l'upload des fichiers au clique sur l'icone 

  const handleUploadPhoto = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
      });

      if (result.type === 'success') {
        // Le fichier a été sélectionné avec succès
        console.log('Chemin du fichier sélectionné : ', result.uri);
      } else {
        // L'utilisateur a annulé la sélection du fichier
        console.log('Sélection annulée');
      }
    } catch (err) {
      // Une erreur s'est produite lors de la sélection du fichier
      console.log('Erreur lors de la sélection du fichier : ', err);
    }
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
          <View style={styles.pageNumber}>
            <Text>2/3</Text>
          </View>
          <View style={styles.pageNumberActive}>
            <Text>3/3</Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.lineContainer}>
            <Text>Revenus mensuels</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="/€"
              onChangeText={(value) => setMonRevenu(value)}
              value={monRevenu}
            ></TextInput>
          </View>
          <View style={styles.lineContainer}>
            <Text>Situation Pro</Text>
            <SwitchSelector
                options={SwitchContrat}
                initial={0}
                onPress={(value) => setContrat(value)}
                valuePadding={2.5}
                hasPadding
                style={styles.SwitchSelector}
                buttonColor="#47AFA5"
                buttonMargin={1.5}
                animationDuration={250}
                height={45}
              />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Autre"
              onChangeText={(value) => setMonRevenu(value)}
              value={monRevenu}
            ></TextInput>
          </View>
          <View style={styles.lineContainer}>
            <Text>Je charge mes documents</Text>
            <TouchableOpacity onPress={handleUploadPhoto}>
              <FontAwesome name="cloud-upload" size={50} color="#ffffff" />
            </TouchableOpacity>
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
  SwitchSelector: {
    width: "50%",
  },
});
