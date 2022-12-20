import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import CustomIcon from '../../assets/icons/CustomIcons.js'


const CallListItem = (props) => {
    return (
        <View>
            <View style={styles.container}>
                
                    <Image style={styles.profileImage}
                        source={{
                            uri:
                                props.profileUrl
                        }} />
                    {props.isOnline ?
                        <View style={styles.isOnline} />
                        :
                        null
                    }
                
                <View style={styles.body}>
                    <Text style={styles.name}>{props.name}</Text>
                    <View style={styles.info}>
                    <CustomIcon name='Missed-call'  size={25}/> 
                    <Text style={styles.message}>{props.date}</Text>
                    </View>
                    
                </View>
                <View >
                    <Text style={styles.time}>{props.time}</Text>
                </View>
            </View>
        </View>
    )
}

export default CallListItem;

const styles = StyleSheet.create({
    profileImage: {
        width: 45,
        height: 45,
        borderRadius: 100 / 2,
    },
    container: {
        flexDirection: 'row',
        marginHorizontal: 30,
        paddingVertical:15,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1
    },
    body: {
        marginLeft: 15,
        flex: 1,
    },
    name: {
        fontWeight: '700',
        fontSize: 18,
        paddingBottom: 4,
        color: 'black'
    },
    message: {
        color: '#ABABAB',
        fontSize: 14,
        paddingLeft:10
    },
    time: {
        color: '#ABABAB',
        
    },
    unreadView: {
        backgroundColor: 'black',
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    unread: {
        color: 'white'
    },
    isOnline: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#636DD9',
        width: 15,
        height: 15,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 3
    },
    info:{
        flexDirection:'row',
        
    }
})