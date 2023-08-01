import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView,Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import {userDatas} from '../../reducers/user'

const urlPerso = ""

export default function ProConnectionScreen({ navigation }) {

   //Etats pour récupérer les inputs utilisateur
   const [email, setEmail]=useState('');
   const [mdp, setMdp]=useState('');
   const [prenom, setPrenom]=useState('');
   const [nom, setNom]=useState('');
   const [tel, setTel]=useState('');

   const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const TEL_REGEX = /^(?:(?:(?:\+|00)33\s?|0)[67]\s?\d{8})$/
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

  // 2eme boutton "Se connecter" qui redirige vers la homePage
  const handleConnexionBis = () => {
    // Si correspondance avec la REXEXP EMAIL
    if (EMAIL_REGEX.test(email) && mdp) {
      //Récupération des données de l'utilisateur de la BDD
      fetch('http://192.168.10.184:3000/users/signin', {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({email : email, motDePasse: mdp})
      })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log('data récupéré : ', data),
          dispatch(userDatas({prenom : data.data.prenom,
                            nom : data.data.nom, 
                            email : data.data.email, 
                            tel : data.data.tel,
                            token : data.data.token,
                            motDePasse : data.data.motDePasse}));
          setModalConnexion(false);
          navigation.navigate('TabNavigatorPerso', { screen: 'Home' });
          setEmail('');
          setEmailError(false);
        }
      })  
     // Si PAS de correspondances avec la REXEXP EMAIL  
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
          fetch('http://192.168.10.184:3000/users/signup', {
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
                  motDePasse : data.data.motDePasse}));
                setModalInscription(false);
                navigation.navigate('TabNavigatorPerso', { screen: 'Home' });
                setEmail('');
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
                <Text style={styles.text}>Programme tes visites et gère tes clients en toute simplicité</Text>        
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.button} onPress={()=>handleConnexion()}>
                        <Text style={styles.textButton}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={()=>handleInscription()}>
                        <Text style={styles.textButton}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.textButton}>Poursuivre sans inscription</Text>
                    </TouchableOpacity>
                    <View style={styles.modalView}>
                        <Modal style={styles.modalConnect} visible={modalConnexion} animationType="fade" transparent>
                            <View style={styles.centeredView}>                  
                                <View style={styles.modalContainer}>
                                  <View style={styles.inputsEtDelete}>
                                    <View style={styles.inputs}>
                                          <TextInput placeholder="email" style={styles.inputModal} onChangeText={(value) => setEmail(value)} value={email}/>
                                          <TextInput placeholder="Mot de passe" style={styles.inputModal} onChangeText={(value) => setMdp(value)} value={mdp}/>  
                                                
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
                                        {emailError && <Text style={styles.error}>Adresse mail invalide ou inéxistante</Text>}
                                        {telError && <Text style={styles.error}>numéro de téléphone invalide</Text>}
                                        {errorEmpty && <Text style={styles.error}>Tous les champs ne sont pas complétés</Text>}    
                                </View>
                            </View>
                        </Modal>  
                    </View>

                   <Modal style={styles.modalInscription} visible={modalInscription} animationType="fade" transparent>
                        <View style={styles.centeredView}>
                            <View style={styles.modalContainer}>
                              <View style={styles.inputsEtDelete}>
                                <View style={styles.inputs}>
                                    <TextInput placeholder="Prénom" style={styles.inputModal} autoComplete={"given-name"} onChangeText={(value) => setPrenom(value)} value={prenom}/>
                                    <TextInput placeholder="nom" style={styles.inputModal} autoComplete={"family-name"} onChangeText={(value) => setNom(value)} value={nom}/>
                                    <TextInput placeholder="email" style={styles.inputModal} keyboardType={"email-address"} autoCorrect={false} autoComplete={"email"} autoCapitalize={'none'} onChangeText={(value) => setEmail(value)} value={email}/>
                                    <TextInput placeholder="Mot de passe" style={styles.inputModal} autoCapitalize={'none'} autoCorrect={false} onChangeText={(value) => setMdp(value)} value={mdp}/> 
                                    <TextInput placeholder="numéro de téléphone" style={styles.inputModal} keyboardType={"phone-pad"} onChangeText={(value) => setTel(value)} value={tel}/>           
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
                                  {emailError && <Text style={styles.error}>Adresse mail invalide</Text>} 
                                  {telError && <Text style={styles.error}>numéro de téléphone invalide</Text>}
                                  {errorEmpty && <Text style={styles.error}>Tous les champs ne sont pas complétés</Text>}   
                            </View>
                        </View>
                   </Modal>
                </View>
          <StatusBar style="auto" />
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
    height: "8%",
    backgroundColor: "#47AFA5",
    borderRadius: 10,
    marginBottom: "15%",

    // paramètrage de l'ombre des boutons. utiliser : (https://ethercreative.github.io/react-native-shadow-generator/) si besoin

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
    backgroundColor : 'rgba(255, 255, 255, 0.7)',
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
    padding : 20,
    borderRadius : 10,
    width : '90%',
  },
  btnInscription : {
    marginTop : 20,
    backgroundColor : '#47AFA5',
    padding : 20,
    borderRadius : 10,
    width : '90%',
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});
