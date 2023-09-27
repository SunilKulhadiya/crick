import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity,
            SafeAreaView, Image, } from 'react-native';
import { FontAwesome, Entypo, MaterialIcons, MaterialCommunityIcons, Ionicons, Foundation }
         from '@expo/vector-icons';

import HomeScreen from "./HomeScreen";
import WorldCup from "./WorldCup";
import Series from "./Series";
import Predictions from './Predictions';
import MoreMenus from './MoreMenu';

const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;

export default function RouteScreen({navigation, route}){
    const[HomeAct, Set_HomeAct] = React.useState(true)
    const[WorldCAct, Set_WorldC] = React.useState(false)
    const[SeriesAct, Set_Series] = React.useState(false)
    const[PredictionsAct, Set_Predictions] = React.useState(false)
    const[MoreAct, Set_More] = React.useState(false)
    const[SName, Set_SName] = React.useState("This is Home")
    
    function ActiveHome(){
        Set_HomeAct(true);
        Set_Series(false);
        Set_WorldC(false);
        Set_Predictions(false);
        Set_More(false);
        Set_SName("ICC CRICKET");
    }
    function ActiveWorldC(){
        Set_HomeAct(false);
        Set_Series(false);
        Set_WorldC(true);
        Set_Predictions(false);
        Set_More(false);
        Set_SName("World Cup");
    }
    function ActiveSeries(){
        Set_HomeAct(false);
        Set_Series(true);
        Set_WorldC(false);
        Set_Predictions(false);
        Set_More(false);
        Set_SName("SERIES");
    }
    function ActivePrediction(){
        Set_HomeAct(false);
        Set_Series(false);
        Set_WorldC(false);
        Set_Predictions(true);
        Set_More(false);
        Set_SName("Predictions");
    }
    function ActiveMore(){
        Set_HomeAct(false);
        Set_Series(false);
        Set_WorldC(false);
        Set_Predictions(false);
        Set_More(true);
        Set_SName("More");
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
          <SafeAreaView>
            {/* Top app bar */}
            <View style={{flexDirection: 'row', height: DEVICEHEIGHT * 0.08, width: DEVICEWIDTH,
                          backgroundColor: "#2574EB", alignItems: 'center', marginTop: 0}}>
              {/* <TouchableOpacity onPress={()=>navigation.toggleDrawer()}>
                <Ionicons name="menu-sharp" size={40} color="white" />
              </TouchableOpacity> */}
              <View style={{justifyContent:'center', alignItems: 'center'}}>
                {
                 HomeAct? (
                  <View style={{flexDirection: 'column', marginStart: 10}}>
                    <Text style={{color: "#FFFFFF", fontSize: 16, fontWeight: 'bold'}}>
                          {SName}</Text>
                    <View style={{flexDirection: "row"}}>
                      <Ionicons name="tennisball" size={20} color="white" />
                      <Text style={{color: "#FFFFFF", marginStart: 10, fontSize: 16,
                            fontWeight: 'bold'}}>SHEDULE</Text>
                    </View>
                  </View>
                  ):(
                  <Text style={{color: "#FFFFFF", marginStart: 10, fontSize: 20,
                  fontWeight: 'bold'}}>{SName}</Text>
                  ) 
                }
              </View>
            </View>
            {/* Body */}
          <View style={{height: DEVICEHEIGHT * 0.83, width: DEVICEWIDTH, backgroundColor: "#000000",
                        }}>
            {
              HomeAct? (
                <HomeScreen/>
              ):(
                WorldCAct? (
                  <WorldCup/>
                ):(
                  SeriesAct? (
                    <Series/>
                  ):(
                    PredictionsAct ? (
                      <Predictions/>
                    ):(
                      MoreAct ? (
                        <MoreMenus/>
                      ):(
                        <View></View>
                      )
                    )
                  )
                )
              )
            }
          </View>
          {/* Bottom tab */}
          <View style={{height: DEVICEHEIGHT * 0.05, width: DEVICEWIDTH, backgroundColor: "#FFFFFF",
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 15}}>
              <TouchableOpacity onPress={()=>ActiveHome()} style={{width: DEVICEWIDTH * 0.20,}}>
                  <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <FontAwesome name="home" size = {HomeAct? 33 : 24} color = {HomeAct? "#7B94EC":"black"}/>
                    <Text style={{fontSize: HomeAct? 12:11, color: HomeAct? "#7B94EC":"black" }}>
                      HOME</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>ActiveSeries()} style={{width: DEVICEWIDTH * 0.20,}}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <Entypo name="trophy" size = {SeriesAct? 31 : 24} color = {SeriesAct? "#7B94EC":"black"}/>
                  <Text style={{fontSize: SeriesAct? 12:11, color: SeriesAct? "#7B94EC":"black" }}>
                    SERIES</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>ActiveWorldC()} style={{width: DEVICEWIDTH * 0.21,}}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  {/* {
                    WorldCAct? (
                      <Image source={require('../assets/cricketBTb.png')} style={{width: 24, height: 24}} />
                    ):(
                      <Image source={require('../assets/cricketBTw.png')} style={{width: 24, height: 24}} />
                    )
                  } */}
                <MaterialIcons name="sports-cricket" size = {WorldCAct? 31 : 24}
                              color = {WorldCAct? "#7B94EC":"black"}/>
                  <Text style={{fontSize: WorldCAct? 12:11, color: WorldCAct? "#7B94EC":"black" }}>
                    WORLD CUP</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>ActivePrediction()} style={{width: DEVICEWIDTH * 0.23,}}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Foundation name="graph-trend" size = {PredictionsAct? 37 : 24}
                                  color = {PredictionsAct? "#7B94EC":"black"}/>
                  <Text style={{fontSize: PredictionsAct ? 12:11, color: PredictionsAct? "#7B94EC":"black" }}>
                      PREDICTIONS</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>ActiveMore()} style={{width: DEVICEWIDTH * 0.20,}}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <MaterialCommunityIcons name="sort-variant" size = {MoreAct? 33 : 24}
                                  color = {MoreAct? "#7B94EC":"black"}/>
                  <Text style={{fontSize: MoreAct? 12:11, color: MoreAct? "#7B94EC":"black" }}>
                    MORE</Text>
                </View>
              </TouchableOpacity>
            </View>
      
            </SafeAreaView>
      
          </View>
        );
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: DEVICEHEIGHT,
      width: DEVICEWIDTH,
      flexDirection: 'column',
    },
});