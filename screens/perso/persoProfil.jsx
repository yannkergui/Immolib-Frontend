import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

export default function PersoProfil({ navigation }) {
  //Il faudra rajouter les components ={nomducomposant} dans les Tab.Screen pour rendre la navigation fonctionnelle.

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
});
