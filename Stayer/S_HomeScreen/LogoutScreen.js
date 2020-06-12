import React, { Component } from 'react';
import {Text,View,Modal,StyleSheet,TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo'; 

export class LogoutScreen extends Component {  
     state={
         email:'',
         isVisible:true
     }
    static navigationOptions= {
       header:null
       };
    render() {  
        return (  
            <View>
                <Text>Heloo</Text>
            <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.isVisible}>
              <View style={styles.modal}>
                <Icon2
                  name="error"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={styles.text}>{this.state.error}</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    height: 50,
                    marginBottom: 50,
                  }}>
                      <TouchableOpacity
                    onPress={() => {
                      this.setState({isVisible: !this.state.isVisible});
                      this.props.navigation.navigate('FirstLogin');
                    }}
                    style={styles.touchop}>
                    <Text style={styles.textdesign}>OK</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({isVisible: !this.state.isVisible});
                    }}
                    style={styles.touchop}>
                    <Text style={styles.textdesign}>cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          </View>
        );  
    }  
}
const styles = StyleSheet.create({
    modelContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
      },
      modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        height: 250,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 150,
        marginLeft: 40,
      },
      text: {
        color: 'white',
        marginTop: 20,
        fontSize: 25,
      },
      touchop: {
        padding: 10,
        height: 50,
        width: 100,
        marginTop: 30,
        backgroundColor: '#5353c6',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },


});
// import React, { Component } from 'react';
// import {Text,View} from 'react-native';
// import * as firebase from 'firebase';
// import Icon2 from 'react-native-vector-icons/Entypo'; 


//  export class LogoutScreen extends Component {  
//      state={
//          email:''
//      }
//     static navigationOptions=({navigation}) => {
//         return{
//         title:"                Homiees",
//         headerRight: (  
//             <Icon2 
//                 style={{ paddingRight: 10 }}  
//                 onPress={() => navigation.navigate('Notification')}  
//                 name="notification"  
//                 size={30}  
//             /> 
//         )
//         }
//        };
  
//     render() {  
//         return (  
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>  
//                 <Text>DashboardScreen</Text>  
//             </View>  
//         );  
//     }  
// }
