import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment';
import {
  deleteActivityByActivityId,
  endTime,
  getAllActivityByUserId,
  startTime,
  userStatusByactivityId,
} from '../../redux/activity/action';
import {useSelector, useDispatch} from 'react-redux';
import {useCallback} from 'react';

const img = [
  'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
  'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
  'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
  'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
  'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
  'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
];

const Flatlist = ({data}) => {
  const navigation = useNavigation();
  const [secondsLeft, setSecondsLeft] = useState();
  const [status, setStatus] = useState(false);
  const [month, setMonth] = useState(true);
  const activityState = useSelector(state => state.activityState);
  let s = new Date();
  let startedTime = s.toISOString();
  let e = new Date();
  let endedTime = e.toISOString();
  let id = '3ac1df80-5a6e-11ed-a871-7d8265a60df7';
  const [started, setStarted] = useState(startedTime);
  const [ended, setEnded] = useState(endedTime);
  const [timerOn, setTimerOn] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (timerOn) startTimer();
    else {
      BackgroundTimer.stopBackgroundTimer();
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);
  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1;
        else return 0;
      });
    }, 1000);
  };
  // console.log("tine", started)
  function diff(startTime, endTime) {
    console.log('time', startTime, endTime);
    var todayDate = moment(new Date()).format('YYYY-MM-DD');
    console.log("today date", todayDate)
    var startDate = new Date(`${todayDate}T${startTime}Z`);
    console.log("startDate",startDate)
    var endDate = new Date(`${todayDate}T${endTime}Z`);
    var diff = endDate.getTime() - startDate.getTime();
    console.log("diff", diff)
    var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());
    console.log("time diff",timeDiff)

    var hh = Math.floor(timeDiff / 1000 / 60 / 60);
    var converted = hh * 60 * 60;
    timeDiff -= hh * 1000 * 60 * 60;
    var mm = Math.floor(timeDiff / 1000 / 60);
    var mConverted = mm * 60;
    timeDiff -= mm * 1000 * 60;
    var ss = Math.floor(timeDiff / 1000);
    var sConverted = ss;
    let sum = converted + mConverted + ss;
    let displayHours = hh < 10 ? `0${hh}` : hh;
    let displayMins = mm < 10 ? `0${mm}` : mm;
    let displaySecs = ss < 10 ? `0${ss}` : ss;
    console.log(
      'display',
      displayHours,
      displayMins,
      displaySecs,
      startDate,
      endDate,
      converted,
      mConverted,
      sConverted,
      sum,
    );
    setSecondsLeft(sum);
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  //   let sTime = moment(startTime, ['h:mm:ss'])
  //   .utcOffset(0, false);

  // let eTime = moment(endTime, ['h:mm:ss'])
  //   .utcOffset(0, false);

  // var TotalSeconds = eTime
  //   .diff(sTime,'seconds');
  // var hours = Math.floor(TotalSeconds / 3600);
  // var minutes = Math.floor((TotalSeconds / 60) % 60);
  // var sec = Math.floor((TotalSeconds/60)%60%60)
  // var sum= hours + minutes + sec
  // console.log(`startShiftTime: ${sTime.format('h:mm:ss')} endTime: ${eTime.format('h:mm:ss')} hours: ${hours} minutes: ${minutes} sec: ${sec}`);
  //  setSecondsLeft(sum);
  //   return {
  //     hours,
  //     minutes,
  //     sec,
  //   };
}
  useEffect((activityId) => {
    if (secondsLeft === 0) {
      BackgroundTimer.stopBackgroundTimer();
      Alert.alert('Timer Ended');
      // dispatch(deleteActivityByActivityId(status, activityId))
    }
  }, [secondsLeft]);
  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };
  let currentDate = new Date().toJSON().slice(0, 10);
  let current_time = moment().format('hh:mm');
  const onTimeStart = activityId => {
    dispatch(startTime(started, activityId, id));
  };
  const onTimeEnd = activityId => {
    dispatch(endTime(ended, activityId, id));
    dispatch(deleteActivityByActivityId(status, activityId))
    // console.log('Timer stopped', status, activityId, id);
  };
  // console.log('current date', activityId);
  // console.log('item', data?.item?.activityName, data?.startTime);
  return (
    <View>
      {data?.item?.isActive === false?
         null
      :
      <TouchableOpacity
        style={styles.tabContent}
        onPress={() =>
          navigation.navigate('activityDetails', {activityDetails: data?.item})
        }>
        <View style={{backgroundColor: '#8F99EB', width: 2, height: 44}}></View>
        <View style={styles.tabContentWrapper}>
          <View style={styles.topContentWrapper}>
            <View style={styles.topTitleWrapper}>
              <Text style={styles.tabTitle}>{data?.item?.activityName}</Text>
              <Text style={styles.tabLabel}>
                {data?.item?.startTime}-{data?.item?.endTime}
              </Text>
            </View>
            <View style={styles.tabViewWrapper}>
              {img.slice(0, 4).map(item => {
                return (
                  <View>
                    <View>
                      <Image style={styles.groupIcon} source={{uri: item}} />
                    </View>
                  </View>
                );
              })}
              {img.length > 4 ? (
                <View style={styles.groupIcon}>
                  <Text style={styles.groupIconText}>+{img.length - 4}</Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '50%'}}>
              <View style={styles.tabLocationWrapper}>
                <EvilIcon
                  name="location"
                  size={18}
                  color="#000"
                  style={styles.icon}
                />
                <Text style={styles.tabLocation}>{data?.item?.location}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  // onTimeStart(data?.item?.startTime, data?.item?.endTime,data?.item?.id)
                  setTimerOn(true),
                    diff(data?.item?.startTime, data?.item?.endTime);
                  // dispatch(startTime(started, data?.item?.id, id));
                  onTimeStart(data?.item?.id);
                }}>
                <Text style={styles.startButtonText}>
                  {timerOn ? (
                    <View>
                      <Text style={{color: '#fff'}}>
                        {clockify().displayHours}:{clockify().displayMins}:{' '}
                        {clockify().displaySecs}
                      </Text>
                    </View>
                  ) : (
                    'Start'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.stopButton}
                onPress={timerOn => {
                  setTimerOn(!timerOn), onTimeEnd(data?.item?.id);
                }}>
                <AntDesign
                  name="close"
                  size={20}
                  color="#fff"
                  style={styles.stopButtonIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      }
    </View>
  );
};

export default Flatlist;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  tabContainer: {
    // flexDirection: 'row',
    alignSelf: 'center',
    // height: 200
  },
  tabScrollContainer: {
    // flexDirection: 'row',
    alignSelf: 'center',
  },
  tabContent: {
    width: windowWidth / 1.2,
    height: 'auto',
    alignSelf: 'center',
    alignContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F9FAFD',
    // backgroundColor: 'red',
    borderRadius: 15,
    // marginHorizontal: 10,
    margin: '2%',
    // marginBottom: '10%',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  tabContentWrapper: {
    flexDirection: 'column',
    marginLeft: 20,
    width: '100%',
    alignSelf: 'center',
  },
  topContentWrapper: {
    flexDirection: 'row',
    // backgroundColor: 'pink',
    width: windowWidth / 1.4,
    // justifyContent: 'center'
  },
  topTitleWrapper: {
    flexDirection: 'column',
    width: '68%',
  },
  tabViewWrapper: {
    width: 40,
    height: 40,
    // backgroundColor: 'pink',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 5,
    flexDirection: 'row',
  },
  tabTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    color: '#2C406E',
    lineHeight: 20,
  },
  tabLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#9AA8C7',
    lineHeight: 20,
  },
  tabLocationWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#C8E7F0',
    // width: '50%',
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 5,
    height: 20,
    marginTop: '10%',
    width: '80%',
    // maxWidth: 110,
    // marginLeft: '5%',
    alignItems: 'center',
  },
  icon: {
    margin: '2%',
  },
  startButton: {
    backgroundColor: '#5E6BFF',
    width: windowWidth / 4,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
    borderRadius: 20,
  },
  stopButton: {
    backgroundColor: '#fa9f78',
    width: 'auto',
    height: 30,
    width: 30,
    marginTop: 10,
    marginLeft: '10%',
    borderRadius: 100 / 2,
  },
  stopButtonIcon: {
    alignSelf: 'center',
    alignItems: 'center',
    margin: '15%',
  },
  startButtonText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  timer: {
    backgroundColor: 'pink',
    width: '50%',
  },
  tabLocation: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
    margin: '2%',
  },
  groupIcon: {
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'grey',
    marginLeft: -10,
    // top: 10,
    // bottom: 20,
    height: 31,
    width: 31,
    // position: 'absolute',
    // position: 'relative',
    borderRadius: 100 / 2,
    borderColor: '#ffff',
    borderWidth: 1,
  },
  groupIconText: {
    padding: 5,
    fontSize: 14,
    color: '#fff',
    alignSelf: 'center',
  },
});
