import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import SwitchSelector from "react-native-switch-selector";
import { useState } from "react";

export default function GrosTest({ navigation }) {
  const [valuePrimo, setValuePrimo] = useState("");

  const optionsPrimo = [
    { label: "01:00", value: "1" },
    { label: "01:30", value: "1.5" },
    { label: "02:00", value: "2" },
  ];

  const handleclick = (value) => {
    setValuePrimo(value);
  };

  console.log(valuePrimo);
  //Il faudra rajouter les components ={nomducomposant} dans les Tab.Screen pour rendre la navigation fonctionnelle.
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.background}
      >
        <View style={styles.container}>
          <SwitchSelector
            initial={0}
            onPress={(value) => handleclick(value)}
            hasPadding
            options={optionsPrimo}
            testID="gender-switch-selector"
            accessibilityLabel="gender-switch-selector"
          />

          <Text>PRO Home</Text>
          <StatusBar style="auto" />
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
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
  },
});
