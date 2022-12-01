import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Header from './Header'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chat from '../Chat';
import Group from '../Group';
import Call from '../Call';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import SearchBar from 'react-native-dynamic-search-bar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllChatListByUserId, reqFilter, removeFilter } from '../../redux/Chat/actions';
// import { getAll } from 'react-native-contacts';
// import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const tabHiddenRoutes = [
    "Chat",
    "Group",
    "Calls"
];
const ChatHome = ({ navigation, route }) => {
    const [showSearchbar, setShowSearchbar] = useState(false)
    const chatState = useSelector((state) => state.chatState)
    const [res, setRes] = useState(chatState.data);
    const [filter, setFilter] = useState(chatState.filterData)
    const [filteredData, setFilteredData] = useState(chatState.data);
    const [serachText, setSearchText] = useState('');
    const onClick = () => {
        setShowSearchbar(!showSearchbar)
    }
    const dispatch = useDispatch()
    const handleOnChangeText = text => {
        // ? Visible the spinner
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = res.filter(function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.chatName
                    ? item.chatName.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            dispatch(reqFilter(newData));
            setSearchText(text);
        } else {
            // dispatch(reqFilter(res));
            setSearchText(text);
        }
        console.log('filter data', chatState.filterData);
        console.log('search ', serachText);
    };
    //   console.log("cht", chatState.data)
    useLayoutEffect(() => {
        // const routeName = getFocusedRouteNameFromRoute(route);
        if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);
    return (
        // <View style={styles.container}>
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
                            <Image style={styles.badgeIcon} source={require('../../assets/icons/png/search-icon.png')} />
                        </TouchableOpacity>
                    </View>
                    :
                    <SearchBar
                        style={{ marginTop: '5%' }}
                        // onClearPress={()=>onClick()}
                        onClearPress={() => {  dispatch(removeFilter()),handleOnChangeText(''), onClick() }}
                        onChangeText={val => handleOnChangeText(val)}
                    />
                }
                {/* {console.log("first", filteredData)} */}
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14, textTransform: 'none', fontWeight: '500' },
                        tabBarItemStyle: { justifyContent: 'center', marginTop: '5%' },
                        tabBarStyle: { justifyContent: 'center', marginHorizontal: 40, elevation: 0, marginTop: '12%', backgroundColor: 'transparent' },
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: 'black',
                        tabBarIndicatorStyle: { backgroundColor: 'rgb(94,107,255)', height: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                        tabBarBounces: true,
                        //   tabBarContentContainerStyle: {backgroundColor: 'pink'}
                    }}>
                    <Tab.Screen
                        name="Chat">
                        {() => <Chat />}
                    </Tab.Screen>
                    <Tab.Screen name="Group" component={Group} />
                    <Tab.Screen name="Calls" component={Call} />
                </Tab.Navigator>
            </ImageBackground>
            {/* </View> */}
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