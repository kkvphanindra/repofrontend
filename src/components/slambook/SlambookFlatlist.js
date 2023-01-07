import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import React, { useState } from 'react'

const SlambookFlatlist = ({data}) => {
    const [button,setButton]=useState('')
    console.log("button", button)
  return (
    <View style={styles.listContainer} key={data.id}>
                 <Image style={styles.imageContainer} source={data.pic}/>
                 <View style={styles.contactWrapper}>
                     <Text style={styles.contactName}>{data?.fullName ? data?.fullName: ''}</Text>
                     <Text style={styles.contactNumber}>{data?.number}</Text>
                 </View>
                 <Pressable onPress={() => setButton('sent')} style={styles.smallButton}>
                     <Text style={styles.smallButtonText}>{data?.status}</Text>
                 </Pressable>
          </View>
  )
}

export default SlambookFlatlist

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        borderBottomColor: '#C7C7C7',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal:10,
        // backgroundColor: 'pink',
        width: '95%',
        alignSelf:'center'
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
        width: 100,
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