import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackgroundBase,
  Picker,
  Modal,
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Services} from './../../../Services';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {Activityindicator} from './../../../components/Activityindicator';

var data, id, list;
export class AssignComplaint extends Component {
  state = {
    email: '',
    date: '',
    status: '',
    title: '',
    description: '',
    category: '',
    FileData: '',
    myView: [],
    PgId: '',
    list: [],
    isVisible: false,
    error: '',
    staff: '',
    userName: '',
    floor: '',
    room: '',
    deleted: false,
    activity: true,
  };

  constructor(props) {
    super(props);
    id = this.props.navigation.getParam('id', undefined);
    {
      this.getData();
      this.get();
    }
  }
  get = async () => {
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

  getData = () => {
    <Services/>
    this.setState({
      list: [],
    });
    list = [];
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('Complaints');
    var query = events.orderByKey().equalTo(id);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          setTimeout(() => {
            {
              const events2 = db.ref().child('PG');
              var query2 = events2.orderByKey().equalTo(this.state.PgId);
              query2.once('value', snapshot => {
                let post = snapshot.val();
                if (snapshot.exists()) {
                  const k = Object.keys(post);
                  for (let d of k) {
                    if (post[d].Staff != undefined) {
                      console.warn(d);
                      const k2 = Object.keys(post[d].Staff);
                      for (let data2 of k2) {
                        if (
                          post[d].Staff[data2].category ==
                          newPost[data].category
                        ) {
                          list = this.state.list;
                          list.push({
                            text: post[d].Staff[data2].Name,
                            index: data2,
                          });
                          this.setState({
                            list,
                          });
                        }
                      }
                    }
                  }
                  if (this.state.list == '') {
                    this.setState({
                      isVisible: true,
                      error: 'No Staff Availabe',
                    });
                  }
                }
              });
            }
          }, 500);
          let newPost3;
          var userdata;
          console.warn(newPost[data].UserId + 'ff');
          const events3 = db.ref().child('User');
          var query3 = events3.orderByKey().equalTo(newPost[data].UserId);
          query3.once('value', snapshot => {
            if (snapshot.exists()) {
              newPost3 = snapshot.val();

              const keys3 = Object.keys(newPost3);
              for (let d of keys3) {
                userdata = newPost3[d];
                this.setState({
                  userName: newPost3[d].FirstName,
                  floor: newPost3[d].floor,
                  room: newPost3[d].room,
                });
              }
              this.addView(newPost[data], data, userdata);
            }
          });
        }
      }
    });
  };
  addView = (data, k, userdata) => {
    if (data.FileData != '') {
      let myView = this.state.myView;
      myView.push(
        <View key={k}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Title : </Text>
            <Text>{data.Title}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Description :{' '}
            </Text>
            <Text>{data.Description}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Status : </Text>
            <Text>{data.status}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Stayer Name:</Text>
            <Text>{userdata.FirstName}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>
              Stayer Floor:
            </Text>
            <Text>{userdata.floor}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Stayer room:</Text>
            <Text>{userdata.room}</Text>
          </View>
          <Image
            source={{uri: data.FileData}}
            style={{width: undefined, height: 200}}
          />
        </View>,
      );
      this.setState({
        myView,
        activity:false,
      });
    }
  };
  update = () => {
    if (this.state.staff != '') {
      var updates = {};
      updates['/Complaints/' + id + '/' + 'status'] = 'Assigned';
      updates['/Complaints/' + id + '/' + 'AssignedTo'] = this.state.staff;
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
    } else {
      this.setState({
        isVisible: true,
        error: 'Select Staff First',
      });
    }
  };
  delete = () => {
    var updates = {};
    updates['/Complaints/' + id] = null;
    firebase
      .database()
      .ref()
      .update(updates);
    this.setState({
      deleted: true,
    });
    setTimeout(() => {
      this.setState({
        deleted: false,
      });
      this.props.navigation.navigate('Complaint');
    }, 2000);
  };
  render() {
    id = this.props.navigation.getParam('id', undefined);
    let data = this.state.list.map(item => {
      return (
        <Picker.Item label={item.text} value={item.index} key={item.index} />
      );
    });
    if (this.state.activity) {
      return (
          <Activityindicator size="large" color="red" />
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.isVisible}>
              <View style={styles.modal}>
                <Icon4
                  name="error"
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
          <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.deleted}>
              <View style={styles.modal}>
                <Icon4
                  name="check-circle"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={styles.text}>SuccessFully Deleted!</Text>
              </View>
            </Modal>
          </View>
          <View>
            {this.state.myView.map(value => {
              return value;
            })}
            <View>
              <Text>Assign To </Text>
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.searchSection}>
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.staff}
                    onValueChange={itemValue =>
                      this.setState({
                        staff: itemValue,
                      })
                    }>
                    {data}
                  </Picker>
                </View>
              </View>
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
                  {
                    this.update();
                  }
                }}>
                <Icon
                  name="update"
                  style={styles.searchIcon}
                  size={40}
                  color="white"
                />
                <Text style={styles.textdesign}>Update As Assigned</Text>
              </TouchableOpacity>
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
                  {
                    this.delete();
                  }
                }}>
                <Icon
                  name="delete-forever"
                  style={styles.searchIcon}
                  size={40}
                  color="white"
                />
                <Text style={styles.textdesign}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    height: 70,
  },
  pickerStyle: {
    height: 30,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
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
