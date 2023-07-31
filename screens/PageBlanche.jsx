import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { Component } from "react";

export default function PageBlanche(props) {

  

  const handleClick = () => {
    props.navigation.navigate("TabNavigator");
  };
  

  return (
    // <SafeAreaView>
    <View style={styles.Fullpage}>
      <Text>PageBlanche</Text>
      <TouchableOpacity onPress={() => handleClick()}>
        <Text style={styles.button}>Go to Tabs</Text>
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
