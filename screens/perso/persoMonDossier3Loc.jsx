import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as DocumentPicker from "expo-document-picker";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch, useSelector } from "react-redux";
import { userDatas } from "../../reducers/user";
import { ipAdress } from "../../immolibTools";

export default function PersoMonDossier3Loc({ navigation }) {
  

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  //Etat relatif au revenu renseigné 

  const [monRevenu, setMonRevenu] = useState(0);

  //3 Etats relatifs à la situation pro renseignée 

  const [situationAutre, setSituationAutre] = useState("");
  const [contrat, setContrat] = useState("cdi");

  const SwitchContrat = [
    { label: "CDI", value: "cdi" },
    { label: "CDD", value: "cdd" },
  ];

  const [idDoc, setIdDoc] = useState("");
  const [ficheDePaie1, setFicheDePaie1] = useState("");
  const [ficheDePaie2, setFicheDePaie2] = useState("");
  const [ficheDePaie3, setFicheDePaie3] = useState("");
  const [avisImpot, setAvisImpot] = useState("");
  const [bilan, setBilan] = useState("");
  const [Autre, setAutre] = useState("");

  // fonction relative à l'upload des fichiers au clique sur l'icone

  // const UploadPhoto= async (nomDuFichier, setEtat) => {
  //   const result = await DocumentPicker.getDocumentAsync({
  //     type: "image/*",
  //   });
  //   const formData = new FormData();

  //   formData.append("photoFromFront", {
  //     uri: result.assets[0].uri,
  //     name: nomDuFichier,
  //     type: "image/*",
  //   });

  //   fetch(`http://${myIPAdress}:3000/users/upload`, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setEtat("ok");
  //       dispatch(userDatas({ [nomDuFichier]: data.url }));
  //     });
  // };



  const UploadDocId = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: result.assets[0].uri,
      name: "idDoc",
      type: "image/*",
    });
    fetch(`http://${ipAdress}/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setIdDoc("ok");
        dispatch(userDatas({ idDoc: data.url }));
      });
  };

  const UploadFicheDePaie1 = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: result.assets[0].uri,
      name: "salaire1",
      type: "image/*",
    });
    fetch(`http://${myIPAdress}:3000/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setFicheDePaie1("ok");
        dispatch(userDatas({ salaire1: data.url }));
      });
  };

  const UploadFicheDePaie2 = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: result.assets[0].uri,
      name: "salaire2",
      type: "image/*",
    });
    fetch(`http://${myIPAdress}:3000/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setFicheDePaie2("ok");
        dispatch(userDatas({ salaire2: data.url }));
      });
  };

  const UploadFicheDePaie3 = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: result.assets[0].uri,
      name: "salaire3",
      type: "image/*",
    });
    fetch(`http://${myIPAdress}:3000/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setFicheDePaie3("ok");
        dispatch(userDatas({ salaire3: data.url }));
      });
  };

  const UploadAvisImpot = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: result.assets[0].uri,
      name: "AvisImpot",
      type: "image/*",
    });
    fetch(`http://${myIPAdress}:3000/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAvisImpot("ok");
        dispatch(userDatas({ impots: data.url }));
      });
  };

  const UploadBilan = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: result.assets[0].uri,
      name: "AvisImpot",
      type: "image/*",
    });
    fetch(`http://${myIPAdress}:3000/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setBilan("ok");
        dispatch(userDatas({ bilan: data.url }));
      });
  };

  const UploadAutre = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: result.assets[0].uri,
      name: "AvisImpot",
      type: "image/*",
    });
    fetch(`http://${ipAdress}/users/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setAutre("ok");
        dispatch(userDatas({ autres: data.url }));
      });
  };

  const handleEtapeSuivante = () => {
    dispatch(userDatas({ salaire: monRevenu, contrat: contrat }));
    fetch(`http://${ipAdress}/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recherche: user.recherche,
        situation: user.situation,
        salaire: monRevenu,
        contrat: contrat,
        location: {
          budgetMois: user.budgetMois,
          typeBienLoc: user.typeBienLoc,
          minSurfaceLoc: user.minSurfaceLoc,
          minPieceLoc: user.minPieceLoc,
          nbLoc: user.nbLocataire,
          meuble: user.meuble,
        },
        documents: {
          salaire1: user.salaire1,
          salaire2: user.salaire2,
          salaire3: user.salaire3,
          impots: user.impots,
          bilan: user.bilan,
          autres: user.autres,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {});
    navigation.navigate("TabNavigatorPerso");
  };

  const handlePasserCetteEtape = () => {
    fetch(`http://${ipAdress}/users/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recherche: user.recherche,
        situation: user.situation,
        location: {
          budgetMois: user.budgetMois,
          typeBienLoc: user.typeBienLoc,
          minSurfaceLoc: user.minSurfaceLoc,
          minPieceLoc: user.minPieceLoc,
          nbLoc: user.nbLocataire,
          meuble: user.meuble,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {});
    navigation.navigate("TabNavigatorPerso");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <View style={styles.smallTextContainer}>
          <Text>Je cherche une location</Text>
        </View>
        <View style={styles.textContainer}>
          <Text>15/03/2023 à 17h</Text>
          <Text>66 rue Victor Hugo, 75001 Paris</Text>
        </View>
        
        <Text style={styles.title}>Mon Dossier</Text>
        <View style={styles.pageContainer}>
          <View style={styles.pageNumber}>
            <Text>1/3</Text>
          </View>
          <View style={styles.pageNumber}>
            <Text>2/3</Text>
          </View>
          <View style={styles.pageNumberActive}>
            <Text>3/3</Text>
          </View>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.lineContainer}>
            <Text>Revenus mensuels</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="/€"
              onChangeText={(value) => setMonRevenu(value)}
              value={monRevenu}
            ></TextInput>
          </View>
          <View style={styles.lineContainer}>
            <Text>Situation Pro</Text>
            <SwitchSelector
              options={SwitchContrat}
              initial={0}
              onPress={(value) => setContrat(value)}
              valuePadding={2.5}
              hasPadding
              style={styles.SwitchSelector}
              buttonColor="#47AFA5"
              buttonMargin={1.5}
              animationDuration={250}
              height={45}
            />
          </View>
          <View style={styles.lineContainer}>
            <Text>Je charge mes documents</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text>Pièce d'identité</Text>
            {idDoc !== "" ? (
              <FontAwesome name="check" size={30} color="green" />
            ) : (
              ""
            )}
            <TouchableOpacity onPress={UploadDocId}>
              <FontAwesome name="cloud-upload" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.lineContainer}>
            <Text>Fiche de paie 1</Text>
            {ficheDePaie1 !== "" ? (
              <FontAwesome name="check" size={30} color="green" />
            ) : (
              ""
            )}
            <TouchableOpacity onPress={UploadFicheDePaie1}>
              <FontAwesome name="cloud-upload" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineContainer}>
            <Text>Fiche de paie 2</Text>
            {ficheDePaie2 !== "" ? (
              <FontAwesome name="check" size={30} color="green" />
            ) : (
              ""
            )}
            <TouchableOpacity onPress={UploadFicheDePaie2}>
              <FontAwesome name="cloud-upload" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineContainer}>
            <Text>Fiche de paie 3</Text>
            {ficheDePaie3 !== "" ? (
              <FontAwesome name="check" size={30} color="green" />
            ) : (
              ""
            )}
            <TouchableOpacity onPress={UploadFicheDePaie3}>
              <FontAwesome name="cloud-upload" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineContainer}>
            <Text>Dernier avis d'imposition</Text>
            {avisImpot !== "" ? (
              <FontAwesome name="check" size={30} color="green" />
            ) : (
              ""
            )}
            <TouchableOpacity onPress={UploadAvisImpot}>
              <FontAwesome name="cloud-upload" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineContainer}>
            <Text>Bilans</Text>
            {bilan !== "" ? (
              <FontAwesome name="check" size={30} color="green" />
            ) : (
              ""
            )}
            <TouchableOpacity onPress={UploadBilan}>
              <FontAwesome name="cloud-upload" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineContainer}>
            <Text>Autre document</Text>
            {Autre !== "" ? (
              <FontAwesome name="check" size={30} color="green" />
            ) : (
              ""
            )}
            <TouchableOpacity onPress={UploadAutre}>
              <FontAwesome name="cloud-upload" size={30} color="#ffffff" />
            </TouchableOpacity>
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

  textContainer: {
    borderColor: "#47AFA5",
    borderWidth: 2,
    borderRadius: 15,
    width: "80%",
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
    marginTop: 10,
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
    height: "80%",
    backgroundColor: "#47AFA5",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
  },

  formContainer: {
    width: "90%",
  },

  lineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  button: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    width: 60,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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
    width: "50%",
  },

  nextBtnContainer: {
    flexDirection: "row",
    borderRadius: 10,
    width: "80%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
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
    height: "80%",
    backgroundColor: "#47AFA5",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 3,
  },
});
