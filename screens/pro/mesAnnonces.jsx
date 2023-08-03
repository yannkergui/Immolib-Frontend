import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import { useDispatch } from 'react-redux';
import { userDatas } from '../../reducers/monclient';


export default function Mes({navigation}) {

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(userDatas(e));
    navigation.navigate('FicheClient')

  };

  
// tableau d'exemples
  const AnnoncesPro = [
    {nom: 'theBest', prénom: 'Adrien', prochainevisite : '21/09/2023', téléphone : '0102030405'},
    {nom: 'Beauty', prénom: 'thibaut', prochainevisite : '24/12/2023',téléphone : '0102030405'},
    {nom: 'Queen', prénom: 'Alice', prochainevisite : '11/01/2024',téléphone : '0102030405'},
    {nom: 'Ugly', prénom:' Yann-Erwan', prochainevisite : '21/09/2023',téléphone : '0102030405'},
    {nom: 'Teacher', prénom: 'Amine', prochainevisite : '',téléphone : '0102030405'},
  ]

  // mapping du back pour afficher les cards des clients 
const clientsCards = clientsPro.map((data, key) => { 
  let nextvisite
  const onPressMobileNumberClick = (number) => {

    if (data.prochainevisite !== '') {
nextvisite = `prochaine visite : ${data.prochainevisite}`
    } else {nextvisite = 'pas de visite prévue'}
  

    return (
      <View style={styles.clientsCard}>
        <View style={styles.clientsCardOrientation}>
          <View >
            <TouchableOpacity style={styles.cardIcon} onPress={() => { handleSubmit(data) }}>
              <FontAwesome style={styles.iconClient} name='user' size={40} color='#1F2937' />
            </TouchableOpacity>
          </View>
          <View style={styles.centerCardOrientation}>
            <Text style={styles.titleCard}>{data.nom} {data.prénom} </Text>
            <Text style={styles.subCard}>{nextvisite}</Text>
          </View>
          <View >
            <TouchableOpacity style={styles.cardIcon} onPress={() => { onPressMobileNumberClick(data.téléphone) }}>
              <FontAwesome style={styles.iconPhone} name='phone' size={40} color='#1F2937' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
});





  return (
    <View style={styles.container}>
    <LinearGradient
      colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
      start={{ x: 0, y: 0 }} // Start point of the gradient
      end={{ x: 1, y: 1 }} // End point of the gradient
      style={styles.background}
    >
      <View style={styles.container}>
 
        <View style={styles.header}> 
        <Text style={styles.Title}>Mes Clients</Text>
        <TouchableOpacity style={styles.iconcontainer}>
          <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
        </TouchableOpacity>
        </View>
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
  justifyContent: "center",
},
background: {
  flex: 1,
  width: "100%",
},
header: {
  flexDirection: 'row',
  width :'90%',
  position: 'absolute',
  top: 80, 
  alignItems: 'center', // Center the content horizontally
  justifyContent: 'center'
},
iconcontainer :{
position :'absolute',
left : 330,
top : 0,
backgroundColor : 'white',
width : 50,
height: 50,
paddingLeft : 15,
paddingTop : 8.5,
borderRadius : 100
},
Title: {
  fontFamily: 'Nunitobold',
  color: 'white',
  fontSize: 35,
  fontStyle: 'normal',
  fontWeight: '600', 
  letterSpacing: -1.5, 
  textAlign:'center',
},
});
