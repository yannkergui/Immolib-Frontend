import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { maVisiteData } from '../../reducers/maVisite';


export default function PersoVisites({navigation}) {

  const dispatch = useDispatch();

  const [visitesPerso, setVisitesPerso] = useState([]);

  useEffect(() => {
    fetch('http://192.168.10.138:3000/visites/user/64c773356d2e8188f9e877a7')
      .then(response => response.json())
      .then(data => {
        setVisitesPerso(data.VisitesTrouvees);
      })
  }, []);

  // constante relative au switch de changement de page 
  const page = [
    { label: "en attente de validation", value: "en attente" },
    { label: "confirmées", value: "confirmées" },
    { label: "passées", value: "passées" },
  ];


  // Etat relatif au changement de page via le switch

  const [activPage, setActivePage] = useState("en attente");

  const handleSubmit = (e) => {
    dispatch(maVisiteData(e));
    navigation.navigate('PersoMaVisite')

  };

  // 1er map relatif aux visites en attente 

  const visiteEnAttente = visitesPerso.map((data) => {
    
    
    const onPressMobileNumberClick = (number) => {

      let phoneNumber = '';
      if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
      } else {
        phoneNumber = `telprompt:${number}`;
      }
  
      Linking.openURL(phoneNumber);
   }

    if (data.statut === "en attente") { 
      return (
    <TouchableOpacity style={styles.touchable} onPress={() => { handleSubmit(data) }}>
        <View style={styles.visiteCard}>
          <View style={styles.lineCardheader}>
            <View style={styles.lineheader}>
            <FontAwesome name="calendar" size={25} color="white" />
            <Text  style={styles.Textheader}> Le {data.dateOfVisit} à {data.startTimeVisit}</Text>
            </View>
            <TouchableOpacity>
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineCard}>
            <View>
              <Text> {data.bienImmoId.titre}</Text>
              <Text>{data.bienImmoId.numRue} {data.bienImmoId.rue} {data.bienImmoId.codePostal}</Text>
              <View style={styles.agenceDiv}>
              <View style={styles.agence}>
                <Text> {data.prosId.nom} {data.prosId.prenom}</Text>
                <TouchableOpacity style={styles.teltouchable} onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
                 <Text style={styles.tel}> {data.prosId.tel}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <FontAwesome name="remove" size={30} color="#1F2937" />
              </TouchableOpacity>
              </View>
            </View>
          </View>    
        </View>
    </TouchableOpacity>
  
        
      );
    }
  });

  // 2iem map relatif aux visites passées

  const visitePassees = visitesPerso.map((data) => {
    if (data.statut === "passées") {
      return (
        <View style={styles.visiteCard}>
          <View style={styles.lineCardheader}>
            <View style={styles.lineheader}>
            <FontAwesome name="calendar" size={25} color="white" />
            <Text  style={styles.Textheader}> Le {data.date} à {data.startTimeVisit}</Text>
            </View>
            <TouchableOpacity>
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineCard}>
            <View>
            <Text> {data.bienImmoId.titre}</Text>
            <Text>{data.bienImmoId.numRue} {data.bienImmoId.rue} {data.bienImmoId.codePostal}</Text>
            <View style={styles.agenceDiv}>
            <View style={styles.agence}>
            <Text> {data.prosId.nom} {data.prosId.prenom}</Text>
            <TouchableOpacity style={styles.teltouchable} onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
            <Text style={styles.tel}> {data.prosId.tel}</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <FontAwesome name="remove" size={30} color="#1F2937" />
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
      );
    }
  });

  // 3iem map relatif aux visites confirmées

  const visiteConfirmees = visitesPerso.map((data) => {
    if (data.statut === "confirmées") {
      return (
        <View style={styles.visiteCard}>
          <View style={styles.lineCardheader}>
            <View style={styles.lineheader}>
            <FontAwesome name="calendar" size={25} color="white" />
            <Text  style={styles.Textheader}> Le {data.date} à {data.startTimeVisit}</Text>
            </View>
            <TouchableOpacity>
              <FontAwesome name="edit" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.lineCard}>
            <View>
            <Text> {data.bienImmoId.titre}</Text>
            <Text>{data.bienImmoId.numRue} {data.bienImmoId.rue} {data.bienImmoId.codePostal}</Text>
            <View style={styles.agenceDiv}>
            <View style={styles.agence}>
            <Text> {data.prosId.nom} {data.prosId.prenom}</Text>
            <TouchableOpacity style={styles.teltouchable} onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
            <Text style={styles.tel}> {data.prosId.tel}</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <FontAwesome name="remove" size={30} color="#1F2937" />
            </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
      );
    }
  });

  return (
    <View style={styles.container}>
      {/* Use LinearGradient as the container's background */}
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <Text style={styles.title}>Mes visites</Text>
        <View style={styles.pageContainer}>
          <SwitchSelector
            options={page}
            initial={0}
            onPress={(value) => setActivePage(value)}
            valuePadding={2.5}
            hasPadding
            style={styles.SwitchSelector3choix}
            buttonColor="#47AFA5"
            buttonMargin={1.5}
            animationDuration={250}
            height={45}
          />
        </View>
        <ScrollView style={styles.scrollview}>
        <View style={styles.cardContainer}>
          {activPage === "en attente" && visiteEnAttente}
          {activPage === "passées" && visitePassees}
          {activPage === "confirmées" && visiteConfirmees}
        </View>
        </ScrollView>
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

  pageContainer: {
    flexDirection: "row",
    borderColor: "#47AFA5",
    width: "90%",
    height: "10%",
    marginTop: 20,
  },

  pageActive: {
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
  page: {
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
  title: {
    color: "white",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "600",
    marginTop: "10%",
  },

  cardContainer: {
    width: "100%",
    alignItems: "center",
  },

  touchable:{
    width:'100%',
    alignItems:'center'
  },

  visiteCard: {
    justifyContent: "space-around",
    // alignItems: "center",
    height: 150,
    width: "90%",
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
    margin: 10,
  },
  lineCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  lineCardheader:{
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    borderBottomColor:'white',
    borderBottomWidth:2,
    paddingBottom:6,
  },

  SwitchSelector3choix: {
    width: "100%",
  },

  lineheader:{
    flexDirection:'row',
    alignItems:'center',
  },

  Textheader:{
  marginLeft: 10,
  color:'white',
  fontSize:15,
  },

  agence: {
    marginTop: 10,
    marginBottom:8,
  },
  agenceDiv:{
    flexDirection:'row',
    justifyContent:'space-between',
    width: '78.5%',
    alignItems: 'center',
  },

  tel:{
    color: 'blue',
  },
  teltouchable: {
    borderBottomColor:'blue',
    borderBottomWidth:1,
    borderBottomEndRadius : 20,
    borderBottomStartRadius: 20,
  },

  scrollview:{
    width: '100%',
  }
});

