import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function ProClients() {
  return (
    <View style={styles.container}>
    <LinearGradient
      colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
      start={{ x: 0, y: 0 }} // Start point of the gradient
      end={{ x: 1, y: 1 }} // End point of the gradient
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
        <Text>Mes Clients</Text>
        <TouchableOpacity>
          <FontAwesome style={styles.icon} name='user' size={25} color='#1F2937' />
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
  justifyContent: "center",
},
background: {
  flex: 1,
  width: "100%",
},
header: {
  flexDirection: 'row',
  position: 'absolute',
  top: 80, 
  alignItems: 'center', // Center the content horizontally
  justifyContent: 'center'
},
icon: {
 position :'absolute',
//  right : 20,
left : 100,
 top: -15
}
});
