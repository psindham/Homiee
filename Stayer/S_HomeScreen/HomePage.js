import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import * as firebase from 'firebase';
import {
  DrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import {NotificationScreen} from './NotificationScreen';
import {ProfileScreen} from './ProfileScreen';
import {DashboardScreen} from './DashboardScreen';
import {PgScreen} from './PgScreen';
import {pgtest} from './pgtest';
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';
import {SelectPg} from './SelectPg';
import {ComplaintScreen} from './ComplaintScreen';
import {AddComplaint} from './Externalchilds/AddComplaint';
import {ViewComplaint} from './Externalchilds/ViewComplaint';
import {PollScreen} from './PollScreen';
import {OutPassScreen} from './OutPassScreen';
import {AddOutpass} from './Externalchilds/AddOutpass';


var data,
  isVisible = false;
var UserId,
  LastName,
  FirstName,
  email,
  Address,
  UserPic,
  aadharPic,
  Gender,
  CompanyName,
  CompanyAddress,
  Occupation,
  MobileNo,
  PgId,fileData,SchoolName;

export class HomePage extends Component {
  static navigationOptions = {
    header: null,
  };
 
  constructor(props)
  {
    super(props)
    data = this.props.navigation.getParam('UserEmail', undefined);
  }
  state = {
    email: '',
  };
  storeData = async () => {
    try {
      await AsyncStorage.setItem('UserId', UserId);
      await AsyncStorage.setItem('PgId', PgId);
      await AsyncStorage.setItem('email', data);
      await AsyncStorage.setItem('LastName', LastName);
      await AsyncStorage.setItem('FirstName', FirstName);
      await AsyncStorage.setItem('Address',Address);
      await AsyncStorage.setItem('Gender', Gender);
     
      if(Occupation=='Jober'){
        await AsyncStorage.setItem('CompanyName', CompanyName);
        await AsyncStorage.setItem('CompanyAddress', CompanyAddress);
      }else{
        await AsyncStorage.setItem('SchoolName', SchoolName);
      }
      await AsyncStorage.setItem('Occupation', Occupation);
      await AsyncStorage.setItem('MobileNo', MobileNo);
      console.warn(PgId,UserId,Occupation);
    } catch (e) {
      // saving error
      console.warn(e);
    }
  };
  componentDidMount() {
   <Services/>
    let newPost;
    const db = firebase.database();
    const events = db.ref().child('User');
    var query = events.orderByChild('email').equalTo(data);
    query.once('value', snapshot => {
      newPost = snapshot.val();
      const keys = Object.keys(newPost);
      for (let d of keys) {
        if( newPost[d].Occupation=='Jober'){
        UserId = d;
        FirstName = newPost[d].FirstName;
        LastName = newPost[d].LastName;
        PgId = newPost[d].PgId;
        email=newPost[d].email;
        Address=newPost[d].Address;
        UserPic = newPost[d].UserPic;
        aadharPic = newPost[d].aadharPic;
        Gender = newPost[d].Gender;
        CompanyName = newPost[d].CompanyName;
        CompanyAddress = newPost[d].CompanyAddress;
        Occupation = newPost[d].Occupation;
        MobileNo = newPost[d].MobileNo;
        fileData=newPost[d].userPic;
        this.setState({email: newPost[d].email});
        }else{
          UserId = d;
          FirstName = newPost[d].FirstName;
          LastName = newPost[d].LastName;
          PgId = newPost[d].PgId;
          email=newPost[d].email;
          Address=newPost[d].Address;
          UserPic = newPost[d].UserPic;
          aadharPic = newPost[d].aadharPic;
          Gender = newPost[d].Gender;
          SchoolName=newPost[d].SchoolName;
          Occupation = newPost[d].Occupation;
          MobileNo = newPost[d].MobileNo;
          fileData=newPost[d].userPic;
          this.setState({email: newPost[d].email});

        }
      }
      setTimeout(() => {
        {
          this.storeData();
        }
      }, 3000);
    });
  }
  render() {
    data = this.props.navigation.getParam('UserEmail', undefined);
    setTimeout(() => {
      this.setState({
        email: data,
      });
    }, 1000);
    return <AppContainer />;
     
  }
}
function renderdata (){
  if (fileData) {
    return (
      <Image
        source={{uri:fileData}}
        style={{width: 80, height: 80, borderRadius: 40}}
      />
    );
  } else {
    return (
      <Image
        source={require('./../../images/usermale.jpg')}
        style={{width: 80, height: 80, borderRadius: 40}}
      />
    );
  }

}
const Sidebar = props => (
  <ScrollView>
    <ImageBackground
      source={require('./../../images/Drawerback.jpg')}
      style={{width: undefined, height: 180, padding: 16, paddingTop: 48}}>
      {/* <Image
        source={require('./../../images/usermale.jpg')}
        style={{width: 80, height: 80, borderRadius: 40}}
      /> */}
      {renderdata()}
      <Text style={{color: 'white', fontSize: 20}}>
        {' '}
        {FirstName} {LastName}
      </Text>
    </ImageBackground>
    <DrawerNavigatorItems {...props} />
    <TouchableOpacity
      onPress={()=>{
        Alert.alert(
          'Log out',
          'Do you want to logout?',
          [
            {text: 'Cancel', onPress: () => {return null}},
            {text: 'Confirm', onPress: () => {
              AsyncStorage.clear();
             props.navigation.navigate('S_FirstLogin');
            }},
          ], 
          { cancelable: false }
        )  
      }}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Icon3
          style={{paddingLeft: 12, color: '#248f8f'}}
          name="logout"
          size={30}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 14, paddingLeft: 25, fontWeight: 'bold'}}>
            {' '}
            Logout
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </ScrollView>
);

const ProfileStackNavigator = createStackNavigator(
  {
    ProfileNavigator: ProfileScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Icon2
            style={{paddingLeft: 10}}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        ),
      };
    },
  },
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardNavigator: DashboardScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Icon2
            style={{paddingLeft: 10}}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        ),
        headerRight: (  
          <Icon2 
              style={{ paddingRight: 10 }}  
              onPress={() => navigation.navigate('Notification')}  
              name="notification"  
              size={30}  
          /> 
      )
      };
    },
  },
);

const NotificationScreenStackNavigator = createStackNavigator(
  {
    NotificationScreenNavigator: NotificationScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Icon2
            style={{paddingLeft: 10}}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        ),
      };
    },
  },
);
const PgScreenStackNavigator = createStackNavigator(
  {
    PgNavigator: PgScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Icon2
            style={{paddingLeft: 10}}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        ),
      };
    },
  },
);

const ComplaintStackNavigator = createStackNavigator(
  {
    ComplainttNavigator: ComplaintScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Icon2
            style={{paddingLeft: 10}}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        ),
      };
    },
  },
);
const pgtestStackNavigator = createStackNavigator(
  {
    pgtestNavigator: pgtest,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Icon2
            style={{paddingLeft: 10}}
            onPress={() => navigation.goBack()} 
            name="menu"
            size={30}
          />
        ),
      };
    },
  },
);
const PollScreenStackNavigator = createStackNavigator(
  {
    PollScreenNavigator: PollScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Icon2
            style={{paddingLeft: 10}}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        ),
      };
    },
  },
);
const OutPassScreenStackNavigator = createStackNavigator(
  {
    OutPassScreenNavigator: OutPassScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerLeft: (
          <Icon2
            style={{paddingLeft: 10}}
            onPress={() => navigation.openDrawer()}
            name="menu"
            size={30}
          />
        ),
      };
    },
  },
);
const AppDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardStackNavigator,
      navigationOptions: {
        drawerLabel: 'DashBoard',
        drawerIcon: ({tintColor}) => (
          <Icon name="home" size={25} color="#1a53ff" />
        ),
      },
    },
    Profile: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        drawerLabel: 'Profile',
        drawerIcon: ({tintColor}) => (
          <Icon name="glass" size={25} color="#00b33c" />
        ),
      },
    },
    Notification: {
      screen: NotificationScreenStackNavigator,
      navigationOptions: {
        drawerLabel: 'Notifications',
        drawerIcon: ({tintColor}) => (
          <Icon4 name="notification" size={25} color="#cc0099" />
        ),
      },
    },
    Pg: {
      screen: PgScreenStackNavigator,
      navigationOptions: {
        drawerLabel: 'PG Info',
        drawerIcon: ({tintColor}) => (
          <Icon3 name="office-building" size={25} color="#ff3300" />
        ),
      },
    },
    PollScreen: {
      screen: PollScreenStackNavigator,
      navigationOptions: {
        drawerLabel: 'Poll',
        drawerIcon: ({tintColor}) => (
          <Icon3 name="poll-box" size={30} color="#ff0000" />
        ),
      }, 
    },
    Complaint: {
      screen: ComplaintStackNavigator,
      navigationOptions: {
        drawerLabel: 'Complaint',
        drawerIcon: ({tintColor}) => (
          <Icon3 name="circle-edit-outline" size={25} color="#ffb31a" />
        ),
      },
    },
  
  OutPass:{
    screen: OutPassScreenStackNavigator,
    navigationOptions: {
      drawerLabel: 'OutPass',
      drawerIcon: ({tintColor}) => (
        <Icon3 name="ticket" size={25} color="#4d0099" />
      ),
    },
  },
},
  {
    contentComponent: props => <Sidebar {...props} />,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  },
);


const AppSwitchNavigator = createStackNavigator({
AppDrawerNavigator :{ screen: AppDrawerNavigator, navigationOptions: { header: null } },
pgtest: {
  screen: pgtest,
  navigationOptions: { title: 'Test' },
},
SelectPg:{
  screen:SelectPg,
  navigationOptions: { title: 'Select Pg' },
},
AddComplaint:{
  screen:AddComplaint,
  navigationOptions: { title: '         Add Complaint' },
},
ViewComplaint:{
  screen:ViewComplaint,
  navigationOptions: { title: '        View Complaint' },
},
AddOutpass:{
  screen:AddOutpass,
  navigationOptions: { title: '        Request Pass' },
},
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
});
