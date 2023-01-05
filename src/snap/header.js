import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NewSnap from '../components/snap/NewSnap';
import LinearGradient from 'react-native-linear-gradient';
// import { updateFields } from "../redux/Post/actions";
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

let user = {
  userId: '6dddae20-5925-11ed-a555-c9afc10124e6',
  firstName: 'Danish',
  lastName: 'ali',
  photo: 'https://i.ibb.co/pyhjCBx/ffd493ff-fe15-4d19-b645-635cadbab9d1.jpg',
  countryCode: '91',
  phoneNumber: '7439240134',
  createdAt: '2022-10-31T14:08:01.029Z',
  updatedAt: '2022-11-03T05:37:14.544Z',
};

const Header = props => {
  const dispatch = useDispatch;
  const postState = useSelector(state => state.postState);
const authState = useSelector((state)=>state.authState)
  const {navigation} = props.navigation;

  const checkValidity = (val, fieldId) => {
    let isValid = true;

    if (fieldId === 'post' && val.length <= 3) {
      isValid = false;
    }

    console.log(val);

    dispatch(updateFields(val, fieldId, isValid));
  };
// console.log("cuh", authState)
  return (
    <View>
      <View style={styles.top}>
        <View style={styles.topBar}>
          <ImageBackground
            source={require('../assets/images/home-top-bg.png')}
            resizeMode="cover"
            style={styles.topContainer}>
            <View style={styles.menuContainer}>
              <Pressable
                onPress={() => navigation.openDrawer()}
                style={styles.menuWrapper}>
                <Image
                  style={styles.menuIcon}
                  source={require('../assets/images/menu-icon.png')}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('notifications')}
                style={styles.notifyWrapper}>
                <Image
                  style={styles.notifyIcon}
                  source={require('../assets/images/notify-icon.png')}
                />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('slambookHome')}
                style={styles.badgeWrapper}>
                <Image
                  style={styles.badgeIcon}
                  source={require('../assets/images/badge.png')}
                />
              </Pressable>
            </View>
            <View>
              <TouchableOpacity style={styles.profileInformation} onPress={()=>navigation.navigate('profileHome',{userId:authState.userId})}>
                <Image
                  source={{
                    uri: authState.profilePicture==""? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg':authState.profilePicture,
                  }}
                  style={styles.profileImage}
                />
                <Text style={styles.profileName}>{authState.name}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
      <View
        style={{
          marginTop: '10%',
          marginBottom: '5%',
          width: '100%',
          paddingBottom: 10,
          paddingHorizontal: 30,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('snapDetails')}>
          <NewSnap
          thoughts='Your thoughts'
            editable={false}
            navigation={navigation}
            handleChange={checkValidity}
          />
          <View style={{marginTop:'10%'}}>
            <Text style={styles.previousPost}>Previous Post</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
    width: width / 1,
    // flex:1,
    // backgroundColor: 'red'
  },
  topBar: {
    width: width / 1,
    // height: height / 5,
    // alignItems: 'flex-end',
  },
  profileInformation: {
    alignItems: 'center',
    marginTop: '10%',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 10,
    color: '#4e58ca',
  },
  thoughts: {
    width: '100%',
    height: 250,
  },
  thoughtsHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: 'black',
  },
  thoughtsBox: {
    borderColor: 'grey',
    borderRadius: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: '100%',

    borderColor: '#DDDDDD',
    backgroundColor: 'white',
  },
  thoughtsBoxInputViewBorder: {
    width: '100%',
    height: 160,
    backgroundColor: '#DDDDDD',
    borderRadius: 15,
    alignItems: 'center',
  },
  thoughtsBoxInputView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 159,
    backgroundColor: 'white',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    borderTopWidth: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: '#DDDDDD',
  },
  thoughtsBoxInput: {
    width: '98%',
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  thoughtBoxAttachments: {
    flexDirection: 'row',
    height: '30%',
    width: '100%',
    // height: height / 15,
  },
  attachmentBox: {
    alignItems: 'center',
    borderColor: 'grey',
    flex: 1,
    height: '100%',
    borderLeftWidth: 1,
    borderColor: '#DDDDDD',
  },
  attachmentBoxLeftCorner: {
    borderColor: 'grey',
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  attachmentBoxRightCorner: {
    flex: 1,
    height: '100%',
    borderLeftWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
  },
  topContainer: {
    // width: width/1,
    height: height / 3,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  menuWrapper: {
    marginLeft: 30,
  },
  menuIcon: {
    width: 30,
    height: 20,
  },
  notifyWrapper: {
    marginLeft: 'auto',
    marginRight: 30,
  },
  notifyIcon: {
    width: 24,
    height: 24,
  },
  badgeWrapper: {
    marginRight: 30,
  },
  badgeIcon: {
    width: 48,
    height: 48,
  },
  shareNowButton:{
    alignSelf: 'flex-end',
    width: width/3,
    height: height/14,
    marginTop: '5%'
      },
  buttonWrapper: {
    width: '100%',
    height: '70%',
    borderRadius: 5,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 20,
    textAlign: 'center',
  },
  previousPost: {
    fontSize: 22,
    color: '#000',
    marginLeft: '2%',
    fontWeight: 'bold'
        },
});

export default Header;
