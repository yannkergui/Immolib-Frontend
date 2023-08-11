import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Image, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { maVisiteData } from "./reducers/maVisite";
import { ipAdress } from "./immolibTools";
import { monBienData } from './reducers/monBien';

  
  export default function SeLoger ({navigation}) {

    const dispatch = useDispatch();

    const [bienDataState, setBienDataState] = useState([])
  
    useEffect(() => {
      fetch(`http://${ipAdress}/biens`)
        .then((response) => response.json())
        .then((data) => {
          setBienDataState(data.biens)
        });
    }, []);


    let handlenavigate = (e) => {
console.log(e);
dispatch(monBienData(e))
navigation.navigate('FirstScreen')
    }

    const seLogerAnnonces = bienDataState.map(data => {
      console.log(data);
      return (
        <TouchableOpacity style={styles.annonceCard}
        >
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
              <TouchableOpacity style={styles.bouton} onPress={() => handlenavigate(data)}>
                <Text style={styles.text}>Prendre Rendez vous</Text>
              </TouchableOpacity>
            </View>
          </View>    
        </TouchableOpacity>
      );
    })
  
    return (

      <View style={styles.Fullpage}>
        <View style={styles.Fullpage2}>
        <Image style={styles.image} source={require('./assets/seLoger.png')} />  
        <ScrollView style={styles.scrollview}>
                {seLogerAnnonces}    
        </ScrollView>
        </View>
      </View>
     
    );
  }
  
  const styles = StyleSheet.create({
    Fullpage: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
    },
    button: {},

  annonceCard: {
    justifyContent: "center",
    // alignItems: "center",
    height: 180,
    width: "70%",
    backgroundColor: "#eb4034",
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
  image: {
    height: 120, 
    width:120,
  },
  scrollview:{
    width:450,
    marginLeft:120
  },
  bouton:{
    backgroundColor:'black',
    marginTop:5,
    height:25,
    justifyContent:'center',
    alignItems:'center',
    width:150,
  },
  text:{
    color:'white',
    textAlign:'center'
  },
  Fullpage2:{
    marginTop: 50,
    justifyContent:'center',
    alignItems:'center',
  }
  });
  