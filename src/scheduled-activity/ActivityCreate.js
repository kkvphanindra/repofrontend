import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProgressBar from 'react-native-progress/Bar';
import StackHeader from '../components/Activity/StackHeader';
import LinearGradient from 'react-native-linear-gradient';
import Checkboxs from '../components/Activity/Checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {getActivityType} from '../redux/activity/action';

const data = [
  {
    name: 'GENERAL',
    id: 'vhnu34bk876niikmbghy',
    activities: [
      {
        name: 'Run',
        id: '1a',
      },
      {
        name: 'Walk',
        id: '1b',
      },
      {
        name: 'Laugh',
        id: '1c',
      },
    ],
  },
  {
    name: 'HONOUR',
    id: 'mklothikkol6754nkom8',
    activities: [
      {
        name: 'Sing',
        id: '2a',
      },
      {
        name: 'Dance',
        id: '2b',
      },
      {
        name: 'Fight',
        id: '2c',
      },
    ],
  },
];
const demo = [
  {
    activityType: {
      id: 'bd7baeb0-82be-11ed-9a40-f383f2966c89',
      name: 'General',
      isActive: true,
      createdAt: '2022-12-23T12:38:45.277Z',
      updatedAt: '2022-12-23T12:38:45.277Z',
    },
    items: [
      {
        id: 'bdb18bc0-82be-11ed-9a40-f383f2966c89',
        activityTypesId: 'bd7baeb0-82be-11ed-9a40-f383f2966c89',
        name: 'Walk',
      },
      {
        id: 'bdfdaff0-82be-11ed-9a40-f383f2966c89',
        activityTypesId: 'bd7baeb0-82be-11ed-9a40-f383f2966c89',
        name: 'Sing',
      },
    ],
  },
  {
    activityType: {
      id: 'c355ca50-82be-11ed-9a40-f383f2966c89',
      name: 'Honor',
      isActive: true,
      createdAt: '2022-12-23T12:38:55.094Z',
      updatedAt: '2022-12-23T12:38:55.094Z',
    },
    items: [
      {
        id: 'c39c9750-82be-11ed-9a40-f383f2966c89',
        activityTypesId: 'c355ca50-82be-11ed-9a40-f383f2966c89',
        name: 'Run',
      },
      {
        id: 'c3cb9690-82be-11ed-9a40-f383f2966c89',
        activityTypesId: 'c355ca50-82be-11ed-9a40-f383f2966c89',
        name: 'Dance',
      },
    ],
  },
];
const ActivityCreate = ({navigation}) => {
  const [checked, setChecked] = useState('');
  const activityState = useSelector(state => state.activityState);
  const [activityTypeId, setActivityTypeId] = useState('');
  const dispatch = useDispatch();
  const [store, setStore] = useState([]);
  useEffect(() => {
    dispatch(getActivityType());
  }, [dispatch]);
  console.log('checked', checked);
  return (
    <View style={styles.container}>
      <StackHeader
        IconLeftName="left"
        IconLeftSize={24}
        header="CREATE ACTIVITY"
        IconRightName="notifications-outline"
        IconRightSize={24}
        notification={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Activity Type</Text>
      </View>
      <View style={styles.progressBar}>
        <ProgressBar
          progress={0.4}
          width={width}
          borderRadius={0}
          borderColor={'#fff'}
          unfilledColor={'#f7f7f7'}
          color={'#5E6BFF'}
          borderWidth={0}
          animated={false}
        />
      </View>
      <View style={styles.activityHeader}>
        <Text style={styles.started}>
          Let's get started.{'\b'}Pick Your activity type{' '}
        </Text>
      </View>
      <View style={styles.activity}>
        {activityState?.activityTypeData?.map(item => {
          return (
            <View style={styles.activityBox}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  setChecked(item.activityType.name),
                    // setActivityTypeId(item.activityType.id)
                    setStore(item.items);
                }}>
                {checked.includes(item.activityType.name) ? (
                  <Image
                    source={require('../assets/icons/png/icon-done.png')}
                    style={styles.icon}
                  />
                ) : (
                  <Image
                    source={require('../assets/icons/png/icon-done-2.png')}
                    style={styles.icon}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.activityText}>{item.activityType.name}</Text>
            </View>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.scheduleNow}
        onPress={() => {
          checked != ''
            ? navigation.navigate('activitySelect', {
                activities: store,
                activityType: checked,
              })
            : Alert.alert('Please select activity Type');
        }}>
        <LinearGradient
          style={styles.buttonWrapper}
          colors={['#5E6BFF', '#212FCC']}>
          <Text style={styles.buttonText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ActivityCreate;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignSelf: "center",
    marginBottom: '5%',
    // backgroundColor:"pink"
  },
  headerText: {
    // marginLeft: '9%'
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#000',
    // marginTop: '5%',
  },
  progressBar: {
    alignSelf: 'center',
    width:'100%'

  },
  activityHeader: {
    marginTop: '8%',
    marginLeft: '11%',
    backgroundColor:'red'
  },
  started: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  activity: {
    marginTop: '5%',
  },
  activityBox: {
    marginTop: '7%',
    marginLeft: '10%',
    borderColor: '#c4c4c4',
    borderWidth: 1,
    // paddingHorizontal:10,
    height: height / 7,
    width: width / 1.3,
    // paddingVertical: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  activityText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  scheduleNow: {
    // backgroundColor: '#5E6BFF',
    width: width / 1.5,
    marginTop: '5%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: '2%',
  },
  scheduleNowText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonWrapper: {
    width: '100%',
    padding: 10,
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 20,
    textAlign: 'center',
  },
  iconButton: {
    alignSelf: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 100 / 2,
  },
});
