import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Picker,
} from 'react-native';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

export class AddPollScreen extends Component {
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
    Question: '',
    textInput: [],
    inputData: [],
    only2: 0,
    AddFlag: false,
    option1: '',
    option2: '',
    option3: 'NONE',
    option4: 'NONE',
    isVisible: false,
    error: '',
    option1Valid: false,
    option2Valid: false,
    QuestionValid: false,
    PgId:'',
    added:false,
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
    {this.getUserId()}
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
    }, 2000);
 
    
      
  }
  QValidate = () => {
    const reg = /^[a-zA-Z ]+$/;
    if (reg.test(this.state.Question) === false) {
      this.setState({
        QuestionValid: false,
        Question: '',
        isVisible: true,
        error: 'Please Fill Question !!!',
      });
      return this.state.QuestionValid;
    } else {
      this.setState({
        QuestionValid: true,
      });
      return this.state.QuestionValid;
    }
  };
  option1Validate = () => {
    const reg = /^[a-zA-Z ]+$/;
    if (reg.test(this.state.option1) === false) {
      this.setState({
        option1Valid: false,
        option1: '',
        isVisible: true,
        error: 'Atleast 2 options required !!!',
      });
      return this.state.option1Valid;
    } else {
      this.setState({
        option1Valid: true,
      });
      return this.state.option1Valid;
    }
  };
  option2Validate = () => {
    const reg = /^[a-zA-Z ]+$/;
    if (reg.test(this.state.option2) === false) {
      this.setState({
        option2Valid: false,
        option2: '',
        isVisible: true,
        error: 'Atleast 2 options required !!!',
      });
      return this.state.option2Valid;
    } else {
      this.setState({
        option2Valid: true,
      });
      return this.state.option2Valid;
    }
  };
  addTextInput = index => {
    let textInput = this.state.textInput;
    textInput.push(
      <View style={{flex: 1, flexDirection: 'row'}}>
        <TextInput
          style={styles.Input2}
          placeholder="options"
          onChangeText={text => this.addValues(text,index)}
        />
        <TouchableOpacity
          style={{
            width: 35,
            height: 40,
            backgroundColor: 'red',
            marginTop: 10,
            marginLeft: 3,
            borderRadius: 3,
          }}
          onPress={() => this.removeTextInput()}>
          <Icon
            name="delete-empty"
            style={styles.searchIcon}
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>,
    );
    this.setState({textInput});
    this.setState({
      only2: parseInt(this.state.only2) + 1,
    });
    if (this.state.only2 >=1) {
      this.setState({AddFlag: true});
    }
  };
  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({textInput, inputData});
    this.setState({
      only2: parseInt(this.state.only2) - 1,
    });
    if (this.state.only2 <= 2) {
      this.setState({AddFlag: false});
    } else {
      this.setState({AddFlag: true});
    }
  };
  
  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach(element => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({text: text, index: index});
      this.setState({
        inputData: dataArray,
      });
    }
  };
  addpoll = () => {
    if (this.QValidate()) {
      if (this.option1Validate()) {
        if (this.option2Validate()) {
          this.state.inputData.map((item,key)=>{
            if(key==0){
              this.setState({option3:item.text})
            }else{
              this.setState({option4:item.text})
            }
          });
          var updates={};
          setTimeout(() => {    
          updates['/PG/' + this.state.PgId+'/'+'poll'+'/'+this.state.Question+'/option1'] = this.state.option1;
          updates['/PG/' + this.state.PgId+'/'+'poll'+'/'+this.state.Question+'/option1Value'] = 0;
          updates['/PG/' + this.state.PgId+'/'+'poll'+'/'+this.state.Question+'/option2'] = this.state.option2;
          updates['/PG/' + this.state.PgId+'/'+'poll'+'/'+this.state.Question+'/option2Value'] = 0;
          updates['/PG/' + this.state.PgId+'/'+'poll'+'/'+this.state.Question+'/option3'] = this.state.option3;
          updates['/PG/' + this.state.PgId+'/'+'poll'+'/'+this.state.Question+'/option3Value'] =0;
          updates['/PG/' + this.state.PgId+'/'+'poll'+'/'+this.state.Question+'/option4'] =this.state.option4;
          updates['/PG/' + this.state.PgId+'/'+'poll'+'/'+this.state.Question+'/option4Value'] =0; 
          updates['/PG/' + this.state.PgId+'/'+'poll'+'/'+this.state.Question+'/votes'] =0; 
          this.state.UserIds.map(item=>{
            updates['/User/'+item+'/'+'Poll/'+this.state.Question]=false;
          }) 
          firebase.database().ref().update(updates);
          },500);
          this.setState({
            added:true
          })
          setTimeout(() => {
            this.setState({
              added:false
            })
            this.props.navigation.navigate('PollScreen');            
          }, 2000);
        }
      }
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
              <View
                style={{
                  height: 100,
                  width: '100%',
                  padding: 10,
                  backgroundColor: '#e4e9f2',
                  marginTop: 10,
                }}>
                <Text style={{marginLeft: 15, fontSize: 18}}>Question</Text>
                <TextInput 
                  autoCorrect={false}
                  placeholder="Ex.What would you take in dinner?"
                  style={styles.Input}
                  onChangeText={Question => {
                    this.setState({Question});
                  }}
                />
              </View>
              <View
                style={{
                  height: 300,
                  width: '100%',
                  padding: 10,
                  backgroundColor: '#e4e9f2',
                  marginTop: 10,
                }}>
                <Text style={{marginLeft: 15, fontSize: 18}}>Options</Text>
                <TextInput
                  autoCorrect={false}
                  placeholder="option 1"
                  style={styles.Input}
                  onChangeText={option1 => {
                    this.setState({option1});
                  }}
                />
                <TextInput
                  autoCorrect={false}
                  placeholder="option 2"
                  style={styles.Input}
                  onChangeText={option2 => {
                    this.setState({option2});
                  }}
                />
                {this.state.textInput.map(value => {
                  return value;
                })}
                <View style={{margin: 10}}>
                  <Button
                    disabled={this.state.AddFlag}
                    title="Add Option"
                    onPress={() =>
                      this.addTextInput(this.state.textInput.length)
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  padding: 20,
                }}>
                <TouchableOpacity
                  style={styles.buttoni}
                  onPress={() => {
                    this.addpoll();
                  }}>
                  <Icon
                    name="plus"
                    style={styles.searchIcon}
                    size={40}
                    color="white"
                  />
                  <Text style={styles.textdesign}>Add Poll</Text>
                </TouchableOpacity>
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
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        height: 50,
                        marginBottom: 50,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({isVisible: !this.state.isVisible});
                        }}
                        style={styles.touchop}>
                        <Text style={styles.textdesign}>cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
              <View style={styles.modelContainer}>
          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.added}>
            <View style={styles.modal}>
              <Icon2
                name="check-circle"
                style={{paddingTop: 25}}
                size={50}
                color="white"
              />
              <Text style={styles.text}>SuccessFully Added !</Text>
            </View>
          </Modal>
        </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  Input: {
    marginTop: 10,
    marginLeft: 15,
    color: '#333',
    fontSize: 18,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
  },
  Input2: {
    marginTop: 10,
    marginLeft: 15,
    color: '#333',
    fontSize: 18,
    width: '80%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
  },
  searchIcon: {
    paddingTop: 5,
    marginLeft: 4,
  },
  container: {
    flex: 1,
  },
  scrollView: {},
  textdesign: {
    color: 'white',
    fontSize: 18,
  },
  buttoni: {
    height: 60,
    width: 100,
    flex: 1,
    backgroundColor: '#177ce3',
    borderWidth: 0,
    borderRadius: 0,
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
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
});
