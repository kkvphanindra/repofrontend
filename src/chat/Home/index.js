import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chat from '../Chat';
import Group from '../Group';
import Call from '../Call';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import SearchBar from 'react-native-dynamic-search-bar';
import { useDispatch, useSelector } from 'react-redux';
import {reqSingleChatFilter, reqGroupChatFilter } from '../../redux/Chat/actions';

const Tab = createMaterialTopTabNavigator();
const tabHiddenRoutes = [
    "Chat",
    "Group",
    "Calls"
];
const ChatHome = ({ navigation, route }) => {
    const [showSearchbar, setShowSearchbar] = useState(false)
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
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/home-top-bg.png')}
                resizeMode="cover"
                style={styles.topContainer}>
                {!showSearchbar ?
                    <View style={styles.menuContainer}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuWrapper}>
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
                        onClearPress={(text) => { onClick(), handleOnChangeText(text),handleOnChangeText('') }}
                        onChangeText={val => handleOnChangeText(val)}
                    />
                }
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14, textTransform: 'none', fontWeight: '500' },
                        tabBarItemStyle: { justifyContent: 'center',height:45 },
                        tabBarStyle: { justifyContent: 'center', marginHorizontal: 40, elevation: 0, marginTop: '12%', backgroundColor: 'transparent' },
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: 'black',
                        tabBarIndicatorStyle: { backgroundColor: 'rgb(94,107,255)' , height: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                        tabBarBounces: true,
                    }}>
                    <Tab.Screen
                        name="Chat">
                        {() => <Chat />}
                    </Tab.Screen>
                    <Tab.Screen name="Group" component={Group} />
                    <Tab.Screen name="Calls" component={Call} />
                </Tab.Navigator>
            </ImageBackground>
        </View>
    )
}

export default ChatHome;

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
        height: height / 4
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
})