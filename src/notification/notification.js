import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Switch,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ToggleSwitch from '../components/Notifcation/toggleSwitch';
// import { Switch } from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {getAllNotificationSetting, getAllPrivacySetting} from '../redux/Notifications/action';

const data=[
  {
    id: "16fc7b70-7c40-11ed-9918-211591abd471",
    name: "comment",
    isActive: true,
    createdAt: "2022-12-15T06:17:02.375Z",
    updatedAt: "2022-12-15T06:17:02.375Z",
    isEnabled: false
},
{
    id: "1c3e0090-7c40-11ed-9918-211591abd471",
    name: "share",
    isActive: true,
    createdAt: "2022-12-15T06:17:11.193Z",
    updatedAt: "2022-12-15T06:17:11.193Z",
    isEnabled: true
},
{
    id: "203133c0-7c40-11ed-9918-211591abd471",
    name: "tag",
    isActive: true,
    createdAt: "2022-12-15T06:17:17.820Z",
    updatedAt: "2022-12-15T06:17:17.820Z",
    isEnabled: false
},
{
    id: "94a98710-7c41-11ed-b465-3336b2eb089c",
    name: "connect request",
    isActive: true,
    createdAt: "2022-12-15T06:27:42.721Z",
    updatedAt: "2022-12-15T06:27:42.721Z",
    isEnabled: false
}
]
export default function SettingNotifications({navigation}) {
  const notificationState = useSelector(state => state.notificationState);
  const authState = useSelector(state => state.authState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNotificationSetting(authState.userId));
  }, [dispatch]);
    // console.log('notification state', notificationState.enabled);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/icons/png/backButton.png')} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignContent: 'flex-start',
            alignSelf: 'center',
            marginLeft: 10,
          }}>
          <Text style={styles.name}>Notifications</Text>
        </View>
      </View>
      <ScrollView>
        {notificationState.notificationData.map(item => {
        {/* {data.map(item => { */}
          return (
            <View style={styles.toggel}>
                <Text style={styles.toggelName}>{item.name}{item.isEnabled}</Text>
              <ToggleSwitch 
              id={item.id}
              isEnabled={item.isEnabled}
              name={item.name}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ebecff',
    height: windowHeight / 12,
  },
  icon: {
    marginLeft: '5%',
    marginRight: '5%',
    alignSelf: 'center',
  },
  name: {
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
    borderRadius: 100 / 2,
    textAlign: 'center',
  },
  toggel: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    height: windowHeight / 11,
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1,
  },
  toggelName: {
    fontSize: 15,
    color: '#000',
    // backgroundColor: 'pink',
    margin: '5%',
    width: '69%',
    fontWeight: '500',
    alignSelf: 'center',
  },
});
