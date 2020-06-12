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
  Image,
  ActivityIndicator
} from 'react-native';
import {decode, encode} from 'base-64';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Entypo';
import {Button} from './../../components/Button';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';
import { set } from 'react-native-reanimated';
var data;
export class ProfileScreen extends Component {
  static navigationOptions=({navigation}) => {
    return{
    title:"                Profile",
    headerRight: (  
        <Icon3
            style={{ paddingRight: 10 }}  
            onPress={() => navigation.navigate('Notification')}  
            name="notification"  
            size={30}  
        /> 
    ) 
    }
   };
   constructor(props) {
    super(props);
    data = this.props.navigation.getParam('UserEmail', undefined);
    {
      this.getData();
    }
  }
  state = {
    isVisible: false,
    email:'',
    myView:'',
    FirstName: '',
    LastName: '',
    MobileNo: null,
    Address: '',
    FirstNamecol: true,
    LastNamecol: true,
    MobileNocol: true,
    Addresscol: true,
    UserId:'',
    FirstNameValid: false,
    LastNameValid: false,
    MobileNoValid: false,
    Pgid:'',
    AddressValid: false,
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
    activity:true,
  };
  getData = async () => {
    var CompanyName, CompanyAddress, SchoolName;
    try {
     const UserID = await AsyncStorage.getItem('UserId');
     const LastName=await AsyncStorage.getItem('LastName');
     const FirstName=await AsyncStorage.getItem('FirstName');
     const Address=await AsyncStorage.getItem('Address');
     const email=await AsyncStorage.getItem('email');
     const Gender=await AsyncStorage.getItem('Gender');
     const Occupation=await AsyncStorage.getItem('Occupation');
     const MobileNo=await AsyncStorage.getItem('MobileNo');
     
     if(Occupation=='Jober')
     {
        CompanyName=await AsyncStorage.getItem('CompanyName');
       CompanyAddress=await AsyncStorage.getItem('CompanyAddress');
     }else{
       SchoolName=await AsyncStorage.getItem('SchoolName');
     
     }
      if (UserID !== null) {
        
        data=email;
        this.setState({
          UserId:UserID,
          FirstName: FirstName,
          LastName: LastName,
          Address:Address,
          Gender:Gender,
          email:email,
          Occupation:Occupation,
          MobileNo:MobileNo
        });
        if(Occupation=='Jober')
        {
          this.JchangeCol()
          this.setState({
          OccupationCom:CompanyName,
          OccupationAdd:CompanyAddress,
          })
        }else{
          this.SchangeCol()
          this.setState({ 
            SchoolName:SchoolName
          })
        }

        if(Gender=='Male')
      {
        this.MchangeCol()
      }else{
        this.FchangeCol()
      }
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
      isVisible: false,
    email:'',
    myView:'',
    FirstName: '',
    LastName: '',
    MobileNo: null,
    Address: '',
    FirstNamecol: true,
    LastNamecol: true,
    MobileNocol: true,
    Addresscol: true,
    UserId:'',
    FirstNameValid: false,
    LastNameValid: false,
    MobileNoValid: false,
    Pgid:'',
    AddressValid: false,
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
    activity:true,

    })
    this.getData()
    this.setState({
      activity:true
    })
      setTimeout(() => {
        this.initialData()
      }, 2000);
  });
 
}
componentWillUnmount(){
  // Remove the event listener   
  this.focusListener.remove();
  }
  initialData=()=>{
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByChild('email').equalTo(this.state.email);
    query.once('value', snapshot => {
      if(snapshot.exists()){
      newPost = snapshot.val();
      const keys = Object.keys(newPost);
      for (let d of keys) {
        console.warn(newPost[d].email);
        this.setState({ fileData:newPost[d].userPic,fileKyc:newPost[d].aadharPic});
      }
      this.setState({
        activity:false
      })
    }
    });
  }
  renderFileKyc() {
    if (this.state.fileKyc) {
      return (
        <Image
          source={{uri: this.state.fileKyc}}
          style={styles.imageskyc}
        />
      );
    } else {
      return (
        <Image
          source={require('./../../images/aadhar.jpg')}
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
          source={{uri:this.state.fileData}}
          style={styles.images}
        />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={()=>{this.chooseImage()}}>
        <Image
          source={require('./../../images/adduser.jpg')}
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
 
  AddDetails = () => {
   var message = 'data:text/plain;base64,' + this.state.fileData;
   var message2 = 'data:text/plain;base64,' + this.state.fileKyc;
    var key;
    if (
      this.FirstNameValidate()&&
      this.LastNameValidate() &&
      this.MobileNoValidate()&&
      this.AddressValidate()
    ) {
      if(this.state.occupation=='Jober'){
        if( this. OccupationValidate())
        {
          var UserData = {
            userPic:message,
            aadharPic:message2,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            MobileNo: this.state.MobileNo,
            Gender: this.state.Gender,
            Address:this.state.Address,
            Occupation:this.state.occupation,
            CompanyName:this.state.OccupationCom,
            CompanyAddress:this.state.OccupationAdd, 
          };
         
          var updates = {};
          updates['/User/' + UserId] = UserData;
          firebase.database().ref().update(updates);
        }
      }else{
        if(this.SchoolValidate())
        {
          var UserData = {
            userPic:this.state.fileData,
            aadharPic:this.state.fileKyc,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            MobileNo: this.state.MobileNo,
            Gender: this.state.Gender,
            Address:this.state.Address,
            Occupation:this.state.occupation,
            SchoolName:this.state.SchoolName, 
          };
          var updates = {};
          updates['/User/' +UserId] = UserData;
          firebase.database().ref().update(updates);
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
            value={this.state.OccupationCom}
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
            value={this.state.OccupationAdd}
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
            value={this.state.SchoolName}
            onBlur={() => this.SchoolValidate()}
          />
        </View>
      </View>
      )

    }
  }
 
  render() {
     data = this.props.navigation.getParam('UserEmail', undefined);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
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
                    value={this.state.FirstName}
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
                    value={this.state.LastName}
                  />
                </View>
              </View>
              <View
                style={{
                  padding: 20,flex: 1,
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
                    value={this.state.MobileNo}
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
                    onPress={() => this.SchangeCol()}
                    >
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
                    value={this.state.Address}
                  />
                </View>
              </View>
             
              <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              {this.renderFileKyc()}
                  <Text onPress={()=>{this.chooseKyc()}}>+ Add Aadhar Photo</Text>
              </View>
              <Button
                onPress={() =>{
                 this.AddDetails()
                }}>
                Update
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
