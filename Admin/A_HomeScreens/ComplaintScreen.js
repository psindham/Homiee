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
import { Activityindicator} from './../../components/Activityindicator';

var first=true;
export class ComplaintScreen extends Component {
  state = {
    email: '',
    showImage: false,
    myView: [],
    PgId: '',
    activity: true,
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
        }, 1000);
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
    const events = db.ref().child('Complaints');
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
          activity:false,
          showImage: false,
        }); 
      } else {
        this.setState({
          activity:false,
          showImage: true,
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
        onPress={() => {
          this.props.navigation.navigate('AssignComplaint', {id: k});
        }}
        key={k}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={{fontSize: 20}}>{data.Title}</Text>
            <Text style={{fontSize: 15}}>
              {data.Description}
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}} />  
            <Text>{data.date}</Text>
          </View>
        </View>
      </TouchableOpacity>,
    );
    this.setState({
      myView,
      activity:false,
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
    if (this.state.activity){
      return(
      <View style = {styles.Actcontainer}>
           <Activityindicator size='large' color='red'/>
        </View>
      );
    }else{  
      if (this.state.showImage) {
          return(
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: '80%', height: 250}}   
          source={require('./../../images/complaint.jpg')}
        />
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
          </View>
        );
      }
    }
  }
}
const styles = StyleSheet.create({
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
