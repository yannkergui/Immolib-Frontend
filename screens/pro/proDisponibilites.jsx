import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  LayoutAnimation,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchSelector from "react-native-switch-selector";
import Slider from '@react-native-community/slider';
import moment from 'moment';
import {refresh} from "../../reducers/refresher";
import { ipAdress } from "../../immolibTools";



export default function ProDisponibilites({ navigation }) {

    const dispatch = useDispatch();
    const proId = useSelector((state) => state.pro.value);
    const refresher = useSelector((state) => state.refresher.value);


    const [isLundiEnabled, setLundiEnabled] = useState({
        isEnabled: false,
        startSelectedHours: 0,
        endSelectedHours: 0,
        startSelectedHours: 0,
        endSelectedHours:0,
        dispoId:0,
        dayOfWeek: 'lundi'

    });
    const [isMardiEnabled, setMardiEnabled] = useState({
        isEnabled: false,
        startSelectedHours: 0,
        endSelectedHours: 0,
        startSelectedHours: 0,
        endSelectedHours:0,
        dispoId:0,
        dayOfWeek: 'mardi'

    });
    const [isMercrediEnabled, setMercrediEnabled] = useState({
        isEnabled: false,
        startSelectedHours: 0,
        endSelectedHours: 0,
        startSelectedHours: 0,
        endSelectedHours:0,
        dispoId:0,
        dayOfWeek: 'mercredi'

    });
    const [isJeudiEnabled, setJeudiEnabled] = useState({
        isEnabled: false,
        startSelectedHours: 0,
        endSelectedHours: 0,
        startSelectedHours: 0,
        endSelectedHours:0,
        dispoId:0,
        dayOfWeek: 'jeudi'

    });
    const [isVendrediEnabled, setVendrediEnabled] = useState({
        isEnabled: false,
        startSelectedHours: 0,
        endSelectedHours: 0,
        startSelectedHours: 0,
        endSelectedHours:0,
        dispoId:0,
        dayOfWeek: 'vendredi'

    });
    const [isSamediEnabled, setSamediEnabled] = useState({
        isEnabled: false,
        startSelectedHours: 0,
        endSelectedHours: 0,
        startSelectedHours: 0,
        endSelectedHours:0,
        dispoId:0,
        dayOfWeek: 'samedi'

    });
    const [isDimancheEnabled, setDimancheEnabled] = useState({
        isEnabled: false,
        startSelectedHours: 0,
        endSelectedHours: 0,
        startSelectedHours: 0,
        endSelectedHours:0,
        dispoId:0,
        dayOfWeek: 'dimanche'
    });

    useEffect(() => {
        fetch(`http://${ipAdress}/disponibilites/${proId._id}`)
          .then(response => response.json())
          .then(data => {
          if(data)
            {data.data.forEach(item => {
              if (item.dayOfWeek === 'lundi') {
                setLundiEnabled({
                  isEnabled: true,
                  startTime: item.startTimeDispo,
                  endTime: item.endTimeDispo,
                  startSelectedHours: item.startTimeDispo,
                  endSelectedHours: item.endTimeDispo,
                  dispoId:item._id,
                  dayOfWeek: 'lundi'

                });
              } else if (item.dayOfWeek === 'mardi') {
                setMardiEnabled({
                  isEnabled: true,
                  startTime: item.startTimeDispo,
                  endTime: item.endTimeDispo,
                  startSelectedHours: item.startTimeDispo,
                  endSelectedHours: item.endTimeDispo,
                  dispoId:item._id,
                  dayOfWeek: 'mardi'
                });
              } else if (item.dayOfWeek === 'mercredi') {
                setMercrediEnabled({
                  isEnabled: true,
                  startTime: item.startTimeDispo,
                  endTime: item.endTimeDispo,
                  startSelectedHours: item.startTimeDispo,
                  endSelectedHours: item.endTimeDispo,
                  dispoId:item._id,
                  dayOfWeek: 'mercredi'
                });
              } else if (item.dayOfWeek === 'jeudi') {
                setJeudiEnabled({
                  isEnabled: true,
                  startTime: item.startTimeDispo,
                  endTime: item.endTimeDispo,
                  startSelectedHours: item.startTimeDispo,
                  endSelectedHours: item.endTimeDispo,
                  dispoId:item._id,
                  dayOfWeek: 'jeudi'

                });
              } else if (item.dayOfWeek === 'vendredi') {
                setVendrediEnabled({
                  isEnabled: true,
                  startTime: item.startTimeDispo,
                  endTime: item.endTimeDispo,
                  startSelectedHours: item.startTimeDispo,
                  endSelectedHours: item.endTimeDispo,
                  dispoId:item._id,
                  dayOfWeek: 'vendredi'

                });
              } else if (item.dayOfWeek === 'samedi') {
                setSamediEnabled({
                  isEnabled: true,
                  startTime: item.startTimeDispo,
                  endTime: item.endTimeDispo,
                  startSelectedHours: item.startTimeDispo,
                  endSelectedHours: item.endTimeDispo,
                  dispoId:item._id,
                  dayOfWeek: 'samedi'

                });
              } else if (item.dayOfWeek === 'dimanche') {
                setDimancheEnabled({
                  isEnabled: true,
                  startTime: item.startTimeDispo,
                  endTime: item.endTimeDispo,
                  startSelectedHours: item.startTimeDispo,
                  endSelectedHours: item.endTimeDispo,
                  dispoId:item._id,
                  dayOfWeek: 'dimanche'

                });
              }
            });}
          });
      }, [refresher]);
      

      const renderDaySwitch = (dayState, setDayState) => {
        return (
          <View style={styles.dayContainer}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={dayState.isEnabled ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => {
                if (dayState.isEnabled) {
                    console.log(dayState);
                    fetch(`http://${ipAdress}/disponibilites/${dayState.dispoId}`, {
                    method: 'DELETE'})
                    .then(response => response.json())
                    .then(data => {
                    console.log(data)
                    dispatch(refresh())
                    })
                }
                setDayState(prevState => ({ ...prevState, isEnabled: !prevState.isEnabled }));
            }}
            value={dayState.isEnabled}
            />
          </View>
        );
    }
      
    let handleSubmit = (e) => {
        console.log(e);
     let endTime=moment().startOf('day').add(e.endSelectedHours, 'hours').format('HH:mm')
     let startTime=moment().startOf('day').add(e.startSelectedHours, 'hours').format('HH:mm')

        if(e.startTime) {
        fetch(`http://${ipAdress}/disponibilites/dateSearch/${proId._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({dayOfWeek: e.dayOfWeek , startTimeDispo:startTime , endTimeDispo: endTime})
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              dispatch(refresher())
              })
    
    }
        else {
        fetch(`http://${ipAdress}/disponibilites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pro: proId._id , dayOfWeek: e.dayOfWeek , startTimeDispo:startTime , endTimeDispo: endTime})
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              dispatch(refresh())
              })

    }
    }


    

    return (
        <View style={styles.container}>
          <LinearGradient
            colors={["#BCCDB6", "#46AFA5"]} // Set your desired gradient colors
            start={{ x: 0, y: 0 }} // Start point of the gradient
            end={{ x: 1, y: 1 }} // End point of the gradient
            style={styles.container}
          >
            <View style={styles.header}>
                    <TouchableOpacity  onPress={() => navigation.goBack()}>
                        <FontAwesome style={styles.icon} name='chevron-left' size={20} color='#1F2937' />
                    </TouchableOpacity> 
                    <Text style={styles.Title}>Mes Disponibilités</Text>
                    <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleLogout()}}>
                        <FontAwesome style={styles.icon} name='sign-out' size={30} color='#1F2937' />
                    </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollview}>
            <View style={styles.components}>
            {renderDaySwitch(isLundiEnabled, setLundiEnabled)}
            <Text>Lundi</Text>
                <View style={styles.slider}>
                <Text>Début</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={23.5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setLundiEnabled({...isLundiEnabled,startSelectedHours:value})}
                value={isLundiEnabled.startTime}
                step= {0.5}
                />
                {isLundiEnabled.startSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isLundiEnabled.startSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isLundiEnabled.startTime}</Text>
                }
                <Text>Fin</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={isLundiEnabled.startSelectedHours+0.5}
                maximumValue={24}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setLundiEnabled({...isLundiEnabled,endSelectedHours:value})}
                value={isLundiEnabled.endTime}
                step= {0.5}
                />
                 {isLundiEnabled.endSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isLundiEnabled.endSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isLundiEnabled.endTime}</Text>
                }
                </View>
                <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit(isLundiEnabled)}}>
                    <FontAwesome style={styles.icon} name='check' size={30} color='#1F2937' />
                </TouchableOpacity>
            </View>
            <View style={styles.components}>
            {renderDaySwitch(isMardiEnabled, setMardiEnabled)}
            <Text>Mardi</Text>
                <View style={styles.slider}>
                <Text>Début</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={23.5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setMardiEnabled({...isMardiEnabled,startSelectedHours:value})}
                value={isMardiEnabled.startTime}
                step= {0.5}
                />
                {isMardiEnabled.startSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isMardiEnabled.startSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isMardiEnabled.startTime}</Text>
                }
                <Text>Fin</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={isMardiEnabled.startSelectedHours+0.5}
                maximumValue={24}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setMardiEnabled({...isMardiEnabled,endSelectedHours:value})}
                value={isMardiEnabled.endTime}
                step= {0.5}
                />
                 {isMardiEnabled.endSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isMardiEnabled.endSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isMardiEnabled.endTime}</Text>
                }
                </View>
                <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit(isMardiEnabled)}}>
                    <FontAwesome style={styles.icon} name='check' size={30} color='#1F2937' />
                </TouchableOpacity>
            </View>
            <View style={styles.components}>
            {renderDaySwitch(isMercrediEnabled, setMercrediEnabled)}
            <Text>Mercredi</Text>
                <View style={styles.slider}>
                <Text>Début</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={23.5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setMercrediEnabled({...isMercrediEnabled,startSelectedHours:value})}
                value={isMercrediEnabled.startTime}
                step= {0.5}
                />
                {isMercrediEnabled.startSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isMercrediEnabled.startSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isMercrediEnabled.startTime}</Text>
                }
                <Text>Fin</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={isMercrediEnabled.startSelectedHours+0.5}
                maximumValue={24}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setMercrediEnabled({...isMercrediEnabled,endSelectedHours:value})}
                value={isMercrediEnabled.endTime}
                step= {0.5}
                />
                 {isMercrediEnabled.endSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isMercrediEnabled.endSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isMercrediEnabled.endTime}</Text>
                }
                </View>
                <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit(isMercrediEnabled)}}>
                    <FontAwesome style={styles.icon} name='check' size={30} color='#1F2937' />
                </TouchableOpacity>
            </View>
            <View style={styles.components}>
            {renderDaySwitch(isJeudiEnabled, setJeudiEnabled)}
            <Text>Jeudi</Text>
                <View style={styles.slider}>
                <Text>Début</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={23.5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setJeudiEnabled({...isJeudiEnabled,startSelectedHours:value})}
                value={isJeudiEnabled.startTime}
                step= {0.5}
                />
                {isJeudiEnabled.startSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isJeudiEnabled.startSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isJeudiEnabled.startTime}</Text>
                }
                <Text>Fin</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={isJeudiEnabled.startSelectedHours+0.5}
                maximumValue={24}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setJeudiEnabled({...isJeudiEnabled,endSelectedHours:value})}
                value={isJeudiEnabled.endTime}
                step= {0.5}
                />
                 {isJeudiEnabled.endSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isJeudiEnabled.endSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isJeudiEnabled.endTime}</Text>
                }
                </View>
                <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit(isJeudiEnabled)}}>
                    <FontAwesome style={styles.icon} name='check' size={30} color='#1F2937' />
                </TouchableOpacity>
            </View>
            <View style={styles.components}>
            {renderDaySwitch(isVendrediEnabled, setVendrediEnabled)}
            <Text>Vendredi</Text>
                <View style={styles.slider}>
                <Text>Début</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={23.5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setVendrediEnabled({...isVendrediEnabled,startSelectedHours:value})}
                value={isVendrediEnabled.startTime}
                step= {0.5}
                />
                {isVendrediEnabled.startSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isVendrediEnabled.startSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isVendrediEnabled.startTime}</Text>
                }
                <Text>Fin</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={isVendrediEnabled.startSelectedHours+0.5}
                maximumValue={24}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setVendrediEnabled({...isVendrediEnabled,endSelectedHours:value})}
                value={isVendrediEnabled.endTime}
                step= {0.5}
                />
                 {isVendrediEnabled.endSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isVendrediEnabled.endSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isVendrediEnabled.endTime}</Text>
                }
                </View>
                <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit(isVendrediEnabled)}}>
                    <FontAwesome style={styles.icon} name='check' size={30} color='#1F2937' />
                </TouchableOpacity>
            </View>
            <View style={styles.components}>
            {renderDaySwitch(isSamediEnabled, setSamediEnabled)}
            <Text>Samedi</Text>
                <View style={styles.slider}>
                <Text>Début</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={23.5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setSamediEnabled({...isSamediEnabled,startSelectedHours:value})}
                value={isSamediEnabled.startTime}
                step= {0.5}
                />
                {isSamediEnabled.startSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isSamediEnabled.startSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isSamediEnabled.startTime}</Text>
                }
                <Text>Fin</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={isSamediEnabled.startSelectedHours+0.5}
                maximumValue={24}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setSamediEnabled({...isSamediEnabled,endSelectedHours:value})}
                value={isSamediEnabled.endTime}
                step= {0.5}
                />
                 {isSamediEnabled.endSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isSamediEnabled.endSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isSamediEnabled.endTime}</Text>
                }
                </View>
                <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit(isSamediEnabled)}}>
                    <FontAwesome style={styles.icon} name='check' size={30} color='#1F2937' />
                </TouchableOpacity>
            </View>
            <View style={styles.components}>
            {renderDaySwitch(isDimancheEnabled, setDimancheEnabled)}
            <Text>Dimanche</Text>
                <View style={styles.slider}>
                <Text>Début</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={0}
                maximumValue={23.5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setDimancheEnabled({...isDimancheEnabled,startSelectedHours:value})}
                value={isDimancheEnabled.startTime}
                step= {0.5}
                />
                {isDimancheEnabled.startSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isDimancheEnabled.startSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isDimancheEnabled.startTime}</Text>
                }
                <Text>Fin</Text>
                <Slider
                style={{width: 200, height: 40}}
                minimumValue={isDimancheEnabled.startSelectedHours+0.5}
                maximumValue={24}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={(value) => setDimancheEnabled({...isDimancheEnabled,endSelectedHours:value})}
                value={isDimancheEnabled.endTime}
                step= {0.5}
                />
                 {isDimancheEnabled.endSelectedHours ?
                <Text>{moment()
                    .startOf('day')
                    .add(isDimancheEnabled.endSelectedHours, 'hours')
                    .format('HH:mm')}</Text>:
                <Text>{isDimancheEnabled.endTime}</Text>
                }
                </View>
                <TouchableOpacity style={styles.iconcontainer} onPress={() => { handleSubmit(isDimancheEnabled)}}>
                    <FontAwesome style={styles.icon} name='check' size={30} color='#1F2937' />
                </TouchableOpacity>
            </View>

            </ScrollView>
          </LinearGradient>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      },
      header: {
        flexDirection: 'row',
        width :'90%',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1, 
        marginTop:60,
        marginBottom:20,
      },
      iconcontainer :{
        top : 0,
        backgroundColor : 'white',
        width : 50,
        height: 50,
        borderRadius : 100,
        alignItems: "center",
        justifyContent: "center",
        
        },
        Title: {
          color: 'white',
          fontSize: 35,
          fontStyle: 'normal',
          fontWeight: '600', 
          letterSpacing: -1.5, 
          textAlign:'center',
        },
        components:{
            flexDirection:'row',
            justifyContent:'space-around',
            alignItems:'center',
            marginBottom:20,
            width:'93%',
            borderRadius: 55,
            backgroundColor:'#BCCDB6',
            shadowColor: "#000",
                shadowOffset: {
                width: 0,
                height: 9,
                },
                shadowOpacity: 0.48,
                shadowRadius: 11.95,
                elevation: 18,
                margin: 10,
            padding:10,
        },
        dayContainer: {
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
        },
        slider:{
            justifyContent:'center',
            alignItems: 'center',
            marginLeft:10,
            marginRight:10,
        },
        scrollview:{
            height:'80%',
        }
    })