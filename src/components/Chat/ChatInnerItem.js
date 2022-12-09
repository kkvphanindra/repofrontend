import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,

} from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatInnerItem = props => {
  const navigation = props.navigation;
  const authState = useSelector((state)=>state.authState)
  // console.log(props.isSender,"ddd")
  const authId = authState.userId
  // const userId ="3ac1df80-5a6e-11ed-a871-7d8265a60df7"

  const [paused, setPaused] = useState(false);

  const togglePaused = ()=>{setPaused(prev => !prev)} // add this toggle function

  return (
    <View>
      {props.send === authId ?
        <>
          <View style={{ flexDirection: 'row', marginBottom: '1%' }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={{
                backgroundColor: props.message.includes('jpg') || props.message.includes('png') || props.message.includes('mp4') ? '#fff' : '#5d6afe',
                marginLeft: '10%',
                marginTop: '5%',
                height: 'auto',
                // height: windowHeight / 9,
                width: windowWidth / 1.5,
                borderTopEndRadius: 20,
                padding: 5,
                // borderBottomEndRadius: 10,
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }} key={props.key2}>
                <Text style={styles.senderUsername}>{props.username}</Text>
                {props.message.includes('jpg') || props.message.includes('png') || props.message.includes('jpeg')?
                  // ?
                  <View>
                    <Image source={{ uri: props.message ==''? null:props.message }} style={{
                      height: windowHeight / 4, width: windowWidth / 1.7, alignSelf: 'flex-start', margin: 10,
                      // borderTopEndRadius: 20,
                      borderTopRightRadius: 20,
                      padding: 5,
                      borderBottomEndRadius: 10,
                      borderTopLeftRadius: 20,
                      borderBottomLeftRadius: 20,
                    }} />
                  </View> : null
                }
                {props.message.includes('mp4') ?
                  <View style={{alignContent:'center',alignItems:'center'}}>
                    <Video
                      source={{ uri: props.message ==''? null:props.message}}
                      resizeMode='cover'
                      paused={paused}
                      repeat={true}
                      controls={true}
                      style={{
                        height: windowHeight / 4, width: windowWidth / 1.7, alignSelf: 'flex-start', margin: 10,
                        borderTopEndRadius: 20,
                        padding: 5,
                        // borderBottomEndRadius: 10,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}

                    />
                    <TouchableOpacity style={{alignSelf:'center'}} onPress={()=>togglePaused}>
                      <Text>Play!</Text>
                    </TouchableOpacity>
                  </View>
                  : null}
                {!props.message.includes('mp4') && !props.message
                  .includes('jpg') && !props.message
                  .includes('jpeg') && !props.message.includes('png')?
                  <View>
                    <Text style={styles.senderMessage}>{props.message}</Text>
                  </View> : null
                }
              </View>

              <View>
                <Text style={{ alignSelf: 'flex-end', marginRight: '5%', color: 'grey' }}>{props.time}</Text>
              </View>
            </View>
            <View style={styles.messageImageRight}>
              <Image
                style={{ height: 35, width: 35, borderRadius: 100 / 2, alignSelf: 'center', marginTop: '5%', justifyContent:'center', alignItems:'center'}}
                source={{uri:props.pic==''?'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg':props.pic }} />
            </View>
          </View>
        </>
        :
        <>
          <View style={{ flexDirection: 'row', marginBottom: '2%', marginRight: '2%' }}>
            <View style={styles.messageImage}>
              <Image
                style={{ height: 35, width: 35, borderRadius: 100 / 2 }}
                source={{uri:props.pic==''?'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg':props.pic}} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{
                backgroundColor: props.message.includes('jpg') || props.message.includes('png')|| props.message.includes('mp4') ||props.message.includes('jpeg')? '#fff' : '#dbdbdb',
                marginLeft: '2%',
                marginTop: '3%',
                padding: 5,
                // height: windowHeight / 9,
                height: 'auto',
                width: windowWidth / 1.4,
                borderTopEndRadius: 20,
                borderBottomEndRadius: 20,
                borderTopLeftRadius: 20,
              }} key={props.key1}>
                <Text style={styles.receiverUsername}>{props.username}</Text>
                {props.message.includes('jpg') || props.message.includes('png') ||props.message.includes('jpeg')?
                  // ?
                  <View>
                    <Image source={{ uri: props.message==''?null:props.message }} style={{
                      height: windowHeight / 4, width: windowWidth / 1.7, alignSelf: 'flex-start', margin: 10,
                      borderTopRightRadius: 20,
                      padding: 5,
                      borderBottomRightRadius: 10,
                      borderTopLeftRadius: 20,
                      // borderBottomLeftRadius: 20,
                    }} />
                  </View> : null
                }
                {props.message.includes('mp4') ?
                  <View>

                    <Video
                      source={{ uri: props.message==''?null:props.message }}
                      resizeMode='cover'
                      paused={paused}
                      repeat={true}
                      style={{
                        height: windowHeight / 4, width: windowWidth / 1.7, alignSelf: 'flex-start', margin: 10,
                        borderTopEndRadius: 20,
                        padding: 5,
                        // borderBottomEndRadius: 10,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20,
                      }}

                    />
                    <TouchableOpacity onPress={togglePaused}>
                      <Text>Play!</Text>
                    </TouchableOpacity>
                  </View>
                  : null}
                {!props.message.includes('mp4') && !props.message
                  .includes('jpg')&& !props.message
                  .includes('jpeg') && !props.message.includes('png') ?
                  <View>
                    <Text style={styles.receiverMessage}>{props.message}</Text>
                  </View> : null
                }
              </View>
              <View>
                <Text style={{ alignSelf: 'flex-end', marginRight: '5%', color: 'grey' }}>{props.time}</Text>
              </View>

            </View>
          </View>
        </>
      }
    </View>
  );
};

export default ChatInnerItem;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  messageImage: {
    // backgroundColor: 'black',
    marginLeft: '2%',
    marginTop: '12%',
    width: 30,
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 100 / 2,
  },
  message: {
    backgroundColor: '#dbdbdb',
    marginLeft: '2%',
    marginTop: '3%',
    padding: 5,
    // height: windowHeight / 9,
    height: 'auto',
    width: windowWidth / 1.4,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderTopLeftRadius: 20,
  },
  messageImageRight: {
    // backgroundColor: 'grey',
    marginLeft: '2%',
    marginTop: '12%',
    width: 30,
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 100 / 2,
  },
  messageRight: {
    backgroundColor: '#5d6afe',
    marginLeft: '10%',
    marginTop: '5%',
    height: 'auto',
    // height: windowHeight / 9,
    width: windowWidth / 1.5,
    borderTopEndRadius: 20,
    padding: 5,
    // borderBottomEndRadius: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  receiverUsername: {
    textAlign: 'left',
    fontSize: 14,
    color: '#000',
    marginTop: '2%',
    marginLeft: '5%',
    // margin: '5%'
  },
  receiverMessage: {
    textAlign: 'left',
    width: '90%',
    fontSize: 14,
    color: '#000',
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '5%',
  },
  senderUsername: {
    textAlign: 'left',
    fontSize: 14,
    color: '#fff',
    marginTop: '2%',
    marginLeft: '5%',
    // margin: '5%'
  },
  senderMessage: {
    textAlign: 'left',
    width: '90%',
    fontSize: 14,
    color: '#fff',
    marginTop: '2%',
    marginBottom: '2%',
    marginLeft: '5%',
  },
});
