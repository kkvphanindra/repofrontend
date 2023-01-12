import React, { useEffect } from 'react';
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
    VirtualizedList,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import MainNotificationFlatList from './components/Notifcation/MainNotificationFlatList';
import { getAllNotificationByUserId } from './redux/Notifications/action';

const { width, height } = Dimensions.get('window');

const Notifications = ({ navigation }) => {
    const dispatch = useDispatch()
    const authState = useSelector((state) => state.authState)
    const notificationState = useSelector((state) => state.notificationState)
    useEffect(() => {
        dispatch(getAllNotificationByUserId(authState.userId))
    }, [])
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../src/assets/images/offer-bg-top.png')}
                resizeMode="cover"
                style={styles.topContainer}>
                <View style={styles.wrapper}>
                    <Pressable onPress={() => navigation.navigate('home')} style={styles.iconWrapper}>
                        <Image style={styles.arrowIcon} source={require('../src/assets/images/left-arrow.png')} />
                    </Pressable>
                    <Text style={styles.title}>Notifications</Text>
                    <Pressable onPress={() => navigation.navigate('notifications')} style={styles.notifyWrapper}>
                        <Image style={styles.notifyIcon} source={require('../src/assets/images/filter.png')} />
                    </Pressable>
                </View>
            </ImageBackground>
            <View style={styles.tabWrapper}>
                <View style={styles.tabContainer}>
                    <FlatList
                        data={notificationState.allNotification}
                        renderItem={({ item }) => <MainNotificationFlatList data={item} />}
                    />
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'column',    
        flex:1,
    },
    topContainer: {
        width: width,
        height: 144,
        justifyContent: 'center'
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    iconWrapper: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notifyWrapper: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 20
    },
    notifyIcon: {

    },
    title: {
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        textAlign: 'center',
        paddingTop: 10,
        marginLeft: 'auto'
    },
    tabWrapper: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    tabContainer: {
        flexDirection: 'column',
        marginTop: 20,
        height: height - 200,
        width: '85%',
    },
    listContainer: {
        flexDirection: 'row',
        borderBottomColor: '#D2D107',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: 72,
        height: 72,
        borderRadius: 54
    },
    contactWrapper: {
        flexDirection: 'column',
        marginRight: 'auto',
        marginLeft: 20
    },
    contactName: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '700',
        color: '#2C406E',
        lineHeight: 20
    },
    contactNumber: {
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: '#9AA8C7',
        lineHeight: 18,
        paddingVertical: 5
    },
    statusWrapper: {
        flexDirection: 'row',

    },
    statusInfo: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',
        color: '#3D5CFF',
        lineHeight: 18
    },
    declineStatus: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',
        color: '#FF8B77',
        lineHeight: 18,
        paddingLeft: 20
    },
    smallButton: {
        backgroundColor: '#FFF',
        width: 74,
        height: 35,
        borderRadius: 5,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    statusIcon: {
        width: 32,
        height: 32,
        position: 'relative',
        top: 40,
        left: 50
    }
})

export default Notifications;