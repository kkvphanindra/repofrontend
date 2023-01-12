import { StyleSheet, Text, View, ImageBackground, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const MainNotificationFlatList = ({ data }) => {
    // console.log("data", data)
    // 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg','https://cdn-icons-png.flaticon.com/128/893/893268.png','https://t3.ftcdn.net/jpg/04/03/79/12/240_F_403791228_wMHswsnL8Za47aJHpXhjOR1gR39sCtCy.jpg'
    const navigation = useNavigation()
    let v = moment.utc(data.createdAt).local().startOf('seconds').fromNow()
    return (
        <View>
            {
                data !== [] ?
                    <View style={styles.listContainer} key={data.id}>
                        <ImageBackground style={styles.imageContainer} imageStyle={{ borderRadius: 100 / 2 }} source={{ uri: data?.sentByUserId[0]?.profilePicture == "" ? 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg' : data?.sentByUserId[0]?.profilePicture }}>
                            <Image style={styles.statusIcon} source={data.category == 'GROUP' ?require('../../assets/images/notify-status-1.png') :
                                    data?.category == 'MESSAGE' ? require('../../assets/images/notify-status-1.png')  :
                                        data?.category == 'ACTIVITY' ? require('../../assets/images/notify-status-1.png'): null
                            } />
                        </ImageBackground>
                        <View style={styles.contactWrapper}>
                            <Text style={styles.contactName}>{data?.body ? data?.body : ''}</Text>
                            <Text style={styles.contactNumber}>{data?.category == 'GROUP' ? '@' + data.groupName : v}</Text>
                            <View style={styles.statusWrapper}>
                                {data?.category == 'GROUP' ?
                                    <>
                                        <Pressable onPress={() => navigation.navigate('slambookRequest')}>
                                            <Text style={styles.statusInfo}>JOIN</Text>
                                        </Pressable>
                                        <Pressable onPress={() => navigation.navigate('slambookRequest')}>
                                            <Text style={styles.declineStatus}>DECLINE</Text>
                                        </Pressable>
                                    </>
                                    :
                                    <>
                                        {data?.category == 'ACTIVITY' ?
                                            <>

                                                <Pressable onPress={() => navigation.navigate('slambookRequest')}>
                                                    <Text style={styles.statusInfo}>ACCEPT</Text>
                                                </Pressable>
                                                <Pressable onPress={() => navigation.navigate('slambookRequest')}>
                                                    <Text style={styles.declineStatus}>DECLINE</Text>
                                                </Pressable>
                                            </>
                                            :
                                            null
                                        }
                                    </>

                                }
                            </View>
                        </View>
                        <Pressable onPress={() => navigation.navigate('slambookRequest')} style={styles.smallButton}>
                            <Image style={styles.selectImage} source={require('../../assets/images/dot-menu.png')} />

                        </Pressable>
                    </View>
                    :
                    <Text style={{ color: 'black', justifyContent: 'center', alignSelf: 'center' }}>No Notification Found</Text>
            }
        </View>
    )
}

export default MainNotificationFlatList

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        height: 75,
        width:  72,
        borderRadius: 100 / 2,
        //    margin:5,
        backgroundColor: 'red'
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
    statusWrapper: {
        flexDirection: 'row',

    },
    statusInfo: {
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '600',
        color: '#3D5CFF',
        lineHeight: 18
    },
    declineStatus: {
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
    statusIcon: {
        width: 30,
        height: 30,
        position: 'relative',
        top: 45,
        left: 40,
        borderRadius: 20,
    }
})