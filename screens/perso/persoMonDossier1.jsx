import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch, useSelector } from "react-redux";
import { userDatas } from "../../reducers/user";

export default function PersoMonDossier1({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
 

  // les 2 etats mis à jour au clique sur le switch

  const [situationActuelle, setSituationActuelle] = useState("locataire");
  const [recherche, setRecherche] = useState("achat");

  // 2 constantes composants des switchs

  const SwitchSituation = [
    { label: "Locataire", value: "locataire" },
    { label: "Propriétaire", value: "proprietaire" },
    { label: "Hébergé", value: "heberge" },
  ];

  const SwitchRecherche = [
    { label: "Achat", value: "achat" },
    { label: "Location", value: "location" },
  ];

  const handleEtapeSuivante = () => {
    if (recherche === "achat") {
      navigation.navigate("PersoMonDossier2Achat");
    } else {
      navigation.navigate("PersoMonDossier2Loc");
    }
    dispatch(userDatas({recherche : recherche, situation : situationActuelle}));
  };

  // Boutton passer cette étape pour le moment, pour des sujet de mis à jour sur les creens suivants (a discuter)

  // const handlePasserCetteEtape = () => {
  //   navigation.navigate("PersoHome")
  // };

  return (
    <View style={styles.container}>
      {/* Use LinearGradient as the container's background */}
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <View style={styles.pageContainer}>
          <View style={styles.pageNumberActive}>
            <Text>1/3</Text>
          </View>
          <View style={styles.pageNumber}>
            <Text>2/3</Text>
          </View>
          <View style={styles.pageNumber}>
            <Text>3/3</Text>
          </View>
        </View>
        <Text style={styles.title}>Mon Dossier</Text>
        <View style={styles.textContainer}>
          <Text>15/03/2023 à 17h</Text>
          <Text>66 rue Victor Hugo, 75001 Paris</Text>
        </View>
        <Text style={styles.title}>Situation Actuelle</Text>
        <View style={styles.situationContainer}>
          <SwitchSelector
            options={SwitchSituation}
            initial={0}
            onPress={(value) => setSituationActuelle(value)}
            valuePadding={2.5}
            hasPadding
            style={styles.SwitchSelector}
            buttonColor="#47AFA5"
            buttonMargin={1.5}
            animationDuration={250}
            height={45}
          />
        </View>
        <Text style={styles.title}>Je recherche</Text>
        <View style={styles.searchContainer}>
          <SwitchSelector
            options={SwitchRecherche}
            initial={0}
            onPress={(value) => setRecherche(value)}
            valuePadding={2.5}
            hasPadding
            style={styles.SwitchSelector}
            buttonColor="#47AFA5"
            buttonMargin={1.5}
            animationDuration={250}
            height={45}
          />
        </View>
        <View style={styles.nextBtnContainer}>
          {/* Boutton passer cette étape pour le moment, pour des sujet de mis à jour sur les creens suivants (a discuter) */}

          {/* <TouchableOpacity style={styles.skip}
          onPress={() => handlePasserCetteEtape()}>
            <Text>Passer cette étape</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.next}
            onPress={(value) => handleEtapeSuivante(value)}
          >
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

  pageContainer: {
    flexDirection: "row",
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    height: "4%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },

  //page sur laquelle se trouve l'utilisateur (background visible)

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
  title: {
    fontFamily: "Nunito",
    color: "white",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "600",
    marginTop: "10%",
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

  situationContainer: {
    width: "80%",
    marginTop: 40,
  },

  // selector = les boutons cliquables dans le champs situation et recherche. selectorActiv = le choix de l'utilisateur (en surbrillance + push en BDD )

  selector: {
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
  selectorActiv: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "80%",
    backgroundColor: "#47AFA5",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
  },

  searchContainer: {
    flexDirection: "row",
    borderRadius: 10,
    width: "70%",
    height: "7%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 40,
  },

  nextBtnContainer: {
    flexDirection: "row",
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 60,
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

  SwitchSelector: {
    width: "100%",
  },
});
