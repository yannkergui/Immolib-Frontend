import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  Calendar,
  Calendarlist,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import { ipAdress } from "../../immolibTools";

export default function ProHome({ navigation }) {
  const [items2, setItems2] = useState({});
  const pro = useSelector((state) => state.pro.value);
  const [tableau, setTableau] = useState([]);

  const updatedItems = {};

  useEffect(() => {
    fetch(`http://192.168.10.142:3000/visites/pro/${pro.token}`)
      .then((response) => response.json())
      .then((data) => {
        data.visitesTrouvees.forEach((data) => {
          console.log(data);
          const visitedate = data.dateOfVisit;
          const name = `${data.usersId.nom ? data.usersId.nom : ''} ${data.usersId.prenom ? data.usersId.prenom : ''} - ${data.bienImmoId.titre ? data.bienImmoId.titre : ''}`
          const time = `${data.startTimeVisit ? data.startTimeVisit : ''}`;
          if (!updatedItems[visitedate]) {
            updatedItems[visitedate] = [{ name, time }];
          } else {
            updatedItems[visitedate].push({ name, time });
          }
        });
        setItems2(updatedItems);
      });
  }, []);


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

  const renderItem = (item) => {
    return (
      <View style={styles.item} onPress= {()=> console.log('test')}>
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
  };

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
            <Text style={styles.title}>Home</Text>
            <TouchableOpacity style={styles.iconContainer} onPress={()=> navigation.navigate('ProPreferences')}>
              {pro.photo && <Image source={{url: pro.photo}} style={styles.photo}/>}
              {!pro.photo && <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />}
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>
              Mes visites en attente de validation
            </Text>
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
    //width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    position: "absolute",
    top: 80,
    alignItems: "center", // Center the content horizontally
    justifyContent: "flex-end",
    // borderColor: "black",
    // borderWidth: 1,
  },
  iconContainer: {
    //position :"absolute",
    left: 0,
    top: 0,
    backgroundColor: "white",
    width: 60,
    height: 60,
    // paddingLeft: 15,
    // paddingTop: 8.5,
    borderRadius: 100,
  },
  title: {
    color: "white",
    fontSize: 35,
    fontStyle: "normal",
    fontWeight: "600",
    letterSpacing: -1.5,
    textAlign: "center",
    // borderColor: "red",
    // borderWidth: 1,
    marginRight: 78,
  },
  button: {
    position: "absolute",
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
  calendar: {
    width: 370,
    borderRadius: 20,
  },
  item: {
    backgroundColor: "#47AFA5",
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
    fontWeight: "bold",
  },
  eventTime: {
    fontSize: 14,
    color: "gray",
  },
  calendarview: {
    height: 400,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyDate: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    height: 60,
    width: 300,
    marginLeft: "13%",
    borderRadius: 20,
    backgroundColor: "#47AFA5",
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
  emptyDatetext: {
    fontSize: 13,
    color: "white",
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 4,
  },
});
