import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer,} from "@react-navigation/native";

import Prediction from './screens/Predictions';
import WorldCup from './screens/WorldCup';
import Series from './screens/Series';
import RouteScreen from './screens/RouteScreen';
import HomeScreen from './screens/HomeScreen';
import MoreMnu from './screens/MoreMenu';
import MoreMenus from './screens/MoreMenu1'
import HomeMoreDetails from './screens/home_pages/HomeMoreDetail';
import ShowDetails from './screens/ShowDetail';
import SeriesM_Details from './screens/SeriesM_Detail';


const Stack = createNativeStackNavigator();

export default function App(){

  function StackNavigator(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='HomePage' initialParams={{screen_no: "0", title: 'ICC '}} component={RouteScreen}
                      options={{headerShown: false,
                      headerStyle: {backgroundColor: "#84CFC2"}}}/>
        <Stack.Screen name='HomeScreen' initialParams={{screen_no: "1", title: 'First Page'}} 
                      component={HomeScreen} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#84CFC2"}}}/>
        <Stack.Screen name='SeriesStack' initialParams={{screen_no: "2", title: 'Second Page'}} 
                      component={Series} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#84CFC2"}}}/>
        <Stack.Screen name='WorldCup' initialParams={{screen_no: "3", title: 'First Page'}} 
                      component={WorldCup} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#84CFC2"}}}/>
        <Stack.Screen name='Predictions' initialParams={{screen_no: "4", title: 'Second Page'}} 
                      component={Prediction} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#84CFC2"}}}/>
        <Stack.Screen name='MoreMenu' initialParams={{screen_no: "5", title: 'Second Page'}} 
                      component={MoreMnu} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#84CFC2"}}}/>
        <Stack.Screen name='MoreMenus' initialParams={{screen_no: "6", title: 'Second Page'}} 
                      component={MoreMnu} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#84CFC2"}}}/>
        {/* <Stack.Screen name='MoreMnu' initialParams={{screen_no: "6", title: 'Second Page'}} 
                      component={MoreMnu} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#5EB9FE"}}}/> */}
        <Stack.Screen name='HomeMoreDetail' initialParams={{screen_no: "6", title: 'Second Page'}} 
                      component={HomeMoreDetails} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#5EB9FE"}}}/>
        <Stack.Screen name='ShowDetail' initialParams={{screen_no: "6", title: 'Second Page'}} 
                      component={ShowDetails} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#5EB9FE"}}}/>
        <Stack.Screen name='SeriesMDetails' initialParams={{screen_no: "6", title: 'Second Page'}} 
                      component={SeriesM_Details} options={{headerShown: false,
                      headerStyle: {backgroundColor: "#5EB9FE"}}}/>
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
        <StackNavigator/>
    </NavigationContainer>
  );
}