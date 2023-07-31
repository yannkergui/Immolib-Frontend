import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { useState } from "react";

export default function firstScreen() {
  // 3 Etats relatif à la situation actuelle  choisie (util au changement de couleur du choix)
  const [locataireChoice, setLocatairechoice] = useState(false);
  const [proprietaireChoice, setProprietaireChoice] = useState(false);
  const [hebergeChoice, setHebergeChoice] = useState(false);

  // 2 Etats relatifs à la recherche de l'utilisateur

  const [locationSearch, setLocationSearch] = useState(false);
  const [achatSearch, setAchatSearch] = useState(false);

  // les trois fonction appelée au clique sur la situation actuelle, utile pour le changement de style du boutton et en push en BDD.

  const handleLocataire = () => {
    setLocatairechoice(!locataireChoice);
    setProprietaireChoice(false);
    setHebergeChoice(false);
  };

  const handleProprietaire = () => {
    setProprietaireChoice(!proprietaireChoice);
    setLocatairechoice(false);
    setHebergeChoice(false);
  };

  const handleHeberge = () => {
    setHebergeChoice(!hebergeChoice);
    setLocatairechoice(false);
    setProprietaireChoice(false);
  };

  // Les 2 fonctions appelées au clique sur je recherche, utiles au changement de style du boutton et au push en BDD.

  const handLocationSearch = () => {
    setLocationSearch(!locationSearch);
    setAchatSearch(false);
  };

  const handAchatSearch = () => {
    setAchatSearch(!achatSearch);
    setLocationSearch(false);
  };

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
          <TouchableOpacity
            onPress={() => handleLocataire()}
            style={locataireChoice ? styles.selectorActiv : styles.selector}
          >
            <Text>Locataire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleProprietaire()}
            style={proprietaireChoice ? styles.selectorActiv : styles.selector}
          >
            <Text>Propriétaire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleHeberge()}
            style={hebergeChoice ? styles.selectorActiv : styles.selector}
          >
            <Text>Hébergé</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Je recherche</Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => handLocationSearch()}
            style={locationSearch ? styles.selectorActiv : styles.selector}
          >
            <Text>Locatation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handAchatSearch()}
            style={achatSearch ? styles.selectorActiv : styles.selector}
          >
            <Text>Achat</Text>
          </TouchableOpacity>
        </View>
        <View style = {styles.nextBtnContainer}>
            <TouchableOpacity style = {styles.skip}>
                <Text>
                    Passer cette étape
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.next}>
                <Text>
                    Etape suivante
                </Text>
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
    flexDirection: "row",
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 10,
    width: "80%",
    height: "7%",
    alignItems: "center",
    justifyContent: "space-around",
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
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 10,
    width: "70%",
    height: "7%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 40,
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
  }
});
