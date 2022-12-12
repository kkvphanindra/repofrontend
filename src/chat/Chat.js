import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform, ScrollView } from 'react-native'
import React, {useCallback} from 'react'
import ChatListItem from '../components/Chat/ChatListItem'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getAllChatListByUserId } from '../redux/Chat/actions';
import {getContact} from '../redux/Chat/actions';
import moment from 'moment'
import Contacts from 'react-native-contacts';


import { getAllMessageByChatId } from '../redux/Message/actions';

const data = [
  {
    name: "Rajarshi",
    profileUrl: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    lastMessage: "This is Okay!",
    time: "12:34 PM",
    unread: 3,
    isOnline: true,
  },
  {
    name: "Krishna",
    profileUrl: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
    lastMessage: "Fine!",
    time: "12:34 PM",
    unread: 15,
    isOnline: false,
  }
]
export default function Chat() {
  const chatState = useSelector(state => state.chatState);
  const navigation = useNavigation()
  const authState = useSelector((state)=>state.authState)
  const [data, setData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [privateChat,setPrivatechat]=useState(true)
  const [refresh, setRefresh]=useState(false)
  const dispatch = useDispatch();
  const authId= authState.userId
  useFocusEffect(
    useCallback(()=>{
      dispatch(getAllChatListByUserId(authState.userId,privateChat, null))
    },[dispatch])
    )
    // console.log("ch", chatState.data[0].users[0])
    useEffect(() => {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
        }).then(() => {
          loadContacts();
        });
      } else {
        loadContacts();
      }
    }, []);
    const loadContacts = () => {
      Contacts.getAll()
        .then(contacts => {
          contacts.sort(
            (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
          );
          setData(contacts);
          setContacts(contacts.map(i => i.phoneNumbers.map(p => p.number)))
          // setContacts(contacts);
        })
        .catch(e => {
          alert('Permission to access contacts was denied');
          console.warn('Permission to access contacts was denied');
        });
    };
    let a= data.map(i=>i.displayName)
    // console.log(a)
    let num = '';
    let arr = [];
      for (let j = 0; j < contacts.length; j++) {
        const element = a[j];
        const element2 = contacts[j];
        // console.log("num", element2)
        let value = (element2[0] || '').replace(/[^+\d]+/g, "");
        // console.log("val", value)
        num=value;
        arr.push({'name':element, 'number': num});
      }
    // console.log("chatstate.contacts", chatState.data[0].users[0])
    const contact = () => {
      dispatch(getContact(arr))
      navigation.navigate("allContacts",{isGroupChat:false})
    }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {chatState.data.map((item, index) => {
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
        <Text style={styles.plus}>+</Text>
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


  },
  plus: {
    fontSize: 45,
    color: 'white',
    alignSelf: 'center',

  }
})