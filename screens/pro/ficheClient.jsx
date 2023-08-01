import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';



export default function FicheClient() {

    const [fontsLoaded] = useFonts({
        Nunitobold: require('../../assets/fonts/Nunito/static/Nunito-Bold.ttf'),
        NunitoSans: require('../../assets/fonts/Nunito_Sans/static/NunitoSans_7pt-Medium.ttf')
      });

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
        <Text style={styles.Title}>Mon Client</Text>
        <TouchableOpacity style={styles.iconcontainer}>
          <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
        </TouchableOpacity>
        </View>
        <View style={styles.CardsGroup}>
            <View style={styles.clientsCard}>
                <Text style={styles.cardTitle}>Infos Client :</Text>
                <Text style={styles.Infos}>Nom : Tartenpion</Text>
                <Text style={styles.Infos}>Prénom : Pépette</Text>
                <Text style={styles.Infos}>Téléphone : 0101010101</Text>
                <Text style={styles.Infos}>Email : arobas@arobas.com</Text>
             </View>
            <View style={styles.clientsCard}>
                <Text style={styles.cardTitle}>Sa Recherche :</Text>
                <Text style={styles.Infos}>Recherche : Location</Text>
                <Text style={styles.Infos}>{`\u2022`} Budget Mensuel Max : 1500 euros </Text>
                <Text style={styles.Infos}>{`\u2022`} Type de Bien recherché : Appartement </Text>
                <Text style={styles.Infos}>{`\u2022`} Surface Minimum : 70m²</Text>
                <Text style={styles.Infos}>{`\u2022`} Nbre de pièces Minimum : 3</Text>
                <Text style={styles.Infos}>{`\u2022`} Nbre de locataires : 2</Text>
                <Text style={styles.Infos}>{`\u2022`} Bien Meublé : Indifférent</Text>
            </View>
            <View style={styles.clientsCard}>
            <Text style={styles.cardTitle}>Pièces Justificatives :</Text>
            <Text style={styles.Infos}>{`\u2022`} Fiche de paye 1</Text>
            <Text style={styles.Infos}>{`\u2022`} Fiche de paye 2</Text>
            <Text style={styles.Infos}>{`\u2022`} Fiche de paye 3</Text>
            </View>
            <View>
                <TouchableOpacity>
                    <Text >Télécharger les Documents</Text>
                </TouchableOpacity>
            </View>

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
CardsGroup :{
    justifyContent: 'center',
    alignItems: 'center',
},
clientsCard :{
  justifyContent : 'center',
  alignItems : 'flex-start',
  height: 300,
  width : 350,
  borderRadius: 100,
  backgroundColor:'#BCCDB6',
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    margin: 10,
    overflow : 'scroll',
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
},
subCard:{
  fontFamily: 'NunitoSans',
},
Infos:{
    paddingLeft: 30,
    paddingBottom: 10,
},
cardTitle:{
    marginLeft: '35%',
}
});
