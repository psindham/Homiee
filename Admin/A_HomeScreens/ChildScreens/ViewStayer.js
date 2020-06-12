import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
  Modal
} from 'react-native';
import * as firebase from 'firebase';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Services} from './../../../Services';

var  id;
export class ViewStayer extends Component {
  state = {
    email: '',
    date: '',
    status: '',
    title: '',
    description: '',
    category: '',
    FileData: '',
    myView: [],
    activity: true,
    removed:false
  };

  constructor(props) {
    super(props);
    id = this.props.navigation.getParam('UserId', undefined);
    this.getUserDetails()
  }

  getUserDetails = () => {
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByKey().equalTo(id);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          setTimeout(() => {
            {
                this.addView(newPost[data],data)
                this.additionalView()
            }
          }, 100);
        }
      }
    });
  };
  occupation = val => {
    if (val.Occupation == 'Jober') {
      return (
        <View>
          <Text>Currently Working In </Text>
          <Text style={{fontSize: 20}}>
            {val.CompanyName}
            {','}
          </Text>
          <Text>{val.CompanyAddress}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text>Currently Studying In</Text>
          <Text>{val.SchoolName}</Text>
        </View>
      );
    }
  };
  addView = (newPost, k) => {
    let myView = this.state.myView;
    myView.push(
      <ImageBackground 
        source={require('./../../../images/AllocateBack.jpg')}
        style={{width: undefined, height: 380, padding: 16, paddingTop: 48}}>
        <View style={{height: 300}}>
          <Image source={{uri: newPost.userPic}} style={styles.images} />
          <View style={{flex: 1, flexDirection: 'row', height: 50}}>
            <Text style={{color: '#800000', fontWeight: 'bold', fontSize: 19}}>
              {eval(JSON.stringify(newPost.FirstName).toUpperCase())}
              {'  '}
              {eval(JSON.stringify(newPost.LastName).toUpperCase())}
            </Text>
            <Text style={{paddingTop: 5}}>({newPost.Gender})</Text>
          </View>
          {this.occupation(newPost)}
          <Text>
            {newPost.MobileNo}
            {','}
            {newPost.email}
          </Text>
          <Text>{newPost.Address}</Text>
          <Text
            style={{color: 'blue'}}
            onPress={() =>  this.props.navigation.navigate('image',{'UserId':k}) }>
            Click Here For KYC
          </Text>
        </View>
      </ImageBackground>
    );
    this.setState({
      myView,
    });
  };
  additionalView = () => {
    let myView = this.state.myView;
    myView.push(
        <View
        style={{
          justifyContent: 'center',
          height: 100,
          padding: 20,
        }}>
        
              <TouchableOpacity
                style={styles.buttoni}
                onPress={() => {
                  this.remove();
                }}>
                <Icon2
                  name="cross"
                  style={styles.searchIcon}
                  size={20}
                  color="white"
                />
                <Text style={styles.textdesign}>Remove</Text>
              </TouchableOpacity>
              </View>
 
    );
    this.setState({
      myView,
      activity:false
    });
   
  };
  remove=()=>{
    var updates = {};
    updates['/User/' + id.k + '/' + 'PgId'] = '';
    updates['/User/' + id.k + '/' + 'room'] ='';
    updates['/User/' + id.k + '/' + 'floor']='';
    firebase
      .database()
      .ref()
      .update(updates);
    this.setState({
      myView: [],
    });
    this.setState({
      removed:true
    });
    setTimeout(() => {
        this.setState({
            removed:false
          });
          this.props.navigation.navigate('Stayers')
    }, 2000);
  };
  render() {
    id = this.props.navigation.getParam('UserId', undefined);
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
      return (
        <View >
             <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.removed}>
              <View style={styles.modal}>
                <Icon4
                  name="check-circle"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={styles.text}>SuccessFully Removed !</Text>
              </View>
            </Modal>
          </View>
          {this.state.myView.map(value => {
            return value;
          })}
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  searchIcon: {
    padding: 10,
  },
  buttoni: {
    height: 70,
    width: '100%',
    backgroundColor: '#5353c6',
    borderWidth: 0,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  textdesign: {
    color: 'white',
    fontSize: 18,
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
  images: {
    width: 140,
    height: 130,
    marginHorizontal: 3,
    borderRadius: 70,
    marginRight: 50,
  },
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
  text: {
    color: 'white',
    marginTop: 20,
    fontSize: 25,
  },
});
