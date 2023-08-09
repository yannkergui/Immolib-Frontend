import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { ipAdress } from "../../immolibTools";



export default function PersoProfil({ navigation }) {
  //Il faudra rajouter les components ={nomducomposant} dans les Tab.Screen pour rendre la navigation fonctionnelle.
  const handleRecherche = () => {
    navigation.navigate("PersoMonDossier1");
  };
  const handleDocuments = () => {
    navigation.navigate("PersoMonDossier3Loc");
  };

  const maVisite = useSelector((state) => state.maVisite.value);
  const user = useSelector((state) => state.user.value);


const countNonEmptyFields = () => {
  let count = 0;

  for (const key in user) {
    if (user[key] !== "" && user[key] !== null && user[key] !== undefined) {
      count++;
    }
  }

  return count;
};

let completion 

if(user.dejaInscrit){
completion = (countNonEmptyFields()/25)*100
} else {completion = (countNonEmptyFields()/15)*100}



  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.background}
      >
        <SafeAreaView>
        <View style={styles.header}>
            <TouchableOpacity  onPress={() => navigation.goBack()}>
                <FontAwesome style={styles.icon} name='chevron-left' size={20} color='#1F2937' />
            </TouchableOpacity> 
            <Text style={styles.Title}>Mon Profil</Text>
            <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit()}}>
                <FontAwesome style={styles.icon} name='sign-out' size={30} color='#1F2937' />
            </TouchableOpacity>
        </View>
          <View style={styles.lineCard}>
            <View style={styles.caractProfil}>
              <Text style={styles.lineTitle2}>{user.prenom} {user.nom}</Text>
              <Text style={styles.lineTitle2}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.monDossierContainer}>
            <Text style={styles.Title}> Mon dossier</Text>

            <View style={styles.dossierCompletion}>
              <Text style={styles.pourcentageCompletion}>
                Ton profil est complet à {completion} %
              </Text>

              <Text style={styles.msgIncomplet}>
                Complète le pour ne plus rater de bien 😉
              </Text>
            </View>

            <View style={styles.BtnContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleRecherche()}
              >
                <Text >Modifer ma recherche</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDocuments()}
              >
                <Text >Compléter mes documents</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  Titre: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  InfosProfil: {
    flexDirection: "row",
    alignItems: "center",
  },
  caractProfil: {
    justifyContent: "center",
    alignItems:'center',
    width: 225,
  },
  caract: {
    marginHorizontal: 10,
    marginVertical: 6,
    fontSize: 15,
    width: 80,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    borderColor: "#0E2321",
    justifyContent: "center",
    alignItems: "center",
  },
  caractEmail: {
    marginHorizontal: 10,
    marginVertical: 6,
    fontSize: 15,
    width: 180,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    borderColor: "#0E2321",
    justifyContent: "center",
    alignItems: "center",
  },

  monDossierContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    marginTop: 50,
  },
  monDossierTitre: {
    fontSize: 30,
    marginBottom: 20,
  },
  dossierCompletion: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    paddingBottom: 20,
    marginBottom:50,
  },
  pourcentageCompletion: {
    fontSize: 20,
    width: 280,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    textAlign:'center',

  },
  msgIncomplet: {
    width: 120,
    fontSize: 15,
    textAlign:'center',
  // 
  },

  BtnContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  Btn: {
    alignItems: "center",
    justifyContent: "center",
    width: 270,
    height: 70,
    backgroundColor: "#0E2321",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 15,
  },
  texteBtn: {
    color: "white",

    letterSpacing: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Center the content horizontally
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
    borderRadius : 100
    },
    Title: {
      color: 'white',
      fontSize: 35,
      fontStyle: 'normal',
      fontWeight: '600', 
      letterSpacing: -1.5, 
      textAlign:'center',
    },
    lineCard: {
      justifyContent: "center",
      alignItems:'center',
      width: 350,
      height:90,
      borderRadius: 25,
      backgroundColor: "#BCCDB6",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 9,
      },
      shadowOpacity: 0.48,
      shadowRadius: 11.95,
      elevation: 18,
  marginTop:40,
  marginLeft:20
    },
    lineTitle2:{
      fontSize: 20,
    },
    inline:{
      flexDirection:'row',
    },
    button : {
      alignItems: "center",
      justifyContent: "center",
      width: 200,
      height: "18%",
      backgroundColor: "#47AFA5",
      borderRadius: 15,
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
});
