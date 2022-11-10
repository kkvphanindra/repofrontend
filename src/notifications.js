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
    Image,
    TextInput,
    Button,
    VirtualizedList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const Notifications = ({navigation}) => {
    const groupDatas = [
        {
          "pic": require('../src/assets/images/contact-pic.png'),
          "statusPic": require('../src/assets/images/notify-status-1.png'),
          "name": 'You have got a Message',
          "number": '5 hrs ago',
          "status": 'JOIN',
          "id": 1
        },
        {
          "pic": require('../src/assets/images/contact-pic.png'),
          "statusPic": require('../src/assets/images/like-icon.png'),
          "name": 'Invited to Play Activity',
          "number": '5 min ago',
          "status": 'ACCEPT',
          "id": 2
        },
        {
          "pic": require('../src/assets/images/contact-pic.png'),
          "statusPic": require('../src/assets/images/notify-status-1.png'),
          "name": 'You have got a Message',
          "number": '5 hrs ago',
          "status": 'ENDORSE',
          "id": 3
        },
        {
          "pic": require('../src/assets/images/contact-pic.png'),
          "statusPic": require('../src/assets/images/like-icon.png'),
          "name": 'Invited to Play Activity',
          "number": '5 min ago',
          "status": 'JOIN',
          "id": 3
        },
        {
          "pic": require('../src/assets/images/contact-pic.png'),
          "statusPic": require('../src/assets/images/notify-status-1.png'),
          "name": 'Invited to Play Activity',
          "number": '5 min ago',
          "status": 'ENDORSE',
          "id": 4
        },
        {
          "pic": require('../src/assets/images/contact-pic.png'),
          "statusPic": require('../src/assets/images/like-icon.png'),
          "name": 'Invited to Play Activity',
          "number": '5 min ago',
          "status": 'JOIN',
          "id": 5
        },
        {
          "pic": require('../src/assets/images/contact-pic.png'),
          "statusPic": require('../src/assets/images/notify-status-1.png'),
          "name": 'You have got a Message',
          "number": '5 hrs ago',
          "status": 'ENDORSE',
          "id": 6
        },
        {
          "pic": require('../src/assets/images/contact-pic.png'),
          "statusPic": require('../src/assets/images/like-icon.png'),
          "name": 'Invited to Play Activity',
          "number": '5 min ago',
          "status": 'JOIN',
          "id": 7
        },
      ];
      const getItem = (data, index) => ({
        id: Math.random().toString(12).substring(0),
        name: data[index].name,
        number: data[index].number,
        status: data[index].status,
        pic: data[index].pic,
        statusPic: data[index].statusPic,
      });
      const getItemCount = (data) => groupDatas.length;
      const ListItem = ({ data }) => {
        // console.log('item', data)
        return (
            <View style={styles.listContainer} key={data.id}>
                <ImageBackground style={styles.imageContainer} source={data.pic}>
                <Image style={styles.statusIcon} source={data.statusPic} />
                </ImageBackground>    
                <View style={styles.contactWrapper}>
                    <Text style={styles.contactName}>{data?.name ? data?.name: ''}</Text>
                    <Text style={styles.contactNumber}>{data?.number}</Text>
                    <View style={styles.statusWrapper}>
                        <Pressable onPress={() => navigation.navigate('slambookRequest')}>
                            <Text style={styles.statusInfo}>{data?.status}</Text>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('slambookRequest')}>
                            <Text style={styles.declineStatus}>DECLINE</Text>
                        </Pressable>
                    </View>
                </View>
                <Pressable onPress={() => navigation.navigate('slambookRequest')} style={styles.smallButton}>
                    <Image style={styles.selectImage} source={require('../src/assets/images/dot-menu.png')} />
                        
                </Pressable>
            </View>
        )}
    return (
        <View style={styles.container}>
                <ImageBackground
                    source={require('../src/assets/images/offer-bg-top.png')}
                    resizeMode="cover"
                    style={styles.topContainer}>
                        <View style={styles.wrapper}>
                            <Pressable onPress={() => navigation.navigate('home')}  style={styles.iconWrapper}>
                                <Image style={styles.arrowIcon} source={require('../src/assets/images/left-arrow.png')} />
                            </Pressable>    
                            <Text style={styles.title}>Notifications</Text>
                            <Pressable onPress={() => navigation.navigate('notifications')}  style={styles.notifyWrapper}>
                                <Image style={styles.notifyIcon} source={require('../src/assets/images/filter.png')}/>
                            </Pressable>    
                        </View>
                </ImageBackground>
                <View style={styles.tabWrapper}>
                <View style={styles.tabContainer}>
                    <VirtualizedList
                            data={groupDatas}
                            initialNumToRender={4}
                            renderItem={({ item }) => <ListItem data={item} />}
                            // keyExtractor={item => item.key}
                            getItemCount={getItemCount}
                            getItem={getItem}
                    />
                </View>
                </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'column'
    },
    topContainer: {
        width: width,
        height: 144,
        justifyContent:'center'
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
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
    tabWrapper:{
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    tabContainer:{
        flexDirection: 'column',
        marginTop: 20,
        height: height-200,
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
    statusWrapper:{
        flexDirection: 'row',
        
    },
    statusInfo:{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',
        color: '#3D5CFF',
        lineHeight: 18
    },
    declineStatus:{
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
    statusIcon:{
        width: 32,
        height: 32,
        position: 'relative',
        top: 40,
        left: 50
    }
})

export default Notifications;