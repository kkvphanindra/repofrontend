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

const ScheduledHome = ({navigation}) => {

    const [index, setIndex] = useState(0);
    const [dateTime, setDateTime] = useState(new Date().toLocaleString());
    const [start, setStart] = useState('');
    
    const calender = ['Day', 'Week', 'Month', 'Year'];
    const SECTIONS = [
        {   
            id: 1,
            title: 'Walking',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 2,
            title: 'Cleaning',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 3,
            title: 'Running',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 4,    
            title: 'Gathering',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
    ]
    const SECTIONSONE = [
        {   
            id: 1,
            title: 'Cleaning',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 2,
            title: 'Walking',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 3,
            title: 'Running',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 4,    
            title: 'Gathering',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
    ]
    const SECTIONSTWO = [
        {   
            id: 1,
            title: 'Running',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 2,
            title: 'Gathering',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 3,
            title: 'Cleaning',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 4,    
            title: 'Walking',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
    ]
    const SECTIONSTHREE = [
        {   
            id: 1,
            title: 'Cleaning',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 2,
            title: 'Walking',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 3,
            title: 'Running',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
        {
            id: 4,    
            title: 'Gathering',
            time: '07:00 - 07:15',
            location: 'Oxford Street',
            pic: require('../assets/images/form-avatar-group.png')
        },
    ]
    const getItem = (data, index) => (
        // console.log('data',data),
        {
        id: Math.random().toString(12).substring(0),
        title: data[index].title,
        time: data[index].time,
        location: data[index].location,
        pic: data[index].pic,
      });
    const getItemCount = (data) => SECTIONS.length;
    const getTimestamp = () => {
        const selectedTimestamp = moment(dateTime).format('HH.MM');
        setDateTime(selectedTimestamp);
        setStart(selectedTimestamp)
    }
    
    const cancelSchedule = () => {
        setStart('')
    }
    const ListItem = ({ data }) => {
        // console.log('item', data)
        return (
            <View style={styles.tabContent} key={data.id}>
                <View style={{backgroundColor: '#8F99EB', width: 2, height: 44}}></View>
                <View style={styles.tabContentWrapper}>
                    <View style={styles.topContentWrapper}>
                        <View style={styles.topTitleWrapper}>
                            <Text style={styles.tabTitle}>{data.title}</Text>
                            <Text style={styles.tabLabel}>{data.time}</Text>
                            <View style={styles.tabLocationWrapper}>
                                <Image style={styles.icon} source={require('../assets/images/location-icon.png')}/>
                                <Text style={styles.tabLocation}>{data.location}</Text>
                            </View>
                        </View>
                        <View style={styles.tabViewWrapper}>
                            <Image style={styles.groupIcon} source={data.pic}/>
                            <View style={styles.actionItem}>
                                <Pressable
                                    onPress={getTimestamp}
                                    style={styles.startButton}>
                                     { start !== '' ?
                                        <Text style={styles.startButtonText}>{dateTime}</Text> : <Text style={styles.startButtonText}>Start</Text>
                                     }   
                                        
                                </Pressable>
                                <Pressable
                                    onPress={cancelSchedule}
                                    style={styles.cancelButton}>
                                    <Image style={styles.cancelButtonIcon} source={require('../assets/images/close-icon.png')}/>    
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    
                </View>
            </View>
        )
      }
    
    return (
        <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/offer-bg-top.png')}
                    resizeMode="cover"
                    style={styles.topContainer}>
                        <View style={styles.wrapper}>
                            <Pressable onPress={() => navigation.navigate('home')}  style={styles.iconWrapper}>
                                <Image style={styles.arrowIcon} source={require('../assets/images/left-arrow.png')} />
                            </Pressable>    
                            <Text style={styles.title}>Huddle Play</Text>
                            <Pressable onPress={() => navigation.navigate('notifications')}  style={styles.notifyWrapper}>
                                <Image style={styles.notifyIcon} source={require('../assets/images/notify-icon.png')}/>
                            </Pressable>    
                        </View>
                        <Text style={styles.headTitle}>June 2022</Text>
                        <Text style={styles.subTitle}>14th - Tuesday</Text>
                </ImageBackground>
            <View style={styles.tabMainContainer}>
                <View style={styles.tabHead}>
                {
                    calender.length && calender.map((e,i) => {
                        return(
                            <TouchableHighlight
                                key={i}
                                style={styles.tabBox}
                                activeOpacity={1}
                                underlayColor=""
                                onPress={() => setIndex(i)}
                                >
                                <View style={[styles.tabButton, index === i && styles.tabButtonActive ]}>
                                    <Text style={[styles.tabText, index === i && styles.tabTextActive]}>{e}</Text>
                                </View>    
                            </TouchableHighlight>
                        )
                    })
                }
                </View>
                <View style={styles.tabWrapper}>
                    <View style={styles.tabContainer}>
                        {
                            index === 0 && 
                            <VirtualizedList
                                data={SECTIONS}
                                initialNumToRender={4}
                                renderItem={({ item }) => <ListItem data={item} />}
                                // keyExtractor={item => item.key}
                                getItemCount={getItemCount}
                                getItem={getItem}
                            />
                        }
                        {
                            index === 1 && 
                            <VirtualizedList
                                data={SECTIONSONE}
                                initialNumToRender={4}
                                renderItem={({ item }) => <ListItem data={item} />}
                                // keyExtractor={item => item.key}
                                getItemCount={getItemCount}
                                getItem={getItem}
                            />
                        }
                        {
                            index === 2 && 
                            <VirtualizedList
                                data={SECTIONSTWO}
                                initialNumToRender={4}
                                renderItem={({ item }) => <ListItem data={item} />}
                                // keyExtractor={item => item.key}
                                getItemCount={getItemCount}
                                getItem={getItem}
                            />
                        }
                        {
                            index === 3 && 
                            <VirtualizedList
                                data={SECTIONSTHREE}
                                initialNumToRender={4}
                                renderItem={({ item }) => <ListItem data={item} />}
                                // keyExtractor={item => item.key}
                                getItemCount={getItemCount}
                                getItem={getItem}
                            />
                        }
                    </View>    
                </View>
                <View style={styles.contentContainer}>
                    <Pressable
                    onPress={() => navigation.navigate('createActivity')}
                    style={styles.buttonContainer}>
                        <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                            <Text style={styles.buttonText}>
                                Schedule Now
                            </Text>
                        </LinearGradient>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'column',
    },
    topContainer: {
        width: width,
        justifyContent:'center',
        paddingVertical: 20
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingBottom: 20
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
    headTitle:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        paddingLeft: 40,
        paddingBottom:10
    },
    subTitle:{
        fontFamily: 'Inter',
        fontSize: 18,
        fontWeight: '600',
        color: '#2C2C2C',
        lineHeight: 25,
        paddingLeft: 40
    },
    tabMainContainer:{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    tabHead:{
        flexDirection: 'row',
        marginTop: 20
    },
    tabBox:{

    },
    tabButton:{
        borderRadius: 6,
        width: 80,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabButtonActive:{
        borderRadius: 6,
        width: 80,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5E6BFF'
    },
    tabText:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '700',
        color: '#87859A',
        lineHeight: 20,
        textAlign: 'center',
    },
    tabTextActive:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 20,
        textAlign: 'center',
    },
    tabWrapper:{
        width: '80%',
        marginTop: 20
    },
    tabContainer:{
        flexDirection: 'row',
        height: height / 2.7,
    },
    tabScrollContainer:{
        flexDirection: 'row',
    },
    tabContent:{
        width: '100%',
        height: 120,
        backgroundColor: '#F7F7F7',
        borderRadius: 15,
        marginVertical: 10,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    tabContentWrapper:{
        flexDirection: 'column',
        paddingLeft: 20,
        width: '100%'
    },
    topContentWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    topTitleWrapper:{
        flexDirection: 'column',
        
    },
    tabViewWrapper:{
        
    },
    tabTitle:{
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '500',
        color: '#2C406E',
        lineHeight: 20,
    },
    tabLabel:{
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: '400',
        color: '#9AA8C7',
        lineHeight: 20,
    },
    tabLocationWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#C8E7F0',
        borderRadius: 18,
        height: 20,
        marginTop: 20,
        maxWidth: 110,
        alignItems: 'center'
    },
    tabLocation:{
        color: '#000',
        fontFamily: 'Inter',
        fontSize: 11,
        fontWeight: '400',
        lineHeight: 14
    },
    groupIcon:{
        marginTop: 10
    },
    actionItem:{
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    startButton:{
        backgroundColor: '#5D6AFE',
        borderRadius: 15,
        height: 31,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    startButtonText:{
        color: '#FFF',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18
    },
    contentContainer:{
        width: '80%',
    },
    buttonContainer: {
        width: '100%',
        height: 60,
        marginVertical: 40
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

export default ScheduledHome;