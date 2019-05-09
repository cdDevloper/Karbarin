/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppStackNavigator from './screen/LoginScreen'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component {
  
  constructor(props){
     super(props)
     this.state = {
        show_main_app:false,
     };
  }

  on_Done_all_slides = () => {
    this.setState({ show_Main_App: true });
  };

  // on_Skip_slides = () => {
  //   this.setState({ show_Main_App: true });
  // };

  _renderNextButton = () => {
    
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }

  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    if (this.state.show_Main_App) {
        return (
          <AppStackNavigator/>
        );
    } else {
      // return (
      //   <AppIntroSlider
      //     slides={slides}
      //     onDone={this.on_Done_all_slides}
      //     showSkipButton={true}
      //     onSkip={this.on_Skip_slides}
      //   />
      // );
      return (
        <AppIntroSlider
          slides={slides}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          onDone={this.on_Done_all_slides}
        />
      );
      
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    key: 'k1',
    title: 'Clean cloth from great store near you.',
    text: '',
    image: {
      uri:
        'https://reactnativecode.com/wp-content/uploads/2019/04/calendar.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FF1744',
  },
  {
    key: 'k2',
    title: 'Select your items for your order.',
    text: '',
    image: {
      uri:
        'https://reactnativecode.com/wp-content/uploads/2019/04/calendar.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FF1744',
  },
  {
    key: 'k3',
    title: 'Schdule your pickup/delivery from anywhere.',
    text: '',
    image: {
      uri:
        'https://reactnativecode.com/wp-content/uploads/2019/04/cloud.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#D500F9',
  },
  {
    key: 'k4',
    title: 'Pay easily using any of the payment methods.',
    text: '',
    image: {
      uri:
        'https://reactnativecode.com/wp-content/uploads/2019/04/restaurants.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#FF3D00',
  },
  {
    key: 'k5',
    title: 'Track your order from pickup to delivery',
    text: '',
    image: {
      uri: 'https://reactnativecode.com/wp-content/uploads/2019/04/computer.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#2979FF',
  }
];