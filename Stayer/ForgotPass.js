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
  Modal,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from './../components/Button';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {Activityindicator} from './../components/Activityindicator';
import * as firebase from 'firebase';

import {ScrollView} from 'react-native-gesture-handler';

export class ForgotPass extends Component {
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
    loginPassFlag:false,
    success:false
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
 
  onPressPass(email) {
  
    var emailcol = true;
    try {
      firebase
        .auth().sendPasswordResetEmail(email).catch(function(error){
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
          emailcol=false
        })
    } catch (error) {
      console.warn(error.tostring());
    }
   
    setTimeout(() => {
        if (emailcol) {
          this.setState({
            success: true,
          });
          setTimeout(() => {
            this.setState({
              success: false,
            });
            this.props.navigation.navigate('S_FirstLogin');
          }, 2000);
        }
      }, 2000);
  }
  render() { 
    if (this.state.isLoaded) {
      return <Activityindicator size="large" color="#0000ff" />;
    } else {
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
          <View style={styles.modelContainer}>
              <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.success}>
                <View style={styles.modal}>
                  <Icon4
                    name="check-circle"
                    style={{paddingTop: 25}}
                    size={50}
                    color="white"
                  />
                  <Text style={styles.text}>Check Your Mail-Box!</Text>
                </View>
              </Modal>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.container2}>
                <Icon name="user-circle" style={styles.actionButtonIcon} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {' '}
                  Stayer Forgot/change Password{' '}
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
                <Button
                  onPress={() =>
                    this.onPressPass(this.state.email)
                  }>
                  OK
                </Button>
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
    marginRight: 50,
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
});

