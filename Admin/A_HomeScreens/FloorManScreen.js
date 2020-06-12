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
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/Entypo';
import * as firebase from 'firebase';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';
import {Activityindicator} from './../../components/Activityindicator';

var list = [];
var first=true;
export class FloorManScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '             Floor Management',
      headerRight: (
        <Icon3
          style={{paddingRight: 10}}
          onPress={() => navigation.navigate('Notification')}
          name="notification"
          size={30}
        />
      ),
    };
  };
  state = {
    floor: '',
    isVisible: false,
    myView: [],
    PgId: '',
    showImage: '',
    added: false,
    activity: true,
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
      console.warn(value);
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
    <Services />
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
        this.getData()
        this.setState({
          activity:true
        })
        setTimeout(() => {
          this.initialData();
        }, 3000);
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
    list=[]
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('PG');
    var query = events.orderByKey().equalTo(this.state.PgId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          if (newPost[data].Floors == undefined) {
            this.setState({
              showImage: true,
              activity:false,
            });
          } else {
            const key = Object.keys(newPost[data].Floors);
            for (let k of key) {
              let varr = k;
              list.push(varr);
            }
            setTimeout(() => {
              {
                this.addlist();
              }
            }, 500);
          }
        }
      } else {
        this.setState({
          showImage: true,
        });
      }
    });
  }
  addlist = () => {
    list.map(item => {
      let myView = this.state.myView;
      myView.push(
        <View
          style={{
            borderColor: 'grey',
            borderBottomWidth: 1,
            height: 40,
            width: 350,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.textdesign2}>{item}</Text>
          </View>
        </View>,
      );
      this.setState({
        myView,
        activity:false
      });
    });
  };
  onInputChanged = changedText => {
    console.log('This is the changed text: ', changedText);
  };
  addFloor = () => {
    let varr = this.state.floor;
    //this.setState({list: this.state.list.push(varr)});
    this.setState({isVisible: !this.state.isVisible});
  };
  add = () => {
    var name = this.state.floor;
    var postData = {
      rooms: 0,
    };
    var updates = {};
    updates['/PG/' + this.state.PgId + '/' + 'Floors' + '/' + name] = postData;
    firebase
      .database()
      .ref()
      .update(updates);
      this.setState({
        isVisible: !this.state.isVisible,
        added:true
      })
      setTimeout(() => {
        this.setState({
          added:false
        })
        {this.initialData()}
      }, 3000);
    
  };
  render() {
    if (this.state.activity) {
      return (
          <Activityindicator size="large" color="red" />
      );
    } else {
    if (this.state.showImage) {
      return (
        <View>
        <View style={{justifyContent: 'center', alignItems: 'center' , height: '78%'}}>
          {/* <Image style={{width:'80%',height:330}} source={require('./../../images/HomeFloor.jpg')}/> */}
          <Icon2 name="floor-plan" size={30} />
        </View>
        <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.added}>
              <View style={styles.modal}>
                <Icon2
                  name="check-circle"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={styles.text}>SuccessFully Added !</Text>
              </View>
            </Modal>
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
                this.addFloor();
              }}>
              <Icon
                name="plus"
                style={styles.searchIcon}
                size={40}
                color="white"/>
              <Text style={styles.textdesign}>Add Floor</Text>
            </TouchableOpacity>
          </View>
         
          <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.isVisible}>
              <View style={styles.modal}>
                <Text style={styles.text}>Add Floor</Text>
                <TextInput
                  autoCorrect={false}
                  placeholder="Enter Here.."
                  style={styles.Input}
                  onChangeText={floor => {
                    this.setState({floor});
                  }}
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
                      this.add();
                    }}
                    style={styles.touchop}>
                    <Text style={styles.textdesign}>ADD</Text>
                  </TouchableOpacity>
                  <Text>{'                  '}</Text>
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
        </View>
      );
    } else {
      return (
        <View>
          <View style={{marginTop: 30, height: '78%'}}>
            <ScrollView>
              <View style={{alignItems: 'center'}}>
                {this.state.myView.map(value => {
                  return value;
                })}
              </View>
            </ScrollView>
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
                this.addFloor();
              }}>
              <Icon
                name="plus"
                style={styles.searchIcon}
                size={40}
                color="white"
              />
              <Text style={styles.textdesign}>Add Floor</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.isVisible}>
              <View style={styles.modal}>
                <Text style={styles.text}>Add Floor</Text>
                <TextInput
                  autoCorrect={false}
                  placeholder="Enter Here.."
                  style={styles.Input}
                  onChangeText={floor => {
                    this.setState({floor});
                  }}
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
                      this.add();
                    }}
                    style={styles.touchop}>
                    <Text style={styles.textdesign}>ADD</Text>
                  </TouchableOpacity>
                  <Text>{'                  '}</Text>
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
