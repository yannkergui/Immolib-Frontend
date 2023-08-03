import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch, useSelector } from 'react-redux';
import {userDatas} from '../../reducers/user'


export default function PersoMonDossier2Loc({ navigation }) {
  //Etat relatif au budget renseigné (util au push en BDD)

  const [monBudget, setMonBudget] = useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);


  // les 2 etats mis à jour au clique sur le switch

  const [bienRecherche, setBienRecherche] = useState("maison");
  const [bienMeuble, setBienMeuble] = useState("oui");

  //  Etat relatif à la surface minimum (util au push en BDD)

  const [surface, setSurface] = useState(0);

  //  Etat relatif à la surface minimum (util au push en BDD)

  const [nbPiece, setNbPiece] = useState(0);

  //  Etat relatif au nombre de locataire (util au push en BDD)

  const [nbLocataire, setNbLocataire] = useState(0);

  // 2 constantes composants les switchs

  const SwitchBienRecherche = [
    { label: "Maison", value: "maison" },
    { label: "Appartement", value: "appartement" },
    { label: "autre", value: "autre" },
  ];

  const SwitchBienMeuble = [
    { label: "Oui", value: "oui" },
    { label: "Non", value: "non" },
    { label: "Indifférent", value: "indifferent" },
  ];

  //fonction changement de page

  const handleEtapeSuivante = () => {
    navigation.navigate("PersoMonDossier3Loc")
    dispatch(userDatas({budgetMois : monBudget, typeBienLoc : bienRecherche, minSurfaceLoc: surface, minPieceLoc: nbPiece, nbLoc: nbLocataire, meuble:bienMeuble }))
  };

  const handlePasserCetteEtape = () => {
    navigation.navigate("PersoHome")
    
  };
  

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
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="/€"
                onChangeText={(value) => setMonBudget(value)}
                value={monBudget}
              ></TextInput>
            </View>
            <View style={styles.lineContainer}>
              <Text>Bien recherché</Text>
              <SwitchSelector
                options={SwitchBienRecherche}
                initial={0}
                onPress={(value) => setBienRecherche(value)}
                valuePadding={2.5}
                hasPadding
                style={styles.SwitchSelector}
                buttonColor="#47AFA5"
                buttonMargin={1.5}
                animationDuration={250}
                height={45}
              />
            </View>
            <View style={styles.lineContainer}>
              <Text>Surface minimum</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="m²"
                onChangeText={(value) => setSurface(value)}
                value={surface}
              ></TextInput>
            </View>
            <View style={styles.lineContainer}>
              <Text>Nombre de pièces minimum</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0"
                onChangeText={(value) => setNbPiece(value)}
                value={nbPiece}
              ></TextInput>
            </View>
            <View style={styles.lineContainer}>
              <Text>Nombre de locataire</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0"
                onChangeText={(value) => setNbLocataire(value)}
                value={nbLocataire}
              ></TextInput>
            </View>
            <View style={styles.lineContainer}>
              <Text>Bien meublé</Text>
              <SwitchSelector
                options={SwitchBienMeuble}
                initial={0}
                onPress={(value) => setBienMeuble(value)}
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
            <TouchableOpacity style={styles.skip}
            onPress={() => handlePasserCetteEtape()}>
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
    borderRadius: 10,
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
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
    width: "100%",
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
  SwitchSelector: {
    width: "72%",
  },
});
