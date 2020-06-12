import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {Activityindicator} from './../../components/Activityindicator';
import {Services} from './../../Services';

export class DashboardScreen extends Component {
  state = {
    email: '',
    complaintCount: 0,
    stayersCount: 0,
    outPassCount: 0,
    staffCount: 0,
    pollCount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
    Amount: 0,
  };
  static navigationOptions = ({navigation}) => {
    return {
      title: '                Homiees',
      headerRight: (
        <Icon2
          style={{paddingRight: 10}}
          onPress={() => navigation.navigate('Notification')}
          name="notification"
          size={30}
        />
      ),
    };
  };
  constructor(props) {
    super(props);
    {
      this.getData();
    }
  }
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
        activity: true,
      });
      this.getData();
      setTimeout(() => {
        this.initialDataout();
        this.initialDataCom();
        this.initialDataStayers();
        this.initialDataExpenses();
      }, 2000);
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  initialDataout = () => {
    console.warn(this.state.PgId);
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('Outpass');
    var query = events.orderByChild('PgId').equalTo(this.state.PgId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          this.setState({
            outPassCount: this.state.outPassCount + 1,
          });
        }
      } else {
        this.setState({
          outPassCount: 0,
        });
      }
    });
  };
  initialDataCom = () => {
    console.warn(this.state.PgId);
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('Complaints');
    var query = events.orderByChild('PgId').equalTo(this.state.PgId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          this.setState({
            complaintCount: this.state.complaintCount + 1,
          });
        }
      } else {
        this.setState({
          complaintCount: 0,
        });
      }
    });
  };
  initialDataStayers = () => {
    console.warn(this.state.PgId);
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByChild('PgId').equalTo(this.state.PgId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          this.setState({
            stayersCount: this.state.stayersCount + 1,
          });
        }
      } else {
        this.setState({
          stayersCount: 0,
        });
      }
    });
  };
  initialDataExpenses = () => {
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
            const vals = Object.keys(newPost[data].Expenses);
            for (let k of vals) {
              if (newPost[data].Expenses[k].status == 'true') {
                this.setState({
                  paidAmount:
                    parseInt(newPost[data].Expenses[k].amount) +
                    parseInt(this.state.paidAmount),
                  Amount:
                    parseInt(this.state.Amount) +
                    parseInt(newPost[data].Expenses[k].amount),
                });
              } else {
                this.setState({
                  unpaidAmount:
                    parseInt(newPost[data].Expenses[k].amount) +
                    parseInt(this.state.unpaidAmount),
                  Amount:
                    parseInt(newPost[data].Expenses[k].amount) +
                    parseInt(this.state.unpaidAmount),
                });
              }
            }
          } else {
            this.setState({
              Amount: 0,
              unpaidAmount: 0,
              paidAmount: 0,
            });
          }
        }
      } else {
        this.setState({
          Amount: 0,
          unpaidAmount: 0,
          paidAmount: 0,
        });
      }
    });
  };

  render() {
    return (
      <ScrollView
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <View style={styles.stateView} elevation={5}>
          <ImageBackground source={require('./../../images/blueDesign.jpg')}
            style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                <View style={{alignItems:'flex-end',justifyContent:'center'}}>
            <Text style={{color:'#00bfff',fontSize:25}} >Out Pass Request  {this.state.outPassCount}</Text>
            </View>
          </ImageBackground>
        </View>   
        <View style={styles.stateView} elevation={5}>
        <ImageBackground source={require('./../../images/blueDesign2.jpg')}
            style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                <View style={{alignItems:'flex-start',justifyContent:'center'}}>
          <Text style={{color:'#66cc66',fontSize:25}}>Total Complaints {this.state.complaintCount}</Text>
          </View>
          </ImageBackground>
        </View>
        <View style={styles.stateView} elevation={5}>
        <ImageBackground source={require('./../../images/blueDesign3.jpg')}
            style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                 <View style={{alignItems:'flex-end',justifyContent:'center'}}>
          <Text style={{color:'#804000',fontSize:25}}>Stayers {this.state.stayersCount} </Text></View>
          </ImageBackground>
        </View>
        <View style={styles.stateView} elevation={5}>
        <ImageBackground source={require('./../../images/blueDesign4.jpg')}
            style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
          <Text style={{color:'#cc0099',fontSize:18}}>Expenses total amount {this.state.Amount} </Text>
          <Text style={{color:'#cc0099',fontSize:18}}>Total UnPaid amount {this.state.unpaidAmount} </Text>
          <Text style={{color:'#cc0099',fontSize:18}}>Total   Paid    amount {this.state.paidAmount} </Text>
          </ImageBackground>
        </View>
        <View style={styles.stateView} elevation={5}>
        <ImageBackground source={require('./../../images/blueDesign5.jpg')}
            style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}}>
                 <View style={{alignItems:'flex-end',justifyContent:'center'}}>
          <Text style={{color:'#ff8c1a',fontSize:25}}>Poll </Text></View>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  stateView: {
    width: '95%',
    height: 170,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
  },
});
