import React, {useEffect, useState} from 'react';
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
  Image,
  TextInput,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useValidation} from 'react-native-form-validator';
import {DrawerActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {slambookFillUp, updateSlambookStatus} from '../redux/Slambook/action';

const {width, height} = Dimensions.get('window');

const SlambookForm = ({navigation, route}) => {
  const {invitedBy} = route.params;
  const [fullName, setFullName] = useState('');
  const [friendsCallMe, setFriendsCallMe] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [bestfriend, setBestfriend] = useState('');
  const [happeistMomentOfLife, setHappeistMomentOfLife] = useState('');
  const [threePlaceYouWantToSeeBeforeDie, setThreePlaceYouWantToSeeBeforeDie] =
    useState('');
  const authState = useSelector(state => state.authState);
  const slambookState = useSelector(state => state.slambookState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateSlambookStatus(invitedBy, authState.userId, 'IN-PROGRESS'));
  }, [dispatch]);
  let arr = [];
  const threeDemand = text => {
    if (text !== undefined) {
      setThreePlaceYouWantToSeeBeforeDie(text);
    }
};
arr = threePlaceYouWantToSeeBeforeDie.split(',');
// console.log('arr', arr);
  const saveForm = () => {
    dispatch(updateSlambookStatus(invitedBy, authState.userId, 'IN-PROGRESS'));
    dispatch(
      slambookFillUp(
        invitedBy,
        authState.userId,
        fullName,
        friendsCallMe,
        dob,
        email,
        bestfriend,
        happeistMomentOfLife,
        arr,
      ),
    );
    navigation.goBack()
  };
  const InviteSubmit = () => {
    dispatch(updateSlambookStatus(invitedBy, authState.userId, 'COMPLETED'));
    dispatch(
        slambookFillUp(
          invitedBy,
          authState.userId,
          fullName,
          friendsCallMe,
          dob,
          email,
          bestfriend,
          happeistMomentOfLife,
          arr,
        ),
      );
      navigation.goBack()
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/offer-bg-top.png')}
          resizeMode="cover"
          style={styles.topContainer}>
          <View style={styles.wrapper}>
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={styles.iconWrapper}>
              <Image
                style={styles.arrowIcon}
                source={require('../assets/images/menu-icon.png')}
              />
            </Pressable>
            <Text style={styles.title}>Slambook Form</Text>
            <Pressable
              onPress={() => navigation.navigate('notifications')}
              style={styles.notifyWrapper}>
              <Image
                style={styles.notifyIcon}
                source={require('../assets/images/notify-icon.png')}
              />
            </Pressable>
          </View>
        </ImageBackground>
        <View style={styles.picContainer}>
          <Image
            style={styles.imageHolder}
            source={require('../assets/images/picture-2.png')}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.formFlex}>
            <Text style={styles.formLabel}>Full Name</Text>
            <TextInput style={styles.formField}
            value={fullName}
            onChangeText={(e)=>setFullName(e)}
            />
          </View>
          <View style={styles.formFlex}>
            <Text style={styles.formLabel}>Friends Call me</Text>
            <TextInput style={styles.formField} 
            value={friendsCallMe}
            onChangeText={(e)=>setFriendsCallMe(e)}
            />
          </View>
          <View style={styles.formFlex}>
            <Text style={styles.formLabel}>DOB</Text>
            <TextInput style={styles.formField} 
              value={dob}
              onChangeText={(e)=>setDob(e)}
            />
          </View>
          <View style={styles.formFlex}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput style={styles.formField}
              value={email}
              onChangeText={(e)=>setEmail(e)}
            />
          </View>
          <View style={styles.formFlex}>
            <Text style={styles.formLabel}>Bestfriend</Text>
            <TextInput style={styles.formField} 
              value={bestfriend}
              onChangeText={(e)=>setBestfriend(e)}
            />
          </View>
          <View style={styles.formFlex}>
            <Text style={styles.formLabel}>Happiest moment of life</Text>
            <TextInput style={styles.formField} 
              value={happeistMomentOfLife}
              onChangeText={(e)=>setHappeistMomentOfLife(e)}
            />
          </View>
          <View style={styles.formFlex}>
            <Text style={styles.formLabel}>
              3 Places you want to see before die
            </Text>
            <TextInput
              value={threePlaceYouWantToSeeBeforeDie}
              onChangeText={e => threeDemand(e)}
              multiline
              numberOfLines={4}
              style={[
                styles.formField,
                {height: 200, textAlignVertical: 'top'},
              ]}
            />
          </View>
          <View style={styles.formFlexSubmit}>
            <Pressable onPress={() => saveForm()} style={styles.saveBtn}>
              <Text style={styles.saveBtnText}>Save</Text>
            </Pressable>
            <Pressable onPress={() => InviteSubmit()} style={styles.inviteBtn}>
              <LinearGradient
                style={styles.buttonWrapper}
                colors={['#5E6BFF', '#212FCC']}>
                <Text style={styles.inviteBtnText}>Submit</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'column',
  },
  topContainer: {
    width: width,
    height: 188,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 20,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyWrapper: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 20,
  },
  notifyIcon: {},
  title: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    lineHeight: 30,
    textAlign: 'center',
    paddingTop: 10,
    marginLeft: 'auto',
  },
  picContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  imageHolder: {
    width: 170,
    height: 170,
    borderRadius: 60,
    position: 'absolute',
    top: -85,
  },
  formContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  formFlex: {
    width: '80%',
    marginVertical: 10,
  },
  formLabel: {
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: '400',
    color: '#2C2948',
    lineHeight: 25,
    paddingBottom: 10,
  },
  formField: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    color: '#2C2C2C',
    lineHeight: 30,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
  },
  formFlexSubmit: {
    flexDirection: 'row',
    marginVertical: 30,
    justifyContent: 'space-around',
  },
  saveBtn: {
    width: 150,
    height: 60,
    borderColor: '#5B67CA',
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  saveBtnText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#5B67CA',
    lineHeight: 20,
  },
  inviteBtn: {
    width: 150,
    height: 60,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inviteBtnText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
    lineHeight: 20,
  },
});

export default SlambookForm;
