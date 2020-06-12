window.addEventListener = x => x;
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';
import {decode, encode} from 'base-64';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {Button} from '../components/Button';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../Services';

export class SignupDetails1 extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props)
  }
  state = {
    token:'abc123',
    AdminId: '',
    email: '',
    FirstName: '',
    LastName: '',
    MobileNo: null,
    OfficeNo: null,
    Address: '',
    PgType: '',
    PgName: '',
    City: '',
    Rent:0,
    Rentcol:true,
    FirstNamecol: true,
    LastNamecol: true,
    MobileNocol: true,
    OfficeNocol: true,
    Addresscol: true,
    PgTypecol: true,
    PgNamecol: true,
    Citycol: true,
    RentValid:false,
    FirstNameValid: false,
    LastNameValid: false,
    MobileNoValid: false,
    OfficeNoValid: false,
    DobDateValid: false,
    AddressValid: false,
    PgTypeValid: false,
    PgNameValid: false,
    CityValid: false,
    mcol: true,
    fcol: false,
    Gender: 'Male',
  };
  componentDidMount() {
   <Services/>
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
  RentValidate = () => {
    const reg = /^[0-9]+$/;
    if (reg.test(this.state.Rent) === false) {
      this.setState({
        RentValid: false,
        Rent: 0,
        Rentcol: false,
      });
    } else {
      this.setState({
        RentValid: true,
        Rentcol: true,
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
  OfficeNoValidate = () => {
    const reg = /^\d{3}([ -]\d\d|\d[ -]\d|\d\d[ -])\d{6}$/;
    if (reg.test(this.state.OfficeNo) === false) {
      this.setState({
        OfficeNoValid: false,
        OfficeNo: '',
        OfficeNocol: false,
      });
    } else {
      this.setState({
        OfficeNoValid: true,
        OfficeNocol: true,
      });
    }
  };
  AddressValidate = () => {
    if (this.state.Address === '') {
      this.setState({
        AddressValid: false,
        Address: '',
        Addresscol: false,
      });
    } else {
      this.setState({
        AddressValid: true,
        Addresscol: true,
      });
    }
  };
  PgTypeValidate = () => {
    if (
      this.state.PgType != 'Men' &&
      this.state.PgType != 'Women' &&
      this.state.PgType != 'Students'
    ) {
      this.setState({
        PgTypeValid: false,
        PgType: '',
        PgTypecol: false,
      });
    } else {
      this.setState({
        PgTypeValid: true,
        PgTypecol: true,
      });
    }
  };
  PgNameValidate = () => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(this.state.PgName) === false) {
      this.setState({
        PgNameValid: false,
        PgName: '',
        PgNamecol: false,
      });
    } else {
      this.setState({
        PgNameValid: true,
        PgNamecol: true,
      });
    }
  };
  Admin
  CityValidate = () => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(this.state.City) === false) {
      this.setState({
        CityValid: false,
        City: '',
        Citycol: false,
      });
    } else {
      this.setState({
        CityValid: true,
        Citycol: true,
      });
    }
  };
 storeData = async () => {
    try {
      await AsyncStorage.setItem('AdminId', this.state.AdminId)
      await AsyncStorage.setItem('email', this.state.email)
    } catch (e) {
      // saving error
    }
  }
  validateField = () => {
    this.FirstNameValidate();
    this.LastNameValidate();
    this.MobileNoValidate();
    this.OfficeNoValidate();
    this.PgNameValidate();
    this.AddressValidate();
    this.CityValidate();
    this.PgTypeValidate();
    this.RentValidate();
    console.warn(this.state.email);
  };
  AddDetails = () => {
    this.validateField();
    var key;
    if (
      this.state.FirstNameValid &&
      this.state.LastNameValid &&
      this.state.MobileNoValid &&
      this.state.OfficeNoValid &&
      this.state.AddressValid &&
      this.state.PgTypeValid &&
      this.state.PgNameValid &&
      this.state.CityValid &&
      this.state.RentValid
    ) {
      var AdminData = {
        email: this.state.email,
        FirstName: this.state.FirstName,
        LastName: this.state.LastName,
        MobileNo: this.state.MobileNo,
        Gender: this.state.Gender,
      };
      var newAdminKey = firebase.database().ref().child('Admin').push().key;
      var updates = {};
      updates['/Admin/' + newAdminKey] = AdminData;
      firebase.database().ref().update(updates);
      var postsRef = firebase.database().ref('PG');
      postsRef.push().set({
        AdminId:newAdminKey,
        PgNo: this.state.OfficeNo,
        PgName: this.state.PgName,
        PgType: this.state.PgType,
        Address:this.state.Address,
        City: this.state.City,
        Rent:this.state.Rent,
      });
     //{this.storeData()}
      this.props.navigation.navigate('HomePage',{UserEmail:this.state.email});
    }
  };
  render() {
    let data = this.props.navigation.getParam('UserEmail', undefined);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{marginBottom: 60}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingTop: 25,
              paddingLeft: 20,
              alignItems: 'center',
              marginBottom: 20,
              marginTop: 10,
            }}>
            <Icon1 name="adduser" style={styles.actionButtonIcon} />
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {' '}
              Add Your Details{' '}
            </Text>
          </View>
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
                <View
                  style={
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
                      this.setState({email: data});
                    }}
                    onBlur={() => this.FirstNameValidate()}
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
                <View
                  style={
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
                    onBlur={() => this.LastNameValidate()}
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
                    value={data}
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
                <View
                  style={
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
                    keyboardType="phone-pad"
                    onBlur={() => this.MobileNoValidate()}
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
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={
                    this.state.OfficeNocol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon3
                    style={styles.searchIcon}
                    name="landline"
                    size={20}
                    color="#000"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="LandLine"
                    onChangeText={OfficeNo => {
                      this.setState({OfficeNo});
                    }}
                    keyboardType="phone-pad"
                    onBlur={() => this.OfficeNoValidate()}
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
                <View
                  style={
                    this.state.PgNamecol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon2
                    style={styles.searchIcon}
                    name="home-city-outline"
                    size={20}
                    color="#000"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="PG Name"
                    onChangeText={PgName => {
                      this.setState({PgName});
                    }}
                    onBlur={() => this.PgNameValidate()}
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
                <View
                  style={
                    this.state.Addresscol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon3
                    style={styles.searchIcon}
                    name="address"
                    size={20}
                    color="#000"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="PG Address"
                    onChangeText={Address => {
                      this.setState({Address});
                    }}
                    onBlur={() => this.AddressValidate()}
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
                <View
                  style={
                    this.state.Rentcol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon2
                    style={styles.searchIcon}
                    name="cash-usd"
                    size={20}
                    color="#000"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Rent Per Month"
                    onChangeText={Rent => {
                      this.setState({Rent});
                    }}
                    onBlur={() => this.RentValidate()}
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
                <View
                  style={
                    this.state.Citycol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon3
                    style={styles.searchIcon}
                    name="location"
                    size={20}
                    color="#000"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="City"
                    onChangeText={City => {
                      this.setState({City});
                    }}
                    onBlur={() => this.CityValidate()}
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
                <View
                  style={
                    this.state.PgTypecol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon2
                    style={styles.searchIcon}
                    name="format-list-bulleted"
                    size={20}
                    color="#000"
                  />
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.PgType}
                    onValueChange={itemValue =>
                      this.setState({
                        PgType: itemValue,
                      })
                    }>
                    <Picker.Item label="--Select PgType--" value="java" />
                    <Picker.Item label="Men" value="Men" />
                    <Picker.Item label="Women" value="Women" />
                    <Picker.Item label="Students" value="Students" />
                  </Picker>
                </View>
              </View>

              <Button
                onPress={() =>
                  this.AddDetails()
                 // this.props.navigation.navigate('HomePage',{'email':data})
                }>
                Register
              </Button>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
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
