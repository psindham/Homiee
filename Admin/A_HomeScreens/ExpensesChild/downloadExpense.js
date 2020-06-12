import React, { Component } from 'react';
import {Text,View} from 'react-native';
import * as firebase from 'firebase';


 export class downloadExpense extends Component {  
    static navigationOptions = {  
        title: '                 Homiess',  
   };
  
    render() {  
        return (  
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                <Text>DownLoad Screen</Text>  
            </View>  
        );  
    }  
}
