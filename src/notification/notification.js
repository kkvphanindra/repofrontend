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
import {getAllPrivacySetting} from '../redux/Notifications/action';

export default function SettingNotifications({navigation}) {
  const notificationState = useSelector(state => state.notificationState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPrivacySetting());
  }, [dispatch]);
  //   console.log('notification state', notificationState);
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
        {notificationState.data.map(item => {
          return (
            <View style={styles.toggel}>
                <Text style={styles.toggelName}>{item.name}</Text>
              <ToggleSwitch/>
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
