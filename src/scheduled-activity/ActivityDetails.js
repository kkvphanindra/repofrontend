import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useEffect} from 'react'
import StackHeader from '../components/Activity/StackHeader'
import {useDispatch, useSelector} from 'react-redux';
import ActivityDetailsGroupName from '../components/Activity/ActivityDetailsGroupName'
import { ScrollView } from 'react-native-gesture-handler'
import {
    activityByActivityId,
    userStatusByactivityId,
  } from '../redux/activity/action';
  import moment from 'moment';
  import { useNavigation } from '@react-navigation/native';

const ActivityDetails = ({ route }) => {
     const {activityDetails} = route.params;
    const navigation = useNavigation()
    const activityState = useSelector(state => state.activityState);
    const dispatch = useDispatch();
    const authId = '3ac1df80-5a6e-11ed-a871-7d8265a60df7';
    useEffect(() => {
      dispatch(activityByActivityId(activityDetails.id));
    }, [dispatch]);
    console.log(
      'id',
      activityDetails.id,
      activityState.data[0].createdBy,
      activityState.data[0].users.map(i => i.userId === authId)
    );
    const acceptedStatus = (activityId, userId) => {
      let accepted = 'ACCEPTED';
      dispatch(userStatusByactivityId(accepted, activityId, userId));
      Alert.alert("Activity Accepted")
      navigation.navigate('activityHome')
    };
    const declinedStatus = (activityId, userId) => {
      let declined = 'DECLINED';
      dispatch(userStatusByactivityId(declined, activityId, userId));
      Alert.alert("Activity Declined")
      navigation.navigate('activityHome')
    };
    return (
        <View style={styles.container}>
        {/* {activityState.loading? 
      <ActivityIndicator size='large' color='blue'/>
      : */}
  <View>
        <StackHeader
          IconLeftName="left"
          IconLeftSize={24}
          header="Activity Details"
          IconRightName="notifications-outline"
          IconRightSize={24}
          notification={true}
        />
        <ScrollView>
          <Text style={styles.activityName}>Activity Name</Text>
          <Text style={styles.activityNameText}>
            {activityDetails.activityName}
          </Text>
          <Text style={styles.date}>
            {moment(activityDetails.startDate).format('Do MMMM YYYY')} {'\b'}
            {console.log("object id ac",activityDetails.id)}
            {'\b'}
            {'\b'}
            {'\b'}
            <Text style={styles.date}>
              {/* {moment(activityDetails.startDate).format('Do MMMM YYYY')} */}
              {activityDetails.startTime}
            </Text>
          </Text>
          <Text style={styles.description}>{activityDetails.message}</Text>
          {activityDetails.assignTo === null ? (
            <View>
              {activityState.data[0].createdBy === authId ? null : (
                <View>
                  {activityState.data[0].users.find(
                    i => i.status === 'ACCEPTED',
                  ) ? null : (
                    <View>
                      {activityState.data[0].users.find(
                        i => i.status === 'DECLINED',
                      )? null : 
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: '5%',
                        marginLeft: '9%',
                      }}>
                      <TouchableOpacity
                        style={styles.accept}
                        onPress={() =>
                          acceptedStatus(activityDetails.id, authId)
                        }>
                        <Text style={styles.acceptText}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.decline}
                        onPress={() =>
                          declinedStatus(activityDetails.id, authId)
                        }>
                        <Text style={styles.declineText}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                      }
                    </View>
                  )}
                </View>
              )}
            </View>
          ) : null}
          <ActivityDetailsGroupName {...activityDetails} />
        </ScrollView>
        </View>
      {/* } */}
      </View>
    )
}

export default ActivityDetails

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
    accept: {
      backgroundColor: '#78CB7C',
      width: '30%',
      marginRight: '5%',
      padding: 6,
      borderRadius: 20,
    },
    acceptText: {
      fontSize: 14,
      color: '#fff',
      alignSelf: 'center',
      fontWeight: '600',
    },
    decline: {
      backgroundColor: '#FD8B7A',
      width: '30%',
      marginRight: '5%',
      padding: 6,
      borderRadius: 20,
    },
    declineText: {
      fontSize: 14,
      color: '#fff',
      alignSelf: 'center',
      fontWeight: '600',
    },
  });