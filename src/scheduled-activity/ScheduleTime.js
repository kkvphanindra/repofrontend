import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Pressable
} from 'react-native';
import React, {useState} from 'react';
import ProgressBar from 'react-native-progress/Bar';
import StackHeader from '../components/Activity/StackHeader';
import LinearGradient from 'react-native-linear-gradient';
import TimeRangePicker from 'react-native-range-timepicker';
import CalendarPicker from 'react-native-calendar-picker';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const ScheduleTime = ({navigation, route}) => {
  const {data} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const maxDate = moment(selectedEndDate).format('YYYY-MM-DD');
  const minDate = moment(selectedStartDate).format('YYYY-MM-DD');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
  let activityId = data.activityId;
  let activityName = data.activityName;
  let minTime=moment(startTime,"HH:mm").format('HH:mm')
  let maxTime=moment(endTime,"HH:mm").format('HH:mm')
  // console.log(
  //   'activityTypesId',
  //   data.activityId,
  //   'activityName',
  //   data.activityName,
  //   // data.activityId
  //   // date,
  //   // endDate,
  //   'date',
  //   dateR,
  //   'dateTime',
  //   dateTimeR,
  //   'endDate',
  //   endDateR,
  //   'endDateTime',
  //   endDateTimeR,
  //   // startDateTime,
  // );
  const sendData = {
    activityId,
    activityName,
    minDate,
    maxDate,
    minTime,
    maxTime,
  };
  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date), setSelectedEndDate(null);
    }
  };
  const modelClose = () => {
    setModalVisible(!modalVisible);
  };
  const onSelect = ({startTime, endTime}) => {
    setStartTime(startTime);
    console.log("startTime", startTime,endTime)
    setEndTime(endTime);
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
  };
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
          progress={startTime==''&&endTime==''?0.4:0.7}
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
              setModalVisible(true)
              // setVisible(true)
              // setModalVisible(true);
            }}>
            <Text style={styles.startDateButtonText}>
            {selectedStartDate ? minDate : 'YYYY-MM-DD'}{' '}{minTime!=='Invalid date'?minTime:'HH:MM'}
              {/* {startTime} */}
              {/* {stime} */}
              {/* {moment().format('hh:mm'),startTime} */}
              {/* {selectedStartDate ? minDate : 'YYYY/MM/DD'} */}
            </Text>
          </TouchableOpacity>
          <TimeRangePicker
              style={styles.timer}
              visible={visible}
              onClose={onClose}
              onSelect={onSelect}
            />
        </View>
        <View style={styles.startDate}>
          <Text style={styles.startDateText}>End Date & Time</Text>
          <View
            style={styles.startDateButton}>
            <Text style={styles.startDateButtonText}>
            {selectedEndDate ? maxDate : 'YYYY/MM/DD'}{' '}{maxTime!=='Invalid date'?maxTime:'HH:MM'}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.scheduleNow}
        onPress={() => {
          startTime ? (
            <>
              {endTime
                ? navigation.navigate('activityAssign', {data: sendData})
                // ? Alert.alert("you cn go ahead")
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
       <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                // minDate={new Date(2010, 1, 1)}
                // maxDate={new Date(2050, 12, 31)}
                width={width / 1.3}
                weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                months={[
                  'January',
                  'Febraury',
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
                ]}
                previousTitleStyle={{
                  color: '#000',
                  fontSize: 24,
                }}
                previousTitle="<"
                nextTitleStyle={{
                  color: '#000',
                  fontSize: 24,
                }}
                nextTitle=">"
                todayBackgroundColor="#000"
                selectedDayColor="#000"
                selectedDayTextColor="#fff"
                scaleFactor={375}
                textStyle={{
                  fontFamily: 'Cochin',
                  color: '#000000',
                  fontSize: 14,
                }}
                monthTitleStyle={{
                  // backgroundColor: 'pink',
                  fontWeight: '700',
                  fontSize: 18,
                }}
                yearTitleStyle={{
                  // backgroundColor: 'grey',
                  fontWeight: '700',
                  fontSize: 18,
                }}
                headerWrapperStyle={{
                  marginBottom: 20,
                  // paddingVertical: 20,
                }}
                onDateChange={onDateChange}
                dayLabelsWrapper={{
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  borderColor: 0,
                }}
              />
              <Pressable style={[styles.button]} onPress={() => {modelClose(),setVisible(true)}}>
                <Text style={styles.buttonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  modalView: {
    marginTop: 30,
    // backgroundColor: "pink",
    paddingHorizontal: 30,
    borderRadius: 40,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: 'center',
    marginVertical: 20,
    paddingVertical: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    // backgroundColor: "grey",
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
    elevation:5,
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
  button: {
    alignSelf: 'center',
    padding: 10,
    width: '40%',
    borderRadius: 10,
    backgroundColor: 'black',
  },
  buttonTextOk: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
