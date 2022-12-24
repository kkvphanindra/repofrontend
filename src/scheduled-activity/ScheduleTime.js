import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ProgressBar from 'react-native-progress/Bar';
import StackHeader from '../components/Activity/StackHeader';
import LinearGradient from 'react-native-linear-gradient';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const ScheduleTime = ({navigation, route}) => {
  const {data} = route.params
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const [open, setOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  console.log(
    'date',
    data.activityId,
    // data.activityId
    // date,
    // moment(date).format('YYYY/MM/DD HH:MM a'),
    // startDateTime,
  );
  return (
    <View style={styles.container}>
      <StackHeader
        IconLeftName="left"
        IconLeftSize={24}
        header="Create Activity"
        notification={false}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Schedule Time</Text>
      </View>
      <View style={styles.progressBar}>
        <ProgressBar
          progress={0.7}
          width={width / 1.3}
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
          Choose when to kick start your activity{' '}
        </Text>
      </View>
      <View style={styles.activity}>
        <View style={styles.startDate}>
          <Text style={styles.startDateText}>Start Date & Time</Text>
          <TouchableOpacity
            style={styles.startDateButton}
            // onPress={()=>console.log("object")}
            onPress={() => {
              setOpen(true);
              // setModalVisible(true);
            }}>
            <Text style={styles.startDateButtonText}>
              {startDateTime}
              {/* {selectedStartDate ? minDate : 'YYYY/MM/DD'} */}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setStartDateTime(moment(date).format('YYYY/MM/DD hh:mm a'));
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={styles.startDate}>
          <Text style={styles.startDateText}>End Date & Time</Text>
          <TouchableOpacity
            style={styles.startDateButton}
            // onPress={()=>console.log("object")}
            onPress={() => {
              // setModalVisible(true);
              setEndOpen(true);
            }}>
            <Text style={styles.startDateButtonText}>
              {endDateTime}
              {/* {selectedStartDate ? minDate : 'YYYY/MM/DD'} */}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={endOpen}
            date={endDate}
            onConfirm={date => {
              setEndOpen(false);
              setEndDate(date);
              setEndDateTime(moment(date).format('YYYY/MM/DD  hh:mm a'));
            }}
            onCancel={() => {
              setEndOpen(false);
            }}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.scheduleNow}
        onPress={() => {
          startDateTime ? (
            <>
              {endDateTime
                ? navigation.navigate('activityAssign')
                : Alert.alert('Please select end Time')}
            </>
          ) : (
            Alert.alert('Please select Date Time')
          );
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

export default ScheduleTime;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignSelf: 'center',
    marginBottom: '5%',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#000',
  },
  progressBar: {
    alignSelf: 'center',
  },
  activityHeader: {
    marginTop: '8%',
    marginLeft: '11%',
  },
  started: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  startDate: {
    width: '80%',
    // alignSelf: 'center',
    marginLeft: '10%',
  },
  startDateText: {
    fontSize: 16,
    marginTop: '5%',
    // color: '#808089',
    color: '#000',
    fontWeight: '500',
  },
  startDateButton: {
    backgroundColor: '#F7F7F7',
    padding: 12,
    marginTop: '5%',
    borderRadius: 10,
  },
  startDateButtonText: {
    color: 'grey',
  },
  activity: {
    marginTop: '5%',
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
});
