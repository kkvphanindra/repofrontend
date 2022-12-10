import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import ChatListItem from '../components/Chat/ChatListItem';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllChatListByUserId} from '../redux/Chat/actions';
import {getContact} from '../redux/Chat/actions';
import Contacts from 'react-native-contacts';
import moment from 'moment';

export default function Group({navigation}) {
  const authState = useSelector(state => state.authState);
  const chatState = useSelector(state => state.chatState);
  const [data, setData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [groupChat, setGroupchat] = useState(true);
  const dispatch = useDispatch();
  const authId = authState.userId;
  useFocusEffect(
    useCallback(() => {
      if (navigation.isFocused()) {
        console.log('group chat');
        // alert("today is true",today)
        // console.log("before hook today", today)
        dispatch(getAllChatListByUserId(authState.userId, null, groupChat)); // replace with your function
      }
    }, [dispatch, navigation.isFocused()]),
  );
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
        setContacts(contacts.map(i => i.phoneNumbers.map(p => p.number)));
      })
      .catch(e => {
        alert('Permission to access contacts was denied');
        console.warn('Permission to access contacts was denied');
      });
  };
  let a = data.map(i => i.displayName);
  // console.log(a)
  let num = +'';
  let arr = [];
  for (let j = 0; j < contacts.length; j++) {
    const element = a[j];
    const element2 = contacts[j];
    // console.log("num", element2)
    let value = (element2[0] || '').replace(/[^+\d]+/g, "");
    // console.log("val", value)
    num = value;
    arr.push({name: element, number: num});
  }
  // console.log("arr", chatState.contacts, arr)
  const contact = async () => {
    await dispatch(getContact(arr));
    navigation.navigate('groupCreation');
  };
  return (
    <View style={styles.container}>
      {chatState.data.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('groupChat', {group: item, authId})
            }>
            <ChatListItem
              id={index}
              name={item.chatName}
              profileUrl={
                item.groupPhoto
                  ? item.groupPhoto
                  : 'https://cdn.vectorstock.com/i/preview-1x/26/28/group-of-people-icon-vector-15262628.webp'
              }
              lastMessage={item.lastMessage}
              time={moment(item.lastMessageTime).format('hh:mm a')}
              unread={item.unreadMessages}
              isOnline={item.isOnline}
            />
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles.button} onPress={() => contact()}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
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
  },
});
