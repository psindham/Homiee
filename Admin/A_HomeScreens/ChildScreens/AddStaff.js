import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Modal,
  keyboardType
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import {Services} from './../../../Services';
import AsyncStorage from '@react-native-community/async-storage';

export class AddStaff extends Component {
  state = {
    email: '',
    Name:'',
    PhoneNo:'',
    regarding:null,
    PgId:'',
    isVisible:false,
    error:'',
    added:false,
  };
  componentDidMount(){
      <Services/>
      {this.getData()}
  }
  getData = async () => {
    try {
      const pgid = await AsyncStorage.getItem('PgId');
      if (pgid !== null) {
        this.setState({
          PgId: pgid,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };
  AddStaff = () => {
    const reg = /^[a-zA-Z ]+$/;
    const regphone =/^[0]?[789]\d{9}$/;
    if(reg.test(this.state.Name) === true){
        if(regphone.test(this.state.PhoneNo) === true){
            if(this.state.regarding !=null){
    var Data={
        'PhoneNo':this.state.PhoneNo,
        'Name':this.state.Name,
        'category':this.state.regarding,
      }
      const db1 = firebase.database();
      var newKey = db1.ref().child('PG').push().key;
      var updates = {};
      updates['/PG/'+this.state.PgId+'/Staff/'+newKey] =Data;
      firebase
        .database()
        .ref()
        .update(updates);
        this.setState({
            added:true
        })
        setTimeout(() => {
            this.props.navigation.navigate('StaffScreen');
        }, 2000);
    }else{
        this.setState({
            isVisible:!this.state.isVisible,
            error:'Please Select Regarding'
        })
    }
    }else{
        this.setState({
            isVisible:!this.state.isVisible,
            error:'Please Enter/Edit Phone no. '
        })
    }
    }else{
        this.setState({
            isVisible:!this.state.isVisible,
            error:'Please Enter/Edit Name '
        })
    }
  };
  displayImage = () => {
    return(
      <Image
        source={require('./../../../images/addPic.jpg')}
        style={{width: undefined, height: 173}}
      />
        );
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
        <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.added}>
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
                    }}
                    style={styles.touchop}>
                    <Text style={styles.textdesign}>cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
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
              <View style={styles.searchSection}>
                <Icon
                  style={styles.searchIcon}
                  name="user"
                  size={20}
                  color="#000"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter FullName"
                  onChangeText={Name => {
                    this.setState({Name});
                  }}
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
                <Icon
                  style={styles.searchIcon}
                  name="phone"
                  size={20}
                  color="#000"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone No"
                  onChangeText={PhoneNo => {
                    this.setState({PhoneNo});
                  }}
                  keyboardType="phone-pad"
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
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={this.state.regarding}
                  onValueChange={itemValue =>
                    this.setState({
                      regarding: itemValue,
                    })
                  }>
                  <Picker.Item label="--Select Regarding--" value="null" />
                  <Picker.Item label="HouseKeeping" value="HouseKeeping" />
                  <Picker.Item label="Laundry" value="Laundry" />
                  <Picker.Item label="Food" value="Food" />
                  <Picker.Item label="Electricity" value="Electricity" />
                </Picker>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                height: 100,
                padding: 20,
              }}>
              <TouchableOpacity
                style={styles.buttoni}
                onPress={() => {
                  {
                    this.AddStaff();
                  }
                }}>
                <Icon2
                  name="plus"
                  style={styles.searchIcon}
                  size={40}
                  color="white"
                />
                <Text style={styles.textdesign}>Add Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
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
  pickerStyle: {
    height: 30,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
  searchIcon: {
    padding: 10,
  },
  buttoni: {
    height: 60,
    width: '100%',
    flex: 1,
    backgroundColor: '#5353c6',
    borderWidth: 0,
    borderRadius: 0,
    // marginTop: 380,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
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
