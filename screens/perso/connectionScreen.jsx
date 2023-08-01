import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

export default function ConnectionScreen({ navigation }) {
   //Etats pour récupérer les inputs utilisateur
   const [email, setEmail]=useState('');
   const [mdp, setMdp]=useState('');
   const [prenom, setPrenom]=useState('');
   const [nom, setNom]=useState('');
   const [tel, setTel]=useState(0);

   const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const TEL_REGEX = /^(\+33\s[1-9]{8})|(0[1-9]\s{8})$/
   const [emailError, setEmailError] = useState(false);

  // Etats pour création des modales de connexion et d'inscription  
  const [modalConnexion, setModalConnexion]=useState(false);
  const [modalInscription, setModalInscription]=useState(false);

  // Premier bouton "Se connecter" qui ouvre la modale
  const handleConnexion = () => {
    setModalConnexion(true);
  }

  // 2eme boutton "Se connecter" qui redirige vers la homePage
  const handleConnexionBis = () => {
    // Si correspondance avec la REXEXP EMAIL
    if (EMAIL_REGEX.test(email)) {
      //Récupération des données de l'utilisateur de la BDD
      fetch('http://192.168.10.171:3000/users/signin', {
      method : 'POST',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify({email : email, motDePasse: mdp})
      })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          // dispatch(updateEmail(email));
          navigation.navigate('TabNavigatorPerso', { screen: 'Home' });
          setEmail('');
          setEmailError(false);
        }
      })  
     // Si PAS de correspondances avec la REXEXP EMAIL     
    } else {
        setEmailError(true);
    } 
  }

  // Premier bouton "S'inscrire" qui ouvre la modale
  const handleInscription = () => {
    setModalInscription(true);
  }

    // 2eme bouton "S'inscrire" qui qui redirige vers la homePage
    const handleInscriptionBis = () => {
        if (EMAIL_REGEX.test(email)) {
            // dispatch(updateEmail(email));
            // navigation.navigate('TabNavigator', { screen: 'Gallery' });
            setEmail('');
        } else {
            setEmailError(true);
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
                                    <View style={styles.inputs}>
                                        <TextInput placeholder="email" style={styles.inputModal} onChangeText={(value) => setEmail(value)} value={email}/>
                                        <TextInput placeholder="Mot de passe" style={styles.inputModal} onChangeText={(value) => setMdp(value)} value={mdp}/>  
                                        <TouchableOpacity style={styles.btnSeConnecter} onPress={()=>handleConnexionBis()}>
                                            <Text style={styles.textButton}>Se connecter</Text>
                                        </TouchableOpacity>
                                        {emailError && <Text style={styles.error}>Adresse mail invalide</Text>}       
                                    </View>
                                    <View style={styles.deleteModal}>
                                        <TouchableOpacity style={styles.btnDeleteModal} onPress={()=>closeModal()}>
                                            <Text style={styles.textDelete}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>  
                    </View>

                   <Modal style={styles.modalInscription} visible={modalInscription} animationType="fade" transparent>
                        <View style={styles.centeredView}>
                            <View style={styles.modalContainer}>
                                <View style={styles.inputs}>
                                    <TextInput placeholder="Prénom" style={styles.inputModal} onChangeText={(value) => setPrenom(value)} value={prenom}/>
                                    <TextInput placeholder="nom" style={styles.inputModal} onChangeText={(value) => setNom(value)} value={nom}/>
                                    <TextInput placeholder="email" style={styles.inputModal} onChangeText={(value) => setEmail(value)} value={email}/>
                                    <TextInput placeholder="Mot de passe" style={styles.inputModal} onChangeText={(value) => setMdp(value)} value={mdp}/> 
                                    <TextInput placeholder="téléphone +33" style={styles.inputModal} onChangeText={(value) => setTel(value)} value={tel}/> 
                                    <TouchableOpacity style={styles.btnSeConnecter} onPress={()=>handleInscriptionBis()}>
                                            <Text style={styles.textButton}>S'inscrire</Text>
                                        </TouchableOpacity> 
                                        {emailError && <Text style={styles.error}>Adresse mail invalide</Text>}             
                                </View>
                                <View style={styles.deleteModal}>
                                    <TouchableOpacity style={styles.btnDeleteModal} onPress={()=>closeModal()}>
                                        <Text style={styles.textDelete}>X</Text>
                                    </TouchableOpacity>
                                </View>
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
  image : {
    // borderColor : 'black',
    // borderWidth : 1,
  },
  btnContainer : {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button : {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "7%",
    backgroundColor: "#47AFA5",
    borderRadius: 10,
    marginBottom: "25%",

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
    flexDirection : 'row',
    backgroundColor : 'rgba(255, 255, 255, 0.7)',
    width : '60%',
    padding : 20,
    borderRadius : 10,
    justifyContent : 'space-between',
    // borderColor : 'black',
    // borderWidth : 1,
  },
  inputs : {
    justifyContent : 'center',
    alignItems : 'center',
    paddingLeft : 30,
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
    justifyContent : 'flex-start',

    margin : 20,
  },
  textDelete : {
    fontSize : 20,
  },
  btnSeConnecter : {
    marginTop : 50,
    backgroundColor : '#47AFA5',
    padding : 20,
    borderRadius : 10,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});
