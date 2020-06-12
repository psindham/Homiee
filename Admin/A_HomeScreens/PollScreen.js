import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Button, List,Image} from 'react-native';
import ActionButton from 'react-native-action-button';
import * as firebase from 'firebase';
import Icon5 from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo'; 
import AsyncStorage from '@react-native-community/async-storage';
import {Activityindicator} from './../../components/Activityindicator';
import {Services} from './../../Services';

var first=true;
export class PollScreen extends Component {
  static navigationOptions=({navigation}) => {
    return{
    title:"                   Poll",
    headerRight: (  
        <Icon2 
            style={{ paddingRight: 10 }}  
            onPress={() => navigation.navigate('Notification')}  
            name="notification"  
            size={30}  
        /> 
    ) 
    }
   };
  state = {
    PgId:'',
    data1: '',
    myPollView: [],
    progressStatus: 18,
    pollsResults: '',
    opt: '',
    statusOption3:false,
    statusOption4:false,
    showImage:false,
    activity:true
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
      if (value !== null) {
        this.setState({
          PgId:value,
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
        }, 2000);
    
    });
  }
  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }
initialData=()=>{
  this.setState({
    myPollView: [],
    activity:true,
    data1:''
  });
  let newPost;
  const db = firebase.database();
  const events = db.ref().child('PG');
  var query = events.orderByKey().equalTo(this.state.PgId);
  query.once('value', snapshot => {
    if(snapshot.exists()){  
    newPost = snapshot.val();
    const keys = Object.keys(newPost);
    for (let data of keys) {
      this.setState({
        data1: newPost[data].poll,
      });
      if(newPost[data].poll!=undefined){
        this.AddPollView();
        this.setState({
          activity:false,
          showImage:false
        })
      }else{
        this.setState({
          activity:false,
          showImage:true
        })
      }
    }
  }else{
  this.setState({
    showImage:true
  })
  }
  });

}

  AddPollView = () => {
    const vals = Object.keys(this.state.data1);
    let myPollView = this.state.myPollView;
    for(let k of vals){
      if(this.state.data1[k].option3 != 'NONE'){
      this.setState({statusOption3:true})
      }else{
        this.setState({statusOption3:false})
      }
      if(this.state.data1[k].option4 != 'NONE'){
        this.setState({statusOption4:true})
        }else{
          this.setState({statusOption4:false})
        }
    myPollView.push(
      <View
         elevation={5}
          style={{
            width: 390,
            height: 250,
            backgroundColor: 'white',
            alignContent: 'center',
            padding:20,
            borderRadius:10,
            alignItems:'center',
            marginTop:10,
            marginLeft:10
            // justifyContent:'center',
          }}
          key={this.state.data1[k]}>
            <Text style={styles.labelOption}>{k}</Text>
                  <View style={styles.container} key={this.state.data1[k].option1}>
                      <View
                        style={[
                          styles.inner,
                          {width: parseInt(this.state.data1[k].option1Value) + '%'},
                        ]}
                      />
                      <Text style={styles.labelOption}>
                        {this.state.data1[k].option1}
                      </Text>
                      <Text style={styles.labelOptionvalue}>
                      {this.state.data1[k].option1Value} %
                        </Text>
                    </View>
                    <View style={styles.container} key={this.state.data1[k].option2}>
                      <View
                        style={[
                          styles.inner,
                          {width: parseInt(this.state.data1[k].option2Value) + '%'},
                        ]}
                      />
                      <Text style={styles.labelOption}>
                        {this.state.data1[k].option2} 
                      </Text>
                      <Text style={styles.labelOptionvalue}>
                      {this.state.data1[k].option2Value} %
                        </Text>
                    </View>
                  {this.state.statusOption3?
                    <View style={styles.container} key={this.state.data1[k].option3}>
                      <View
                        style={[
                          styles.inner,
                          {width: parseInt(this.state.data1[k].option3Value) + '%'},
                        ]}
                      />
                      <Text style={styles.labelOption}>
                        {this.state.data1[k].option3}
                      </Text>
                      <Text style={styles.labelOptionvalue}>
                      {this.state.data1[k].option3Value} %
                        </Text>
                    </View>
                    :null}
                     {this.state.statusOption4?
                    <View style={styles.container} key={this.state.data1[k].option4}>
                      <View
                        style={[
                          styles.inner,
                          {width: parseInt(this.state.data1[k].option4Value) + '%'},
                        ]}
                      />
                      <Text style={styles.labelOption}>
                        {this.state.data1[k].option4} 
                      </Text>
                      <Text style={styles.labelOptionvalue}>
                      {this.state.data1[k].option4Value} %
                        </Text>
                    </View>:null}
                </View>
    );
    this.setState({
      myPollView,
      activity:false
    })
    }
  };

  render() {
    if (this.state.activity) {
      return (
          <Activityindicator size="large" color="red" />
      );
    } else {
      if(this.state.showImage){
        return(
          <View style={{backgroundColor:'white',height:'100%'}}>
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Image style={{width:'80%',height:330}} source={require('./../../images/Poll.jpg')}/>
            </View>
        <ActionButton buttonColor="rgba(231,76,60,1)" > 
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Add Poll"
          onPress={() => this.props.navigation.navigate('AddPollScreen')}>
          <Icon5 name="md-create" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      </View>
        );
      }else{
        return (
          <ScrollView>
            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <View
                style={{
                  width: 410,
                  height: 600,
                  backgroundColor: 'white',
                  alignContent: 'center',
                }}>
                  <ScrollView>
                  {this.state.myPollView.map(value => {
                    return value;
                  })}
                  </ScrollView>
                  
              </View>
            </View>
                <ActionButton buttonColor="rgba(231,76,60,1)" > 
                    <ActionButton.Item
                      buttonColor="#9b59b6"
                      title="Add Poll"
                      onPress={() => this.props.navigation.navigate('AddPollScreen')}>
                      <Icon5 name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item
                      buttonColor="#3498db"
                      title="Delete Poll"
                      onPress={() => this.props.navigation.navigate('deletePoll')}>
                      <Icon name="delete" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                  </ActionButton>
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
    borderRadius:8,
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
   // alignSelf: 'center',
    marginLeft:10,
  },
  labelOptionvalue: {
    fontSize: 18,
    color: '#6600cc',
    position: 'absolute',
    zIndex: 1,
    marginLeft:250,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
