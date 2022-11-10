import React, { useState } from 'react';
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
    TouchableHighlight
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const { width, height } = Dimensions.get('window');

const ActivityDetails = ({navigation}) => {

    const [index, setIndex] = useState(0);
    
    const acceptAction = () => {
        console.log("accept")
    }
    
    const declineAction = () => {
        console.log("decline")
    }

    const groupDatas = [
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Goku',
          "number": '9878321453',
          "status": "scheduled",
          "id": 1
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Trunks',
          "number": '9878321453',
          "status": "Accepted",
          "id": 2
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Freza',
          "number": '9878321453',
          "status": "Declined",
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Yamcha',
          "number": '9878321453',
          "status": "scheduled",
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Pikolo',
          "number": '9878321453',
          "status": "Declined",
          "id": 4
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Cullin',
          "number": '9878321453',
          "status": "Accepted",
          "id": 5
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Vegeta',
          "number": '9878321453',
          "status": "scheduled",
          "id": 6
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Gohan',
          "number": '9878321453',
          "status": "Accepted",
          "id": 7
        },
      ]
    
    return (
        <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.wrapper}>
                        <Pressable onPress={() => navigation.navigate('scheduledActivity')}  style={styles.iconWrapper}>
                            <Image style={styles.arrowIcon} source={require('../assets/images/left-arrow.png')} />
                        </Pressable>    
                        <Text style={styles.title}>Schedule Activity</Text>
                        <Pressable onPress={() => navigation.navigate('notifications')}  style={styles.notifyWrapper}>
                            <Image style={styles.notifyIcon} source={require('../assets/images/notify-icon.png')}/>
                        </Pressable>    
                    </View>
                </View>
            <View style={styles.tabMainContainer}>
                <View style={styles.contentContainer}>
                        <Text style={styles.headTitle}>Activity Name</Text>
                        <Text style={styles.subTitle}>Walking</Text>
                        <Text style={styles.timeTitle}>04 July 2022 &nbsp; 7:00 - 9:00 PM</Text>
                        <Text style={styles.content}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                        <View style={styles.btnActionContainer}>
                            <Pressable
                                onPress={acceptAction}
                                style={styles.greenBtn}>
                                    <Text style={styles.actionText}>Accept</Text>
                            </Pressable>
                            <Pressable
                                onPress={declineAction}
                                style={styles.orangeBtn}>
                                    <Text style={styles.actionText}>Decline</Text>
                            </Pressable>
                        </View>
                    
                </View>
            </View>
            <View style={styles.activityContainer}>
                <View style={styles.activityWrapper}>
                    <View style={styles.activityFilter}>
                        <Text style={styles.filterTitle}>Group Name</Text>
                    </View>
                    <View style={styles.activityGroup}>
                        <ScrollView showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>
                            {groupDatas.length > 0 && groupDatas.map((e, i) => {
                            return (
                                <View
                                    style={styles.listContainer}
                                    key={i}>
                                    <Image style={styles.imageContainer} source={e.pic}/>
                                    <View style={styles.contactWrapper}>
                                    <Text style={styles.contactName}>{e?.name ? e?.name: ''}</Text>
                                    <Text style={styles.contactNumber}>{e?.number}</Text>
                                    </View>
                                    <Pressable onPress={() => navigation.navigate('')} style={[styles.smallButton, e?.status === 'scheduled' && styles.scheduleColor, e?.status === 'Accepted' && styles.acceptColor, e?.status === 'Declined' && styles.declineColor,]}>
                                        <Text style={styles.smallButtonText}>{e?.status}</Text>
                                    </Pressable>
                                </View>
                                )
                            })
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
            <Pressable
                onPress={() => navigation.navigate('createActivity')}
                style={styles.buttonContainer}>
                <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                    <Text style={styles.buttonText}>
                    Proceed to Schedule
                    </Text>
                </LinearGradient>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'column',
        flex: 1
    },
    topContainer: {
        width: width,
        justifyContent:'center',
        paddingVertical: 20
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    iconWrapper:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notifyWrapper:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 20
    },
    notifyIcon:{
        
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
    tabMainContainer:{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    contentContainer:{
        width: '80%',
    },
    headTitle:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        paddingBottom:10
    },
    subTitle:{
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: '600',
        color: '#2C2C2C',
        lineHeight: 25,
    },
    timeTitle:{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',
        color: '#2C2C2C',
        lineHeight: 25,
        paddingTop: 10
    },
    content:{
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: '#858597',
        lineHeight: 22,
    },
    btnActionContainer:{
        flexDirection: 'row',
        marginTop: 20
    },
    greenBtn:{
        backgroundColor: '#75CC79',
        borderRadius: 15,
        width: 100,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orangeBtn:{
        backgroundColor: '#FF8B77',
        borderRadius: 15,
        width: 100,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20
    },
    actionText:{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',
        color: '#FFF',
        lineHeight: 18,
    },
    activityContainer:{
        backgroundColor: '#EBECFF',
        paddingVertical: 20,
        marginTop: 20,
        alignItems: 'center'
    },
    activityWrapper:{
        width: '80%'
    },
    activityFilter:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    filterTitle:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        textAlign: 'left'
    },
    activityGroup:{
        marginTop: 20,
        height: 160,
        width: '100%',
        flexDirection: 'column'
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
        width: 54,
        height: 54,
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
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 20
    },
    contactNumber: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '400',
        color: '#9EA6BE',
        lineHeight: 16
    },
    smallButton: {
        width: 90,
        height: 35,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    acceptColor: {
        backgroundColor: '#75CC79',
    },
    scheduleColor:{
        backgroundColor: '#5D6AFF',
    },
    declineColor:{
        backgroundColor: '#FF8B77',
    },
    smallButtonText: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '400',
        color: '#FFF',
        lineHeight: 16,
        textAlign: 'center'
    },
    buttonContainer: {
        width: '100%',
        height: 60,
        marginVertical: 20,
        alignItems: 'center',
        marginTop: 'auto'
    },
    buttonWrapper: {
        width: '80%',
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

export default ActivityDetails;