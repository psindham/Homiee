import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Picker,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import * as firebase from 'firebase';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import {Services} from './../../../Services';
import AsyncStorage from '@react-native-community/async-storage';

export class AddComplaint extends Component {
  state = {
    email: '',
    Title: '',
    Description: '',
    regarding:null,
    FileData: '',
    PgId:'',
    UserId:'',
    isVisible:false,
    error:'',
    added:false,
  };
  componentDidMount(){
      <Services/>
      {this.getData()}
  }
  getData = async () => {
    try {
      const pgid = await AsyncStorage.getItem('PgId');
      const userid = await AsyncStorage.getItem('UserId');
      if (userid !== null) {
        this.setState({
          PgId: pgid,
          UserId:userid,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };
  addComp = () => {
    const reg = /^[a-zA-Z]+$/;
    if(reg.test(this.state.Title) === true){
        if(reg.test(this.state.Description) === true){
            if(this.state.regarding !=null){
    var Data={
        'UserId':this.state.UserId,
        'PgId':this.state.PgId, 
        'Title':this.state.Title,
        'Description':this.state.Description,
        'FileData':'data:text/plain;base64,'+this.state.FileData,
        'date':new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear(),
        'category':this.state.regarding,
        'status':'Not Yet Assigned',
      }
      const db1 = firebase.database();
      var newKey = db1.ref().child('Complaints').push().key;
      var updates = {};
      updates['/Complaints/' + newKey ] =Data;
      firebase
        .database()
        .ref()
        .update(updates);
        this.setState({
            added:true
        })
        setTimeout(() => {
            this.props.navigation.navigate('Complaint');
        }, 2000);
    }else{
        this.setState({
            isVisible:!this.state.isVisible,
            error:'Please Select Regarding'
        })
    }
    }else{
        this.setState({
            isVisible:!this.state.isVisible,
            error:'Please Description Title '
        })
    }
    }else{
        this.setState({
            isVisible:!this.state.isVisible,
            error:'Please Enter Title '
        })
    }
  };
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
          FileData: response.data,
        });
      }
    });
  };
  displayImage = () => {
    if (this.state.FileData != '') {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' +this.state.FileData}}
          style={{width: undefined, height: 173}}
        />
      );
    } else {
        return(
      <Image
        source={require('./../../../images/addPic.jpg')}
        style={{width: undefined, height: 173}}
      />
        );
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
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
                <Icon4
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
          <View
            style={{
              padding: 10,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                padding: 20,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={styles.searchSection}>
                <Icon3
                  style={styles.searchIcon}
                  name="format-title"
                  size={20}
                  color="#000"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  onChangeText={Title => {
                    this.setState({Title});
                  }}
                />
              </View>
            </View>
            <View
              style={{
                padding: 20,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={styles.searchSection}>
                <Icon
                  style={styles.searchIcon}
                  name="audio-description"
                  size={20}
                  color="#000"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description"
                  onChangeText={Description => {
                    this.setState({Description});
                  }}
                />
              </View>
            </View>
            <View
              style={{
                padding: 20,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <View style={styles.searchSection}>
                <Picker
                  style={styles.pickerStyle}
                  selectedValue={this.state.regarding}
                  onValueChange={itemValue =>
                    this.setState({
                      regarding: itemValue,
                    })
                  }>
                  <Picker.Item label="--Select Regarding--" value="null" />
                  <Picker.Item label="HouseKeeping" value="HouseKeeping" />
                  <Picker.Item label="Laundry" value="Laundry" />
                  <Picker.Item label="Food" value="Food" />
                  <Picker.Item label="Electricity" value="Electricity" />
                </Picker>
              </View>
            </View>
            <TouchableOpacity
              style={{
                padding: 20,
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                this.chooseImage();
              }}
            >
                {this.displayImage()}
            </TouchableOpacity>
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
                    this.addComp();
                  }
                }}>
                <Icon2
                  name="plus"
                  style={styles.searchIcon}
                  size={40}
                  color="white"
                />
                <Text style={styles.textdesign}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  countContainer: {
    alignItems: 'center',
    padding: 10,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
  },
  searchedSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  pickerStyle: {
    height: 30,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
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
