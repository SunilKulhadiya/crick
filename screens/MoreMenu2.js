import React from "react";
import { useNavigation } from '@react-navigation/native'
import { View, Text, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator,
        StyleSheet, UIManager, LayoutAnimation} from "react-native";
import { Entypo, Ionicons } from '@expo/vector-icons';

import SMR from "../repository/SMenu_Repository";

const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;

export default function MoreMenus({route}){
    const navigation = useNavigation();

    const [isLoading, set_isLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [multiSelect, setMultiSelect] = React.useState(false);

    const [MoreMenu, Set_Menu] = React.useState([]);

    const FetchData = async ()=>{
        let menu, ms=[];
            menu = await SMR.Get_MoreMenu("IPL");
            ms.push(menu);
            menu = await SMR.Get_MoreMenu("IPL Teams");
            ms.push(menu);
            // ms.push({"ID": "0", "Title": "Asia Cup", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            // ms.push({"ID": "0", "Title": "World Cup News", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            // ms.push({"ID": "0", "Title": "Players", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            // ms.push({"ID": "0", "Title": "Cricket Web Stories", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            // ms.push({"ID": "0", "Title": "IPL Match Winner History & API", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            // ms.push({"ID": "0", "Title": "Other Sports", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            // ms.push({"ID": "0", "Title": "About Us", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            // ms.push({"ID": "0", "Title": "Contact Us", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            // ms.push({"ID": "0", "Title": "Write For Us", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            // ms.push({"ID": "0", "Title": "Partner With Us", "isSubmenu": false,
            //     "post_parent": "", "isExpanded": false, "submenu": []});
            Set_Menu(ms);
        setTimeout(()=> {
            console.log("MoreMenu.js, Menu : ", ms);
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if(item.isSubmenu){
                    onClickFunction()
                }else{
                    onClickFunction()
                }
              }}
              style={styles.header}>
                <View style={{flexDirection: 'row', marginLeft: 5}}>
                    {
                    item.category_name == 'IPL' ? (
                        <Image source={require('../assets/hitter.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'IPL Teams' ? (
                        <Image source={require('../assets/cricket_helmet.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'Asia Cup' ? (
                        <Image source={require('../assets/cricket.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'World Cup News' ? (
                        <Image source={require('../assets/trophy.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'Players' ? (
                        <Image source={require('../assets/throw.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'Cricket Web Stories' ? (
                        <Image source={require('../assets/list.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'IPL Match Winner History & API' ? (
                        <Image source={require('../assets/book.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'Other Sports' ? (
                        <Image source={require('../assets/pending.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'About Us' ? (
                        <Entypo name="info-with-circle" size={24} color="#7B94EC"/>
                    ):(
                    item.category_name == 'Contact Us' ? (
                        <Image source={require('../assets/customer_service.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'Write For Us' ? (
                        <Image source={require('../assets/writing.png')} style={{width: 24, height: 24}} />
                    ):(
                    item.category_name == 'Partner With Us' ? (
                    <FontAwesome name="handshake-o" size={24} color="#7B94EC" />
                    ):(
                        <></>
                    )
                    )
                    )
                    )
                    )
                    )
                    )
                    )
                    )
                    )
                    )
                    )
                    }
                    <Text style={[styles.headerText, {width: "87%",
                                color: item.isExpanded ? "#5EB9FE":"#FFFFFF",}]}>
                        {item.Title}
                    </Text>
                    {
                        item.isSubmenu ? (
                            <Entypo name="chevron-right" size={28} color="#FFFFFF"
                            style={{transform: [{rotate: item.isExpanded ? '90deg' : '0deg'}]}}/>
                        ):(
                            <></>
                        )
                    }
                  </View>
            </TouchableOpacity>
            <View style={{width: "auto", height: 1, backgroundColor: "#C0BBBB"}}/>
            
            <View style={{height: layoutHeight, overflow: 'hidden', }}>
              {/*Content under the header of the Expandable List Item*/}
              {item.submenu.map((item, key) => {
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
                }
              )}
            </View>
          </View>
        );
    };
        
    const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...MoreMenu];
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
            <View style={{height: "100%",flexDirection: "row", marginLeft: 5,}}>
                <ScrollView>
                    {MoreMenu.map((item, key) => (
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
      padding: 10,
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
      backgroundColor: '#606070',
    },
  });  