import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {S_FirstLogin} from './S_FirstLogin';
import {SignupDetails1} from './SignupDetails1';
import {SelectPg}from './SelectPg';
import {HomePage} from './S_HomeScreen/HomePage'
import {LogoutScreen} from './S_HomeScreen/LogoutScreen';
import {ForgotPass} from './ForgotPass'

const RootStack = createStackNavigator(
  {
    S_FirstLogin:S_FirstLogin,
    SignupNav:SignupDetails1,
    SelectPg:SelectPg,
    HomePage:HomePage,
    ForgotPass:ForgotPass,
  },
  {
    initialRouteName: 'S_FirstLogin'
  },
);
const AppContainer = createAppContainer(RootStack);

export  class S_RootLoginSignup extends Component {
  static navigationOptions = {
    header:null,
  };
  render() {
    return <AppContainer />;
  }
}

