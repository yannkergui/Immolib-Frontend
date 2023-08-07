import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Linking, Platform, ScrollView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { maVisiteData } from '../../reducers/maVisite';
import { maVilleData } from '../../reducers/maVille';


export default function PersoVisites({navigation}) {

  const dispatch = useDispatch();

  // etat pour stocker les infos reçues du backend
  const [visitesPerso, setVisitesPerso] = useState([]);

  // Fetch du backend au chargement de la page pour récupérer les visites liées au user
  useEffect(() => {
    fetch('http://192.168.10.154:3000/visites/user/64cccd2e0fd39de6f4a550dd')
      .then(response => response.json())
      .then(data => {
        setVisitesPerso(data.VisitesTrouvees);
      })
  }, []);

  // constante relative au switch de changement de page 
  const page = [
    { label: "en attente de validation", value: "en attente" },
    { label: "confirmées", value: "confirmé" },
    { label: "passées", value: "passées" },
  ];


  // Etat relatif au changement de page via le switch
  const [activPage, setActivePage] = useState("en attente");

  // fonction de click sur la Card visite pour dispatcher les infos dans le reducer afin de les afficher sur le screen suivant
  // et naviguer vers l'écran perso ma visite
  const handleSubmit = (e) => {
    dispatch(maVisiteData(e));
    fetch (`https://api-adresse.data.gouv.fr/search/?q=${e.bienImmoId.numeroRue}+${e.bienImmoId.rue}+${e.bienImmoId.codePostal}`)
    .then((response) => response.json())
    .then((data) => {console.log(data.features[0]);
      const newAdress = {
        latitude:  data.features[0].geometry.coordinates[1],
        longitude:  data.features[0].geometry.coordinates[0],
      };
      dispatch(maVilleData(newAdress))
    
    })
    navigation.navigate('PersoMaVisite')

  };

  // 1er map relatif aux visites en attente 
  const visiteEnAttente = visitesPerso.map((data) => {
    
    // fonction pour gérer les appels lorsqu'on clique sur le numéro de téléphone
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
                {/* <TouchableOpacity style={styles.teltouchable} onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}> */}
                 <Text style={styles.tel}> {data.prosId.tel}</Text>
                {/* </TouchableOpacity> */}
              </View>
              <View style={styles.iconCard}>
              <TouchableOpacity style={styles.iconcontainer}  onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
                    <FontAwesome style={styles.icon} name='phone' size={30} color='#1F2937' />
                </TouchableOpacity>
              <TouchableOpacity style={styles.iconcontainer}>
                <FontAwesome name="remove" size={30} color="#1F2937" />
              </TouchableOpacity>
              </View>
              </View>
            </View>
          </View>    
        </View>
    </TouchableOpacity>
  
        
      );
    }
  });

  // 2iem map relatif aux visites passées

  const visitePassees = visitesPerso.map((data) => { console.log(data);
    if (data.statut === "passées") {
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
                  <View style={styles.iconCard}>
                  <TouchableOpacity style={styles.iconcontainer}  onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
                        <FontAwesome style={styles.icon} name='phone' size={30} color='#1F2937' />
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.iconcontainer}>
                    <FontAwesome name="remove" size={30} color="#1F2937" />
                  </TouchableOpacity>
                  </View>
                  </View>
                </View>
              </View>    
            </View>
        </TouchableOpacity>
      );
    }
  });

  // 3iem map relatif aux visites confirmées

  const visiteConfirmees = visitesPerso.map((data) => {
    if (data.statut === "confirmé") {
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
                  <View style={styles.iconCard}>
                  <TouchableOpacity style={styles.iconcontainer}  onPress={() => { onPressMobileNumberClick(data.prosId.tel)}}>
                        <FontAwesome style={styles.icon} name='phone' size={30} color='#1F2937' />
                    </TouchableOpacity>
                  <TouchableOpacity style={styles.iconcontainer}>
                    <FontAwesome name="remove" size={30} color="#1F2937" />
                  </TouchableOpacity>
                  </View>
                  </View>
                </View>
              </View>    
            </View>
        </TouchableOpacity>
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
          {activPage === "confirmé" && visiteConfirmees}
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
  scrollview:{
    width: '100%',
  },
  iconcontainer :{
    top : 0,
    backgroundColor : 'white',
    width : 50,
    height: 50,
    borderRadius : 100,
    justifyContent:'center',
    alignItems:'center',
    marginRight:10,
    },
    iconCard:{
      flexDirection:'row',
      marginLeft: 160,
    }
});

