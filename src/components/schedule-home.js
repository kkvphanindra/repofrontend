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
    TouchableHighlight,
    Image,
    SectionList,
    FlatList,
    VirtualizedList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ScheduleHome = () => {
    const navigation = useNavigation(); 
    const [index, setIndex] = useState(0);
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
                        </View>
                        <Pressable onPress={() => navigation.navigate('scheduledHome')} style={styles.tabViewWrapper}>
                            <Image source={require('../assets/images/dot-menu.png')} />
                        </Pressable>
                    </View>
                    <View style={styles.tabLocationWrapper}>
                        <Image style={styles.icon} source={require('../assets/images/location-icon.png')}/>
                        <Text style={styles.tabLocation}>{data.location}</Text>
                    </View>
                    <Image style={styles.groupIcon} source={data.pic}/>
                </View>
            </View>
        )
      }
    return (
        <View style={styles.container}>
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
                        horizontal
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
                        horizontal
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
                        horizontal
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
                        horizontal
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignItems: 'center',
    },
    tabHead:{
        flexDirection: 'row',
        marginVertical: 20
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
        marginVertical: 20,
    },
    tabContainer:{
        flexDirection: 'row',
        // height: 200
    },
    tabScrollContainer:{
        flexDirection: 'row',
        
    },
    tabContent:{
        width: 238,
        height: 160,
        backgroundColor: '#F9FAFD',
        borderRadius: 15,
        marginHorizontal: 10,
        flexDirection:'row',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    tabContentWrapper:{
        flexDirection: 'column',
        marginLeft: 20,
        width: '100%'
    },
    topContentWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topTitleWrapper:{
        flexDirection: 'column'
    },
    tabViewWrapper:{
        width: 50,
        height: 50,
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
    }
})

export default ScheduleHome;