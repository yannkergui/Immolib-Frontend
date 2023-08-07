import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function ProAnnonces( {navigation} ) {

  const myIPAdress='192.168.10.156';

  const pro = useSelector((state) => state.pro.value);


  const [biensPro, setBiensPro] = useState([]);


   // Fetch du backend pour récupérer les annonces liées au pro 

   useEffect(() => {
    fetch(`http://${myIPAdress}:3000/biens/pro/64d046c3588b8ddd65d8cbcf`)
      .then(response => response.json())
      .then(data => {
        setBiensPro(data.biens)
        // console.log(data.bien)
      })
  }, []);

 

 // constante relative au switch de changement de page 

 const page = [
  { label: "Location", value: "location" },
  { label: "Vente", value: "vente" },
];

// Etat relatif au changement de page via le switch

const [activPage, setActivePage] = useState("location");

const handleCreerAnnonce = () => {navigation.navigate("CreationAnnonce")}

// 1er map relatif aux annonces Vente

const annoncesVente = biensPro.map((data) => {
  if (data.transaction === "vente") {
    return (
      <View style={styles.annonceCard}>
        <View style={styles.lineCard}>
          <View style={styles.imageConatainer}>
          <Image
          source={{ uri: data.photo }}
          style= {styles.image}>
          </Image>
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.annonceTitre}>{data.titre} </Text>
          <Text style={styles.annonceAdresse}> {data.numeroRue} {data.rue} {data.ville} {data.codePostal}</Text>
          </View>
        </View>    
      </View>
    );
  }
});

  // 2iem map relatif aux annonces location

  const annoncesLocation = biensPro.map((data) => {
    if (data.transaction === "location") {
      return (
        <View style={styles.annonceCard}>
        <View style={styles.lineCard}>
          <View style={styles.imageConatainer}>
          <Image
          source={{ uri: data.photo }}
          style= {styles.image}>
          </Image>
          </View>
          <View style={styles.textContainer}>
          <Text style={styles.annonceTitre}>{data.titre} </Text>
          <Text style={styles.annonceAdresse}> {data.numeroRue} {data.rue} {data.ville} {data.codePostal}</Text>
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
        <Text style={styles.Title}>Mes Annonces</Text>
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
          {activPage === "location" && annoncesLocation}
          {activPage === "vente" && annoncesVente}
        </View>
        <TouchableOpacity style={styles.next} onPress={handleCreerAnnonce}>
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

  imageConatainer: {
    width: "50%"
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
  justifyContent: "space-between",
  width: "50%", 
  maxWidth: "50%",
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
