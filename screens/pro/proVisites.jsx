import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  LayoutAnimation,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";
import { maVisiteData } from "../../reducers/maVisite";
import { proDatas } from "../../reducers/pro";

export default function ProVisites({ navigation }) {

  // constante relative à la connexion du pro
  const pro = useSelector((state) => state.pro.value);

  console.log("pro dans proVisites", pro);

  // etat pour stocker les infos reçues du backend
  const [visitesPro, setVisitesPro] = useState([]);

  // etat pour rafraichir la page après la validation de la visite
  const [refresher, setRefresher] = useState(false);

  //création d'un useEffect pour récupérer les visites d'un pro
  useEffect(() => {
    fetch(
      `http://192.168.10.147:3000/visites/pro/${pro.token}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data du 1er useEffect", data.visitesTrouvees);
        setVisitesPro(data.visitesTrouvees);
      });
  }, [refresher]);
  // constante relative au switch de changement de page
  const page = [
    { label: "En attente de validation", value: "en attente" },
    { label: "A venir", value: "aVenir" },
  ];
  // Etat relatif au changement de page via le switch
  const [activPage, setActivePage] = useState("en attente");

  //constante relative à la modale de changement de page
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [selectedVisite, setSelectedVisite] = useState(null);

  //fonction pour ouvrir la modale de changement de page
  const openModalConfirmation = (data) => {
    setModalConfirmation(!modalConfirmation);
    setSelectedVisite(data);
  };

  //constante pour message de confirmation de rendez-vous dans la modale
  const [RdvConfirmé, setRdvConfirmé] = useState(false);

  //mise en place d'un useEffect pour gérer la fermeture de la modale de confirmation de rendez-vous
  useEffect(() => {
    if (RdvConfirmé) {
      setTimeout(() => {
        setRdvConfirmé(false);
        setModalConfirmation(false); // Ferme la modale
      }, 1500);
    }
  }, [RdvConfirmé]);

  //création d'une fonction pour confirmer une visite en attente

  const confirmVisite = (id) => {
    fetch(`http://192.168.10.147:3000/visites/statut/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        statut: "confirmé",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data);
        // setVisitesPro(visitesPro.filter((visite) => visite._id !== id));
        setRdvConfirmé(true);
        setRefresher(!refresher);
        setSelectedVisite(null);
      });
  };

  //constante pour limiter la longueur du titre du bien
  const titreBien = (titre) => {
    if (titre.length > 25) {
      return titre.substring(0, 25) + "...";
    } else {
      return titre;
    }
  };

  //constante pour formatter la date de la visite en français
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "fr-FR",
      options
    );
    return formattedDate;
  };

  //const pour stocker dans le reducer la visite sélectionnée
  const dispatch = useDispatch();
  const visiteSelected = (data) => {
    dispatch(maVisiteData(data));
    console.log("data", data);
  };

  const visiteEnAttente = visitesPro.map((data) => {
    // console.log("data visites en attente", data);
    if (data.statut === "en attente") {
      return (
        <View key={data._id} style={styles.visiteCard}>
          <View style={styles.lineCard}>
            <Text>
              {" "}
              Le {formatDate(data.dateOfVisit)} à {data.startTimeVisit}{" "}
            </Text>
            <TouchableOpacity
              onPress={() => {
                visiteSelected(data);
                navigation.navigate("ProPriseDeVisite");
              }}
            >
              <FontAwesome name="edit" size={30} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineCard}>
            <View style={styles.descriptionCard}>
              <Text>
                {titreBien(data.bienImmoId.titre)} {""}
              </Text>
              <Text>
                {data.bienImmoId.numeroRue}, {data.bienImmoId.rue}{" "}
                {data.bienImmoId.codePostal}
                {""} {data.bienImmoId.ville}
              </Text>
            </View>
            <TouchableOpacity onPress={() => openModalConfirmation(data)}>
              <FontAwesome name="check" size={30} color="green" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="remove" size={30} color="red" />
            </TouchableOpacity>
            <Modal
              style={styles.modalConfirmation}
              visible={modalConfirmation}
              animationType="fade"
              transparent
            >
              <KeyboardAvoidingView
                behavior={"padding"}
                style={styles.container}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    openModalConfirmation(), setSelectedVisite(null);
                  }}
                  accessible={false}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                      <View style={styles.inputsEtDelete}>
                        {RdvConfirmé ? (
                          <Text style={styles.textModaleConfirm}>
                            Rendez-vous confirmé ! ✅
                          </Text>
                        ) : (
                          <Text style={styles.inputs}>Confirmer ?</Text>
                        )}
                      </View>

                      {!RdvConfirmé && selectedVisite ? (
                        <Text style={styles.textButton}>
                          Voulez-vous confirmer ce rendez-vous du{" "}
                          {formatDate(selectedVisite.dateOfVisit)} à{" "}
                          {selectedVisite.startTimeVisit} pour le bien du{" "}
                          {selectedVisite.bienImmoId.numeroRue},{" "}
                          {selectedVisite.bienImmoId.rue} à{" "}
                          {selectedVisite.bienImmoId.codePostal} ?
                        </Text>
                      ) : null}

                      <View style={styles.choixModal}>
                        {!RdvConfirmé && (
                          <TouchableOpacity
                            style={styles.btnModal}
                            onPress={() => {
                              setRdvConfirmé(true);
                              confirmVisite(selectedVisite._id); // Appeler la fonction de confirmation
                            }}
                          >
                            <FontAwesome
                              name="check"
                              size={30}
                              color="#1F2937"
                            />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          style={styles.btnModal}
                          onPress={() => {
                            openModalConfirmation(),
                              setRdvConfirmé(false),
                              setSelectedVisite(null);
                          }}
                        >
                          {!RdvConfirmé ? (
                            <FontAwesome
                              name="remove"
                              size={30}
                              color="#1F2937"
                            />
                          ) : null}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </Modal>
          </View>
        </View>
      );
    }
  });

  // 2iem map relatif aux visites passées

  const visiteAVenir = visitesPro.map((data) => {
    // console.log("datavisites à venir", data);

    if (data.statut === "confirmé") {
      return (
        <View key={data._id} style={styles.visiteCard}>
          <View style={styles.lineCard}>
            <Text>
              {" "}
              Le {formatDate(data.dateOfVisit)} à {data.startTimeVisit}{" "}
            </Text>
            <TouchableOpacity>
              <FontAwesome name="edit" size={30} color="#1F2937" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineCard}>
            <View style={styles.descriptionCard}>
              <Text>
                {titreBien(data.bienImmoId.titre)} {""}
              </Text>
              <Text>
                {data.bienImmoId.numeroRue}, {data.bienImmoId.rue}{" "}
                {data.bienImmoId.codePostal}
                {""} {data.bienImmoId.ville}
              </Text>
            </View>
            <TouchableOpacity>
              <FontAwesome name="remove" size={30} color="#1F2937" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.Title}>Mes Visites</Text>
          <TouchableOpacity
            style={styles.iconcontainer}
            onPress={() => navigation.navigate("ProPreferences")}
          >
            <FontAwesome
              style={styles.icon}
              name="user"
              size={30}
              color="#1F2937"
            />
          </TouchableOpacity>
        </View>
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
        <StatusBar style="auto" />
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          vertical={true}
          bounces={false}
        >
          <View style={styles.cardContainer}>
            {activPage === "en attente" && visiteEnAttente}
            {activPage === "aVenir" && visiteAVenir}
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

  header: {
    flexDirection: "row",
    width: "100%",
    top: 40,
    alignItems: "center", // Center the content horizontally
    justifyContent: "center",
  },
  iconcontainer: {
    position: "absolute",
    left: 330,
    top: 0,
    backgroundColor: "white",
    width: 50,
    height: 50,
    paddingLeft: 15,
    paddingTop: 8.5,
    borderRadius: 100,
  },

  Title: {
    // fontFamily: "Nunitobold",
    color: "white",
    fontSize: 35,
    fontStyle: "normal",
    fontWeight: "600",
    letterSpacing: -1.5,
    textAlign: "center",
  },

  pageContainer: {
    flexDirection: "row",
    borderColor: "#47AFA5",
    width: "90%",
    height: "10%",
    marginTop: 60,
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

  cardContainer: {
    width: "100%",
    alignItems: "center",
    scrollable: true,
  },

  visiteCard: {
    justifyContent: "space-between",
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  SwitchSelector3choix: {
    width: "100%",
  },
  descriptionCard: {
    flexDirection: "column",

    justifyContent: "space-between",
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
