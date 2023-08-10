import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  SafeAreaView,
  CheckBox,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import SwitchSelector from "react-native-switch-selector";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDatas } from "../../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import moment from "moment";
import { ipAdress } from "../../immolibTools";


export default function PersoMonDossier3Achat({ navigation }) {
  

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const maVisite = useSelector((state) => state.maVisite.value);

  let selectedDate = `aujourd'hui`
  // formattage de la date afin d'avoir un affichage plus fluide
  if(maVisite.newVisit.dateOfVisit){
  selectedDate = maVisite.newVisit.dateOfVisit}
  let frenchDate = moment(selectedDate).format("DD/MM/YYYY");

  const handleBudgetChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, ""); // élimine tous les caractères non numériques
    setInputBudget(formattedText);
  };

  const handleSurfaceChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, ""); // élimine tous les caractères non numériques
    setInputSurface(formattedText);
  };

  const handleNbPieceChange = (text) => {
    const formattedText = text.replace(/[^0-9]/g, ""); // élimine tous les caractères non numériques
    setInputNbPiece(formattedText);
  };

  const UploadAccord = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: result.assets[0].uri,
      name: "PreAccord",
      type: "image/*",
    });
    fetch(`http://${ipAdress}/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setUploadPreAccord("ok");
        dispatch(userDatas({ banqueDoc: data.url }));
      });
  };

  //navigations en cliquant sur "Etape suivante", ou 1/3 et 2/3:
  const handleEtapeSuivante = () => {
    dispatch(
      userDatas({
        primo: valuePrimo,
        typeInvest: valueTypeInvest,
        financement: valueTypeFinancement,
        accordBanque: valuePreAccord,
      })
    );
    fetch(`http://${ipAdress}/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recherche: user.recherche,
        situation: user.situation,
        zone: user.zone,
        achat: {
          budgetMax: user.budgetMax,
          typeBienAchat: user.typeBienAchat,
          minSurfaceAchat: user.minSurfaceAchat,
          minPieceAchat: user.minPieceAchat,
          typeInvest: user.typeInvest,
          primo: valuePrimo,
          financement: valueTypeFinancement,
          accordBanque: valuePreAccord,
        },
        documents: {
          banqueDoc: user.banqueDoc,
        }
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    navigation.navigate("TabNavigatorPerso");
  };

  const handlePasserCetteEtape = () => {
    fetch(`http://${ipAdress}/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recherche: user.recherche,
        situation: user.situation,
        zone: user.zone,
        achat: {
          budgetMax: user.budgetMax,
          typeBienAchat: user.typeBienAchat,
          minSurfaceAchat: user.minSurfaceAchat,
          minPieceAchat: user.minPieceAchat,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    navigation.navigate("TabNavigatorPerso");
  };

  //mise en place des options pour les switchs selectors :
  const [valuePrimo, setValuePrimo] = useState(false);
  const [valueTypeInvest, setValueTypeInvest] = useState("principale");
  const [valueTypeFinancement, setValueTypeFinancement] =
    useState("pretbancaire");
  const [valuePreAccord, setValuePreAccord] = useState(false);
  const [UploadPreAccord, setUploadPreAccord] = useState("");

  //mise en place des options pour le switch selector du primo accédant :
  const optionsPrimo = [
    { label: "Non", value: false },
    { label: "Oui", value: true },
  ];

  //mise en place des options pour le switch selector du type d'investissement :
  const optionsTypeInvest = [
    { label: "Résidence principale", value: "principale" },
    { label: "Résidence secondaire", value: "secondaire" },
    { label: "Autre", value: "autre" },
  ];

  //mise en place des options pour le switch selector du type d'investissement :
  const optionsTypeFinancement = [
    { label: "Prêt bancaire", value: "pretbancaire" },
    { label: "Fonds propres", value: "fondspropres" },
    { label: "Prêt relais", value: "pretrelais" },
  ];

  //mise en place des options pour le switch selector du pré-accord bancaire  :
  const optionsPreAccord = [
    { label: "Non", value: false },
    { label: "Oui", value: true },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.smallTextContainer}>
            <Text>Je cherche à acheter</Text>
          </View>

          {/* {Il faudra ajouter ici le composant des visites} */}
          <View style={styles.lineCard}>
        <Text style={styles.Title}>Visite Enregistrée le :</Text>
        <Text style={styles.Title}> {frenchDate} à {maVisite.newVisit.startTimeVisit}</Text>
        </View>

          <Text style={styles.title}> Mon Dossier</Text>

          <View style={styles.pageContainer}>
            <TouchableOpacity
              // onPress={() => handlePage1()}
              style={styles.pageNumber}
            >
              <Text>1/3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() => handlePage2()}
              style={styles.pageNumber}
            >
              <Text>2/3</Text>
            </TouchableOpacity>
            <View style={styles.pageNumberActive}>
              <Text>3/3</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.lineContainer2choix}>
              <Text style={styles.sousTitre}>Primo accédant ?</Text>
              <SwitchSelector
                options={optionsPrimo}
                value={false}
                initial={0}
                onPress={(value) => setValuePrimo(value)}
                valuePadding={2.5}
                hasPadding
                buttonMargin={1.5}
                style={styles.SwitchSelector}
                buttonColor="#47AFA5"
                animationDuration={250}
                height={45}
              />
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.sousTitre}>Type d'investissement :</Text>
              <SwitchSelector
                options={optionsTypeInvest}
                initial={0}
                onPress={(value) => setValueTypeInvest(value)}
                valuePadding={2.5}
                hasPadding
                style={styles.SwitchSelector3choix}
                buttonColor="#47AFA5"
                buttonMargin={1.5}
                animationDuration={250}
                height={45}
              />
            </View>

            <View style={styles.lineContainer}>
              <Text style={styles.sousTitre}>Type de financement :</Text>
              <SwitchSelector
                options={optionsTypeFinancement}
                initial={0}
                onPress={(value) => setValueTypeFinancement(value)}
                valuePadding={2.5}
                hasPadding
                style={styles.SwitchSelector3choix}
                buttonColor="#47AFA5"
                buttonMargin={1.5}
                animationDuration={250}
                height={45}
              />
            </View>

            <View style={styles.lastLine}>
              <View style={styles.lastBloc}>
                <Text style={styles.sousTitre}>Pré-accord bancaire :</Text>
                <SwitchSelector
                  options={optionsPreAccord}
                  initial={0}
                  onPress={(value) => setValuePreAccord(value)}
                  valuePadding={2.5}
                  hasPadding
                  style={styles.SwitchSelector}
                  buttonColor="#47AFA5"
                  buttonMargin={1.5}
                  animationDuration={250}
                  height={45}
                />
              </View>
              {valuePreAccord ? (
                <View style={styles.lastBloc}>
                  <Text style={styles.sousTitre}>Chargé le document :</Text>
                  {UploadPreAccord === "ok" ? (
                    <FontAwesome name="check" size={30} color="green" />
                  ) : (
                    <TouchableOpacity onPress={UploadAccord}>
                      <FontAwesome
                        name="cloud-upload"
                        size={30}
                        color="#ffffff"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.nextBtnContainer}>
            <TouchableOpacity
              style={styles.skip}
              onPress={() => handlePasserCetteEtape()}
            >
              <Text>Passer cette étape</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.next}
              onPress={() => handleEtapeSuivante()}
            >
              <Text>Etape suivante</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "#e8be4b",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  textContainer: {
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  smallTextContainer: {
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 15,
    width: "60%",
    height: "4%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  title: {
    fontFamily: "Nunito",
    color: "white",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "600",
    marginTop: "7%",
  },

  pageNumberActive: {
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
  pageNumber: {
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

  pageContainer: {
    flexDirection: "row",
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    height: "4%",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: "5%",
  },

  nextBtnContainer: {
    flexDirection: "row",
    borderRadius: 10,
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 15,
    marginBottom: 50,
  },

  skip: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "60%",
    backgroundColor: "#47AFA5",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },

  next: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "60%",
    backgroundColor: "#47AFA5",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },

  formContainer: {
    width: "90%",
  },

  lineContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 15,
  },

  input: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 120,
    height: 40,
    textAlign: "center",
  },

  button: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 120,
    height: 40,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  choixBien: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },
  buttonSelected: {
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  SwitchSelector: {
    width: 120,
  },
  SwitchSelector3choix: {
    width: "100%",
  },
  sousTitre: {
    marginBottom: 10,
  },

  lastLine: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },

  lastBloc: {
    alignItems: "center",
  },
  lineCard: {
    alignItems:'center',
    justifyContent:'center',
    width: 370,
    height:70,
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
    marginBottom: 25,
    marginTop: 30,
  },
  Title: {
    color: 'white',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '600', 
    letterSpacing: -1.5, 
    textAlign:'center',
  },
});
