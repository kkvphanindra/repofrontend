import { ScrollView, StyleSheet, Text, TextInput, Image, TouchableOpacity, Alert, View, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import ChatInnerItem from '../components/Chat/ChatInnerItem';
import ChatHeader from '../components/Chat/ChatHeader';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client'
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather'
var socket, selectedChatCompare;
import {BASE_URL} from '@env'

const data = [
  {
    senderMessage: 'I am good. how are you all good?',
  },
  {
    senderMessage: 'I am good.how are you all good?',
  },
  {
    senderMessage: 'I am good.how are you all good?',
  },
  {
    senderMessage: 'I am good.how are you all good?',
  },
];
const GroupChat = ({ navigation, route }) => {
  const { group, authId } = route.params
  const chatState = useSelector((state) => state.chatState)
  const dispatch = useDispatch()
  const authState = useSelector((state)=> state.authState)
  const [video, setVideo] = useState('')
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const launchCameraPhoto = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.openPicker({
      mediaType: 'any',
      // multiple: true
    }).then(video => {
      console.log(video);
      setVideo(video);
      sendMessage(video);
    });

  }
  let user = {
    "userId": "3ac1df80-5a6e-11ed-a871-7d8265a60df7",
    "firstName": "Andalib",
    "lastName": "Quraishi",
    "photo": "https://assets.vogue.in/photos/622f9af651da11b2e5b0b176/master/pass/7%20times%20Alia%20Bhatt%20served%20sublime%20beauty%20moments%20.jpg",
    "countryCode": "91",
    "phoneNumber": "9748121112",
    "createdAt": "2022-11-02T05:21:39.705Z",
    "updatedAt": "2022-11-02T05:21:39.705Z"
  }
  var endPoint = `https://frisles.herokuapp.com`


  const getMessagesByChatId = async () => {
    // if (!selectedChat) return;

    try {

      setLoading(true);
      const response = await axios.get(
       BASE_URL +
        `/api/message/chat/${group.chatId}?userId=${authId}`,
      );
      console.log("res", response.data)
      setMessages(response.data);
      setLoading(false);

      socket.emit("join chat", group.chatId);
    } catch (error) {
      console.log("err", error.message)
      Alert.alert("error")
    }
  };
  useEffect(() => {
    socket = io(BASE_URL);
    socket.emit("setup", authState);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // getAllMessageByChatId()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMessagesByChatId()
  }, [group.chatId])
  useEffect(() => {
    console.log("new msg", selectedChatCompare)
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare.chatId !== newMessageRecieved.chatId
        // newMessageRecieved
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      }
      else {
        setMessages([...messages, newMessageRecieved]);
        console.log("new msg", newMessageRecieved)
      }
      console.log("new msg inside ", newMessageRecieved)
    });
  }, []);
  // console.log("time", moment().toISOString())
  // console.log("old msg", messages)
  const typingHandler = (event) => {
    setNewMessage(event);
    console.log(event)
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", group.chatId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", group.chatId);
        setTyping(false);
      }
    }, timerLength);
  };
  const sendMessage = async (video) => {
    // console.log("event",event.nativeEvent)
    if (newMessage) {
      socket.emit("stop typing", group.chatId);
      try {
        setNewMessage("");
        await axios.post(
          BASE_URL +
          `/api/message/chat/${group.chatId}/user/${authId}`,
          {
            content: newMessage,
            createdAt: moment().toISOString(),
            // firstName: user.firstName,
            // lastName: user.lastName,
            name: authState.name,
            profilePicture: authState.profilePicture
          },
        ).then(async (response) => {
          if (response.status == 200) {
            // console.log("re", messages)
            console.log(response.data)
            await socket.emit("new message", response.data);

            // await messages.push(response.data)
            setMessages([...messages, response.data]);

          }
        })


      } catch (error) {
        console.log("error at send message", error.response.status)
        Alert.alert("error of send message")
      }
    }
    else if (video) {
      socket.emit('stop typing', group.chatId);
      console.log("before try")
      try {
        // console.log('form data',formData);
        setNewMessage('');
        const formData = new FormData();
        // video.forEach((item, i) => {
        formData.append('content', {
          uri: video.path,
          type: video.mime,
          name: video.filename || `filename${video.size}.${video.path.slice(-3)}`,
        });
        // });
        formData.append('createdAt', moment().toISOString())
        formData.append('profilePicture', authState.profilePicture)
        formData.append('name', authState.name)
        // formData.append('lastName', user.lastName)
        await axios
          .post(BASE_URL + `/api/message/chat/${group.chatId}/user/${authId}`,
            formData,
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          .then(async response => {
            // console.log("res", response)
            if (response.status == 200) {
              // console.log("re", messages)
              // console.log("video res",response.data);
              await socket.emit('new message', response.data);

              // await messages.push(response.data)
              setMessages([...messages, response.data]);
            }
          });
      } catch (error) {
        console.log('error at send message', error);
        Alert.alert('error of send message');
      }
    }
  };
  // console.log("first",group.groupPhoto)
  return (
    <View style={styles.container}>
      <ChatHeader
        name={group.chatName}
        profilePic={group.groupPhoto}
        number={group.users.map((i) => i.name + ",")}
        navigation={navigation}
        onPressName={() => navigation.navigate('groupDetails', { chatId: group.chatId })}
      />
      <ScrollView>
        {messages.map(item => {
          return (
            <ChatInnerItem
              navigation={navigation}
              // receiverUsername={item?.data?.firstName +'\b'+ item?.data?.lastName}
              // receiverMessage={item?.data?.content}
              send={item?.data?.userId}
              isSender={item?.isSender}
              pic={item?.data?.profilePicture }
              // username={item?.data?.firstName + '\b' + item?.data?.lastName}
              username={item?.data?.name}
              message={item?.data?.content}
              time={moment(item?.data?.createdAt).format("hh:mm a")}
            />
          );
        })}
      </ScrollView>
      <View style={{ backgroundColor: 'white', width: windowWidth / 1, height: 60 }}>
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            placeholderTextColor='#000'
            placeholder='Type here'
            value={newMessage}
            onChangeText={(e) => typingHandler(e)}
            onSubmitEditing={sendMessage}
          // onKeyPress={sendMessage}
          />
          <TouchableOpacity style={styles.emoticon}>
            <Image
              source={require('../assets/icons/png/smile.png')}
              style={{ height: 25, width: 25, marginTop: '19%', marginLeft: '7%', }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.emoticon} onPress={() => launchCameraPhoto()}>
            <Image
              source={require('../assets/icons/png/cameraColor.png')}
              style={{ height: 27, width: 27, marginTop: '19%', marginLeft: '7%', }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.emoticon} onPress={() => sendMessage()}>
            <Feather name='send' size={22} color='#5d6afe'
            // style={styles.emoticon} onPress={()=> sendMessage()}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default GroupChat;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    // margin: 12,
    color: '#000',
    borderRadius: 20,
    width: windowWidth / 1.6,
    marginLeft: '3%',
    marginBottom: '3%',
    marginTop: '3%',
    // backgroundColor: 'red',
    alignSelf: 'center'
  },
  inputView: {
    flexDirection: 'row',
    height: 50,
    // marginTop: '12%',
    alignSelf: 'center',
    width: windowWidth / 1.1,
    borderWidth: 1,
    // top: 0,
    bottom: 10,
    // marginLeft: '10%',
    // marginBottom: '10%',
    // marginRight: '10%',
    borderRadius: 10,
    borderColor: '#5d6afe',
    backgroundColor: '#EDF0FE',
    // padding: 10,
    position: 'absolute',
  },
  emoticon: {
    // backgroundColor: 'black',
    // borderColor: 'blue',
    // borderWidth: 1,
    marginLeft: '1%',
    marginTop: '3%',
    width: 26,
    height: 26,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 100 / 2,
  },
});
