import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";
import * as DocumentPicker from "expo-document-picker";
import { ipAdress } from "../../immolibTools";
import { refresh } from "../../reducers/refresher";
import { useDispatch, useSelector } from "react-redux";


export default function CreationAnnonce( {navigation} ) { 
  
  const dispatch = useDispatch();
  const pro = useSelector((state) => state.pro.value);
  

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [typeDeBien, setTypeDeBien] = useState("maison");
  const [bienMeuble, setBienMeuble] = useState(true);
  const [surface, setSurface] = useState(0);
  const [nbPiece, setNbPiece] = useState(0);
  const [nbChambre, setNbChambre] = useState(0);
  const [transaction, setTransaction] = useState("vente");
  const [numeroRue, setNumeroRue] = useState(0);
  const [nomRue, setNomRue] = useState("");
  const [codePostal, setCodePostal] = useState(0);
  const [ville, setVille] = useState("");
  const [loyer, setLoyer] = useState(0);
  const [prixVente, setPrixVente] = useState(0);
  const [photo, setPhoto] = useState("");

  const typeDeBienValue = [
    { label: "Maison", value: "maison" },
    { label: "Appartement", value: "appartement" },
    { label: "autre", value: "autre" },
  ];

  const BienMeubleValue = [
    { label: "Oui", value: true },
    { label: "Non", value: false },
  ];

  const transactionValue = [
    { label: "Vente", value: "vente" },
    { label: "Location", value: "location" },
  ];

  const UploadPhoto = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: result.assets[0].uri,
      name: "PreAccord",
      type: "image/*",
    });
    fetch(`http://${ipAdress}/biens/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setPhoto(data.url);
      });
  };

  const PublierAnnonce = async () => {
    fetch(`http://${ipAdress}/biens/newBien`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre: titre,
        description: description,
        type: typeDeBien,
        meuble: bienMeuble,
        surface: surface,
        nbPièces: nbPiece,
        nbChambres: nbChambre,
        transaction: transaction,
        numeroRue: numeroRue,
        rue: nomRue,
        codePostal: codePostal,
        ville: ville,
        loyerMensuel: loyer,
        prixVente: prixVente,
        photo: photo,
        pro: pro._id,
      }),
      
    })
  .then((response) => response.json())
      .then((data) => {
        dispatch(refresh())
        navigation.navigate("Mes annonces");
      });
    
  };


 
  

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={Platform.OS==='ios' ? 70 : 300}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => {navigation.goBack()}}>
            <FontAwesome
              style={styles.icon}
              name="chevron-left"
              size={20}
              color="#1F2937"
              right={60}
            />
          </TouchableOpacity>
          <Text style={styles.Title}>Mon Annonce</Text>
          
        </View>
        <ScrollView style={styles.formContainer}>
          <View style={styles.lineCard}>
            <Text> Titre de l'annonce : </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setTitre(value)}
              value={titre}
            ></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Description du bien : </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setDescription(value)}
              value={description}
            ></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Type de bien : </Text>
            <SwitchSelector
              options={typeDeBienValue}
              initial={0}
              onPress={(value) => setTypeDeBien(value)}
              valuePadding={2.5}
              hasPadding
              style={styles.SwitchSelector}
              buttonColor="#47AFA5"
              buttonMargin={1.5}
              animationDuration={150}
              height={45}
            />
          </View>
          <View style={styles.lineCard}>
            <Text> Type de transaction : </Text>
            <SwitchSelector
              options={transactionValue}
              initial={0}
              onPress={(value) => setTransaction(value)}
              valuePadding={2.5}
              hasPadding
              style={styles.SwitchSelector2}
              buttonColor="#47AFA5"
              buttonMargin={1.5}
              animationDuration={150}
              height={45}
            />
          </View>
          <View style={styles.lineCard}>
            <Text> Bien meublé : </Text>
            <SwitchSelector
              options={BienMeubleValue}
              initial={0}
              onPress={(value) => setBienMeuble(value)}
              valuePadding={2.5}
              hasPadding
              style={styles.SwitchSelector2}
              buttonColor="#47AFA5"
              buttonMargin={1.5}
              animationDuration={150}
              height={45}
            />
          </View>
          {transaction === "location" ? (
            <View style={styles.lineCard}>
              <Text> Loyer : </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(value) => setLoyer(value)}
                value={loyer}
              />
            </View>
          ) : (
            <View style={styles.lineCard}>
              <Text> Prix de vente : </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(value) => setPrixVente(value)}
                value={prixVente}
              />
            </View>
          )}
          <View style={styles.lineCard}>
            <Text> Nombre de pièces : </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(value) => setNbPiece(value)}
              value={nbPiece}
            ></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Nombre de chambres : </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(value) => setNbChambre(value)}
              value={nbChambre}
            ></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> surface : </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(value) => setSurface(value)}
              value={surface}
            ></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Numéro de rue du bien : </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(value) => setNumeroRue(value)}
              value={numeroRue}
            ></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Nom de la rue du bien : </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setNomRue(value)}
              value={nomRue}
            ></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Ville : </Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setVille(value)}
              value={ville}
            ></TextInput>
          </View>
          <View style={styles.lineCard}>
            <Text> Code Postal : </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(value) => setCodePostal(value)}
              value={codePostal}
            ></TextInput>
          </View>

          <View style={styles.lineCard}>
            <Text> Je charge mes photos : </Text>
            <TouchableOpacity onPress={UploadPhoto}>
              <FontAwesome name="cloud-upload" size={30} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.lastLineCard}>
            <TouchableOpacity style={styles.next} onPress={PublierAnnonce}>
              <Text> Je publie mon annonce </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
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
    alignItems: "center",
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
    fontFamily: "Nunitobold",
    color: "white",
    fontSize: 35,
    fontStyle: "normal",
    fontWeight: "600",
    letterSpacing: -1.5,
    textAlign: "center",
  },
  lineCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  lastLineCard: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 70,
  },

  formContainer: {
    width: "100%",
    height: "100%",
    top: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.2)",
    backgroundColor: "rgba(128, 128, 128, 0.2)",
    width: "50%",
    borderRadius: 10,
  },

  next: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 30,
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
    width: "75%",
  },
  SwitchSelector2: {
    width: "50%",
  },
});
