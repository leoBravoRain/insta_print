import React, { Component } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  // Button,
  Linking,
  ImageBackground
} from 'react-native';

import { 
  Badge,
  Button
} from 'react-native-elements';

// Home screen
export default class Print_Location_Details extends Component {

  // Nav bar
  static navigationOptions = {

    title: 'Contacto',
    headerStyle: {
      backgroundColor: '#3f5fe0',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    
  };

  constructor(props) {

    super(props);

    this.state = {

      phone_number : this.props.navigation.state.params.marker.phone_number,

    };

  }

  // Render method
  render() {

    const url = "https://wa.me/";

    return (

      <View style = {styles.container_flex}>

         <ImageBackground 
          source={{uri: 

            "http://images.all-free-download.com/images/graphiclarge/colorful_glowing_bubbles_background_vector_illustration_148036.jpg"
          }}
          style={styles.image_background}
          resizeMode='contain' 
          >

            <Text style = {{color: "black", fontSize: 50, "fontWeight": 'bold'}}>

                { this.state.name }

            </Text>

            <Text style = {{color: "black", fontSize: 20, "fontWeight": 'bold'}}>

                { this.state.phone_number }

            </Text>


            <Button 

              raised

              // style = {{color: '3f5fe0'}}

              onPress = {() => Linking.openURL(url + this.state.phone_number )}

              title = "Hablar por wsp"

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

  container_flex : {

    flex:1 ,
    justifyContent: 'center', 
    alignItems: 'center'
  },

  image_background: {

    flex: 1,
    // remove width and height to override fixed static size
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    alignItems: 'center'

  },

})