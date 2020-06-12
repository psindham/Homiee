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
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';
import {Activityindicator} from './../../components/Activityindicator';


var first=true;
export class StaffScreen extends Component {
  state = {
    email: '',
    showImage: true,
    myView: [],
    UserId: '',
    PgId: '',
    activity: true,
  };
  static navigationOptions = ({navigation}) => {
    return {
      title: '                Staff',
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
        }, 2000);
    
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  initialData=()=>{
    this.setState({
      myView: [],
      activity:true
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
          setTimeout(() => {
            {
              if(newPost[data].Staff!=undefined){
              const key2 = Object.keys(newPost[data].Staff);
              for (let data2 of key2) {
                this.addView(newPost[data].Staff[data2], data2);
              }
            }else{
              this.setState({
                showImage: true,
                activity: false,
              });
            }
            }
          }, 500);
        }
        this.setState({
          showImage: false,
          activity: false,
        });
      } else {
        this.setState({
          showImage: true,
          activity: false,
        });
      }
    });
  }
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
          marginTop: 5,
          marginLeft: 10,
        }}
        key={k}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20, }}>{data.Name}</Text>
            <Text style={{fontSize: 15,}}>{data.PhoneNo}</Text>
            <View style={{flex: 1, flexDirection: 'row'}} />
            <Text>{data.category}</Text>
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
      if (this.state.showImage) {
        return (
          <View  style={{ height: '100%',backgroundColor:'white'}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: '100%', height: '70%'}}
              source={require('./../../images/staff.jpg')}
            />
          </View>
          <View
              style={{
                justifyContent: 'center',
                height: '20%',
                padding: 20,
              }}>
              <TouchableOpacity
                style={styles.buttoni}
                onPress={() => {
                  this.props.navigation.navigate('AddStaff');
                }}>
                <Icon2
                  name="plus"
                  style={styles.searchIcon}
                  size={40}
                  color="white"
                />
                <Text style={styles.textdesign}>Add Staff</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return (
          <View>
            <View style={{marginTop: 30, height: '78%'}}>
              <ScrollView>
                {this.state.myView.map(value => {
                  return value;
                })}
              </ScrollView>
            </View>
            <View
              style={{
                justifyContent: 'center',
                height: '17%',
                padding: 20,
              }}>
              <TouchableOpacity
                style={styles.buttoni}
                onPress={() => {
                  this.props.navigation.navigate('AddStaff');
                }}>
                <Icon2
                  name="plus"
                  style={styles.searchIcon}
                  size={40}
                  color="white"
                />
                <Text style={styles.textdesign}>Add Staff</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
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
