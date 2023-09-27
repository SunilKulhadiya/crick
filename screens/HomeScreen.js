import React from "react";
import { View, Text, RefreshControl, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity,
        ActivityIndicator} from "react-native";
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native'


import HP from '../screen_presenter/Home_Presenter';

import BaseUrl from "../AppConfig";


const DEVICEWIDTH = Dimensions.get('window').width;
const DEVICEHEIGHT = Dimensions.get('window').height;

const HomeScreen = ({route}) => {

    const navigation = useNavigation();
    const [isLoading, set_isLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const MonthNm = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const isCarousel = React.useRef(null);
    const [page, setPage] = React.useState(0);
    const [Totalpage, setTotalPage] = React.useState(0);
    const [DATAFeaturedArt, Set_DATAFeaturedArt] = React.useState([]);
    const [DATACricketCov, Set_DATACricketCov] = React.useState([]);
    const [DATATop5, Set_DATATop5] = React.useState([]);
    const [DataCricketNews, Set_DataCricketNews] = React.useState([]);
    const [DataCricketSchdule, Set_DataCricketSchdule] = React.useState([]);
    const [DataCricketTeam, Set_DataCricketTeam] = React.useState([]);

    let day, month, year, CTeamActiveNo=0;
    const wait = timeout => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    };

    const FetchData=async ()=>{
      let FA, CV, Top5, CNws, CSchdule, CTeam;
      FA = await HP.Get_FeaturedArticles();
      Set_DATAFeaturedArt(FA);
      CV = await HP.Get_CricketCovrage();
      Set_DATACricketCov(CV);
      Top5 = await HP.Get_Top5Top10();
      Set_DATATop5(Top5);
      CNws = await HP.Get_CricketNews();
      Set_DataCricketNews(CNws);
      CSchdule = await HP.Get_CricketSchdule("posts?categories=1");
      Set_DataCricketSchdule(CSchdule);
      CTeam = await HP.Get_CricketTeam("posts?categories=3");
      Set_DataCricketTeam(CTeam);
      setTotalPage(CTeam.length);
      setTimeout(()=>{
        set_isLoading(false);
        setRefreshing(false)}, 100);
    }
    React.useEffect(async () => {
      FetchData();
    }, []);
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      FetchData();
    }, []);
  //-------------------------------
    const FeatArtRenderItem = ({ item }) => {
      let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, month;
        title=title.replace(/<\/?[^>]+>/gi, '');
        desc=desc.replace(/<\/?[^>]+>/gi, '');
        title= title.substring(0, 55);
        desc= desc.substring(0, 80);
        year = dt.substring(0, 4);
        month = dt.substring(6, 7);
        day = dt.substring(8, 10);

      return (
        <View style={styles.FeatArtcardContainer}>
          <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
              {title: "Featured Articles", PageID: item.id})}>
          <View style={{alignItems: 'center',}}>
            <Image source={{uri: item._links['wp:featuredmedia'][0].href}} style={styles.FeatArtcard} />
          </View>
          <Text style={styles.FeatArtLabel}>{title}...</Text>
          <Text style={styles.FeatArtLabelText}>{desc}...</Text>
          <View style={{flexDirection: "row", paddingLeft: 10, paddingBottom: 10, alignItems: "center"}}>
            <AntDesign name="calendar" size={24} color="grey"/>
            <Text style={{color: "grey", fontSize: 12, marginLeft: 7}}>
              {day} {MonthNm[month-1]} {year}</Text>
          </View>
          </TouchableOpacity>
        </View>
      );
    }
    //-------------------------------
    const CricketCovRenderItem = ({ item }) => {
      let title = item.title.rendered, desc = item.excerpt.rendered;
        title=title.replace(/<\/?[^>]+>/gi, '');
        desc=desc.replace(/<\/?[^>]+>/gi, '');
        title= title.substring(0, 51);
        desc= desc.substring(0, 80);
      return (
        <View style={styles.CricketCovCardContainer}>
          <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
              {title: "Cricket Coverage", PageID: item.id})}>
            <View style={{alignItems: 'center',}}>
              <Image source={{uri: item._links['wp:featuredmedia'][0].href}} style={styles.CricketCovCard} />
            </View>
            <Text style={styles.CricketCovLabel}>{title}...</Text>
            <Text style={styles.CricketCovLabelText}>{desc}...</Text>
          </TouchableOpacity>
        </View>
      );
    }
    //-------------------------------
    const CricketTeams = ({item}) => {
      let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, month;
        title=title.replace(/<\/?[^>]+>/gi, '');
        desc=desc.replace(/<\/?[^>]+>/gi, '');
        title= title.substring(0, 55);
        desc= desc.substring(0, 80);
        year = dt.substring(0, 4);
        month = dt.substring(6, 7);
        day = dt.substring(8, 10);

      return (
        <View style={styles.CTeamscardContainer}>
          <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
                  {title: "Cricket Teams", PageID: item.id})}>
            <View style={{alignItems: 'center',}}>
              <Image source={{uri: item._links['wp:featuredmedia'][0].href}} style={styles.CTeamscard} />
            </View>
            <Text style={{backgroundColor: "#FFFFFF", borderRadius: 8, fontSize: 14, color: "#2574EB",
                          marginTop: 8, width: 120, padding: 5, marginLeft: 5}}>
              Cricket Appeal</Text>
            <Text style={[styles.FeatArtLabel, {marginBottom: 0}]}>{title}...</Text>
          </TouchableOpacity>
        </View>
      );
    }
    //-------------------------------
    const Top5Top10 = (item) => {
      let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, time, month;
        title=title.replace(/<\/?[^>]+>/gi, '');
        desc=desc.replace(/<\/?[^>]+>/gi, '');
        title= title.substring(0, 75);
        desc= desc.substring(0, 80);
        year = dt.substring(0, 4);
        month = dt.substring(6, 7);
        day = dt.substring(8, 10);
        time = dt.substring(14, 16);

      return (
        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
                {title: title.substring(0, 20)+"...", PageID: item.id})}>
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
    //-------------------------------
    const CricketNews = (item) => {
      let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, time, month;
        title=title.replace(/<\/?[^>]+>/gi, '');
        desc=desc.replace(/<\/?[^>]+>/gi, '');
        title= title.substring(0, 75);
        desc= desc.substring(0, 80);
        year = dt.substring(0, 4);
        month = dt.substring(6, 7);
        day = dt.substring(8, 10);
        time = dt.substring(14, 16);

      return (
        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
        {title: title.substring(0, 20)+"...", PageID: item.id})}>
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
    //-------------------------------
    const CricketSchdule = (item) => {
      let title = item.title.rendered, desc = item.excerpt.rendered, dt = item.date, time, month;
        title=title.replace(/<\/?[^>]+>/gi, '');
        desc=desc.replace(/<\/?[^>]+>/gi, '');
        title= title.substring(0, 75);
        desc= desc.substring(0, 80);
        year = dt.substring(0, 4);
        month = dt.substring(6, 7);
        day = dt.substring(8, 10);
        time = dt.substring(14, 16);

      return (
        <TouchableOpacity key={item.id} onPress={()=>navigation.navigate("ShowDetail", 
        {title: title.substring(0, 20)+"...", PageID: item.id})}>
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
    //----------------------------
    return (
      <View style={styles.container}>
        {
          isLoading ? (
            <ActivityIndicator/>
          ):(
          <ScrollView
            showsVerticalScrollIndicator={false} 
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
          >
          <Text style={{marginBottom: 10, justifyContent: "center", alignItems: "flex-start",
                        color: "#FFFFFF", fontSize: 17}}>FEATURED ARTICLES</Text>
          <Carousel
            layout={"default"}
            data={DATAFeaturedArt}
            autoplay={true} loop={true} enableSnap={true} hasParallaxImages={false}
            activeSlideAlignment={'center'}
            renderItem={FeatArtRenderItem}
            sliderWidth={DEVICEWIDTH * 0.95}
            itemWidth={DEVICEWIDTH * 0.8}
          />

          <Text style={{marginTop: 12, marginBottom: 7, justifyContent: "center", alignItems: "flex-start",
                      color: "#FFFFFF", fontSize: 17}}>CRICKET COVERAGE</Text>
            <Carousel
              layout={"default"}
              data={DATACricketCov}
              enableSnap={true} hasParallaxImages={false}
              activeSlideAlignment={'center'}
              activeSlideOffset={0}
              firstItem={1}
              renderItem={CricketCovRenderItem}
              sliderWidth={DEVICEWIDTH * 0.95}
              itemWidth={DEVICEWIDTH * 0.5}
              itemHeight={DEVICEHEIGHT * 0.1}
          />

                  <View style={{marginTop: 10, flexDirection: "row"}}>
                      <Entypo name="trophy" size = {27} color = "#5EB9FE"/>
                      <Text style={{marginLeft: 10, justifyContent: "center",
                      alignItems: "flex-start", color: "#FFFFFF", fontSize: 17}}>
                          CURRENT SERIES</Text>
                  </View>
                  <View style={{marginBottom: 15, alignItems: "center", flexDirection: "column"}}>
                      <View style={{flexDirection: "row"}}>
                              <Text style={[styles.cardview2, {padding: 5, color: "#FFFFFF"}]}>
                                  Asia Cup</Text>
                              <Text style={[styles.cardview2, {padding: 5, marginLeft: 10,
                                  color: "#FFFFFF"}]}>Saurashtra Premier League</Text>
                      </View>
                      <Text style={[styles.cardview2, {padding: 5, marginTop: 10, color: "#FFFFFF"}]}>
                          New Zealand tour England</Text>
                      <Text style={[styles.cardview2, {padding: 5, marginTop: 10, color: "#FFFFFF"}]}>
                          Australia tour of South Africa</Text>
                      <Text style={[styles.cardview2, {padding: 5, marginTop: 10, color: "#FFFFFF"}]}>
                          Caribbean Premier League</Text>
                  </View>

                  <View style={{flexDirection: "row", marginBottom: 10}}>
                      <View style={[styles.cardview2, {padding: 10, flexDirection: "column",
                                  justifyContent: "center", alignItems: "center",
                                  width: DEVICEWIDTH * 0.46, height: DEVICEHEIGHT * 0.2}]}>
                          <Image source={require('../assets/medalBN.png')} style={{width: 95, height: 95}}/>
                          <Text style={{color: "white", fontSize: 20, marginTop: 0}}>RANKING</Text>
                      </View>
                      <View style={[styles.cardview2, {padding: 10, flexDirection: "column",
                                  justifyContent: "center", alignItems: "center", marginLeft: 10,
                                  width: DEVICEWIDTH * 0.46, height: DEVICEHEIGHT * 0.2}]}>
                          <Image source={require('../assets/teamBN.png')} style={{width: 95, height: 95}}/>
                          <Text style={{color: "white", fontSize: 20, marginTop: 0}}>TOP TEAMS</Text>
                      </View>
                  </View>
                  <View style={[styles.cardview2, {marginBottom: 0, marginTop: 5, flexDirection: "column",
                                  width: DEVICEWIDTH * 0.95, }]}>
                      <View style={{flexDirection: "row", marginTop: 5, marginLeft: 15}}>
                          <Entypo name="trophy" size = {27} color = "#5EB9FE"/>
                            <Text style={{left: DEVICEWIDTH * 0.22, alignItems: "center",
                                  color: "#FFFFFF", fontSize: 17}}>
                              CRICKET TEAMS</Text>
                      </View>
                      <View style={{alignItems: "center", marginTop: -5}}>
                        <Carousel
                          ref={isCarousel}
                          layout={"default"}
                          onSnapToItem={(page) => {
                            setPage(page)
                            console.log("HomeScreen.js, index : ", page)
                          }}
                          data={DataCricketTeam}
                          autoplay={true} loop={true} enableSnap={true} hasParallaxImages={false}
                          activeSlideAlignment={'center'}
                          renderItem={CricketTeams}
                          sliderWidth={DEVICEWIDTH * 0.95}
                          itemWidth={DEVICEWIDTH * 0.9}
                        />
                        <Pagination
                            activeDotIndex={page}
                            carouselRef={isCarousel}
                            tappableDots={true}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            dotsLength={DATAFeaturedArt.length}
                            dotStyle={{
                              width: 20,
                              height: 10,
                              borderRadius: 18,
                              backgroundColor: "#0074FF",
                            }}
                            containerStyle={{ paddingVertical: 3 }}
                            inactiveDotStyle={{
                              backgroundColor: "#A2A2A2",
                            }}
                        />
                      </View>
                  </View>

                  <Text style={{marginTop: 10, justifyContent: "center", alignItems: "flex-start",
                              color: "#FFFFFF", fontSize: 17}}>Top 5 / Top 10</Text>
                      <View style={{flexDirection: "column", justifyContent: "center",
                            alignItems: "center",}}>
                        {
                          DATATop5.map((item, index)=> {
                            if(index<3)
                              return Top5Top10(item)
                          })

                        }
                      </View>
                      <TouchableOpacity onPress={()=> navigation.navigate("HomeMoreDetail", 
                                {title: "Top 5 / Top 10"})}
                            style={{justifyContent: "center", alignItems: "center",
                              backgroundColor: "#5EB9FE", borderRadius: 10,
                              width: DEVICEWIDTH * 0.95, height: DEVICEWIDTH * 0.08,
                              marginTop: 10}}>
                          <Text style={{color: "white", fontSize: 12}}>VIEW MORE</Text>
                      </TouchableOpacity>

                      <Text style={{marginTop: 20, justifyContent: "center", alignItems: "flex-start",
                              color: "#FFFFFF", fontSize: 17,}}>
                                  CRICKET NEWS</Text>
                      <View style={{flexDirection: "column", justifyContent: "center",
                            alignItems: "center",}}>
                        {
                          DataCricketNews.map((item, index)=> {
                            if(index<3)
                              return CricketNews(item)
                          })
                        }
                      </View>

                      <TouchableOpacity onPress={()=> navigation.navigate("HomeMoreDetail", 
                                {title: "Cricket News"})}
                            style={{justifyContent: "center", alignItems: "center",
                              backgroundColor: "#5EB9FE", borderRadius: 10,
                              width: DEVICEWIDTH * 0.95, height: DEVICEWIDTH * 0.08,
                              marginTop: 10}}>
                          <Text style={{color: "white", fontSize: 12}}>MORE NEWS</Text>
                      </TouchableOpacity>

                      <Text style={{marginTop: 20, justifyContent: "center", alignItems: "flex-start",
                              color: "#FFFFFF", fontSize: 17,}}>
                                  CRICKET SCHDULE</Text>
                                  <View style={{flexDirection: "column", justifyContent: "center",
                            alignItems: "center",}}>
                        {
                          DataCricketSchdule.map((item, index)=> {
                            if(index<3)
                              return CricketSchdule(item)
                          })

                        }
                      </View>

                      <TouchableOpacity onPress={()=> navigation.navigate("HomeMoreDetail", 
                                {title: "Cricket Schdule"})}
                            style={{justifyContent: "center", alignItems: "center",
                              backgroundColor: "#5EB9FE", borderRadius: 10,
                              width: DEVICEWIDTH * 0.95, height: DEVICEWIDTH * 0.08,
                              marginTop: 10}}>
                          <Text style={{color: "white", fontSize: 12}}>{"MORE FROM IND vs Wl 2023 >"}</Text>
                      </TouchableOpacity>

                      <Image source={require('../assets/banner.jpg')} 
                              style={{width: DEVICEWIDTH * 0.95, height: 95, borderRadius: 10,
                              marginTop: 20,}}/>
              <View style={{marginTop: 10}}></View>
              </ScrollView>
          )
        }
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        paddingLeft: 10,
        paddingRight: 10,
    },
    FeatArtcardContainer: {
        alignContent: 'center',
        width: DEVICEWIDTH * 0.8,
        borderRadius: 8,
        backgroundColor: "#444444",
      },
      FeatArtcard: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: DEVICEWIDTH * 0.74,
        height: DEVICEWIDTH * 0.42,
        marginTop: 10,
      },
      FeatArtLabel: {
        borderTopLeftRadius: 8,
        color: "#FFFFFF",
        fontSize: 17,
        paddingTop: 1,
        paddingLeft: 10,
      },
      FeatArtLabelText: {
        fontSize: 12,
        color: 'grey',
        fontWeight: '600',
        paddingLeft: 10,
        paddingRight: 5,
        paddingTop: 2,
        marginBottom: 5,
      },
    
      CricketCovCardContainer: {
        alignContent: 'center',
        width: DEVICEWIDTH * 0.5,
        borderRadius: 8,
        backgroundColor: "#444444",
      },
      CricketCovCard: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: DEVICEWIDTH * 0.46,
        height: DEVICEWIDTH * 0.3,
        marginTop: 10,
      },
      CricketCovLabel: {
        borderTopLeftRadius: 8,
        color: "#FFFFFF",
        fontSize: 17,
        paddingTop: 10,
        paddingLeft: 10,
      },
      CricketCovLabelText: {
        fontSize: 12,
        color: 'grey',
        fontWeight: '600',
        paddingLeft: 10,
        paddingRight: 5,
        paddingTop: 2,
        marginBottom: 10,
      },
      CTeamscardContainer: {
        alignContent: 'center',
        width: DEVICEWIDTH * 0.9,
        borderRadius: 8,
      },
      CTeamscard: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: DEVICEWIDTH * 0.87,
        height: DEVICEWIDTH * 0.42,
        marginTop: 10,
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