import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import * as firebase from 'firebase';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../../Services';
import {Activityindicator} from './../../../components/Activityindicator';

var first = true;
export class searchExpense extends Component {
  static navigationOptions = {
    title: '                searchExpenses',
  };
  constructor(props) {
    super(props);
    {
      this.getData();
    }
  }
  state = {
    Firedata: [],
    myView: [],
    paidAmount: 0,
    unpaidAmount: 0,
    Amount: 0,
    paid: 'paid',
    unpaid: 'Mark As Paid',
    isVisible: false,
    error: '',
    title: '',
    amount: '',
    status: '',
    filedata: '',
    PgId: '',
    activity: true,
    showImage: false,
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('PgId');
      if (value !== null) {
        this.setState({
          PgId: value,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };
  componentDidMount() {
    <Services />;
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({
        activity:true
      })
        this.getData()
        setTimeout(() => {
          this.initialData();
        }, 3000);
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  initialData = () => {
    this.setState({
      myView: [],
      activity: true,
    });
    this.setState({
      paidAmount: 0,
      unpaidAmount: 0,
      Amount: 0,
    });
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('PG');
    var query = events.orderByKey().equalTo(this.state.PgId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          if (newPost[data].Expenses != undefined) {
            this.setState({
              Firedata: newPost[data].Expenses,
              myView: [],
            });
            {
              this.addView();
            }
          } else {
            this.setState({
              activity: false,
              showImage: true,
            });
          }
        }
      } else {
        this.setState({
          activity: false,
          showImage: true,
        });
      }
    });
  };
  viewExpense = values => {
    this.setState({
      isVisible: true,
      error: 'Enter Amount',
      title: values.title,
      amount: values.amount,
      status: values.status,
      filedata: values.pic,
    });
  };
  updatepay = k => {
    var updates = {};
    updates['/PG/' + this.state.PgId + '/' + 'Expenses' + '/' + k + '/status'] =
      'true';
    firebase
      .database()
      .ref()
      .update(updates);
    {
      this.initialData();
    }
  };
  addView = () => {
    const vals = Object.keys(this.state.Firedata);
    let myView = this.state.myView;
    for (let k of vals) {
      if (this.state.Firedata[k].status == 'true') {
        this.setState({
          paidAmount:
            parseInt(this.state.Firedata[k].amount) +
            parseInt(this.state.paidAmount),
          Amount:
            parseInt(this.state.Amount) +
            parseInt(this.state.Firedata[k].amount),
        });
      }else{
        this.setState({
          unpaidAmount:
            parseInt(this.state.Firedata[k].amount) +
            parseInt(this.state.unpaidAmount),
          Amount:
            parseInt(this.state.Firedata[k].amount) +
            parseInt(this.state.unpaidAmount),
        });
      }
      var istrue = this.state.Firedata[k].status == 'true';
      myView.push(
        <TouchableOpacity
          elevation={5}
          style={{
            width: 390,
            height: 150,
            backgroundColor: 'white',
            alignContent: 'center',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            this.viewExpense(this.state.Firedata[k]);
          }}
          key={k}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={{fontSize: 20}}>{this.state.Firedata[k].title}</Text>
              <Text style={{fontSize: 20}}>
                Amount {this.state.Firedata[k].amount}
              </Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{marginTop: 5}}>Status:</Text>
                <TouchableOpacity
                  style={istrue ? styles.paid : styles.unpaid}
                  onPress={() => {
                    this.updatepay(k);
                  }}>
                  <Text style={{fontSize: 20, color: 'white', marginLeft: 5}}>
                    {istrue ? this.state.paid : this.state.unpaid}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text>{this.state.Firedata[k].date}</Text>
            </View>
            <Image
              source={{uri: this.state.Firedata[k].pic}}
              style={styles.images}
            />
          </View>
        </TouchableOpacity>,
      );
      this.setState({
        myView,
        activity: false,
      });
    }
  };
  render() {
    if (this.state.activity) {
      return <Activityindicator size="large" color="red" />;
    } else {
      if (this.state.showImage) {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Icon2 name="square-inc-cash" size={25} color="red" />
          </View>
        );
      } else {
        return (
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{height: 100}}>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 5,
                  marginTop: 10,
                  fontWeight: 'bold',
                }}>
                Total Amount Paid{'           '} {this.state.paidAmount}
              </Text>
              <Text style={{fontSize: 15, marginLeft: 5, fontWeight: 'bold'}}>
                Total Amount UnPaid{'         '} {this.state.unpaidAmount}
              </Text>
              <Text style={{fontSize: 15, marginLeft: 5, fontWeight: 'bold'}}>
                Total Amount{'                    '} {this.state.Amount}
              </Text>
            </View>
            <ScrollView>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {this.state.myView.map(value => {
                  return value;
                })}
              </View>
            </ScrollView>
            <View style={styles.modelContainer}>
              <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.isVisible}>
                <View style={styles.modal}>
                  <Text style={styles.text}>Title :{this.state.title}</Text>
                  <Text style={styles.text}>Amount :{this.state.amount}</Text>
                  <Text style={styles.text}>Status :{this.state.status}</Text>
                  <Image
                    source={{uri: this.state.filedata}}
                    style={styles.Modalimages}
                  />
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
                      <Text style={{color: 'white'}}>cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        );
      }
    }
  }
}
const styles = StyleSheet.create({
  images: {
    width: 50,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    marginTop: 10,
    marginLeft: 80,
  },
  Modalimages: {
    width: 350,
    height: 350,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
    marginTop: 10,
    marginLeft: 5,
  },
  paid: {
    height: 30,
    marginLeft: 10,
    width: 50,
    backgroundColor: '#40db69',
  },
  unpaid: {
    height: 30,
    marginLeft: 10,
    width: 150,
    backgroundColor: '#f5224c',
    borderStyle: 'dotted',
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
    height: 550,
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 50,
    marginLeft: 20,
  },
  text: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
  },
  touchop: {
    padding: 10,
    height: 50,
    width: 100,
    marginTop: 20,
    backgroundColor: '#5353c6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
