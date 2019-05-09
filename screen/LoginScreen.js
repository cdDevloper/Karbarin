/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
       StyleSheet, 
       Text, 
       View,
       ImageBackground,
       TextInput,
       Image,
       TouchableOpacity,
       Animated,
      Dimensions,
       Keyboard} from 'react-native';

  const SCREEN_HEIGHT = Dimensions.get('window').height
import SplashScreen from 'react-native-splash-screen';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Icon} from 'native-base'//'react-native-vector-icons/Ionicons';
import {createStackNavigator,createAppContainer}from 'react-navigation'
import { Directions } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


class LoginScreen extends Component {

    static navigationOptions = {
      header:null
    }
  
  constructor(props){
     super(props)
     this.state = {
      placeholderText: 'Enter your mobile number'
  }
  }
  

  componentDidMount() {

  }

  componentWillMount(){
    this.loginHeight = new Animated.Value(150)

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow)

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide)

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)

    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)

    this.keyboardHeight = new Animated.Value(0)
    this.forwardArrowOpacity = new Animated.Value(0)
    this.borderBottomWidth = new Animated.Value(0)
  }

  keyboardWillShow = (event) => {

    if (Platform.OS == 'android') {
        duration = 100
    }
    else {
        duration = event.duration
    }

    
    Animated.parallel([

        Animated.timing(this.keyboardHeight, {
            duration: duration + 100,
            toValue: Platform.OS == 'android' ? 10 : event.endCoordinates.height + 10
        }),
        Animated.timing(this.forwardArrowOpacity, {
            duration: duration,
            toValue: 1
        }),
        Animated.timing(this.borderBottomWidth, {
            duration: duration,
            toValue: 1
        })

    ]).start()

}

keyboardWillHide = (event) => {

    if (Platform.OS == 'android') {
        duration = 100
    }
    else {
        duration = event.duration
    }

    Animated.parallel([

        Animated.timing(this.keyboardHeight, {
            duration: duration + 100,
            toValue: 0
        }),
        Animated.timing(this.forwardArrowOpacity, {
            duration: duration,
            toValue: 0
        }),
        Animated.timing(this.borderBottomWidth, {
            duration: duration,
            toValue: 0
        })

    ]).start()
}

  increaseHeightOfLogin = () =>{
    this.setState({ placeholderText: '092123456789' })
     Animated.timing(this.loginHeight,{
       toValue:SCREEN_HEIGHT,
       duration:500
     }).start(() =>{
       this.refs.txtInputRefrence.focus()
     })
  }
  
  decreaseHeightOfLogin = () =>{
     Animated.timing(this.loginHeight,{
       toValue:150,
       duration:500
     }).start(()=>{
      Keyboard.dismiss()
     })
  }

  render() {

       const headerTextOpacity = this.loginHeight.interpolate({
        inputRange:[150,SCREEN_HEIGHT],
        outputRange:[1,0]}
       )

       const marginTop = this.loginHeight.interpolate({
        inputRange:[150,SCREEN_HEIGHT],
        outputRange:[25,100]}
       )

       const headerBackArrowOpacity = this.loginHeight.interpolate({
        inputRange:[150,SCREEN_HEIGHT],
        outputRange:[0,1]}
       )

       const titleTextLeft = this.loginHeight.interpolate({
        inputRange: [150, SCREEN_HEIGHT],
        outputRange: [100, 25]
    })
    const titleTextBottom = this.loginHeight.interpolate({
        inputRange: [150, 400, SCREEN_HEIGHT],
        outputRange: [0, 0, 100]
    })
    const titleTextOpacity = this.loginHeight.interpolate({
        inputRange: [150, SCREEN_HEIGHT],
        outputRange: [0, 1]
    })
        return (
          <View style={styles.container}>

          <Animated.View 
              style={{position:'absolute',
                      height:60, width:60,
                      top:60,
                      left:25,
                      zIndex:100,
                      opacity:headerBackArrowOpacity
               }}
          >
               <TouchableOpacity onPress={()=>
                 this.decreaseHeightOfLogin()
               }>  
                  <Icon name="md-arrow-back"  style={{color:"black"}} />
               </TouchableOpacity> 
          </Animated.View>

          <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60, width: 60,
                        right: 10,
                        bottom: this.keyboardHeight, // animated
                        opacity: this.forwardArrowOpacity,//animated
                        zIndex: 100,
                        backgroundColor: '#54575e',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30
                    }}
                >
                    <Icon name="md-arrow-forward" style={{ color: 'white' }} />
                </Animated.View>
            <ImageBackground 
             source={require('../assets/login_bg.jpg')}
             style={styles.container}>
                <View style={styles.appNameMainView}>
                   <Animatable.View animation='zoomIn' iterationCount={1}
                      style={styles.appNameChildView}>
                      <Text styles={styles.appName}>KARBARIN</Text>
                   </Animatable.View>
                </View>


                <Animatable.View animation='slideInUp' iterationCount={1}>
                      <Animated.View style={[styles.userInputParentView,{height:this.loginHeight}]}>
                         <Animated.View style={[styles.inputTextView,{opacity:headerTextOpacity,marginTop:marginTop}]}>
                            <Text style={{fontSize:24}}>Get clean cloth with Karbarin</Text>
                         </Animated.View>

                         <TouchableOpacity onPress={()=> this.increaseHeightOfLogin()}>
                           <Animated.View style={[styles.inputChildView,{marginTop: marginTop}]}>
                              
                                  <Animated.Text
                                        style={{
                                            fontSize: 24, color: 'gray',
                                            position: 'absolute',
                                            bottom: titleTextBottom,//animated
                                            left: titleTextLeft,//animated
                                            opacity: titleTextOpacity//animated
                                        }}
                                    >
                                        Enter your mobile number
                                </Animated.Text>
                             
                               <Animated.View pointerEvents="none" style={{flex:1,flexDirection:'row',alignItems: 'center',justifyContent: 'center',borderBottomWidth: this.borderBottomWidth}}>
                                   <Image source={require('../assets/india.png')}
                                     style={styles.imgFlag}/>
                                    <Text style={{paddingHorizontal:10,fontSize:20}}>+91</Text>
                                    <TextInput style={{flex:1,fontSize:20,}}
                                     keyboardType="numeric"
                                     placeholder={this.state.placeholderText}
                                     underlineColorAndroid="transparent"
                                     ref='txtInputRefrence'
                                     />        
                               </Animated.View>
                           </Animated.View>
                        </TouchableOpacity>
                      </Animated.View>
                </Animatable.View>
            </ImageBackground>
          </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appNameMainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameChildView:{
      backgroundColor:'white',
      width:100,
      height:100,
      alignItems: 'center',
      justifyContent: 'center',
  },
  appName:{
  fontWeight:'bold',
  fontSize:26
  },
  userInputParentView:{
      backgroundColor:'white',
      height:150,
  },
  inputTextView:{
    opacity:1,
    alignItems:'flex-start',
    paddingHorizontal:25,
    marginTop:15
},
inputChildView:{
    flexDirection:'row',
    paddingHorizontal:25,
    marginTop:25
},
imgFlag:{
  width:24,
  height:24,
  resizeMode:'contain'
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
});

const AppStackNavigator = createStackNavigator({
    LoginScreen:{screen:LoginScreen}
  })

export default createAppContainer(AppStackNavigator);