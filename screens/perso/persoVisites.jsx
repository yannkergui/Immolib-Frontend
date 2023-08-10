import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, ScrollView, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { maVisiteData } from '../../reducers/maVisite';
import { maVilleData } from '../../reducers/maVille';
import {refresh} from "../../reducers/refresher";

import { ipAdress } from "../../immolibTools";

export default function PersoVisites({navigation}) {

  const dispatch = useDispatch();
  console.log(refresher);

  // etat pour stocker les infos reçues du backend
  const [visitesPerso, setVisitesPerso] = useState([]);

 // etat pour rafraichir la page après la validation de la visite
 const refresher = useSelector((state) => state.refresher.value);
  
  const user = useSelector((state) => state.user.value);

  // Fetch du backend au chargement de la page pour récupérer les visites liées au user
  useEffect(() => {
    fetch(`http://${ipAdress}/visites/user/${user._id}`)
      .then(response => response.json())
      .then(data => {
        setVisitesPerso(data.VisitesTrouvees);
      })
  }, [refresher]);

  // constante relative au switch de changement de page 
  const page = [
    { label: "en attente de validation", value: "en attente" },
    { label: "confirmées", value: "confirmé" },
    { label: "passées", value: "passées" },
  ];


  // Etat relatif au changement de page via le switch
  const [activPage, setActivePage] = useState("en attente");

  // fonction de click sur la Card visite pour dispatcher les infos dans le reducer afin de les afficher sur le screen suivant
  // et naviguer vers l'écran perso ma visite
  const handleSubmit = (e) => {
    dispatch(maVisiteData(e));
    fetch (`https://api-adresse.data.gouv.fr/search/?q=${e.bienImmoId.numeroRue}+${e.bienImmoId.rue}+${e.bienImmoId.codePostal}`)
    .then((response) => response.json())
    .then((data) => {
      const newAdress = {
        latitude:  data.features[0].geometry.coordinates[1],
        longitude:  data.features[0].geometry.coordinates[0],
      };
      dispatch(maVilleData(newAdress))
      navigation.navigate('PersoMaVisite')
    })

  };

//fonction click sur icône annuler une visite :
function handleCancelVisit (e) {
  fetch(`http://${ipAdress}/visites/statut/${e._id}`, {
  method : 'PUT',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({statut : "annulé"})
  })
  .then(response => response.json())
  .then(() => dispatch(refresh()))
  
}

  // fonction pour gérer les appels lorsqu'on clique sur le numéro de téléphone
  const onPressMobileNumberClick = (number) => {

    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  }

  //Redirection vers la page de modification des visites :

  function handleMajVisit (e) {
    console.log(e);
    dispatch(maVisiteData(e));
    navigation.navigate('PersoModifVisite')
  }


   //constante pour formatter la date de la visite en français
   const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "fr-FR",
      options
    );
    return formattedDate;
  };

   //fonction pour classer les visites par date
   const sortedVisitesPerso = visitesPerso.sort((a, b) => {
    // convertissez les dates et heures en objets Date pour le tri
    let dateA = new Date(a.dateOfVisit + " " + a.startTimeVisit);
    let dateB = new Date(b.dateOfVisit + " " + b.startTimeVisit);
    return dateA - dateB; // retourne les données triées de la plus ancienne à la plus récente
  });

  // 1er map relatif aux visites en attente 
  const visiteEnAttente = sortedVisitesPerso.map((data) => {
    
    if (data.statut === "en attente") { 
      return (
    <TouchableOpacity style={styles.touchable} onPress={() => { handleSubmit(data) }}>
        <View style={styles.visiteCard}>
          <View style={styles.lineCardheader}>
            <View style={styles.lineheader}>
            <FontAwesome name="calendar" size={25} color="white" />
            <Text  style={styles.Textheader}> Le {formatDate(data.dateOfVisit)} à {data.startTimeVisit}</Text>
            </View>
            <TouchableOpacity onPress={()=> handleMajVisit(data)}>
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineCard}>
            <View>
              <Text> {data.bienImmoId.titre}</Text>
              <Text>{data.bienImmoId.numRue} {data.bienImmoId.rue} {data.bienImmoId.codePostal}</Text>
              <View style={styles.agenceDiv}>
              <View style={styles.agence}>
                <Text> {data.prosId.nom} {data.prosId.prenom}</Text>
                {/* <TouchableOpacity style={styles.teltouchable} onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}> */}
                 <Text style={styles.tel}> {data.prosId.tel}</Text>
                {/* </TouchableOpacity> */}
              </View>
              <View style={styles.iconCard}>
              <TouchableOpacity style={styles.iconcontainer}  onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
                    <FontAwesome style={styles.icon} name='phone' size={30} color='#1F2937' />
                </TouchableOpacity>
              <TouchableOpacity style={styles.iconcontainer} onPress={()=> handleCancelVisit(data)}>
                <FontAwesome name="ban" size={30} color="#1F2937" />
              </TouchableOpacity>
              </View>
              </View>
            </View>
          </View>    
        </View>
    </TouchableOpacity>
  
        
      );
    }
  });

  // 2iem map relatif aux visites passées

  const visitePassees = sortedVisitesPerso.map((data) => {
    const today = new Date()
    const ConvertedDateOfVisit = new Date(data.dateOfVisit)

    if (ConvertedDateOfVisit<today) {
      return (
        <TouchableOpacity style={styles.touchable} onPress={() => { handleSubmit(data) }}>
            <View style={styles.visiteCard}>
              <View style={styles.lineCardheader}>
                <View style={styles.lineheader}>
                <FontAwesome name="calendar" size={25} color="white" />
                <Text  style={styles.Textheader}> Le {formatDate(data.dateOfVisit)} à {data.startTimeVisit}</Text>
                </View>
                <TouchableOpacity >
                  <FontAwesome name="edit" size={30} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.lineCard}>
                <View>
                  <Text> {data.bienImmoId.titre}</Text>
                  <Text>{data.bienImmoId.numRue} {data.bienImmoId.rue} {data.bienImmoId.codePostal}</Text>
                  <View style={styles.agenceDiv}>
                  <View style={styles.agence}>
                    <Text> {data.prosId.nom} {data.prosId.prenom}</Text>
                    <TouchableOpacity style={styles.teltouchable} onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
                     <Text style={styles.tel}> {data.prosId.tel}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.iconCard}>
                  <TouchableOpacity style={styles.iconcontainer}  onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
                        <FontAwesome style={styles.icon} name='phone' size={30} color='#1F2937' />
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.iconcontainer} onPress={()=> handleCancelVisit(data)}>
                    <FontAwesome name="ban" size={30} color="#1F2937" />
                  </TouchableOpacity>
                  </View>
                  </View>
                </View>
              </View>    
            </View>
        </TouchableOpacity>
      );
    }
  });

  // 3iem map relatif aux visites confirmées

  const visiteConfirmees = sortedVisitesPerso.map((data) => {
    if (data.statut === "confirmé") {
      return (
        <TouchableOpacity style={styles.touchable} onPress={() => { handleSubmit(data) }}>
            <View style={styles.visiteCard}>
              <View style={styles.lineCardheader}>
                <View style={styles.lineheader}>
                <FontAwesome name="calendar" size={25} color="white" />
                <Text  style={styles.Textheader}> Le {formatDate(data.dateOfVisit)} à {data.startTimeVisit}</Text>
                </View>
                <TouchableOpacity onPress={()=> handleMajVisit(data)}>
                  <FontAwesome name="edit" size={30} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.lineCard}>
                <View>
                  <Text> {data.bienImmoId.titre}</Text>
                  <Text>{data.bienImmoId.numRue} {data.bienImmoId.rue} {data.bienImmoId.codePostal}</Text>
                  <View style={styles.agenceDiv}>
                  <View style={styles.agence}>
                    <Text> {data.prosId.nom} {data.prosId.prenom}</Text>
                    <TouchableOpacity style={styles.teltouchable} onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
                     <Text style={styles.tel}> {data.prosId.tel}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.iconCard}>
                  <TouchableOpacity style={styles.iconcontainer}  onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
                        <FontAwesome style={styles.icon} name='phone' size={30} color='#1F2937' />
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.iconcontainer} onPress={()=> handleCancelVisit(data)}>
                    <FontAwesome name="ban" size={30} color="#1F2937" />
                  </TouchableOpacity>
                  </View>
                  </View>
                </View>
              </View>    
            </View>
        </TouchableOpacity>
      );
    }
  });

  return (
    <View style={styles.container}>
      {/* Use LinearGradient as the container's background */}
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <Text style={styles.title}>Mes visites</Text>
        <View style={styles.pageContainer}>
          <SwitchSelector
            options={page}
            initial={0}
            onPress={(value) => setActivePage(value)}
            valuePadding={2.5}
            hasPadding
            style={styles.SwitchSelector3choix}
            buttonColor="#47AFA5"
            buttonMargin={1.5}
            animationDuration={250}
            height={45}
          />
        </View>
        <ScrollView style={styles.scrollview}>
        <View style={styles.cardContainer}>
          {activPage === "en attente" && visiteEnAttente}
          {activPage === "passées" && visitePassees}
          {activPage === "confirmé" && visiteConfirmees}
        </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  pageContainer: {
    flexDirection: "row",
    borderColor: "#47AFA5",
    width: "90%",
    height: "10%",
    marginTop: 20,
  },

  pageActive: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "80%",
    backgroundColor: "#47AFA5",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    marginLeft: 3,
  },

  page: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "80%",
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
  },

  title: {
    color: "white",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "600",
    marginTop: "10%",
  },

  cardContainer: {
    width: "100%",
    alignItems: "center",
  },

  touchable:{
    width:'100%',
    alignItems:'center'
  },

  visiteCard: {
    justifyContent: "space-around",
    // alignItems: "center",
    height: 150,
    width: "90%",
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
    margin: 10,
  },
  lineCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  lineCardheader:{
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    borderBottomColor:'white',
    borderBottomWidth:2,
    paddingBottom:6,
  },

  SwitchSelector3choix: {
    width: "100%",
  },

  lineheader:{
    flexDirection:'row',
    alignItems:'center',
  },

  Textheader:{
  marginLeft: 10,
  color:'white',
  fontSize:15,
  },

  agence: {
    marginTop: 10,
    marginBottom:8,
  },
  agenceDiv:{
    flexDirection:'row',
    justifyContent:'space-between',
    width: '78.5%',
    alignItems: 'center',
  },
  scrollview:{
    width: '100%',
  },
  iconcontainer :{
    top : 0,
    backgroundColor : 'white',
    width : 50,
    height: 50,
    borderRadius : 100,
    justifyContent:'center',
    alignItems:'center',
    marginRight:10,
    },
    iconCard:{
      flexDirection:'row',
      marginLeft: 160,
    },
    modalConnect : {
      flex : 1,
      width : '100%',
      alignItems:'center',
      justifyContent : 'center',
    },
    centeredView : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
    },
    modalContainer : {
      backgroundColor : 'rgba(255, 255, 255, 1)',
      width : '80%',
      padding : 10,
      borderRadius : 10, 
      alignItems : 'center',
    },
    inputsEtDelete:{
      flexDirection : 'row',
    },
    inputModal: {
      borderBottomColor : '#47AFA5',
      borderBottomWidth : 1,
      padding : 0,
      fontSize : 20,
      margin : 6,
      width : '100%',
    },
    errorInput: {
      borderBottomColor: 'red',
      borderColor: 'red',
      borderWidth : 2,
      padding : 0,
      fontSize : 20,
      margin : 0,
      width : '100%',
    },
    error: {
      marginTop: 2,
      color: 'red',
      width: 200,
      textAlign: 'center',
    },
    textDelete : {
      fontSize : 25,
    },
    btnSeConnecter : {
      marginTop : 15,
      backgroundColor : '#47AFA5',
      padding : 10,
      borderRadius : 10,
      width : '90%',
    },
    textButton : {
      color: "#ffffff",
      height: 30,
      fontWeight: "600",
      fontSize: 18,
      // borderColor : 'black',
      // borderWidth : 1,
      textAlign:'center',
      paddingTop:3
    },
});

