import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Received from '../Received';
import Sent from '../Sent'
import {createDrawerNavigator} from '@react-navigation/drawer';
import { DrawerActions, getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import SearchBar from 'react-native-dynamic-search-bar';
import { useDispatch, useSelector } from 'react-redux';
// import {reqSingleChatFilter, reqGroupChatFilter } from '../../redux/Chat/actions';

const Tab = createMaterialTopTabNavigator();
const tabHiddenRoutes = [
];
const Drawer = createDrawerNavigator();
const SlambookTopTab = ({route }) => {
    const slambookState=useSelector((state)=>state.slambookState)
    const [showSearchbar, setShowSearchbar] = useState(false)
    const navigation=useNavigation()
    const chatState = useSelector((state) => state.chatState)
    const onClick = () => {
        setShowSearchbar(!showSearchbar)
    }
    const dispatch = useDispatch()
    const handleOnChangeText = text => {
        console.log("nj", text, chatState.singleChat, chatState.groupChat)
        let d1=[];
        if(chatState.chatScreen){
            d1 = chatState.singleChat.filter(a => a.chatName.toLowerCase().includes(text));
            console.log("ch", d1)
            dispatch(reqSingleChatFilter(d1))
        }else if(chatState.groupScreen){
            d1 = chatState.groupChat.filter(a => a.chatName.toLowerCase().includes(text));
            console.log("ch", d1)
            dispatch(reqGroupChatFilter(d1))
        }
    };
    useLayoutEffect(() => {
        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);
    let receivedData = slambookState.receivedData
    let sentData = slambookState.sentData
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/home-top-bg.png')}
                resizeMode="cover"
                style={styles.topContainer}>
                {!showSearchbar ?
                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuWrapper}>
                            <Image style={styles.menuIcon} source={require('../../assets/icons/png/menu-icon.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('/')} style={styles.notifyWrapper}>
                            <Image style={styles.notifyIcon} source={require('../../assets/icons/png/notify-icon.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onClick()} style={styles.badgeWrapper}>
                            <Image style={styles.badgeIcon} source={require('../../assets/icons/png/search.png')} />
                        </TouchableOpacity>
                    </View>
                    :
                    <SearchBar
                        style={{ marginTop: '5%' }}
                        onClearPress={(text) => { onClick() }}
                        // onChangeText={val => handleOnChangeText(val)}
                        onChangeText={(e)=>console.log("object",e)}
                    />
                }
                   <View style={styles.titleContainer}>
                            <Text style={styles.headTitle}>Slambook</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('slambookRequest')}  style={styles.btnWrapper}>
                                <Text style={styles.btnTitle}>Send Request</Text>
                            </TouchableOpacity>
                        </View>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14, textTransform: 'none', fontWeight: '500' },
                        tabBarItemStyle: { justifyContent: 'center',height:45 },
                        tabBarStyle: { justifyContent: 'center', marginHorizontal: 40, elevation: 0, marginTop: '0%', backgroundColor: 'transparent' },
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: 'black',
                        tabBarIndicatorStyle: { backgroundColor: 'rgb(94,107,255)' , height: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                        tabBarBounces: true,
                    }}>
                    <Tab.Screen name="Received" component={Received} 
                    options={{
                        tabBarLabel:'Received'+' '+'-'+' '+receivedData.length
                    }}
                    />
                    <Tab.Screen name="Sent" component={Sent} 
                    options={{
                        tabBarLabel:'Sent'+' '+'-'+' '+sentData.length
                    }}
                    />
                </Tab.Navigator>
            </ImageBackground>
        </View>
    )
}

export default SlambookTopTab;

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topContainer: {
        flex: 1,
        // backgroundColor: 'pink',
        width: width / 1,
        height: height / 3.5
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30
    },
    menuWrapper: {
        marginLeft: 30
    },
    menuIcon: {
        width: 29,
        height: 20
    },
    notifyWrapper: {
        marginLeft: 'auto',
        marginRight: 30
    },
    notifyIcon: {
        width: 24,
        height: 24
    },
    badgeWrapper: {
        marginRight: 30
    },
    badgeIcon: {
        width: 25,
        height: 25
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
})