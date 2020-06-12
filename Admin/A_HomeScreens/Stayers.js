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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';
import {Activityindicator} from './../../components/Activityindicator';

var first=true;
export class Stayers extends Component {
  state = {
    email: '',
    showImage: false,
    myView: [],
    UserId: '',
    PgId: '',
    variable: '',
    activity: true,
  };
  static navigationOptions = ({navigation}) => {
    return {
      title: '                Stayers',
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
    <Services />;
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.setState({
        activity:true
      })
        this.getData()
        setTimeout(() => {
          this.initialData()
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
      activity:true
    });
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByChild('PgId').equalTo(this.state.PgId);
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
          activity:false,
          showImage: true,
        });
      }
    });
  };
  searchData = () => {
    console.warn(this.state.variable);
    this.setState({
      myView: [],
    });
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events
      .orderByChild('FirstName')
      .startAt(this.state.variable)
      .endAt(this.state.variable + '\uf8ff');
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
        key={k}
        onPress={() => {
          this.props.navigation.navigate('ViewStayer', {UserId: k});
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20,}}>
              {data.FirstName}
              {'  '}
              {data.LastName}
            </Text>
            <Text style={{fontSize: 15,}}>{data.Address}</Text>
            <Text style={{fontSize: 13,}}>{data.MobileNo}</Text>
          </View>
        </View>
      </TouchableOpacity>,
    );
    this.setState({
      myView,
      activity: false,
    });
  };
  renderStayers = () => {
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
      return <Activityindicator size="large" color="red" />;
    } else {
      if(this.state.showImage){
        return (
          <View  style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            
          }}>
             <Icon
            name='user-times'
            size={30}
            color='black'
            />
          </View>
        );
      }else{
        return (
          <View>
            <View
              style={{
                padding: 10,
                height: 115,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View style={styles.searchSection}>
                  <Icon
                    style={styles.searchIcon}
                    name={'search'}
                    size={27}
                    color="#000"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder={'Search By Name'}
                    onChangeText={variable => {
                      this.setState({variable});
                    }}
                    onBlur={() => {
                      this.searchData();
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{marginTop: 30, height: '78%'}}>
              <ScrollView>
                {this.state.myView.map(value => {
                  return value;
                })}
               
              </ScrollView>
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
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
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
  },
  searchIcon: {
    padding: 10,
  },
});
