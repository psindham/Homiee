import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {A_FirstLogin} from './A_FirstLogin';
import {ForgotPass} from './ForgotPass';
import {SignupDetails1} from './SignupDetails1';
import { A_HomePage } from './A_HomeScreens/A_HomePage';

const RootStack = createStackNavigator(
  {
    FirstLogin:A_FirstLogin,
    SignupNav:SignupDetails1,
    HomePage:A_HomePage,
    ForgotPass:ForgotPass,
  },
  {
    initialRouteName: 'FirstLogin'
  },
);
const AppContainer = createAppContainer(RootStack);

export  class A_RootLoginSignup extends Component {
  static navigationOptions = {
    header:null,
  };
  render() {
    return <AppContainer />;
  }
}

