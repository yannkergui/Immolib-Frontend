import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView,Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import {userDatas} from '../../reducers/user';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { myIPAdress } from "../../immolibTools";

export default function PersoConnectionScreen({ navigation }) {

   //Etats pour récupérer les inputs utilisateur
   const [email, setEmail]=useState('');
   const [mdp, setMdp]=useState('');
   const [prenom, setPrenom]=useState('');
   const [nom, setNom]=useState('');
   const [tel, setTel]=useState('');

   //désactivation du regex réel pour les tests /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const EMAIL_REGEX = /[a-z]/
  //désactivation du regex réel pour les tests /^(?:(?:(?:\+|00)33\s?|0)[0-9]\s?\d{8})$/
   const TEL_REGEX = /[0-9]{1}/

   const [emailError, setEmailError] = useState(false);
   const [telError, setTelError] = useState(false);
   // Etat pour gérer les champs vides
   const [errorEmpty, setErrorEmpty] = useState(false);

  // Etats pour création des modales de connexion et d'inscription  
  const [modalConnexion, setModalConnexion]=useState(false);
  const [modalInscription, setModalInscription]=useState(false);

  const dispatch = useDispatch();

  // Premier bouton "Se connecter" qui ouvre la modale
  const handleConnexion = () => {
    setModalConnexion(true);
  }

  // Adresse IP à modifier si besoin
  const myIPAdress='172.20.10.3';

  // 2eme boutton "Se connecter" qui redirige vers la homePage
  const handleConnexionBis = () => {
    // Si correspondance avec la REGEX EMAIL
    if (EMAIL_REGEX.test(email) && mdp) {
      //Récupération des données de l'utilisateur de la BDD
      fetch(`http://192.168.10.155:3000/users/signin`, {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({email : email, motDePasse: mdp})
      })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          // console.log('data récupéré : ', data.data),
          dispatch(userDatas({_id: data.data._id,
                            prenom : data.data.prenom,
                            nom : data.data.nom, 
                            email : data.data.email, 
                            tel : data.data.tel,
                            token : data.data.token,
                            motDePasse : data.data.motDePasse,
                            dejaInscrit : 'true',
                          
                          }));

          setModalConnexion(false)
          navigation.navigate('PersoPriseDeVisite');
          setEmail('');
          setEmailError(false);
          setMdp('');
        }
      })  
     // Si PAS de correspondances avec la REGEX EMAIL  
    } else {
      if (!EMAIL_REGEX.test(email))   {
        setEmailError(true);
      }
      if (!mdp) {
        setErrorEmpty(true);    
      }    
    } 
  }

  // Premier bouton "S'inscrire" qui ouvre la modale
  const handleInscription = () => {
    setModalInscription(true);
  }

    // 2eme bouton "S'inscrire" qui redirige vers la homePage
    const handleInscriptionBis = () => {
        if (EMAIL_REGEX.test(email) && TEL_REGEX.test(tel)) {
          fetch(`http://192.168.10.155:3000/users/signup`, {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({prenom : prenom, nom: nom, email : email, tel : tel, motDePasse: mdp})
            })
            .then(response => response.json())
            .then(data => {
              if (data.result) {
                dispatch(userDatas({prenom : data.data.prenom,
                  nom : data.data.nom, 
                  email : data.data.email, 
                  tel : data.data.tel,
                  token : data.data.token,
                  motDePasse : data.data.motDePasse,
                  dejaInscrit : 'false',}));
                setModalInscription(false)
                navigation.navigate("PersoPriseDeVisite")
                setEmail('');
                setEmailError(false);
                setTelError(false);
                setMdp('');
              } 
            })  
        } else {
          if (!EMAIL_REGEX.test(email)) {
            setEmailError(true);
          } 
          if (!TEL_REGEX.test(tel)) {
            setTelError(true);
          }
          if (!prenom || !nom || !mdp) {
            setErrorEmpty(true);
          }
        } 
      }

  const closeModal = () => {
    setModalConnexion(false);
    setModalInscription(false);
    setEmail('');
    setPrenom('');
    setNom('');
    setMdp('');
    setEmailError(false);
    setTelError(false);
    setErrorEmpty(false);
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
              <Text style={styles.text}>Programme ta visite en toute simplicité pour visiter un bien </Text>
              <View style={styles.btnContainer}>

                  <TouchableOpacity style={styles.button} onPress={()=>handleConnexion()}>
                      <Text style={styles.textButton}>Se connecter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={()=>handleInscription()}>
                      <Text style={styles.textButton}>S'inscrire</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}onPress={()=> navigation.navigate("TabNavigatorPerso")}>
                      <Text style={styles.textButton}>Poursuivre sans inscription</Text>
                  </TouchableOpacity>

                  <Modal style={styles.modalConnect} visible={modalConnexion} animationType="fade" transparent>
                    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                          <View style={styles.centeredView}>                  
                              <View style={styles.modalContainer}>
                                <View style={styles.inputsEtDelete}>
                                  <View style={styles.inputs}>
                                        <TextInput placeholder="email" style={styles.inputModal} keyboardType={"email-address"} autoCorrect={false} autoComplete={"email"} autoCapitalize={'none'} onChangeText={(value) => setEmail(value)} value={email}/>
                                        <TextInput placeholder="Mot de passe" style={styles.inputModal} selectionColor={"red"} secureTextEntry={true} autoCapitalize={'none'} autoCorrect={false} onChangeText={(value) => setMdp(value)} value={mdp}/>  
                                              
                                  </View>
                                  <View style={styles.deleteModal}>
                                        <TouchableOpacity style={styles.btnDeleteModal} onPress={()=>closeModal()}>
                                        <FontAwesome style={styles.icon} name='sign-out' size={20} color='#1F2937' />
                                        </TouchableOpacity>
                                  </View>
                                </View>
                                <TouchableOpacity style={styles.btnSeConnecter} onPress={()=>handleConnexionBis()}>
                                  <Text style={styles.textButton}>Se connecter</Text>
                                </TouchableOpacity>
                                      {emailError && <Text style={styles.error}>Adresse mail invalide ou inéxistante</Text>}
                                      {telError && <Text style={styles.error}>numéro de téléphone invalide</Text>}
                                      {errorEmpty && <Text style={styles.error}>Tous les champs ne sont pas complétés</Text>}    
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
                                    <TextInput placeholder="Prénom" style={styles.inputModal}  autoComplete={"given-name"} onChangeText={(value) => setPrenom(value)} value={prenom}/>
                                    <TextInput placeholder="nom" style={styles.inputModal} autoComplete={"family-name"} onChangeText={(value) => setNom(value)} value={nom}/>
                                    <TextInput placeholder="email" style={styles.inputModal} keyboardType={"email-address"} autoCorrect={false} autoComplete={"email"} autoCapitalize={'none'} onChangeText={(value) => setEmail(value)} value={email}/>
                                    <TextInput placeholder="Mot de passe" style={styles.inputModal} selectionColor={"red"} secureTextEntry={true} autoCapitalize={'none'} autoCorrect={false} onChangeText={(value) => setMdp(value)} value={mdp}/> 
                                    <TextInput placeholder="numéro de téléphone" style={styles.inputModal} keyboardType={"phone-pad"} onChangeText={(value) => setTel(value)} value={tel}/>           
                                </View>
                                <View style={styles.deleteModal}>
                                    <TouchableOpacity  onPress={()=>closeModal()}>
                                    <FontAwesome style={styles.icon} name='sign-out' size={20} color='#1F2937' />
                                    </TouchableOpacity>
                                </View>
                              </View>
                                <TouchableOpacity style={styles.btnInscription} onPress={()=>handleInscriptionBis()}>
                                      <Text style={styles.textButton}>S'inscrire</Text>
                                </TouchableOpacity> 
                                  {emailError && <Text style={styles.error}>Adresse mail invalide</Text>} 
                                  {telError && <Text style={styles.error}>numéro de téléphone invalide</Text>}
                                  {errorEmpty && <Text style={styles.error}>Tous les champs ne sont pas complétés</Text>}   
                            </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                  </Modal>
                  
              </View>
          </View>
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
    justifyContent: "center",
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
    paddingTop:3,
    fontSize: 20,
  },
  image : {
    // borderColor : 'black',
    // borderWidth : 1,
    // paddingTop : 50,
    height : '28%',
  },
  btnContainer : {
    //flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button : {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "10%",
    backgroundColor: "#47AFA5",
    borderRadius: 10,
    marginBottom: "15%",
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
    // borderColor : 'black',
    // borderWidth : 1,
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
    margin : 10,
    width : '100%',
  },
  deleteModal : {
    paddingLeft : 5,
  },
  textDelete : {
    fontSize : 25,
  },
  btnSeConnecter : {
    marginTop : 20,
    backgroundColor : '#47AFA5',
    borderRadius : 10,
    width : 200,
    height:35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  btnInscription : {
    marginTop : 20,
    backgroundColor : '#47AFA5',
    borderRadius : 10,
    width : 200,
    height:35,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});
