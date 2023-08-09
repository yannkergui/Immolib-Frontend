import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  FontAwesome,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { maVisiteData } from "../../reducers/maVisite";
import { ipAdress } from "../../immolibTools";
import { refresh } from "../../reducers/refresher";

export default function ProPriseDeVisite({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(Date);
  const [timeSlots, setTimeSlots] = useState(null);
  const [bienDataState, setBienDataState] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  const maVisite = useSelector((state) => state.maVisite.value);
  const refresher = useSelector((state) => state.refresher.value);

  // console.log("reducer ma visite", maVisite);

  useEffect(() => {
    fetch(`http://${ipAdress}/biens/${maVisite.bienImmoId._id}`)
      .then((response) => response.json())
      .then((data) => {
        setBienDataState(data.data);
        // console.log("resultat du fetch", data.data);
      });
  }, []);

  // console.log("bienDataState", bienDataState);

  const bienData = {
    _id: {
      bienid: "64d1029e1aef158673603b54",
    },
    titre: "Appartement 4 pièces Paris 15",
    description: "Appartement de charme avec balcon à procimité de la mairie",
    surface: 60,
    type: "appartement",
    transaction: "vente",
    numeroRue: "3",
    rue: "rue de viroflay",
    codePostal: 75015,
    ville: "Paris",
    nbChambres: 2,
    meuble: false,
    photo:
      "https://res.cloudinary.com/dnzrnfglq/image/upload/v1691152139/jsbft2cm7u4j1cmstygm.jpg",
    prixVente: 700000,
    visites: [],
    pro: {
      proid: "64cccc590fd39de6f4a550da",
    },
  };

  let proid = maVisite.prosId;
  // console.log("proid", proid);
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

  // Fetch du backend au chargement de la page pour récupérer les créneaux du jour
  useEffect((date) => {
    setTimeSlots(null);
    // setSelectedDate(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    // console.log("proid", proid);

    // console.log("dateformatee1", formattedDate);
    fetch(`http://${ipAdress}/disponibilites/dateSearch/${proid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dateOfVisit: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("retourdubackend", data);
        if (data.data) {
          generateTimeSlots(data.data);
        } else {
          console.log("impossible");
        }
      });
  }, []);

  let formattedDate;

  const handleDateSelect = (date) => {
    setTimeSlots(null);
    setSelectedDate(date);
    // console.log("date", date);
    formattedDate = moment(date).format("YYYY-MM-DD");
    // console.log("dateformatee2", formattedDate);
    fetch(`http://${ipAdress}/disponibilites/dateSearch/${proid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dateOfVisit: formattedDate }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("retourdubackend2", data)
        if (data.data) {
          generateTimeSlots(data.data);
        } else {
          console.log("impossible");
        }
      });
  };

  const generateTimeSlots = (availabilityData) => {
    const timeSlotsArray = [];

    availabilityData.forEach((data) => {
      const startTimeMoment = moment(data.startTimeDispo, "HH:mm");
      const endTimeMoment = moment(data.endTimeDispo, "HH:mm");

      while (startTimeMoment.isSameOrBefore(endTimeMoment)) {
        const startTime = startTimeMoment.format("HH:mm");
        const isException = data.Exception.some((exception) => {
          const exceptionDate = moment(exception.dateOfVisit).format(
            "YYYY-MM-DD"
          );
          if (exceptionDate === moment(formattedDate).format("YYYY-MM-DD")) {
            const exceptionStartTime = moment(
              exception.startTimeVisit,
              "HH:mm"
            );
            const exceptionEndTime = moment(exception.endTimeVisit, "HH:mm");
            return (
              startTimeMoment.isSameOrAfter(exceptionStartTime) &&
              startTimeMoment.isBefore(exceptionEndTime)
            );
          }
          return false;
        });

        if (!isException) {
          timeSlotsArray.push({ startTime });
        }

        startTimeMoment.add(30, "minutes");
      }
    });

    setTimeSlots(timeSlotsArray);
  };

  // console.log('test',selectedDate);

  let frenchDate = moment(selectedDate).format("DD/MM/YYYY");

  const handleModif = (e) => {
    const startTimeConvertit = e.split(":"); // Split hours and minutes
    const startTimeVisit = moment()
      .hours(startTimeConvertit[0])
      .minutes(startTimeConvertit[1]);
    const formatedStartTimeVisit = startTimeVisit.format("HH:mm");
    const duration = 30;
    let endTimeVisit = startTimeVisit.clone().add(duration, "minutes");
    const formatedendTimeVisit = endTimeVisit.format("HH:mm");
    console.log(formatedStartTimeVisit); // Output endTimeVisit in HH:mm format
    let prosId = maVisite.prosId;
    let userId = user._id;
    let bienImmoId = bienData._id.bienid;
    const dateDeVisite = moment(selectedDate).format("YYYY-MM-DD");
    console.log(formatedStartTimeVisit);

    const idVisite = maVisite._id;

    fetch(`http://${ipAdress}/visites/${idVisite}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // prosId: prosId,
        // usersId: userId,
        dateOfVisit: dateDeVisite,
        startTimeVisit: formatedStartTimeVisit,
        // endTimeVisit: formatedendTimeVisit,
        duration: duration,
        // bienImmoId: bienImmoId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("data récupéré : ", data.data);
          dispatch(maVisiteData(data.data));
          dispatch(refresh());
          navigation.navigate("TabNavigatorPro");
        }
      });
    if (user.dejaInscrit === "true") {
      navigation.goBack();
    }
  };

  //constante relative à la modale de changement de page
  const [modalModifOuverte, setModalModifOuverte] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  //fonction pour ouvrir la modale de changement de page
  const openModalModifOuverte = (data) => {
    setModalModifOuverte(!modalModifOuverte);
    setSelectedSlot(data);
  };

  //constante pour message de confirmation de rendez-vous dans la modale
  const [RdvModifié, setRdvModifié] = useState(false);

  //mise en place d'un useEffect pour gérer la fermeture de la modale de confirmation de rendez-vous
  useEffect(() => {
    if (RdvModifié) {
      setTimeout(() => {
        setRdvModifié(false);
        setModalModifOuverte(false); // Ferme la modale
      }, 1500);
    }
  }, [RdvModifié]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.background}
      >
        <View style={styles.localContainer}>
          <Text style={styles.label}>
            Choisissez votre date de visite souhaitée :
          </Text>
          <Calendar
            style={styles.calendar}
            markedDates={{
              [moment(selectedDate).format("YYYY-MM-DD")]: {
                selected: true,
                selectedColor: "#ffffff",
              },
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#47AFA5",
              textSectionTitleColor: "#ffffff",
              selectedDayBackgroundColor: "#ffffff",
              selectedDayTextColor: "#47AFA5",
              todayTextColor: "black",
              dayTextColor: "#2d4150",
              arrowColor: "#2d4150",
              disabledArrowColor: "#2d4150",
            }}
            onDayPress={(day) => handleDateSelect(new Date(day.dateString))}
          />
          <Text style={styles.label}>
            Créneaux de visites Disponibles pour le {frenchDate} :
          </Text>
          <View style={styles.displayCard1}>
            {timeSlots ? (
              timeSlots
                .sort((a, b) =>
                  moment(a.startTime, "HH:mm").diff(
                    moment(b.startTime, "HH:mm")
                  )
                )
                .map((timeSlot, index) => (
                  <View style={styles.displayCard}>
                    <TouchableOpacity
                      style={styles.Card}
                      onPress={() => {
                        setModalModifOuverte(true);
                        setSelectedSlot(timeSlot);
                        console.log("timeSlot", timeSlot);
                      }}
                    >
                      <Text key={index}>{timeSlot.startTime}</Text>
                    </TouchableOpacity>
                  </View>
                ))
            ) : (
              <Text>Pas de créneau de visite disponible à cette date</Text>
            )}
          </View>
        </View>
        <Modal
          style={styles.modalModifOuverte}
          visible={modalModifOuverte}
          animationType="fade"
          transparent
        >
          {/* <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
            <TouchableWithoutFeedback
              onPress={() => {
                openModalModifOuverte(selectedSlot);
              }}
              accessible={false}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalContainer}>
                  <View style={styles.inputsEtDelete}>
                    {RdvModifié ? (
                      <Text style={styles.textModaleConfirm}>
                        Rendez-vous confirmé ! ✅
                      </Text>
                    ) : (
                      <Text style={styles.inputs}>Confirmer ?</Text>
                    )}
                  </View>

                  {!RdvModifié && selectedSlot ? (
                    <Text style={styles.textButton}>
                      Voulez-vous confirmer ce rendez-vous du{" "}
                      {/* {formatDate(selectedSlot.dateOfVisit)} à{" "} */}
                      {/* {selectedSlot.startTimeVisit} pour le bien du{" "}
                      {selectedSlot.bienImmoId.numeroRue},{" "}
                      {selectedSlot.bienImmoId.rue} à{" "}
                      {selectedSlot.bienImmoId.codePostal} ? */}
                    {/* </Text>
                  ) : null}

                  <View style={styles.choixModal}>
                    {!RdvModifié && (
                      <TouchableOpacity
                        style={styles.btnModal}
                        onPress={() => {
                          setRdvModifié(true);
                          // handleModif(timeSlot.startTime);
                        }}
                      >
                        <FontAwesome name="check" size={30} color="#1F2937" />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.btnModal}
                      onPress={() => {
                        
                          setRdvModifié(false),
                          setSelectedSlot(null);
                      }}
                    >
                      {!RdvModifié ? (
                        <FontAwesome name="remove" size={30} color="#1F2937" />
                      ) : null}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView> */} 
        </Modal>
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
    marginTop: 20,
    color: "#2d4150",
  },
  calendar: {
    backgroundColor: "#47AFA5",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    paddingBottom: 15,
  },
  localContainer: {
    width: "90%",
    justifyContent: "center",
  },
  Card: {
    backgroundColor: "#47AFA5",
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
    color: "#2d4150",
  },
  displayCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  displayCard1: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalConfirmation: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  inputs: {
    fontSize: 25,
    fontWeight: "bold",
    margin: 5,
    marginBottom: 10,
  },
  choixModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  btnModal: {
    borderRadius: "50%",
    padding: 15,
    // margin: 10,
  },
  textModaleConfirm: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
