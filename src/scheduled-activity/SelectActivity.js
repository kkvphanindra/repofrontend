import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import ProgressBar from 'react-native-progress/Bar';
import StackHeader from '../components/Activity/StackHeader';
import LinearGradient from 'react-native-linear-gradient';

const SelectActivity = ({navigation, route}) => {
  const [select, setSelect] = useState(false);
  const [activityId,setActivityId]=useState('')
  const {activities} = route.params;
  const {activityType} = route.params;
  const [activityName, setActivityName] = useState('');
  const SelectAct = (name,id) => {
    setActivityName(name);
    setActivityId(id)
    // setSelect(true)
  };
  const details = {
    // activityTypeId: activityTypeId,
    activityName: activityName,
    activityId: activityId
  };
  console.log(
    'nk',
    activityName,
    select,
    activities,
    activityType,
    activityId
  );
  return (
    <View style={styles.container}>
      <ScrollView>
        <StackHeader
          IconLeftName="left"
          IconLeftSize={24}
          header="Create Activity"
          notification={false}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>{activityType}</Text>
        </View>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={activityName==''?0.2:0.4}
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
          <Text style={styles.started}>Choose Activity To Start </Text>
        </View>
        <View style={styles.activityView}>
          {activities.map(item => {
            return (
              <TouchableOpacity
                style={[
                  styles.activity,
                  activityName.includes(item.name)
                    ? {backgroundColor: '#5E6BFF'}
                    : {backgroundColor: '#fff'},
                ]}
                onPress={() => SelectAct(item.name,item.activityTypesId)}>
                <Text
                  style={[
                    styles.activityText,
                    activityName.includes(item.name)
                      ? {color: '#fff'}
                      : {color: '#000'},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.scheduleNow}
        onPress={() => {
          activityName != ''
            ? navigation.navigate('activitySchedule', {data: details})
            : Alert.alert('Please select a activity');
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

export default SelectActivity;

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
  activityView: {
    marginTop: '10%',
  },
  activity: {
    marginLeft: '10%',
    width: width / 1.3,
    height: height / 12,
    // marginTop: '5%',
    alignSelf: 'flex-start',
    alignContent: 'center',
    borderWidth: 1,
    marginBottom:'5%',
    // marginBottom: '5%',
    alignItems: 'center',
    borderRadius: 10,
    elevation:5,
    justifyContent: 'center',
    borderColor: '#c4c4c4',
  },
  activityText: {
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: '4%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginBottom: '5%',
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
