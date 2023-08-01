import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, SafeAreaView, ScrollView, Switch } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';


export default function FicheClient({navigation}) {

  const [switchValue, setSwitchValue] = useState(false);
  const user = useSelector((state) => state.userData.value);

  const handleSubmit = () => {
    navigation.navigate('FirstScreen')
  }

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
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome style={styles.icon} name='chevron-left' size={20} color='#1F2937' />
            </TouchableOpacity> 
            <Text style={styles.Title}>Mon Client</Text>
            <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit()}}>
                <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.CardsGroup}>
                <Text style={styles.cardTitle}>Infos Client :</Text>
                <View style={styles.clientsCard1}>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>Nom :</Text>
                        <Text style={styles.Infos}>{user.nom}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>Prénom : </Text>
                        <Text style={styles.Infos}>{user.prénom}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>Téléphone : </Text>
                        <Text style={styles.Infos}>{user.téléphone}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>Email :</Text>
                        <Text style={styles.Infos}>{user.email}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>salaire Mensuel :</Text>
                        <Text style={styles.Infos}>{user.salaire} €</Text>
                    </View>
                </View>
            
                <Text style={styles.cardTitle}>Sa Recherche :</Text>
                <View style={styles.clientsCard2}>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2}>Recherche :</Text>
                        <Text style={styles.Infos2}>Location</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2}>Zone de Recherche :</Text>
                        <Text style={styles.Infos2}>Paris</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2}>Budget Mensuel Max :</Text>
                        <Text style={styles.Infos2}>1500 euros</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2}>Type de Bien recherché :</Text>
                        <Text style={styles.Infos2}>Maison</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2}>Surface Minimum :</Text>
                        <Text style={styles.Infos2}>70m²</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2}>Nbre de pièces Minimum :</Text>
                        <Text style={styles.Infos2}>3</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2}>Nbre de locataires : 2</Text>
                        <Text style={styles.Infos2}>2</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2}>Bien Meublé :</Text>
                        <Text style={styles.Infos2}>Indifférent</Text>
                    </View>
                </View>
                <Text style={styles.cardTitle}>Pièces Justificatives :</Text>
                <View style={styles.clientsCard3}>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>{`\u2022`} Pièce d'identité</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValue ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValue(newValue)}
                            value={switchValue}
                            />
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>{`\u2022`} Justificatif de Domicile</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValue ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValue(newValue)}
                            value={switchValue}
                            />
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>{`\u2022`} Fiche de paye 1</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValue ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValue(newValue)}
                            value={switchValue}
                            />
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>{`\u2022`} Fiche de paye 2</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValue ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValue(newValue)}
                            value={switchValue}
                            />
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>{`\u2022`} Fiche de paye 3</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValue ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValue(newValue)}
                            value={switchValue}
                            />
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos}>{`\u2022`} avis d'imposition</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValue ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValue(newValue)}
                            value={switchValue}
                            />
                    </View>
            </View>
                    <View>
                        <TouchableOpacity
                        style={styles.button}
                        >
                            < Text style={styles.textButton}>Télécharger les Documents</Text>
                        </TouchableOpacity>
                    </View>

            </View>
        </ScrollView>
      </View>
    </LinearGradient>
  </View>
 
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  width: "100%",
  justifyContent: 'center',
  alignItems:'center'
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
  justifyContent: 'space-between',
  zIndex: 1, 
},
iconcontainer :{
top : 0,
backgroundColor : 'white',
width : 50,
height: 50,
paddingLeft : 15,
paddingTop : 8.5,
borderRadius : 100
},
// iconcontainer1:{
//     backgroundColor : 'white',
//     width : 50,
//     height: 50,
//     paddingLeft : 15,
//     paddingTop : 8.5,
//     borderRadius : 100
// },
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
    top: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    
},

clientsCard1 :{
  justifyContent : 'center',
  alignItems : 'flex-start',
  height: 220,
  width : 400,
  borderRadius: 120,
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
},
clientsCard2 :{
    justifyContent : 'center',
    alignItems : 'flex-start',
    height: 300,
    width : 400,
    borderRadius: 120,
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
  },
  clientsCard3 :{
    justifyContent : 'center',
    alignItems : 'flex-start',
    height:350,
    width : 400,
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
Infos:{
    paddingBottom: 10,
    paddingLeft: 45,
    paddingRight: 45,
    fontFamily: 'NunitoSans',
    fontSize: 16,
},
Infos2:{
    paddingBottom: 10,
    paddingLeft: 45,
    paddingRight: 50,
    fontFamily: 'NunitoSans',
    fontSize: 12,
},
cardTitle:{
    marginTop:5,   
    fontFamily: 'Nunitobold',
    color: 'white',
    fontSize: 20,
},
rowInfos : {
width: '100%',
flexDirection:'row',
justifyContent:'space-between'
},
switch:{
    marginRight: 40,
    marginBottom: 10,
},
button: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 40,
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
    fontFamily: 'Nunitobold',
    height: 30,
    fontWeight: "600",
    fontSize: 12,
    paddingTop: 7,
  },
  
});
