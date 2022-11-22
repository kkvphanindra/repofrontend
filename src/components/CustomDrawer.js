import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

const CustomDrawer = (props) => {
    return (
        <View style={styles.Container}>
            <View style={{
                flex: 0.15,
                justifyContent: 'center'
            }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: 'blue',
                    alignSelf: 'center',
                    marginTop: '5%',
                    height: windowHeight/18,
                    borderRadius: 20,
                    width: windowWidth/1.8
                }}>
                <View style={{
                    padding: 10,
                    alignSelf: 'center'
                }}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: '600',
                        color: 'white',
                        marginLeft: 10,
                    }}>Clara Fredry</Text>
                </View>
                </View>
            </View>
            <View style={{
                flex: 1,
                marginTop: '5%',
            }}>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </View>
            <View style={{
                marginBottom: '5%',
                margin: '5%'
            }}>
                <Text style={{color: '#fff'}}>App Version - V2.00</Text>
            </View>
        </View>
    )
}

export default CustomDrawer
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    horizontalLine: {
        width: 100,
        borderColor: '#fff',
        borderWidth: 1,
    }
})