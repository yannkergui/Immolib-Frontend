import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

export default function FirstScreen({navigation}) {
  const handleToParticulier = () => {
    navigation.navigate("WelcomeScreenPerso");
  };
  const handleToPro = () => {
    navigation.navigate("WelcomeScreenPro");
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
        <Image
          style={styles.logo}
          source={require("../assets/IMMOLIB.png")}
        ></Image>
        {/* <Text style={styles.title}>IMMOLIB</Text> */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleToParticulier()}
        >
          <Text style={styles.textButton}>Espace Particulier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
        onPress={() => handleToPro()}>
          <Text style={styles.textButton}>Espace Professionnel</Text>
        </TouchableOpacity>
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
  logo: {
    width: "100%",
    height: "50%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "7%",
    backgroundColor: "#47AFA5",
    borderRadius: 10,
    marginBottom: "25%",

    // paramètrage de l'ombre des boutons. utiliser : (https://ethercreative.github.io/react-native-shadow-generator/) si besoin

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  textButton: {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },

  title: {
    fontFamily: "Nunito",
    color: "white",
    fontSize: 80,
    fontStyle: "normal",
    fontWeight: "600",
    marginBottom: "40%",
    marginTop: "10%",
  },
});
