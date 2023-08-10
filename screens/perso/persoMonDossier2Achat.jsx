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
import { useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch, useSelector } from 'react-redux';
import {userDatas} from '../../reducers/user'
import moment from "moment"; 
import { ipAdress } from "../../immolibTools";



export default function PersoMonDossier2Achat({ navigation }) {

  const dispatch = useDispatch();
  //Gestion des inputs qui ne doivent recevoir que des nombres (alors que c'est un TextInput, donc il faut appliquer une Regex) :
  const [monBudget, setMonBudget] = useState(0);
  const [inputSurface, setInputSurface] = useState("");
  const [inputNbPiece, setInputNbPiece] = useState("");

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


  const [valueTypeBien, setValueTypeBien] = useState("maison");

  const optionsTypeBien = [
    { label: "Maison", value: "maison" },
    { label: "Appartement", value: "appartement" },
    { label: "Autre", value: "autre" },
  ];

  

  //navigation en cliquant sur "Etape suivante":
  const handleEtapeSuivante = () => {
    dispatch(userDatas({budgetMax : monBudget, typeBienAchat : valueTypeBien, minSurfaceAchat: inputSurface, minPieceAchat: inputNbPiece }))
    navigation.navigate("PersoMonDossier3Achat");
  };

  const handlePasserCetteEtape = () => {
    navigation.navigate('TabNavigatorPerso', { screen: 'Home' });
    
  };

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
            <View style={styles.pageNumber}>
              <Text>1/3</Text>
            </View>
            <View style={styles.pageNumberActive}>
              <Text>2/3</Text>
            </View>
            <View style={styles.pageNumber}>
              <Text>3/3</Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.lineContainer}>
              <Text style={styles.sousTitre}>Budget Maximum</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="/€"
                onChangeText={(value) => setMonBudget(value)}
                value={monBudget}
              ></TextInput>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.sousTitre}>Bien recherché</Text>
              <SwitchSelector
                options={optionsTypeBien}
                initial={0}
                onPress={(value) => setValueTypeBien(value)}
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
              <Text style={styles.sousTitre}>Surface minimum</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="9m²"
                onChangeText={handleSurfaceChange}
                value={inputSurface}
              ></TextInput>
            </View>
            <View style={styles.lineContainer}>
              <Text style={styles.sousTitre}>Nombre de pièces minimum</Text>
              <TextInput
                style={styles.input}
                keyboardType={"numeric"}
                placeholder="0"
                onChangeText={handleNbPieceChange}
                value={inputNbPiece}
              ></TextInput>
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
    marginTop: "5%",
  },

  nextBtnContainer: {
    flexDirection: "row",
    borderRadius: 10,
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 30,
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
  SwitchSelector3choix: {
    width: "100%",
  },

  sousTitre: {
    marginBottom: 10,
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
    flexDirection: "column",
    marginVertical: 15,
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
  texteBtn: {
    color: "white",
    fontSize: 15,
    letterSpacing: 1,
  },
  Title: {
    color: 'white',
    fontSize: 25,
    fontStyle: 'normal',
    fontWeight: '600', 
    letterSpacing: -1.5, 
    textAlign:'center',
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
});
