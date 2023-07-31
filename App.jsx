import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import welcomeScreen from './screens/welcomeScreen';
import homePage from './screens/homePage';
import visites from './screens/mesVisites';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firstScreen from './screens/firstScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = '';
          if (route.name === 'welcome') {
            iconName = 'minus';
                 } else if (route.name === 'visites') {
            iconName = 'minus';
          }
          return <FontAwesome name={iconName} size={60} color={color} style={styles.icon} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#b2b2b2',
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0, // For Android to remove the shadow
        },
        tabBarOptions: {
          showLabel: false, // Hide the tab labels
        },
      })}
    >
      <Tab.Screen name="firstScreen" component={firstScreen} />
      <Tab.Screen name="visites" component={visites} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="welcome" component={welcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon : {
   
  }
});
