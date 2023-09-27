import React from "react";
import { View, Text, Dimensions, TouchableOpacity, Image, StyleSheet, FlatList,
            RefreshControl } from "react-native";
import { useNavigation } from '@react-navigation/native'

import PredRepository from "../repository/Predictions_Repository";

const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;

export default function Prediction ({route}){

    const navigation = useNavigation();
    const [MatchPreActive, Set_MatchPreActive] = React.useState(true);
    const [Dream11Active, Set_Dream11Active] = React.useState(false);

    const [DataMPred, Set_DataMPred] = React.useState([]);
    const [DataDream11, Set_DataDream11] = React.useState([]);

    const [refreshing, setRefreshing] = React.useState(true);


    async function FetchData(refresh){
        let MPred, Dream;
        if(refresh == 1 || refresh == 0){
            MPred = await PredRepository.Get_MatchPrediction();
            Set_DataMPred(MPred);
        }
        if(refresh == 2 || refresh == 0){
            Dream = await PredRepository.Get_Dream11();
            Set_DataDream11(Dream);
        }
        setTimeout(()=> setRefreshing(false), 2000);
    }

    React.useEffect(() => {
        FetchData(0);
    }, []);

    function MatchPredMenuActive(){
        Set_MatchPreActive(true);
        Set_Dream11Active(false);
    }
    function Dream11MecnuActive(){
        Set_MatchPreActive(false);
        Set_Dream11Active(true);
    }
    //-----------------------------------
    const MatchPredictionList = ({item}) => {
        let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, time, month;
          title=title.replace(/<\/?[^>]+>/gi, '');
          desc=desc.replace(/<\/?[^>]+>/gi, '');
          title= title.substring(0, 55);
          desc= desc.substring(0, 80);
          year = dt.substring(0, 4);
          month = dt.substring(6, 7);
          day = dt.substring(9, 10);
          time = dt.substring(14, 16);

        return (
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
                    {title: title.substring(0, 20)+"...", PageID: item.id})}>    
                <View style={{backgroundColor: "#444444", borderWidth: 2, borderRadius: 10,
                            width: DEVICEWIDTH * 0.95, padding: 10, marginTop: 10,
                            flexDirection: "column"}}>
                    <Image source={{uri: item._links['wp:featuredmedia'][0].href}} 
                        style={{width: DEVICEWIDTH * 0.9, height: DEVICEWIDTH * 0.5, borderRadius: 10}} />
                    <Text style={{color: "#FFFFFF", fontSize: 14, width: DEVICEWIDTH * 0.88, paddingRight: 8}}>
                    {title}...</Text>
                    <Text style={styles.descrp}>{desc}...</Text>
                </View>
            </TouchableOpacity>
        );
    }
    //-----------------------------------
    const Dream11List = ({item}) => {
        let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, time, month;
          title=title.replace(/<\/?[^>]+>/gi, '');
          desc=desc.replace(/<\/?[^>]+>/gi, '');
          title= title.substring(0, 55);
          desc= desc.substring(0, 80);
          year = dt.substring(0, 4);
          month = dt.substring(6, 7);
          day = dt.substring(9, 10);
          time = dt.substring(14, 16);

        return (
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
                    {title: title.substring(0, 20)+"...", PageID: item.id})}>    
                <View style={{backgroundColor: "#444444", borderWidth: 2, borderRadius: 10,
                            width: DEVICEWIDTH * 0.95, padding: 10, marginTop: 10,
                            flexDirection: "column"}}>
                    <Image source={{uri: item._links['wp:featuredmedia'][0].href}} 
                        style={{width: DEVICEWIDTH * 0.9, height: DEVICEWIDTH * 0.5, borderRadius: 10}} />
                    <Text style={{color: "#FFFFFF", fontSize: 14, width: DEVICEWIDTH * 0.88, paddingRight: 8}}>
                    {title}...</Text>
                    <Text style={styles.descrp}>{desc}...</Text>
                </View>
            </TouchableOpacity>
        );
    }

    //-------------------------------
    return (
        <View style={{height: DEVICEHEIGHT * 0.83}}>
            <View style={{backgroundColor: "#444444", width: DEVICEWIDTH, height: DEVICEWIDTH * 0.13,
                        justifyContent: "center"}}>
                <View style={{height: "70%",flexDirection: "row", marginLeft: 10,}}>
                    <View  style={{width: DEVICEWIDTH * 0.35, alignItems: "center",
                            justifyContent: "center"}}>
                        <TouchableOpacity onPress={()=>MatchPredMenuActive()}>
                            <Text style={{color: MatchPreActive ? "#000000" : "#FFFFFF",
                                fontSize: MatchPreActive ? 12 : 10, padding: 3, width: DEVICEWIDTH * 0.28,
                                backgroundColor: MatchPreActive ? "#7B94EC" : "#444444",
                                borderRadius: 7}}>
                                    Match Predictions</Text>
                        </TouchableOpacity>
                    </View>
                    <View  style={{width: DEVICEWIDTH * 0.25, alignItems: "center",
                            justifyContent: "center"}}>
                        <TouchableOpacity onPress={()=>Dream11MecnuActive()}>
                            <Text style={{color: Dream11Active ? "#000000" : "#FFFFFF",
                                fontSize: Dream11Active ? 12 : 10, padding: 3,
                                backgroundColor: Dream11Active ? "#7B94EC" : "#444444",
                                borderRadius: 7}}>
                                    Dream 11</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        <View style={styles.container}>
                <View style={{alignItems: "center"}}>
                    {
                        MatchPreActive ? (
                            <FlatList
                                extraData={refreshing}
                                data={DataMPred}
                                keyExtractor={(item, index) => index.toString()}
                                enableEmptySections={true}
                                renderItem={MatchPredictionList}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={FetchData(1)} />
                                }
                            />
                        ):(
                            Dream11Active ? (
                                <FlatList
                                extraData={refreshing}
                                data={DataDream11}
                                keyExtractor={(item, index) => index.toString()}
                                enableEmptySections={true}
                                renderItem={Dream11List}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={FetchData(2)} />
                                }
                            />
                        ):(
                            <View></View>
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
    descrp: {
        fontSize: 12,
        color: 'grey',
        fontWeight: '600',
        paddingTop: 2,
        marginTop: 5,
        marginBottom: 5,
        width: DEVICEWIDTH * 0.9,
    }

});