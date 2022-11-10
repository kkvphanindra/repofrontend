import React, {useState} from 'react';
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
    VirtualizedList,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

const SlambookHome = ({navigation}) => {
    const [index, setIndex] = useState(0);
    const tab = ['Received - 21', 'Sent - 20', 'Pending - 8'];
    const groupDatas = [
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Goku',
          "number": '9878321453',
          "id": 1
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Trunks',
          "number": '9878321453',
          "id": 2
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Freza',
          "number": '9878321453',
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Yamcha',
          "number": '9878321453',
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Pikolo',
          "number": '9878321453',
          "id": 4
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Cullin',
          "number": '9878321453',
          "id": 5
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Vegeta',
          "number": '9878321453',
          "id": 6
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Gohan',
          "number": '9878321453',
          "id": 7
        },
      ];
    const groupDatasONE = [
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Trunks',
          "number": '9878321453',
          "id": 2
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Goku',
          "number": '9878321453',
          "id": 1
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Freza',
          "number": '9878321453',
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Yamcha',
          "number": '9878321453',
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Pikolo',
          "number": '9878321453',
          "id": 4
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Cullin',
          "number": '9878321453',
          "id": 5
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Vegeta',
          "number": '9878321453',
          "id": 6
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Gohan',
          "number": '9878321453',
          "id": 7
        },
      ];
    const groupDatasTWO = [
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Goku',
          "number": '9878321453',
          "id": 1
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Trunks',
          "number": '9878321453',
          "id": 2
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Freza',
          "number": '9878321453',
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Yamcha',
          "number": '9878321453',
          "id": 3
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Pikolo',
          "number": '9878321453',
          "id": 4
        },
        {
          "pic": require('../assets/images/picture-3.png'),
          "name": 'Cullin',
          "number": '9878321453',
          "id": 5
        },
        {
          "pic": require('../assets/images/picture-1.png'),
          "name": 'Vegeta',
          "number": '9878321453',
          "id": 6
        },
        {
          "pic": require('../assets/images/picture-2.png'),
          "name": 'Gohan',
          "number": '9878321453',
          "id": 7
        },
      ];
      const getItem = (data, index) => ({
        id: Math.random().toString(12).substring(0),
        name: data[index].name,
        number: data[index].number,
        pic: data[index].pic,
      });
      const getItemCount = (data) => groupDatas.length;
      const ListItem = ({ data }) => {
        // console.log('item', data)
        return (
            <View style={styles.listContainer} key={data.id}>
                <Image style={styles.imageContainer} source={data.pic}/>
                <View style={styles.contactWrapper}>
                    <Text style={styles.contactName}>{data?.name ? data?.name: ''}</Text>
                    <Text style={styles.contactNumber}>{data?.number}</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('slambookRequest')} style={styles.smallButton}>
                    <Text style={styles.smallButtonText}>Revert</Text>
                </Pressable>
            </View>
        )}
    return (
        <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/offer-bg-top.png')}
                    resizeMode="cover"
                    style={styles.topContainer}>
                        <View style={styles.wrapper}>
                            <Pressable onPress={() => navigation.navigate('slambookRequest')}  style={styles.iconWrapper}>
                                <Image style={styles.arrowIcon} source={require('../assets/images/menu-icon.png')}/>
                            </Pressable>    
                            <Pressable onPress={() => navigation.navigate('notifications')}  style={styles.notifyWrapper}>
                                <Image style={styles.notifyIcon} source={require('../assets/images/notify-icon.png')}/>
                            </Pressable>    
                            <Pressable onPress={() => navigation.navigate('slambookRequest')}  style={styles.iconWrapper}>
                                <Image style={styles.badgeIcon} source={require('../assets/images/search-black.png')}/>
                            </Pressable>    
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.headTitle}>Slambook</Text>
                            <Pressable onPress={() => navigation.navigate('slambookRequest')}  style={styles.btnWrapper}>
                                <Text style={styles.btnTitle}>Send Request</Text>
                            </Pressable>
                        </View>
                        <View style={styles.tabSection}>
                        {
                            tab.length && tab.map((e,i) => {
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
                </ImageBackground>

                <View style={styles.tabWrapper}>
                <View style={styles.tabContainer}>
                {
                        index === 0 && 
                        <VirtualizedList
                            data={groupDatas}
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
                            data={groupDatasONE}
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
                            data={groupDatasTWO}
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
        backgroundColor: '#FFF',
        flexDirection: 'column'
    },
    topContainer: {
        width: width,
        // height: 188,
    },
    wrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
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
    badgeIcon:{
        
    },
    titleContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginTop: 20,
        marginBottom: 40
    },
    headTitle:{
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '700',
        color: '#2C2C2C',
        lineHeight: 30,
        textAlign: 'center',
    },
    btnWrapper:{
        backgroundColor: '#FF8B77',
        width: 101,
        borderRadius: 15,
        height: 31,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTitle:{
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',
        color: '#FFF',
        lineHeight: 20,
        textAlign: 'center',
    },
    tabSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 'auto'
    },
    tabBox:{

    },
    tabButton:{
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    tabButtonActive:{
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        height: 42,
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
        width: '100%',
        alignItems: 'center',
    },
    tabContainer:{
        flexDirection: 'column',
        marginTop: 20,
        height: height / 1.62,
        width: '80%',
        backgroundColor: '#FFF'
    },
    listContainer: {
        flexDirection: 'row',
        borderBottomColor: '#D2D107',
        borderBottomWidth: 1,
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
        backgroundColor: '#5D6AFF',
        width: 74,
        height: 35,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallButtonText: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '400',
        color: '#FFF',
        lineHeight: 16,
        textAlign: 'center'
    },
})

export default SlambookHome;