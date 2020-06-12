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
} from 'react-native';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import {Services} from './../../../Services';
import AsyncStorage from '@react-native-community/async-storage';
import {ComplaintScreen} from '../ComplaintScreen';

export class AddOutpass extends Component {
  state = {
    email: '',
    Subject: '',
    Description: '',
    regarding: null,
    PgId: '',
    UserId: '',
    isVisible: false,
    error: '',
    added: false,
    fromdate: '',
    todate: '',
    time: '',
  };
  componentDidMount() {
    <Services />;
    {
      this.getData();
    }
  }
  getData = async () => {
    try {
      const pgid = await AsyncStorage.getItem('PgId');
      const userid = await AsyncStorage.getItem('UserId');
      if (userid !== null) {
        this.setState({
          PgId: pgid,
          UserId: userid,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };
  addComp = () => {
    const reg = /^[a-zA-Z ]+$/;
    if (reg.test(this.state.Description) === true) {
      if (this.state.fromdate != '') {
        if (this.state.todate != '') {
          var d1 = new Date(this.state.fromdate);
          var d2 = new Date(this.state.todate);
          console.warn(d2 > d1)
          //if (d2 > d1) {
            var Data = {
              UserId: this.state.UserId,
              PgId: this.state.PgId,
              Description: this.state.Description,
              FromDate: this.state.fromdate,
              ToDate: this.state.todate,
              date:
                new Date().getDate() +
                '-' +
                new Date().getMonth() +
                '-' +
                new Date().getFullYear(),
              status: 'Not Approved',
            };
            const db1 = firebase.database();
            var newKey = db1
              .ref()
              .child('Outpass')
              .push().key;
            var updates = {};
            updates['/Outpass/' + newKey] = Data;
            firebase
              .database()
              .ref()
              .update(updates);
            this.setState({
              added: true,
            });
            setTimeout(() => {
              this.props.navigation.navigate('OutPass');
            }, 2000);
          // } else {
          //   this.setState({
          //     isVisible: !this.state.isVisible,
          //     error: 'Select TO Date Appropriatly',
          //   });
          // }
        } else {
          this.setState({
            isVisible: !this.state.isVisible,
            error: 'Please Select To date',
          });
        }
      } else {
        this.setState({
          isVisible: !this.state.isVisible,
          error: 'Please Select From date ',
        });
      }
    } else {
      this.setState({
        isVisible: !this.state.isVisible,
        error: 'Please Description  ',
      });
    }
  };
  displayImage = () => {
    return (
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
                  name="audio-description"
                  size={20}
                  color="#000"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  onChangeText={Description => {
                    this.setState({Description});
                  }}
                />
              </View>
            </View>
            <DatePicker
              style={{width: 370, paddingTop: 20, borderRadius: 5}}
              date={this.state.fromdate}
              mode="date"
              placeholder="select  From date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'relative',
                  right: 0,
                  top: 0,
                  marginRight: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                this.setState({fromdate: date});
              }}
            />
            <DatePicker
              style={{width: 370, paddingTop: 20, borderRadius: 5}}
              date={this.state.todate}
              mode="date"
              placeholder="select TO date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'relative',
                  right: 0,
                  top: 0,
                  marginRight: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                this.setState({todate: date});
              }}
            />
            <View
              style={{
                padding: 20,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            />
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
                    this.addComp();
                  }
                }}>
                <Icon3
                  name="account-arrow-right-outline"
                  style={styles.searchIcon}
                  size={40}
                  color="white"
                />
                <Text style={styles.textdesign}>Request</Text>
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
