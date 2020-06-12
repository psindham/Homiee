import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  List,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import * as firebase from 'firebase';
import Icon5 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {Services} from './../../Services';

export class PollScreen extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: '                   Poll',
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
  state = {
    UserId: '',
    PgId: '',
    data1: [],
    myPollView: [],
    progressStatus: 18,
    pollsResults: '',
    opt: '',
    statusOption3: false,
    statusOption4: false,
    showImage: false,
    added: false,
    activity: true,
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
      const value2 = await AsyncStorage.getItem('UserId');
      if (value !== null) {
        this.setState({
          PgId: value,
          UserId: value2,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };
  componentDidMount() {
    <Services/>
   const { navigation } = this.props;
   this.focusListener = navigation.addListener("didFocus", () => {
     this.setState({
       activity:true
     })
     setTimeout(() => {
      {
        this.getFireData();
      }
    }, 3000);
    });
  }
  componentWillUnmount(){
    // Remove the event listener
    this.focusListener.remove();
  }

   
  
  getFireData = () => {
    this.setState({
      myPollView: [],
    });
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('PG');
    var query = events.orderByKey().equalTo(this.state.PgId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          if (newPost[data].poll != undefined) {
            this.setState({
              data1: newPost[data].poll,
            });
            this.AddPollView();
          } else {
            this.setState({
              showImage: true,
              activity:false
            });
          }
        }
      } else {
        this.setState({
          showImage: true,
          activity:false
        });
      }
    });
  };
  renderImage = () => {
   
  };
  updateVote = (question, mainOpt) => {
    var option1Votes = this.state.data1[question].option1Value;
    var option2Votes = this.state.data1[question].option2Value;
    var option3Votes = 0,
      option4Votes = 0;
    if (this.state.data1[question].option3 != 'NONE') {
      option3Votes = this.state.data1[question].option3Value;
    }
    if (this.state.data1[question].option4 != 'NONE') {
      option4Votes = this.state.data1[question].option4Value;
    }
    var TotalVotes = this.state.data1[question].votes;

    var coption1Votes =
      (Number.parseInt(option1Votes) * Number.parseInt(TotalVotes)) / 100;
    var coption2Votes =
      (Number.parseInt(option2Votes) * Number.parseInt(TotalVotes)) / 100;
    var coption3Votes = 0,
      coption4Votes = 0;
    if (this.state.data1[question].option3 != 'NONE') {
      coption3Votes =
        (Number.parseInt(option3Votes) * Number.parseInt(TotalVotes)) / 100;
    }
    if (this.state.data1[question].option4 != 'NONE') {
      coption4Votes =
        (Number.parseInt(option4Votes) * Number.parseInt(TotalVotes)) / 100;
    }

    if (mainOpt == 1) {
      coption1Votes = coption1Votes + 1;
    }
    if (mainOpt == 2) {
      coption2Votes = coption2Votes + 1;
    }
    if (mainOpt == 3) {
      coption3Votes = coption3Votes + 1;
    }
    if (mainOpt == 4) {
      coption4Votes = coption4Votes + 1;
    }

    TotalVotes = TotalVotes + 1;
    var moption1Value =
      (Number.parseInt(coption1Votes) * 100) / Number.parseInt(TotalVotes);
    var moption2Value =
      (Number.parseInt(coption2Votes) * 100) / Number.parseInt(TotalVotes);
    var moption3Value, moption4Value;
    if (this.state.data1[question].option3 != 'NONE') {
      moption3Value =
        (Number.parseInt(coption3Votes) * 100) / Number.parseInt(TotalVotes);
    }
    if (this.state.data1[question].option3 != 'NONE') {
      moption4Value =
        (Number.parseInt(coption4Votes) * 100) / Number.parseInt(TotalVotes);
    }
    var updates = {};
    updates[
      '/PG/' + this.state.PgId + '/' + 'poll' + '/' + question + '/option1Value'
    ] = moption1Value.toFixed(2);
    updates[
      '/PG/' + this.state.PgId + '/' + 'poll' + '/' + question + '/option2Value'
    ] = moption2Value.toFixed(2);
    if (this.state.data1[question].option3 != 'NONE') {
    updates[
      '/PG/' + this.state.PgId + '/' + 'poll' + '/' + question + '/option3Value'
    ] = moption3Value.toFixed(2);
     }
     if (this.state.data1[question].option4 != 'NONE') {
    updates[
      '/PG/' + this.state.PgId + '/' + 'poll' + '/' + question + '/option4Value'
    ] = moption4Value.toFixed(2);
  }
    updates[
      '/PG/' + this.state.PgId + '/' + 'poll' + '/' + question + '/votes'
    ] = TotalVotes;

    console.warn(
      moption1Value +
        ' ' +
        moption2Value +
        ' ' +
        moption3Value +
        ' ' +
        moption4Value,
    );

    updates['/User/' + this.state.UserId + '/Poll/' + question] = true;
    firebase
      .database()
      .ref()
      .update(updates);
    {
      this.getFireData();
    }
  };
  renderView = (k, viewCol) => {
    console.warn(k, viewCol);
    let myPollView = this.state.myPollView;
    if (this.state.data1[k].option3 != 'NONE') {
      this.setState({statusOption3: true});
    } else {
      this.setState({statusOption3: false});
    }
    if (this.state.data1[k].option4 != 'NONE') {
      this.setState({statusOption4: true});
    } else {
      this.setState({statusOption4: false});
    }
    myPollView.push(
      <View
        elevation={5}
        style={{
          width: 390,
          height: 250,
          backgroundColor: 'white',
          alignContent: 'center',
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 10,
        }}
        key={k}>
        <Text style={styles.labelOption}>{k}</Text>
        <TouchableOpacity
          style={styles.container}
          key={this.state.data1[k].option1}
          onPress={() => {
            if (!viewCol) {
              this.updateVote(k, 1);
            } else {
              this.setState({
                added: true,
              });
              setTimeout(() => {
                this.setState({added: false});
              }, 2000);
            }
          }}>
          {viewCol ? (
            <View
              style={[
                styles.inner,
                {width: parseInt(this.state.data1[k].option1Value) + '%'},
              ]}
            />
          ) : null}
          <Text style={styles.labelOption}>{this.state.data1[k].option1}</Text>
          {viewCol ? (
            <Text style={styles.labelOptionvalue}>
              {this.state.data1[k].option1Value} %
            </Text>
          ) : null}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
          key={this.state.data1[k].option2}
          onPress={() => {
            if (!viewCol) {
              this.updateVote(k, 2);
            } else {
              this.setState({
                added: true,
              });
              setTimeout(() => {
                this.setState({added: false});
              }, 2000);
            }
          }}>
          {viewCol ? (
            <View
              style={[
                styles.inner,
                {width: parseInt(this.state.data1[k].option2Value) + '%'},
              ]}
            />
          ) : null}
          <Text style={styles.labelOption}>{this.state.data1[k].option2}</Text>
          {viewCol ? (
            <Text style={styles.labelOptionvalue}>
              {this.state.data1[k].option2Value} %
            </Text>
          ) : null}
        </TouchableOpacity>
        {this.state.statusOption3 ? (
          <TouchableOpacity
            style={styles.container}
            key={this.state.data1[k].option3}
            onPress={() => {
              if (!viewCol) {
                this.updateVote(k, 3);
              } else {
                this.setState({
                  added: true,
                });
                setTimeout(() => {
                  this.setState({added: false});
                }, 2000);
              }
            }}>
            {viewCol ? (
              <View
                style={[
                  styles.inner,
                  {width: parseInt(this.state.data1[k].option3Value) + '%'},
                ]}
              />
            ) : null}
            <Text style={styles.labelOption}>
              {this.state.data1[k].option3}
            </Text>
            {viewCol ? (
              <Text style={styles.labelOptionvalue}>
                {this.state.data1[k].option3Value} %
              </Text>
            ) : null}
          </TouchableOpacity>
        ) : null}
        {this.state.statusOption4 ? (
          <TouchableOpacity
            style={styles.container}
            key={this.state.data1[k].option4}
            onPress={() => {
              if (!viewCol) {
                this.updateVote(k, 4);
              } else {
                this.setState({
                  added: true,
                });
                setTimeout(() => {
                  this.setState({added: false});
                }, 2000);
              }
            }}>
            {viewCol ? (
              <View
                style={[
                  styles.inner,
                  {width: parseInt(this.state.data1[k].option4Value) + '%'},
                ]}
              />
            ) : null}
            <Text style={styles.labelOption}>
              {this.state.data1[k].option4}
            </Text>
            {viewCol ? (
              <Text style={styles.labelOptionvalue}>
                {this.state.data1[k].option4Value} %
              </Text>
            ) : null}
          </TouchableOpacity>
        ) : null}
      </View>,
    );
    this.setState({
      myPollView,
      activity: false,
    });
  };
  AddPollView = () => {
    var viewCol = false;
    const vals = Object.keys(this.state.data1);
    var i = 0;
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByKey().equalTo(this.state.UserId);
    query.once('value', snapshot => {
      if (snapshot.exists()) {
        newPost = snapshot.val();
        const keys = Object.keys(newPost);
        for (let data of keys) {
          const keys2 = Object.keys(newPost[data].Poll);
          for (let data2 of keys2) {
            if (data2 == vals[i]) {
              console.warn(newPost[data].Poll[data2]);
              if (newPost[data].Poll[data2]) {
                viewCol = true;
                let k = vals[i];
                i++;
                this.renderView(k, viewCol);
              } else {
                viewCol = false;
                let k = vals[i];
                i++;
                this.renderView(k, viewCol);
              }
            }
          }
        }
      } else {
        this.setState({
          showImage: true,
          activity: false,
        });
      }
    });
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
      if(this.state.showImage){
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              height: '100%',
            }}>
            <Image
              style={{width: '80%', height: 330}}
              source={require('./../../images/Poll.jpg')}
            />
          </View>
        );
      }else{
      return (
        <ScrollView>
          <View style={{flex: 1, backgroundColor: '#fff', padding: 10}}>
            {this.state.myPollView.map(value => {
              return value;
            })}
          </View>
          <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.added}>
              <View style={styles.modal}>
                <Icon4
                  name="check-circle"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={styles.text}>You have already voted!</Text>
              </View>
            </Modal>
          </View>
        </ScrollView>
      );
          }
    }
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    borderColor: '#6600cc',
    borderWidth: 2,
    marginTop: 8,
    justifyContent: 'center',
    borderRadius: 8,
  },
  inner: {
    width: '100%',
    height: 30,
    backgroundColor: '#d9b3ff',
  },
  labelOption: {
    fontSize: 18,
    color: '#6600cc',
    position: 'absolute',
    zIndex: 1,
    marginLeft: 10,
  },
  labelOptionvalue: {
    fontSize: 18,
    color: '#6600cc',
    position: 'absolute',
    zIndex: 1,
    marginLeft: 290,
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
