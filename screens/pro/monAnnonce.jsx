import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import maVille from "../../reducers/maVille";
import { ipAdress } from "../../immolibTools";



export default function MonAnnonce({ navigation }) {
  const monBien = useSelector((state) => state.monBien.value);
  const coordonnees = useSelector((state) => state.maVille.value);


  console.log("test", coordonnees);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.container}
      >
        <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome
              style={styles.icon}
              name="chevron-left"
              size={20}
              color="#1F2937"
              right={60}
              />
          </TouchableOpacity>
          <Text style={styles.Title}>Mon annonce</Text>
          <TouchableOpacity style={styles.iconcontainer}>
            <FontAwesome
              style={styles.icon}
              name="user"
              size={30}
              color="#1F2937"
              />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image
            source={{
              uri: monBien.photo,
            }}
            style={styles.image}
          ></Image>
          <View style={styles.lineCard}>
            <Text style={styles.annonceTitre}>{monBien.titre}</Text>
          </View>
          <Text>
            {monBien.numeroRue} {monBien.rue}, {monBien.codePostal},{" "}
            {monBien.ville}{" "}
          </Text>
          <View style={styles.descriptionCard}>
            <Text>Description : {monBien.description}</Text>
          </View>
          <View style={styles.SecondeLineCard}>
            <View>
              <Text>Transaction : {monBien.transaction} </Text>
              <Text>Type de bien : {monBien.type}</Text>
              <Text>Surface : {monBien.surface} m² </Text>
              <Text>Pièces : {monBien.nbPièces} </Text>
              <Text>Chambres : {monBien.nbChambres}</Text>
              <Text>Loyer : {monBien.loyer} </Text>
              <Text>Prix de vente : {monBien.prixVente} </Text>
            </View>
          </View>
          <View style= {styles.mapView}>
            <MapView style= {styles.map}
                    initialRegion={{
                      latitude: `${coordonnees.latitude}`,
                      longitude: `${coordonnees.longitude}`,
                      latitudeDelta: 0.008,
                      longitudeDelta: 0.007,
                    }}
                    >
                      <Marker style= {styles.marker} coordinate={{latitude:`${coordonnees.latitude}` ,longitude:`${coordonnees.longitude}`}} />
            </MapView>
          </View>
        </ScrollView>
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
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, 
  },
  iconcontainer: {
    position: "absolute",
    left: 330,
    top: 0,
    backgroundColor: "white",
    width: 50,
    height: 50,
    paddingLeft: 15,
    paddingTop: 8.5,
    borderRadius: 100,
  },

  Title: {
    fontFamily: "Nunitobold",
    color: "white",
    fontSize: 35,
    fontStyle: "normal",
    fontWeight: "600",
    letterSpacing: -1.5,
    textAlign: "center",
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
  },
  contentContainer: {
    width: "100%",
    // height: "80%",
    // borderWidth: 1,
    borderColor: "white",
    top: 50,
    alignItems: "center",
    marginBottom: 50,
  },
  annonceTitre: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  descriptionCard: {
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: 15,
    padding: 15,
    width: 300,
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
  SecondeLineCard: {
    flexDirection: "row",
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: 15,
    padding: 15,
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

  liste: {
    right: 10,
  },
  map:{
    height: 250,
    marginBottom: 100,
    borderRadius:20,
  },
  mapView:{
    width:370,
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
