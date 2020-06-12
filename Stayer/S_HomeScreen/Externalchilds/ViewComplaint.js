import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackgroundBase,
  ActivityIndicator,
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Services} from './../../../Services';

var data, id;
export class ViewComplaint extends Component {
  state = {
    email: '',
    date: '',
    status: '',
    title: '',
    description: '',
    category: '',
    FileData: '',
    myView: [],
    activity:true,
  };

  constructor(props) {
    super(props);
    id = this.props.navigation.getParam('id', undefined);
    {
      this.getData();
    }
  }

  getData = () => {
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
              this.addView(newPost[data], data);
            }
          }, 500);
        }
      }
    });
  };
  getStaffDetails = (status, pgid, staffid) => {
    if (status == 'Assigned') {
      let newPost;
      const db = firebase.database();
      const events = db.ref().child('PG');
      var query = events.orderByKey().equalTo(pgid);
      query.once('value', snapshot => {
        if (snapshot.exists()) {
          newPost = snapshot.val();
          const keys = Object.keys(newPost);
          for (let data of keys) {
            setTimeout(() => {
              if(newPost[data].Staff!=undefined){
              const key2 = Object.keys(newPost[data].Staff);
              for (let data2 of key2) {
                if (data2 == staffid) {
                    let myView = this.state.myView;
                    myView.push(
                    <View style={{
                      marginTop:20,}}>
                      <View
                        style={{
                          marginTop:20,
                          flex: 1,   
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                        Assigned To:{' '}
                        </Text>
                        <Text> {newPost[data].Staff[data2].Name}</Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop:20,
                        }}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                       Phone No:{' '}
                        </Text>
                        <Text> {newPost[data].Staff[data2].PhoneNo}</Text>
                      </View>
                    </View>
                    );
                    this.setState({
                      myView,
                      activity:false
                    });
                }
              }
            }
            }, 500);
          }
        }
      });
    }
  };
  addView = (data, k) => {
    if (data.FileData != '') {
      let myView = this.state.myView;
      myView.push(
        <View key={k} >
           <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',marginTop:20}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>Title : </Text>
            <Text>{data.Title}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',alignItems:'center',marginTop:20}}>
          <Text style={{fontWeight:'bold',fontSize:18}}>Description : </Text>
          <Text>{data.Description}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row',alignItems:'center',marginTop:20}}>
          <Text style={{fontWeight:'bold',fontSize:18}}>Status : </Text>
          <Text>{data.status}</Text>
          </View>
            <Image
              source={{uri: data.FileData}}
              style={{width: undefined, height: 200,marginTop:40}}
            />
            {this.getStaffDetails(data.status, data.PgId, data.AssignedTo)}
        </View>,
      );
      this.setState({
        myView,
      });
    }
  };
  update = () => {
    var updates = {};
    updates['/Complaints/' + id + '/' + 'status'] = 'Solved';
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
  };
  render() {
    id = this.props.navigation.getParam('id', undefined);
if(this.state.activity){
  return (
    <View style = {styles.Actcontainer}>
       <ActivityIndicator
          animating = {true}
          color = '#bc2b78'
          size = "large"
          style = {styles.activityIndicator}/>
    </View>
 )
}else{
    return (
      <View style={{}}>
        {this.state.myView.map(value => {
          return value;
        })}
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
            <Text style={styles.textdesign}>Update As Solved</Text>
          </TouchableOpacity>
        </View>
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
