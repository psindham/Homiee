import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView,StyleSheet,ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';

export class NotificationScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <Icon2
          style={{paddingLeft: 10}}
          onPress={() => navigation.openDrawer()}
          name="menu"
          size={30}
        />
      ),
      title: '                Notifications',
    };
  };
  constructor(props) {
    super(props);
    {
      this.getData();
    }
  }
  state = {
    requestId: '',
    AdminId: '',
    email: '',
    myView: [],
    PgId: '',
    UserId: '',
    myView: [],
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
        activity: true,
      });
      this.getData();
      setTimeout(() => {
        {
          this.aaprovalNotif();
        }
      }, 1000);
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  aaprovalNotif = () => {
    this.setState({
      myView:[]
    })
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('RequestPG');
    const query = events.orderByChild('PgId').equalTo(this.state.PgId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let k of keys) {
          if (
            newPost[k].PgId == this.state.PgId &&
            newPost[k].RequestStatus == false
          ) {
            this.addView(newPost[k], k);
            this.setState({
              requestId: k,
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
  addView = (data, k) => {
    let myView = this.state.myView;
    myView.push(
      <TouchableOpacity
        elevation={5}
        style={{
          width: 390,
          height: 130,
          backgroundColor: 'white',
          alignContent: 'center',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 10,
        }}
        onPress={() => {
          if (!data.allocated) {
            this.props.navigation.navigate('allocateRoom', {
              UserId: data.UserId,
              requestId: this.state.requestId,
            });
          }
        }}
        key={k}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20}}>Stayer Is Interested To Join</Text>
            <Text style={{fontSize: 15}}>
              {data.UserName} is interested to Join
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}} />
            <Text>{data.date}</Text>
          </View>
        </View>
      </TouchableOpacity>,
    );
    this.setState({
      myView,
      activity:false,
      showImage: false,
    });
  };

  render() {
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
      if (this.state.showImage) {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}>
            <Icon2 name="heart" size={25} color="red" />
          </View>
        );
      } else {
        return (
          <ScrollView>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              {this.state.myView.map(value => {
                return value;
              })}
            </View>
          </ScrollView>
        );
      }
    }
  }
}
const styles = StyleSheet.create({
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

