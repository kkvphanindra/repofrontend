import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity, } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedUsers } from '../../redux/activity/action'

const GroupMembersFlatlist = ({item, groupN, groupId}) => {
    const activityState = useSelector((state)=>state.activityState)
    const dispatch = useDispatch()
    const kil = (name, userId) => {
        console.log('userId',item.userId);
        if (activityState.selectedUsers.includes(item.userId)) {
            dispatch(selectedUsers(activityState.selectedUsers.filter(value => value !== item.userId)))
        //   dispatch(reqName(chatState.name.filter(value => value !== name)));
        //   dispatch(reqUserId(chatState.userId.filter(value => value !== userId)));
          console.log('bi', activityState.selectedUsers);
        } else {
            dispatch(selectedUsers([...new Set([...activityState.selectedUsers, item.userId])]))
        //   dispatch(reqName([...new Set([...chatState.name, name])]));
        //   dispatch(reqUserId([...new Set([...chatState.userId, userId])]));
          console.log('se',activityState.selectedUsers);
        }
      };
      console.log('oie',activityState.selectedUsers, groupId, groupN);
  return (
    <View
    style={{
      flex: 1,
      // backgroundColor: '#EBECFE',
      justifyContent: 'center',
      alignContent: 'center',
      paddingVertical: 5,
      marginTop: '3%',
      // margin: '3%',
      borderBottomColor: '#cacaca',
      borderBottomWidth: 1,
      width: windowWidth / 1.2,
      alignSelf: 'center',
    }}>
    <View style={{flexDirection: 'row', width: '80%', alignContent: 'center'}}>
      <View>
        <Image
          source={{
            uri: item?.profilePicture!==""
              ? item?.profilePicture
              : 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg',
          }}
          style={{
            // backgroundColor: 'black',
            marginTop: '10%',
            marginLeft: '5%',
            marginBottom: '10%',
            alignSelf: 'center',
            height: 50,
            width: 50,
            borderRadius: 100 / 2,
          }}
        />
      </View>
      <View style={{width: '45%',alignSelf:'center'}}>
        <Text
          style={{
            // marginTop: '7%',
            marginBottom:'2%',
            marginLeft: '5%',
            color: '#000',
            // alignSelf:'center'
            // textAlign:'center'
          }}>
          {item?.name}
        </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => {console.log("id hey", item?.userId,"mkil",activityState.selectedUsers), kil(item?.userId)}} style={{
              height: 32,
              width: 32,
              marginTop: '6%',
              marginLeft: '50%',
              alignSelf: 'center',
            }}>
        {/* <TouchableOpacity onPress={()=> {
                        if (selectedBill.includes(item.id)) {
                            setSelectedBill(selectedBill.filter(value => value !== item.id))
                        } else {
                            setSelectedBill([ ...new Set([...selectedBill, item.id])] )
                        }
                    }}> */}
          {/* <TouchableOpacity> */}
            {/* <View> */}
                {activityState.selectedUsers.includes(item.userId)&&activityState.selectedUsers!==''?
                <Image
                  source={require('../../assets/icons/png/icon-done.png')}
                  style={{ height: 25, width: 25, marginTop: '19%', marginLeft: '1%', alignSelf: 'center' }}
                />
                :
                <Image
                source={require('../../assets/icons/png/icon-done-2.png')}
                style={{ height: 25, width: 25, marginTop: '19%', marginLeft: '1%', alignSelf: 'center' }}
              />
            }
            {/* </View> */}
            {/* <AntDesign
              name="check"
              size={20}
              color="#fff"
              style={styles.icon}
            /> */}
          {/* </TouchableOpacity> */}
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

export default GroupMembersFlatlist

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({})