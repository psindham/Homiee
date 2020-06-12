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
  Modal,
} from 'react-native';
import * as firebase from 'firebase';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../../Services';
import {Button} from './../../../components/Button';

export class AddPg extends Component {
  state = {
    AdminId: '',
    OfficeNo: null,
    Address: '',
    PgType: '',
    PgName: '',
    City: '',
    OfficeNocol: true,
    Addresscol: true,
    PgTypecol: true,
    PgNamecol: true,
    Citycol: true,
    OfficeNoValid: false,
    AddressValid: false,
    PgTypeValid: false,
    PgNameValid: false,
    CityValid: false,
    Added: false,
    isVisible: true,
    Rent: '',
    Rentcol: true,
    RentValid: false,
  };
  constructor(props) {
    super(props);

    {
      this.getData();
    }
    {
      this.visibleCaution();
    }
  }
  componentDidMount() {
    <Services />;
  }
  getData = async () => {
    try {
      const adminid = await AsyncStorage.getItem('AdminId');
      if (adminid != null) {
        this.setState({
          AdminId: adminid,
        });
      }
    } catch (e) {
      // saving error
    }
  };
  visibleCaution = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };
  OfficeNoValidate = () => {
    const reg = /^\d{3}([ -]\d\d|\d[ -]\d|\d\d[ -])\d{6}$/;
    if (reg.test(this.state.OfficeNo) === false) {
      this.setState({
        OfficeNoValid: false,
        OfficeNo: '',
        OfficeNocol: false,
      });
      return this.state.OfficeNoValid;
    } else {
      this.setState({
        OfficeNoValid: true,
        OfficeNocol: true,
      });
      return this.state.OfficeNoValid;
    }
  };
  AddressValidate = () => {
    if (this.state.Address === '') {
      this.setState({
        AddressValid: false,
        Address: '',
        Addresscol: false,
      });
      return this.state.AddressValid;
    } else {
      this.setState({
        AddressValid: true,
        Addresscol: true,
      });
      return this.state.AddressValid;
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
      return this.state.PgTypeValid;
    } else {
      this.setState({
        PgTypeValid: true,
        PgTypecol: true,
      });
      return this.state.PgTypeValid;
    }
  };
  RentValidate = () => {
    const reg = /^[0-9]+$/;
    if (reg.test(this.state.Rent) === false) {
      this.setState({
        RentValid: false,
        Rent: '',
        Rentcol: false,
      });
    } else {
      this.setState({
        RentValid: true,
        Rentcol: true,
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
      return this.state.PgNameValid;
    } else {
      this.setState({
        PgNameValid: true,
        PgNamecol: true,
      });
      return this.state.PgNameValid;
    }
  };
  CityValidate = () => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(this.state.City) === false) {
      this.setState({
        CityValid: false,
        City: '',
        Citycol: false,
      });
      return this.state.CityValid;
    } else {
      this.setState({
        CityValid: true,
        Citycol: true,
      });
      return this.state.CityValid;
    }
  };
  AddDetails = () => {
    if (
      this.PgNameValidate() &&
      this.OfficeNoValidate() &&
      this.AddressValidate() &&
      this.CityValidate() &&
      this.PgTypeValidate() &&
      this.RentValidate
    ) {
      var postsRef = firebase.database().ref('PG');
      postsRef.push().set({
        AdminId: this.state.AdminId,
        PgNo: this.state.OfficeNo,
        PgName: this.state.PgName,
        PgType: this.state.PgType,
        Address: this.state.Address,
        City: this.state.City,
      });
      {
        this.storeData();
      }
      this.setState({
        Added: true,
      });
      setTimeout(() => {
        this.props.navigation.navigate('AddPgScreen');
      }, 2000);
      //  this.props.navigation.navigate('HomePage',{UserEmail:this.state.email});
    }
  };
  storeData = async () => {
    try {
      await AsyncStorage.setItem('PgId', this.state.PgId);
    } catch (e) {
      // saving error
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.Added}>
              <View style={styles.modal}>
                <Icon4
                  name="check-circle"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={styles.text}>SuccessFully Added !</Text>
              </View>
            </Modal>
          </View>
          <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.isVisible}>
              <View style={styles.modal}>
                <Icon4
                  name="error"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={{color: 'white', marginTop: 20, fontSize: 18}}>
                  Once You Add PG It Cannot be Deleted/Edited{' '}
                </Text>
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
                    }}
                    style={styles.touchop}>
                    <Text style={styles.textdesign}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                <Icon1
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
                  this.state.Rentcol
                    ? styles.searchSection
                    : styles.searchedSection
                }>
                <Icon1
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
                  this.state.PgTypecol
                    ? styles.searchSection
                    : styles.searchedSection
                }>
                <Icon4
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

            <Button onPress={() => this.AddDetails()}>Register PG</Button>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginTop: 20,
    fontSize: 25,
  },
  textdesign: {
    color: 'white',
    fontSize: 18,
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
