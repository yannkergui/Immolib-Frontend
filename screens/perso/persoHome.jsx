import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import { useState, useEffect } from "react";
import { maVisiteData } from '../../reducers/maVisite';
import { useDispatch, useSelector } from 'react-redux';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import moment from "moment"; 


import { ipAdress } from "../../immolibTools";


export default function PersoHome({navigation}) {
  
  // Déclaration des états pour stocker les données des visites et des éléments du calendrier
  const [items2, setItems2] = useState({});
  const [closestVisit, setClosestVisit] = useState(null);
  
  // Extraction des données de l'utilisateur depuis le store Redux
  const user = useSelector((state) => state.user.value);

  // useEffect de chargement qui récupère la route Get Visite Users
  useEffect(() => {
    fetch(`http://${ipAdress}/visites/user/${user._id}`)
      .then(response => response.json())
      .then(data => {
        const updatedItems = {};
        data.VisitesTrouvees.map(data => { 
          // Extraction des informations de chaque visite
          const visitedate = data.dateOfVisit;
          const name = `${data.prosId.nom} ${data.prosId.prenom} - ${data.prosId.agence.denomination} - ${data.bienImmoId.titre}`;
          const time = `${data.startTimeVisit}`;
          
          // Ajout des informations dans l'objet items2 pour le rendu du calendrier
          if (!updatedItems[visitedate]) {
            updatedItems[visitedate] = [{ name, time }];
          } else {
            updatedItems[visitedate].push({ name, time });
          }
        });

        // Mise à jour de l'état items2 avec les données formatées
        setItems2(updatedItems);

        const closestVisit = findClosestVisit(updatedItems);
        setClosestVisit(closestVisit);
      })
  }, []);

// Fonction pour compter les champs non vides dans l'objet utilisateur
const countNonEmptyFields = () => {
  let count = 0;
  // Parcours des propriétés de l'objet utilisateur
  for (const key in user) {
    // Vérification que la propriété a une valeur non vide avec tous les cas possibles
    if (user[key] !== "" && user[key] !== null && user[key] !== undefined) {
      count++;
    }
  }
  return count;
};

// déclaration de la variable pour la completion du dossier
let completion;
// Vérification si l'utilisateur est déjà inscrit
if (user.dejaInscrit) {
  // Calcul du taux de complétion en pourcentage (pour les utilisateurs déjà inscrits)
  completion = (countNonEmptyFields() / 25) * 100;
} else {
  // Calcul du taux de complétion en pourcentage (pour les nouveaux utilisateurs)
  completion = (countNonEmptyFields() / 15) * 100;
}


  // Configuration des noms de mois et jours en français pour le calendrier
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = "fr";

  // Fonction pour rendre chaque élément dans le calendrier sous forme de card (nom et heure de la visite)
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>
    );
  };

  // Fonction pour rendre un message si aucune visite n'est prévue pour une journée donnée
  const renderEmptyData = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.emptyDatetext}>Pas de visites aujourd'hui</Text>
      </View>
    );
  };

  const findClosestVisit = (visits) => {
    // Obtention de la date d'aujourd'hui au format ISO (AAAA-MM-JJ) 
    //(sans utiliser moment car probleme de compatibilité (je ne sais pas pkoi))
    const today = new Date().toISOString().split("T")[0];
    let closest = null; 
  
    // Parcours des dates de visite dans les données
    for (const visitDate in visits) {
      // Vérification si la date de visite est ultérieure ou égale à aujourd'hui
      if (visitDate >= today) {
        const visitsOnDate = visits[visitDate]; // Récupération des visites pour cette date
        // Parcours des visites pour une date donnée
        visitsOnDate.forEach((visit) => {
          const visitTime = new Date(`${visitDate}T${visit.time}`); // Date et heure de la visite combinées
          // Vérification si la visite est plus proche que la précédente visite la plus proche trouvée
          if (!closest || visitTime < closest.time) {
            closest = { ...visit, date: visitDate, time: visitTime }; // Stockage des informations de la visite la plus proche
          }
        });
      }
    }
  
    return closest; // Retourne l'objet visite la plus proche ou null si aucune visite n'est future
  };

  // Configuration personnalisée de l'apparence du calendrier
  const theme = {
    calendarBackground: "#47AFA5", //agenda background
    agendaKnobColor: "#BCCDB6", // knob color
    agendaDayTextColor: "#47AFA5", // day name
    agendaDayNumColor: "black", // day number
    agendaTodayColor: "black", // today in list
    monthTextColor: "#BCCDB6",
    textDefaultColor: "black",
    todayBackgroundColor: "#47AFA5",
    todayTextColor: "#BCCDB6",
    textSectionTitleColor: "#47AFA5",
    selectedDayBackgroundColor: "#BCCDB6", // calendar sel date
    dayTextColor: "black", // calendar day
    dotColor: "#BCCDB6", // dots
    textDisabledColor: "black",
  };

  // Rendu de l'interface de la page d'accueil
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Couleurs du dégradé
        start={{ x: 0, y: 0 }} // Point de départ du dégradé
        end={{ x: 1, y: 1 }} // Point d'arrivée du dégradé
        style={styles.background}
      >
        <View style={styles.container}>
          {/* En-tête avec le titre et une icône de profil */}
          <View style={styles.header}> 
            <Text style={styles.Title}>Home</Text>
            <TouchableOpacity style={styles.iconcontainer}>
              <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
            </TouchableOpacity>
          </View>
          
          {/* Affichage du calendrier des visites */}
          <View style={styles.calendarview}>
            <Agenda
              items={items2} // Données à afficher dans le calendrier sous forme de Card 
              renderItem={renderItem} // Fonction pour le rendu des éléments
              renderEmptyData={renderEmptyData} // Fonction pour le rendu en cas de données vides
              style={styles.calendar} // Style du calendrier
              hideKnob={false}
              showOnlySelectedDayItems={true}
              theme={theme} // Thème personnalisé
            />
          </View>
          
          {/* Affichage du statut du profil */}
          <View >
            <Text style={styles.subtitle}>Mon profil est complet à {completion}%</Text>
          </View>
          <View style={styles.closestVisitContainer}>
            <Text style={styles.subtitle}>Ma prochaine visite :</Text>
            {closestVisit && (
              <View style={styles.item2}>
                <Text style={styles.eventName}>{closestVisit.name}</Text>
                <Text style={styles.eventTime2}>
                 le {closestVisit.date} à {closestVisit.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Text>
              </View>
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
},
header: {
  flexDirection: 'row',
  width :'90%',
  position: 'absolute',
  top: 80, 
  alignItems: 'center', 
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
  color: 'white',
  fontSize: 35,
  fontStyle: 'normal',
  fontWeight: '600', 
  letterSpacing: -1.5, 
  textAlign:'center',
},
button: {
  position:'absolute',
  top: 180,
  alignItems: "center",
  justifyContent: "center",
  width: 300,
  height: 10,
  backgroundColor: "#47AFA5",
  borderRadius: 10,
  marginBottom: "25%",
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
  height: 30,
  fontWeight: "600",
  fontSize: 12,
  paddingTop: 7,
},
calendar:{
  width:400,
  borderRadius: 20,
},
item: {
  backgroundColor:"#47AFA5",
  borderRadius: 15,
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
},
eventName: {
  fontSize: 16,
  fontWeight: 'bold',
},
eventTime: {
  fontSize: 14,
  color: 'gray',
},
calendarview:{
  height: 400,
  marginTop: 50,
  justifyContent:'center',
  alignItems:'center'
},
emptyDate:{
  justifyContent:'center',
  alignItems:'center',
  marginTop: 40,
  height: 60,
  width : 300,
  marginLeft: '13%',
  borderRadius: 20,
  backgroundColor:"#47AFA5",
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
emptyDatetext:{
  fontSize: 13,
  color:'white',
},
subtitle:{
  marginTop:20,
  paddingBottom: 10,
  paddingLeft: 45,
  paddingRight: 45,
  fontSize: 16,
},
item2 : {
  backgroundColor:"#47AFA5",
  borderRadius: 25,
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
    justifyContent:'center',
    alignItems:'center',
    height: 100,
},
closestVisitContainer:{
  alignItems:'center',
  borderTopColor:'black',
  borderTopwidth:'2'
},
});