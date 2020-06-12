import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity,ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';

export class PgScreen extends Component {
  state = {
    UserId: '',
    email: '',
    PgId: '',
    occupation: '',
    gender: '',
    PgType: '',
    PgName: '',
    address: '',
    city: '',
    room:'',
    Floor:'',
    activity:true,
  };
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
          title: '                PG Info',
        }
      };
      constructor(props) {
        super(props);
       
      }
  componentDidMount() {
     <Services/>
   const { navigation } = this.props;
   this.focusListener = navigation.addListener("didFocus", () => {
     this.setState({
       activity:true
     })
     {
      this.getData();
    }
    });
  }
  componentWillUnmount(){
    // Remove the event listener
    this.focusListener.remove();
  }

  getData = async () => {
    try {
      const userId = await AsyncStorage.getItem('UserId');
      const value = await AsyncStorage.getItem('PgId',undefined);
      const occupation = await AsyncStorage.getItem('Occupation');
      const gender = await AsyncStorage.getItem('Gender');
      if (occupation !== null) {
        this.setState({
          PgId: value,
          gender: gender,
          occupation: occupation,
          UserId: userId,
        });
      }
      setTimeout(() => {
        {
          this.setPgType();
          if(value==undefined){
            this.getRequestedPg();
            this.setState({
              activity:false
            })
          }
          if(value!=null)
          {
            this.getPgdetails();
          }
        }
      }, 1000);
    } catch (e) {
      console.warn(e);
    }
  };
  setPgType = () => {  
    if (this.state.occupation == 'Student') {
      this.setState({
        PgType: 'Student',
      });
    } else {
      if (this.state.occupation == 'Jober' && this.state.gender == 'Male') {
        console.warn(this.state.occupation, this.state.gender);
        this.setState({
          PgType: 'Men',
        });
      } else {
        this.setState({
          PgType: 'Women',
        });
      }  
    }
  };
  getRequestedPg = () => {        
    let newPost,newPost2;     
    const db = firebase.database();
    const events = db.ref().child('RequestPG');
    var query = events.orderByChild('UserId').equalTo(this.state.UserId);
    query.once('value', snapshot => {
      newPost = snapshot.val();
      if (snapshot.exists()) {
        const keys = Object.keys(newPost);
        for (let k of keys) {
          const events2 = db.ref().child('PG');
          var query2 = events2.orderByKey().equalTo(newPost[k].PgId);
          query2.once('value', snapshot => {
            newPost2 = snapshot.val();
            if (snapshot.exists()) {
              const keys2 = Object.keys(newPost2);
              for (let k2 of keys2) {
                this.setState({
                  PgName: newPost2[k2].PgName,
                  address: newPost2[k2].Address,
                  city: newPost2[k2].City,
                });
              }
            }
          });
        }
      }
    });
  };
  getPgdetails=()=>{
    let newPost,newPost2;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByKey().equalTo(this.state.UserId);
    query.once('value', snapshot => {
      newPost = snapshot.val();
      if (snapshot.exists()) {
        const keys = Object.keys(newPost);
        for (let k of keys) {
          this.setState({
            room:newPost[k].room,
            Floor:newPost[k].floor
          })
          const events2 = db.ref().child('PG');
          var query2 = events2.orderByKey().equalTo(newPost[k].PgId);
          query2.once('value', snapshot => {
            newPost2 = snapshot.val();
            if (snapshot.exists()) {
              const keys2 = Object.keys(newPost2);
              for (let k2 of keys2) {
                this.setState({
                  PgName: newPost2[k2].PgName,
                  address: newPost2[k2].Address,
                  city: newPost2[k2].City,
                });
              }
              this.setState({
                activity:false
              })
            }
          });
        }
      }
    });
  }
  Pgdetails=()=>{
    if (this.state.PgId != null) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomLeftRadius: 430,
            borderBottomRightRadius: 430,
            backgroundColor: '#ccccff',
            height: '60%',
            width: 750,
          }}>
            <View >
          <Text style={{fontSize:18}}>You are In {this.state.PgName}  Pg 
              {this.state.address} {this.state.city} 
              </Text>
              <Text style={{fontSize:18}}>
              Room :{this.state.room} 
          </Text>
          <Text style={{fontSize:18}}>
             Floor :{this.state.Floor}
          </Text>
          </View>
        </View>
      );
    } 
  }
  PgScreen = () => {
    if (this.state.PgId == null) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomLeftRadius: 430,
            borderBottomRightRadius: 430,
            backgroundColor: '#ccccff',
            height: '60%',
            width: 750,
          }}>
          <Text>You requested For PG {this.state.PgName} </Text>
          <Text>
            {this.state.address} {this.state.city}
          </Text>
        </View>
      );
    }
    //
  };
  changeButton = () => {
    if (this.state.PgId == null) {
      return (
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            height: 100,
            padding: 20,
          }}>
          <TouchableOpacity 
            style={styles.buttoni}
            onPress={() => {
              this.props.navigation.navigate('SelectPg', {
                pgType: this.state.PgType,
              });
            }}>
            <Text> </Text>
            <Icon2
              name="new-message"
              style={styles.searchIcon}
              size={35}
              color="white"
            />
            <Text style={styles.textdesign}> Change PG </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  requestNewPg = () => {
    var postsRef = firebase.database().ref('RequestPG');
    postsRef.push().set({
      PgId: this.state.Pgid,
      UserId: newUserKey,
      RequestStatus: false,
      UserName: this.state.FirstName,
      date:
        new Date().getDate() +
        '-' +
        new Date().getMonth() +
        '-' +
        new Date().getFullYear(),
    });
    this.props.navigation.navigate('HomePage', {UserEmail: data});
  };
  render() {
    if(this.state.activity){
      return (
        <View style = {styles.Actcontainer}>
           <ActivityIndicator
              animating = {true}
              color = '#bc2b78'
              size = "large"
              style = {styles.activityIndicator}/>
        </View>
     )
    }else{
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        {this.PgScreen()}
        {this.Pgdetails()}
        {this.changeButton()}
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  searchIcon: {
    padding: 0,
  },
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
  textdesign: {
    color: 'white',
    fontSize: 18,
  },
  buttoni: {
    height: 60,
    width: '130%',
    flex: 1,
    backgroundColor: '#5353c6',
    // marginTop: 380,
    alignItems: 'center',
    flexDirection: 'row',
  },
  Actcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70
 },
 activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
 }
});
