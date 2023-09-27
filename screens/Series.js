import React from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator,
        StyleSheet, UIManager, LayoutAnimation} from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';

import SMR from "../repository/SMenu_Repository";

const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;

export default function Series({route}){
    const navigation = useNavigation();

    const [isLoading, set_isLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [multiSelect, setMultiSelect] = React.useState(false);

    const [SeriesMenu, Set_Menu] = React.useState([]);

    const FetchData = async ()=>{
        let menu;
            menu = await SMR.Get_SeriesFirstM();
            Set_Menu(menu);
            console.log("Series.js, menu : ", menu);
        setTimeout(()=> {
            setRefreshing(false);
            set_isLoading(false);
        }, 100);
    }
    React.useEffect(() => {
        setRefreshing(true);
        FetchData();
        setTimeout(()=> {
            setRefreshing(false);
        }, 100);
    }, []);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        //FetchData(); 
        setTimeout(()=> {
            setRefreshing(false);
        }, 100);
    }, []);

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    
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
            <View style={{borderColor: "#C0BBBB", borderRadius: 4, borderWidth: 1,
                          width: DEVICEWIDTH * 0.95,}}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => {onClickFunction()}}
                  style={styles.header}>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                  <Text style={[styles.headerText, {width: "87%",
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
    const array = [...SeriesMenu];
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
    Set_Menu(array);
    };
//------------------------------------
    return (
        <View>
        {
            isLoading ? (
                <ActivityIndicator/>
            ):(
            <View style={{height: "100%",flexDirection: "row", marginLeft: 0,}}>
                <ScrollView>
                    {SeriesMenu.map((item, key) => (
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
            )
        }
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