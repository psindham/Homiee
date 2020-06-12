/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { Home_Login_Signup } from './Home_Login_Signup';
import {A_RootLoginSignup} from './Admin/A_RootLoginSignup';
import {S_RootLoginSignup} from './Stayer/S_RootLoginSignup';

const RootStack = createStackNavigator(
  {
    Home: Home_Login_Signup,
    A_RootLoginSignup:A_RootLoginSignup,
    S_RootLoginSignup:S_RootLoginSignup
  },
  {
    initialRouteName: 'Home'
  },
);
const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  static navigationOptions = {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  };
  render() {
    return <AppContainer />;

  }
}

