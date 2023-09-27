import React from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, FlatList, 
            RefreshControl } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';

import WCR from "../repository/WorldCup_Repository";

const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;

export default function WorldCup ({route}){
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, set_isLoading] = React.useState(true);

    const MonthNm = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [ICCWCupActiv, Set_ICCWCupActiv] = React.useState(true);
    const [T20WCupActiv, Set_T20WCupActiv] = React.useState(false);
    const [WTestChamActive, Set_WTestChamActive] = React.useState(false);
    
    const [DataICCWC, Set_DataICCWC] = React.useState([]);
    const [DataT20WC, Set_DataT20WC] = React.useState([]);
    const [DataWTC, Set_DataWTC] = React.useState([]);

    const FetchData=async (refresh)=>{
        let ICC, T20WC, WTC;
        if(refresh ==0 || refresh == 1){
            ICC = await WCR.Get_ICCWCUP();
            Set_DataICCWC(ICC);
        }
        if(refresh ==0 || refresh == 2){
            T20WC = await WCR.Get_T20WCUP();
            Set_DataT20WC(T20WC);
        }
        if(refresh ==0 || refresh == 3){
            WTC = await WCR.Get_WTestCh();
            Set_DataWTC(WTC);
        }
        setTimeout(()=> {
            set_isLoading(false);
            setRefreshing(false)}, 100);
    }
    React.useEffect(async () => {
        FetchData(0);
    }, []);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        FetchData();
    }, []);
  

    function ICC_World_Cup(){
        Set_ICCWCupActiv(true);
        Set_T20WCupActiv(false);
        Set_WTestChamActive(false);
    }
    function T20WorldCup(){
        Set_ICCWCupActiv(false);
        Set_T20WCupActiv(true);
        Set_WTestChamActive(false);
    }
    function WTChampionship(){
        Set_ICCWCupActiv(false);
        Set_T20WCupActiv(false);
        Set_WTestChamActive(true);
    }

    //-----------------------------------
    const ICCWCupList = ({item}) => {
        let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, time, month;
          title=title.replace(/<\/?[^>]+>/gi, '');
          desc=desc.replace(/<\/?[^>]+>/gi, '');
          title= title.substring(0, 55);
          desc= desc.substring(0, 80);
          year = dt.substring(0, 4);
          month = dt.substring(6, 7);
          day = dt.substring(8, 10);
          time = dt.substring(14, 16);

        return (
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
                    {title: title.substring(0, 20)+"...", PageID: item.id})}>    
                <View style={{backgroundColor: "#444444", borderWidth: 2, borderRadius: 10,
                            width: DEVICEWIDTH * 0.95, padding: 10, marginTop: 10,
                            flexDirection: "row"}}>
                <Image source={{uri: item._links['wp:featuredmedia'][0].href}} 
                    style={{width: DEVICEWIDTH * 0.2, height: DEVICEWIDTH * 0.2, borderRadius: 8}} />
              <View style={{flexDirection: "column", marginLeft: 10}}>
                <Text style={{color: "#FFFFFF", fontSize: 14, width: DEVICEWIDTH * 0.7, paddingRight: 8}}>
                  {title}...</Text>
                <View style={{flexDirection: "row", marginTop: 8, paddingBottom: 8, alignItems: "center"}}>
                  <AntDesign name="calendar" size={24} color="#A2A2A2"/>
                  <Text style={{color: "#A2A2A2", fontSize: 12, marginLeft: 7}}>
                    {day} {MonthNm[month-1]} {year}</Text>
                  {/* <Image source={require('../assets/wall_clock.png')} style={{width: 20, height: 20, marginLeft: 10}}/> */}
                  <Ionicons name="timer-outline" size={24} color="#A2A2A2" style={{marginLeft: 10}} />
                  <Text style={{color: "#A2A2A2", fontSize: 12, marginLeft: 7}}>
                    {time} Min</Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
        );
    }
    //-----------------------------------
    const T20WCupList = ({item}) => {
        let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, time, month;
          title=title.replace(/<\/?[^>]+>/gi, '');
          desc=desc.replace(/<\/?[^>]+>/gi, '');
          title= title.substring(0, 55);
          desc= desc.substring(0, 80);
          year = dt.substring(0, 4);
          month = dt.substring(6, 7);
          day = dt.substring(8, 10);
          time = dt.substring(14, 16);
  
        return (
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
                    {title: title.substring(0, 20)+"...", PageID: item.id})}>    
                <View style={{backgroundColor: "#444444", borderWidth: 2, borderRadius: 10,
                            width: DEVICEWIDTH * 0.95, padding: 10, marginTop: 10,
                            flexDirection: "row"}}>
                <Image source={{uri: item._links['wp:featuredmedia'][0].href}} 
                    style={{width: DEVICEWIDTH * 0.2, height: DEVICEWIDTH * 0.2, borderRadius: 8}} />
              <View style={{flexDirection: "column", marginLeft: 10}}>
                <Text style={{color: "#FFFFFF", fontSize: 14, width: DEVICEWIDTH * 0.7, paddingRight: 8}}>
                  {title}...</Text>
                <View style={{flexDirection: "row", marginTop: 8, paddingBottom: 8, alignItems: "center"}}>
                  <AntDesign name="calendar" size={24} color="#A2A2A2"/>
                  <Text style={{color: "#A2A2A2", fontSize: 12, marginLeft: 7}}>
                    {day} {MonthNm[month-1]} {year}</Text>
                  {/* <Image source={require('../assets/wall_clock.png')} style={{width: 20, height: 20, marginLeft: 10}}/> */}
                  <Ionicons name="timer-outline" size={24} color="#A2A2A2" style={{marginLeft: 10}} />
                  <Text style={{color: "#A2A2A2", fontSize: 12, marginLeft: 7}}>
                    {time} Min</Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
        );
    }
    //-----------------------------------
    const WTestChList = ({item}) => {
        let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, time, month;
          title=title.replace(/<\/?[^>]+>/gi, '');
          desc=desc.replace(/<\/?[^>]+>/gi, '');
          title= title.substring(0, 55);
          desc= desc.substring(0, 80);
          year = dt.substring(0, 4);
          month = dt.substring(6, 7);
          day = dt.substring(8, 10);
          time = dt.substring(14, 16);
  
        return (
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
                    {title: title.substring(0, 20)+"...", PageID: item.id})}>    
                <View style={{backgroundColor: "#444444", borderWidth: 2, borderRadius: 10,
                            width: DEVICEWIDTH * 0.95, padding: 10, marginTop: 10,
                            flexDirection: "row"}}>
                <Image source={{uri: item._links['wp:featuredmedia'][0].href}} 
                    style={{width: DEVICEWIDTH * 0.2, height: DEVICEWIDTH * 0.2, borderRadius: 8}} />
                <View style={{flexDirection: "column", marginLeft: 10}}>
                    <Text style={{color: "#FFFFFF", fontSize: 14, width: DEVICEWIDTH * 0.7, paddingRight: 8}}>
                    {title}...</Text>
                    <View style={{flexDirection: "row", marginTop: 8, paddingBottom: 8, alignItems: "center"}}>
                    <AntDesign name="calendar" size={24} color="#A2A2A2"/>
                    <Text style={{color: "#A2A2A2", fontSize: 12, marginLeft: 7}}>
                        {day} {MonthNm[month-1]} {year}</Text>
                    <Ionicons name="timer-outline" size={24} color="#A2A2A2" style={{marginLeft: 10}} />
                    <Text style={{color: "#A2A2A2", fontSize: 12, marginLeft: 7}}>
                        {time} Min</Text>
                    </View>
                </View>
                </View>
            </TouchableOpacity>
        );
    }

    //--------------------------
    return (
        <View style={{width: DEVICEWIDTH, height: DEVICEHEIGHT * 0.83}}>
            
            <View style={{backgroundColor: "#444444", width: DEVICEWIDTH, height: DEVICEWIDTH * 0.13,
                        justifyContent: "center"}}>
                <View style={{height: "70%", flexDirection: "row", marginLeft: 8}}>
                    <TouchableOpacity onPress={()=> ICC_World_Cup()} 
                            style={{width: DEVICEWIDTH * 0.28, alignItems: "center",}}>
                        <View style={{width: ICCWCupActiv ? DEVICEWIDTH * 0.32 : DEVICEWIDTH * 0.30,
                                backgroundColor: ICCWCupActiv ? "#7B94EC" : "#444444",
                                borderRadius: 7, alignItems: "center"}}>
                            <Text style={{color: ICCWCupActiv ? "#000000" : "#FFFFFF",
                                fontSize: ICCWCupActiv ? 12 : 10, padding: 3, }}>
                                ICC World Cup 2023</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> T20WorldCup()}
                            style={{width: DEVICEWIDTH * 0.3, alignItems: "center",}}>
                        <View style={{width: T20WCupActiv ? DEVICEWIDTH * 0.25 : DEVICEWIDTH * 0.24,
                                backgroundColor: T20WCupActiv ? "#7B94EC" : "#444444",
                                borderRadius: 7, alignItems: "center"}}>
                            <Text style={{color: T20WCupActiv ? "#000000" : "#FFFFFF",
                                fontSize: T20WCupActiv ? 12 : 10, padding: 3, }}>
                                T20 World Cup</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=> WTChampionship()} 
                            style={{width: DEVICEWIDTH * 0.32, alignItems: "center",}}>
                        <View style={{width: WTestChamActive ? DEVICEWIDTH * 0.40 : DEVICEWIDTH * 0.34,
                                backgroundColor: WTestChamActive ? "#7B94EC" : "#444444",
                                borderRadius: 7, alignItems: "center"}}>
                            <Text style={{color: WTestChamActive ? "#000000" : "#FFFFFF",
                                fontSize: WTestChamActive ? 12 : 10, padding: 3, }}>
                                World Test Championship</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.container}>

                <View style={{alignItems: "center"}}>
                    {
                        ICCWCupActiv ? (
                            <FlatList
                                data={DataICCWC}
                                keyExtractor={(item, index) => index.toString()}
                                enableEmptySections={true}
                                renderItem={ICCWCupList}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={()=>FetchData(1)} />
                                }
                            />
                        ):(
                            T20WCupActiv ? (
                                <FlatList
                                    data={DataT20WC}
                                    keyExtractor={(item, index) => index.toString()}
                                    enableEmptySections={true}
                                    renderItem={T20WCupList}
                                    refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={FetchData(1)} />
                                    }
                                />
                        ):(
                            WTestChamActive ? (
                                <FlatList
                                    data={DataWTC}
                                    keyExtractor={(item, index) => index.toString()}
                                    enableEmptySections={true}
                                    renderItem={WTestChList}
                                    refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={FetchData(1)} />
                                    }
                                />
                        ):(
                            <View></View>
                        )
                        )
                        )
                    }
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardview: {
        backgroundColor: 'grey',
        borderRadius: 10,
        elevation: 10,
    },
    cardview2: {
        backgroundColor: 'grey',
        borderRadius: 10,
        elevation: 10,
    },
});