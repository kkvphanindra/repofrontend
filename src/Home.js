import React from 'react';
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
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ScheduleHome from './components/schedule-home';

const { width, height } = Dimensions.get('window');

const Home = ({navigation}) => {
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../src/assets/images/home-top-bg.png')}
                        resizeMode="cover"
                        style={styles.topContainer}>
                        <View style={styles.menuContainer}>
                            <Pressable onPress={() => navigation.openDrawer()}  style={styles.menuWrapper}>
                                <Image style={styles.menuIcon} source={require('../src/assets/images/menu-icon.png')}/>
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('notifications')}  style={styles.notifyWrapper}>
                                <Image style={styles.notifyIcon} source={require('../src/assets/images/notify-icon.png')}/>
                            </Pressable>
                            <Pressable onPress={() => navigation.navigate('slambookHome')}  style={styles.badgeWrapper}>
                                <Image style={styles.badgeIcon} source={require('../src/assets/images/badge.png')}/>
                            </Pressable>
                        </View>    
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.name}>Clara Fredry</Text>
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
                                <Text style={[styles.badgeSubTitle, {color: '#BC2F32'}]}>3.2K</Text>    
                            </ImageBackground>
                        </View>    
                    </ImageBackground>
                    <View style={styles.profileContainer}>
                        <ImageBackground
                            source={require('../src/assets/images/home-profile.png')}
                            resizeMode="cover"
                            style={styles.profileImageContainer}>
                                <Pressable onPress={() => navigation.navigate('profileHome')}>
                                <Image style={styles.profilePic} source={require('../src/assets/images/picture-1.png')}/>

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
                                    <Text style={styles.groupSubTitle}>Lorem Ipsum is simply dummy text.</Text>
                                </View>
                                <View style={styles.groupImageWrapper}>
                                    <Image style={styles.profilePicOne} source={require('../src/assets/images/picture-1.png')}/>
                                    <Image style={styles.profilePicTwo} source={require('../src/assets/images/picture-2.png')}/>
                                    <Image style={styles.profilePicThree} source={require('../src/assets/images/picture-3.png')}/>
                                    <Image style={styles.profilePicFour} source={require('../src/assets/images/picture-2.png')}/>
                                    <Image style={styles.profilePicFive} source={require('../src/assets/images/picture-3.png')}/>
                                    <Image style={styles.profilePicSix} source={require('../src/assets/images/picture-1.png')}/>
                                </View>
                                <Pressable onPress={() => navigation.navigate('')}  style={styles.viewGroupWrapper}>
                                <Text style={styles.viewGroupText}>View all People</Text>
                                </Pressable>
                        </ImageBackground>
                    </View>
                    <View style={styles.recentGroupContainer}>
                        <View style={styles.recentGroupTitleContainer}>
                            <Text style={styles.recentGroupTitle}>Your Recent Groups</Text>
                            <Text style={styles.recentGroupSubTitle}>Lorem Ipsum is simply dummy text.</Text>
                        </View>
                        <ImageBackground
                            source={require('../src/assets/images/group-bg-1.png')}
                            resizeMode="cover"
                            style={styles.recentGroupImageContainer}>
                            <View style={styles.recentGroupNameContainer}>
                                <Text style={styles.recentGroupName}>Group Name</Text>
                                <Text style={styles.recentGroupText}>1.2K Conversations</Text>
                            </View>
                            <View style={styles.recentGroupAvatarContainer}>
                                <Image style={styles.avatarPic} source={require('../src/assets/images/form-avatar-group.png')}/>
                                <Pressable onPress={() => navigation.navigate('')}  style={[styles.recentGroupAction, {backgroundColor: '#FB8D33'}]}>
                                    <Text style={styles.recentGroupActionText}>More Active</Text>
                                </Pressable>
                            </View>    
                        </ImageBackground>
                        <ImageBackground
                            source={require('../src/assets/images/group-bg-2.png')}
                            resizeMode="cover"
                            style={styles.recentGroupImageContainer}>
                            <View style={styles.recentGroupNameContainer}>
                                <Text style={styles.recentGroupName}>Group Name</Text>
                                <Text style={styles.recentGroupText}>1.2K Conversations</Text>
                            </View>
                            <View style={styles.recentGroupAvatarContainer}>
                                <Image style={styles.avatarPic} source={require('../src/assets/images/form-avatar-group.png')}/>
                                <Pressable onPress={() => navigation.navigate('')}  style={[styles.recentGroupAction, {backgroundColor: '#258FE6'}]}>
                                    <Text style={styles.recentGroupActionText}>Partially Active</Text>
                                </Pressable>
                            </View>    
                        </ImageBackground>
                        <ImageBackground
                            source={require('../src/assets/images/group-bg-3.png')}
                            resizeMode="cover"
                            style={styles.recentGroupImageContainer}>
                            <View style={styles.recentGroupNameContainer}>
                                <Text style={styles.recentGroupName}>Group Name</Text>
                                <Text style={styles.recentGroupText}>1.2K Conversations</Text>
                            </View>
                            <View style={styles.recentGroupAvatarContainer}>
                                <Image style={styles.avatarPic} source={require('../src/assets/images/form-avatar-group.png')}/>
                                <Pressable onPress={() => navigation.navigate('')}  style={[styles.recentGroupAction, {backgroundColor: '#D05A5D'}]}>
                                    <Text style={styles.recentGroupActionText}>InActive</Text>
                                </Pressable>
                            </View>    
                        </ImageBackground>
                        <Pressable onPress={() => navigation.navigate('')}  style={styles.buttonContainer}>
                        <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                            <Text style={styles.buttonText}>
                                View all Group
                            </Text>
                        </LinearGradient>
                        </Pressable>
                    </View>
                    <View style={styles.scheduleContainer}>
                        <Text style={styles.scheduleHeadTitle}>Schedule</Text>
                        <ScheduleHome />
                    </View>
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        height: '100%'
    },
    topContainer:{
        width: width,
        height: 428
    },
    menuContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop:30
    },
    menuWrapper:{
        marginLeft: 30
    },
    menuIcon:{
        width: 30,
        height: 20
    },
    notifyWrapper:{
        marginLeft: 'auto',
        marginRight: 30
    },
    notifyIcon:{
        width: 24,
        height: 24
    },
    badgeWrapper:{
        marginRight: 30
    },
    badgeIcon:{
        width: 48,
        height: 48
    },
    titleContainer:{
        flexDirection: 'column',
        marginTop: 30
    },
    title:{
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center'
    },
    name:{
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: '900',
        color: '#323EC1',
        lineHeight: 34,
        textAlign: 'center',
        paddingVertical: 10
    },
    badgeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    leftBadgeContainer:{
        width: 164,
        height: 58,
        marginRight: 10
    },
    badgeTitle:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '500',
        color: '#2C2C2C',
        lineHeight: 20,
        textAlign: 'left',
        paddingLeft: 60,
        paddingTop: 10
    },
    badgeSubTitle:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '700',
        color: '#1F83A2',
        lineHeight: 20,
        textAlign: 'left',
        paddingLeft: 60,
        paddingTop: 1
    },
    rightBadgeContainer:{
        width: 164,
        height: 58,
        marginLeft: 10
    },
    profileContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: -136
    },
    profileImageContainer:{
        width: 272,
        height: 272,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:1
    },
    profilePic:{
        borderRadius: 60,
        width: 90,
        height: 90
    },
    groupContainer:{
        position: 'relative',
        height: 380,
    },
    groupImageContainer:{
        position: 'absolute',
        top: -276,
        width: width,
        height: 650,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    groupTitleContainer:{
        flexDirection: 'column',
        // marginBottom: 'auto',
        marginTop: 160
    },
    groupTitle:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 10
    },
    groupSubTitle:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        color: '#FFF',
        lineHeight: 24,
        textAlign: 'center',
    },
    groupImageWrapper:{
        width: '85%',
        marginTop: 30,
        position: 'relative'
    },
    profilePicOne:{
        width: 30,
        height: 30,
        borderRadius: 60,
        position: 'absolute',
        left: 50,
        top: 0
    },
    profilePicTwo:{
        width: 35,
        height: 35,
        borderRadius: 60,
        position: 'absolute',
        right: 100,
        top: 20
    },
    profilePicThree:{
        width: 80,
        height: 80,
        borderRadius: 60,
        position: 'absolute',
        right: 20,
        top: 80
    },
    profilePicFour:{
        width: 40,
        height: 40,
        borderRadius: 60,
        position: 'absolute',
        left: 130,
        top: 140
    },
    profilePicFive:{
        width: 60,
        height: 50,
        borderRadius: 60,
        position: 'absolute',
        left: 40,
        top: 190
    },
    profilePicSix:{
        width: 55,
        height: 55,
        borderRadius: 60,
        position: 'absolute',
        left: 220,
        top: 200
    },
    viewGroupWrapper:{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 6,
        width: 152,
        height: 40,
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 30
    },
    viewGroupText:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        lineHeight: 26,
        textAlign: 'center',
    },
    recentGroupContainer:{
        alignItems: 'center',
        marginTop: 40
    },
    recentGroupTitleContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    recentGroupTitle:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
    },
    recentGroupSubTitle:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 10
    },
    recentGroupImageContainer:{
        marginVertical: 10,
        width: 338,
        height: 104 ,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center' 
    },
    recentGroupNameContainer:{
        alignItems: 'flex-start' 
    },
    recentGroupName:{
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
    },
    recentGroupText:{
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 20,
        textAlign: 'center',   
    },
    recentGroupAvatarContainer:{
        flexDirection: 'column',
        position: 'relative'
    },
    avatarPic:{
        
    },
    recentGroupAction:{
        width: 146,
        height: 28,
        position: 'relative',
        top: 22,
        left: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomRightRadius: 16
    },
    recentGroupActionText:{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 20,
        textAlign: 'center',
    },
    scheduleContainer:{
        backgroundColor: '#EBECFF',
        paddingVertical: 40,
        marginVertical: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scheduleHeadTitle:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
    },
    offersFlex:{
        marginBottom: 40
    },
    offersContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    offersTitle:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 24,
        textAlign: 'center',
        paddingVertical: 20
    },
    offersWrapper:{
        width: 164,
        height: 175,
        marginHorizontal: 10,
        marginVertical: 10
    },
    offerPic:{
        width: 164,
        height: 175
    },
    buttonContainer: {
        width: '50%',
        height: 60,
        marginTop: 40
    },
    buttonWrapper: {
        width: '100%',
        height: '100%',
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
})

export default Home;