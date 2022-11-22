import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View,Image} from 'react-native'
import React,{useLayoutEffect} from 'react'
import Header from './Header'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chat from '../Chat';
import Group from '../Group';
import Call from '../Call';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const tabHiddenRoutes = [
    "Chat",
    "Group",
    "Calls"
  ];
const ChatHome = ({navigation,route}) => {
    // const navigation = useNavigation()
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
                            <View style={styles.menuContainer}>
                            <TouchableOpacity onPress={() => navigation.openDrawer()}  style={styles.menuWrapper}>
                                <Image style={styles.menuIcon} source={require('../../assets/icons/png/menu-icon.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('/')}  style={styles.notifyWrapper}>
                                <Image style={styles.notifyIcon} source={require('../../assets/icons/png/notify-icon.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('/')}  style={styles.badgeWrapper}>
                                <Image style={styles.badgeIcon} source={require('../../assets/icons/png/search-icon.png')}/>
                            </TouchableOpacity>
                            </View>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14, textTransform: 'none' ,fontWeight:'500'},
                        tabBarItemStyle: { justifyContent: 'center', marginTop: '5%'},
                        tabBarStyle: { justifyContent: 'center', marginHorizontal: 40, elevation: 0, marginTop: '12%', backgroundColor: 'transparent'},
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: 'black',
                        tabBarIndicatorStyle: { backgroundColor: 'rgb(94,107,255)', height: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                        tabBarBounces: true,
                    //   tabBarContentContainerStyle: {backgroundColor: 'pink'}
                    }}>
                    <Tab.Screen
                        name="Chat" component={Chat} />
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
        flex:1,
        backgroundColor: 'white'
    },
    topContainer:{
        flex:1,
        // backgroundColor: 'pink',
        width: width/1,
        height: height/4
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
        width: 29,
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
        width: 25,
        height: 25
    },
})