import { StyleSheet, Text, View } from 'react-native'
import React,{useCallback,useEffect} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { getAllSlambookByUserId } from '../redux/Slambook/action';

const Received = () => {
  const slambookState=useSelector((state)=>state.slambookState)
  const authState=useSelector((state)=>state.authState)
  const dispatch=useDispatch()
  useFocusEffect(
    useCallback(()=>{
      dispatch(getAllSlambookByUserId(authState.userId,true, null))
    },[dispatch])
    )
  return (
    <View>
      <Text>Received</Text>
    </View>
  )
}

export default Received

const styles = StyleSheet.create({})