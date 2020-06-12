import React, { Component } from 'react';
import {StyleSheet, Text, View,Button} from 'react-native';  
import {  createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import Icon2 from 'react-native-vector-icons/Entypo'; 
import {addExpense} from './ExpensesChild/addExpense';
import {downloadExpense} from './ExpensesChild/downloadExpense';
import {searchExpense} from './ExpensesChild/searchExpense';
const TabNavigator = createMaterialBottomTabNavigator(  
    {  
      Add: { screen: addExpense,  
            navigationOptions:{  
                tabBarLabel:'Add',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon2 style={[{color: tintColor}]} size={25} name={'add-to-list'}/>  
                    </View>),
            }  
        },  
        View: { screen: searchExpense,  
            navigationOptions:{  
                tabBarLabel:'View',  
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'feature-search'}/>  
                    </View>),  
                      activeColor: 'white',  
                      inactiveColor: '#00b3b3',  
                     barStyle:{backgroundColor:'#006666'},  
            }  
        },  
    },  
    {  
      initialRouteName: "Add",  
      activeColor: '#f0edf6',  
      inactiveColor: '#226557',  
      barStyle: { backgroundColor: '#3BAD87' },  
    },  
);  
  
const Exp=  createAppContainer(TabNavigator);  

export class ExpenseScreen extends Component {  
  static navigationOptions=({navigation}) => {
    return{
    title:"                Expenses",
    headerRight: (  
        <Icon2 
            style={{ paddingRight: 10 }}  
            onPress={() => navigation.navigate('Notification')}  
            name="notification"  
            size={30}  
        /> 
    ) 
    }
   };
render() {  
      return <Exp/>;  
  }  
}  
