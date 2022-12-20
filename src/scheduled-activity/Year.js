import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation,useFocusEffect} from '@react-navigation/native';
import {getAllActivityByUserId} from '../redux/activity/action';
import {useSelector, useDispatch} from 'react-redux';
import {useCallback} from 'react';
import Flatlist from '../components/Activity/Flatlist';


const Year = () => {
  const navigation = useNavigation();
  const [year,setYear]=useState(true)
  const authState = useSelector((state)=>state.authState)
  const activityState = useSelector((state)=>state.activityState);
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        // console.log('year screen', year);
        dispatch(getAllActivityByUserId(authState.userId,null, null, null, year)); // replace with your function
      }
    }, [dispatch, navigation.isFocused()]),
  );
  return (
    <View style={styles.container}>
     <ScrollView>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={activityState.data}
          renderItem={(item) => <Flatlist data={item}/>}
          keyExtractor={item => item.key}
        />
      </ScrollView>
  </View>
  )
}

export default Year;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    // height: 
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
})