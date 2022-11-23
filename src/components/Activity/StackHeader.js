import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const StackHeader = (props) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.iconWrapper}>
                <Image style={styles.arrowIcon} source={require('../../assets/icons/png/backButton.png')} />
            </Pressable>
            {/* <AntDesign name={props.IconLeftName} size={props.IconLeftSize} color='#000' style={styles.IconLeft} onPress={()=>navigation.goBack()}/> */}
            <Text style={styles.header}>{props.header}</Text>
            <Pressable onPress={() => navigation.navigate('notifications')} style={styles.notifyWrapper}>
                <Image style={styles.arrowIcon} source={require('../../assets/images/notify-icon.png')} />
            </Pressable>
            {/* <Ionicons name={props.IconRightName} size={props.IconRightSize} color='#000' style={styles.IconRight} /> */}
            {/* {props.notification ?
                <View style={styles.isNotify}></View>
                : null
            } */}
        </View>
    )
}

export default StackHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // marginTop: '5%',
        width: '90%',
        alignSelf: 'center',
        // backgroundColor:'red',
        margin: '5%'
    },
    IconLeft: {
        // width: '30%'
    },
    header: {
        width: '59%',
        // backgroundColor: 'green',
        fontSize: 18,
        marginLeft: '5%',
        fontWeight: '600',
        alignSelf: 'center',
        color: '#000',
        textAlign: 'center'
    },
    IconRight: {
        marginLeft: '5%',
    },
    isNotify: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: 'red',
        width: 10,
        height: 10,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1
    },
    iconWrapper: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notifyWrapper: {
        width: 50,
        height: 50,
        marginLeft: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})