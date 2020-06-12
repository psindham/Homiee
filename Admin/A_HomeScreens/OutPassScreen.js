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

var first=true;
export class OutPassScreen extends Component {
  state = {
    email: '',
    showImage: false,
    myView: [],
    PgId: '',
    activity: true,
  };
  static navigationOptions = ({navigation}) => {
    return {
      title: '                OutPass',
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
      const Pgid = await AsyncStorage.getItem('PgId');
      if (Pgid !== null) {
        this.setState({
          PgId: Pgid, 
        });
      }
    } catch (e) {
      console.warn(e);
    }
    return true
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
      activity:true,
    });
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('Outpass');
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
          height: 150,
          backgroundColor: 'white',
          alignContent: 'center',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 5,
          marginLeft: 10,
        }}
        key={k}
        onPress={()=>{

          this.props.navigation.navigate('ViewOutpass',{'complaintId':{k}})
        }}
        >
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20}}>
              {data.Description}
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Approval: </Text>
              <Text style={{fontSize: 15}}>{data.status}</Text>
            </View>
            <Text>{data.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
    this.setState({
      myView,
      activity: false,
    });
  };

  renderImage = () => {
    if (this.state.showImage) {
     
    }
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
  render(){
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
      if(this.state.showImage){
        return (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              style={{width: '80%', height: 250}}
              source={require('./../../images/complaint.jpg')}
            />
          </View>
        );
      }else{
        return (
          <View>
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
    height: 50,
    width: '20%',
    backgroundColor: '#5353c6',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius:5
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
    fontSize: 15,
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
