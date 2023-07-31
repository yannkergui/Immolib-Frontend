import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";

import proHome from "./screens/proHome";
import proClients from "./screens/proClients";
import proVisites from "./screens/proVisites";
import proTchats from "./screens/proTchats";
import proAnnonces from "./screens/proAnnonces";

import persoHome from "./screens/persoHome";
import persoProfil from "./screens/persoProfil";
import persoVisites from "./screens/persoVisites";
import persoTchats from "./screens/persoTchats";

import PageBlanche from "./screens/PageBlanche";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Provider } from 'react-redux';
import user from './reducers/user';

import { configureStore } from '@reduxjs/toolkit';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user },
});


const TabNavigatorPro = () => {

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
      <Tab.Screen name="Home" component={persoHome}  />
      <Tab.Screen name="Mes tchats" component={persoTchats} />
      <Tab.Screen name="Mes visites" component={persoVisites} />
      <Tab.Screen name="Mon profil" component={persoProfil}/>
    </Tab.Navigator>
  );
};

export default function App() {

  

  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PageBlanche" component={PageBlanche} />
            <Stack.Screen name="TabNavigatorPro" component={TabNavigatorPro} />
            <Stack.Screen name="TabNavigatorPerso" component={TabNavigatorPerso} />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {},
});
