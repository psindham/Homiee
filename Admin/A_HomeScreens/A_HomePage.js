import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView,
  Image,
  Picker,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import Icon5 from 'react-native-vector-icons/Fontisto';
import {ProfileScreen} from './ProfileScreen';
import {DashboardScreen} from './DashboardScreen';
import {FloorManScreen} from './FloorManScreen';
import {AddRoomScreen} from './AddRoomScreen';
import {PollScreen} from './PollScreen';
import {ExpenseScreen} from './ExpenseScreen';
import {allocateRoom} from './allocateRoom';
import {AssignComplaint} from './ChildScreens/AssignComplaint';
import {image} from './image';
import {deletePoll} from './ChildScreens/deletePoll';
import * as firebase from 'firebase';
import {ViewStayer} from './ChildScreens/ViewStayer';
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
import AsyncStorage from '@react-native-community/async-storage';
import {Services} from './../../Services';
import {AddPollScreen} from './AddPollScreen';
import {ComplaintScreen} from './ComplaintScreen';
import {AddStaff} from './ChildScreens/AddStaff';
import {StaffScreen} from './StaffScreen';
import {AddPgScreen} from './AddPgScreen';
import {AddPg} from './ChildScreens/AddPg';
import {OutPassScreen} from './OutPassScreen';
import {ViewOutpass} from './ChildScreens/ViewOutpass';
import {Stayers} from './Stayers'

var data;
var FirstName, LastName, AdminId,PgName;
let li=[{'PgName':'Change PG','Id':'0'}];
let addItems;

storeDataPg = async (d) => {
  console.warn(d);
  try {
    await AsyncStorage.setItem('PgId',d);
  }catch(e){}
}
export class A_HomePage extends Component {
  static navigationOptions = {
    header: null,
  };
  storeDataPgE = async (d) => {
    console.warn(AdminId);
    try {
      await AsyncStorage.setItem('PgId',d);
    }catch(e){}
  }
  constructor(props){
    super(props)
   // {this.getData()}
   data = this.props.navigation.getParam('UserEmail', undefined);
   var  firebaseConfig = {
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
  let newPost;
  const db = firebase.database();
  const events = db.ref().child('Admin');
  var query = events.orderByChild('email').equalTo(data);
  query.once('value', snapshot => {
    newPost = snapshot.val();
    const keys = Object.keys(newPost);
    for (let d of keys) {
      AdminId = d;
      FirstName = newPost[d].FirstName;
      LastName = newPost[d].LastName;
      this.setState({email: newPost[d].email})
    }
    setTimeout(() => {
      {this.storeDataAdmin()}
    }, 2000);
    setTimeout(() => {
      li=[{'PgName':'Select PG','Id':'0'}];
      let pnewPost;
    const events2 = db.ref().child('PG');
    var pquery = events2.orderByChild('AdminId').equalTo(AdminId);
    pquery.once('value', snapshot => {
     pnewPost = snapshot.val();
     const keys = Object.keys(pnewPost);
     for (let d of keys) {
      //  let dataArray = this.state.PgList;
      //    dataArray.push({'PgName':pnewPost[d].PgName,'Id':d});
          li.push({'PgName':pnewPost[d].PgName,'Id':d});
        //  console.warn(li);
         if(this.state.first){
        {this.storeDataPgE(d)}
         this.setState({first:false})
        }
      //  this.setState({
      //    PgList: dataArray,
      //  });
     }
   });
    }, 3000);
    
  });

  }
  state = {
    email: '',
    first:true,
    PgList:[],
  };
  storeDataAdmin = async () => {
    try {
      await AsyncStorage.setItem('AdminId',AdminId)
      await AsyncStorage.setItem('email', this.state.email)
    } catch (e) {
      // saving error
      console.warn(e);
    }
  }
  render() {
    data = this.props.navigation.getParam('UserEmail', undefined);
    addItems=li.map(item => {
      return (<Picker.Item label={item.PgName} value={item.Id} key={item.PgName} />);
     })
    setTimeout(() => {
      this.setState({
        email: data,
      });
    }, 1000);
    
    return <AppContainer />;
  }
}

const Sidebar = props => (
  <ScrollView>
    <ImageBackground
      source={require('./../../images/Drawerback.jpg')}
      style={{width: undefined, height: 180, padding: 16, paddingTop: 40}}>
      <Image
        source={require('./../../images/usermale.jpg')}
        style={{width: 80, height: 80, borderRadius: 40}}
      />
      <Text style={{color: 'white', fontSize: 20}}>
        {' '}
        {FirstName} {LastName}
      </Text>
      <Picker
                style={{
                  backgroundColor:'white',
                  height: 30,
                  width: '80%',
                  color: '#344953',
                  justifyContent: 'center',
                borderRadius:5,}}
                onValueChange={(itemValue,key) =>{
                    storeDataPg(itemValue)  
                    PgName=key
                }}
                selectedValue={PgName}
                >
                  {addItems}
              </Picker>
    </ImageBackground>
    <DrawerNavigatorItems {...props} />
    <TouchableOpacity
      onPress={()=>{
        const {navigation}=props
        Alert.alert(
          'Log out',
          'Do you want to logout?',
          [
            {text: 'Cancel', onPress: () => {return null}},
            {text: 'Confirm', onPress: () => {
              AsyncStorage.clear();
             navigation.navigate('FirstLogin');
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
const AddRoomStackNavigator = createStackNavigator(
  {
    AddRoomNavigator: AddRoomScreen,
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
const FloorManStackNavigator = createStackNavigator(
  {
    FloorManNavigator: FloorManScreen,
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
const ExpenseScreenStackNavigator = createStackNavigator(
  {
    ExpenseScreenNavigator: ExpenseScreen,
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
const ComplaintStackNavigator = createStackNavigator(
  {
    ComplaintNavigator: ComplaintScreen,
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
const StaffStackNavigator = createStackNavigator(
  {
    StaffNavigator: StaffScreen,
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
const AddPgScreenStackNavigator = createStackNavigator(
  {
    AddPgScreenNavigator: AddPgScreen,
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
);Stayers
const StayersStackNavigator = createStackNavigator(
  {
    StayersNavigator: Stayers,
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
    FloorMan: {
      screen: FloorManStackNavigator,
      navigationOptions: {
        drawerLabel: 'Floor Management',
        drawerIcon: ({tintColor}) => (
          <Icon3 name="floor-plan" size={25} color="#ffff1a" />
        ),
      },
    },
    AddRoom: {
      screen: AddRoomStackNavigator,
      navigationOptions: {
        drawerLabel: 'Add Room',
        drawerIcon: ({tintColor}) => (
          <Icon3 name="google-classroom" size={25} color="#ff6600" />
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
    OutPass:{
      screen: OutPassScreenStackNavigator,
      navigationOptions: {
        drawerLabel: 'OutPass',
        drawerIcon: ({tintColor}) => (
          <Icon3 name="ticket" size={25} color="#4d0099" />
        ),
      },
    },
    Expenses: {
      screen: ExpenseScreenStackNavigator,
      navigationOptions: {
        drawerLabel: 'Expenses',
        drawerIcon: ({tintColor}) => (
          <Icon3 name="cash-100" size={25} color={tintColor} />
        ),
      },
    },
    Stayers:{
      screen: StayersStackNavigator,
      navigationOptions: {
        drawerLabel: 'Stayers',
        drawerIcon: ({tintColor}) => (
          <Icon name="users" size={25} color="#009e73" />
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
    Complaint: {
      screen: ComplaintStackNavigator,
      navigationOptions: {
        drawerLabel: 'Complaint',
        drawerIcon: ({tintColor}) => (
          <Icon3 name="circle-edit-outline" size={25} color="#ffb31a" />
        ),
      },
    },
  
    StaffScreen:{
      screen: StaffStackNavigator,
      navigationOptions: {
        drawerLabel: 'My Staff',
        drawerIcon: ({tintColor}) => (
          <Icon5 name="persons" size={25} color="#99004d" />
        ),
      },
    }, 
    AddPgScreen:{
      screen: AddPgScreenStackNavigator,
      navigationOptions: {
        drawerLabel: 'My PGs',
        drawerIcon: ({tintColor}) => (
          <Icon name="building" size={25} color="#009e73" />
        ),
      },
    },
  
  },
  {
    contentComponent: props => <Sidebar {...props} />,
  },
);

const AppSwitchNavigator = createStackNavigator({
  AppDrawerNavigator :{ screen: AppDrawerNavigator, navigationOptions: { header: null } },
  allocateRoom:{
    screen:allocateRoom,
    navigationOptions: { title: '              Allocate' },
  },
  AddPollScreen:{
    screen:AddPollScreen,
    navigationOptions: { title: '              Add Poll' },
  },
 deletePoll:{
    screen:deletePoll,
    navigationOptions: { title: '            Delete Poll' },
  },
  image:{
    screen:image,
    navigationOptions: { title: '              KYC' },
  },
  AssignComplaint:{
    screen:AssignComplaint,
    navigationOptions: { title: '              Assign' },
  },
  AddStaff:{
    screen:AddStaff,
    navigationOptions: { title: '              Add Staff' },
  },
  AddPg:{
    screen:AddPg,
    navigationOptions: { title: '               Add Pg' },
  },
  ViewOutpass:{
    screen:ViewOutpass,
    navigationOptions: { title: '              OutPass Details' },
  },
  ViewStayer:{
    screen:ViewStayer,
    navigationOptions: { title: '             Stayer Details' },
  },
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
