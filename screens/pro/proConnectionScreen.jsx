import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView,Image, ScrollView, Keyboard, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import {proDatas} from '../../reducers/pro';

import { inseeJeton, ipAdress } from "../../immolibTools";

export default function ProConnectionScreen({navigation}) {

   //Etats pour récupérer les inputs utilisateur
   const [email, setEmail]=useState('');
   const [motDePasse, setMotDePasse]=useState('');
   const [prenom, setPrenom]=useState('');
   const [nom, setNom]=useState('');
   const [tel, setTel]=useState('');
   const [siret, setSiret]=useState("");
   console.log(siret);

  // Etats pour gérer les erreurs d'INSCRIPTION seulement
  const [siretError, setSiretError] = useState(false);
  const [existingEmail, setExistingEmail] = useState (false);

   // Etats pour gérer les erreurs de CONNEXION seulement
   const [invalidInfos, setInvalidInfos] = useState(false);

  // Etats pour gérer les erreurs DANS LES DEUX CAS (formats de saisie ou champs vides)
  const [emailError, setEmailError] = useState(false);
  const [telError, setTelError] = useState(false);
  const [errorEmpty, setErrorEmpty] = useState(false);

  // Etats pour création des modales de connexion et d'inscription  
  const [modalConnexion, setModalConnexion]=useState(false);
  const [modalInscription, setModalInscription]=useState(false);

  const dispatch = useDispatch();

  // Premier bouton "Se connecter" qui ouvre la modale
  const handleConnexion = () => {
    setModalConnexion(true);
  }

  // 2eme boutton "Se connecter" qui redirige vers la homePage
  const handleConnexionBis = () => {
    if (!email||!motDePasse) {
      setEmailError(false)
      setErrorEmpty(true)
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true)
      setErrorEmpty(false)
    }   
    // Si correspondance avec la REGEX EMAIL
    if (EMAIL_REGEX.test(email) && motDePasse) {
      //Récupération des données de l'utilisateur de la BDD
      fetch(`http://${ipAdress}/pros/signin`, {
        method : 'POST',
        headers : {'Content-Type' : 'application/json'},
        body : JSON.stringify({email : email, motDePasse: motDePasse})
      })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          let { _id, prenom, nom, email, tel, motDePasse, token, photo } = data.pro
          let {denomination, siren, siret, dateCreation, adresse} = data.pro.agence
          // console.log('data récupéré : ', data),
          dispatch(proDatas(
            { _id, prenom, nom, email, tel, motDePasse, token, photo,
              agence : {
                denomination,
                siren,
                siret,
                dateCreation,
                adresse,
              }
            }
          ));
          setModalConnexion(false);
          navigation.navigate("TabNavigatorPro");
          setEmail('');
          setMotDePasse('')
          setEmailError(false);
          setInvalidInfos(false);
        } else {
          setInvalidInfos(true)
          setEmailError(false)
          setErrorEmpty(false)
        }
      })  
    } 
  }

  // Premier bouton "S'inscrire" qui ouvre la modale
  const handleInscription = () => {
    setModalInscription(true);
  }


//désactivation du regex réel pour les tests /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_REGEX = /[a-z]/
//désactivation du regex réel pour les tests /^(?:(?:(?:\+|00)33\s?|0)[0-9]\s?\d{8})$/
 const TEL_REGEX = /[0-9]{1}/
//désactivation du regex réel pour les tests /\d{14}/g
 const SIRET_REGEX = /\d{1}/g


  const handleInscriptionBis = async () => {

    console.log("mail", EMAIL_REGEX.test(email));
    console.log("tel", TEL_REGEX.test(tel));
    console.log("siret", SIRET_REGEX.test(siret));

    if (!prenom || !nom || !motDePasse) {
      setErrorEmpty(true) 
      return
    }

    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true)
      return
    }

    if (!TEL_REGEX.test(tel)) {
      setTelError(true)
      return
    }

    // !!!!!!!!!! Problème avec le vrai REGEX à 14 chiffres 
    if (!SIRET_REGEX.test(siret)) {
      setSiretError(true)
      return
    }
      
    // Requete vers l'API INSEE

    const response1 = await fetch(`https://api.insee.fr/entreprises/sirene/V3/siret/${parseInt(siret)}`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${inseeJeton}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
    });

    const data1 = await response1.json();
    const adrInsee = await data1.etablissement.adresseEtablissement
    
    console.log(adrInsee);

    if (data1.header.message === "ok") {

      // Requete vers la bdd pour création du nouveau pro :

      const response2 = await fetch(`http://${ipAdress}/pros/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siret: data1.etablissement.siret,
          prenom: prenom,
          nom: nom,
          email: email,
          motDePasse: motDePasse,
          tel: tel,
          denomination: data1.etablissement.uniteLegale.denominationUniteLegale,
          siren: data1.etablissement.siren,
          dateCreation: data1.etablissement.dateCreationEtablissement,
          adresse: `${adrInsee.numeroVoieEtablissement}${adrInsee.indiceRepetitionEtablissement ? adrInsee.indiceRepetitionEtablissement : '' }, ${adrInsee.typeVoieEtablissement} ${adrInsee.libelleVoieEtablissement}, ${adrInsee.codePostalEtablissement} ${adrInsee.libelleCommuneEtablissement}`
        })
      });

      const data2 = await response2.json();
        
      if (data2.result) { 

        // !!!!!! Destructuration, PROBLEME !!!!!!!!!
        // let { prenom, nom, email, tel, motDePasse, token } = data2.newPro;
        // let { denomination, siren, siret, dateCreation, adresse } = data2.newPro.agence;

        // Mise à jour du reducer avec les données reçues depuis la base de données

        dispatch(
          proDatas(
              {
                prenom : data2.newPro.prenom,
                nom: data2.newPro.nom,
                email: data2.newPro.email,
                tel: data2.newPro.tel,
                motDePasse: data2.newPro.motDePasse,
                token: data2.newPro.token,
                denomination : data2.newPro.agence.denomination,
                siren: data2.newPro.agence.siren,
                siret: data2.newPro.agence.siret,
                dateCreation: data2.newPro.agence.dateCreation,
                adresse: data2.newPro.agence.adresse,
              }
          )
        );

        // Nettoyage écran et vidange des états

        setModalInscription(false);

        setEmailError(false);
        setTelError(false);
        setSiretError(false);
        setErrorEmpty(false);

        setSiret('');
        setPrenom('');
        setNom('');
        setEmail('');
        setMotDePasse('');
        setTel('');

        // !!!!!!! Passage à l'écran ProPreferences PROBLEME !!!!!!!!!

        navigation.navigate("ProPreferences");

      }
      if (data2.error==="User already exists") {
        setExistingEmail(true)
      }
    }                
  }


  const closeModal = () => {
    setModalConnexion(false);
    setModalInscription(false);
    setEmail('');
    setPrenom('');
    setNom('');
    setSiret('');
    setMotDePasse('');
    setInvalidInfos(false);
    setEmailError(false);
    setTelError(false)
    setErrorEmpty(false);
    setSiretError(false);
    setExistingEmail(false);
    setTel('');
  }

  return (
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.background}
      >    
          <View style={styles.container}> 

              <Image style={styles.image} source={require('../../assets/IMMOLIB.png')} /> 
              <Text style={styles.text}>PROFESSIONNELS</Text>        
              <Text style={styles.text}>Programme tes visites et gère tes clients en toute simplicité</Text>    

              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={()=>handleConnexion()}>
                    <Text style={styles.textButton}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>handleInscription()}>
                    <Text style={styles.textButton}>S'inscrire</Text>
                </TouchableOpacity>
              </View>
            {/* <StatusBar style="auto" /> */}
          </View>

          <Modal style={styles.modalConnect} visible={modalConnexion} animationType="fade" transparent>
                  <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.centeredView}>                  
                            <View style={styles.modalContainer}>
                              <View style={styles.inputsEtDelete}>
                                <View style={styles.inputs}>
                                      <TextInput placeholder="Email" style={emailError ? styles.errorInput : styles.inputModal} keyboardType={"email-address"} autoCorrect={false} autoComplete={"email"} autoCapitalize={'none'} onChangeText={(value) => setEmail(value)} value={email}/>
                                      {emailError && <Text style={styles.error}>Format de l'adresse email invalide</Text>}
                                      <TextInput placeholder="Mot de passe" secureTextEntry={true} selectionColor={"red"} style={styles.inputModal} autoCapitalize={'none'} autoCorrect={false} onChangeText={(value) => setMotDePasse(value)} value={motDePasse}/>        
                                </View>
                                <View style={styles.deleteModal}>
                                      <TouchableOpacity style={styles.btnDeleteModal} onPress={()=>closeModal()}>
                                          <Text style={styles.textDelete}>X</Text>
                                      </TouchableOpacity>
                                </View>
                              </View>
                                <TouchableOpacity style={styles.btnSeConnecter} onPress={()=>handleConnexionBis()}>
                                  <Text style={styles.textButton}>Se connecter</Text>
                                </TouchableOpacity>
                                    {errorEmpty && <Text style={styles.error}>Tous les champs ne sont pas complétés</Text>} 
                                    {invalidInfos && <Text style={styles.error}>Adresse email ou mot de passe incorrects</Text>}   
                            </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
          </Modal>  

          <Modal style={styles.modalInscription} visible={modalInscription} animationType="fade" transparent>
            <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                      <View style={styles.inputsEtDelete}>
                        <View style={styles.inputs}>
                            <TextInput placeholder="n° Siret" style={styles.inputModal} keyboardType={"numeric"} onChangeText={(value) => setSiret(value)} value={siret}/>
                            {siretError && <Text style={styles.error}>Numéro de Siret invalide</Text>}
                            <TextInput placeholder="Prénom" style={styles.inputModal} autoComplete={"given-name"} onChangeText={(value) => setPrenom(value)} value={prenom}/>
                            <TextInput placeholder="Nom" style={styles.inputModal} autoComplete={"family-name"} onChangeText={(value) => setNom(value)} value={nom}/>
                            <TextInput placeholder="Email" style={styles.inputModal} keyboardType={"email-address"} autoCorrect={false} autoComplete={"email"} autoCapitalize={'none'} onChangeText={(value) => setEmail(value)} value={email}/>
                            {emailError && <Text style={styles.error}>Adresse email invalide</Text>} 
                            <TextInput placeholder="Mot de passe" style={styles.inputModal} selectionColor={"red"} secureTextEntry={true} autoCapitalize={'none'} autoCorrect={false} onChangeText={(value) => setMotDePasse(value)} value={motDePasse}/> 
                            <TextInput placeholder="Numéro de téléphone" style={styles.inputModal} keyboardType={"phone-pad"} onChangeText={(value) => setTel(value)} value={tel}/>           
                            {telError && <Text style={styles.error}>Numéro de téléphone invalide</Text>}
                        </View>
                        <View style={styles.deleteModal}>
                            <TouchableOpacity  onPress={()=>closeModal()}>
                                <Text style={styles.textDelete}>X</Text>
                            </TouchableOpacity>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.btnInscription} onPress={()=>handleInscriptionBis()}>
                            <Text style={styles.textButton}>S'inscrire</Text>
                      </TouchableOpacity> 
                          {errorEmpty && <Text style={styles.error}>Tous les champs ne sont pas complétés</Text>}   
                          {existingEmail && <Text style={styles.error}>Email déjà existant</Text>}   

                    </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </Modal>

      </LinearGradient>
    </View>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  text : {
    color: "#ffffff",
    width: 300,
    fontWeight: "600",
    fontSize: 18,
    // borderColor : 'black',
    // borderWidth : 1,
    textAlign:'center',
    fontSize: 20,
    marginBottom: 90,
  },
  image : {
    // borderColor : 'black',
    // borderWidth : 1,
    // paddingTop : 50,
    height : '28%',
    marginBottom: -30,
    marginTop: 50,
    marginRight: 20,
  },
  btnContainer : {
    //flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    // borderColor : 'black',
    // borderWidth : 1,
    height: 110,

  },
  button : {
    alignItems: "center",
    justifyContent: "center",
    width: 140,
    height: 40,
    backgroundColor: "#47AFA5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  textButton : {
    color: "#ffffff",
    height: 30,
    fontWeight: "600",
    fontSize: 18,
    textAlign:'center',
    paddingTop:3
  },
  modalView : {
    marginLeft : 30,
  },
  modalConnect : {
    flex : 1,
    width : '100%',
    alignItems:'center',
    justifyContent : 'center',
  },
  centeredView : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  },
  modalContainer : {
    backgroundColor : 'rgba(255, 255, 255, 1)',
    width : '80%',
    padding : 10,
    borderRadius : 10, 
    alignItems : 'center',
  },
  inputsEtDelete:{
    flexDirection : 'row',
  },
  inputs : {
    justifyContent : 'center',
    alignItems : 'center',
    paddingLeft : 30,
    width:'90%',
  },
  inputModal: {
    borderBottomColor : '#47AFA5',
    borderBottomWidth : 1,
    padding : 0,
    fontSize : 20,
    margin : 6,
    width : '100%',
  },
  deleteModal : {
    paddingLeft : 5,
  },
  textDelete : {
    fontSize : 25,
  },
  btnSeConnecter : {
    marginTop : 15,
    backgroundColor : '#47AFA5',
    padding : 10,
    borderRadius : 10,
    width : '90%',
  },
  btnInscription : {
    marginTop : 15,
    backgroundColor : '#47AFA5',
    padding : 10,
    borderRadius : 10,
    width : '90%',
  },
  error: {
    marginTop: 2,
    color: 'red',
    width: 200,
    textAlign: 'center',
  },
  errorInput: {
    borderBottomColor: 'red',
    borderColor: 'red',
    borderWidth : 2,
    padding : 0,
    fontSize : 20,
    margin : 0,
    width : '100%',
  }
});
