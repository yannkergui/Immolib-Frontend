import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function ProClients() {

  const ClientsCard = () => {
    return (
      <View style={styles.clientsCard}>
        <View style={styles.clientsCardOrientation}>
          <View style={styles.leftCardOrientation}>
            <TouchableOpacity style={styles.cardIcon}>
              <FontAwesome style={styles.iconClient} name='user' size={40} color='#1F2937' />
            </TouchableOpacity>
          </View>
          <View style={styles.centerCardOrientation}>
            <Text style={styles.titleCard}>Nom Prénom</Text>
            <Text style={styles.subCard}>prochaine Visite ?</Text>
          </View>
          <View style={styles.rigthCardOrientation}>
            <TouchableOpacity style={styles.cardIcon}>
              <FontAwesome style={styles.iconPhone} name='phone' size={40} color='#1F2937' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };


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
        <Text style={styles.Title}>Mes Clients</Text>
        <TouchableOpacity style={styles.iconcontainer}>
          <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
        </TouchableOpacity>
        </View>
          <ClientsCard/>
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
  width :'90%',
  position: 'absolute',
  top: 80, 
  alignItems: 'center', // Center the content horizontally
  justifyContent: 'center'
},
iconcontainer :{
position :'absolute',
left : 330,
top : 0,
backgroundColor : 'white',
width : 50,
height: 50,
paddingLeft : 15,
paddingTop : 8.5,
borderRadius : 100
},
Title: {
  fontFamily: 'Nunitobold',
  color: 'white',
  fontSize: 35,
  fontStyle: 'normal',
  fontWeight: '600', 
  letterSpacing: -1.5, 
  textAlign:'center',
},
clientsCard :{
  justifyContent : 'center',
  alignItems : 'center',
  height : 100,
  width : '90%',
  borderRadius: 40,
  backgroundColor:'#BCCDB6',
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
},
clientsCardOrientation:{
  width : '100%',
  height : '90%',
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center',
},
cardIcon:{
backgroundColor : 'white',
width : 60,
height: 60,
justifyContent:'center',
alignItems:'center',
borderRadius : 40
},
titleCard: {
  fontFamily: 'Nunitobold',
  color: 'white',
  fontSize: 25,
  fontStyle: 'normal',
  fontWeight: '600', 
  letterSpacing: -1.5, 
  textAlign:'center',
},
centerCardOrientation:{
  height : '80%',
  justifyContent: 'space-around',
  alignItems : 'center',
}
});
