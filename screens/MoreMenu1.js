import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign, FontAwesome } from '@expo/vector-icons';
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';

const MoreMenus = ({navigation, route}) => {
  //const [listDataSource, setListDataSource] = useState(CONTENT);
  const [listDataSource, setListDataSource] = useState([
                {"category_name": "IPL", "isExpanded": false,
                    "subcategory": [{"id": 1, "val": "IPL 2024"}, 
                                    {"id": 2, "val": "IPL Points Table"},
                                    {"id": 2, "val": "IPL Orange Cap"},
                                    {"id": 2, "val": "IPL Purple Cap"},
                                    {"id": 2, "val": "IPL News"},
                                    {"id": 2, "val": "IPL Schedule"},
                                    ]},
                {"category_name": "IPL Teams", "isExpanded": false,
                    "subcategory": [{"id": 1, "val": "Chennai Super King"},
                                    {"id": 3, "val": "Delhi Capitals"},
                                    {"id": 1, "val": "Gujarat Titans"},
                                    {"id": 1, "val": "Kolkata Knight Riders"},
                                    {"id": 1, "val": "Lucknow Super Giants"},
                                    {"id": 1, "val": "Mumbai Indians"},
                                    {"id": 1, "val": "Punjab Kings"},
                                    {"id": 1, "val": "Rajasthan Royals"},
                                    {"id": 1, "val": "Royal Challengers Banalore"},
                                    {"id": 1, "val": "Sunrisers Hyderabad"}
                                    ]},
                {"category_name": "Asia Cup", "isExpanded": false,
                    "subcategory": []},
                {"category_name": "World Cup News", "isExpanded": false,
                    "subcategory": []},
                {"category_name": "Players", "isExpanded": false,
                    "subcategory": []},
                {"category_name": "Cricket Web Stories", "isExpanded": false,
                    "subcategory": []},
                {"category_name": "IPL Match Winner History & API", "isExpanded": false,
                    "subcategory": []},
                {"category_name": "Other Sports", "isExpanded": false,
                    "subcategory": []},
                {"category_name": "About Us", "isExpanded": false,
                    "subcategory": []},
                {"category_name": "Contact Us", "isExpanded": false,
                    "subcategory": []},
                {"category_name": "Write For Us", "isExpanded": false,
                    "subcategory": []},
                {"category_name": "Partner With Us", "isExpanded": false,
                    "subcategory": []},
                ]);
  const [multiSelect, setMultiSelect] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const ExpandableComponent = ({ item, onClickFunction }) => {
    //Custom Component for the Expandable List
    const [layoutHeight, setLayoutHeight] = useState(0);
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
            console.log("MoreMenu1.js, ExpandableComponent, item.isExpanded : ", item.isExpanded);
            if(item.category_name == 'IPL' || item.category_name == 'IPL Teams'){
              onClickFunction()
            }else{
              setLayoutHeight(0);
              navigation.navigate("MoreMnu", {title: item.category_name})
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
                <Text style={[styles.headerText, {width: "82%", marginLeft: 10,
                            color: item.isExpanded ? "#5EB9FE":"#FFFFFF",}]}>
                    {item.category_name}
                </Text>
                {
                    item.category_name == 'IPL' || item.category_name == 'IPL Teams' ? (
                        <Entypo name="chevron-right" size={28} color="#FFFFFF"
                            style={{transform: [{rotate: item.isExpanded ? '90deg' : '0deg'}]}}/>
                    ):(
                        <View/>
                    )

                }
              </View>
        </TouchableOpacity>
        <View style={{width: "auto", height: 1, backgroundColor: "#FFFFFF"}}/>
        
        <View style={{height: layoutHeight, overflow: 'hidden', }}>
          {/*Content under the header of the Expandable List Item*/}
          {item.subcategory.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.content}
              onPress={() => navigation.navigate("MoreMnu", {title: item.val})}
            >
              <Text style={styles.text}>
                {item.val}
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
    const array = [...listDataSource];
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
    setListDataSource(array);
  };
//-----------------------------
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          {listDataSource.map((item, key) => (
            <ExpandableComponent
              key={item.category_name}
              onClickFunction={() => {
                updateLayout(key);
              }}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MoreMenus;

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
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    padding: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#606070',
  },
});