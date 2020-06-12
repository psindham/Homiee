import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../components/Button';
import {Activityindicator} from '../components/Activityindicator';
import * as firebase from 'firebase';

import {ScrollView} from 'react-native-gesture-handler';

export class S_FirstLogin extends Component {
  state = {
    icon: 'eye-off',
    passwordenable: true,
    email: '',
    password: '',
    isLoaded: false,
    flagcol: true,
    passwordcol: true,
    stylechange: true,
    loginEmailFlag:false,
    loginPassFlag:false
  };
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyCJkLnfyglXnAe64Y93kSjRz4dOhSxgbWk",
      authDomain: "homiee-afbd4.firebaseapp.com",
      databaseURL: "https://homiee-afbd4.firebaseio.com",
      projectId: "homiee-afbd4",
      storageBucket: "homiee-afbd4.appspot.com",
      messagingSenderId: "373427940224",
      appId: "1:373427940224:web:8657c1451f527312166f65",
      measurementId: "G-1ZFQHHFVYB"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  _changeIcon() {
    this.setState(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      passwordenable: !prevState.passwordenable,
    }));
  }
  changeStyle() {
    this.setState({
      stylechange: !prevState.stylechange,
    });
  }
  onPressLogin(email, password) {
    var passcol = true;
    var emailcol = true;
    try {
      if (this.state.password.length < 6) {
        alert('Enter Password Atleast 6 characters');
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(function(error) {
          if (error.code === 'auth/wrong-password') {
            Alert.alert(
              'Ooops',
              'Password Invalid',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
            passcol = false;
          } else if (error.code === 'auth/user-not-found' || error.code ==='auth/invalid-email') {
            Alert.alert(
              'Ooops',
              'Email Invalid/Not-Found',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
            emailcol = false;
          }
        });
    } catch (error) {
      console.warn(error.code());
    }
    setTimeout(() => {
      if (emailcol == false) {
        this.setState({flagcol: false,loginEmailFlag:false});
      } else {
        this.setState({flagcol: true,loginEmailFlag:true});
      }
      if (passcol == false) {
        this.setState({passwordcol: false,loginPassFlag:false});
      } else {
        this.setState({passwordcol: true,loginPassFlag:true});
      }
    },1000);
    setTimeout(() => {
      if(this.state.loginEmailFlag==true &&this.state.loginPassFlag==true){
      this.props.navigation.navigate('HomePage',{UserEmail:this.state.email});
      }
    },3000);
  }

  onPressSignup(email, password) {
    var passcol = true;
    var emailcol = true;
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert(
              'Ooops',
              'User Already exist',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
            emailcol = false;
          }else if (error.code ==='auth/invalid-email') {
            Alert.alert(
              'Ooops',
              'Enter Valid Email',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
            emailcol = false;
          }else if (error.code ==='auth/weak-password') {
            Alert.alert(
              'Ooops',
              'Enter Strong Password',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
            passcol = false;
          }
        });
    } catch (error) {
      console.warn(error.tostring());
    }
    setTimeout(() => {
      if (emailcol == false) {
        this.setState({flagcol: false,loginEmailFlag:false});
      } else {
        this.setState({flagcol: true,loginEmailFlag:true});
      }
      if (passcol == false) {
        this.setState({passwordcol: false,loginPassFlag:false});
      } else {
        this.setState({passwordcol: true,loginPassFlag:true});
      }
    },1000);
    //Navigation To SignupDetails1
    setTimeout(() => {
      if(this.state.loginEmailFlag==true &&this.state.loginPassFlag==true){
        this.props.navigation.navigate('SignupNav',{UserEmail:this.state.email});
      }
    }, 3000);
  }
  render() {
   
    if (this.state.isLoaded) {
      return <Activityindicator size="large" color="#0000ff" />;
    } else {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container2}>
                <Icon name="user-circle" style={styles.actionButtonIcon} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {' '}
                  Stayer Login Here{' '}
                </Text>
              </View>
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={
                    this.state.flagcol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon2
                    style={styles.searchIcon}
                    name="email"
                    size={20}
                    color="#000"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={email => {
                      this.setState({email});
                    }}
                    
                  />
                </View>
                <View
                  style={
                    this.state.passwordcol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon2
                    style={styles.searchIcon}
                    name="key"
                    size={20}
                    color="#000"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={this.state.passwordenable}
                    onChangeText={password => {
                      this.setState({password});
                    }}
                  />
                  <Icon2
                    name={this.state.icon}
                    onPress={() => this._changeIcon()}
                    size={20}
                    style={styles.searchIcon}
                    color="#000"
                  />
                </View>

                <Button
                  onPress={() =>
                   // this.props.navigation.navigate('HomePage',{UserEmail:'star@gmail.com'})
                    this.onPressLogin(this.state.email, this.state.password)
                  }>
                  Login
                </Button>
                <Button
                  onPress={
                  //  () => this.props.navigation.navigate('SignupNav',{UserEmail:'qwerty@gmail.com',})
                  
                    ()=> this.onPressSignup(this.state.email, this.state.password)
                  }>
                  Sign UP
                </Button>
                <TouchableOpacity  onPress={()=>{  this.props.navigation.navigate('ForgotPass');}} >
                    <Text style={{marginTop:'10%',alignItems:'flex-end',justifyContent:'flex-end',color:'blue'}}>Forgot/Change Password?</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 100,
    borderBottomColor: 'red',
    borderStyle: 'solid',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: 'white',
  },
  searchedSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  actionButtonIcon: {
    fontSize: 30,
    color: 'black',
  },
});

