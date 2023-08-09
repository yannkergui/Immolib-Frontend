import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, SafeAreaView, ScrollView, Switch } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import { useSelector } from 'react-redux';

export default function FicheClient({navigation}) {

  //Etats pour les boutons switch
  const [switchValueId, setSwitchValueId] = useState(false);
  const [switchValueDom, setSwitchValueDom] = useState(false);
  const [switchValueFP1, setSwitchValueFP1] = useState(false);
  const [switchValueFP2, setSwitchValueFP2] = useState(false);
  const [switchValueFP3, setSwitchValueFP3] = useState(false);
  const [switchValueImpot, setSwitchValueImpot] = useState(false);
  const [switchValuePret, setSwitchValuePret] = useState(false);

  const client = useSelector((state) => state.monClient.value);

  // Fonction pour calculer la complétude du dossier
  const countNonEmptyFields = () => {
    let count = 0;
    if (client.recherche==='location') {
      for (let key in client.location) {
        count ++;
      }
    } else if (client.recherche === 'achat') {
      for (let key in client.achat) {
        count ++;
      }
    }
    if (client.documents) {
      for (let key in client.documents) {
        count ++;
      }
    }
    for (let key in client) {
      if (client[key] && key!=='location' && key!=='achat' && key!=='documents' && key!=='token') {
        count++;
      }
    }
    return count;
  };

  //Calcul de la complétude du dossier
  let completude = 0;
  if (client.location) {
    // 22 docs à compléter pour le locataire (à vérifier)
    completude = Math.round(countNonEmptyFields()*100/22);
  } else if (client.achat) {
    // 25 docs à compléter pour l'acheteur (à vérifier)
    completude = Math.round(countNonEmptyFields()*100/25);
  }

  //couleur pastille
  let couleur = '';
  if (completude<30) {
    couleur = 'red';
  } else if (completude >=30 && completude<70) {
    couleur = 'orange';
  } else {
    couleur = 'green';
  }

    // const [fontsLoaded] = useFonts({
    //     Nunitobold: require('../../assets/fonts/Nunito/static/Nunito-Bold.ttf'),
    //     NunitoSans: require('../../assets/fonts/Nunito_Sans/static/NunitoSans_7pt-Medium.ttf')
    //   });
  const handleSubmit = () => {
    navigation.navigate('ProPreferences')
  }  

  return (
    <View style={styles.container}>
    <LinearGradient
      colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
      start={{ x: 0, y: 0 }} // Start point of the gradient
      end={{ x: 1, y: 1 }} // End point of the gradient
      style={styles.background}
        >
      <View style={styles.container}>
          <View style={styles.hautPage}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesome style={styles.icon} name='chevron-left' size={20} color='#1F2937' />
                </TouchableOpacity> 
                <Text style={styles.Title}>Mon Client</Text>
                <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit()}}>
                    <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
                </TouchableOpacity>
            </View>
            <View style={styles.dossier}>
              <Text style={styles.dossiertxt}>Dossier complet à {completude} %</Text>
              <View style={[styles.pastille, {backgroundColor : couleur }]}></View>
            </View> 
          </View>
        <ScrollView style={styles.scrollContainer}>
        <View style={styles.CardsGroup}>
                <Text style={styles.cardTitle}>Infos Client :</Text>
                <View style={styles.clientsCard1}>
                    <View style={styles.rowInfos}>
                        <Text style={styles.InfosGauche}>Nom :</Text>
                        <Text style={styles.InfosDroite}>{client.nom}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.InfosGauche}>Prénom : </Text>
                        <Text style={styles.InfosDroite}>{client.prenom}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.InfosGauche}>Téléphone : </Text>
                        <Text style={styles.InfosDroite}>{client.tel}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.InfosGauche}>Email :</Text>
                        <Text style={styles.InfosDroite}>{client.email}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.InfosGauche}>salaire Mensuel :</Text>
                        <Text style={styles.InfosDroite}>{client.salaire} €</Text>
                    </View>
                </View>
            
                <Text style={styles.cardTitle}>Sa Recherche :</Text>
                {client.recherche==='location' &&
                <View style={styles.clientsCard2}>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Recherche :</Text>
                        <Text style={styles.Infos2Droite}>{client.recherche}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Zone de Recherche :</Text>
                        <Text style={styles.Infos2Droite}>{/*client.zone*/}Paris</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Budget Mensuel Max :</Text>
                        <Text style={styles.Infos2Droite}>{client.location.budgetMois} euros</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Type de Bien recherché :</Text>
                        <Text style={styles.Infos2Droite}>{client.location.typeBienLoc}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Surface Minimum :</Text>
                        <Text style={styles.Infos2Droite}>{client.location.minSurfaceLoc} m²</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Nbre de pièces Minimum :</Text>
                        <Text style={styles.Infos2Droite}>{client.location.minPieceLoc}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Nbre de locataires :</Text>
                        <Text style={styles.Infos2Droite}>{client.location.nbLoc}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Bien Meublé :</Text>
                        <Text style={styles.Infos2Droite}>{client.location.meuble}</Text>
                    </View>
                </View> }

                {client.recherche==='achat' &&
                <View style={styles.clientsCard2}>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Recherche :</Text>
                        <Text style={styles.Infos2Droite}>{client.recherche}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Zone de Recherche :</Text>
                        <Text style={styles.Infos2Droite}>{/*client.zone*/}Paris</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Budget Mensuel Max :</Text>
                        <Text style={styles.Infos2Droite}>{client.achat.budgetMax} euros</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Type de Bien recherché :</Text>
                        <Text style={styles.Infos2Droite}>{client.achat.typeBienAchat}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Surface Minimum :</Text>
                        <Text style={styles.Infos2Droite}>{client.achat.minSurfaceAchat} m²</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Nbre de pièces Minimum :</Text>
                        <Text style={styles.Infos2Droite}>{client.achat.minPieceAchat}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Type d'investissement</Text>
                        <Text style={styles.Infos2Droite}>{client.achat.typeInvest}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Primo accédant ?</Text>
                        <Text style={styles.Infos2Droite}>{client.achat.typeInvest ? "oui" : "non"}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>Financement</Text>
                        <Text style={styles.Infos2Droite}>{client.achat.financement}</Text>
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos2Gauche}>accord Banque ?</Text>
                        <Text style={styles.Infos2Droite}>{client.achat.accordBanque ? "oui" : "non"}</Text>
                    </View>
                </View> }

                <Text style={styles.cardTitle}>Pièces Justificatives :</Text>
                {client.recherche==='location' &&
                <View style={styles.clientsCard3}>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos3Gauche}>{`\u2022`} Pièce d'identité</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValueId ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValueId(newValue)}
                            value={switchValueId}
                            />
                    </View> 
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos3Gauche}>{`\u2022`} Justificatif de Domicile</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValueDom ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValueDom(newValue)}
                            value={switchValueDom}
                            />
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos3Gauche}>{`\u2022`} Fiche de paye 1</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValueFP1 ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValueFP1(newValue)}
                            value={switchValueFP1}
                            />
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos3Gauche}>{`\u2022`} Fiche de paye 2</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValueFP2 ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValueFP2(newValue)}
                            value={switchValueFP2}
                            />
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos3Gauche}>{`\u2022`} Fiche de paye 3</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValueFP3 ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValueFP3(newValue)}
                            value={switchValueFP3}
                            />
                    </View>
                    <View style={styles.rowInfos}>
                        <Text style={styles.Infos3Gauche}>{`\u2022`} avis d'imposition</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: "#767577", true: "#f4f3f4"}}
                            thumbColor={switchValueImpot ? "#46AFA5" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(newValue) => setSwitchValueImpot(newValue)}
                            value={switchValueImpot}
                            />
                    </View>
            </View> }
            {client.recherche==='achat' &&
            <View style={styles.clientsCard3}>
              <View style={styles.rowInfos}>
              <Text style={styles.Infos3Gauche}>{`\u2022`}Prêt accord banque</Text>
              <Switch
                  style={styles.switch}
                  trackColor={{ false: "#767577", true: "#f4f3f4"}}
                  thumbColor={switchValuePret ? "#46AFA5" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={(newValue) => setSwitchValuePret(newValue)}
                  value={switchValuePret}
                  />
              </View>
            </View>}
                        <TouchableOpacity style={styles.button}>
                            < Text style={styles.textButton}>Télécharger les Documents</Text>
                        </TouchableOpacity>

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
  alignItems:'center',
},
background: {
  flex: 1,
  width: "100%",
},
header: {
  flexDirection: 'row',
  width :'90%',
  marginTop : '15%', 
  alignItems: 'center', // Center the content horizontally
  justifyContent: 'space-between',
  padding : '2%',
},
hautPage : {
  width : '100%',
  justifyContent : 'center',
  alignItems : 'center',
},
dossier : {
  flexDirection : 'row',
  padding : '3%',
  alignItems : 'center',
},
dossiertxt : {
  fontSize : 15,
},
pastille : {
  width : 10,
  height : 10,
  borderRadius : 100,
  marginLeft : '3%',
},
scrollContainer : {

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
    marginTop : '2%',
    justifyContent: 'center',
    alignItems: 'center',
},

clientsCard1 :{
  justifyContent : 'center',
  alignItems : 'center',
  height: 220,
  width : 400,
  borderRadius: 80,
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
    padding : 5,
},
clientsCard2 :{
    justifyContent : 'center',
    alignItems : 'center',
    height: 350,
    width : 400,
    borderRadius: 80,
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
      padding : 5,
  },
  clientsCard3 :{
    justifyContent : 'center',
    alignItems : 'center',
    //height:350,
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
      padding : 8,
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
InfosGauche:{
    paddingBottom: 10,
    paddingLeft: 20,
    fontFamily: 'NunitoSans',
    fontSize: 16,
},
InfosDroite:{
  paddingBottom: 10,
  paddingRight: 20,
  fontFamily: 'NunitoSans',
  fontSize: 16,
},
Infos2Gauche:{
  paddingBottom: 10,
  paddingLeft: 30,
  fontFamily: 'NunitoSans',
  fontSize: 16,
},
Infos2Droite:{
  paddingBottom: 10,
  paddingRight: 30,
  fontFamily: 'NunitoSans',
  fontSize: 16,
},
Infos3Gauche:{
  paddingLeft: 30,
  fontFamily: 'NunitoSans',
  fontSize: 16,
  paddingTop : 10,
},
cardTitle:{
    marginTop:5,   
    fontFamily: 'Nunitobold',
    color: 'white',
    fontSize: 20,
},
rowInfos : {
width: '95%',
flexDirection:'row',
justifyContent:'space-between',
},
switch:{
    marginRight: 40,
    // marginBottom: 10,
},
button: {
    alignItems: "center",
    justifyContent: "center",
    width: '80%',
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
    margin : '5%',
  },
  textButton: {
    color: "#ffffff",
    fontFamily: 'Nunitobold',
    height: 30,
    fontWeight: "600",
    fontSize: 20,
  },
  
});
