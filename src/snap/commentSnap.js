import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import SnapCommentHeader from '../components/snap/SnapCommentHeader';
import {useDispatch} from 'react-redux';
import io from 'socket.io-client';
import ImagePicker from 'react-native-image-crop-picker';
import SnapComment from '../components/snap/SnapComment';
import axios from 'axios';
var socket, selectedChatCompare;

const CommentSnap = ({navigation, route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  var endPoint = `https://frisles.herokuapp.com`;
  let user = {
    userId: '6dddae20-5925-11ed-a555-c9afc10124e6',
    firstName: 'Danish',
    lastName: 'ali',
    photo: 'https://i.ibb.co/pyhjCBx/ffd493ff-fe15-4d19-b645-635cadbab9d1.jpg',
    countryCode: '91',
    phoneNumber: '7439240134',
    createdAt: '2022-10-31T14:08:01.029Z',
    updatedAt: '2022-11-03T05:37:14.544Z',
  };
  const launchCameraPhoto = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };
  const getCommentByPostId = async () => {
    // if (!selectedChat) return;

    try {
      setLoading(true);
      console.log('id', id);
      const response = await axios.get(
        endPoint + `/api/post-comment/post/${id}`,
      );
      console.log('yo yo', response.data);
      setComment(response.data);
      setLoading(false);

      socket.emit('join chat', user.userId);
    } catch (error) {
      console.log('err', error.message);
      Alert.alert('error');
    }
  };
  useEffect(() => {
    socket = io(endPoint);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
    // getAllMessageByChatId()
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getCommentByPostId();
    selectedChatCompare = user;
  }, [user.userId]);
  useEffect(() => {
    console.log('new msg', selectedChatCompare);
    socket.on('message recieved', newMessageRecieved => {
      setComment([...comment, newMessageRecieved]);
      console.log('new msg', newMessageRecieved);
      // }
      console.log('new msg inside ', newMessageRecieved);
    });
  }, []);
  var userId = user.userId;
  const typingHandler = event => {
    setNewComment(event);
    console.log(event);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', user.userId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', user.userId);
        setTyping(false);
      }
    }, timerLength);
  };
  var commentData = {
    firstName: user.firstName,
    lastName: user.lastName,
    userId: user.userId,
  };
  const sendMessage = async event => {
    // console.log("event",event.nativeEvent){ userId: "987589785764767686536864657", comment: "nice"}
    if (newComment) {
      // socket.emit('stop typing',id);
      socket.emit('stop typing', user.userId);
      try {
        setNewComment('');
        console.log('cu', id);
        await axios
          .post(endPoint + `/api/post-comment`, {
            postId: id,
            userId: user.userId,
            comment: newComment,
          })
          .then(async response => {
            if (response.status == 200) {
              // console.log("re", messages)
              await socket.emit('comment', {
                userId: userId,
                comment: newComment,
                users: commentData,
              });
              // await socket.emit("new message", response.data);
              console.log("comment log",response.data);

              // await messages.push(response.data)
              setComment([...comment, response.data]);
            }
          });
      } catch (error) {
        console.log(
          'error at send message',
          error.response.data.msg,
          error.response,
        );
        Alert.alert('error of send message');
      }
    }
  };
  return (
    <View style={styles.container}>
      {/* <Text>{id}</Text> */}
      <SnapCommentHeader
        navigation={() => navigation.goBack()}
        header="Comments"
      />
      <ScrollView>
        {comment.map(item => {
          return (
            <>
              <SnapComment
                send={user.userId}
                pic={{
                  uri: 'https://i.ibb.co/pyhjCBx/ffd493ff-fe15-4d19-b645-635cadbab9d1.jpg',
                }}
                username={item.users.firstName + '\b' + item.users.lastName}
                message={item.comment}
              />
            </>
          );
        })}
      </ScrollView>
      <View style={{ backgroundColor: 'white', width: windowWidth / 1, height: 60 }}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#000"
          placeholder="Type here"
          value={newComment}
          // onChangeText={console.log("text")}
          onChangeText={e => typingHandler(e)}
          // onKeyPress={sendMessage}
        />
        <TouchableOpacity
          style={styles.emoticon}
          onPress={() => console.log('emoticons')}>
          <Image
            source={require('../assets/icons/png/smile.png')}
            style={{
              height: 22,
              width: 22,
              // marginTop: '19%', marginLeft: '5%',
            }}
          />
        </TouchableOpacity>
        {/* <EmojiBoard showBoard={show} onClick={onClick} containerStyle={{backgroundColor: 'red'}}/> */}
        <TouchableOpacity
          style={styles.emoticon}
          onPress={() => launchCameraPhoto()}>
          <Image
            source={require('../assets/icons/png/cameraColor.png')}
            style={{
              height: 24,
              width: 24,
              //  marginTop: '19%', marginLeft: '5%',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.emoticon} onPress={() => sendMessage()}>
          <Text>send</Text>
          {/* <Feather name='send' size={22} color='#5d6afe' 
            style={styles.emoticon} onPress={()=> sendMessage()}
            /> */}
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default CommentSnap;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 45,
    // margin: 12,
    borderRadius: 20,
    width: windowWidth / 1.6,
    marginLeft: '3%',
    marginBottom: '3%',
    marginTop: '3%',
    color: '#000',
    // backgroundColor: 'red',
    alignSelf: 'center',
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
