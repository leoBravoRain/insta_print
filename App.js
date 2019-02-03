import React from 'react';
import { 

  Text, 
  View
} from 'react-native';
import {
      createStackNavigator,
      createAppContainer
    } from 'react-navigation';

import MyMapView from "./screens/map_screen.js"
import Home from "./screens/home.js"
import Print_Location_Details from "./screens/print_location_details.js"


const AppStackNavigator = createStackNavigator(

	{

  	Home: Home,
  	MyMapView: MyMapView,
    Print_Location_Details: Print_Location_Details,

	},

  { 
    headerMode: 'screen' 
  },

	{
  	initialRouteName: "Home",

	},


);


const App = createAppContainer(AppStackNavigator);

export default App;