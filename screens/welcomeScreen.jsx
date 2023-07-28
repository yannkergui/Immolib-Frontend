import React, { useState } from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

export default function welcomeScreen({ navigation }) {
  const slides = [
    {
      id: '1',
      image: require('../assets/welcomepage.jpg'),
      title: 'premiere page',
      subtitle: 'On est les meilleurs',
    },
    {
      id: '2',
      image: require('../assets/welcomepage.jpg'),
      title: 'deuxieme page',
      subtitle: 'On est les meilleurs',
    },
    {
      id: '3',
      image: require('../assets/welcomepage.jpg'),
      title: 'troisieme page',
      subtitle: 'On est les meilleurs',
    },
  ];

  const Slide = ({ item }) => {
    const screenWidth = Dimensions.get('window').width;
    return (
      <View style={[styles.slide, {width: screenWidth }]}>
        {/* <Image source={item.image} style={styles.image} /> */}
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <View style={styles.traits}>
        <View style={styles.traitsstyle}>
            {slides.map((_,index)=> (<View style={[styles.indicator]}/>))}
        </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Use LinearGradient as the container's background */}
      <LinearGradient
        colors={['#BCCDB6', '#46AFA5']} // Set your desired gradient colors
        start={{ x: 0, y: 0 }} // Start point of the gradient
        end={{ x: 1, y: 1 }} // End point of the gradient
        style={styles.background}
      >
        <FlatList
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
    width: '100%',
    backgroundColor: '#e8be4b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
  },
  slide: {
    justifyContent: 'center',
    // alignItems: 'flex-start',
    marginLeft: 5,
  },
  title: {
    fontFamily: 'Nunito',
    color: 'white',
    fontSize: 96,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 96, // You may need to adjust this value based on your requirements
    letterSpacing: -1.5, // You may need to adjust this value based on your requirements
    marginBottom:50
  },
  subtitle: {
    fontFamily: 'Nunito',
    color: '#1F2937',
    fontSize: 34,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 34, // You may need to adjust this value based on your requirements
    letterSpacing: 0.25, // You may need to adjust this value based on your requirements
  },
  traits: {
    // height: 10,
    justifyContent:'space-between',
    paddingHorizontal:20,
    alignItems:'center',
  },
  traitsstyle:{
    flexDirection : 'row',
    justifyContent: 'center',
    marginTop:80,

  },
  indicator:{
height : 10,
width : 10,
backgroundColor:'grey',
marginHorizontal: 3,
borderRadius:2,
  }
});

