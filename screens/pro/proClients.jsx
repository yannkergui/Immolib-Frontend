import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { userDatas } from '../../reducers/monClient';
import { ipAdress } from "../../immolibTools";
import { useEffect, useState} from 'react';
//import { set } from 'mongoose';


export default function ProClients({navigation}) {
  
  const token = useSelector((state) => state.pro.value.token);
  const [clientsPro, setClientsPro]=useState([]);

  useEffect(() => {
    //Récupération des visites (connexion Backend)
    fetch(`http://${ipAdress}/visites/pro/${token}`)
    .then(response => response.json())
    .then(dataVisit => { 
      //trie des visites de la plus récente à la plus ancienne    
      dataVisit.visitesTrouvees.sort((a, b) => {
        const date1=new Date(a.dateOfVisit);
        const date2=new Date(b.dateOfVisit);
        return date1 - date2;
      })

      //Filtrer les dates passées (antérieures à aujourd'hui) 
      const visitesFiltreesDate = dataVisit.visitesTrouvees.filter(e=> new Date(e.dateOfVisit)>=new Date())

      //Filtre pour éviter les doublons des users
      const visitesFiltreesDoublon=visitesFiltreesDate.filter((visite, i, tab) => {
        //findIndex renvoie le premier index qui correspond à la condition de la fonction callback
        const premierIndex = tab.findIndex(e => {  
          if (e.usersId && visite.usersId) {
            return(e.usersId.token === visite.usersId.token)
          } })
        return(premierIndex===i)
      });

      setClientsPro(visitesFiltreesDoublon);
    })
  }, []);
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(userDatas(e));
    navigation.navigate('FicheClient')
  };

  const goingHome = () => {
    navigation.navigate('ProHome')
  };

  const [fontsLoaded] = useFonts({
    Nunitobold: require('../../assets/fonts/Nunito/static/Nunito-Bold.ttf'),
    NunitoSans: require('../../assets/fonts/Nunito_Sans/static/NunitoSans_7pt-Medium.ttf')
  });
  

  // mapping du back pour afficher les cards des clients
  const clientsCards = clientsPro.map((data, key) => {
    key={key}; 
    let nextvisite;
    const onPressMobileNumberClick = (number) => {
  
      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
      } else {
        phoneNumber = `telprompt:${number}`;
      }
  
      Linking.openURL(phoneNumber);
   }
      // Formatage des dates : transformation de "aaaa-mm-dd" en "dd/mm/aaaa" et garder un '0' devant le numéro du mois et du jour
      const dateFormatee=new Date(data.dateOfVisit);
      const jour = dateFormatee.getDate().toString().padStart(2, '0'); ;
      const mois = (dateFormatee.getMonth()+1).toString().padStart(2, '0'); 
      const annee = dateFormatee.getFullYear();

      if (data.dateOfVisit !== '') {
        nextvisite = `Prochaine visite :\n${jour}/${mois}/${annee} à ${data.startTimeVisit} h`
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
              <Text style={styles.titleCard}>{data.usersId.nom} {data.usersId.prenom} </Text>
              <Text style={styles.subCard}>{nextvisite}</Text>
            </View>
            <View >
              <TouchableOpacity style={styles.cardIcon} onPress={() => { onPressMobileNumberClick(data.usersId.tel) }}>
                <FontAwesome style={styles.iconPhone} name='phone' size={40} color='#1F2937' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  );
  

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
        <TouchableOpacity style={styles.iconcontainer} onPress={() => { goingHome() }}>
          <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
        </TouchableOpacity>
        </View>
        <ScrollView style={styles.cardsContainer}>
          {clientsCards}
        </ScrollView>    
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
  justifyContent: 'center',
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
cardsContainer : {
  marginTop : '40%',
  marginBottom : '10%',
},
clientsCard :{
  justifyContent : 'center',
  alignItems : 'center',
  height : 100,
  width : '90%',
  borderRadius: 60,
  backgroundColor:'#BCCDB6',
  shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    margin: 10,
},
clientsCardOrientation:{
  width : '100%',
  height : '90%',
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center',
},
cardIcon:{
backgroundColor : 'white',
width : 60,
height: 60,
justifyContent:'center',
alignItems:'center',
borderRadius : 40
},
titleCard: {
  fontFamily: 'Nunitobold',
  color: 'white',
  fontSize: 25,
  fontStyle: 'normal',
  fontWeight: '600', 
  letterSpacing: -1.5, 
  textAlign:'center',
},
centerCardOrientation:{
  height : '80%',
  justifyContent: 'space-around',
  alignItems : 'center',
},
subCard:{
  fontFamily: 'NunitoSans',
}
});
