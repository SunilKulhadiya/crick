import React from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Dimensions, TouchableOpacity, Image, SafeAreaView, StyleSheet, FlatList, 
            RefreshControl } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import HP from "../../screen_presenter/Home_Presenter";

const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;

export default function HomeMoreDetails({route}){

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = React.useState(true);
    const [DataTop5, Set_DataTop5] = React.useState([]);
    const [DataCricketNews, Set_DataCricketNews] = React.useState([]);
    const [DataCricketSchdule, Set_DataCricketSchdule] = React.useState([]);
    const MonthNm = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const FetchData=async (refresh)=>{
        let Top5, CNws, CSchdule;
        if(route.params.title == "Top 5 / Top 10"){
            Top5 = await HP.Get_Top5Top10();
            Set_DataTop5(Top5);
        }
        if(route.params.title == "Cricket News"){
            CNws = await HP.Get_CricketNews();
            Set_DataCricketNews(CNws);
        }
        if(route.params.title == "Cricket Schdule"){
            CSchdule = await HP.Get_CricketSchdule("posts?categories=1");
            Set_DataCricketSchdule(CSchdule);
        }
        setTimeout(()=> setRefreshing(false), 1000);
    }
    React.useEffect(async () => {
        FetchData();
    }, []);
    //-------------------------------
    const DisplayList = ({item}) => {
        console.log("HomeMoreDetail.js, Top5Top10, url : ", item._links['wp:featuredmedia'][0].href);
        let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, time, month;
          title=title.replace(/<\/?[^>]+>/gi, '');
          desc=desc.replace(/<\/?[^>]+>/gi, '');
          title= title.substring(0, 75);
          desc= desc.substring(0, 80);
          year = dt.substring(0, 4);
          month = dt.substring(6, 7);
          day = dt.substring(9, 10);
          time = dt.substring(14, 16);
  
        return (
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
                    {title: route.params.title, PageID: item.id})}>    
                <View style={[styles.cardview2, {flexDirection: "row", marginTop: 10,
                        width: DEVICEWIDTH * 0.95, padding: 10}]}>
                    <Image source={{uri: item._links['wp:featuredmedia'][0].href}} 
                        style={{width: DEVICEWIDTH * 0.2, height: DEVICEWIDTH * 0.2, borderRadius: 8}} />
                    <View style={{flexDirection: "column", marginLeft: 10}}>
                    <Text style={{color: "#FFFFFF", fontSize: 14, width: DEVICEWIDTH * 0.7, paddingRight: 8}}>
                        {title}...</Text>
                    {/* <Text style={{color: "white", fontSize: 8, width: DEVICEWIDTH * 0.7}}>{desc}...</Text> */}
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
    //---------------------Main
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SafeAreaView>
                {/* Top app bar */}
                <View style={{flexDirection: 'row', height: DEVICEHEIGHT * 0.08, width: DEVICEWIDTH,
                            backgroundColor: "#2574EB", alignItems: 'center', marginTop: 34}}>
                <View style={{justifyContent:'center', alignItems: 'center', flexDirection: "row"}}>
                    <AntDesign name="arrowleft" size={35} color="#FFFFFF" onPress={()=> navigation.goBack()} />
                    <Text style={{color: "#FFFFFF", marginStart: 10, fontSize: 20,
                    fontWeight: 'bold'}}>{route.params.title}</Text>
                </View>
                </View>
                {/* Body */}
                <View style={{height: DEVICEHEIGHT * 0.921, width: DEVICEWIDTH, backgroundColor: "#000000",
                            alignItems: "center"}}>
                {
                    route.params.title == "Top 5 / Top 10" ? (
                        <FlatList
                            data={DataTop5}
                            keyExtractor={(item, index) => index.toString()}
                            enableEmptySections={true}
                            renderItem={DisplayList}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={()=>FetchData()} />
                            }
                        />
                    ):(
                        route.params.title == "Cricket News" ? (
                            <FlatList
                                data={DataCricketNews}
                                keyExtractor={(item, index) => index.toString()}
                                enableEmptySections={true}
                                renderItem={DisplayList}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={()=>FetchData()} />
                                }
                            />
                        ):(
                            route.params.title == "Cricket Schdule" ? (
                                <FlatList
                                    data={DataCricketSchdule}
                                    keyExtractor={(item, index) => index.toString()}
                                    enableEmptySections={true}
                                    renderItem={DisplayList}
                                    refreshControl={
                                        <RefreshControl refreshing={refreshing} onRefresh={()=>FetchData()} />
                                    }
                                />
                            ):(
                                <></>
                            )
    
                        )
                    )
                }

            
                </View>

            </SafeAreaView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      height: DEVICEHEIGHT,
      width: DEVICEWIDTH,
      flexDirection: 'column',
    },
    cardview2: {
        backgroundColor: 'grey',
        borderRadius: 10,
        elevation: 10,
    },

});