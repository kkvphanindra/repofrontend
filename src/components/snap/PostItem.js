import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Share,
  PermissionsAndroid,
  Platform,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import axios from 'axios';
const {height} = Dimensions.get('window');
import OptionsMenu from 'react-native-option-menu';
import {useDispatch} from 'react-redux';
import {addPostLike, postShare} from '../../redux/Post/actions';
import LoadingComponet from './LoadingComponent';
import SnapComment from './SnapComment';
import ImagePicker from 'react-native-image-crop-picker';
import io from 'socket.io-client';
import SnapCommentHeader from './SnapCommentHeader';
import { useNavigation } from '@react-navigation/native';
import AudioRecorderPlayer,{
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

var socket, selectedChatCompare;

const permission = async () => {
  if (Platform.OS === 'android') {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
  
      console.log('write external stroage', grants);
  
      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
}
const PostItem = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const scrollViewRef = useRef();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [started, setStarted] = useState(false)
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
  const onShare = async (id) => {
    try {
      const result = await Share.share({
        message: props.message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          // console.log("shr", result)
        } else {
          // shared
          sharePost(id, user.userId)
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const sharePost = (postId) => {
dispatch(postShare(postId,user.userId ))
  }
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
  // console.log(",ol")
//   useEffect(async() => {
//     if (Platform.OS === 'android') {
//       try {
//         const grants = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         ]);
    
//         console.log('write external stroage', grants);
    
//         if (
//           grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//             PermissionsAndroid.RESULTS.GRANTED &&
//           grants['android.permission.READ_EXTERNAL_STORAGE'] ===
//             PermissionsAndroid.RESULTS.GRANTED &&
//           grants['android.permission.RECORD_AUDIO'] ===
//             PermissionsAndroid.RESULTS.GRANTED
//         ) {
//           console.log('Permissions granted');
//         } else {
//           console.log('All required permissions not granted');
//           return;
//         }
//       } catch (err) {
//         console.warn(err);
//         return;
//       }
//     }
//   }, []);
//  const  onStartRecord = async () => {
//     // permission()
//     const path = 'hello.mp3';
//     const audioSet = {
//       AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//       AudioSourceAndroid: AudioSourceAndroidType.MIC,
//       AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//       AVNumberOfChannelsKeyIOS: 2,
//       AVFormatIDKeyIOS: AVEncodingOption.aac,
//     };
//     console.log('audioSet', audioSet);
//     const uri = await audioRecorderPlayer.startRecorder();
//     audioRecorderPlayer.addRecordBackListener((e) => {
//       setStarted(true)
//       setRecordSecs(e.currentPosition);
//       setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)))
//     });
//     console.log(`uri: ${uri}`, recordSecs,recordTime);
//   };

//   const onStopRecord = async () => {
//     const result = await audioRecorderPlayer.stopRecorder();
//     audioRecorderPlayer.removeRecordBackListener();
//     setStarted(false)
//     setRecordSecs(0)
//     console.log(result);
//   };
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
                    source={props.profilePic}
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
                <View style={styles.postHeadingInfo}>
                  <View style={styles.postEndorsed}>
                    <Text style={styles.postEndorsedText}>{props.endorsed}</Text>
                  </View>
                  <View style={styles.postGenuine}>
                    <Text style={styles.postGenuineText}>{props.genuine}</Text>
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
            <View style={styles.postHorizontalLine}/>
            <View style={styles.postBody}>
              <View style={styles.postBodyTextView}>
                <Text numberOfLines={2} style={styles.postBodyText}>
                  {props.postText}
                </Text>
              </View>
              {props.image? (
                <Image
                  style={styles.postBodyAttachmentView}
                  source={props.image}
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
                  <TouchableOpacity style={styles.postActionMainLogo} onPress={()=>console.log("object")}>
                  {/* <TouchableOpacity style={styles.postActionMainLogo} onPress={()=>onStopRecord()}> */}
                    {mic ? (
                      <Image
                        source={require('../../assets/icons/png/micClicked.png')}
                      />
                      // </TouchableOpacity>
                    ) : (
                      // <TouchableOpacity style={styles.postActionMainLogo} onPress={()=>onStartRecord()}>
                        <Image
                          source={require('../../assets/icons/png/mic.png')}
                        />
                        )}
                        </TouchableOpacity>
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
                    () => {onShare(props.id)
                      // sharePost(props.id)
                    }
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
    marginBottom: '4%',
    alignContent: 'space-between',
  },
  postHeadingImageAndInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  postHeadingImage: {
    paddingRight: 10,
  },
  postImage: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 100 / 2,
  },
  postHeadingInfo: {
  width:'39%'
  },
  postHeadingInfoName: {
    paddingBottom: 5,
  },
  postNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  postHeadingInfoGroups: {
    marginBottom: '10%',
  },
  postGroupText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#A5A4A8',
  },
  postEndorsed:{
    alignSelf: 'flex-end',
    backgroundColor:'#d0eff9',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    margin: '2%'
  },
  postEndorsedText:{
    fontSize: 12,
    fontWeight: '500',
  color:'#000',
  },
  postGenuine: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffdddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    margin: '2%'
  },
  postGenuineText: {
    fontSize: 12,
    fontWeight: '500',
  color:'#000'
  },
  postHeadingActions: {
    margin: '2%'
  },
  postHorizontalLine: {
    borderBottomWidth: 1,
    borderColor: '#DDDDDD',
    borderBottomColor: '#DDDDD',
  },
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
