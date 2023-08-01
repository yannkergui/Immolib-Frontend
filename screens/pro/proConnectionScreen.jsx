import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ProConnectionScreen(props) {

    function toProPref () {
        props.navigation.navigate("proPreferences");
    }




  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => toProPref()}>
            <Text>Vers les préférences</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center',
},
})