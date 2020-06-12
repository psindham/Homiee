import React, { Component } from 'react';
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo'; 


 export class pgtest extends Component {  
     state={
         email:''
     }
    static navigationOptions=({navigation}) => {
        return{
        title:"                Homiees",
        }
       };
  
    render() {  
        return (  
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
                 <TouchableOpacity
        style={styles.button}
        onPress={()=>{this.props.navigation.navigate('Pg')}}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
            </View>  
        );  
    }  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 10
    },
    button: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    }
  });