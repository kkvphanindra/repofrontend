import { ScrollView, StyleSheet, Text, View,Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import StackHeader from '../components/Activity/StackHeader'
import ScheduleHome from '../components/schedule-home'
import TopTabNavigator from './topTabNavigator'
import moment from 'moment';


const ActivityHome = ({navigation}) => {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const d = new Date();
  let mo = month[d.getMonth()];
  let year = d.getFullYear();
  let date = moment(new Date()).format('Do')
  let day = weekday[d.getUTCDay()];
  return (
    <View style={styles.container}>
      <StackHeader
        IconLeftName="left"
        IconLeftSize={24}
        header="Huddle Play"
        IconRightName="notifications-outline"
        IconRightSize={24}
        notification={true}
      />
      {/* <ScrollView> */}
      <Text style={styles.monthYear}>
        {mo} {year}
      </Text>
      <Text style={styles.date}>{date} - {day}</Text>
      <TopTabNavigator />
      <TouchableOpacity
        style={styles.scheduleNow}
        onPress={() => navigation.navigate('createActivity')}>
           <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                            <Text style={styles.buttonText}>
                                Schedule Now
                            </Text>
                        </LinearGradient>
        {/* <Text style={styles.scheduleNowText}>Schedule Now</Text> */}
      </TouchableOpacity>
    </View>
  )
}

export default ActivityHome

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: '#fff'
    },
    monthYear: {
        marginTop: '5%',
        marginLeft: '9%',
        fontSize:20,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: '#000'
    },
    date: {
        marginTop: '1%',
        marginLeft: '9%',
        fontSize:16,
        fontWeight: '600',
        letterSpacing: 0.5,
        color: '#000',
        marginBottom: '5%'
    },
    scheduleNow: {
      // backgroundColor: '#5E6BFF',
      padding: 10,
      width: windowWidth / 1.5,
      marginTop: '2%',
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
      // height: '100%',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonText: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '600',
      color: '#FFF',
      lineHeight: 20,
      textAlign: 'center'
  }
})