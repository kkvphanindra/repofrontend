import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useDispatch, useSelector } from "react-redux";



const CustomDrawer = (props) => {
    const authState = useSelector((state)=>state.authState);
    
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
                    paddingHorizontal: 5,
                    alignSelf: 'center'
                }}>
                  <Image
                  style={{height:30, width: 30,marginLeft: 10,borderRadius:100/2}}
                  source={{uri: authState.profilePicture!==""?authState.profilePicture:'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'}}
                  />
                </View>
                <View style={{
                    padding: 10,
                    alignSelf: 'center'
                }}>
                    <Text style={{
                        alignSelf: 'center',
                        fontSize: 16,
                        fontWeight: '600',
                        color: 'white',
                        marginLeft: 1,
                    }}>{authState.name}</Text>
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
                <Text style={{color: '#fff'}}>App Version - V1.00</Text>
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