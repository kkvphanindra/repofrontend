import React, {useState, useEffect, useCallback} from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllActivityByUserId} from '../redux/activity/action';

const {width, height} = Dimensions.get('window');

const ScheduleHome = () => {
  const navigation = useNavigation();
  const activityState = useSelector(state => state.activityState);
  const authState = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const [today, setToday] = useState(true);
  const [week, setWeek] = useState(true);
  const [month, setMonth] = useState(true);
  const [year, setYear] = useState(true);
  const [index, setIndex] = useState(0);
  const calender = ['Day', 'Week', 'Month', 'Year'];
  // console.log("schedule home",activityState.data.length,activityState.data)
  useEffect(()=>{
    if (index == ""||index==0) {
    dispatch(getAllActivityByUserId(authState.userId, today,null,null,null))
    }
},[dispatch])
//   useFocusEffect(
//     useCallback(async() => {
//       if (navigation.isFocused()) {
//         console.log("today is true",index==""?'hey':'no hey',index==null?'hey said ': 'no hey said',index==0?'hey hey':'no no no hey')
//         // console.log("before hook today", today)
//         if (index == "") {
//          await dispatch(
//             getAllActivityByUserId(authState.userId, today, null, null, null),
//           ); // replace with your function
//         }
//       }
//     }, [dispatch, navigation.isFocused(), index]),
//   );
  const indexSelected = i => {
    if (i == 0) {
      // console.log("in1",index, i)
      dispatch(
        getAllActivityByUserId(authState.userId, today, null, null, null),
      );
    } else if (i == 1) {
      dispatch(
        getAllActivityByUserId(authState.userId, null, week, null, null),
      );
      // console.log("in2",index, i)
    } else if (i == 2) {
      dispatch(
        getAllActivityByUserId(authState.userId, null, null, month, null),
      );
      // console.log("in3",index, i)
    } else if (i == 3) {
      dispatch(
        getAllActivityByUserId(authState.userId, null, null, null, year),
      );
      // console.log("in4",index, i)
    }
  };
  const getItem = (data, index) =>
    // console.log('data',data),
    ({
      id: data[index].id,
      activityName: data[index].activityName,
      startTime: data[index].startTime,
      endTime: data[index].endTime,
      location: data[index].location,
      users: data[index].users,
      message: data[index].message,
      startDate: data[index].startDate,
      endDate: data[index].endDate,
      pic: data[index].pic,
    });
  const getItemCount = data => activityState.data.length;
  const ListItem = ({data}) => {
    // console.log('item', data.users)
    return (
      <View style={styles.tabContent} key={data.id}>
        <View style={{backgroundColor: '#8F99EB', width: 2, height: 44}}></View>
        <View style={styles.tabContentWrapper}>
          <View style={styles.topContentWrapper}>
            <View style={styles.topTitleWrapper}>
              <Text style={styles.tabTitle}>{data.activityName}</Text>
              <Text style={styles.tabLabel}>
                {data.startTime}-{data.endTime}
              </Text>
            </View>
            <Pressable
              onPress={() => navigation.navigate('activityDetails',{activityDetails: data})}
              style={styles.tabViewWrapper}>
              <Image source={require('../assets/images/dot-menu.png')} />
            </Pressable>
          </View>
          <View style={styles.tabLocationWrapper}>
            <Image
              style={styles.icon}
              source={require('../assets/images/location-icon.png')}
            />
            <Text style={styles.tabLocation}>{data.location}</Text>
          </View>
              <View style={styles.tabViewWrapper2}>
          {data?.users?.slice(0,4).map((photo)=>{
            // console.log("122", data)
            return(
              // <Text>holl</Text>
              <Image style={styles.groupIcon} source={{uri:photo?.profilePicture==""?'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg':photo?.profilePicture}} />
              )
            })}
             {data?.users?.length > 4 ? (
                <View style={styles.groupIcon}>
                  <Text style={styles.groupIconText}>+{img.length - 4}</Text>
                </View>
              ) : null}
              </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.tabHead}>
        {calender.length &&
          calender.map((e, i) => {
            return (
              <TouchableHighlight
                key={i}
                style={styles.tabBox}
                activeOpacity={1}
                underlayColor=""
                onPress={() => {
                  setIndex(i);
                  indexSelected(i);
                }}>
                <View
                  style={[
                    styles.tabButton,
                    index === i && styles.tabButtonActive,
                  ]}>
                  <Text
                    style={[
                      styles.tabText,
                      index === i && styles.tabTextActive,
                    ]}>
                    {e}
                  </Text>
                </View>
              </TouchableHighlight>
            );
          })}
      </View>
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          {index === 0 && (
            <VirtualizedList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={activityState.data}
              initialNumToRender={4}
              renderItem={({item}) => <ListItem data={item} />}
              // keyExtractor={item => item.key}
              getItemCount={getItemCount}
              getItem={getItem}
            />
          )}
          {index === 1 && (
            <VirtualizedList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={activityState.data}
              initialNumToRender={4}
              renderItem={({item}) => <ListItem data={item} />}
              // keyExtractor={item => item.key}
              getItemCount={getItemCount}
              getItem={getItem}
            />
          )}
          {index === 2 && (
            <VirtualizedList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={activityState.data}
              initialNumToRender={4}
              renderItem={({item}) => <ListItem data={item} />}
              // keyExtractor={item => item.key}
              getItemCount={getItemCount}
              getItem={getItem}
            />
          )}
          {index === 3 && (
            <VirtualizedList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={activityState.data}
              initialNumToRender={4}
              renderItem={({item}) => <ListItem data={item} />}
              // keyExtractor={item => item.key}
              getItemCount={getItemCount}
              getItem={getItem}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
  },
  tabHead: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  tabBox: {},
  tabButton: {
    borderRadius: 6,
    width: 80,
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
    marginVertical: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    // height: 200
  },
  tabScrollContainer: {
    flexDirection: 'row',
  },
  tabContent: {
    width: 238,
    height: 160,
    backgroundColor: '#F9FAFD',
    borderRadius: 15,
    marginHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  tabContentWrapper: {
    flexDirection: 'column',
    marginLeft: 20,
    width: '100%',
  },
  topContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topTitleWrapper: {
    flexDirection: 'column',
  },
  tabViewWrapper: {
    width: 50,
    height: 50,
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
  tabViewWrapper2: {
    // width: 40,
    // height: 40,
    marginTop: 10,
    // backgroundColor: 'pink',
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // left: 5,
    flexDirection: 'row',
  },
  tabLocationWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#C8E7F0',
    borderRadius: 18,
    height: 20,
    marginTop: 20,
    maxWidth: 110,
    alignItems: 'center',
  },
  tabLocation: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
  },
  groupIcon: {
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    backgroundColor: 'red',
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

export default ScheduleHome;
