import { StyleSheet, TouchableOpacity, View, ScrollView, Image } from 'react-native'
import React, {useCallback} from 'react'
import ChatListItem from '../components/Chat/ChatListItem'
import { useNavigation } from '@react-navigation/native'
import { useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getAllChatListByUserId } from '../redux/Chat/actions';
import moment from 'moment'

export default function Chat() {
  const chatState = useSelector(state => state.chatState);
  const navigation = useNavigation()
  const authState = useSelector((state)=>state.authState)
  const [privateChat,setPrivatechat]=useState(true)
  const dispatch = useDispatch();
  const authId= authState.userId
  useFocusEffect(
    useCallback(()=>{
      dispatch(getAllChatListByUserId(authState.userId,privateChat, null))
    },[dispatch])
    )
    const contact = () => {
      navigation.navigate("allContacts",{isGroupChat:false})
    }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {chatState.singleFilterChat.map((item, index) => {
        return (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('chatSingle',{chat: item, authId})}>
              <ChatListItem 
                // id={item.chatId}
                name={item.chatName}
                profileUrl={item.users[0].profilePicture}
                lastMessage={item.lastMessage}
                time={moment(item.lastMessageTime).format("hh:mm a")}
                unread={item.unreadMessages}
                isOnline={false}
              />
            </TouchableOpacity>
          </View>
        )
      })}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={()=> contact()}>
        <Image 
        source={require('../assets/icons/png/plus.png')}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20
  },
  button: {
    position: 'absolute',
    bottom: 50,
    right: 40,
    backgroundColor: '#5d6aff',
    width: 60,
    height: 60,
    borderRadius: 45,
    color: 'white',
    alignItems:'center',
    alignContent:'center',
   
          resizeMode: 'contain',
          alignItems: 'center',
          justifyContent: 'center',
          elevation:5
  },
  plus: {
    fontSize: 45,
    color: 'white',
    alignSelf: 'center',
    

  }
})