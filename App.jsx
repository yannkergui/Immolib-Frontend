import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import ProHome from "./screens/pro/proHome";
import ProClients from "./screens/pro/proClients";
import ProVisites from "./screens/pro/proVisites";
import ProTchats from "./screens/pro/proTchats";
import ProAnnonces from "./screens/pro/proAnnonces";
import WelcomeScreenPro from "./screens/pro/WelcomeScreenPro";
import MonDossierPro from "./screens/pro/monDossierpro"
import ProConnectionScreen from "./screens/pro/proConnectionScreen";
import ProPreferences from "./screens/pro/proPreferences";
import FirstScreen from "./screens/firstScreen";
import GrosTest from "./screens/perso/test";

import ConnectionScreen from "./screens/perso/connectionScreen";
import PersoHome from "./screens/perso/persoHome";
import PersoProfil from "./screens/perso/persoProfil";
import PersoVisites from "./screens/perso/persoVisites";
import PersoTchats from "./screens/perso/persoTchats";
import WelcomeScreenPerso from "./screens/perso/WelcomeScreenPerso";
import PersoMonDossier1 from "./screens/perso/persoMonDossier1";
import PersoMonDossier2Loc from "./screens/perso/persoMonDossier2Loc";
import PersoMonDossier3Loc from "./screens/perso/persoMonDossier3Loc";
import PersoMonDossier2Achat from "./screens/perso/persoMonDossier2Achat";
import PersoMonDossier3Achat from "./screens/perso/persoMonDossier3Achat";
import PageTests from "./screens/pageTests";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Provider } from "react-redux";
import user from "./reducers/user";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { user },
});

const TabNavigatorPro = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        let iconName = "";
        if (route.name === "Home") {
          iconName = "home";
          size = focused ? 40 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné),
        } else if (route.name === "Mes tchats") {
          iconName = "commenting-o";
          size = focused ? 40 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné),
        } else if (route.name === "Mes annonces") {
          iconName = "map-signs";
          size = focused ? 40 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné)
        } else if (route.name === "Mes visites") {
          iconName = "calendar-o";
          size = focused ? 40 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné)
        } else if (route.name === "Mes clients") {
          iconName = "folder-open-o";
          size = focused ? 40 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné)
        }
          return (
            <FontAwesome
              name={iconName}
              size={size}
              color={color}
              style={styles.icon}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => {
          if (!focused) {
            return <Text style={styles.tabLabel}>{route.name}</Text>;
          }
          return null;
        },
        tabBarActiveTintColor: '#1F2937',
        tabBarActiveBackgroundColor: 'white', // on initialise la couleur pour la partie da Tab Bar sélectionnée 
        
        tabBarInactiveTintColor: "#b2b2b2",
        headerShown: false,
        tabBarStyle: { // on initialise le style pour l'ensemble de la Tab Bar
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
          paddingBottom: 10,
          paddingTop: 4,
          paddingLeft: 5,
          paddingRight:5,
          marginBottom: 20,
          left : 20,
          right : 20
        },
        tabBarItemStyle: { // on initialise le style pour l'icone sélectionné
          borderRadius: 30,
          height: 50,
          justifyContent:'center'
        },

      })}
    >
      
      <Tab.Screen name="Home" component={ProHome} />
      <Tab.Screen name="Mes tchats" component={ProTchats} />
      <Tab.Screen name="Mes annonces" component={ProAnnonces} />
      <Tab.Screen name="Mes visites" component={ProVisites} />
      <Tab.Screen name="Mes clients" component={ProClients} />
    </Tab.Navigator>
  );
};

const TabNavigatorPerso = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        let iconName = "";
        if (route.name === "Home") {
          iconName = "home";
          size = focused ? 40 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné),
        } else if (route.name === "Mes tchats") {
          iconName = "commenting-o";
          size = focused ? 40 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné),
        } else if (route.name === "Mes visites") {
          iconName = "calendar-o";
          size = focused ? 40 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné)
        } else if (route.name === "Mon profil") {
          iconName = "user";
          size = focused ? 40 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné)
        }
          return (
            <FontAwesome
              name={iconName}
              size={size}
              color={color}
              style={styles.icon}
            />
          );
        },
        tabBarLabel: ({ focused, color }) => {
          if (!focused) {
            return <Text style={styles.tabLabel}>{route.name}</Text>;
          }
          return null;
        },
        tabBarActiveTintColor: '#1F2937',
        tabBarActiveBackgroundColor: 'white', // on initialise la couleur pour la partie da Tab Bar sélectionnée 
        
        tabBarInactiveTintColor: "#b2b2b2",
        headerShown: false,
        tabBarStyle: { // on initialise le style pour l'ensemble de la Tab Bar
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
          paddingBottom: 10,
          paddingTop: 4,
          paddingLeft: 5,
          paddingRight:5,
          marginBottom: 20,
          left : 20,
          right : 20
        },
        tabBarItemStyle: { // on initialise le style pour l'icone sélectionné
          borderRadius: 30,
          height: 50,
          justifyContent:'center'
        },

      })}
    >
      
      <Tab.Screen name="Home" component={PersoHome} />
      <Tab.Screen name="Mes tchats" component={PersoTchats} />
      <Tab.Screen name="Mes visites" component={PersoVisites} />
      <Tab.Screen name="Mon profil" component={PersoProfil} />
    </Tab.Navigator>
  );
};


export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator screenOptions={{ headerShown: false }} style={styles.main}>
              <Stack.Screen
              name="TabNavigatorPro"
              component={TabNavigatorPro}
              style={styles.tabNavigator}
            />
            <Stack.Screen name="ProVisites" component={ProVisites} />
            <Stack.Screen name="PageTests" component={PageTests} />
            <Stack.Screen name="WelcomeScreenPro" component={WelcomeScreenPro} />
            <Stack.Screen name="WelcomeScreenPerso" component={WelcomeScreenPerso} />
            <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} />
            <Stack.Screen name="PersoHome" component={PersoHome}/>
            <Stack.Screen name="PersoMonDossier1" component={PersoMonDossier1} />
            <Stack.Screen name="PersoMonDossier2Loc" component={PersoMonDossier2Loc} />
            <Stack.Screen name="PersoMonDossier3Loc" component={PersoMonDossier3Loc} />
            <Stack.Screen name="PersoMonDossier2Achat" component={PersoMonDossier2Achat} />
            <Stack.Screen name="PersoMonDossier3Achat" component={PersoMonDossier3Achat} />
            <Stack.Screen name="PersoProfil" component={PersoProfil} />
            <Stack.Screen name="PersoVisites" component={PersoVisites} />
            <Stack.Screen name="MonDossierpro" component={MonDossierPro} />
            <Stack.Screen name="ProAnnonces" component={ProAnnonces} />
            <Stack.Screen name="ProClients" component={ProClients} />
            <Stack.Screen name="ProConnectionScreen" component={ProConnectionScreen} />
            <Stack.Screen name="ProHome" component={ProHome} />
            <Stack.Screen name="ProPreferences" component={ProPreferences} />
            <Stack.Screen name="ProTchats" component={ProTchats} />
            <Stack.Screen name="FirstScreen" component={FirstScreen} />
=======
          <Stack.Navigator screenOptions={{ headerShown: false }} style={styles.main}>
              <Stack.Screen name="PersoProfil" component={PersoProfil} />
              <Stack.Screen name="PageTests" component={ProPreferences} />
              <Stack.Screen
                name="TabNavigatorPro"
                component={TabNavigatorPro}
                style={styles.tabNavigator}
              />
              <Stack.Screen name="ProVisites" component={ProVisites} />
              <Stack.Screen name="WelcomeScreenPro" component={WelcomeScreenPro} />
              <Stack.Screen name="WelcomeScreenPerso" component={WelcomeScreenPerso} />
              <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} />
              <Stack.Screen name="PersoHome" component={PersoHome}/>
              <Stack.Screen name="PersoMonDossier1" component={PersoMonDossier1} />
              <Stack.Screen name="PersoMonDossier2Loc" component={PersoMonDossier2Loc} />
              <Stack.Screen name="PersoMonDossier3Loc" component={PersoMonDossier3Loc} />
              <Stack.Screen name="PersoMonDossier2Achat" component={PersoMonDossier2Achat} />
              <Stack.Screen name="PersoMonDossier3Achat" component={PersoMonDossier3Achat} />
              
              <Stack.Screen name="PersoVisites" component={PersoVisites} />
              <Stack.Screen name="MonDossierpro" component={MonDossierPro} />
              <Stack.Screen name="ProAnnonces" component={ProAnnonces} />
              <Stack.Screen name="ProClients" component={ProClients} />
              <Stack.Screen name="ProConnectionScreen" component={ProConnectionScreen} />
              <Stack.Screen name="ProHome" component={ProHome} />
              <Stack.Screen name="ProPreferences" component={ProPreferences} />
              <Stack.Screen name="ProTchats" component={ProTchats} />
              <Stack.Screen name="FirstScreen" component={FirstScreen} />
>>>>>>> a0bbe6e16d32cf86db9f048effd75e97d105a105
              <Stack.Screen
              name="TabNavigatorPerso"
              component={TabNavigatorPerso}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 10,
  },
});
