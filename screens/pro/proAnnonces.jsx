import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";

export default function ProAnnonces() {

 // constante relative au switch de changement de page 

 const page = [
  { label: "Location", value: "location" },
  { label: "Vente", value: "vente" },
];

// Etat relatif au changement de page via le switch

const [activPage, setActivePage] = useState("Location");
console.log(activPage)

// annonceData (en dur pour le moment, sera par la suite un fetch de la BDD)

const annonces = [
  {
    titre: "Appartement 3 pièces",
    adresse: "77 rue victor hugo, 75000 Paris",
    photo: "https://i0.wp.com/courrierdesameriques.com/wp-content/uploads/2021/06/louer-un-appartement-cond-a-miami.jpeg?w=256&h=256&crop=1&ssl=1",
    transaction: "vente"
    
  },
  {
    titre: "Maison 160m²",
    adresse: "77 rue victor hugo, 75000 Paris",
    photo: "https://prod-saint-gobain-fr.content.saint-gobain.io/sites/saint-gobain.fr/files/2022-04/maison-contemporaine-la-maison-saint-gobain01.jpg",
    transaction: "vente"
  },
  {
    titre: "studio 20 m²",
    adresse: "77 rue victor hugo, 75000 Paris",
    photo: "https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/deco/pratique/travaux/plans-2d-3d/plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2/88947988-1-fre-FR/Plan-de-studio-3-facons-d-amenager-un-studio-de-35-m2.jpg",
    transaction: "location",
  },
  
];

// 1er map relatif aux annonces Vente

const annoncesVente = annonces.map((data) => {
  if (data.transaction === "vente") {
    return (
      <View style={styles.annonceCard}>
        <View style={styles.lineCard}>
        <Image
          source={{ uri: data.photo }}
          style= {styles.image}>
          </Image>
          <View style={styles.textContainer}>
          <Text style={styles.annonceTitre}>{data.titre} </Text>
          <Text style={styles.annonceAdresse}> {data.adresse}</Text>
          </View>
          
        </View>
        
      </View>
    );
  }
});

  // 2iem map relatif aux annonces location

  const annoncesLocation = annonces.map((data) => {
    if (data.transaction === "location") {
      return (
        <View style={styles.annonceCard}>
        <View style={styles.lineCard}>
        <Image
          source={{ uri: data.photo }}
          style= {styles.image}>
          </Image>
          <View style={styles.textContainer}>
          <Text style={styles.annonceTitre}>{data.titre} </Text>
          <Text style={styles.annonceAdresse}> {data.adresse}</Text>
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
      style={styles.container}
    >
        <View style={styles.header}> 
        <Text style={styles.Title}>Mes Clients</Text>
        <TouchableOpacity style={styles.iconcontainer}>
          <FontAwesome style={styles.icon} name='user' size={30} color='#1F2937' />
        </TouchableOpacity>
        </View>
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
        <StatusBar style="auto" />
        <View style={styles.cardContainer}>
          {activPage === "vente" && annoncesVente}
          {activPage === "location" && annoncesLocation}
        </View>
        <TouchableOpacity style={styles.next}>
          <Text>Créer une annonce</Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    width :'100%',
    top: 40, 
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
  
  pageContainer: {
    flexDirection: "row",
    borderColor: "#47AFA5",
    width: "90%",
    height: "10%",
    marginTop: 60,
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

  
  cardContainer: {
    width: "100%",
    alignItems: "center",
  },
  
  annonceCard: {
    justifyContent: "center",
    // alignItems: "center",
    height: 180,
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
    alignItems: "center",
    justifyContent: "space-between",
    margin: 15,
  },
  SwitchSelector3choix: {
    width: "100%",
  },

  image: {
    height: 120, 
    width:120,
    borderRadius: 25
  },
annonceTitre: {
  fontSize: 17,
  color: 'white',
  fontWeight: 'bold',
  marginBottom:10,
  
},
textContainer: {
  justifyContent: "space-between"
},

next: {
  alignItems: "center",
  justifyContent: "center",
  width: 150,
  height: 50,
  backgroundColor: "#47AFA5",
  borderColor: "white",
  borderWidth: 1,
  borderRadius: 10,
  marginTop: 10,
},
});
