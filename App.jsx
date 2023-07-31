import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import firstScreen from "./screens/firstScreen";
import ConnectionScreen from "./screens/perso/connectionScreen";

import proHome from "./screens/pro/proHome";
import proClients from "./screens/pro/proClients";
import proVisites from "./screens/pro/proVisites";
import proTchats from "./screens/pro/proTchats";
import proAnnonces from "./screens/pro/proAnnonces";
import WelcomeScreenPro from "./screens/pro/WelcomeScreenPro";
import monDossierPro from "./screens/pro/monDossierpro"

import persoHome from "./screens/perso/persoHome";
import persoProfil from "./screens/perso/persoProfil";
import persoVisites from "./screens/perso/persoVisites";
import persoTchats from "./screens/perso/persoTchats";
import WelcomeScreenPerso from "./screens/perso/WelcomeScreenPerso";
import persoMonDossier1 from "./screens/perso/persoMonDossier1";
import persoMonDossier2Loc from "./screens/perso/persoMonDossier2Loc";
import persoMonDossier3Loc from "./screens/perso/persoMonDossier3Loc";
import persoMonDossier2Achat from "./screens/perso/persoMonDossier2Achat";
import persoMonDossier3Achat from "./screens/perso/persoMonDossier3Achat";

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
          size = focused ? 50 : 24; // on initialise les tailles pour les icones (sélectionné et non sélectionné)
        } else if (route.name === "Mes tchats") {
          iconName = "commenting-o";
        } else if (route.name === "Mes annonces") {
          iconName = "map-signs";
        } else if (route.name === "Mes visites") {
          iconName = "calendar-o";
        } else if (route.name === "Mes clients") {
          iconName = "folder-open-o";
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
      
      <Tab.Screen name="Home" component={proHome} />
      <Tab.Screen name="Mes tchats" component={proTchats} />
      <Tab.Screen name="Mes annonces" component={proAnnonces} />
      <Tab.Screen name="Mes visites" component={proVisites} />
      <Tab.Screen name="Mes clients" component={proClients} />
    </Tab.Navigator>
  );
};

const TabNavigatorPerso = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "welcome") {
            iconName = "minus";
          } else if (route.name === "visites") {
            iconName = "minus";
          }
          return (
            <FontAwesome
              name={iconName}
              size={60}
              color={color}
              style={styles.icon}
            />
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#b2b2b2",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0, // For Android to remove the shadow
        },
        tabBarOptions: {
          showLabel: false, // Hide the tab labels
        },
      })}
    >
      <View style={styles.navbar}>
      <Tab.Screen name="Home" component={persoHome} />
      <Tab.Screen name="Mes tchats" component={persoTchats} />
      <Tab.Screen name="Mes visites" component={persoVisites} />
      <Tab.Screen name="Mon profil" component={persoProfil} />

      </View>
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} style={styles.main}>
            <Stack.Screen
            name="TabNavigatorPro"
            component={TabNavigatorPro}
            style={styles.tabNavigator}
          />
            <Stack.Screen name="PageTests" component={PageTests} />
            <Stack.Screen name="WelcomeScreenPro" component={WelcomeScreenPro} />
            <Stack.Screen name="WelcomeScreenPerso" component={WelcomeScreenPerso} />
            <Stack.Screen name="monDossier1" component={monDossier1} />
            <Stack.Screen name="monDossierPro" component={monDossierPro} />
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
