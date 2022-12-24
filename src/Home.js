import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Pressable,
    TouchableOpacity,
    View,
    Dimensions,
    ImageBackground,
    Image,
    PermissionsAndroid,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScheduleHome from './components/schedule-home';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import Carousel from 'react-native-snap-carousel-v4';
import { environment } from '../environment';
import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';
import TopTabNavigator from './scheduled-activity/topTabNavigator';
import { location } from './redux/nearMe/actions';

const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
    const authState = useSelector(state => state.authState);
    const locationState = useSelector(state => state.locationState);
    // console.log("process.env", BASE_URL)
    // console.log('ftu', authState.userId, authState);
    const [profileName, setProfileName] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const carouselRef = useRef(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const dispatch = useDispatch();
    const ENTRIES1 = [
        {
            img: require('../src/assets/images/group-bg-1.png'),
            title: 'Group Name',
            subTitle: '1.2K Conversations',
            avatar: require('../src/assets/images/form-avatar-group.png'),
        },
        {
            img: require('../src/assets/images/group-bg-2.png'),
            title: 'Group Name',
            subTitle: '1.2K Conversations',
            avatar: require('../src/assets/images/form-avatar-group.png'),
        },
        {
            img: require('../src/assets/images/group-bg-3.png'),
            title: 'Group Name',
            subTitle: '1.2K Conversations',
            avatar: require('../src/assets/images/form-avatar-group.png'),
        },
    ];
    const _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    carouselRef.current.scrollToIndex(index);
                }}>
                <ImageBackground
                    source={item.img}
                    resizeMode="cover"
                    style={styles.recentGroupImageContainer}>
                    <View style={styles.recentGroupNameContainer}>
                        <Text style={styles.recentGroupName}>{item.title}</Text>
                        <Text style={styles.recentGroupText}>{item.subTitle}</Text>
                    </View>
                    <View style={styles.recentGroupAvatarContainer}>
                        <Image style={styles.avatarPic} source={item.avatar} />
                        <Pressable
                            onPress={() => navigation.navigate('')}
                            style={[styles.recentGroupAction, { backgroundColor: '#FB8D33' }]}>
                            <Text style={styles.recentGroupActionText}>More Active</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    };
    
    useEffect(() => {
        const getLocation = async() => {
            await GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then(res => {
            dispatch(location(authState.userId,res.latitude,res.longitude));

                    // setLatitude(location.latitude);
                    // setLongitude(location.longitude);
                })
                .catch(error => {
                    const { code, message } = error;
                    console.warn(code, message);
                });
        };

        if (PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();

        }
        
    }, [dispatch,authState.userId]);

    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../src/assets/images/home-top-bg.png')}
                        resizeMode="cover"
                        style={styles.topContainer}>
                        <View style={styles.menuContainer}>
                            <Pressable
                                onPress={() => navigation.openDrawer()}
                                style={styles.menuWrapper}>
                                <Image
                                    style={styles.menuIcon}
                                    source={require('../src/assets/images/menu-icon.png')}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('notifications')}
                                style={styles.notifyWrapper}>
                                <Image
                                    style={styles.notifyIcon}
                                    source={require('../src/assets/images/notify-icon.png')}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('slambookHome')}
                                style={styles.badgeWrapper}>
                                <Image
                                    style={styles.badgeIcon}
                                    source={require('../src/assets/images/badge.png')}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.name}>{authState.name}</Text>
                        </View>
                        <View style={styles.badgeContainer}>
                            <ImageBackground
                                source={require('../src/assets/images/endorsed-bg.png')}
                                resizeMode="cover"
                                style={styles.leftBadgeContainer}>
                                <Text style={styles.badgeTitle}>Endorsed</Text>
                                <Text style={styles.badgeSubTitle}>6.2K</Text>
                            </ImageBackground>
                            <ImageBackground
                                source={require('../src/assets/images/genuine.png')}
                                resizeMode="cover"
                                style={styles.rightBadgeContainer}>
                                <Text style={styles.badgeTitle}>Genuine</Text>
                                <Text style={[styles.badgeSubTitle, { color: '#BC2F32' }]}>
                                    3.2K
                                </Text>
                            </ImageBackground>
                        </View>
                    </ImageBackground>
                    <View style={styles.profileContainer}>
                        <ImageBackground
                            source={require('../src/assets/images/home-profile.png')}
                            resizeMode="cover"
                            style={styles.profileImageContainer}>
                            <Pressable onPress={() => navigation.navigate('profileHome')}>
                                <Image style={styles.profilePic} source={{ uri: authState.profilePicture==''?'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg':authState.profilePicture }} />
                            </Pressable>
                        </ImageBackground>
                    </View>
                    <View style={styles.groupContainer}>
                        <ImageBackground
                            source={require('../src/assets/images/home-group-bg.png')}
                            resizeMode="cover"
                            style={styles.groupImageContainer}>
                            <View style={styles.groupTitleContainer}>
                                <Text style={styles.groupTitle}>People Near me</Text>
                                <Text style={styles.groupSubTitle}>
                                    Lorem Ipsum is simply dummy text.
                                </Text>
                            </View>
                            <View style={styles.groupImageWrapper}>
                                {locationState.loading ?
                                    <ActivityIndicator />
                                    :
                                    <>
                                        {locationState?.locationData?.length > 0 ?
                                            < View >
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        console.log("six",locationState?.locationData[5]?.userId)
                                                        // console.log('object', item.name, item.distance)
                                                    }>
                                                    <Image
                                                        style={styles.profilePicOne}
                                                        source={{
                                                            uri:
                                                                locationState?.locationData[5]?.profilePicture == null
                                                                    ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                                                                    : locationState?.locationData[5]?.profilePicture,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        console.log("five",locationState?.locationData[4]?.userId)
                                                        // console.log('object', item.name, item.distance)
                                                    }>
                                                    <Image
                                                        style={styles.profilePicTwo}
                                                        source={{
                                                            uri:
                                                                locationState?.locationData[4]?.profilePicture ==null
                                                                    ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                                                                    : locationState?.locationData[4]?.profilePicture,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        console.log("first",locationState?.locationData[0]?.userId)
                                                        // console.log('object', item.name, item.distance)
                                                    }>
                                                    <Image
                                                        style={styles.profilePicThree}
                                                        source={{
                                                            uri:
                                                                locationState?.locationData[0]?.profilePicture == null
                                                                    ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                                                                    : locationState?.locationData[0]?.profilePicture,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        console.log("four",locationState?.locationData[3]?.userId)
                                                        // console.log('object', item.name, item.distance)
                                                    }>
                                                    <Image
                                                        style={styles.profilePicFour}
                                                        source={{
                                                            uri:
                                                                locationState?.locationData[3]?.profilePicture == null
                                                                    ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                                                                    : locationState?.locationData[3]?.profilePicture,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        console.log("three",locationState?.locationData[2]?.userId)
                                                        // console.log('object', item.name, item.distance)
                                                    }>
                                                    <Image
                                                        style={styles.profilePicFive}
                                                        source={{
                                                            uri:
                                                                locationState?.locationData[2]?.profilePicture == null
                                                                    ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                                                                    : locationState?.locationData[2]?.profilePicture,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        console.log("second",locationState?.locationData[1]?.userId)
                                                        // console.log('object', item.name, item.distance)
                                                    }>
                                                    <Image
                                                        style={styles.profilePicSix}
                                                        source={{
                                                            uri:
                                                                locationState?.locationData[1]?.profilePicture == null
                                                                    ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'
                                                                    : locationState?.locationData[1]?.profilePicture,
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            null
                                        }
                                    </>
                                }
                            </View>

                            <Pressable
                                onPress={() => navigation.navigate('Connect')}
                                style={styles.viewGroupWrapper}>
                                <Text style={styles.viewGroupText}>View all People</Text>
                            </Pressable>
                        </ImageBackground>
                    </View>
                    <View style={styles.recentGroupContainer}>
                        <View style={styles.recentGroupTitleContainer}>
                            <Text style={styles.recentGroupTitle}>Your Recent Groups</Text>
                            <Text style={styles.recentGroupSubTitle}>
                                Lorem Ipsum is simply dummy text.
                            </Text>
                        </View>
                        <Carousel
                            ref={carouselRef}
                            data={ENTRIES1}
                            renderItem={_renderItem}
                            itemWidth={width / 1.24}
                            sliderWidth={width}
                            activeSlideOffset={20}
                            apparitionDelay={0.5}
                            loop={true}
                            style={styles.carouselWrapper}
                        />
                        <Pressable
                            onPress={() => navigation.navigate('Chat')}
                            style={styles.buttonContainer}>
                            <LinearGradient
                                style={styles.buttonWrapper}
                                colors={['#5E6BFF', '#212FCC']}>
                                <Text style={styles.buttonText}>View all Group</Text>
                            </LinearGradient>
                        </Pressable>
                    </View>
                    <View style={styles.scheduleContainer}>
                        <Text style={styles.scheduleHeadTitle}>Schedule</Text>
                        <ScheduleHome />
                    </View>
                    <View style={styles.offersFlex}>
                        <Text style={styles.offersTitle}>Offers</Text>
                        <View style={styles.offersContainer}>
                            <Pressable
                                onPress={() => navigation.navigate('giftsHome')}
                                style={styles.offersWrapper}>
                                <Image
                                    style={styles.offerPic}
                                    source={require('../src/assets/images/offer-1.png')}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('')}
                                style={styles.offersWrapper}>
                                <Image
                                    style={styles.offerPic}
                                    source={require('../src/assets/images/offer-2.png')}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('generateHome')}
                                style={styles.offersWrapper}>
                                <Image
                                    style={styles.offerPic}
                                    source={require('../src/assets/images/offer-3.png')}
                                />
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('')}
                                style={styles.offersWrapper}>
                                <Image
                                    style={styles.offerPic}
                                    source={require('../src/assets/images/offer-4.png')}
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ScrollView >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: '100%',
    },
    topContainer: {
        width: width,
        height: 428,
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
        position: 'relative',
        top: -136,
    },
    profileImageContainer: {
        width: 272,
        height: 272,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    profilePic: {
        borderRadius: 60,
        width: 90,
        height: 90,
    },
    groupContainer: {
        position: 'relative',
        height: 380,
    },
    groupImageContainer: {
        position: 'absolute',
        top: -276,
        width: width,
        height: 650,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    groupTitleContainer: {
        flexDirection: 'column',
        // marginBottom: 'auto',
        marginTop: 160,
    },
    groupTitle: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 10,
    },
    groupSubTitle: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        color: '#FFF',
        lineHeight: 24,
        textAlign: 'center',
    },
    groupImageWrapper: {
        width: '85%',
        marginTop: 30,
        position: 'relative',
    },
    profilePicOne: {
        width: 30,
        height: 30,
        borderRadius: 100 / 2,
        position: 'absolute',
        left: 50,
        top: 0,
    },
    profilePicTwo: {
        width: 35,
        height: 35,
        borderRadius: 100 / 2,
        position: 'absolute',
        right: 100,
        top: 20,
    },
    profilePicThree: {
        width: 80,
        height: 80,
        borderRadius: 100 / 2,
        position: 'absolute',
        right: 20,
        top: 80,
    },
    profilePicFour: {
        width: 40,
        height: 40,
        borderRadius: 100 / 2,
        position: 'absolute',
        left: 130,
        top: 140,
    },
    profilePicFive: {
        width: 45,
        height: 45,
        borderRadius: 100 / 2,
        position: 'absolute',
        left: 40,
        top: 190,
    },
    profilePicSix: {
        width: 55,
        height: 55,
        borderRadius: 100 / 2,
        position: 'absolute',
        left: 220,
        top: 200,
    },
    viewGroupWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 6,
        width: 152,
        height: 40,
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 30,
    },
    viewGroupText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        lineHeight: 26,
        textAlign: 'center',
    },
    recentGroupContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    recentGroupTitleContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recentGroupTitle: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
    },
    recentGroupSubTitle: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 10,
    },
    recentGroupImageContainer: {
        marginVertical: 10,
        width: 338,
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 26,
    },
    recentGroupNameContainer: {
        alignItems: 'flex-start',
        borderRadius: 26,
    },
    recentGroupName: {
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
    },
    recentGroupText: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 20,
        textAlign: 'center',
    },
    recentGroupAvatarContainer: {
        flexDirection: 'column',
        position: 'relative',
    },
    avatarPic: {},
    recentGroupAction: {
        width: 146,
        height: 28,
        position: 'relative',
        top: 47,
        left: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 16,
    },
    recentGroupActionText: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 20,
        textAlign: 'center',
    },
    scheduleContainer: {
        backgroundColor: '#EBECFF',
        flex: 1,
        paddingVertical: 40,
        marginVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scheduleHeadTitle: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
    },
    offersFlex: {
        marginBottom: 40,
    },
    offersContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    offersTitle: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 20,
    },
    offersWrapper: {
        width: 164,
        height: 175,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    offerPic: {
        width: 164,
        height: 175,
    },
    buttonContainer: {
        width: '50%',
        height: 60,
        marginTop: 40,
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
});

export default Home;
