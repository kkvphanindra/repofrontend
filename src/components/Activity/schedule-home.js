import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Pressable,
  View,
  Dimensions,
  ImageBackground,
  TouchableHighlight,
  Image,
  SectionList,
  FlatList,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BackgroundTimer from "react-native-background-timer"
import { getAllActivityByUserId } from '../redux/activity/action';
import {useSelector, useDispatch} from 'react-redux';
import TopTabNavigator from '../navigation/topTabNavigator'
const {width, height} = Dimensions.get('window');

const ScheduleHome = () => {
  const [secondsLeft, setSecondsLeft] = useState(36);
  const [timerOn, setTimerOn] = useState(false);
  const dispatch= useDispatch()
  useEffect(()=> {
    dispatch(getAllActivityByUserId())
  },[dispatch])
  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);
  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => {
        if (secs > 0) return secs - 1
        else return 0
      })
    }, 1000)
  }
  useEffect(() => {
    if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer()
  }, [secondsLeft])
  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60)
    let mins = Math.floor((secondsLeft / 60) % 60)
    let seconds = Math.floor(secondsLeft % 60)
    let displayHours = hours < 10 ? `0${hours}` : hours
    let displayMins = mins < 10 ? `0${mins}` : mins
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds
    return {
      displayHours,
      displayMins,
      displaySecs,
    }
  }
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const calender = [
    {
      name: 'Day',
      selected: true
    },
    {
      name: 'Week',
      selected: true
    },
    {
      name: 'Month',
      selected: true
    },
    {
      name: 'Year',
      selected: true
    },
  ];
  const SECTIONS = [
    {
      id: 1,
      title: 'Walking',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 2,
      title: 'Cleaning',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Accepted',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 3,
      title: 'Running',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Declined',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 4,
      title: 'Gathering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 5,
      title: 'blabering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 6,
      title: 'Flitering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
  ];
  const SECTIONSONE = [
    {
      id: 1,
      title: 'Cleaning',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 2,
      title: 'Walking',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Accepted',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 3,
      title: 'Running',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Declined',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 4,
      title: 'Gathering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 5,
      title: 'blabering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 6,
      title: 'Flitering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
  ];
  const SECTIONSTWO = [
    {
      id: 1,
      title: 'Running',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 2,
      title: 'Gathering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Accepted',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 3,
      title: 'Cleaning',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Declined',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 4,
      title: 'Walking',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 5,
      title: 'blabering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 6,
      title: 'Flitering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
  ];
  const SECTIONSTHREE = [
    {
      id: 1,
      title: 'Cleaning',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 2,
      title: 'Walking',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Accepted',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 3,
      title: 'Running',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Declined',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 4,
      title: 'Gathering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 5,
      title: 'blabering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
    {
      id: 6,
      title: 'Flitering',
      time: '07:00 - 07:15',
      location: 'Oxford Street',
      status: 'Scheduled',
      selected: false,
      pic: [
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
        'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
      ],
    },
  ];
  const getItem = (data, index) =>
    // console.log('data',data),
    ({
      id: Math.random().toString(12).substring(0),
      title: data[index].title,
      time: data[index].time,
      location: data[index].location,
      pic: data[index].pic,
    });
  const getItemCount = data => SECTIONS.length;
  const ListItem = ({data}) => {
    // console.log('item', data)
    return (
      <TouchableOpacity
        style={styles.tabContent}
        key={data.id}
        onPress={() =>
          navigation.navigate('activityDetails', {activityDetails: data})
        }>
        <View style={{backgroundColor: '#8F99EB', width: 2, height: 44}}></View>
        <View style={styles.tabContentWrapper}>
          <View style={styles.topContentWrapper}>
            <View style={styles.topTitleWrapper}>
              <Text style={styles.tabTitle}>{data.title}</Text>
              <Text style={styles.tabLabel}>{data.time}</Text>
            </View>
            <View style={styles.tabViewWrapper}>
              {data.pic.slice(0, 4).map(item => {
                return (
                  <View>
                    <View>
                      <Image style={styles.groupIcon} source={{uri: item}} />
                    </View>
                  </View>
                );
              })}
              {data.pic.length > 4 ? (
                <View style={styles.groupIcon}>
                  <Text style={styles.groupIconText}>
                    +{data.pic.length - 4}
                  </Text>
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
                <Text style={styles.tabLocation}>{data.location}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={styles.startButton}
                onPress={()=>setTimerOn(true)}>
                <Text style={styles.startButtonText}>
                  {timerOn?
                  <View>
                    <Text style={{color: '#fff'}}>
                    {clockify().displayHours}:{clockify().displayMins}:{" "}
          {clockify().displaySecs}
                    </Text>
                  </View>:
                  'Start'
                }
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.stopButton}
                onPress={(timerOn) => setTimerOn(!timerOn)}>
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
    );
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.tabHead}> */}
        {/* <TopTabNavigator/> */}
        {/* {calender.length &&
          calender.map((e, i) => {
            return (
              <TouchableHighlight
                key={i}
                style={styles.tabBox}
                activeOpacity={1}
                underlayColor=""
                onPress={() => setIndex(i)}>
                <View
                  style={[
                    styles.tabButton,
                    index === i? styles.tabButtonActive: null,
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      index === i? styles.tabTextActive: null,
                    ]}>
                    {e}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })} */}
          {/* {
          calender.map((e, i) => {
            return (
              <TouchableHighlight
                key={i}
                style={styles.tabBox}
                activeOpacity={1}
                underlayColor=""
                onPress={() => setIndex(i)}>
                <View
                  style={[
                    styles.tabButton,
                    index === i && e.selected? styles.tabButtonActive: null,
                  ]}>
                  <Text
                    style={
                      styles.tabText,
                      index ==i && e.selected? styles.tabTextActive: styles.tabText
                    }>
                    {e.name}
                    
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })} */}
      {/* </View> */}
       {/* {index === 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={SECTIONS}
          renderItem={({item}) => <ListItem data={item} />}
          keyExtractor={item => item.key}
        />
      )} 
       {index === 1 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={SECTIONSONE}
          renderItem={({item}) => <ListItem data={item} />}
          keyExtractor={item => item.key}
        />
      )}  */}
       {/* {index === 2 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={SECTIONSTWO}
          renderItem={({item}) => <ListItem data={item} />}
          keyExtractor={item => item.key}
        />
      )} 
       {index === 3 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={SECTIONSTHREE}
          renderItem={({item}) => <ListItem data={item} />}
          keyExtractor={item => item.key}
        />
      )}  */}
      {/* <TouchableOpacity
        style={styles.scheduleNow}
        onPress={() => navigation.navigate('createActivity')}>
        <Text style={styles.scheduleNowText}>Schedule Now</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  tabHead: {
    flexDirection: 'row',
    marginVertical: 10,
    width: windowWidth / 1.2,
    alignSelf: 'center',
    // backgroundColor: 'red'
  },
  tabButton: {
    borderRadius: 6,
    width: 95,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    borderRadius: 6,
    width: 80,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5E6BFF',
  },
  tabText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#87859A',
    lineHeight: 20,
    textAlign: 'center',
  },
  tabTextActive: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 20,
    textAlign: 'center',
  },
  tabWrapper: {
    marginVertical: 10,
    backgroundColor: 'green',
    // width: windowWidth/1,
    height: windowHeight / 4,
    marginBottom: '5%',
    alignSelf: 'center',
  },
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
    justifyContent: 'space-evenly',
    backgroundColor: '#C8E7F0',
    // width: '50%',
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 5,
    height: 20,
    marginTop: 10,
    maxWidth: 110,
    alignItems: 'center',
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
  tabLocation: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
    margin: '4%',
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
  scheduleNow: {
    backgroundColor: '#5E6BFF',
    padding: 10,
    width: windowWidth / 1.5,
    margin: '2%',
    borderRadius: 10,
    marginBottom: '5%',
  },
  scheduleNowText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  timer: {
    backgroundColor: 'pink',
    width: '50%',
  },
});

export default ScheduleHome;
