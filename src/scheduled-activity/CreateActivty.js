import {
  Modal,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  TextInput,
  PermissionsAndroid
} from 'react-native';
import React, {useState, useEffect} from 'react';
import StackHeader from '../components/Activity/StackHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';
import SelectList from 'react-native-dropdown-select-list';
import TimeRangePicker from 'react-native-range-timepicker';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DropDownPicker from 'react-native-dropdown-picker';
import {Checkbox} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import {
  activityName,
  groupName,
  newActivity,
  newActivityByUserId,
} from '../redux/activity/action';
import LocationIQ from 'react-native-locationiq';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const CreateActivty = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const authState = useSelector((state)=> state.authState)
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState();
  const [selectedEndDate, setSelectedEndDate] = useState();
  const maxDate = moment(selectedEndDate).format('YYYY/MM/DD');
  const minDate = moment(selectedStartDate).format('YYYY/MM/DD');
  const [visible, setVisible] = useState(false);
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [Location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [checked, setChecked] = useState(null);
  const [activityN, setActivityN] = useState('');
  const activityState = useSelector(state => state.activityState);
  const [groupN, setGroupN] = useState('');
  const [groupId, setGroupId] = useState('');
  const [text, settext] = useState();
  const dispatch = useDispatch();
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
    setStart(startTime);
    setEnd(endTime);
    setVisible(false);
  };

  const onClose = () => {
    setVisible(false);
  };
    var id = authState.userId;
  LocationIQ.init('pk.9258ab5f6e3604f3f0a08054a0b92c48');

  const getCurrentPosition = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          pos => {
            setLat(JSON.stringify(pos.coords.latitude));
            setLong(JSON.stringify(pos.coords.longitude));
            // setPosition([lat,long])
            // setPosition(JSON.stringify(pos.coords.latitude));
          },
          // error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
          error =>
            console.log('GetCurrentPosition Error', JSON.stringify(error)),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      }
    });
  };
  //   LocationIQ.reverse({
  //     lat,
  //     long,
  // 22.611269,88.385879
  // });
  LocationIQ.reverse(lat, long)
    .then(json => {
      var address = json.address.city;
      // console.log(address);
      setLocation(address);
    })
    .catch(error => console.warn(error));
  // console.log("city")
  useEffect(() => {
    dispatch(activityName());
    dispatch(groupName());
  }, [dispatch]);
  const press = selectedItem => {
    let d = activityState.groupName.filter(i => i.key === selectedItem);
    let e = d?.[0]?.key;
    let f = d?.[0]?.value;
    setGroupN(f);
    setGroupId(e);
    console.log(e, f);
  };

  const handleCheck = id => {
    setChecked(!checked ? id : null);
  };
  const createActivity = {
    startDate: minDate,
    endDate: maxDate,
    startTime: start,
    endTime: end,
    activityType: activityN,
    assignTo: checked,
    groupType: groupN,
    location: Location,
    message: text,
    groupId: groupId,
    createdBy: id,
  };

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
       <ScrollView>
        <Text style={styles.createActivity}>Create Activty</Text>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: '4%',
            marginTop: '5%',
          }}>
          <View style={styles.startDate}>
            <Text style={styles.startDateText}>Start Date</Text>
            <TouchableOpacity
              style={styles.startDateButton}
              onPress={() => {setModalVisible(true), console.log("modal", modalVisible)}}>
              <Text style={styles.startDateButtonText}>
                {selectedStartDate ? minDate : 'YYYY/MM/DD'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.startDate} onPress={() => setModalVisible(true)}>
            <Text style={styles.startDateText}>End Date</Text>
            <TouchableOpacity style={styles.startDateButton}>
              <Text style={styles.startDateButtonText}>
                {selectedEndDate ? maxDate : 'YYYY/MM/DD'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: '4%',
            marginTop: '5%',
          }}>
          <View style={styles.startDate}>
            <Text style={styles.startDateText}>Start Time</Text>
            <TouchableOpacity
              style={styles.startDateButton}
              onPress={() => {
                setVisible(true);
              }}>
              <Text style={styles.startDateButtonText}>
                {start ? start : 'Select'}
              </Text>
            </TouchableOpacity>
            <TimeRangePicker
              style={styles.timer}
              visible={visible}
              onClose={onClose}
              onSelect={onSelect}
            />
          </View>
          <View style={styles.startDate} onPress={() => setVisible(true)}>
            <Text style={styles.startDateText}>End Time</Text>
            <TouchableOpacity style={styles.startDateButton}>
              <Text style={styles.startDateButtonText}>
                {start ? end : 'Select'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
         <View style={styles.activity}>
          <Text style={styles.startDateText}>Activity Name</Text>
            <SelectList
            // onSelect={() => activity()}
            onSelect={() => console.log('object', activityN)}
            setSelected={setActivityN}
            data={activityState.activityName}
            arrowicon={
              <FontAwesome name="chevron-down" size={12} color={'black'} />
            }
            searchicon={<FontAwesome name="search" size={12} color={'black'} />}
            search={false}
            placeholder="Select Activity"
            boxStyles={{
              marginTop: '4%',
              borderRadius: 10,
              width: '90%',
              backgroundColor: '#f7f7f7',
              borderColor: '#f7f7f7',
              color: '#000',
            }}
            inputStyles={{
              color: 'grey',
            }}
            dropdownStyles={{
              width: '90%',
              borderColor: '#f7f7f7',
              backgroundColor: '#f7f7f7',
            }}
            dropdownItemStyles={{
              backgroundColor: '#f7f7f7',
            }}
            dropdownTextStyles={{
              color: 'grey',
            }}
          />  
        </View>
         <View style={styles.assignTo}>
          <Text style={styles.assignToText}>Assign to</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.self}>SELF</Text>
            <View
              style={{marginTop: '3%', marginLeft: '5%', alignSelf: 'center'}}>
              <Checkbox
                color="#636DD9"
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => handleCheck(id)}
              />
            </View>
          </View>
        </View>
        {checked ? null : (
          <View style={styles.activity}>
            <Text style={styles.startDateText}>Group</Text>
             <SelectList
              onSelect={() => console.log('group name selected', groupN)}
              // onSelect={press}
              setSelected={press}
              // save="value"
              // setSelected={activityState.groupName.map((i)=>i.value)}
              data={activityState.groupName}
              arrowicon={
                <FontAwesome name="chevron-down" size={12} color={'black'} />
              }
              searchicon={
                <FontAwesome name="search" size={12} color={'black'} />
              }
              search={false}
              placeholder="Select Group"
              boxStyles={{
                marginTop: '4%',
                borderRadius: 10,
                width: '90%',
                backgroundColor: '#f7f7f7',
                borderColor: '#f7f7f7',
              }}
              inputStyles={{
                color: 'grey',
              }}
              dropdownStyles={{
                width: '90%',
                borderColor: '#f7f7f7',
                // backgroundColor: '#fff',
                backgroundColor: '#f7f7f7',
              }}
              dropdownItemStyles={{
                backgroundColor: '#f7f7f7',
              }}
              dropdownTextStyles={{
                color: 'grey',
              }}
            /> 
          </View>
         )} 
        <View style={styles.activity}>
          <Text style={styles.startDateText}>Location</Text>
          <TouchableOpacity
            onPress={() => getCurrentPosition()}
            style={{
              marginTop: '4%',
              borderRadius: 10,
              width: '90%',
              backgroundColor: '#f7f7f7',
              borderColor: '#f7f7f7',
            }}>
            <Text
              style={{
                paddingVertical: 13,
                paddingHorizontal: 15,
                color: 'grey',
              }}>
              {Location ? Location : 'Select Location'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activity}>
          <Text style={styles.startDateText}>Message</Text>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="grey"
            multiline
            numberOfLines={5}
            onChangeText={settext}
            value={text}
          />
        </View>
        <TouchableOpacity
          style={styles.scheduleNow}
          onPress={() =>
            navigation.navigate('scheduleActivity', {data: createActivity})
          }>
              <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                            <Text style={styles.buttonText}>
                                Schedule Now
                            </Text>
                        </LinearGradient>
          {/* <Text style={styles.scheduleNowText}>Schedule Now</Text> */}
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
                width={windowWidth / 1.3}
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
              <Pressable style={[styles.button]} onPress={() => modelClose()}>
                <Text style={styles.buttonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView> 
    </View>
  );
};

export default CreateActivty;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  createActivity: {
    marginLeft: '9%',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#000',
    marginTop: '5%',
  },
  startDate: {
    width: '40%',
    marginLeft: '5%',
  },
  startDateText: {
    fontSize: 12,
    color: '#808089',
    fontWeight: '500',
  },
  startDateButton: {
    backgroundColor: '#F7F7F7',
    padding: 12,
    marginTop: '7%',
    borderRadius: 10,
  },
  startDateButtonText: {
    color: 'grey',
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
  button: {
    alignSelf: 'center',
    padding: 10,
    width: '40%',
    borderRadius: 10,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  activity: {
    marginLeft: '9%',
    marginTop: '5%',
  },
  activityDropdown: {
    backgroundColor: '#F7F7F7',
    // padding: 5,
    // marginTop: '3%',
    borderRadius: 10,
    // width: '90%',
    alignSelf: 'flex-start',
    borderColor: '#f7f7f7',
  },
  assignTo: {
    marginTop: '10%',
    marginLeft: '9%',
  },
  assignToText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    letterSpacing: 0.5,
  },
  self: {
    marginTop: '5%',
    // marginLeft: '9%',
    color: 'grey',
    fontSize: 14,
  },
  input: {
    height: 140,
    marginTop: '4%',
    width: '90%',
    borderRadius: 10,
    color: 'grey',
    backgroundColor: '#F7F7F7',
    // borderWidth: 1,
    padding: 10,
  },
  scheduleNow: {
    // backgroundColor: '#5E6BFF',
    padding: 10,
    width: windowWidth / 1.5,
    marginTop: '5%',
    alignSelf: 'center',
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
    color: '#000',
  },
  dropdownStyle: {
    width: 100,
    borderColor: '#f7f7f7',
    // backgroundColor: '#fff',
    backgroundColor: '#f7f7f7',
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
});
