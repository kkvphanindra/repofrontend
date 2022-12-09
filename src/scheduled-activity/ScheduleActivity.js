import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import React from 'react';
import StackHeader from '../components/Activity/StackHeader';
import ScheduleActivityGroupMemberSelect from '../components/Activity/ScheduleActivityGroupMemberSelect';
import { useNavigation } from '@react-navigation/native';

const ScheduleActivity = ({route}) => {
  const { data } = route.params
  const navigation = useNavigation()
  const onSubmitHandler = async () => {
    console.log("object")
    try {
      let result = await axios
      .post(
      BASE_URL+`/api/activity`,
        {
          startDate: data.startDate,
          endDate: data.endDate,
          startTime: data.startTime,
          endTime: data.endTime,
          activityName: data.activityType,
          assignTo: data.assignTo,
          // groupName: data.groupType,
          // groupId: data.groupId,
          location: data.location,
          // users: selectedName,
          message: data.message,
          createdBy: data.createdBy
        },
      )
      if (result) {
        console.log("200", result.data)
        Alert.alert("Acitvity created successfully")
        navigation.navigate("activityHome")
      } 
    } catch (error) {
      console.log("error", error.response.data.message)
      Alert.alert("catching error", error.response.data.message)
    }
  }
  return (
    <View style={styles.container}>
    <StackHeader
      IconLeftName="left"
      IconLeftSize={24}
      header="Schedule Activity"
      IconRightName="notifications-outline"
      IconRightSize={24}
      notification={true}
    />
    <ScrollView>
          <View>
            <Text style={styles.activityName}>Activity Name</Text>
            <Text style={styles.activityNameText}>
              {data.activityType}
            </Text>
            <Text style={styles.date}>
              {/* {moment().format('Do MMMM YYYY',data.startDate)} {'\b'} */}
              {data.startDate}
              {'\b'}
              {'\b'}
              {'\b'}
              <Text style={styles.date}>{data.startTime}</Text>
            </Text>
            <Text style={styles.description}>
             {data.message}
            </Text>
          </View>
          { data.assignTo?
          <TouchableOpacity
          style={styles.scheduleNow}
          onPress={() => onSubmitHandler()}>
          {/* // onPress={()=>console.log("object")}> */}
          <Text style={styles.scheduleNowText}>Proceed to Schedule </Text>
        </TouchableOpacity>:
          <ScheduleActivityGroupMemberSelect {...data}/>
          }
    </ScrollView>
  </View>
  );
};

export default ScheduleActivity;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  activityName: {
    marginTop: '5%',
    marginLeft: '9%',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#000',
  },
  activityNameText: {
    marginTop: '1%',
    marginLeft: '9%',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#000',
    marginBottom: '5%',
  },
  date: {
    marginTop: '5%',
    marginLeft: '9%',
    fontSize: 12,
    color: '#000',
    fontWeight: '500',
  },
  description: {
    marginTop: '1%',
    marginLeft: '9%',
    width: '90%',
    color: 'grey',
    fontSize: 14,
  },
  scheduleNow: {
    backgroundColor: '#5E6BFF',
    padding: 10,
    width: windowWidth / 1.5,
    marginTop: '35%',
    alignSelf: 'center',
    borderRadius: 10,
    // marginBottom: '5%'
},
scheduleNowText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
}
});
