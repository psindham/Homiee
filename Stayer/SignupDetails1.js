window.addEventListener = x => x;
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Picker,
  Modal,
  Image
} from 'react-native';
import {decode, encode} from 'base-64';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {Button} from '../components/Button';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import {Services} from './../Services';

let data;
export class SignupDetails1 extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    isVisible: false,
    myView:'',
    PgCity:'',
    email: '',
    FirstName: '',
    LastName: '',
    MobileNo: null,
    Address: '',
    PgType: "--Select PgType--",
    PgName: '',
    FirstNamecol: true,
    LastNamecol: true,
    MobileNocol: true,
    Addresscol: true,
    PgTypecol: true,
    PgNamecol: true,
    Citycol: true,
    FirstNameValid: false,
    LastNameValid: false,
    MobileNoValid: false,
    Pgid:'',
    AddressValid: false,
    PgTypeValid: false,
    PgNameValid: false,
    mcol: true,
    fcol: false,
    Jcol: true,
    Scol: false,
    Gender: 'Male',
    occupation:'Jober',
    SchoolName:'',
    SchoolValid:false,
    SchoolCol:true,
    OccupationCom:'',
    OccupationCol:true,
    OccupationValid:false,
    OccupationAdd:'',
    error:'',
    filePath:'',
    fileData:'',
    fileUri:'',
    fileKyc:'',
    filekycPath:'',
    filekycUri:'',
  };
  componentDidMount() {
    // <Services/>
    var firebaseConfig = {
      apiKey: "AIzaSyCJkLnfyglXnAe64Y93kSjRz4dOhSxgbWk",
      authDomain: "homiee-afbd4.firebaseapp.com",
      databaseURL: "https://homiee-afbd4.firebaseio.com",
      projectId: "homiee-afbd4",
      storageBucket: "homiee-afbd4.appspot.com",
      messagingSenderId: "373427940224",
      appId: "1:373427940224:web:8657c1451f527312166f65",
      measurementId: "G-1ZFQHHFVYB"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  renderFileKyc() {
    if (this.state.fileKyc) {
      return (
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileKyc}}
          style={styles.imageskyc}
        />
      );
    } else {
      return (
        <Image
          source={require('./../images/aadhar.jpg')}
          style={styles.imageskyc}
        />
      );
    }
  }
  renderFileData() {
    if (this.state.fileData) {
      return (
        <TouchableOpacity onPress={()=>{this.chooseImage()}}>
        <Image
          source={{uri: 'data:image/jpeg;base64,' + this.state.fileData}}
          style={styles.images}
        />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={()=>{this.chooseImage()}}>
        <Image
          source={require('./../images/adduser.jpg')}
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
  chooseKyc = () => {
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
          filekycPath: response,
          fileKyc: response.data,
          filekycUri: response.uri,
        });
      }
    });
  };
  MchangeCol = () => {
    this.setState({
      mcol: true,
      fcol: false,
      Gender: 'Male',
    });
  };
  FchangeCol = () => {
    this.setState({
      mcol: false,
      fcol: true,
      Gender: 'Female',
    });
  };
  JchangeCol = () => {
    this.setState({
      Jcol: true,
      Scol: false,
      occupation:'Jober',
    });
  };
  SchangeCol = () => {
    this.setState({
      Jcol: false,
      Scol: true,
      occupation:'Student',
    });
  };
  FirstNameValidate = () => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(this.state.FirstName) === false) {
      this.setState({
        FirstNameValid: false,
        FirstName: '',
        FirstNamecol: false,
      });
      return this.state.FirstNameValid;
    } else {
      this.setState({
        FirstNameValid: true,
        FirstNamecol: true,
      });
      return this.state.FirstNameValid;
    }
   
  };
  SchoolValidate = () => {
    const reg = /^[a-zA-Z ]+$/;
    if (reg.test(this.state.SchoolName) === false) {
      this.setState({
        SchoolValid: false,
        SchoolName: '',
        SchoolCol: false,
      });
      return this.state.SchoolValid;
    } else {
      this.setState({
        SchoolValid: true,
        Schoolcol: true,
      });
      return this.state.SchoolValid;
    }
   
  };
  OccupationValidate = () => {
    const reg = /^[a-zA-Z ]+$/;
    if (reg.test(this.state.OccupationCom) === false) {
      this.setState({
        OccupationValid: false,
        OccupationCom: '',
        OccupationCol: false,
      });
      return this.state.OccupationValid;
    } else {
      this.setState({
        OccupationValid: true,
        Occupationcol: true,
      });
      return this.state.OccupationValid;
    }
   
  };
  LastNameValidate = () => {
    const reg = /^[a-zA-Z]+$/;
    if (reg.test(this.state.LastName) === false) {
      this.setState({
        LastNameValid: false,
        LastName: '',
        LastNamecol: false,
      });
      return this.state.LastNameValid;
    } else {
      this.setState({
        LastNameValid: true,
        LastNamecol: true,
      });
      return this.state.LastNameValid;
    }
    
  };
  MobileNoValidate = () => {
    const reg = /^[0]?[789]\d{9}$/;
    if (reg.test(this.state.MobileNo) === false) {
      this.setState({
        MobileNoValid: false,
        MobileNo: '',
        MobileNocol: false,
      });
      return this.state.MobileNoValid;
    } else {
      this.setState({
        MobileNoValid: true,
        MobileNocol: true,
      });
      return this.state.MobileNoValid;
    }
    
  };
 
  AddressValidate = () => {
    if (this.state.Address === '') {
      this.setState({
        AddressValid: false,
        Address:'',
        Addresscol: false,
      });
      return this.state.AddressValid;
    } else {
      this.setState({
        AddressValid: true,
        Addresscol: true,
      });
      return this.state.AddressValid;
    }
    
  };

  validateField = () => {
    this.FirstNameValidate();
    this.LastNameValidate();
    this.MobileNoValidate();
    this.AddressValidate();
  };
  navigateToPG=()=>{
    if(this.state.PgType=="--Select PgType--"){
      this.setState({isVisible:true,error:'Please Select PG Type '});
    }else{
      this.props.navigation.navigate('SelectPg',{pgType:this.state.PgType,})
    }
  }
  AddDetails = () => {
   // this.validateField();
   var message = 'data:text/plain;base64,' + this.state.fileData;
   var message2 = 'data:text/plain;base64,' + this.state.fileKyc;
    var key;
    if (
      this.FirstNameValidate()&&
      this.LastNameValidate() &&
      this.MobileNoValidate()&&
      this.AddressValidate()&&
      this.state.PgName!=''
    ) {
      if(this.state.occupation=='Jober'){
        if( this. OccupationValidate())
        {
          var UserData = {
            userPic:message,
            aadharPic:message2,
            email: this.state.email,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            MobileNo: this.state.MobileNo,
            Gender: this.state.Gender,
            Address:this.state.Address,
            Occupation:this.state.occupation,
            CompanyName:this.state.OccupationCom,
            CompanyAddress:this.state.OccupationAdd, 
            PgId:'',
            room:'',
            floor:'',
          };
          var newUserKey = firebase.database().ref().child('User').push().key;
          var updates = {};
          updates['/User/' + newUserKey] = UserData;
          firebase.database().ref().update(updates);
          var postsRef = firebase.database().ref('RequestPG');
          postsRef.push().set({
            PgId:this.state.Pgid,
            UserId:newUserKey,
            RequestStatus:false,
            UserName:this.state.FirstName,
            allocated:false,
            date:new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear(),
          });
           this.props.navigation.navigate('HomePage',{'UserEmail':data});
        
        }
      }else{
        if(this.SchoolValidate())
        {
          
          var UserData = {
            userPic:message,
            aadharPic:message2,
            email: this.state.email,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            MobileNo: this.state.MobileNo,
            Gender: this.state.Gender,
            Address:this.state.Address,
            Occupation:this.state.occupation,
            SchoolName:this.state.SchoolName, 
            PgId:''
          };
          var newUserKey = firebase.database().ref().child('User').push().key;
          var updates = {};
          updates['/User/' + newUserKey] = UserData;
          firebase.database().ref().update(updates);
          var postsRef = firebase.database().ref('RequestPG');
          postsRef.push().set({
            PgId:this.state.Pgid,
            UserId:newUserKey,
            RequestStatus:false,
            UserName:this.state.FirstName,
            allocated:false,
            date:new Date().getDate()+'-'+new Date().getMonth()+'-'+new Date().getFullYear(),
          });
          this.props.navigation.navigate('HomePage',{'UserEmail':data});
        }
      }
        
      }
     
  };
 
  mapView=()=>{
    if(this.state.occupation=='Jober')
    {
      return(
        <View>
        <View
        style={{
          padding: 20,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View
          style={
            this.state.OccupationCol
              ? styles.searchSection
              : styles.searchedSection
          }>
          <Icon
            style={styles.searchIcon}
            name="id-card-alt"
            size={20}
            color="#000"
          />
          <TextInput
            style={styles.input}
            placeholder="occupation(Company)"
            onChangeText={OccupationCom => {
              this.setState({OccupationCom});
            }}
            onBlur={() => this.OccupationValidate()}
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
        <View
          style={
            styles.searchSection
          }>
          <Icon3
            style={styles.searchIcon}
            name="address"
            size={20}
            color="#000"
          />

          <TextInput
            style={styles.input}
            placeholder="occupation(Adrreess)opt."
            onChangeText={OccupationAdd => {
              this.setState({OccupationAdd});
            }}
          />
        </View>
      </View>
      </View>
      )
    }else{
      return(
        <View
        style={{
          padding: 20,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View
          style={
            this.state.SchoolCol
              ? styles.searchSection
              : styles.searchedSection
          }>
          <Icon
            style={styles.searchIcon}
            name="school"
            size={20}
            color="#000"
          />

          <TextInput
            style={styles.input}
            placeholder="School/Colleage"
            onChangeText={SchoolName => {
              this.setState({SchoolName});
            }}
            onBlur={() => this.SchoolValidate()}
          />
        </View>
      </View>
      )

    }
  }
  pgDetailsView=()=>{
    if(this.state.PgName!=''){
    return(
      <View
      style={{
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <View
        style={
            styles.searchSection
        }>
        <Icon2
          style={styles.searchIcon}
          name="office-building"
          size={20}
          color="#000"
        />

      <Text>{this.state.PgName},{this.state.PgCity}</Text>
      </View>
    </View>
    )
   }
  }
  render() {
     data = this.props.navigation.getParam('UserEmail', undefined);
    let pgid=this.props.navigation.getParam('pgid', undefined)
    let pgcity=this.props.navigation.getParam('pgcity', undefined)
    let pgname=this.props.navigation.getParam('pgname','')
   setTimeout(() => {
    this.setState({
        Pgid:pgid,
        PgName:pgname,
        PgCity:pgcity
    })
    {this.pgDetailsView()}
   }, 1000); 
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{marginBottom: 60}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingTop: 25,
              paddingLeft: 20,
              alignItems: 'center',
              marginBottom: 20,
              marginTop: 10,
            }}>
            <Icon1 name="adduser" style={styles.actionButtonIcon} />
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {' '}
              Add Your Details{' '}
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
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
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
              
                  {this.renderFileData()}
              </View>
                 
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={
                    this.state.FirstNamecol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon
                    style={styles.searchIcon}
                    name="user-alt"
                    size={20}
                    color="#000"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={FirstName => {
                      this.setState({FirstName});
                      this.setState({email: data});
                    }}
                    onBlur={() => this.FirstNameValidate()}
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
                <View
                  style={
                    this.state.LastNamecol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon
                    style={styles.searchIcon}
                    name="user-alt"
                    size={20}
                    color="#000"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={LastName => {
                      this.setState({LastName});
                    }}
                    onBlur={() => this.LastNameValidate()}
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
                  <Icon2
                    style={styles.searchIcon}
                    name="email"
                    size={20}
                    color="#000"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={email => {
                      this.setState({email});
                    }}
                    value={data}
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
                <View
                  style={
                    this.state.MobileNocol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon
                    style={styles.searchIcon}
                    name="mobile-alt"
                    size={20}
                    color="#000"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Mobile Number"
                    onChangeText={MobileNo => {
                      this.setState({MobileNo});
                    }}
                    keyboardType="phone-pad"
                    onBlur={() => this.MobileNoValidate()}
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
                  <TouchableOpacity
                    style={styles.button1}
                    onPress={() => this.MchangeCol()}>
                    <Icon2
                      style={styles.searchIcon}
                      name="human-male"
                      size={30}
                      color={this.state.mcol ? 'black' : 'grey'}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color: this.state.mcol ? 'black' : 'grey',
                      }}>
                      {' '}
                      Male
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => this.FchangeCol()}>
                    <Icon2
                      style={styles.searchIcon}
                      name="human-male"
                      size={30}
                      color={this.state.fcol ? 'black' : 'grey'}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        color: this.state.fcol ? 'black' : 'grey',
                      }}>
                      Female
                    </Text>
                  </TouchableOpacity>
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
                  <TouchableOpacity
                    style={styles.button1}
                    onPress={() => this.JchangeCol()}>
                    <Icon2
                      style={styles.searchIcon}
                      name="worker"
                      size={30}
                      color={this.state.Jcol ? 'black' : 'grey'}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        color: this.state.Jcol ? 'black' : 'grey',
                      }}>
                      {' '}
                      Jober
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => this.SchangeCol()}>
                    <Icon
                      style={styles.searchIcon}
                      name="book-reader"
                      size={30}
                      color={this.state.Scol ? 'black' : 'grey'}
                    />
                    <Text
                      style={{
                        fontSize: 15,
                        color: this.state.Scol ? 'black' : 'grey',
                      }}>
                      Student
                    </Text>
                  </TouchableOpacity>
                </View>
               {/* {this.state.occupation=='Jober'?  */}
               {this.mapView()}
              </View>
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={
                    this.state.Addresscol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon3
                    style={styles.searchIcon}
                    name="address"
                    size={20}
                    color="#000"
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Address"
                    onChangeText={Address => {
                      this.setState({Address});
                    }}
                    onBlur={() => this.AddressValidate()}
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
                <View
                  style={
                    this.state.PgTypecol
                      ? styles.searchSection
                      : styles.searchedSection
                  }>
                  <Icon2
                    style={styles.searchIcon}
                    name="format-list-bulleted"
                    size={20}
                    color="#000"
                  />
                  <Picker
                    style={styles.pickerStyle}
                    selectedValue={this.state.PgType}
                    onValueChange={itemValue =>
                      this.setState({
                        PgType: itemValue,
                      })
                    }>
                    <Picker.Item label="--Select PgType--" value="--Select PgType--" />
                    <Picker.Item label="Men" value="Men" />
                    <Picker.Item label="Women" value="Women" />
                    <Picker.Item label="Students" value="Students" />
                  </Picker>
                </View>
              </View>
              {this.pgDetailsView()}
              <View
                style={{
                  padding: 20,
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  style={ styles.searchSection}
                  onPress={()=>{
                   this.navigateToPG()
                  }}
                  >
                  <Icon3
                    style={styles.searchIcon}
                    name="location"
                    size={20}
                    color="#000"
                  />
                  <Text>{this.state.PgName==''?'Select PG':'Change PG'}</Text>
                 
                </TouchableOpacity>
              </View>
              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              {this.renderFileKyc()}
                  <Text onPress={()=>{this.chooseKyc()}}>+ Add Aadhar Photo</Text>
              </View>
              <Button
                onPress={() =>{
                   this.AddDetails()
                 // this.props.navigation.navigate('HomePage',{'UserEmail':data})
                }}>
                Register
              </Button>
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
                        <Text style={{fontSize:18,color:'white'}}>cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 25,
    paddingLeft: 20,
    alignItems: 'center',
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
  actionButtonIcon: {
    fontSize: 30,
    color: 'black',
  },
  pickerStyle: {
    height: 30,
    width: '80%',
    color: '#344953',
    justifyContent: 'center',
  },
  button1: {
    backgroundColor: 'white',
    width: 90,
    paddingLeft: 5,
    height: 90,
    borderRadius: 10,
    marginLeft: 30,
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: 'white',
    width: 90,
    paddingLeft: 5,
    height: 90,
    borderRadius: 10,
    marginRight: 25,
    justifyContent: 'center',
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
  images: {
    width: 140,
    height: 130,
    marginHorizontal: 3,
    marginTop: 10,
    marginLeft: 20,
    borderRadius:70,
    marginRight:50,
  },
  imageskyc: {
    width: 100,
    height: 100,
    marginHorizontal: 3,
    marginTop: 10,
    marginLeft: 20,
    marginRight:50,
  },
});
