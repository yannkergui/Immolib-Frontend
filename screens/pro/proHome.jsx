import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import {Calendar,Calendarlist,Agenda, LocaleConfig} from 'react-native-calendars';


export default function ProHome({navigation}) {
  const [dateVisite, setDateVisite] = useState([])
  const [items2, setItems2] = useState({});

  useEffect(() => {
    fetch('http://192.168.10.138:3000/visites/pro/64c793b55faa2cf4d0383d1d')
      .then(response => response.json())
      .then(data => {
        const updatedItems = {};
        data.VisitesTrouvees.map(data => { console.log(data.usersId);
          const visitedate = data.date;
          const name = `${data.usersId.nom} ${data.usersId.prenom} - ${data.bienImmoId.titre}`;
          const time = `${data.startTimeVisit}`;

          if (!updatedItems[visitedate]) {
            updatedItems[visitedate] = [{ name, time }];
          } else {
            updatedItems[visitedate].push({ name, time });
          }

          setDateVisite(data);
        });

        setItems2(updatedItems);
      })
  }, []);

  // console.log(items2);

const items = {
  '2023-08-01': [{ name: 'Event 1', time: '10:00 AM' }],
  '2023-08-15': [
    { name: 'Event 2', time: '3:00 PM' },
    { name: 'Event 3', time: '5:30 PM' },
  ],
};


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


  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventTime}>{item.time}</Text>
      </View>
    );
  };

  //rendu si pas de visites ce jour la
  const renderEmptyData = () => {
    return (
        <View style={styles.emptyDate}>
            <Text style={styles.emptyDatetext}>Pas de visites aujourd'hui</Text>
        </View>
    );
}

const theme = {
  calendarBackground: "#47AFA5", //agenda background
  agendaKnobColor: '#BCCDB6', // knob color
  agendaDayTextColor: "#47AFA5", // day name
  agendaDayNumColor: 'black', // day number
  agendaTodayColor: 'black', // today in list
  monthTextColor: '#BCCDB6', 
  textDefaultColor: "black",
  todayBackgroundColor: "#47AFA5",
  todayTextColor:'#BCCDB6',
  textSectionTitleColor: "#47AFA5",
  selectedDayBackgroundColor: '#BCCDB6', // calendar sel date
  dayTextColor: 'black', // calendar day
  dotColor: "#BCCDB6", // dots
  textDisabledColor: "black"
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
        <Text style={styles.Title}>Home</Text>
        <TouchableOpacity style={styles.iconcontainer}>
          <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button}>
          < Text style={styles.textButton}>Mes visites en attente de validation</Text>
        </TouchableOpacity>
        <View style={styles.calendarview}>
        <Agenda
          // Display the list of events when a date is selected
          items={items2}
          renderItem={renderItem}
          renderEmptyData={renderEmptyData}
          style={styles.calendar}
          hideKnob={false}
          showOnlySelectedDayItems={true}
          theme={theme}
        />
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
}
});