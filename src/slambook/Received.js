import { StyleSheet, Text, View,FlatList } from 'react-native'
import React,{useCallback,useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { getAllSlambookByUserId } from '../redux/Slambook/action';
import SlambookReceivedFlatlist from '../components/slambook/SlambookReceivedFlatlist';

const Received = () => {
  const slambookState=useSelector((state)=>state.slambookState)
  const authState=useSelector((state)=>state.authState)
  const dispatch=useDispatch()
  useFocusEffect(
    useCallback(()=>{
      dispatch(getAllSlambookByUserId(authState.userId,true, null))
    },[dispatch]))
  // console.log("slambook RECEIVED screen",slambookState.receivedData)
  return (
    <View style={styles.container}>
    <View style={styles.tabWrapper}>
      <FlatList
        data={slambookState.receivedData}
        renderItem={({item}) => <SlambookReceivedFlatlist data={item} />}
        keyExtractor={item => item.id}
      />
    </View>
    </View>
  )
}

export default Received

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff'
  },
  tabWrapper:{
    width: '100%',
    alignSelf: 'center',
},
})