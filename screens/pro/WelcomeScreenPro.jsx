import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  FlatList,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { useFonts } from 'expo-font';

export default function WelcomeScreenPro({ navigation }) {

  const [fontsLoaded] = useFonts({
    Nunitobold: require('../../assets/fonts/Nunito/static/Nunito-Bold.ttf'),
    NunitoSans: require('../../assets/fonts/Nunito_Sans/static/NunitoSans_7pt-Medium.ttf')
  });
  // // if (!fontsLoaded) {
  // //   return <View/>;
  // // }

  // tableau des screens qui vont défiler dans le screen 
  const slides = [
    {
      id: '1',
      title: 'Immolib me simplifie la vie',
      subtitle: "Un outil simple pour gérer mes visites",
    },
    {
      id: '2',
      title: "Ne ratez aucune opportunité",
      subtitle: "Augmentez votre nombre d'entrées en relation et votre taux de visite",
    },
    {
      id: '3',
      title: "Des dossiers préremplis et qualifiés",
      subtitle: "Les clients vous donnent accès à leurs informations afin d'améliorer votre ciblage",
    },
  ];

  // setter de l'index sur lequel on se trouve afin de dynamiser la barre de position 
  const [currentSlideIndex, SetCurrentSlideIndex] = useState (0)
  const screenWidth = Dimensions.get('window').width;

  // au click sur bouton Skip on passe à la page de connection/inscription
  const handleSubmit = () => {
    navigation.navigate('ProConnectionScreen');
  }

  // constante permettant de 'mapper' le tableau des trois écrans avec appel de leur propriété
  const Slide = ({ item }) => {
    return (
      <View style={[styles.slide, {width: screenWidth }]}>
        <View style={styles.header}>
          <Image  style={styles.image} source={require('../../assets/IMMOLIB.png')}></Image>
        </View>
        <View style={styles.text}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <View style={styles.buttoncontainer}>
        <View style={styles.traits}>
        <View style={styles.traitsstyle}>
            {slides.map((_,index)=> (<View key={index} style={[styles.indicator, currentSlideIndex == index && {
              backgroundColor : 'white', width : 70
            }]}/>))}
        </View>
        <View style={styles.buttonlist}>
        <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Skip</Text>
        </TouchableOpacity>
        </View>
        </View>

        </View>
      </View>
    );
  };

// lors du onMomentumScrollEnd on récupère un tableau de propriété et nous voulons récupérer la propriété contentOffset.x 
// qui donne la position de l'écran sur lequel nous sommes.
//on divise ensuite cette position par la taille de l'écran afin d'avoir un index d'écran (0-1-2). On utilise enfin cet index pour faire passer l'état de la barre blanche à la position correspondante grace au seteur
const updateCurrentSlideIndex = e => {
  const contentOffsetx = e.nativeEvent.contentOffset.x;
  const currentIndex = Math.round(contentOffsetx / screenWidth);
  SetCurrentSlideIndex(currentIndex)
}

  return (
    <View style={styles.container}>
      {/* Couleur de fond en dégradé*/}
      <LinearGradient
        colors={['#BCCDB6', '#46AFA5']} // couleurs de départ et d'arrivée 
        start={{ x: 0, y: 0 }} // endroit de départ du gradient sur l'écran 
        end={{ x: 1, y: 1 }} // endroit d'arrivée du gradient sur l'écran 
        style={styles.background}
      >
      {/*flatlist = capacité à faire défiler trois écrans sur le même screen (flexdirection horizontal)*/}
        <FlatList
          /*on récupère la position exacte ou l'on se trouve sur les trois écrans*/
          onMomentumScrollEnd = {updateCurrentSlideIndex}
          pagingEnabled
          data={slides}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Slide item={item} />}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  slide: {
    justifyContent: "center",
    // alignItems: 'flex-start',
    marginLeft: 5,
  },
  title: {
    fontFamily: 'Nunitobold',
    color: 'white',
    fontSize: 50,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 60, 
    letterSpacing: -1.5, 
    marginBottom:50,
    marginRight : 15,
    paddingTop: 10,
    textAlign:'center',

  },
  subtitle: {
    fontFamily: 'NunitoSans',
    color: '#1F2937',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 34,
    letterSpacing: 0.25, 
    marginRight: 20,
    textAlign:'center',
  },
  traits: {
    // height: 10,
    justifyContent:'space-between',
    paddingHorizontal:30,
    alignItems:'center',
  },
  traitsstyle:{
    flexDirection : 'row',
    justifyContent: 'center',
    marginTop:80,
  },
  indicator:{
    height : 3,
    width : 10,
    backgroundColor:'grey',
    marginHorizontal: 3,
    borderRadius:2,
    marginTop: 40
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '40%',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 40,
  },
  buttonlist : {
    flexDirection:'row',
    marginTop: 5,
    padding :10
  },
  textButton : {
    color:'#1F2937',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Nunitobold',
  },
 
  buttoncontainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  image: {
    height : 150,
    alignItems: 'center',
  },
  header:{
    position: 'absolute',
    top: 100,
    justifyContent:'center',
    alignItems: 'center',
    width:'100%'
  },
 
});
