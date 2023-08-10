import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, SafeAreaView, ScrollView, Switch, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { ipAdress } from "../../immolibTools";
import {refresh} from "../../reducers/refresher";
import Mailer from 'react-native-mail'



export default function PersoMaVisite({navigation}) {

  const dispatch = useDispatch();

  // récupération du reducer maVisite avec toutes les infos nécessaires pour les cards de ce screen
  const maVisite = useSelector((state) => state.maVisite.value);
  const coordonnees = useSelector((state) => state.maVille.value);

  // fonction de click sur la Card visite pour dispatcher les infos dans le reducer afin de les afficher sur le screen suivant
  // et naviguer vers l'écran perso ma visite
  const onPressMobileNumberClick = (number) => {

    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
 }

 const onPressMail = (email) => {
  const emailAddress = email; // Replace with the recipient's email address
  const subject = `A propos de ma visite du ${maVisite.dateOfVisit} à ${maVisite.startTimeVisit}`;
  const body = 'Je souhaite avoir des informations';

  const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  Linking.openURL(mailtoUrl);
 }

 //fonction click sur icône annuler une visite :
function handleCancelVisit (e) { 
  fetch(`http://${ipAdress}/visites/statut/${e._id}`, {
  method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({statut : "annulé"})
  })
  .then(response => response.json())
  .then(() => { dispatch(refresh())
    navigation.goBack()})
  
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
  {/* header commun à de nombreuses pages*/}
        <View style={styles.header}>
            <TouchableOpacity  onPress={() => navigation.goBack()}>
                <FontAwesome style={styles.icon} name='chevron-left' size={20} color='#1F2937' />
            </TouchableOpacity> 
            <Text style={styles.Title}>Ma Visite</Text>
            <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit()}}>
                <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
            </TouchableOpacity>
        </View>
        <View style={styles.localcontainer}>
          {/* Card avec l'horaire de la visite et les boutons de mofification et suppréssions  */}
            <View style={styles.horaire}>
                <Text style={styles.lineTitle2}>Le {maVisite.dateOfVisit} à {maVisite.startTimeVisit}</Text>
                <TouchableOpacity style={styles.iconcontainer2}>
                    <FontAwesome name="edit" size={30} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconcontainer2} onPress={()=> handleCancelVisit(maVisite)}>
                    <FontAwesome name="remove" size={30} color="black" />
                </TouchableOpacity>
            </View>
       
        <View style={styles.lineCard2}>
          {/* Card avec les infos du bien lié à la visite */}
              <Image style={styles.image} source={require('../../assets/bed.jpg')}/>
            <View style={styles.lineText}>
                <View style={styles.TextinCard}>
                    <Text style={styles.lineTitle}>{maVisite.bienImmoId.titre}</Text>
                    <Text style={styles.text}>{maVisite.bienImmoId.description}</Text>
                    <Text style={styles.text}>{maVisite.bienImmoId.numeroRue} {maVisite.bienImmoId.rue} {maVisite.bienImmoId.codePostal}</Text>
                    <Text style={styles.text}>surface : {maVisite.bienImmoId.surface} m2 - Nb de pièces : {maVisite.bienImmoId.nbPièces} </Text>
                    <Text style={styles.text}>Nb de chambres : {maVisite.bienImmoId.nbChambres} - {maVisite.bienImmoId.prixVente} €</Text>
                </View>
            </View>
          </View>   
          <View style= {styles.mapView}>
            {/* Map avec Marker lié à l'adresse du bien */}
            <MapView style= {styles.map}
                    initialRegion={{
                        latitude: `${coordonnees.latitude}`,
                        longitude: `${coordonnees.longitude}`,
                        latitudeDelta: 0.008,
                        longitudeDelta: 0.007,
                    }}
                    >
                      <Marker style= {styles.marker} coordinate={{latitude:`${coordonnees.latitude}` ,longitude:`${coordonnees.longitude}`}} />
            </MapView>
          </View>
          {/* Card du professionnel avec possiblité d'envoyer un mail et d'appeler */}
          <View style={styles.lineCard}>
              <Image style={styles.image2} source={require('../../assets/alice.jpeg')}/>
            <View style={styles.lineText2}>
                <View style={styles.TextinCard2}>
                    <Text style={styles.lineTitle}>{maVisite.prosId.nom} {maVisite.prosId.prenom}</Text>
                    <Text style={styles.text}>{maVisite.prosId.agence.denomination}</Text>
                    <Text style={styles.text}>{maVisite.prosId.agence.adresse}</Text>
                    <Text style={styles.text}>Téléphone : {maVisite.prosId.tel}</Text>
                    <Text style={styles.texttel} onPress={() => { onPressMobileNumberClick(maVisite.prosId.tel)}}>Email : {maVisite.prosId.mail}</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.iconcontainer2} onPress={() => { onPressMobileNumberClick(maVisite.prosId.tel)}}>
                    <FontAwesome style={styles.icon} name='phone' size={30} color='#1F2937' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconcontainer2} >
                    <FontAwesome style={styles.icon} name='envelope' size={25} color='#1F2937' onPress={() => {onPressMail(maVisite.prosId.email)}} />
                </TouchableOpacity>
            </View>
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
iconcontainer2:{
top : 0,
backgroundColor : 'white',
width : 50,
height: 50,
borderRadius : 100,
marginRight:20,
justifyContent:'center',
alignItems:'center',
margin: 10
},
Title: {
  color: 'white',
  fontSize: 35,
  fontStyle: 'normal',
  fontWeight: '600', 
  letterSpacing: -1.5, 
  textAlign:'center',
},
horaire:{
    flexDirection:'row',
    width:'90%',
    justifyContent:'space-around',
    alignItems:'center',
    height:70,
    width: 370,
    borderRadius: 20,
    backgroundColor: "#BCCDB6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
},
lineCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    width: 370,
    height:180,
    borderRadius: 25,
    backgroundColor: "#BCCDB6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,

  },
  lineCard2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    width: 370,
    height:220,
    borderRadius: 25,
    backgroundColor: "#BCCDB6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,

  },
  image:{
    height: 90,
    width:90,
marginLeft:10,
borderRadius:10,
  },
  lineText:{
marginLeft:10,
marginRight:40,
justifyContent:'center',
alignItems:'flex-start',
  },
  lineTitle:{
    color:'white',
    fontSize: 20,
    marginBottom:10,
  },
  text:{
    textAlign:'center',
    marginBottom: 8,
    marginRight:14,
  },
  map:{
    height: 230,
    borderRadius:20,
  },
  mapView:{
    width:370,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  localcontainer:{
    height: '80%',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop:100,
  },
  TextinCard:{
    alignItems:'center',
    width:'90%',
  },
  TextinCard2:{
    alignItems:'center',
    width:180,
    marginLeft: 5,
   
  },
  image2:{
    height: 90,
    width:90,
marginLeft:10,
borderRadius:100,
  },
  lineTitle2:{
    color:'white',
    fontSize: 20,
    marginLeft:20,
    marginRight: 30,
  },
});
