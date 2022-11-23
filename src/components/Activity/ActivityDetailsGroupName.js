import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activityByActivityId } from '../../redux/activity/action'
import moment from 'moment'

const data = [
    {
        id: 1,
        img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
        name: 'Crystal Merlin',
        date: '08.02.2022',
        status: 'Scheduled'
    },
    {
        id: 2,
        img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
        name: 'Crystal Merlin',
        date: '08.02.2022',
        status: 'Accepted'
    },
    {
        id: 3,
        img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
        name: 'Crystal Merlin',
        date: '08.02.2022',
        status: 'Declined'
    },
    {
        id: 4,
        img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
        name: 'Crystal Merlin',
        date: '08.02.2022',
        status: 'Scheduled'
    },
    {
        id: 5,
        img: 'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
        name: 'Crystal Merlin',
        date: '08.02.2022',
        status: 'Accepted'
    },
]
const ActivityDetailsGroupName = ({id,groupName}) => {
    const activityState=useSelector((state)=>state.activityState)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(activityByActivityId(id))
    },[dispatch])
    console.log("state", activityState?.data[0]?.users[0]?.userId? "hey":'not hey')
    const renderItems = ({ item }) => {
        return (
            <ScrollView>

                <View
                    style={styles.flatlist}>
                    {/* <Text style={{color: "#000"}}>{item?.name}</Text> */}
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image
                                source={{
                                    uri: item?.photo
                                        ? item?.photo
                                        : 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
                                }}
                                style={{
                                    // backgroundColor: 'black',
                                    marginTop: '10%',
                                    marginLeft: '1%',
                                    marginBottom: '10%',
                                    height: 50,
                                    width: 50,
                                    borderRadius: 100 / 2,
                                }}
                            />
                        </View>
                        <View style={{ width: '45%', marginLeft: '3%' }}>
                            <Text
                                style={{
                                    marginTop: '5%',
                                    marginLeft: '5%',
                                    color: '#000',
                                }}>
                                {item?.firstName}{" "}{item?.lastName}
                            </Text>
                            <Text
                                style={{
                                    marginTop: '2%',
                                    marginLeft: '5%',
                                    color: 'grey',
                                    fontSize: 12,
                                }}>
                                {moment(item?.createdAt).format("DD-MM-YYYY")}
                            </Text>
                        </View>
                        <View>
                            <View>
                                <View
                                    key={item?.id}
                                    style={{
                                        borderRadius: 20,
                                        backgroundColor:
                                            item?.status === 'SCHEDULED' ? '#636DD9' :
                                                item?.status === 'ACCEPTED' ? '#78CB7C' :
                                                    item?.status === 'DECLINED' ? '#FD8B7A' : '#000000',
                                        height: 30,
                                        width: 90,
                                        marginTop: '10%',
                                        padding: 6,
                                        marginLeft: '15%',
                                        alignSelf: 'center',
                                    }}>
                                    <Text style={styles.acceptText}>
                                       {item?.status}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
    return (
        <View style={{  marginTop: '10%',
        backgroundColor: activityState?.data[0]?.users[0]?.userId?'#EBECFE':'#fff'}}>
            <ScrollView>
                <Text style={styles.groupName}>{groupName}</Text>
                <FlatList
                    //   style={{ flex: 1, padding: 0 }} activityState.data[0].users
                    data={activityState?.data[0]?.users}
                    keyExtractor={item => item?.id}
                    renderItem={renderItems}
                />
            </ScrollView>
        </View>
    )
}

export default ActivityDetailsGroupName

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        backgroundColor: '#EBECFE'
        // backgroundColor: 'red'
    },
    groupName: {
        fontSize: 20,
        color: '#000',
        fontWeight: '700',
        marginLeft: '9%',
        marginTop: '8%',
        letterSpacing: 0.5
    },
    flatlist: {
        //   flex: 1,
        backgroundColor: '#EBECFE',
        //   justifyContent: 'center',
        marginTop: '2%',
        padding: 10,
        // marginLeft: '9%',
        borderBottomColor: '#cacaca',
        borderBottomWidth: 1,
        width: windowWidth / 1.2,
        alignSelf: 'center',
    },
    acceptText: {
        fontSize: 12,
        color: '#fff',
        alignSelf: 'center',
        fontWeight: '600'
    },
})