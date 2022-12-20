import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Day from './Day'
import Month from './Month'
import Week from './Week'
import Year from './Year'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
    return (
        <View style={styles.container}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14,fontWeight:'500',textTransform: 'none', alignSelf: 'center', textAlign: 'center', marginTop: '5%'},
                        tabBarItemStyle: { justifyContent: 'center', alignContent:'center', alignSelf:'center',alignItems:'center'},
                        tabBarStyle: { justifyContent: 'center', marginHorizontal:35, elevation: 0, height:'8%'},
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: 'grey',
                        tabBarIndicatorStyle: { backgroundColor: '#5E6BFF', height: '100%', borderRadius: 10, borderRadius: 10,alignSelf:'center' },
                        tabBarBounces: true
                    }}>
                    <Tab.Screen
                        name="day" component={Day} 
                        options={{
                            tabBarLabel: 'Day',
                        }}
                        />
                    <Tab.Screen name="week" component={Week} 
                    options={{
                        tabBarLabel: 'Week'
                    }}
                    />
                    <Tab.Screen name="month" component={Month} 
                    options={{
                        tabBarLabel: 'Month'
                    }}
                    />
                    <Tab.Screen name="year" component={Year} 
                    options={{
                        tabBarLabel: 'Year'
                    }}
                    />
                    
                </Tab.Navigator>
        </View>
    )
}

export default TopTabNavigator;

const styles = StyleSheet.create({
    container: {
        flex:1,
        // height: '100%',
        backgroundColor: 'white'
    }
})