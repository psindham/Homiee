import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {Button} from '../../components/Button';
import {ScrollView} from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {Activityindicator} from './../../components/Activityindicator';
import {Services} from './../../Services';

var AdminId;
var first=true;
export class ProfileScreen extends Component {
  static navigationOptions=({navigation}) => {
    return{
    title:"                Profile",
    headerRight: (  
        <Icon3
            style={{ paddingRight: 10 }}  
            onPress={() => navigation.navigate('Notification')}  
            name="notification"  
            size={30}  
        /> 
    ) 
    }
   };
   constructor(props){
     super(props)
     {this.getData()}
   }
   getData = async () => {
    try {
      const value = await AsyncStorage.getItem('AdminId');
      const value2 = await AsyncStorage.getItem('email');
      
      if (value !== null) {
        AdminId=value;
        this.setState({
          AdminId:eval(JSON.stringify(value)),
          email: value2,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };
  
  state = {
    AdminId:'',
    email: '',
    FirstName: '',
    LastName: '',
    MobileNo: '',
    mcol: true,
    fcol: false,
    Gender: 'Male',
    FirstNamecol: true,
    LastNamecol: true,
    MobileNocol: true,
    FirstNameValid: false,
    LastNameValid: false,
    MobileNoValid: false,
    activity: true,
  };
  componentDidMount()
  {
  <Services/>
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.setState({
        activity:true
      })
        this.getData()
        setTimeout(() => {
          this.initialData()
        }, 2000);
    });
  }
  componentWillUnmount() { 
    // Remove the event listener
    this.focusListener.remove();
  }
  initialData=()=>{
    this.setState({
      activity:true
    })
    let newPost;
  const db=   firebase.database();
  const events =db.ref().child('Admin');
  setTimeout(() => {
    var query= events.orderByKey().equalTo(this.state.AdminId);
    query.once("value",(snapshot)=>{
         newPost=snapshot.val();   
      const keys = Object.keys(newPost);
      for (let data of keys) {
        this.setState({
        FirstName:newPost[data].FirstName,
        LastName:newPost[data].LastName,
        MobileNo:newPost[data].MobileNo,
        gen:newPost[data].Gender
      })
      if(newPost[data].Gender=='Male')
        {
          this.MchangeCol()
        }else{
          this.FchangeCol()
        }
      }
    });
    this.setState({
      activity:false
    })
  }, 1000);
}
  
  MchangeCol = () => {
    this.setState({
      mcol: true,
      fcol: false,
      Gender: 'Male',
    });
  };
  FchangeCol = () => {
    this.setState({
      mcol: false,
      fcol: true,
      Gender: 'Female',
    });
  };
  FirstNameValidate = () => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(this.state.FirstName) === false) {
      this.setState({
        FirstNameValid: false,
        FirstName: '',
        FirstNamecol: false,
      });
    } else {
      this.setState({
        FirstNameValid: true,
        FirstNamecol: true,
      });
    }
  };
  LastNameValidate = () => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(this.state.LastName) === false) {
      this.setState({
        LastNameValid: false,
        LastName: '',
        LastNamecol: false,
      });
    } else {
      this.setState({
        LastNameValid: true,
        LastNamecol: true,
      });
    }
  };
  MobileNoValidate = () => {
    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(this.state.MobileNo) === false) {
      this.setState({
        MobileNoValid: false,
        MobileNo: '',
        MobileNocol: false,
      });
    } else {
      this.setState({
        MobileNoValid: true,
        MobileNocol: true,
      });
    }
  };

  UpdateDetails = () => {
    this.props.navigation.navigate('HomePage');
    this.FirstNameValidate();
    this.LastNameValidate();
    this.MobileNoValidate();
    if (
      this.state.FirstNameValid &&
      this.state.LastNameValid &&
      this.state.MobileNoValid ){
    var postData = {
      FirstName:this.state.FirstName,
      LastName:this.state.LastName,
      MobileNo:this.state.MobileNo,
      Gender:this.state.Gender
    };
    var updates = {};
    var id='OEfxVtMSnLNtvmX8Sv1qgnoHwLX2';
    updates['/Admin/' + id] = postData;
    firebase.database().ref().update(updates);
    {this.com()}
  }
}
 
  render() {
    if (this.state.activity) {
      return (
          <Activityindicator size="large" color="red" />
      );
    } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View >
          <ScrollView showsVerticalScrollIndicator={false}>
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
                }}>
                <View  style={
                    this.state.FirstNamecol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon
                    style={styles.searchIcon}
                    name="user-alt"
                    size={20}
                    color="#000"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={FirstName => {
                      this.setState({FirstName});
                    }}
                    value={this.state.FirstName}
                  />
                </View>
              </View>
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View style={
                    this.state.LastNamecol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon
                    style={styles.searchIcon}
                    name="user-alt"
                    size={20}
                    color="#000"
                  />  
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={LastName => {
                      this.setState({LastName});
                    }}
                    value={this.state.LastName}
                    
                  />
                </View>
              </View>
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View style={
                    this.state.MobileNocol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon
                    style={styles.searchIcon}
                    name="mobile-alt"
                    size={20}
                    color="#000"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    onChangeText={MobileNo => {
                      this.setState({MobileNo});
                    }}
                    value={this.state.MobileNo}
                  />
                </View>
              </View>
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.searchSection}>
                  <TouchableOpacity
                    style={styles.button1}
                    onPress={() => this.MchangeCol()}>
                    <Icon2
                      style={styles.searchIcon}
                      name="human-male"
                      size={30}
                      color={this.state.mcol ? 'black' : 'grey'}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color: this.state.mcol ? 'black' : 'grey',
                      }}>
                      {' '}
                      Male
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => this.FchangeCol()}>
                    <Icon2
                      style={styles.searchIcon}
                      name="human-male"
                      size={30}
                      color={this.state.fcol ? 'black' : 'grey'}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        color: this.state.fcol ? 'black' : 'grey',
                      }}>
                      Female
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Button onPress={() => this.UpdateDetails()}>Update</Button>
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
    paddingTop: 25,
    paddingLeft: 20,
    alignItems: 'center',
  },
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
  pickerStyle: {
    height: 30,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: 'white',
    width: 90,
    paddingLeft: 5,
    height: 90,
    borderRadius: 10,
    marginLeft: 30,
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: 'white',
    width: 90,
    paddingLeft: 5,
    height: 90,
    borderRadius: 10,
    marginRight: 25,
    justifyContent: 'center',
  },
});
