import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import {Services} from './../../Services';

var id,pic;
export class image extends Component {
  static navigationOptions = {
    title: '                Image',
  };
  componentDidMount(){
    <Services/>
    {this.getUserDetails()}
  }
  state={
    filedata:''
  }

  getUserDetails = () => {
    console.warn(id)
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByKey().equalTo(id);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
         this.setState({
          filedata: newPost[data].userPic
         });
        }
      }
    });
  };
  renderimage = () => {
    setTimeout(() => {
      
    }, 1000);
  };
  render() {
    id = this.props.navigation.getParam('UserId', undefined);
    return ( <View>
      <Image source={{uri: this.state.filedata}} style={{width: undefined, height:'80%'}} />
    </View>);
  }
}
