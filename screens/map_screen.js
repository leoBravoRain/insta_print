import React from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  // PermissionsAndroid,
  ProgressBarAndroid
} from 'react-native';
import MapView from 'react-native-maps'
import { Header } from 'react-native-elements';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initial_region = {

  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,

}

const marker_position = {

  latitude : 37.78825,
  longitude: 73.246758,
}


const risks_markers = [

  {latitude:-39.793534, longitude:   -73.218482},

]

// Vibration pattern
const PATTERN = [300, 500] // wait, vibrate, wait, vibrate, ...

// Limit to risk
const limit_dist_to_risk = 0.03;


// Define class
class MyMapView extends React.Component {

  // Nav bar
  static navigationOptions = {

    title: 'Impresoras más cercanas',
    headerStyle: {
      backgroundColor: '#3f5fe0',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },

  };

  //Constructor
  constructor(props) {
    super(props);
  
    this.state = {

      get_user_position: false,
      get_markers: false,
      initialRegion : initial_region,
      marker_position: marker_position,
      risks_markers: risks_markers,

    };
  }
 

  watchId : ?number = null;

  // method for load daata
  componentDidMount(){

    // When the location changes
    this.watchId = navigator.geolocation.watchPosition(

      // Get position
      (position) => {

        // Update initial position
        this.setState({

          // Update user position 
          get_user_position: true,

          // Update position to user position
          initial_region : {

            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,

          },

          // Update position to user position
          marker_position: {

            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),

          }

        });

      }

    )

    // get markers
    fetch('https://insta-print-api.herokuapp.com/location/?format=json')
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({

              risks_markers: responseJson.results,
              get_markers: true,

            });

          })
          .catch((error) => {
            console.error(error);
          });    

  }

  componentWillUnmount(){

    navigator.geolocation.clearWatch(this.watchId);

  }

  render(){

    return(

      <View style = {styles.container_flex}>

        { this.state.get_user_position && this.state.get_markers ? 

            <MapView

              showUserLocation
              region = { this.state.initial_region }
              style = {{width: '100%', height: '100%'}}

            >

                { 

                  this.state.risks_markers.map( (marker, index) => (

                    <MapView.Marker

                      key = {index}

                      coordinate = {{latitude: parseFloat(marker.latitude), longitude: parseFloat(marker.longitude) }}

                      onPress = {() => this.props.navigation.push("Print_Location_Details", {marker: marker})}

                    >
                    </MapView.Marker>

                  ))

                }

              <MapView.Marker

                coordinate = {this.state.marker_position}
                pinColor = {"#474744"}

              />

            </MapView>

          :

            <ProgressBarAndroid />

        }

        </View>


    )
  }

}

const styles = StyleSheet.create({

  container_flex : {

    flex:1 ,
    justifyContent: 'center', 
    alignItems: 'center'
  }

})

export default MyMapView;

