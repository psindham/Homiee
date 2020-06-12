import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Input,
  Alert,
  Modal,
  Button,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';
import {Activityindicator} from './../../components/Activityindicator';

var first=true;
export class AddPgScreen extends Component {
  state = {
    email: '',
    showImage: false,
    myView: [],
    UserId: '',
    PgId: '',
    AdminId: '',
    activity: true,
  };
  static navigationOptions = ({navigation}) => {
    return {
      title: '                  PGs ',
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
      const adminid = await AsyncStorage.getItem('AdminId');
      const pgid = await AsyncStorage.getItem('PgId');
      if (adminid != null) {
        this.setState({
          AdminId: adminid,
          PgId: pgid,
        });
        console.warn(adminid)
      }
    } catch (e) {
      // saving error
    }
    
  };
  componentDidMount() {
    <Services />
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.setState({
        activity:true
      })
        this.getData()
        setTimeout(() => {
          this.initialData()
        }, 4000);
    });
   
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  initialData=()=>{
    console.warn  (this.state.AdminId)
    this.setState({
      myView: [],
      activity: true,
    });
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('PG');
    var query = events.orderByChild('AdminId').equalTo(this.state.AdminId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          setTimeout(() => {
            {
              this.addView(newPost[data], data);
            }
          }, 500);
        }
      }
    });
  }
  addView = (data, k) => {
    var current = false;
    if (k == this.state.PgId) {
      current = true;
    }
    let myView = this.state.myView;
    myView.push(
      <TouchableOpacity
        elevation={5}
        style={{
          width: '95%',
          height: 140,
          backgroundColor: 'white',
          alignContent: 'center',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 5,
          marginLeft: 10,
        }}
        key={k}
        onPress={() => {
          this.props.navigation.navigate('ViewPg', {pgid: k});
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            {current ? (
              <Text style={{color: 'green'}}>You are currently in this Pg</Text>
            ) : null}
            <Text style={{fontSize: 20}}>{data.PgName}</Text>
            <Text style={{fontSize: 15}}>{data.Address}</Text>
            <View style={{flex: 1, flexDirection: 'row'}} />
            <Text>{data.PgNo}</Text>
          </View>
        </View>
      </TouchableOpacity>,
    );
    this.setState({
      myView,
      activity: false,
    });
  };

  render() {
    if (this.state.activity) {
      return <Activityindicator size="large" color="red" />;
    } else {
      return (
        <ScrollView>
          <View style={{marginTop: 5}}>
           
              {this.state.myView.map(value => {
                return value;
              })}
         
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
                this.props.navigation.navigate('AddPg');
              }}>
              <Icon2
                name="plus"
                style={styles.searchIcon}
                size={40}
                color="white"
              />
              <Text style={styles.textdesign}>Add PG</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
      );
    }
  }  
}
const styles = StyleSheet.create({
  touchop: {
    padding: 10,
    height: 50,
    width: 100,
    marginTop: 10,
    backgroundColor: '#5353c6',
    borderRadius: 5,
    alignItems: 'center',
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
  Input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: '#333',
    fontSize: 18,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
    marginBottom: 30,
    marginTop: 40,
  },
  modelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  textdesign: {
    color: 'white',
    fontSize: 18,
  },
  textdesign2: {
    color: 'black',
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
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
});
