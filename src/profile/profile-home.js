import {DrawerActions} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect} from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import ShareMoment from '../components/share-moment';
import NewSnap from '../components/snap/NewSnap';
import {getAllFriends, getAllGroupDetailsByUserId} from '../redux/auth/action';
import { getAllPostsByUserId } from '../redux/Post/actions';
import Header from '../snap/header';
const {width, height} = Dimensions.get('window');

const ProfileHome = ({navigation, route}) => {
  const authState = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const {userId} = route.params;
  const postState=useSelector((state)=>state.postState)
  // const {navigation} = props.navigation;

  const checkValidity = (val, fieldId) => {
    let isValid = true;

    if (fieldId === 'post' && val.length <= 3) {
      isValid = false;
    }

    console.log(val);

    dispatch(updateFields(val, fieldId, isValid));
  };
  useEffect(() => {
    dispatch(getAllGroupDetailsByUserId(userId));
    dispatch(getAllPostsByUserId(userId))
    dispatch(getAllFriends(userId))
  }, [dispatch]);
//   console.log(
//     'object',
//     postState.data
//     // authState.groupDetails.map(i => i),
//   );
console.log("first", authState?.userDetails)
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          <ImageBackground
            source={require('../assets/images/home-top-bg.png')}
            resizeMode="cover"
            style={styles.topContainer}>
            <View style={styles.menuContainer}>
              <Pressable
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
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
            <View style={styles.profileContainer}>
              <ImageBackground
                source={require('../assets/images/home-profile.png')}
                resizeMode="cover"
                style={styles.profileImageContainer}>
                <Pressable onPress={() => navigation.navigate('profileHome')}>
                  <Image
                    style={styles.profilePic}
                    source={{
                      uri:
                        authState?.userDetails[0]?.profilePicture !== ''
                          ? authState?.userDetails[0]?.profilePicture
                          : 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg',
                    }}
                  />
                </Pressable>
                <Image
                  style={styles.tagIcon}
                  source={require('../assets/images/vip-icon.png')}
                />
              </ImageBackground>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{authState?.userDetails[0]?.name}</Text>
              <Text style={styles.title}>@clarafredry</Text>
            </View>
            <View style={styles.badgeContainer}>
              <ImageBackground
                source={require('../assets/images/endorsed-bg.png')}
                resizeMode="cover"
                style={styles.leftBadgeContainer}>
                <Text style={styles.badgeTitle}>Endorsed</Text>
                <Text style={styles.badgeSubTitle}>6.2K</Text>
              </ImageBackground>
              <ImageBackground
                source={require('../assets/images/genuine.png')}
                resizeMode="cover"
                style={styles.rightBadgeContainer}>
                <Text style={styles.badgeTitle}>Genuine</Text>
                <Text style={[styles.badgeSubTitle, {color: '#BC2F32'}]}>
                  3.2K
                </Text>
              </ImageBackground>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.commentsWrapper}>
          <View style={styles.commentsInfo}>
            <View style={styles.commentsContent}>
              <Text style={styles.countText}>{authState?.userDetails[0]?.followers}</Text>
              <Text style={styles.labelText}>Followers</Text>
            </View>
            <View style={styles.borderRight}></View>
            <View style={styles.commentsContent}>
              <Text style={styles.countText}>{authState?.userDetails[0]?.following}</Text>
              <Text style={styles.labelText}>Following</Text>
            </View>
            <View style={styles.borderRight}></View>
            <View style={styles.commentsContent}>
              <Text style={styles.countText}>{authState?.userDetails[0]?.gifts}</Text>
              <Text style={styles.labelText}>Gifts</Text>
            </View>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.detailsWrapper}>
            <View style={styles.editDetails}>
              <Text style={styles.editH1Title}>Public Details</Text>
              {authState?.userId === authState?.userDetails[0]?.userId ? (
                <Pressable onPress={() => navigation.navigate('profileEdit',{profileDetails: authState?.userDetails[0]})}>
                  <Text style={styles.editLink}>Edit Now</Text>
                </Pressable>
              ) : null}
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoTitle}>Works at</Text>
              <Text style={styles.infoContent}>
                {authState?.userDetails[0]?.occupation}
              </Text>
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoTitle}>Studied at</Text>
              <Text style={styles.infoContent}>
                {authState?.userDetails[0]?.studiedAt}
              </Text>
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoTitle}>Marital Status</Text>
              <Text style={styles.infoContent}>
                {authState?.userDetails[0]?.maritalStatus}
              </Text>
            </View>
            <View style={styles.infoDetails}>
              <Text style={styles.infoTitle}>Location</Text>
              <View style={styles.tabLocationWrapper}>
                <Image
                  style={styles.icon}
                  source={require('../assets/images/location-icon.png')}
                />
                <Text style={styles.tabLocation}>
                  {authState?.userDetails[0]?.location}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.groupContainer}>
          <View style={styles.groupWrapper}>
            <Text style={styles.groupTitle}>
              Your Groups ({authState?.groupDetails?.length})
            </Text>
            {authState?.groupDetails?.length>0?
            <>
            <View style={styles.groupContentWrapper}>
              <ImageBackground
                source={require('../assets/images/group-brown-bg.png')}
                resizeMode="cover"
                style={styles.bgContainer}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupTitle}>
                    {authState?.groupDetails[0]?.chatName}
                  </Text>
                  <Text style={styles.groupLabel}>
                    {authState?.groupDetails[0]?.totalConversation}
                  </Text>
                </View>
                <View style={styles.groupIcon}>
                  {authState?.groupDetails[0]?.users?.slice(0, 4).map(item => {
                    return (
                      <Image
                        source={{
                          uri:
                            item?.profilePicture == ''
                              ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                              : item?.profilePicture,
                        }}
                        style={styles.groupFill}
                      />
                    );
                  })}
                  {authState?.groupDetails[0]?.users?.length > 4 ? (
                    <View
                      style={styles.groupNo}
                    />
                  ) : null}
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../assets/images/group-blue-bg.png')}
                resizeMode="cover"
                style={styles.bgContainer}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupTitle}>
                    {authState?.groupDetails[1]?.chatName}
                  </Text>
                  <Text style={styles.groupLabel}>
                    {authState?.groupDetails[1]?.totalConversation}
                  </Text>
                </View>
                <View style={styles.groupIcon}>
                  {authState?.groupDetails[1]?.users?.slice(0, 4).map(item => {
                    return (
                      <Image
                        source={{
                          uri:
                            item?.profilePicture == ''
                              ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                              : item?.profilePicture,
                        }}
                        style={styles.groupFill}
                      />
                    );
                  })}
                  {authState?.groupDetails[1]?.users?.length > 4 ? (
                    <View
                      style={styles.groupNo}
                    />
                  ) : null}
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../assets/images/group-pink-bg.png')}
                resizeMode="cover"
                style={styles.bgContainer}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupTitle}>
                    {authState?.groupDetails[2]?.chatName}
                  </Text>
                  <Text style={styles.groupLabel}>
                    {authState?.groupDetails[2]?.totalConversation}
                  </Text>
                </View>
                <View style={styles.groupIcon}>
                  {authState?.groupDetails[2]?.users?.slice(0, 4).map(item => {
                    return (
                      <Image
                        source={{
                          uri:
                            item?.profilePicture == ''
                              ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                              : item?.profilePicture,
                        }}
                        style={styles.groupFill}
                      />
                    );
                  })}
                  {authState?.groupDetails[2]?.users?.length > 4 ? (
                    <View
                      style={styles.groupNo}
                    />
                  ) : null}
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../assets/images/group-green-bg.png')}
                resizeMode="cover"
                style={styles.bgContainer}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupTitle}>
                    {authState?.groupDetails[3]?.chatName}
                  </Text>
                  <Text style={styles.groupLabel}>
                    {authState?.groupDetails[3]?.totalConversation}
                  </Text>
                </View>
                <View style={styles.groupIcon}>
                  {authState?.groupDetails[3]?.users?.slice(0, 4).map(item => {
                    return (
                      <Image
                        source={{
                          uri:
                            item?.profilePicture == ''
                              ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                              : item?.profilePicture,
                        }}
                        style={styles.groupFill}
                      />
                    );
                  })}
                  {authState?.groupDetails[3]?.users?.length > 4 ? (
                    <View
                      style={styles.groupNo}
                    />
                  ) : null}
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../assets/images/group-blue-bg.png')}
                resizeMode="cover"
                style={styles.bgContainer}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupTitle}>
                    {authState?.groupDetails[4]?.chatName}
                  </Text>
                  <Text style={styles.groupLabel}>
                    {authState?.groupDetails[4]?.totalConversation}
                  </Text>
                </View>
                <View style={styles.groupIcon}>
                  {authState?.groupDetails[4]?.users?.slice(0, 4).map(item => {
                    return (
                      <Image
                        source={{
                          uri:
                            item?.profilePicture == ''
                              ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                              : item?.profilePicture,
                        }}
                        style={styles.groupFill}
                      />
                    );
                  })}
                  {authState?.groupDetails[4]?.users?.length > 4 ? (
                    <View
                      style={styles.groupNo}
                    />
                  ) : null}
                </View>
              </ImageBackground>
              <ImageBackground
                source={require('../assets/images/group-pink-bg.png')}
                resizeMode="cover"
                style={styles.bgContainer}>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupTitle}>
                    {authState?.groupDetails[5]?.chatName}
                  </Text>
                  <Text style={styles.groupLabel}>
                    {authState?.groupDetails[5]?.totalConversation}
                  </Text>
                </View>
                <View style={styles.groupIcon}>
                  {authState?.groupDetails[5]?.users?.slice(0, 4).map(item => {
                    return (
                      <Image
                        source={{
                          uri:
                            item?.profilePicture == ''
                              ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                              : item?.profilePicture,
                        }}
                        style={styles.groupFill}
                      />
                    );
                  })}
                  {authState?.groupDetails[5]?.users?.length > 4 ? (
                    <View
                      style={styles.groupNo}
                    />
                  ) : null}
                </View>
              </ImageBackground>
            </View>
            <Pressable
              onPress={() => navigation.navigate('')}
              style={styles.buttonContainer}>
              <LinearGradient
                style={styles.buttonWrapper}
                colors={['#5E6BFF', '#212FCC']}>
                <Text style={styles.buttonText}>View all Group</Text>
              </LinearGradient>
            </Pressable>
            </>
            :
            null
        }
          </View>
        </View>
        <View style={styles.contactContainer}>
          <View style={styles.contactWrapper}>
            <Text style={styles.groupTitle}>Friends ({authState.friends.length})</Text>
            <View style={styles.contactFlex}>
              {authState.friends.length > 0 &&
                authState.friends.map((e, i) => {
                  return (
                    <View key={i} style={styles.contactList}>
                      <Image style={styles.contactImage} source={{uri:e?.profilePicture==''?'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg':e?.profilePicture}} />
                      <Text style={styles.contactName}>{e?.name}</Text>
                    </View>
                  );
                })}
            </View>
            <Pressable
              onPress={() => navigation.navigate('')}
              style={styles.buttonContainer}>
              <LinearGradient
                style={styles.buttonWrapper}
                colors={['#5E6BFF', '#212FCC']}>
                <Text style={styles.buttonText}>View all Group</Text>
              </LinearGradient>
            </Pressable>
          </View>
          {/* <View style={styles.momentFormContainer}>
          <NewSnap 
          // thoughts='Snap'
           editable={false}
           navigation={navigation}
           handleChange={checkValidity}
          />
            </View> */}
        </View>
          <ShareMoment />
          {/* <Header navigation={navigation}/> */}
        <View style={styles.contactContainer}>
          <View style={styles.contactWrapper}>
            <Text style={styles.groupTitle}>Active Posts</Text>
            {postState?.data?.length > 0 &&
              postState?.data?.map((e, i) => {
                return (
                  <View key={i} style={styles.postContainer}>
                    <View style={styles.postTopContainer}>
                      <Image
                        style={styles.postProfilePic}
                        source={{uri:'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'}}
                        // source={{uri:e?.profilePicture==''?'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg':e?.profilePicture}}
                      />
                      <View style={styles.postTitleInfo}>
                        <Text style={styles.postTitle}>{e?.name}</Text>
                        <Text style={styles.postLabel}>{e?.status}online</Text>
                      </View>
                      <Text style={styles.postLabel}>{moment(e?.time).format('hh:mm a')}</Text>
                    </View>
                    <View style={styles.postBottomContainer}>
                      <Text style={styles.postComment}>{e?.description}</Text>
                      {e?.images==null?null:
                      <Image style={styles.postPic} source={{uri:e?.images}} resizeMethod='scale'/>
                      }
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#FFF',
  },
  topContainer: {
    width: width,
    backgroundColor:'#fff'
  },
  groupNo:{
    width: 30,
    height: 30,
    borderRadius: 100 / 2,
    marginLeft: -10,
    borderColor: '#fff',
    borderWidth:1,
    backgroundColor: 'blue',
  },
  groupFill:{
    width: 30,
    height: 30,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 100 / 2,
    marginLeft: -10,
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#FFF',
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
  titleContainer: {
    flexDirection: 'column',
    marginTop: 30,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: 24,
    textAlign: 'center',
  },
  name: {
    fontFamily: 'Inter',
    fontSize: 32,
    fontWeight: '900',
    color: '#323EC1',
    lineHeight: 34,
    textAlign: 'center',
    paddingVertical: 10,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 80,
  },
  leftBadgeContainer: {
    width: 164,
    height: 58,
    marginRight: 10,
  },
  badgeTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '500',
    color: '#2C2C2C',
    lineHeight: 20,
    textAlign: 'left',
    paddingLeft: 60,
    paddingTop: 10,
  },
  badgeSubTitle: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: '#1F83A2',
    lineHeight: 20,
    textAlign: 'left',
    paddingLeft: 60,
    paddingTop: 1,
  },
  rightBadgeContainer: {
    width: 164,
    height: 58,
    marginLeft: 10,
  },
  profileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 272,
    height: 272,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    position: 'relative',
  },
  profilePic: {
    borderRadius: 60,
    width: 90,
    height: 90,
  },
  tagIcon: {
    width: 54,
    height: 24,
    position: 'absolute',
    top: 60,
    right: 50,
    bottom: 100,
  },
  commentsWrapper: {
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#FFF',
  },
  commentsInfo: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    position: 'relative',
    top: -34,
    backgroundColor: '#FFF',
    borderRadius: 10,
    height: 68,
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 1,
  },
  borderRight: {
    borderColor: '#979797',
    borderWidth: 0.2,
    height: 68,
  },
  commentsContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: 'Inter',
    fontSize: 22,
    fontWeight: '700',
    color: '#2C2C2C',
    lineHeight: 24,
  },
  labelText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: 24,
  },
  detailsWrapper: {
    width: '80%',
    paddingVertical: 40,
  },
  editDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editH1Title: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    lineHeight: 30,
  },
  editLink: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#2E3CD7',
    lineHeight: 20,
  },
  infoDetails: {
    borderBottomColor: '#979797',
    borderBottomWidth: 0.2,
    flexDirection: 'column',
    paddingVertical: 16,
  },
  infoTitle: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    lineHeight: 24,
    paddingBottom: 10,
  },
  infoContent: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: 24,
  },
  tabLocationWrapper: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    backgroundColor: '#C8E7F0',
    borderRadius: 18,
    height: 30,
    // marginLeft:'5%',
    marginTop: 20,
    maxWidth: 110,
    alignItems: 'center',
  },
  icon: {
    // width:'1%',
    marginLeft: '10%',
  },
  tabLocation: {
    color: '#000',
    marginLeft: '3%',
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
  },
  groupContainer: {
    backgroundColor: '#EBECFF',
    paddingVertical: 40,
    width: '100%',
    alignItems: 'center',
  },
  groupWrapper: {
    width: '80%',
    alignItems: 'center',
  },
  groupTitle: {
    color: '#2C2C2C',
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
  },
  groupContentWrapper: {
    marginVertical: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bgContainer: {
    width: 155,
    height: 175,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  groupInfo: {
    // flexDirection: 'row'
  },
  groupIcon: {
    flexDirection: 'row',
    // backgroundColor: 'pink'
  },
  groupTitle: {
    color: '#2C2C2C',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  groupLabel: {
    color: '#2C2C2C',
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  buttonContainer: {
    width: '50%',
    height: 40,
  },
  buttonWrapper: {
    width: '100%',
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
  contactContainer: {
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingVertical: 40,
  },
  contactWrapper: {
    width: '80%',
    alignItems: 'center',
  },
  contactFlex: {
    flexDirection: 'row',
    paddingVertical: 20,
    flexWrap: 'wrap',
    // margin:'5%',
    justifyContent: 'space-between',
  },
  contactList: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft:'5%',
    paddingVertical: 20,
  },
  contactImage: {
    width: 54,
    height: 54,
    borderRadius: 50,
  },
  contactName: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#2C2C2C',
    lineHeight: 20,
    textAlign: 'center',
    paddingVertical: 10,
  },
  momentFormContainer: {
    width:windowWidth/1.1,
    alignSelf:'center',
    // backgroundColor:'#fff',
    marginTop:'10%'
  },
  postContainer: {
    // flexDirection: 'column',
    padding:20,
    borderRadius:10,
    backgroundColor: '#fff',
    width: windowWidth/1.1,
    elevation:5,
    marginTop: '5%'
  },
  postTopContainer: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  postTitleInfo: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#858597',
    lineHeight: 22,
    marginRight: 'auto',
    paddingLeft: 20,
  },
  postProfilePic: {
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  postTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#1F1F39',
    lineHeight: 18,
  },
  postLabel: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    color: '#858597',
    lineHeight: 18,
  },
  postBottomContainer: {
    flexDirection: 'column',
  },
  postComment: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    color: '#858597',
    lineHeight: 22,
  },
  postPic: {
    marginTop: 20,
    height: windowHeight/3,
    width: windowWidth/1.2,
    alignSelf:'center',
    borderRadius: 14,
  },
});

export default ProfileHome;
