import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackgroundBase,
  ActivityIndicator,
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Services} from './../../../Services';

var  id;
export class ViewOutpass extends Component {
  state = {
    email: '',
    date: '',
    status: '',
    title: '',
    description: '',
    category: '',
    FileData: '',
    myView: [],
    activity: true,
  };

  constructor(props) {
    super(props);
    id = this.props.navigation.getParam('complaintId', undefined);
    {
      this.getData();
    }
  }

  getData = () => {
    let newPost;
  
    const db = firebase.database();
    const events = db.ref().child('Outpass');
    var query = events.orderByKey().equalTo(id.k);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          setTimeout(() => {
            {
              this.getUserDetails(newPost[data].UserId);
              this.addView(newPost[data], data);
            }
          }, 500);
        }
      }
    });
  };

  getUserDetails = userid => {
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByKey().equalTo(userid);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          setTimeout(() => {
            {
                this.adduserView(newPost[data],data)
            }
          }, 100);
        }
      }
    });
  };
  adduserView = (data, k) => {
    let myView = this.state.myView;
    myView.push(
      <View
        elevation={5}
        style={{
          width: 390,
          height: 180,
          backgroundColor: 'white',
          alignContent: 'center',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 5,
          marginLeft: 10,
        }}
        key={k}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
               User Name:{' '}
              </Text>
              <Text style={{fontSize: 15}}>{data.FirstName,'  ',data.LastName}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Floor:{' '}
              </Text>
              <Text style={{fontSize: 15}}>{data.floor}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Room:{' '}
              </Text>
              <Text style={{fontSize: 15}}>{data.room}</Text>
            </View>
      </View>
    );
    this.setState({
      myView,
      activity: false,
    });
  };
  addView = (data, k) => {
    let myView = this.state.myView;
    myView.push(
      <View
        elevation={5}
        style={{
          width: 390,
          height: 280,
          backgroundColor: 'white',
          alignContent: 'center',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 5,
          marginLeft: 10,
        }}
        key={k}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20}}>
              {data.Description}
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>
                From Date:{' '}
              </Text>
              <Text style={{fontSize: 15}}>{data.FromDate}</Text>
            </View> 
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>To Date: </Text>
              <Text style={{fontSize: 15}}>{data.ToDate}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Approval: </Text>
              <Text style={{fontSize: 15}}>{data.status}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', height: 40}}>
              <TouchableOpacity
                style={styles.buttoni}
                onPress={() => {
                  {
                    this.updateApprove();
                  }
                }}>
                <Icon2
                  name="check"
                  style={styles.searchIcon}
                  size={20}
                  color="white"
                />
                <Text style={styles.textdesign}>Approve</Text>
              </TouchableOpacity>
              <Text>{'  '}</Text>
              <TouchableOpacity
                style={styles.buttoni}
                onPress={() => {
                  this.updateDeny();
                }}>
                <Icon2
                  name="cross"
                  style={styles.searchIcon}
                  size={20}
                  color="white"
                />
                <Text style={styles.textdesign}>deny</Text>
              </TouchableOpacity>
            </View>
            <Text style={{marginTop:10}}>{data.date}</Text>
          </View>
        </View>
      </View>,
    );
    this.setState({
      myView,
    });
   
  };
  updateApprove = () => {
    var updates = {};
    updates['/Outpass/' + id.k + '/' + 'status'] = 'Approved';
    firebase
      .database()
      .ref()
      .update(updates);
    this.setState({
      myView: [],
    });
    {
      this.getData();
    }
    this.setState({
      activity: true,
    });
  };
  updateDeny = () => {
    var updates = {};
    updates['/Outpass/' + id.k + '/' + 'status'] = 'Denied';
    firebase
      .database()
      .ref()
      .update(updates);
    this.setState({
      myView: [],
    });
    {
      this.getData();
    }
    this.setState({
      activity: true,
    });
  };
  render() {
    id = this.props.navigation.getParam('complaintId', undefined);
    if (this.state.activity) {
      return (
        <View style={styles.Actcontainer}>
          <ActivityIndicator
            animating={true}
            color="#bc2b78"
            size="large"
            style={styles.activityIndicator}
          />
        </View>
      );
    } else {
      return (
        <View style={{}}>
          {this.state.myView.map(value => {
            return value;
          })}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
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
  Actcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
});
