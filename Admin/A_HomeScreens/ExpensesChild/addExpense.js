import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Picker,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-datepicker';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import * as firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';
import {Button} from './../../../components/Button.js';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../../Services';
const options = {
  title: 'Select Image',
  customButtons: [
    {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export class addExpense extends Component {
  static navigationOptions = {
    title: '                 AddExpenses',
  };

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
  componentDidMount() {
    <Services/>
    const {navigation}=this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
        this.getData()
    });
   
  }
  componentWillUnmount(){
    // Remove the event listener
    this.focusListener.remove();
  }
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
      date: '',
      amount: 0,
      comments: '',
      status: 'false',
      title: '',
      isVisible: false,
      error: '',
      PgId:'',
      added:false,
    };
    {this.getData()}
  }
  uploadData = () => {
    var message = 'data:text/plain;base64,' + this.state.fileData;
    if (this.state.title != '') {
      if(this.state.amount !=0){
        if(this.state.date !=''){
      setTimeout(() => {
        var postData = {
          title: this.state.title,
          amount: this.state.amount,
          date: this.state.date,
          status: this.state.status,
          pic: message,
        };
        var updates = {};
        var id = '-M6YIRfep3uFjaEv4fzL';
        var newKey = firebase
          .database()
          .ref()
          .child('PG')
          .push().key;
        updates['/PG/' + this.state.PgId + '/' + 'Expenses/' + newKey] = postData;
        firebase
          .database()
          .ref()
          .update(updates);
      }, 1000);
      this.setState({
        added:true,
      })
      setTimeout(() => {
        this.setState({
          added:false,
        })
        this.props.navigation.navigate('View')
      }, 2000);
    }else{
      this.setState({isVisible:true,error:'Select Date first'});
    }
    }else{
      this.setState({isVisible:true,error:'Enter Amount'});
    }
    }else{
      this.setState({isVisible:true,error:'Enter Title...'});
    }
  };

  renderFileData() {
    if (this.state.fileData) {
      return (
        <TouchableOpacity
        onPress={this.chooseImage}
        >
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
      </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
                onPress={this.chooseImage}
                >
        <Image
          source={require('./../../../images/addPic.jpg')}
          style={styles.images}
        />
        </TouchableOpacity>
        
      );
    }
  }
  chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <ScrollView>
            <View style={{justifyContent: 'center'}}>
              <TextInput
                onChangeText={title => {
                  this.setState({title});
                }}
                style={styles.input}
                placeholder="Title"
              />
              <TextInput
                onChangeText={amount => {
                  this.setState({amount});
                }}
                style={styles.input}
                keyboardType={'numeric'}
                placeholder="Amount"
              />
            </View>
            <DatePicker
              style={{width: 370, paddingTop: 20,borderRadius:5}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
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
                this.setState({date: date});
              }}
            />
            <Picker
              style={styles.pickerStyle}
              selectedValue={this.state.status}
              onValueChange={itemValue =>
                this.setState({
                  status: itemValue,
                })
              }>
              <Picker.Item label="--Select Status--" value="status" />
              <Picker.Item label="Paid" value ="true" />
              <Picker.Item label="UnPaid" value="false" />
            </Picker>
            <View>
              <View>{this.renderFileData()}</View>
              <View style={{padding: 20}}>
                <Button
                  onPress={() => {
                    this.uploadData();
                  }}>
                  Upload
                </Button>
              </View>
            </View>
          </ScrollView>
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
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    height: 50,
    borderRadius: 15,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    marginTop: 20,
    marginLeft: 35,
    color: '#333',
    fontSize: 18,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    padding: 5,
    height: 50,
  },
  actionButtonIcon: {
    fontSize: 30,
    color: 'black',
  },
  Input: {
    paddingRight: 25,
    paddingLeft: 25,
    paddingBottom: 2,
    marginTop: 50,
    color: '#333',
    fontSize: 18,
    width: '100%',
  },
  pickerStyle: {
    marginLeft: 35,
    marginTop: 20,
    height: 50,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 250,
    height: 150,
    // borderColor: 'black',
    // borderWidth: 1,
    marginHorizontal: 3,
    marginTop: 10,
    marginLeft: 80,
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10,
  },    
  btnSection: {
    width: 150,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginTop: 10,
    marginLeft: 130,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
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
