import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

export default function PersoProfil({ navigation }) {

  //Il faudra rajouter les components ={nomducomposant} dans les Tab.Screen pour rendre la navigation fonctionnelle.
  const handleRecherche = () => {
    navigation.navigate("PersoMonDossier1");
  };
  const handleDocuments = () => {
    navigation.navigate("PersoMonDossier3Loc");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.background}
      >
        <SafeAreaView>
          <View style={styles.Titre}>
            <Text style={styles.Titre}>Mon Profil</Text>
          </View>

          <View style={styles.InfosProfil}>
            <View style={styles.photoContainer}>
              <FontAwesome
                name="facebook"
                size={30}
                style={styles.photoProfil}
              />
              {/* <Image alt="photoContainer"></Image> */}
              <Text>Ajoute une photo</Text>
            </View>
            <View style={styles.caractProfil}>
              <Text style={styles.caract}>Nom</Text>

              <Text style={styles.caract}>Prénom</Text>

              <Text style={styles.caractEmail}>Email</Text>
            </View>
          </View>

          <View style={styles.monDossierContainer}>
            <Text style={styles.monDossierTitre}> Mon dossier</Text>
            <View style={styles.dossierCompletion}>
              <Text style={styles.dossierCompletion}>
                Ton profil est complet à ... %
              </Text>
            </View>
            <View style={styles.BtnContainer}>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => handleRecherche()}
              >
                <Text style={styles.texteBtn}>Modifer ma recherche</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => handleDocuments()}
              >
                <Text style={styles.texteBtn}>Compléter mes documents</Text>
              </TouchableOpacity>
            </View>
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
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  Titre: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  InfosProfil: {
    flexDirection: "row",
    alignItems: "center",
  },
  photoContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  photoProfil: {
    borderRadius: "50%",
    // backgroundColor:"red",
    size: 20,
    padding: 20,
  },
  caractProfil: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: 225,
  },
  caract: {
    marginHorizontal: 10,
    marginVertical: 6,
    fontSize: 15,
    width: 80,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    borderColor: "#0E2321",
    justifyContent: "center",
    alignItems: "center",
  },
  caractEmail: {
    marginHorizontal: 10,
    marginVertical: 6,
    fontSize: 15,
    width: 180,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    borderColor: "#0E2321",
    justifyContent: "center",
    alignItems: "center",
  },

  monDossierContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    marginTop: 50,
  },
  monDossierTitre: {
    fontSize: 30,
    marginBottom: 20,
  },
  dossierCompletion: {
    marginBottom: 20,
  },
  BtnContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  Btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 270,
    height: 70,
    backgroundColor: "#0E2321",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 15,
  },
  texteBtn: {
    color: "white",


    letterSpacing: 1,
  },
});
