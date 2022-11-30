import { StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform } from 'react-native'
import React, {useCallback} from 'react'
import ChatListItem from '../components/Chat/ChatListItem'
import { NavigationContainer } from '@react-navigation/native'
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
export default function Chat({ navigation }) {
  const chatState = useSelector(state => state.chatState);
  const [data, setData] = useState([]);
  const [contacts, setContacts] = useState([]);
const [privateChat,setPrivatechat]=useState(true)
const [refresh, setRefresh]=useState(false)
  const dispatch = useDispatch();
const authId= "3ac1df80-5a6e-11ed-a871-7d8265a60df7"
  useFocusEffect(
    useCallback(()=>{
      if(navigation.isFocused()){
  dispatch(getAllChatListByUserId(authId,privateChat, null))
      }
    },[dispatch,navigation.isFocused()])
    )
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
    console.log(a)
    let num = '';
    let arr = [];
      for (let j = 0; j < contacts.length; j++) {
        const element = a[j];
        const element2 = contacts[j];
        // console.log("num", element2)
        let value = (element2[0] || '').replace(/\D/g, '').slice(-10);
        // console.log("val", value)
        num=value;
        arr.push({'name':element, 'number': num});
      }
    console.log("arr", arr)
    const contact = () => {
      dispatch(getContact(arr))
      navigation.navigate("allContacts")
    }
  return (
    <View style={styles.container}>
      {chatState.data.map((item, index) => {
        return (
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('chatSingle',{chat: item, authId})}>
              <ChatListItem 
                // id={item.chatId}
                name={item.chatName}
                profileUrl={item.users[0].photo}
                lastMessage={item.lastMessage}
                time={moment(item.lastMessageTime).format("hh:mm a")}
                unread={item.unreadMessages}
                isOnline={false}
              />
            </TouchableOpacity>
          </View>
        )
      })}
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