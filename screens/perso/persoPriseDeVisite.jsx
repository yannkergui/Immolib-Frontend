import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment"; 
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from 'react-redux';
import { maVisiteData } from '../../reducers/maVisite';
import {userDatas} from '../../reducers/user'
import { ipAdress } from "../../immolibTools";




export default function PersoPriseDeVisite({navigation}) {
  const [selectedDate, setSelectedDate] = useState(Date);
  const [timeSlots, setTimeSlots] = useState(null);
  const [userId, setUserId] = useState('')

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const bienData = {
    "_id": {
      "bienid": "64d1029e1aef158673603b54"
    },
    "titre": "Appartement 4 pièces Paris 15",
    "description": "Appartement de charme avec balcon à procimité de la mairie",
    "surface": 60,
    "type": "appartement",
    "transaction": "vente",
    "numeroRue": "3",
    "rue": "rue de viroflay",
    "codePostal": 75015,
    "ville": "Paris",
    "nbChambres": 2,
    "meuble": false,
    "photo": "https://res.cloudinary.com/dnzrnfglq/image/upload/v1691152139/jsbft2cm7u4j1cmstygm.jpg",
    "prixVente": 700000,
    "visites": [],
    "pro": {
      "proid": "64d046c3588b8ddd65d8cbcf"
    },
  }

  let proid = bienData.pro.proid

  LocaleConfig.locales['fr'] = {
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ],
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: "Aujourd'hui"
  };
  LocaleConfig.defaultLocale = 'fr';

   // Fetch du backend au chargement de la page pour récupérer les créneaux du jour
   useEffect((date) => {
    setTimeSlots(null);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    fetch(`http://${ipAdress}/disponibilites/dateSearch/${proid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dateOfVisit: formattedDate })
    })
      .then(response => response.json())
      .then(data => {
        if (data.data) {
        generateTimeSlots(data.data);} else {
          console.log('impossible');
        }
      })
      fetch(`http://${ipAdress}/users/${user.token}`)
      .then(response => response.json())
      .then(data => {
        setUserId(data.user._id);
        dispatch(userDatas({_id: data.user._id}))
      })
    
  }, []);

  

  let formattedDate

  //au click sur une date 
  const handleDateSelect = (date) => {
    setTimeSlots(null);
    setSelectedDate(date);
    formattedDate = moment(date).format("YYYY-MM-DD");
    //fetch des dispos du pro 
    fetch(`http://${ipAdress}/disponibilites/dateSearch/${proid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dateOfVisit: formattedDate })
    })
      .then(response => response.json())
      .then(data => {
        if (data.data) {
        generateTimeSlots(data.data);} else {
          console.log('impossible');
        }
      })

  };

  //fonction pour générer des slots de 30 minutes 
  const generateTimeSlots = (availabilityData) => {
    const timeSlotsArray = [];

    // boucle forEach afin de générer les slots dans l'intervalle voulu
    availabilityData.forEach(data => {
      const startTimeMoment = moment(data.startTimeDispo, 'HH:mm');
      const endTimeMoment = moment(data.endTimeDispo, 'HH:mm');

      // isSameOrBefore méthode moment pour vérifier qu'on ne dépasse pas l'heure de fin 
      while (startTimeMoment.isSameOrBefore(endTimeMoment)) {
        const startTime = startTimeMoment.format('HH:mm');
        // on retraite les exceptions du pros dans une boucle some (renvoi boolean) afin de les supprimer des slots dispo en fonction de la date 
        const isException = data.Exception.some(exception => {
          const exceptionDate = moment(exception.dateOfVisit).format('YYYY-MM-DD');
          if (exceptionDate === moment(formattedDate).format('YYYY-MM-DD')) {
            const exceptionStartTime = moment(exception.startTimeVisit, 'HH:mm');
            const exceptionEndTime = moment(exception.endTimeVisit, 'HH:mm');
            return (
              startTimeMoment.isSameOrAfter(exceptionStartTime) &&
              startTimeMoment.isBefore(exceptionEndTime)
            );
          }
          // si les exceptions correspondent à tel jour précis alors isException sera a False 
          return false;
        });

        // si isException est true (logique au dessus), on push les slots dans le tableau car ils ne sont pas des exceptions et représentent donc tous les StartTime
        if (!isException) {
          timeSlotsArray.push({ startTime });
        }

        startTimeMoment.add(30, 'minutes');
      }
    });

    setTimeSlots(timeSlotsArray);
  };

  
// formattage de la date afin d'avoir un affichage plus fluide
  let frenchDate = moment(selectedDate).format("DD/MM/YYYY");

// fonction permettant de prendre le rendez vous en appelant la route post visites
  const handleSubmit = (e) => {
    // conversion du slot dans le format nécessaire à l'envoi en back
    const startTimeConvertit = e.split(':'); // Split hours and minutes
    const startTimeVisit = moment().hours(startTimeConvertit[0]).minutes(startTimeConvertit[1]);
    const formatedStartTimeVisit = startTimeVisit.format('HH:mm')
    const duration = 30;
    // création de la donnée endTimeVisit nécessaire au modèle visite
    //on clone la date de Start et on ajoute la durée de 30 
    let endTimeVisit = startTimeVisit.clone().add(duration, 'minutes');
    const formatedendTimeVisit = endTimeVisit.format('HH:mm')
    console.log(formatedStartTimeVisit); // Output endTimeVisit in HH:mm format
    let prosId = bienData.pro.proid;
    let bienImmoId = bienData._id.bienid
    const dateDeVisite = moment(selectedDate).format("YYYY-MM-DD");

    fetch(`http://${ipAdress}/visites`, {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({prosId : prosId, usersId: userId, dateOfVisit: dateDeVisite, startTimeVisit: formatedStartTimeVisit, endTimeVisit: formatedendTimeVisit, duration: duration, bienImmoId: bienImmoId})
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('data récupéré : ', data)
          dispatch(maVisiteData(data));
        }
        if (user.dejaInscrit === 'true'){
          navigation.navigate('TabNavigatorPerso');
        } else { navigation.navigate('CompleteTonDossier');}
      })
      //si le client avait déjà un compte navigation vers HomePage sinon Tunnel

  };

  return (
    <View style={styles.container}>
    <LinearGradient
      colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
      start={{ x: 0, y: 0 }} // Start point of the gradient
      end={{ x: 1, y: 1 }} // End point of the gradient
      style={styles.background}
    >
      <View style={styles.headerTitle}>
      <Image style={styles.image} source={require('../../assets/IMMOLIB.png')} /> 
      </View>
      <View style={styles.localContainer}>
      <Text style={styles.label}>Choissisez votre Date de visite souhaitée:</Text>
      <Calendar
      style={styles.calendar}
        markedDates={{
          [moment(selectedDate).format("YYYY-MM-DD")]: {
            selected: true,
            selectedColor: '#ffffff',
          },
        }}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: "#47AFA5",
          textSectionTitleColor: '#ffffff',
          selectedDayBackgroundColor: '#ffffff',
          selectedDayTextColor: "#47AFA5",
          todayTextColor: 'black',
          dayTextColor: '#2d4150',
          arrowColor: '#2d4150',
          disabledArrowColor: '#2d4150',
        }}
        onDayPress={(day) => handleDateSelect(new Date(day.dateString))}
      />
      <Text style={styles.label}>Créneaux de visites Disponibles pour le {frenchDate} :</Text>
      <View style={styles.displayCard1}>
        {/* ternaire permettant l'affichage en fonction d'une dispo ou non */}
      {timeSlots ? (
        timeSlots
          .sort((a, b) => moment(a.startTime, 'HH:mm').diff(moment(b.startTime, 'HH:mm')))
          .map((timeSlot, index) => (
            <View style={styles.displayCard}>
            <TouchableOpacity style={styles.Card} onPress={() => { handleSubmit(timeSlot.startTime) }}>
              <Text key={index} >{timeSlot.startTime}</Text>
            </TouchableOpacity>
            </View>
          ))
      ) : (
        <Text>Pas de créneau de visite disponible à cette date</Text>
      )}
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
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop:20,
    justifyText:'center',
    color :'#2d4150',
  },
  calendar:{
    backgroundColor:"#47AFA5",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    paddingBottom:15,
  },
  localContainer:{
    width: '90%',
    justifyContent: "center",
  },
  Card: {
    backgroundColor:"#47AFA5",
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,
      elevation: 18,
    color:'#2d4150',
  },
displayCard:{
flexDirection:'row',
flexWrap:'wrap',
width:'25%',
alignItems: "center",
justifyContent: "center",
  },
  displayCard1:{
    flexDirection:'row',
flexWrap:'wrap',
width:'100%',
alignItems: "center",
justifyContent: "center",
  },
  image:{
    marginTop: 40,
    height:100,
  },
  headerTitle:{
position:"absolute",
top: 40,
  }
});
