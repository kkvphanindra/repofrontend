import {
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
import Checkboxs from '../components/Activity/Checkbox';

const data =[
  {
    name:"GENERAL",
    id:"vhnu34bk876niikmbghy"
  },
  {
    name:"HONOUR",
    id:"mklothikkol6754nkom8"
  }
]
const ActivityCreate = ({navigation}) => {
  const [checked, setChecked] = useState('');
  console.log('checked', checked);
  return (
    <View style={styles.container}>
      <StackHeader
        IconLeftName="left"
        IconLeftSize={24}
        header="Create Activity"
        IconRightName="notifications-outline"
        IconRightSize={24}
        notification={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Activity Type</Text>
      </View>
      <View style={styles.progressBar}>
        <ProgressBar
          progress={0.2}
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
          Let's get started.{'\b'}Pick Your activity type{' '}
        </Text>
      </View>
      <View style={styles.activity}>
        {data.map((item)=>{
          return(
        <View style={styles.activityBox}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              setChecked(item.id)
            }}>
            {checked.includes(item.id) ? (
              <Image
                source={require('../assets/icons/png/icon-done.png')}
                style={styles.icon}
              />
            ) : (
              <Image
                source={require('../assets/icons/png/icon-done-2.png')}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.activityText}>{item.name}</Text>
        </View>
          )
        })}
      </View>
      <TouchableOpacity
        style={styles.scheduleNow}
        onPress={() => navigation.navigate('activitySelect')}>
        <LinearGradient
          style={styles.buttonWrapper}
          colors={['#5E6BFF', '#212FCC']}>
          <Text style={styles.buttonText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ActivityCreate;

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
  activity: {
    marginTop: '5%',
  },
  activityBox: {
    marginTop: '7%',
    marginLeft: '10%',
    borderColor: '#c4c4c4',
    borderWidth: 1,
    // paddingHorizontal:10,
    height: height / 7,
    width: width / 1.3,
    // paddingVertical: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  activityText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
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
  iconButton: {
    alignSelf: 'center',
    marginLeft: '5%',
    marginRight: '5%',
  },
  icon: {
    height: 30,
    width: 30,
    borderRadius: 100 / 2,
  },
});
