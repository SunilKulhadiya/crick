import React from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator,
    StyleSheet, UIManager, LayoutAnimation, FlatList, Image} from "react-native";
import { Entypo } from '@expo/vector-icons';

import SMR from "../repository/SMenu_Repository";

const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;

export default function MoreMenus ({route}){
    const navigation = useNavigation();

    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, set_isLoading] = React.useState(true);

    const [IPLActiv, Set_IPLActiv] = React.useState(true);
    const [IPLTeamActiv, Set_IPLTeamActiv] = React.useState(false);
    const [AsiaCupActiv, Set_AsiaCupActiv] = React.useState(false);
    const [OtherActive, Set_OtherActive] = React.useState(false);
    const [InfoActive, Set_InfoActiv] = React.useState(false);

    const [multiSelect, setMultiSelect] = React.useState(false);

    const [DataIPL, Set_DataIPL] = React.useState([]);
    const [DataIPLTeam, Set_DataIPLTeam] = React.useState([]);
    const [DataAsiaCup, Set_DataAsiaCup] = React.useState([]);
    const [DataOther, Set_DataOther] = React.useState([]);
    const [DataInfo, Set_DataInfo] = React.useState([
            {"id": 6, "name": "About Us", "Micon": require('../assets/information.png')},
            {"id": 7, "name": "Contact Us", "Micon": require('../assets/customer_service.png')},
            {"id": 8, "name": "Write For Us", "Micon": require('../assets/writing.png')},
            {"id": 9, "name": "Partner With Us", "Micon": require('../assets/deal.png')},
            ]);

    const FetchData=async (refresh)=>{
        let ICC, T20WC, Asiacup, Other;
            ICC = await SMR.Get_MoreMenu("IPL")
            Set_DataIPL(ICC);
            T20WC = await SMR.Get_MoreMenu("IPL Teams")
            Set_DataIPLTeam(T20WC);
            Asiacup = await SMR.Get_MoreMenu("ASIA CUP")
            Set_DataAsiaCup(Asiacup);
            Other = await SMR.Get_MoreMenu("More..")
            Set_DataOther(Other);
        setTimeout(()=> {
            set_isLoading(false);
            setRefreshing(false)}, 100);
    }
    React.useEffect(() => {
        FetchData(0);
    }, []);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        FetchData();
    }, []);
  
    function MenuIPLActive(){
        Set_IPLActiv(true);
        Set_IPLTeamActiv(false);
        Set_AsiaCupActiv(false);
        Set_OtherActive(false);
        Set_InfoActiv(false);
    }
    function MenuIPLTeamActive(){
        Set_IPLActiv(false);
        Set_IPLTeamActiv(true);
        Set_AsiaCupActiv(false);
        Set_OtherActive(false);
        Set_InfoActiv(false);
    }
    function MenuAsiaCupActive(){
        Set_IPLActiv(false);
        Set_IPLTeamActiv(false);
        Set_AsiaCupActiv(true);
        Set_OtherActive(false);
        Set_InfoActiv(false);
    }
    function MenuOtherActive(){
        Set_IPLActiv(false);
        Set_IPLTeamActiv(false);
        Set_AsiaCupActiv(false);
        Set_OtherActive(true);
        Set_InfoActiv(false);
    }
    function MenuInfoActive(){
        Set_IPLActiv(false);
        Set_IPLTeamActiv(false);
        Set_AsiaCupActiv(false);
        Set_OtherActive(false);
        Set_InfoActiv(true);
    }
    //-----------------------------------
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    //-----------------------------------------
    const ExpandableComponent = ({ item, onClickFunction }) => {
        //Custom Component for the Expandable List
        const [layoutHeight, setLayoutHeight] = React.useState(0);
        const navigation = useNavigation();
    
        React.useEffect(() => {
          if (item.isExpanded) {
            setLayoutHeight(null);
          } else {
            setLayoutHeight(0);
          }
          
        }, [item.isExpanded]);
    
        return (
          <View>
            {/*Header of the Expandable List Item*/}
            <View style={{alignItems: "center", marginTop: 10}}>
            <View style={{borderColor: "#C0BBBB", borderRadius: 3, borderWidth: 1,
                          width: DEVICEWIDTH * 0.95,}}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => {onClickFunction()}}
                  style={styles.header}>
                <View style={{flexDirection: 'row', marginLeft: 5, alignItems: "center",}}>
                  <Text style={[styles.headerText, {width: "87%", padding: 6,
                              color: item.isExpanded ? "#5EB9FE":"#FFFFFF",}]}>
                      {item.Title}
                  </Text>
                  <Entypo name="chevron-right" size={28} color="#FFFFFF"
                      style={{transform: [{rotate: item.isExpanded ? '90deg' : '0deg'}]}}/>
                </View>
              </TouchableOpacity>
            </View>
            </View>
            {/* <View style={{width: "auto", height: 1, backgroundColor: "#C0BBBB"}}/> */}
            
            <View style={{height: layoutHeight, overflow: 'hidden'}}>
              {/*Content under the header of the Expandable List Item*/}
              {item.submenu.map((item, key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.content}
                  onPress={() => navigation.navigate("SeriesMDetails",
                                {title: item.name, PageID: item.href})}>
                    <Text style={styles.text}>
                        {item.name}
                    </Text>
                    <View style={styles.separator} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
    };
        
    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...DataIPL];
        if (multiSelect) {
            // If multiple select is enabled
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            // If single select is enabled
            array.map((value, placeindex) =>
            placeindex === index
                ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
                : (array[placeindex]['isExpanded'] = false)
            );
        }
        Set_DataIPL(array);
    };

    const IPLTeamsupdateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...DataIPLTeam];
        if (multiSelect) {
            // If multiple select is enabled
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            // If single select is enabled
            array.map((value, placeindex) =>
            placeindex === index
                ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
                : (array[placeindex]['isExpanded'] = false)
            );
        }
        Set_DataIPLTeam(array);
    };
        
    const AsiaCupdateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...DataAsiaCup];
        if (multiSelect) {
            // If multiple select is enabled
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            // If single select is enabled
            array.map((value, placeindex) =>
            placeindex === index
                ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
                : (array[placeindex]['isExpanded'] = false)
            );
        }
        Set_DataAsiaCup(array);
    };

    const OtherupdateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...DataOther];
        if (multiSelect) {
            // If multiple select is enabled
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            // If single select is enabled
            array.map((value, placeindex) =>
            placeindex === index
                ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
                : (array[placeindex]['isExpanded'] = false)
            );
        }
        Set_DataOther(array);
    };
    //-----------------------------------
    const MenuInfo = ({item}) => {
        return (
            <View style={{alignItems: "center", marginTop: 10}}>
                <View style={{borderColor: "#C0BBBB", borderRadius: 3, borderWidth: 1,
                        width: DEVICEWIDTH * 0.95}}>
                    {/* <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
                            {title: item.name, PageID: item.id})}>     */}
                        <View style={{flexDirection: "row", padding: 8}}>
                        <Image source={item.Micon} style={{width: 24, height: 24}}/>
                        <Text style={[styles.headerText, {width: "82%", marginLeft: 10,
                                    color: item.isExpanded ? "#5EB9FE":"#FFFFFF",}]}>
                            {item.name}
                        </Text>
                        </View>
                    {/* </TouchableOpacity> */}
                </View>
              </View>
        );
    }
    //--------------------------
    return (
        <View style={{width: DEVICEWIDTH, height: DEVICEHEIGHT * 0.83}}>
            
            <View style={{backgroundColor: "#444444", width: DEVICEWIDTH, height: DEVICEWIDTH * 0.13,
                        justifyContent: "center"}}>
                <View style={{height: "70%", flexDirection: "row", alignItems: "center"}}>

                        <TouchableOpacity onPress={()=> MenuIPLActive()} 
                                style={{width: DEVICEWIDTH * 0.19, alignItems: "center",}}>
                            <View style={{width: IPLActiv ? DEVICEWIDTH * 0.12 : DEVICEWIDTH * 0.10,
                                    backgroundColor: IPLActiv ? "#7B94EC" : "#444444",
                                    borderRadius: 7, alignItems: "center"}}>
                                <Text style={{color: IPLActiv ? "#000000" : "#FFFFFF",
                                    fontSize: IPLActiv ? 12 : 10, padding: 3, }}>
                                        IPL</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> MenuIPLTeamActive()}
                                style={{width: DEVICEWIDTH * 0.19, alignItems: "center"}}>
                            <View style={{width: IPLTeamActiv ? DEVICEWIDTH * 0.19 : DEVICEWIDTH * 0.17,
                                    backgroundColor: IPLTeamActiv ? "#7B94EC" : "#444444",
                                    borderRadius: 7, alignItems: "center"}}>
                                <Text style={{color: IPLTeamActiv ? "#000000" : "#FFFFFF",
                                    fontSize: IPLTeamActiv ? 12 : 10, padding: 3, }}>
                                        IPL TEAMS</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> MenuAsiaCupActive()}
                                style={{width: DEVICEWIDTH * 0.19, alignItems: "center"}}>
                            <View style={{width: AsiaCupActiv ? DEVICEWIDTH * 0.19 : DEVICEWIDTH * 0.17,
                                    backgroundColor: AsiaCupActiv ? "#7B94EC" : "#444444",
                                    borderRadius: 7, alignItems: "center"}}>
                                <Text style={{color: AsiaCupActiv ? "#000000" : "#FFFFFF",
                                    fontSize: AsiaCupActiv ? 12 : 10, padding: 3, }}>
                                        ASIA CUP</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> MenuOtherActive()}
                                style={{width: DEVICEWIDTH * 0.19, alignItems: "center"}}>
                            <View style={{width: OtherActive ? DEVICEWIDTH * 0.15 : DEVICEWIDTH * 0.12,
                                    backgroundColor: OtherActive ? "#7B94EC" : "#444444",
                                    borderRadius: 7, alignItems: "center"}}>
                                <Text style={{color: OtherActive ? "#000000" : "#FFFFFF",
                                    fontSize: OtherActive ? 12 : 10, padding: 3, }}>
                                        OTHER</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> MenuInfoActive()}
                                style={{width: DEVICEWIDTH * 0.19, alignItems: "center"}}>
                            <View style={{width: InfoActive ? DEVICEWIDTH * 0.13 : DEVICEWIDTH * 0.11,
                                    backgroundColor: InfoActive ? "#7B94EC" : "#444444",
                                    borderRadius: 7, alignItems: "center"}}>
                                <Text style={{color: InfoActive ? "#000000" : "#FFFFFF",
                                    fontSize: InfoActive ? 12 : 10, padding: 3, }}>
                                        Info.</Text>
                            </View>
                        </TouchableOpacity>
                </View>
            </View>
            {/* Top menu end */}

            <View style={styles.container}>
                <View style={{alignItems: "center"}}>

                {
                    isLoading ? (
                        <ActivityIndicator/>
                    ):(
                            IPLActiv ? (
                                <View style={{height: "100%",flexDirection: "row", marginLeft: 0,}}>
                                <ScrollView>
                                    {DataIPL.map((item, key) => (
                                        <ExpandableComponent
                                        key={item.Title}
                                        onClickFunction={() => {
                                            updateLayout(key);
                                        }}
                                        item={item}
                                        />
                                    ))
                                    }
                                </ScrollView>
                                </View>
                            ):(
                                IPLTeamActiv ? (
                                    <View style={{height: "100%",flexDirection: "row", paddingBottom: 10}}>
                                    <ScrollView>
                                        {DataIPLTeam.map((item, key) => (
                                            <ExpandableComponent
                                            key={item.Title}
                                            onClickFunction={() => {
                                                IPLTeamsupdateLayout(key);
                                            }}
                                            item={item}
                                            />
                                        ))
                                        }
                                    </ScrollView>
                                    </View>
                                ):(
                                    AsiaCupActiv ? (
                                        <View style={{height: "100%",flexDirection: "row", paddingBottom: 10}}>
                                        <ScrollView>
                                            {DataAsiaCup.map((item, key) => (
                                                <ExpandableComponent
                                                key={item.Title}
                                                onClickFunction={() => {
                                                    AsiaCupdateLayout(key);
                                                }}
                                                item={item}
                                                />
                                            ))
                                            }
                                        </ScrollView>
                                        </View>
                                    ):(
                                    OtherActive ? (
                                        <View style={{height: "100%",flexDirection: "row", paddingBottom: 10}}>
                                        <ScrollView>
                                            {DataOther.map((item, key) => (
                                                <ExpandableComponent
                                                key={item.Title}
                                                onClickFunction={() => {
                                                    OtherupdateLayout(key);
                                                }}
                                                item={item}
                                                />
                                            ))
                                            }
                                        </ScrollView>
                                        </View>
                                    ):(
                                        InfoActive ? (
                                            <View>
                                                <FlatList
                                                    data={DataInfo}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    enableEmptySections={true}
                                                    renderItem={MenuInfo}
                                                />
                                            </View>
                                        ):(
                                            <View>
                                                <Text></Text>
                                            </View>
                                        )
                                        )
                                    )
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
      header: {
        backgroundColor: '#000000',
        padding: 7,
      },
      headerText: {
        fontSize: 16,
        fontWeight: '500',
      },
      separator: {
        height: 0.5,
        backgroundColor: '#808080',
      },
      text: {
        fontSize: 16,
        color: '#FFFFFF',
        padding: 8,
        marginLeft: 20,
      },
      content: {
        marginLeft: 15,
        width: DEVICEWIDTH * 0.90,
        backgroundColor: '#606070',
      },
  });