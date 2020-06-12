import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Picker,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import Icon4 from 'react-native-vector-icons/Entypo';
import * as firebase from 'firebase';
import {floor} from 'react-native-reanimated';
import {Services} from './../../Services';
import AsyncStorage from '@react-native-community/async-storage';

let li = ['...Select Floor...'];
let roomList = [];
export class AddRoomScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '               Add Rooms',
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
    list: [],
    floor: '',
    numRoom: 0,
    incRoom: 0,
    showRoom: 0,
    //  numBed: 1,
    showImage: false,
    showView: true,
    roomList: [],
    updated: false,
    isVisible: false,
    error: '',
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
        this.initialData();
      }, 5000);
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
  initialData = () => {
    this.setState({
      activity: true,
    });
    li = ['...Select Floor...'];
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
            });
            this.setState({
              showView: false,
            });
          } else {
            const key = Object.keys(newPost[data].Floors);
            for (let k of key) {
              let varr = k;
              li.push(varr);
            }
          }
          this.setState({
            list: li,
          });
        }
      } else {
        this.setState({
          showImage: true,
        });
        this.setState({
          showView: false,
        });
      }
    });
  };
  renderImage = () => {
    if (this.state.showImage) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: '80%', height: 330}}
            source={require('./../../images/HomeFloor.jpg')}
          />
          {/* <Icon2 name="floor-plan" size={180} /> */}
        </View>
      );
    }
  };
  IncrementRoom = () => {
    this.setState({
      incRoom: this.state.incRoom + 1,
      showRoom: this.state.showRoom + 1,
    });
    setTimeout(() => {
      roomList.push(this.state.incRoom);
    }, 500);
  };
  DecreaseRoom = () => {
    if (this.state.showRoom > 0) {
      this.setState({
        incRoom: this.state.incRoom - 1,
        showRoom: this.state.showRoom - 1,
      });
      setTimeout(() => {
        roomList.pop();
      }, 100);
    }
  };
  // IncrementBed = () => {
  //   if (this.state.numBed < 4) {
  //     this.setState({numBed: this.state.numBed + 1});
  //   }
  // };
  // DecreaseBed = () => {
  //   if (this.state.numBed > 1) {
  //     this.setState({numBed: this.state.numBed - 1});
  //   }
  // };
  addRoom = () => {
    var name = this.state.floor;
    if (this.state.floor != '') {
      if (roomList != '') {
        var postData = {
          rooms: this.state.incRoom,
        };
        var updates = {};
        updates[
          '/PG/' + this.state.PgId + '/' + 'Floors' + '/' + name + '/' + 'rooms'
        ] = this.state.incRoom;
        roomList.map(item => {
          updates[
            '/PG/' + this.state.PgId + '/' + 'Floors' + '/' + name + '/' + item
          ] = '';
        });
        firebase
          .database()
          .ref()
          .update(updates);
        setTimeout(() => {
          {
            this.populateRooms();
          }
          this.setState({
            showRoom: 0,
            updated: false,
          });
        }, 100);
      } else {
        this.setState({
          isVisible: true,
          error: 'Select Proper Rooms',
        });
      }
    } else {
      this.setState({
        isVisible: true,
        error: 'Select Floor First',
      });
    }
  };
  populateRooms = () => {
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('PG');
    var query = events.orderByKey().equalTo(this.state.PgId);
    query.once('value', snapshot => {
      newPost = snapshot.val();
      if (snapshot.exists()) {
        const keys = Object.keys(newPost);
        for (let data of keys) {
          if (newPost[data].Floors != undefined) {
            const key = Object.keys(newPost[data].Floors);
            for (let k of key) {
              if (this.state.floor == k) {
                this.setState({
                  numRoom: newPost[data].Floors[k].rooms,
                  incRoom: newPost[data].Floors[k].rooms,
                });
              }
            }
          }
        }
      }
    });
  };
  renderView = () => {
    let addItems = li.map(item => {
      return <Picker.Item label={item} value={item} key={item} />;
    });
    if (this.state.showView) {
      return (
        <View
          style={{
            marginTop: 10,
            padding: 10,
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              width: 390,
              height: 100,
              backgroundColor: 'rgb(225,225,225)',
              padding: 10,
              borderRadius: 6,
            }}>
            <Text style={{fontSize: 15}}>{'  '}Select Floor</Text>
            <View style={styles.searchSection}>
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.floor}
                onValueChange={itemValue => {
                  this.setState({
                    floor: itemValue,
                  });
                  setTimeout(() => {
                    this.populateRooms();
                  }, 100);
                }}>
                {addItems}
              </Picker>
            </View>
          </View>
          <View
            style={{
              width: 390,
              height: 100,
              backgroundColor: 'rgb(225,225,225)',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Number of Rooms available In {this.state.floor} Floor is{' '}
              {this.state.numRoom}
            </Text>
          </View>
          <View
            style={{
              width: 390,
              height: 100,
              backgroundColor: 'rgb(225,225,225)',
              padding: 10,
            }}>
            <View style={styles.searchSection}>
              <View
                style={{
                  borderwidth: 1,
                  borderColor: 'grey',
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Text style={{paddingTop: 10}}> Room/s</Text>
                <Icon2
                  style={styles.searchIcon}
                  name="minus"
                  onPress={() => this.DecreaseRoom()}
                  size={20}
                  color="#000"
                />

                <TouchableOpacity
                  style={{
                    padding: 2,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>{this.state.showRoom}</Text>
                </TouchableOpacity>
                <Icon2
                  name="plus"
                  onPress={() => this.IncrementRoom()}
                  size={20}
                  style={styles.searchIcon}
                  color="#000"
                />
              </View>
              {/* <View
              style={{
                borderwidth: 1,
                borderColor: 'grey',
                flex: 1,
                flexDirection: 'row',
              }}>
              <Text style={{paddingTop: 10}}> Bed/s</Text>
              <Icon2
                style={styles.searchIcon}
                name="minus"
                onPress={() => this.DecreaseBed()}
                size={20}
                color="#000"
              />

              <TouchableOpacity
                style={{
                  padding: 2,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{pading: 2}}> {this.state.numBed}</Text>
              </TouchableOpacity>
              <Icon2
                name="plus"
                onPress={() => this.IncrementBed()}
                size={20}
                style={styles.searchIcon}
                color="#000"
              />
            </View> */}
            </View>
          </View>
        </View>
      );
    }
  };
  render() {
    let addItems = li.map(item => {
      return <Picker.Item label={item} value={item} key={item} />;
    });
    return (
      <View>
        <View style={{height: '80%'}}>
          {this.renderImage()}
          {this.renderView()}
        </View>
        <View style={styles.modelContainer}>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.updated}>
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
            alignItems: 'center',
            padding: 20,
          }}>
          <TouchableOpacity
            style={styles.buttoni}
            onPress={() => {
              this.addRoom();
            }}>
            <Icon
              name="plus"
              style={styles.searchIcon}
              size={40}
              color="white"
            />
            <Text style={styles.textdesign}>Add Room</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modelContainer}>
                <Modal
                  animationType={'fade'}
                  transparent={true}
                  visible={this.state.isVisible}>
                  <View style={styles.modal}>
                    <Icon2
                      name="eventbrite"
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  text: {
    color: 'white',
    marginTop: 20,
    fontSize: 25,
  },
  textdesign: {
    color: 'white',
    fontSize: 18,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 25,
    paddingLeft: 20,
    alignItems: 'center',
  },
  buttoni: {
    height: 60,
    width: '90%',
    flex: 1,
    backgroundColor: '#5353c6',
    borderWidth: 0,
    borderRadius: 0,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    backgroundColor: 'white',
    color: 'blue',
  },
  actionButtonIcon: {
    fontSize: 30,
    color: 'black',
  },
  pickerStyle: {
    height: 30,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
});
