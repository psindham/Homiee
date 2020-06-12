import React, { Component } from 'react';
import { Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo'; 


 export class DashboardScreen extends Component {  
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
        <ScrollView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <TouchableOpacity style={styles.stateView}  onPress={()=>{this.props.navigation.navigate('OutPass')}} >
            <ImageBackground source={require('./../../images/blueDesign.jpg')}
              style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                  <View style={{alignItems:'flex-end',justifyContent:'center'}}>
              <Text style={{color:'#00bfff',fontSize:25}} >Going Out ?  </Text>
              <Text style={{color:'#00bfff',fontSize:20}} >Get Out Pass  </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>   
          <TouchableOpacity style={styles.stateView}  onPress={()=>{this.props.navigation.navigate('Complaint')}} >
          <ImageBackground source={require('./../../images/blueDesign2.jpg')}
              style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                  <View style={{alignItems:'flex-start',justifyContent:'center'}}>
            <Text style={{color:'#66cc66',fontSize:25}}>Having any Issues ?</Text>
            <Text style={{color:'#66cc66',fontSize:20}}>Complaint it </Text>
            </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity style={styles.stateView}  onPress={()=>{this.props.navigation.navigate('PollScreen')}} >
          <ImageBackground source={require('./../../images/blueDesign3.jpg')}
              style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                   <View style={{alignItems:'flex-end',justifyContent:'center'}}>
            <Text style={{color:'#804000',fontSize:25}}>Participate in Poll {this.state.stayersCount} </Text></View>
            </ImageBackground>
          </TouchableOpacity>
          {/* <View style={styles.stateView} elevation={5}>
          <ImageBackground source={require('./../../images/blueDesign4.jpg')}
              style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
            <Text style={{color:'#cc0099',fontSize:18}}>Expenses total amount {this.state.Amount} </Text>
            <Text style={{color:'#cc0099',fontSize:18}}>Total UnPaid amount {this.state.unpaidAmount} </Text>
            <Text style={{color:'#cc0099',fontSize:18}}>Total   Paid    amount {this.state.paidAmount} </Text>
            </ImageBackground>
          </View> */}
          <View style={styles.stateView} elevation={5}>
          <ImageBackground source={require('./../../images/blueDesign5.jpg')}
              style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                   <View style={{alignItems:'flex-end',justifyContent:'center'}}>
            <Text style={{color:'#ff8c1a',fontSize:25}}>Advertisement </Text></View>
            </ImageBackground>
          </View>
        </ScrollView>
      );  
    }  
}
const styles = StyleSheet.create({
  stateView: {
    width: '95%',
    height: 170,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    shadowColor: 'black',
shadowOpacity: 0.8,
elevation: 6,
  },
});
