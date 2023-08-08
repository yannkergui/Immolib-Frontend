import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import { updateProProfilePhoto } from '../../reducers/pro';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";

import { proDatas } from '../../reducers/pro';

import ipAdress from "../../immolibTools"

export default function CameraScreen({navigation}) {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const pro = useSelector((state) => state.pro.value);


  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [flashMode, setFlashMode] = useState(FlashMode.off);

  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.5 });
    const formData = new FormData();

    formData.append('proProfilePhotoFromFront', {
      uri: photo.uri,
      name: 'proProfilePhotoTest.jpeg',
      type: 'image/jpeg',
     });
    fetch(`http://192.168.10.155:3000/pros/uploadPhoto`, {
      method: 'POST',
      body: formData,
    })
    .then((response) => response.json())
    .then((data) => {
        data.result && dispatch(updateProProfilePhoto(data.url))
        console.log("la photo est là :", pro.photo);
        fetch(`http://192.168.10.175:3000/pros/${pro.token}`, {
      method : 'PUT',
      headers : {'Content-Type' : 'application/json'},
      body : JSON.stringify ({
        photo: data.url,
      })
    })
      .then(response => response.json())
      navigation.navigate ('ProPreferences')
    })
      ;
    
  }

  if (!hasPermission || !isFocused) {
    return <View />;
  }

  return (
    
        <Camera type={type} flashMode={flashMode} ref={(ref) => cameraRef = ref} style={styles.camera}>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
              style={styles.button}
            >
              <FontAwesome name='rotate-right' size={25} color='#ffffff' />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setFlashMode(flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off)}
              style={styles.button}
            >
              <FontAwesome name='flash' size={25} color={flashMode === FlashMode.off ? '#ffffff' : '#e8be4b'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProPreferences')}
              style={styles.button}
            >
              <Text style={{color: "white", fontSize: 25}}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.snapContainer}>
            <TouchableOpacity onPress={() => cameraRef && takePicture()}>
              <FontAwesome name='circle-thin' size={95} color='#ffffff' />
            </TouchableOpacity>
          </View>
        </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
});
