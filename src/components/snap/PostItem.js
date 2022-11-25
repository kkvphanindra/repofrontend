import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import axios from 'axios';
const {height} = Dimensions.get('window');
import OptionsMenu from 'react-native-option-menu';
import {useDispatch} from 'react-redux';
import {addPostLike} from '../../redux/Post/actions';
import LoadingComponet from './LoadingComponent';
import SnapComment from './SnapComment';
import ImagePicker from 'react-native-image-crop-picker';
import io from 'socket.io-client';
import SnapCommentHeader from './SnapCommentHeader';
import { useNavigation } from '@react-navigation/native';

var socket, selectedChatCompare;

const PostItem = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  var endPoint = `https://frisles.herokuapp.com`;
  const heart = true;
  const comment = true;
  const mic = true;
  const share = true;
  const modalClose = () => {
    setModalVisible(!modalVisible);
  };
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
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: props.message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const [id, setId] = useState('');
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
  // const modalOpen = () => {
  //   setModalVisible(true);
  //   setId(props.id);
  //   getCommentByPostId()
  //   // console.log("pop id", props.id)
  // };
  // const getCommentByPostId = async () => {
  //   // if (!selectedChat) return;

  //   try {
  //     setLoading(true);
  //     console.log("id", props.id)
  //     const response = await axios.get(
  //       endPoint + `/api/post-comment/post/${props.id}`,
  //     );
  //     console.log('yo yo', response.data);
  //     setMessages(response.data);
  //     setLoading(false);

  //     socket.emit('join chat',id);
  //   } catch (error) {
  //     console.log('err', error.message);
  //     Alert.alert('error');
  //   }
  // };
  // useEffect(() => {
  //   socket = io(endPoint);
  //   socket.emit('setup', user);
  //   socket.on('connected', () => setSocketConnected(true));
  //   socket.on('typing', () => setIsTyping(true));
  //   socket.on('stop typing', () => setIsTyping(false));
  //   // getAllMessageByChatId()
  //   // eslint-disable-next-line
  // }, []);
  // useEffect(() => {
  //   getCommentByPostId();
  //   // selectedChatCompare = chat
  // }, []);

  // useEffect(() => {
  //   console.log("new msg",selectedChatCompare)
  //   socket.on("message recieved", (newMessageRecieved) => {
  //     if (
  //       !selectedChatCompare || // if chat is not selected or doesn't match current chat
  //       selectedChatCompare.props.id !== newMessageRecieved.props.id
  //       // newMessageRecieved
  //     )
  //     {
  //       if (!notification.includes(newMessageRecieved)) {
  //         setNotification([newMessageRecieved, ...notification]);
  //         setFetchAgain(!fetchAgain);
  //       }
  //     }
  //     else {
  //       setMessages([...messages, newMessageRecieved]);
  //       console.log("new msg", newMessageRecieved)
  //     }
  //     console.log("new msg inside ", newMessageRecieved)
  //   });
  // },[]);
  // console.log("time", moment().toISOString())
  // console.log("old msg", messages)
  // console.log("post id", props.id)
  // const typingHandler = event => {
  //   setNewMessage(event);
  //   console.log(event);
  //   if (!socketConnected) return;

  //   if (!typing) {
  //     setTyping(true);
  //     socket.emit('typing',id);
  //   }
  //   let lastTypingTime = new Date().getTime();
  //   var timerLength = 3000;
  //   setTimeout(() => {
  //     var timeNow = new Date().getTime();
  //     var timeDiff = timeNow - lastTypingTime;
  //     if (timeDiff >= timerLength && typing) {
  //       socket.emit('stop typing',id);
  //       setTyping(false);
  //     }
  //   }, timerLength);
  // };
  // const sendMessage = async event => {
  //   // console.log("event",event.nativeEvent)
  //   if (newMessage) {
  //     socket.emit('stop typing',id);
  //     try {
  //       setNewMessage('');
  //       console.log("cu", props.id)
  //       await axios
  //         .post(endPoint + `/api/post-comment`, {
  //           postId: id,
  //           userId: user.userId,
  //           comment: newMessage,
  //         })
  //         .then(async response => {
  //           if (response.status == 200) {
  //             // console.log("re", messages)
  //             await socket.emit('new message', response.data);
  //             console.log(response.data);

  //             // await messages.push(response.data)
  //             setMessages([...messages, response.data]);
  //           }
  //         });
  //     } catch (error) {
  //       console.log('error at send message', error.response.status);
  //       Alert.alert('error of send message');
  //     }
  //   }
  // };
  return (
    <View>
      {props.activityLoading ? (
        <View>
          <LoadingComponet />
        </View>
      ) : (
        <View>
          <View style={styles.post}>
            <View style={styles.postHeading}>
              <View style={styles.postHeadingImageAndInfo}>
                <View style={styles.postHeadingImage}>
                  <Image
                    source={{uri: props.profilePic}}
                    style={styles.postImage}
                  />
                </View>
                <View style={styles.postHeadingInfo}>
                  <View style={styles.postHeadingInfoName}>
                    <Text style={styles.postNameText}>{props.name}</Text>
                  </View>
                  <View style={styles.postHeadingInfoGroups}>
                    <Text style={styles.postGroupText}>{props.groupName}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.postHeadingActions}>
                <TouchableOpacity>
                  <OptionsMenu
                    button={require('../../assets/icons/png/actions.png')}
                    buttonStyle={styles.actionButton}
                    // destructiveIndex={1}
                    options={[
                      false ? 'Follow' : 'Unfollow',
                      'Hide post',
                      'Save Post',
                      'Report',
                      'Verify',
                      'Add to ★',
                      '',
                    ]}
                    actions={[
                      props.follow,
                      props.hidePost,
                      props.savePost,
                      props.report,
                      props.verify,
                      props.addTo,
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.postBody}>
              <View style={styles.postBodyTextView}>
                <Text numberOfLines={2} style={styles.postBodyText}>
                  {props.postText}
                </Text>
              </View>
              {props.image === '1' ? (
                <Image
                  style={styles.postBodyAttachmentView}
                  source={props.photo}
                />
              ) : null}
            </View>
            <View style={styles.postActions}>
              <View style={styles.postActionsMain}>
                <View style={styles.postMainAction}>
                  <TouchableOpacity
                    onPress={() =>
                      dispatch(
                        addPostLike(
                          props.id,
                          '6dddae20-5925-11ed-a555-c9afc10124e6',
                        ),
                      )
                    }
                    style={styles.postActionMainLogo}>
                    {props.heart ? (
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={require('../../assets/icons/png/heartClicked.png')}
                        />
                      </View>
                    ) : (
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          source={require('../../assets/icons/png/heart.png')}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                  <View style={styles.postMainActionInfo}>
                    <Text style={styles.postActionText}>{props.loves}</Text>
                  </View>
                </View>
                <View style={styles.postMainAction}>
                  <TouchableOpacity
                    style={styles.postActionMainLogo}
                    onPress={() => navigation.navigate('commentSnap', {id: props.id})}>
                    {comment ? (
                      <Image
                        source={require('../../assets/icons/png/commentClicked.png')}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/icons/png/comment.png')}
                      />
                    )}
                  </TouchableOpacity>
                  <View style={styles.postMainActionInfo}>
                    <Text style={styles.postActionText}>{props.comment}</Text>
                  </View>
                </View>
                <View style={styles.postMainAction}>
                  <View style={styles.postActionMainLogo}>
                    {mic ? (
                      <Image
                        source={require('../../assets/icons/png/micClicked.png')}
                      />
                    ) : (
                      <Image
                        source={require('../../assets/icons/png/mic.png')}
                      />
                    )}
                  </View>
                  <View style={styles.postMainActionInfo}>
                    <Text style={styles.postActionText}>{props.voices}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.postSecondaryAction}>
                <View style={styles.postSecondaryActionInfo}>
                  <Text style={styles.postActionText}>{props.shares}</Text>
                </View>
                <TouchableOpacity
                  style={styles.postSecondaryActionLogo}
                  onPress={
                    () => onShare()
                  }>
                  {props.shareItem === '1' ? (
                    <Image
                      source={require('../../assets/icons/png/shareClicked.png')}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/icons/png/share.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  top: {
    // alignItems: 'center',
    backgroundColor: 'yellow',
    // width: '100%'
  },
  topBar: {
    // height: height / 10,
    alignItems: 'flex-end',
  },
  profileInformation: {
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 10,
    color: 'black',
  },
  previousPost: {
    fontSize: 22,
    color: '#000',
    marginLeft: '7%',
    fontWeight: 'bold',
  },
  post: {
    // width: '100%',
    alignSelf: 'center',
    width: windowWidth / 1.1,
    flex: 1,
    marginTop: '5%',
    marginBottom: '5%',
    // height: 'auto',
    elevation: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    // marginVertical: 20
  },
  postHeading: {
    flexDirection: 'row',
    height: '23%',
    width: '100%',
    alignContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    borderBottomColor: '#DDDDD',
  },
  postHeadingImageAndInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  postHeadingImage: {
    paddingRight: 20,
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  },
  postHeadingInfo: {},
  postHeadingInfoName: {
    paddingBottom: 5,
  },
  postNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  postHeadingInfoGroups: {},
  postGroupText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#A5A4A8',
  },
  postHeadingActions: {},
  postBody: {},
  postBodyTextView: {
    paddingVertical: 15,
    height: 70,
  },
  postBodyText: {
    fontSize: 14,
    color: 'grey',
    fontWeight: '600',
  },
  postBodyAttachmentView: {
    height: 150,
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 15,
    color: 'black',
  },
  postBodyAttachment: {},
  postActions: {
    flexDirection: 'row',
    marginVertical: 20,
    alignContent: 'space-between',
    width: '100%',
  },
  postActionsMain: {flexDirection: 'row', flex: 1},
  postActionText: {
    fontSize: 12,
    color: '#A5A4A8',
    fontWeight: '400',
  },
  postMainAction: {flexDirection: 'row', paddingRight: 20},
  postActionMainLogo: {
    paddingRight: 10,
  },
  postMainActionInfo: {marginLeft: '5%', alignSelf: 'center'},
  postSecondaryAction: {flexDirection: 'row'},
  postSecondaryActionLogo: {},
  postSecondaryActionInfo: {
    paddingRight: 10,
  },
  actionButton: {
    height: 20,
    width: 20,
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

export default PostItem;
