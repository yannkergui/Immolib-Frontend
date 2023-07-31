import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { Component } from "react";

import { useSelector } from 'react-redux';
import { UserState } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { profilage } from "../reducers/user";

export default function pageBlanche(props) {

  const dispatch = useDispatch()

  const handleClickPro = () => {
    props.navigation.navigate("WelcomeScreenPro");
  };

  const handleClickPerso = () => {
    props.navigation.navigate("WelcomeScreenPerso");
  };

  

  return (
    // <SafeAreaView>
    <View style={styles.Fullpage}>
      <TouchableOpacity onPress={() => handleClickPro()}>
        <Text style={styles.button}>Go to PRO</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleClickPerso()}>
        <Text style={styles.button}>Go to PERSO</Text>
      </TouchableOpacity>
    </View>
    // </SafeAreaView>
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
});
