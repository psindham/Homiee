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
  ActivityIndicator,
  Image,
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';


export class ComplaintScreen extends Component {
  state = {
    email: '',
    showImage: false,
    myView: [],
    UserId: '',
    activity: true,
    PgId: '',
    isVisible: false,
  };
  static navigationOptions = ({navigation}) => {
    return {
      title: '                Complaint',
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
      const userid = await AsyncStorage.getItem('UserId');
      const pgid = await AsyncStorage.getItem('PgId', undefined);
      if (userid !== null) {
        this.setState({
          UserId: userid,
          PgId: pgid,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  componentDidMount() {
    <Services />;
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.setState({
        activity:true
      })
      this.getData()
      setTimeout(() => {
        this.initialData();
      }, 3000);
     });
   }
   componentWillUnmount(){
     // Remove the event listener
     this.focusListener.remove();
   }
  initialData = () => {
    this.setState({
      myView: [],
    });
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
              this.addView(newPost[data], data);
            }
          }, 500);
        }
      } else {
        this.setState({
          showImage: true,
          activity: false,
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
          marginTop: 5,
          marginLeft: 10,
        }}
        onPress={() => {
          this.props.navigation.navigate('ViewComplaint', {id: k});
        }}
        key={k}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20}}>{data.Title}</Text>
            <Text style={{fontSize: 15}}>{data.Description}</Text>
            <View style={{flex: 1, flexDirection: 'row'}} />
            <Text>{data.date}</Text>
          </View>
        </View>
      </TouchableOpacity>,
    );
    this.setState({
      myView,
      activity: false,
    });
  };
  renderComplaint = () => {
    if (this.state.myView != undefined) {
      {
        this.state.myView.map(value => {
          return value;
        });
      }
    }
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
          <View>
            <View style={{height: '83%'}}>
              <Image
                style={{width: '100%', height: 250}}
                source={require('./../../images/bookComplaint.jpg')}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                height: 100,
                padding: 20,
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  if (this.state.PgId == undefined) {
                    this.setState({isVisible: !this.state.isVisible});
                  } else {
                    this.props.navigation.navigate('AddComplaint');
                  }
                }}>
                <Icon2
                  name="plus"
                  style={styles.searchIcon}
                  size={40}
                  color="white"
                />
                <Text style={styles.textdesign}>Book Complaint</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modelContainer}>
              <Modal
                animationType={'fade'}
                transparent={true}
                visible={this.state.isVisible}>
                <View style={styles.modal}>
                  <Text
                    style={{color: 'white', marginTop: '20%', fontSize: 18}}>
                    Pg is not assigned yet!
                  </Text>
                  <Text style={styles.text}>Do you want to change Pg?</Text>
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
                        this.props.navigation.navigate('Pg');
                      }}
                      style={styles.touchop}>
                      <Text style={styles.textdesign}>Ok</Text>
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
                {this.state.myView.map(value => {
                  return value;
                })}
              </ScrollView>
            </View>
            <View
              style={{
                justifyContent: 'center',
                height: 100,
                padding: 20,
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('AddComplaint');
                }}>
                <Icon2
                  name="plus"
                  style={styles.searchIcon}
                  size={40}
                  color="white"
                />
                <Text style={styles.textdesign}>Book Complaint</Text>
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
  modelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
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
  textdesign: {
    color: 'white',
    fontSize: 18,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },

  button: {
    height: 60,
    width: '100%',
    flex: 1,
    backgroundColor: '#5353c6',
    borderWidth: 0,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    height: 250,
    width: '80%',
    borderRadius: 10,
    marginTop: '45%',
    marginLeft: 40,
    padding: 10,
  },
});
