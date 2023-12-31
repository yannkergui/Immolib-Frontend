import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView, Modal, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import SwitchSelector from "react-native-switch-selector";
import FontAwesome from "react-native-vector-icons/FontAwesome";
//import { useFonts } from 'expo-font';

import {ipAdress} from "../../immolibTools"

import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { proDatas } from '../../reducers/pro';
import FirstScreen from '../firstScreen';

export default function ProPreferences({navigation}) {

  // const [fontsLoaded] = useFonts({
  //   Nunitobold: require('../../assets/fonts/Nunito/static/Nunito-Bold.ttf'),
  //   NunitoSans: require('../../assets/fonts/Nunito_Sans/static/NunitoSans_7pt-Medium.ttf')
  // });

  const [prenom, setPrenom]=useState('');
  const [nom, setNom]=useState('');
  const [email, setEmail]=useState('');
  const [tel, setTel]=useState('');

  const pro = useSelector((state) => state.pro.value);
  console.log(pro);


  console.log('test',pro);

  const [emailError, setEmailError] = useState(false);
  const [telError, setTelError] = useState(false);
  // Etat pour gérer les champs vides
  const [errorEmpty, setErrorEmpty] = useState(false);

  //désactivation du regex réel pour les tests /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const EMAIL_REGEX = /[a-z]/
  //désactivation du regex réel pour les tests /^(?:(?:(?:\+|00)33\s?|0)[0-9]\s?\d{8})$/
  const TEL_REGEX = /[0-9]{1}/

  // Etats modales
  const [modalMaj, setModalMaj]=useState(false);
  const [modalPhoto, setModalPhoto] = useState(false)

  const dispatch = useDispatch();

  // Icone "modifier" qui ouvre la modale
  const maj = () => {
    setModalMaj(true);
  }
    // bouton "Modifier" qui valide les modifications
    const validerMaj = () => {

        if (pro.token && EMAIL_REGEX.test(email) && TEL_REGEX.test(tel)) {
          fetch(`http://${ipAdress}/pros/${pro.token}`, {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify ({
              prenom: prenom === '' ? pro.prenom : prenom,
              nom: nom === '' ? pro.nom : nom,
              email: email === '' ? pro.email : email,
              tel: tel === '' ? pro.tel : tel,
              // autres propriétés
            })
          })
            .then(response => response.json())
            .then(data => {
              if (data.proUpdated) {
                
                let {prenom, nom, email, tel, token, motDePasse} = data.proUpdated
                dispatch(proDatas({
                  prenom : prenom,
                  nom : nom, 
                  email : email, 
                  tel : tel,
                  token : token,
                  motDePasse : motDePasse}));
                setModalMaj(false);
                setEmail('');
                setNom('');
                setPrenom ('');
                setTel('');
                setEmailError(false);
                setTelError(false);
              } 
            })  
        } else {
          if (!EMAIL_REGEX.test(email)) {
            setEmailError(true);
          }
          if (!TEL_REGEX.test(tel)) {
            setTelError(true);
          }
          if (!prenom || !nom) {
            setErrorEmpty(true);
          }
        }
      }

  const closeModal = () => {
    setModalMaj(false);
    setEmail('');
    setPrenom('');
    setNom('');
    setTel('');
    setEmailError(false);
    setTelError(false);
    setErrorEmpty(false);
    setModalPhoto(false);
  }


function handlePhoto () {
  setModalPhoto(true)
}

  function launchCamera (){
    navigation.navigate('CameraScreen');
    setModalPhoto(false)


  }

  //switch selector restriction visite aux dossiers complets :
  const [restrict, setRestrict] = useState(false);
  const [restrictColor, setRestrictColor] = useState("rgba(227,227,227,0.5)");
  const restrictOptions = [
    { label: "N", value: false },
    { label: "O", value: true },
  ];
  function restrictBackground (value) {
    if (value) {
      setRestrictColor("green")
    } else {
      setRestrictColor("rgba(227,227,227,0.5)")
    }
  }

  //switch selector validation auto des demandes de visites :
  const [valid, setValid] = useState(false);
  const [validColor, setValidColor] = useState("rgba(227,227,227,0.5)");
  const validOptions = [
    { label: "N", value: false },
    { label: "O", value: true },
  ];
  function validBackground (value) {
    if (value) {
      setValidColor("green")
    } else {
      setValidColor("rgba(227,227,227,0.5)")
    }
  }

  //switch selector notification pour chaque demande :
  const [notif, setNotif] = useState(false);
  const [notifColor, setNotifColor] = useState("rgba(227,227,227,0.5)");
  const notifOptions = [
    { label: "N", value: false },
    { label: "O", value: true },
  ];
  function notifBackground (value) {
    if (value) {
      setNotifColor("green")
    } else {
      setNotifColor("rgba(227,227,227,0.5)")
    }
  }
  
  return (

  <LinearGradient
          colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
          start={{ x: 0, y: 0 }} // Start point of the gradient
          end={{ x: 1, y: 1 }} // End point of the gradient
          style={styles.background}
  >
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyBoardContainer}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <TouchableOpacity  onPress={() => navigation.goBack()}>
                <FontAwesome style={styles.iconLeft} name='chevron-left' size={20} color='#1F2937' />
            </TouchableOpacity> 
            <Text style={styles.Title}>Mes préférences</Text>
            <TouchableOpacity style={styles.iconcontainer} onPress={() => { navigation.navigate('FirstScreen')}}>
                <FontAwesome style={styles.iconRight} name='sign-out' size={30} color='#1F2937' />
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.main}>

            <Text style={styles.cardTitle}>Mon profil</Text>

            <View style={styles.cardProfile}>
                <FontAwesome name='edit' size={20} color="white" marginRight={20} marginTop={10} marginBottom={5} onPress={()=>maj()}/>
                <View style = {{flexDirection: "row", width: '100%', justifyContent: 'center'}}>
                  <View style = {styles.photoBloc}>
                    <Image source={{url: pro.photo? pro.photo : "toto"}} style={styles.photo}/>
                    <TouchableOpacity style={styles.photoText} onPress={() => handlePhoto()}>
                      <Text style={styles.photoText}>Modifiez votre photo</Text>
                    </TouchableOpacity> 
                  </View>
                  <View>
                      <View style={styles.lineProfile}>
                          <Text style={styles.inputProfile1}>{pro.prenom}</Text>
                      </View>
                      <View style={styles.lineProfile} >
                          <Text style={styles.inputProfile1}>{pro.nom.toUpperCase()}</Text>
                      </View>
                      <View style={styles.lineProfile}>
                          <Text style={styles.inputProfile1}>{pro.email}</Text>
                      </View>
                      <View style={styles.lineProfile}>
                          <Text style={styles.inputProfile2}>{pro.tel}</Text>
                      </View>
                  </View>  
                </View>
            </View>

            <Text style={styles.cardTitle}>Mon agence</Text>

            <View style={styles.cardAgence}>
                    <View style={styles.lineAgence}>
                        <Text style={styles.labelsAgence}>Raison sociale :</Text>
                        <Text style={styles.inputAgence}>{pro.agence.denomination}</Text>
                    </View>
                    <View style={styles.lineAgence}>
                        <Text style={styles.labelsAgence}>Siren :</Text>
                        <Text style={styles.inputAgence}>{pro.agence.siren}</Text>
                    </View>
                    <View style={styles.lineAgence}>
                        <Text style={styles.labelsAgence}>Siret :</Text>
                        <Text style={styles.inputAgence}>{pro.agence.siret}</Text>
                    </View>
                    <View style={styles.lineAgence}>
                        <Text style={styles.labelsAgence}>Adresse :</Text>
                        <Text style={styles.inputAgence}>{pro.agence.adresse}</Text>
                    </View>
            </View>
            <Text style={styles.cardTitle}>Mes Disponibilités</Text>
            <View style={styles.dispo}>
            <TouchableOpacity style={styles.button2} onPress={()=>navigation.navigate('ProDisponibilites')}>
                    <Text style={styles.textButton2}>Je gère mes dispos</Text>
                </TouchableOpacity>
              
            </View>

            <Text style={styles.cardTitle}>Mes préférences</Text>

            <View style={styles.cardPref}>
                <View style={styles.linePref}>
                    <Text style={styles.labelsPref}>Restreindre les visites aux utilisateurs avec dossier complet</Text>
                    <SwitchSelector
                    options={restrictOptions}
                    initial={0}
                    onPress={(value)=>
                      {
                      console.log("cliqué");
                      setRestrict(value)
                      restrictBackground(value)
                      }
                    }
                    valuePadding={2.5}
                    hasPadding
                    style={styles.switchSelector}
                    buttonColor="white"
                    height={30} 
                    backgroundColor={restrictColor}
                    borderWidth={0}
                    textColor= 'rgba(245, 40, 145, 0)'
                    />
                </View>
                <View style={styles.linePref}>
                    <Text style={styles.labelsPref}>Validation automatique des demandes de visite</Text>
                    <SwitchSelector
                    options={restrictOptions}
                    initial={0}
                    onPress={(value)=>
                      {
                      setValid(value)
                      validBackground(value)
                      }
                    }
                    valuePadding={2.5}
                    hasPadding
                    style={styles.switchSelector}
                    buttonColor="white"
                    height={30} 
                    backgroundColor={restrictColor}
                    borderWidth={0}
                    textColor= 'rgba(245, 40, 145, 0)'
                    />
                </View>
                <View style={styles.linePref}>
                        <Text style={styles.labelsPref}>Notification pour chaque demande de visite</Text>
                        <SwitchSelector
                        options={restrictOptions}
                        initial={0}
                        onPress={(value)=>
                          {
                          setNotif(value)
                          notifBackground(value)
                          }
                        }
                        valuePadding={2.5}
                        hasPadding
                        style={styles.switchSelector}
                        buttonColor="white"
                        height={30} 
                        backgroundColor={restrictColor}
                        borderWidth={0}
                        textColor= 'rgba(245, 40, 145, 0)'
                    />
                </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>

    <Modal visible={modalMaj} animationType="fade" transparent>
                  <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                      <View style={styles.centeredView}>
                          <View style={styles.modalContainer}>
                            <View style={styles.inputsEtDelete}>
                              <View style={styles.inputs}>
                                  <TextInput placeholder="Prénom" placeholderTextColor="red" style={styles.inputModal} autoComplete={"given-name"} onChangeText={(value) => setPrenom(value)} value={prenom}/>
                                  <TextInput placeholder="Nom" placeholderTextColor="red" style={styles.inputModal} autoComplete={"family-name"} onChangeText={(value) => setNom(value)} value={nom}/>
                                  <TextInput placeholder="Email" placeholderTextColor="red" style={styles.inputModal} keyboardType={"email-address"} autoCorrect={false} autoComplete={"email"} autoCapitalize={'none'} onChangeText={(value) => setEmail(value)} value={email}/>
                                  {emailError && <Text style={styles.error}>Adresse mail invalide</Text>} 
                                  <TextInput placeholder="Numéro de téléphone" placeholderTextColor="red" style={styles.inputModal} keyboardType={"phone-pad"} onChangeText={(value) => setTel(value)} value={tel}/>
                                  {telError && <Text style={styles.error}>Numéro de téléphone invalide</Text>}
                              </View>
                              <View style={styles.deleteModal}>
                                  <TouchableOpacity  onPress={()=>closeModal()}>
                                      <Text style={styles.textDelete}>X</Text>
                                  </TouchableOpacity>
                              </View>
                            </View>
                            <TouchableOpacity style={styles.btnInscription} onPress={()=>validerMaj()}>
                                  <Text style={styles.textButton}>Enregistrer</Text>
                            </TouchableOpacity> 
                                {errorEmpty && <Text style={styles.error}>Tous les champs ne sont pas complétés</Text>}   
                          </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
    </Modal>

    <Modal visible={modalPhoto} animationType="fade" transparent>
                  <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                      <View style={styles.centeredView}>
                          <View style={styles.modalContainer}>
                            <View style={styles.inputsEtDelete}>
                              <View style={styles.deleteModal}>
                                  <TouchableOpacity onPress={()=>closeModal()}>
                                      <Text style={styles.textDelete}>X</Text>
                                  </TouchableOpacity>
                              </View>
                            </View>
                            <TouchableOpacity style={styles.btnInscription} onPress={()=>launchCamera()}>
                              <Text style={styles.textButton}>Prenez une photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnInscription} onPress={()=>pickPhoto()}>
                              <Text style={styles.textButton}>Télécharger une photo</Text>
                            </TouchableOpacity> 
                          </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </KeyboardAvoidingView>
    </Modal>
  </LinearGradient>

  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  photoBloc: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 0,
    // borderColor: "white",
    // borderWidth: 1,
  },
  photo: {
    width: 95,
    height: 95,
    borderRadius: 50,
    marginBottom: 4,
  },
  photoText: {
    width: 100,
    fontSize: 12,
    textAlign: 'center',
    color: "white",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  keyBoardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    marginTop: 15,   
    fontFamily: 'Arial',
    color: 'white',
    fontSize: 30,
    // fontWeight: 'bold',
    paddingLeft: 25,
    // borderColor: "white",
    // borderWidth: 1,
  },
  cardProfile: {
    justifyContent : "flex-start",
    alignItems : "flex-end",
    height: 175,
    width : 340,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 9,
    //   },
    // shadowOpacity: 0.48,
    // shadowRadius: 11.95,
    elevation: 18,
    marginLeft: 20,
    // borderColor: "white",
    // borderWidth: 1,
    marginTop: -5,
  },
  
  cardPref: {
    justifyContent : "flex-start",
    alignItems : "flex-start",
    paddingBottom: 15,
    height: 170,
    width : 340,
    borderRadius: 25,
    backgroundColor:'rgba(255, 255, 255, 0)',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    marginLeft: 10,
    marginTop: 25,
    // borderColor: "white",
    // borderWidth: 1,
  },
  lineProfile : {
    width: 210,
    // borderColor: "white",
    // borderWidth: 1,
    flexDirection: "row",
    },
  
  labels: {
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 0,
    fontFamily: 'Arial',
    fontSize: 16,
    // borderColor: "green",
    // borderWidth: 1,
    width: 60,
  },
  linePref: {
    width: '100%',
    // borderColor: "red",
    // borderWidth: 1,
    flexDirection: "row",
    marginBottom: 20,
  },
  cardAgence: {
    justifyContent : "flex-start",
    alignItems : "flex-start",
    height: 190,
    width : 340,
    borderRadius: 25,
    backgroundColor:'rgba(255, 255, 255, 0)',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 9,
      },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    marginLeft: 10,
    marginTop: 25,
    // marginBottom: 15,
    // borderColor: "white",
    // borderWidth: 1,
  },
  lineAgence: {
    width: '100%',
    // borderColor: "red",
    // borderWidth: 1,
    flexDirection: "row",
    marginBottom: 10,
  },
  labelsAgence: {
    paddingLeft: 20,
    paddingRight: 0,
    fontFamily: 'Arial',
    fontSize: 14,
    // borderColor: "green",
    // borderWidth: 1,
    width: 90,
    color: "white",
  },
  inputAgence: {
    paddingLeft: 10,
    paddingRight: 5,
    fontFamily: 'Arial',
    fontSize: 16,
    width: 240,
  },
  inputProfile1: {
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 5,
    fontFamily: 'Arial',
    fontSize: 16,
    width: 210,
  },
  inputProfile2: {
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 5,
    fontFamily: 'Arial',
    fontSize: 16,
    width: 150,
  },

  labelsPref: {
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 5,
    fontFamily: 'Arial',
    fontSize: 16,
    // borderColor: "green",
    // borderWidth: 1,
    width: 260,
  },
  switchSelector: {
    width: 60,
    // borderColor: "yellow",
    // borderWidth: 1,
    marginLeft: 5,
  },
  deleteModal : {
    paddingLeft : 5,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
  textDelete : {
    fontSize : 25,
  },
  btnInscription : {
    marginTop : 15,
    backgroundColor : '#47AFA5',
    padding : 10,
    borderRadius : 10,
    width : '90%',
  },
  textButton : {
    color: "#ffffff",
    height: 25,
    fontWeight: "600",
    fontSize: 18,
    textAlign:'center',
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
  header: {
    flexDirection: 'row',
    width :400,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1, 
  },
  iconcontainer :{
    top : 0,
    backgroundColor : 'white',
    width : 50,
    height: 50,
    paddingLeft : 15,
    paddingTop : 8.5,
    borderRadius : 100,
    marginRight: 15,
    },
    Title: {
      color: 'white',
      fontSize: 35,
      fontStyle: 'normal',
      fontWeight: '600', 
      letterSpacing: -1.5, 
      textAlign:'center',
    },
    button2 : {
      alignItems: "center",
      justifyContent: "center",
      width: 200,
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
    textButton2 : {
      color: "#ffffff",
      height: 30,
      fontWeight: "600",
      fontSize: 18,
      textAlign:'center',
      paddingTop:3
    },
    dispo:{
      marginTop:15,
      marginBottom:15,
      justifyContent:'center',
      alignItems:'center',
      width:'100%',
    },
    iconLeft:
    {
      marginLeft: 15,
    },

})