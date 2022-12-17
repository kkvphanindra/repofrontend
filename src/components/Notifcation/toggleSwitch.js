import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert, Pressable} from 'react-native';
import {Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllNotificationSetting,
  selectedNotificationSetting,
} from '../../redux/Notifications/action';

const ToggleSwitch = props => {
  const [switchOn, setSwitchOn] = useState(props.isEnabled);
  const authState = useSelector(state => state.authState);
  const notificationState = useSelector(state => state.notificationState);
  const dispatch = useDispatch();
  const toggleSwitch = async onid => {
      setSwitchOn(!switchOn)
      console.log('onp inside toggleswitch if. ',props.name,!switchOn);
	 await dispatch(selectedNotificationSetting(authState.userId, onid, !switchOn));
	 await dispatch(getAllNotificationSetting(authState.userId));
  };
	console.log('onp inside toggleswitch elseif. ',props.name,switchOn);
      // console.log('onp inside toggleswitch if. ',notificationState.enabled);

  return (
    <View style={styles.container}>
      <Switch
        value={switchOn}
        thumbColor="#5d6afe"
        trackColor={{false: '#dbdbdb', true: '#5d6afe'}}
        onValueChange={() => {
          // setSwitchOn(!switchOn);
          // dispatch(selectedNotificationSetting(authState.userId, props.id, switchOn));
          // dispatch(getAllNotificationSetting(authState.userId));
          toggleSwitch(props.id);
          // console.log("sd", props.name,switchOn)
        }}
      />
    </View>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    // backgroundColor:'yellow'
    // justifyContent:'space-around'
  },
  text: {
    fontSize: 15,
    color: '#000',
    backgroundColor: 'pink',
    marginTop: '15%',
    // width: '75%',
    fontWeight: '500',
    alignSelf: 'center',
  },
  pressable: {
    //   backgroundColor: 'red'
  },
});
