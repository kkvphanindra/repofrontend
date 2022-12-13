/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useLayoutEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
  Image,
  Settings
} from 'react-native';
import { NavigationContainer, useNavigation,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './src/components/CustomDrawer';
import LoginComponent from './src/register/Login';
import MobileNumber from './src/register/MobileNumber';
import VerifyAccount from './src/register/VerifyAccount';
import Agree from './src/register/Agree';
import Details from './src/register/Details';
import UploadPicture from './src/register/UploadPicture';
import Location from './src/register/Location';
import InviteFriends from './src/register/InviteFriends';
import Interests from './src/register/Interests';
import Groups from './src/register/Groups';
import Home from './src/Home';
import SlambookRequest from './src/slambook/slambook-request';
import SlambookForm from './src/slambook/slambook-form';
import SlambookHome from './src/slambook/slambook-home';
import Notifications from './src/notifications';
import ScheduledHome from './src/scheduled-activity/ActivityHome';
import CreateActivity from './src/scheduled-activity/CreateActivty';
import ScheduledActivity from './src/scheduled-activity/ScheduleActivity';
import ActivityDetails from './src/scheduled-activity/ActivityDetails';
import ProfileHome from './src/profile/profile-home';
import ProfileEdit from './src/profile/profile-edit';
import ConnectHome from './src/connect/connect-home';
import InviteToGroup from './src/connect/invite-to-group';
import ChatSingle from './src/chat/ChatSingle'
import GroupChat from './src/chat/GroupChat';
import ChatHome from './src/chat/Home';
import GroupCreation from './src/chat/GroupCreation'
import AllContacts from './src/chat/AllContacts'
import GroupDetails from './src/chat/GroupDetails'
import CallNow from './src/chat/CallNow'
import Setting from './src/notification/settings';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import SettingNotifications from './src/notification/notification';
import Snap from './src/snap/snap'
import SnapDetails from './src/snap/snapDetails'
import CommentSnap from './src/snap/commentSnap';
import { tokenRetriever } from './src/redux/auth/action';
import PrivacySettings from './src/notification/PrivacySettings';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const tabHiddenRoutes = [
  "snap",
];
function HomeStackScreen({navigation, route}) {
  useLayoutEffect(() => {
    // const routeName = getFocusedRouteNameFromRoute(route);
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  return (
    <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarIcon: ({size,focused,color}) => {
              return <Image
              source={require('./src/assets/images/home-menu.png')}
              style={{ width: 24, height: 24, color: '' }}
                />
            }
          }}  
        />
        <Tab.Screen 
          name="Connect" 
          component={ConnectHome} 
          options={{
            tabBarIcon: ({size,focused,color}) => {
              return <Image
              source={require('./src/assets/images/connect-menu.png')}
              style={{ width: 24, height: 24, color: '' }}
                />
            }
          }}  
        />
          <Tab.Screen 
          name="Chat" 
          component={ChatHome} 
          options={{
            tabBarIcon: ({size,focused,color}) => {
              return <Image
              source={require('./src/assets/images/chat-menu.png')}
              style={{ width: 28, height: 20, color: '' }}
                />
            }
          }}  
        />
         <Tab.Screen 
          name="snap" 
          component={Snap} 
          options={{
            tabBarIcon: ({size,focused,color}) => {
              return <Image
              source={require('./src/assets/images/snap-menu.png')}
              style={{ width: 24, height: 20, color: '' }}
                />
            }
          }}  
        />
  </Tab.Navigator>
  )
}

function DrawerNv() {
  return (
    <Drawer.Navigator 
    screenOptions={{
      drawerActiveTintColor: 'red',
      drawerInactiveTintColor: '#000',
      drawerActiveBackgroundColor: '#fff',
      headerShown: false,
      drawerItemStyle: {
        // backgroundColor: 'yellow',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
      }
    }}
    initialRouteName='Home'
    drawerContent={props => <CustomDrawer {...props} />}
    >
    <Drawer.Screen name="Home" component={HomeStackScreen} 
    options={{
drawerLabel: 'Home'
    }}
    />
    <Drawer.Screen name="slamBook" component={SlambookHome} 
     options={{
      drawerLabel: 'Slam-Book'
          }}
    />
      <Drawer.Screen name="schedule" component={ScheduledHome} 
     options={{
      drawerLabel: 'Schedules'
          }}
    />
      <Drawer.Screen name="savedItem" component={ChatHome} 
     options={{
      drawerLabel: 'Saved Items'
          }}
    />
      <Drawer.Screen name="settingsPrivacy" component={Setting} 
     options={{
      drawerLabel: 'Settings & Privacy'
          }}
    />
      <Drawer.Screen name="helpSupport" component={Snap} 
     options={{
      drawerLabel: 'Help & Support'
          }}
    />
      <Drawer.Screen name="termCondition" component={SlambookForm} 
     options={{
      drawerLabel: 'Terms & Conditons'
          }}
    />
      <Drawer.Screen name="yourActivities" component={ScheduledHome} 
     options={{
      drawerLabel: 'Your Activities & Time'
          }}
    />
  </Drawer.Navigator>
  );
}

const App = () => {
  LogBox.ignoreLogs(['source.uri should not be an empty string','code','Warning: Encountered two children with the same key','VirtualizedLists','Warning: Each child in a list should have a unique "key" prop']);
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="login">
        <Stack.Screen name="login" component={LoginComponent} />
        <Stack.Screen name="mobileNumber" component={MobileNumber} />
        <Stack.Screen name="verifyAccount" component={VerifyAccount} />
        <Stack.Screen name="agree" component={Agree} />
        <Stack.Screen name="details" component={Details} />
        <Stack.Screen name="uploadPicture" component={UploadPicture} />
        <Stack.Screen name="location" component={Location} />
        <Stack.Screen name="inviteFriends" component={InviteFriends} />
        <Stack.Screen name="interests" component={Interests} />
        <Stack.Screen name="groups" component={Groups} />
        <Stack.Screen name="home" component={DrawerNv} />
        <Stack.Screen name="slambookRequest" component={SlambookRequest} />
        <Stack.Screen name="slambookForm" component={SlambookForm} />
        <Stack.Screen name="slambookHome" component={SlambookHome} />
        <Stack.Screen name="notifications" component={Notifications} />
        <Stack.Screen name="scheduledHome" component={ScheduledHome} />
        {/* <Stack.Screen name="activityHome" component={ActivityHome} /> */}
        <Stack.Screen name="createActivity" component={CreateActivity} />
        <Stack.Screen name="scheduledActivity" component={ScheduledActivity} />
        <Stack.Screen name="activityDetails" component={ActivityDetails} />
        <Stack.Screen name="profileHome" component={ProfileHome} />
        <Stack.Screen name="profileEdit" component={ProfileEdit} />
        <Stack.Screen name="connectHome" component={HomeStackScreen} />
        <Stack.Screen name="inviteToGroup" component={InviteToGroup} />
        <Stack.Screen name='chatSingle' component={ChatSingle}/>
        <Stack.Screen name='groupChat' component={GroupChat}/>
        <Stack.Screen name='allContacts' component={AllContacts}/>
        <Stack.Screen name='groupCreation' component={GroupCreation}/>
        <Stack.Screen name='groupDetails' component={GroupDetails}/>
        <Stack.Screen name='callNow' component={CallNow}/>
        <Stack.Screen name='settings' component={Setting}/>
        <Stack.Screen name='settingNotification' component={SettingNotifications}/>
        <Stack.Screen name='privacy' component={PrivacySettings}/>
        <Stack.Screen name='snap' component={Snap}/>
        <Stack.Screen name='snapDetails' component={SnapDetails}/>
        <Stack.Screen name='commentSnap' component={CommentSnap}/>


      </Stack.Navigator>
    </NavigationContainer>
    {/* <Drawer.Navigator>
    <Drawer.Screen name="home" component={HomeStackScreen} />
    <Drawer.Screen name="chatHome" component={ChatHome} />
  </Drawer.Navigator> */}
    </Provider>
  );
};


export default App;
