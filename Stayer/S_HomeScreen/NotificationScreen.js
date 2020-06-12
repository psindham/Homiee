import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    PgId: '',
    email: '',
    UserId: '',
    myView: [],
    activity: true,
    showImage: false,
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('PgId',undefined);
      const value2 = await AsyncStorage.getItem('UserId');
      if (value2 !== null) {
        this.setState({
          PgId: value,
          UserId: value2,
        });
      }
      console.warn(value2)
    } catch (e) {
      console.warn(e);
    }
    
  };
  componentDidMount() {
   <Services/>
   const { navigation } = this.props;
   this.focusListener = navigation.addListener("didFocus", () => {
     this.setState({
       activity:true
     })
       this.getData()
       setTimeout(() => {
        this.AllocationRagarding()
        if(this.state.PgId!=undefined)
        {
          this.complaintRegarding()
          this.outPassRegarding()
        }
        
       }, 3000);
   });
 }
 componentWillUnmount(){
   // Remove the event listener
   this.focusListener.remove();
 }
  AllocationRagarding=()=>{
    this.setState({
      myView:[]
    })
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('RequestPG');
    var query = events.orderByChild('UserId').equalTo(this.state.UserId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();  
        const keys = Object.keys(newPost);
        for (let k of keys) {
          if (newPost[k].allocated == true) {
            this.allocatedRoom(k);
          } else if (newPost[k].RequestStatus == true) {
            this.denyAck();
          } else {
            this.setState({
              activity:false,
              showImage: true,
            });
         }
        }
      }
    });
  }
  complaintRegarding=()=>{
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('Complaints');
    var query = events.orderByChild('UserId').equalTo(this.state.UserId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          setTimeout(() => {
            { 
              if(newPost[data].status=='Assigned'){
                this.addView(
                  'Complaints',
                  'Complaint No.'+data+' is Assigned',
                  newPost[data].date,
                  data,
                  'Complaint'
                );
              }
            }
          }, 500);
        }
      }
    });
  }
  outPassRegarding=()=>{
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('Outpass');
    var query = events.orderByChild('UserId').equalTo(this.state.UserId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
         if(newPost[data].status=='Approved')
         {
          this.addView(
            'OutPass',
            'Your outpass for '+newPost[data].Description+' is Approved',
            newPost[data].date,
            data,
            'OutPass'
          );
         }
        }
      } 
    });
  }
  allocatedRoom = key => {
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('roomAllocation');
    var query = events.orderByChild('RequestId').equalTo(key);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          this.addView(
            'Pg Is been Allocated',
            'Room no' + newPost[data].room + ' Floor ' + newPost[data].floor,
            'Date OF Joining : '+newPost[data].DOJ,
            data,
          );
        }
      }
      this.setState({
        activity:false,
      });
    });
  };
  denyAck = () => {
    this.addView(
      'Pg request Has been Cancelled',
      'Change Pg From Pg info',
      'OpenDrawer -> Select PG info ->change Pg',
    );
    this.setState({
      activity:false,
    });
  };
  addView = (header, data, date, k,navi='') => {
    
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
        onPress={() => {this.props.navigation.navigate(navi)}}
        key={k}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20, }}>{header}</Text>
            <Text style={{fontSize: 15}}>{data}</Text>
            <View style={{flex: 1, flexDirection: 'row'}} />
            <Text>{date}</Text>
          </View> 
        </View>
      </TouchableOpacity>,
    );
    this.setState({
      myView,
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
            {/* <Image
              style={{width: '100%', height: 330}}
              source={require('./../../images/nonotification.jpg')}
            /> */}
            <Icon2
            name='heart'
            size={25}
            color='red'
            />
          </View>
        );
      } else {
        return (
          <View>
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
          </View>
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
