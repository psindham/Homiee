import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../components/Button';
import {Activityindicator} from '../components/Activityindicator';
import * as firebase from 'firebase';
import {ScrollView} from 'react-native-gesture-handler';
import {Services} from './../Services';

export class SelectPg extends Component {
  static navigationOptions = {
    title: 'Select PG ',
   
  };
  constructor(props) {
    super(props);
  }

  state = {
    searchByFlag: true,
    myView: [],
    PgType: '',
    isLoaded: false,
    variable: '',
    isVisible: '',
    pgname: '',
    pgid: '',
    pgcity: '',
    goback: false,
    datanotfound: false,
  };
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyCJkLnfyglXnAe64Y93kSjRz4dOhSxgbWk",
      authDomain: "homiee-afbd4.firebaseapp.com",
      databaseURL: "https://homiee-afbd4.firebaseio.com",
      projectId: "homiee-afbd4",
      storageBucket: "homiee-afbd4.appspot.com",
      messagingSenderId: "373427940224",
      appId: "1:373427940224:web:8657c1451f527312166f65",
      measurementId: "G-1ZFQHHFVYB"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    {
      this.initialData();
    }
  }
  initialData = () => {
    let newPost;
    var flag = this.state.searchByFlag ? 'city' : 'PgName';
    var id = '-M6YIRfep3uFjaEv4fzL';
    const db = firebase.database();
    const events = db.ref().child('PG');
    var query = events.orderByChild('PgType').equalTo(this.state.PgType);
    query.once('value', snapshot => {
      newPost = snapshot.val();
      // if (snapshot.exists()) {
      //   console.warn(newPost);
      //   this.setState({datanotfound:true})
      // }else{
      //   this.setState({datanotfound:false})
      setTimeout(() => {
        this.addView(newPost);
      }, 1000);
      //}
    });
  };
  searchData = () => {
    if (this.state.searchByFlag) {
      let newPost;
      var flag = this.state.searchByFlag ? 'city' : 'PgName';
      const db = firebase.database();
      const events = db.ref().child('PG');
      var query = events
        .orderByChild('City')
        .startAt(this.state.variable)
        .endAt(this.state.variable + '\uf8ff');
      query.once('value', snapshot => {
        newPost = snapshot.val();
        setTimeout(() => {
          this.addView(newPost);
        }, 100);
      });
    } else {
      let newPost;
      var flag = this.state.searchByFlag ? 'city' : 'PgName';
      const db = firebase.database();
      const events = db.ref().child('PG');
      var query = events
        .orderByChild('PgName')
        .startAt(this.state.variable)
        .endAt(this.state.variable + '\uf8ff');
      query.once('value', snapshot => {
        newPost = snapshot.val();
        setTimeout(() => {
          this.addView(newPost);
        }, 100);
      });
    }
  };
  addView = data => {
    this.setState({
      myView: [],
    });
    if (data != null) {
      const vals = Object.keys(data);
      let myView = this.state.myView;
      for (let k of vals) {
        myView.push(
          <TouchableOpacity
            elevation={5}
            style={{
              width: 390,
              height: 120,
              backgroundColor: 'white',
              alignContent: 'center',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              marginTop: 10,
            }}
            onPress={() => {
              this.visibleModel(data[k].PgName, k, data[k].City);
            }}
            key={k}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={{fontSize: 20}}>{data[k].PgName}</Text>
                <Text style={{fontSize: 20}}>Rent {data[k].Rent}</Text>
                <Text style={{fontSize: 20}}>Address {data[k].Address}</Text>
                <Text>{data[k].City}</Text>
              </View>
            </View>
          </TouchableOpacity>,
        );
        this.setState({
          myView,
        });
      }
      this.setState({
        isLoaded: true,
      });
    } else {
      {
        this.initialData();
      }
    }
  };
  toggleSearch = () => {
    this.setState({
      searchByFlag: !this.state.searchByFlag,
    });
  };
  activity = () => {
    //if(!this.state.datanotfound){
    if (!this.state.isLoaded) {
      return (
        <Activityindicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      );
    } else {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {this.state.myView.map(value => {
            return value;
          })}
        </View>
      );
    }
    // }else{
    //   return(<Text>Data not fund</Text>)
    // }
  };
  visibleModel = (data, key, city) => {
    this.setState({
      isVisible: true,
      pgname: data,
      pgid: key,
      pgcity: city,
    });
  };
  navigateTosignup = () => {
    //this.setState({isVisible: !this.state.isVisible});
    this.props.navigation.navigate('SignupNav', {
      pgname: this.state.pgname,
      pgid: this.state.pgid,
      pgcity: this.state.pgcity,
    });
  };
  render() {
    let pgty = this.props.navigation.getParam('pgType', undefined);
    setTimeout(() => {
      this.setState({
        PgType: pgty,
      });
     
    }, 1000);
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
                name={this.state.searchByFlag ? 'search-location' : 'search'}
                size={27}
                color="#000"
              />
              <TextInput
                style={styles.input}
                placeholder={
                  this.state.searchByFlag ? 'Search By City' : 'Search By Name'
                }
                onChangeText={variable => {
                  this.setState({variable});
                }}
                onBlur={() => {
                  this.searchData();
                }}
              />
              <Icon
                style={styles.searchIcon}
                name="filter"
                size={20}
                color="#000"
                onPress={() => {
                  this.toggleSearch();
                }}
              />
            </View>
          </View>
        </View>
        <ScrollView>{this.activity()}</ScrollView>
        <View style={styles.modelContainer}>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.isVisible}>
            <View style={styles.modal}>
              <Icon2
                name="information"
                style={{paddingTop: 25}}
                size={50}
                color="#9900cc"
              />
              <Text style={styles.text}>
                Are you Sure you want to choose {this.state.pgname} ?
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  height: 50,
                  marginBottom: 50,
                }}>
                <TouchableOpacity
                  onPress={() => this.navigateTosignup()}
                  style={styles.touchop}>
                  <Text style={{color: '#9900cc'}}>Ok</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({isVisible: !this.state.isVisible});
                  }}
                  style={styles.touchop}>
                  <Text style={{color: '#8600b3', fontSize: 15}}>cancel</Text>
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
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  modal: {
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '40%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: '40%',
    marginLeft: 40,
  },
  text: {
    color: '#9900cc',
    marginTop: 20,
    fontSize: 18,
    marginLeft: 15,
  },
  touchop: {
    padding: 10,
    height: 50,
    width: 100,
    marginTop: 10,
    backgroundColor: '#f2ccff',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#9900cc',
    borderWidth: 1,
  },
});
