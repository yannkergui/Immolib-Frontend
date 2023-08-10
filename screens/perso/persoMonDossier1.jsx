import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { useState } from "react";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch, useSelector } from "react-redux";
import { userDatas } from "../../reducers/user";
import moment from "moment"; 
import { ipAdress } from "../../immolibTools";



export default function PersoMonDossier1({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const maVisite = useSelector((state) => state.maVisite.value);

  console.log(maVisite.newVisit.dateOfVisit);

    // formattage de la date afin d'avoir un affichage plus fluide

    let selectedDate = maVisite.newVisit.dateOfVisit
    let frenchDate = moment(selectedDate).format("DD/MM/YYYY");
 

  // les 2 etats mis à jour au clique sur le switch

  const [situationActuelle, setSituationActuelle] = useState("locataire");
  const [recherche, setRecherche] = useState("achat");
  const [zone, setZone] = useState("");

  // 2 constantes composants des switchs

  const SwitchSituation = [
    { label: "Locataire", value: "locataire" },
    { label: "Propriétaire", value: "proprietaire" },
    { label: "Hébergé", value: "heberge" },
  ];

  const SwitchRecherche = [
    { label: "Achat", value: "achat" },
    { label: "Location", value: "location" },
  ];

  const handleEtapeSuivante = () => {
    if (recherche === "achat") {
      navigation.navigate("PersoMonDossier2Achat");
    } else {
      navigation.navigate("PersoMonDossier2Loc");
    }
    dispatch(userDatas({recherche : recherche, situation : situationActuelle, zone : zone}));
  };

  // Boutton passer cette étape pour le moment, pour des sujet de mis à jour sur les creens suivants (a discuter)


  return (
    <View style={styles.container}>
      {/* Use LinearGradient as the container's background */}
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <View style={styles.pageContainer}>
          <View style={styles.pageNumberActive}>
            <Text>1/3</Text>
          </View>
          <View style={styles.pageNumber}>
            <Text>2/3</Text>
          </View>
          <View style={styles.pageNumber}>
            <Text>3/3</Text>
          </View>
        </View>
        <View style={styles.globalView}>
        <Text style={styles.title}>Mon Dossier</Text>
        <View style={styles.lineCard}>
        <Text style={styles.Title}>Visite Enregistrée le :</Text>
        <Text style={styles.Title}> {frenchDate} à {maVisite.newVisit.startTimeVisit}</Text>
        </View>
        </View>
        <View style={styles.globalView}>
        <Text style={styles.title}>Situation Actuelle</Text>
        <View style={styles.situationContainer}>
          <SwitchSelector
            options={SwitchSituation}
            initial={0}
            onPress={(value) => setSituationActuelle(value)}
            valuePadding={2.5}
            hasPadding
            style={styles.SwitchSelector}
            buttonColor="#47AFA5"
            buttonMargin={1.5}
            animationDuration={250}
            height={45}
          />
        </View>
        </View>
        <View style={styles.globalView}>
        <Text style={styles.title}>Ma zone de recherche</Text>
        <View style={styles.zoneDeRecherche}>
          <TextInput style={styles.input} placeholder="Ma Zone de recherche" onChangeText={(value) => setZone(value)}
            placeholderTextColor="white"  value={zone}></TextInput>  
        </View>
        <View style={styles.basdepage}>
        <Text style={styles.title2}>Je recherche</Text>
        <View style={styles.searchContainer}>
          <SwitchSelector
            options={SwitchRecherche}
            initial={0}
            onPress={(value) => setRecherche(value)}
            valuePadding={2.5}
            hasPadding
            style={styles.SwitchSelector}
            buttonColor="#47AFA5"
            buttonMargin={1.5}
            animationDuration={250}
            height={45}
          />
        </View>
        </View>
        </View>
        <View style={styles.nextBtnContainer}>
          <TouchableOpacity
            style={styles.next}
            onPress={(value) => handleEtapeSuivante(value)}
            >
            <Text>Etape suivante</Text>
          </TouchableOpacity>
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
    justifyContent: "flex-start",
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
    marginTop: 35,
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
  title: {
    fontFamily: "Nunito",
    color: "white",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "600",
    marginTop: "8%",
  },
  title2: {
    fontFamily: "Nunito",
    color: "white",
    fontSize: 30,
    fontStyle: "normal",
    fontWeight: "600",
  },

  textContainer: {
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },

  situationContainer: {
    width: "80%",
    marginTop: 15,
  },
  selector: {
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
  selectorActiv: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    height: "80%",
    backgroundColor: "#47AFA5",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
  },

  searchContainer: {
    flexDirection: "row",
    borderRadius: 10,
    width: "70%",
    height: "7%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 60,
  },

  nextBtnContainer: {
    flexDirection: "row",
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 60,
  },

  skip: {
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: "80%",
    backgroundColor: "transparent",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
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

  SwitchSelector: {
    width: "100%",
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
    marginBottom: 20,
    marginTop: 30,
  },
  zoneDeRecherche: {  
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.4)",
    backgroundColor: "rgba(128, 128, 128, 0.4)",
    width: "90%",
    height: 40,
    borderRadius: 10,
    top: 30,
    alignItems: "center",  
    justifyContent: "center",
    color: "white",
  },
  basdepage:{
    marginTop:50,
    justifyContent:'center',
    alignItems:'center',
  },
  globalView:{
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    width:250,
    justifyContent:'center',
    textAlign:'center',
    color:'white',
  }
});
