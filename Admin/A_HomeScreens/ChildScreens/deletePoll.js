import React, { Component } from 'react';
import {Text,View,StyleSheet,TouchableOpacity,Modal} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Services} from './../../../Services';
import {Activityindicator} from './../../../components/Activityindicator';
import AsyncStorage from '@react-native-community/async-storage';
import Icon4 from 'react-native-vector-icons/MaterialIcons';

 export class deletePoll extends Component {  
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
            console.warn(value);
            this.setState({
              PgId: value,
            });
          }
        } catch (e) {
          console.warn(e);
        }
      };
      state = {
        UserIds:[],
        PgId:'',
        myView:[],
        activity:true,
        deleted:false,
        isVisible:false,
        deleteid:'',
     }
     componentDidMount()
     {
        <Services/>
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
            this.setState({
              activity:true
            })
            this.getData()
            setTimeout(() => {
                this.getUserId()
              this.initialData()
            }, 2000);
        
        });
       
     }
     getUserId=()=>{
        setTimeout(() => {
          let newPost;
          const db = firebase.database();
          const events = db.ref().child('User');
          var query=events.orderByChild('PgId').equalTo(this.state.PgId);
          query.once('value', snapshot => {
            if(snapshot.exists()){
            newPost = snapshot.val();
            const keys = Object.keys(newPost);
            for(let d of keys) {
             let UserIds=this.state.UserIds;
             UserIds.push(d);
             this.setState({  
              UserIds
             })
            }
            this.setState({
              activity:false
            })
          }
          });
        }, 1000); 
      }
  initialData=()=>{
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('PG');
    var query = events.orderByKey().equalTo(this.state.PgId);
    query.once('value', snapshot => {
      if(snapshot.exists()){  
      newPost = snapshot.val();
      const keys = Object.keys(newPost);
      for (let data of keys) {
        if(newPost[data].poll!=undefined){
         const polls = Object.keys(newPost[data].poll);
          for(let k of polls)
          {
            this.addData(k);
          }
          this.setState({
            activity:false
          })
        }else{
          this.setState({
            activity:true
          })
        }
      }
    }
    });
  }
delete=(k)=>{
           this.setState({isVisible: !this.state.isVisible});
            var updates = {};
         
            this.state.UserIds.map(item=>{
                firebase
                .database()
                .ref('/User/'+item+'/'+'Poll/'+k).remove();
              }) 
            firebase
              .database()
              .ref('/PG/' + this.state.PgId+'/'+'poll'+'/'+ k)
              .remove();
            this.setState({
              deleted: true,
            });
            setTimeout(() => {
              this.setState({
                deleted: false,
              });
              this.props.navigation.navigate('PollScreen');
            }, 2000);      
}
 
  addData=(k)=>{
    let myView = this.state.myView;
    myView.push(
      <View style={{flex: 1, flexDirection: 'row'}} key={k}>
        <View
          style={styles.Input2}
        ><Text>{k}</Text></View>
        <TouchableOpacity
          style={{
            width: 35,
            height: 50,
            backgroundColor: 'red',
            marginTop: 10,
            marginLeft: 3,
            borderRadius: 3,
          }}
          onPress={() => this.delete(k) 
           
         }>
          <Icon
            name="delete-empty"
            style={styles.searchIcon}
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
    this.setState({myView});
  };
  
    render() {
        if (this.state.activity) {
            return (
                <Activityindicator size="large" color="red" />
            );
          } else {  
        return (  
          <View style={{flex:1,flexDirection:'column'}}>
             
            {this.state.myView.map(item =>{
                return item;
            })}
              <View style={styles.modelContainer}>
            <Modal
              animationType={'fade'}
              transparent={true}
              visible={this.state.deleted}>
              <View style={styles.modal}>
                <Icon4
                  name="check-circle"
                  style={{paddingTop: 25}}
                  size={50}
                  color="white"
                />
                <Text style={styles.text}>SuccessFully Deleted !</Text>
              </View>
            </Modal>
          </View>
            </View>
        );
          }  
    }  
}

const styles= StyleSheet.create({

    Input2: {
        marginTop: 10,
        marginLeft: 15,
        color: '#333',
        fontSize: 18,
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        padding: 5,
      },
      searchIcon: {
        paddingTop: 5,
        marginLeft: 4,
      },
      textdesign: {
        color: 'white',
        fontSize: 18,
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
}) 