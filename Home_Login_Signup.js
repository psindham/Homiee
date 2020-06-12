import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Keyboard,Alert,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import Input from './components/Input';
import {Button} from './components/Button';
import {Activityindicator} from './components/Activityindicator';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Directions} from 'react-native-gesture-handler';

export class Home_Login_Signup extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  }
  state = {
    isLoaded: true,
    Scol: true,
    Acol: false,
    log:'stayer'
  };
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        isLoaded:false
      })
    }, 4000);
  }
 
  SchangeCol=()=>{
    this.setState({
      Scol: true,
      Acol: false,
      log: 'stayer',
    });

  }
  AchangeCol=()=>{
    this.setState({
      Acol: true,
      Scol: false,
      log: 'Admin',
    });

  }
splashScreen=()=>{
              
}


  navigateTo = () => {
    if (this.state.log=='stayer') {
      {
        this.props.navigation.navigate('S_RootLoginSignup');
      }
    } else {
      {
        this.props.navigation.navigate('A_RootLoginSignup');
      }
    }
  };

  render() {
    if (this.state.isLoaded) {
      return(
        <View style={{flex:1,justifyContent:'center',alignContent:'center',backgroundColor:'white'}}> 
      <Image
       source={require('./images/Logo.jpg')}
       style={{marginLeft:43}}/> 
       </View>
      );     
    } else { 
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground
            source={require('./images/1423211074.jpg')}
            style={[styles.containterImage, styles.fixed]}>
            <View style={styles.container}>
              <View
                style={{  
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
             
                 <View
              style={{
                padding: 10,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                 <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height:40
                }}><Text></Text>
                <View style={styles.searchSection}>
                  <TouchableOpacity
                    style={styles.button1}
                    onPress={() => this.SchangeCol()}>
                    <Icon
                      style={styles.searchIcon}
                      name="user-alt"
                      size={30}
                      color={this.state.Scol ? '#4da6ff' : 'grey'}
                    />
                    <Text
                      style={{
                        fontSize: 20,
                        color: this.state.Scol ? '#4da6ff' : 'grey',
                      }}>
                      Stayer
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => this.AchangeCol()}>
                    <Icon
                      style={styles.searchIcon}
                      name="user-tie"
                      size={38}
                      color={this.state.Acol ? '#4da6ff' : 'grey'}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color: this.state.Acol ? '#4da6ff' : 'grey',
                      }}>
                      Admin
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              </View>
              </View>
              <Text></Text>
              <Button  onPress={this.navigateTo}>GO</Button>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
      );
    }
  }
}
const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    height:70
  },
  containterImage: {
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: 'rgba(211,211,211, 0.8)',
    padding: 60,
    paddingRight: 40,
    paddingLeft: 40,
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 30,
    marginBottom:30
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
  },
  button1: {
    backgroundColor: 'white',
    width: 90,
    paddingLeft: 22,
    height: 90,
    borderRadius: 10,
    marginBottom:50,
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: 'white',
    width: 90,
    paddingLeft: 25,
    height: 90,
    borderRadius: 10,
    marginLeft: 30,
    marginBottom:50,
    justifyContent: 'center',
  },
  searchIcon: {
    padding: 7,
  },
});
