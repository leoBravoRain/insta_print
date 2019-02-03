import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  PermissionsAndroid,
  NetInfo
  // Button,
} from 'react-native';

import { Button } from 'react-native-elements';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { NavigationActions, withNavigation } from 'react-navigation';
import GPSState from 'react-native-gps-state';


// Permissions
async function requestLocationPermission() {

  try {

    const granted = await PermissionsAndroid.request(

      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Permiso para localización',
        'message': 'Para entregarte el mejor servicio, necesitas darnos el permiso para acceder a tu posición actual'
      }

    )

    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {

    //   console.log("Location is accepted");

    // } else {
      
    //   console.log("Location is accepted");

    // }
  } catch (err) {
    console.warn(err)
  }
}

// ask for permissions
requestLocationPermission();

class HelloWorldApp extends Component {

  // hide nav bar
  static navigationOptions = {

    header: null,

  }

  // manage click on button 
  manage_click(){

    // initialize network connection variable
    var connection_state = false;

    // Get network connection
    NetInfo.getConnectionInfo().then((connectionInfo) => {

      // get connection state
      connection_state = connectionInfo.type != "none" ? true : false;

      // If isn't connected to internet
      if(!connection_state){

        // Alert message for user
        Alert.alert(
          'Conección a internet',
          'Para poder usar nuestra app, debes estar conectado a internet',
          [
            {text: 'Me conectaré'},
          ],
          { cancelable: false }
        )

      }

    });

    // Get gps state
    GPSState.getStatus().then((status)=>{

      // Initialize variable
      var gps_state = false;

      // If gps is activated
      if(status == 3 || status == 4){

        // Set state
        gps_state = true;

        // push to next page
        if(connection_state && gps_state){

          // Navitage to next page
          this.props.navigation.push("MyMapView");     

        };

      }

      // If gps is not activated
      else{

        // Dialog for accesor to user location
        LocationServicesDialogBox.checkLocationServicesIsEnabled({

          message: "<h2>Tu ubicación</h2> Para poder mostrarte las impresoras más cercanas, necesitamos saber tu ubicación actual.",
          ok: "Activar ubicación",
          cancel: "No permitir",
          
        });

      }
     
    });

  }

  // Render method
  render() {

    return (

      <View style = {styles.container_flex}>

        <ImageBackground 
          source={{uri: 'https://i.pinimg.com/originals/54/b9/d6/54b9d67703ff3909cb0b0c1de9adbbcc.jpg'}}
          style={styles.image_background}
          resizeMode='stretch' 
          >

          <Button
            raised

            title="Buscar impresora mas cercana"

            onPress = {this.manage_click.bind(this)}

            buttonStyle={{
              backgroundColor: "#3f5fe0",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              // borderRadius: 5
            }}
          />

        </ImageBackground>

      </View>

    );

  }

}

const styles = StyleSheet.create({

  image_background: {

    flex: 1,
    // remove width and height to override fixed static size
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center'

  },

  container_flex : {

    flex:1 ,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  button: {
    // margin: 5,
    backgroundColor: 'rgb(100,100,100)',
    borderRadius: 30,
  }

})

export default withNavigation(HelloWorldApp);


