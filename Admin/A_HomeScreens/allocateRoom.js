import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker,

} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/EvilIcons';
import { Modal } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker';

var userId,requestId;
var list = [],roomList=[];
export class allocateRoom extends Component {
  state = {
    PgId:'',
    email: '',
    userId: '',
    myView: [],
    FloorList:[],
    roomList:[],
    isVisible:false,
    showImage:'',
    showView: true,
    showRooms:true,
    floor:'',
    room:'',
    requestId:'',
    error:'',
    comp:false,
    fromdate:'',
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
          PgId: value,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };
  componentDidMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyChIrHfmo7bF-VSdOojq-Q2h8vwlegM32Q',
      authDomain: 'homiesdatabase.firebaseapp.com',
      databaseURL: 'https://homiesdatabase.firebaseio.com',
      projectId: 'homiesdatabase',
      storageBucket: 'homiesdatabase.appspot.com',
      messagingSenderId: '97155785311',
      appId: '1:97155785311:web:715811abcf2d738a7971ea',
      measurementId: 'G-CNG2QMEFQ0',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByKey().equalTo(userId);
    query.once('value', snapshot => {
      newPost = snapshot.val();
      const keys = Object.keys(newPost);
      for (let k of keys) {
        this.addView(newPost[k], k);
      }
    });
    {this.addFloors()}
  }
  addFloors=()=>{
    this.setState({
    FloorList:[]
    })
    list=[]
    setTimeout(() => {
      let newPost;
      const db = firebase.database();
      const events = db.ref().child('PG');
      var query = events.orderByKey().equalTo(this.state.PgId);
      query.once('value', snapshot => {
        if (snapshot.exists()) {
        
          newPost = snapshot.val();
          const keys = Object.keys(newPost);
          for (let data of keys) {
            if (newPost[data].Floors == undefined) {
              this.setState({
                showImage: true,
              });
              this.setState({
                showView: false,
              });
              console.warn(list);
            } else {
              const key = Object.keys(newPost[data].Floors);
              for (let k of key) {
                let v =this.state.FloorList;
                let varr = k;
                list.push(varr);
                v.push(varr);
                this.setState({
                  FloorList:v
                })
              }
            }
          }
        } else {
          this.setState({
            showImage: true,
          });
          this.setState({
            showView: false,
          });
        }
      });
    }, 1000);
  }
  viewFloors=()=>{
    let addItems =list.map(item => {
      return <Picker.Item label={item} value={item} key={item} />;
    });
    if (this.state.showView) {
      return (
          <View
            style={{
              width:'100%',
              height: 100,
              backgroundColor: 'rgb(225,225,225)',
              padding: 10,
              borderRadius: 6,
            }}>
            <Text style={{fontSize: 15}}>{'  '}Select Floor</Text>
            <View style={styles.searchSection}>
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.floor}
                onValueChange={itemValue => {
                  this.setState({
                    floor: itemValue,
                  });
                  setTimeout(() => {
                    this.populateRooms();
                  }, 1000);
                }}>
                {addItems}
              </Picker>
            </View>
          </View>
      );
    }
  }
  modalVisible=(error)=>{
      this.setState({isVisible:true,error:error})
  }
  modalFade=()=>{ 
    setTimeout(() => {
      this.setState({
        comp:!this.state.comp
      })
      this.props.navigation.navigate('Notification');
    }, 2000);
  }
  populateRooms = () => {
    this.setState({ 
      roomList:[]
      })
      roomList=[]
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('PG');
    var query = events.orderByKey().equalTo(this.state.PgId);
    query.once('value', snapshot => {
      newPost = snapshot.val();
      if (snapshot.exists()) {
        const keys = Object.keys(newPost);
        for (let data of keys) {
          if (newPost[data].Floors != undefined) {
            const key = Object.keys(newPost[data].Floors);
            for (let k of key) {
              if (this.state.floor == k) {
                if(newPost[data].Floors[k].rooms!=0)
                {
                  const roomkey = Object.keys(newPost[data].Floors[k])
                  for(let r of roomkey)
                  {
                    if(r!='rooms' && newPost[data].Floors[k][r]==''){
                      let v =this.state.roomList;
                    roomList.push(r);
                    v.push(r);
                    this.setState({
                      roomList:v
                    })
                    }
                  }
                }else{
                  this.setState({
                      showRooms:false
                  })
                }
              }
            }
          }
        }
      }
    });
  };
  ViewRoom=()=>{
    let addItems =roomList.map(item => {
      return <Picker.Item label={'Room no '+item} value={item} key={item} />;
    });
    if (this.state.showRooms) {
      return (
          <View
            style={{
              width:'100%',
              height: 100,
              backgroundColor: 'rgb(225,225,225)',
              padding: 10,
              borderRadius: 6,
            }}>
            <Text style={{fontSize: 15}}>{'  '}Select Room</Text>
            <View style={styles.searchSection}>
              <Picker
                style={styles.pickerStyle}
                selectedValue={this.state.room}
                onValueChange={itemValue => {
                  this.setState({
                    room: itemValue,
                  });
                }}>
                {addItems}
              </Picker>
            </View>
          </View>
      );
    }
  }
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
        source={require('./../../images/AllocateBack.jpg')}
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
            onPress={() =>  this.props.navigation.navigate('image',{'UserId':k})}>
            Click Here For KYC
          </Text>
        </View>
      </ImageBackground>
     
    );
    this.setState({
      myView,
    });
  };
  allocate=()=>{
    if(this.state.floor){
      if(this.state.room!=''){
        if(this.state.fromdate!=''){
    var allocationData={
      'PgId':this.state.PgId,
      'userId':userId,
      'date':new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear(),
      'room':this.state.room,
      'floor':this.state.floor,
      'RequestId':requestId,
      'DOJ':this.state.fromdate,
    }
    const db1 = firebase.database();
    var newKey = db1.ref().child('roomAllocation').push().key;
    var updates = {};
    updates['/roomAllocation/' + newKey ] =allocationData;
    firebase
      .database()
      .ref()
      .update(updates);

   var updates2={};
    updates2['/User/'+ userId+'/PgId']=this.state.PgId;
    updates2['/User/'+ userId+'/room']=this.state.room;
    updates2['/User/'+ userId+'/floor']=this.state.floor;
    updates2['/User/'+ userId+'/DOJ']=this.state.fromdate;
    firebase
    .database()
    .ref()
    .update(updates2);


    var updates = {};
    updates['/PG/' + this.state.PgId + '/' + 'Floors' + '/' + this.state.floor+'/'+this.state.room] = userId;
    firebase
      .database()
      .ref()
      .update(updates);

      const db = firebase.database();
      const events = db.ref().child('RequestPG');
      var updates = {};
      updates['/RequestPG/' + requestId + '/' + 'allocated' ] =true;
      firebase
        .database()
        .ref()
        .update(updates);
        this.setState({
          comp:true
        })
        {this.modalFade()}
      }else{
        {this.modalVisible('Select Date')}
        setTimeout(() => {
          this.setState({
            isVisible:!this.state.isVisible
          })
        }, 2000);
      }
  }else{
    {this.modalVisible('Select Room')}
    setTimeout(() => {
      this.setState({
        isVisible:!this.state.isVisible
      })
    }, 2000);
  }
  }else{
    {this.modalVisible('Select Floor')}
    setTimeout(() => {
      this.setState({
        isVisible:!this.state.isVisible
      })
    }, 2000);
  }
 
  }
  deny=()=>{
    const db = firebase.database();
    const events = db.ref().child('RequestPG');
    var updates = {};
    updates['/RequestPG/' + requestId + '/' + 'RequestStatus' ] =true;
    firebase
      .database()
      .ref()
      .update(updates);
  }
  render() {
    userId = this.props.navigation.getParam('UserId', undefined);
    requestId= this.props.navigation.getParam('requestId', undefined);
    let addItems = list.map(item => {
      return <Picker.Item label={item} value={item} key={item} />;
    });
    return (
      <View>
        <ScrollView>
          <View style={{flex: 1}}>
            {this.state.myView.map(value => {
              return value;
            })}
          </View>
         
          <View>
          {this.viewFloors()}
          {this.ViewRoom()}
          <DatePicker
              style={{width: 370, paddingTop: 20, borderRadius: 5}}
              date={this.state.fromdate}
              mode="date"
              placeholder="select Joining date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'relative',
                  right: 0,
                  top: 0,
                  marginRight: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },
              }}
              onDateChange={date => {
                this.setState({fromdate: date});
              }}
            />
          </View>
          <View
          style={{
            justifyContent: 'center',
            height: 100,
            padding: 20,
            flex:1,
            flexDirection:'row',
          }}> 
         <TouchableOpacity
          style={styles.buttoni}
          onPress={() => {
            this.deny();
          }}>
          <Icon2
            name="cancel"
            style={styles.searchIcon}
            size={25}
            color="white"
          />
          <Text style={styles.textdesign}>Deny request</Text>
        </TouchableOpacity>
        <Text>{'     '}</Text>
          <TouchableOpacity
            style={styles.buttoni}
            onPress={() => {
              this.allocate();
            }}>
            <Icon2
              name="group-add"
              style={styles.searchIcon}
              size={30}
              color="white"
            />
            <Text style={styles.textdesign}>Allocate</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        <View style={styles.modelContainer}>
            <Modal
              animationType={'slide'}
              visible={this.state.comp} 
              presentationStyle={'fullScreen'}
              fullScreen={true}
              >
              <View style={styles.modal}>
                <Icon2
                  name="error"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={styles.text}>Stayer Added successfully!</Text>
              
              </View>
            </Modal>
          </View>
        <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.isVisible}>
              <View style={styles.modal}>
                <Icon2
                  name="error"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={styles.text}>{this.state.error}</Text>
              </View>
            </Modal>
          </View>
          
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  images: {
    width: 140,
    height: 130,
    marginHorizontal: 3,
    borderRadius: 70,
    marginRight: 50,
  },
  modelContainer: {
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
    marginLeft: 40,
    marginBottom:'100%',
  },
  text: {
    color: 'white',
    marginTop: 20,
    fontSize: 25,
  },
  touchop: {
    padding: 10,
    height: 50,
    width: 100,
    marginTop: 30,
    backgroundColor: '#5353c6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textdesign: {
    color: 'white',
    fontSize: 18,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 30,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
  },
  pickerStyle: {
    height: 30,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
});
