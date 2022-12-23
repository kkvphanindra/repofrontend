import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedUsers, UsersByGroupId } from '../../redux/activity/action'

const GroupMemberHeader = ({groupN, groupId}) => {
    const dispatch = useDispatch()
    const activityState = useSelector((state)=>state.activityState)
    // console.log("object",activityState.selectedUsers=='')
    const selectAll=()=>{
        // console.log("object")
        // let arr = []
        let filter = activityState.groupUser.map((i)=>i.userId)
        console.log("filter", filter)
        dispatch(selectedUsers(filter))
        // {activityState.groupUser.map((i)=>{
        //     return(
        //         <View>
        //             <Text>{i.userId}</Text>
        //         </View>
        //     )
        // })}
    }
  return (
    <View style={{flexDirection: 'row', marginLeft: '10%'}}>
            <Text style={styles.groupName}>{groupN}</Text>
            <TouchableOpacity
              style={styles.selectAll}
            //   onPress={()=>console.log("object")}>
             onPress={()=>selectAll()}> 
              <Text style={styles.selectAllText}>Select All</Text>
            </TouchableOpacity>
          </View>
  )
}

export default GroupMemberHeader

const styles = StyleSheet.create({
    groupName: {
        fontSize: 20,
        color: '#000',
        fontWeight: '700',
        // marginLeft: '10%',
        marginTop: '8%',
        width: '50%',
        letterSpacing: 0.5,
      },
      selectAll: {
        // fontSize: 20,
        // color: '#000',
        // fontWeight: '700',
        backgroundColor: '#5E6BFF',
        borderRadius: 20,
        padding: 5,
        alignSelf: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        marginLeft: '20%',
        marginTop: '8%',
        // letterSpacing: 0.5
      },
      selectAllText: {
        fontSize: 12,
        color: '#fff',
        paddingVertical: 2,
        paddingHorizontal: 8,
        fontWeight: '500',
        // marginLeft: '9%',
        // marginTop: '8%',
        // width: '50%',
        letterSpacing: 0.5,
      },
})