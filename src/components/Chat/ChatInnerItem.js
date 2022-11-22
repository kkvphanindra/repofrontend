import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChatInnerItem = props => {
  const navigation = props.navigation;
  // console.log(props.isSender,"ddd")
  const authId= "3ac1df80-5a6e-11ed-a871-7d8265a60df7"
  // const userId ="3ac1df80-5a6e-11ed-a871-7d8265a60df7"
  return (
    <View>
      {props.send===authId?
        <>
          <View style={{ flexDirection: 'row', marginBottom: '1%' }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.messageRight} key={props.key2}>
                <Text style={styles.senderUsername}>{props.username}</Text>
                <Text style={styles.senderMessage}>{props.message}</Text>
              </View>
              <View>
                <Text style={{ alignSelf: 'flex-end', marginRight: '5%',color: 'grey' }}>{props.time}</Text>
              </View>
            </View>
            <View style={styles.messageImageRight}>
              <Image
                style={{ height: 35, width: 35, borderRadius: 100 / 2 }}
                source={props.pic} />
            </View>
          </View>
        </>
        :
        <>
          <View style={{ flexDirection: 'row', marginBottom: '2%', marginRight: '2%' }}>
            <View style={styles.messageImage}>
              <Image
                style={{ height: 35, width: 35, borderRadius: 100 / 2 }}
                source={props.pic} />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={styles.message} key={props.key1}>
                <Text style={styles.receiverUsername}>{props.username}</Text>
                <Text style={styles.receiverMessage}>{props.message}</Text>
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
