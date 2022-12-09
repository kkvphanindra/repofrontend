import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const SnapComment = (props) => {
  const authState = useSelector((state)=>state.authState)
  const authId = authState.userId;
  const navigation = useNavigation()
  return (
    <View>
          {props.send === authId ? (
            <>
              <View style={{flexDirection: 'row', marginBottom: '1%'}}>
                <View style={{flexDirection: 'column'}}>
                  <View style={styles.messageRight} key={props.key2}>
                    <Text style={styles.senderUsername}>{props.username}</Text>
                    <Text style={styles.senderMessage}>{props.message}</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        marginRight: '5%',
                        color: 'grey',
                      }}>
                      {props.time}
                    </Text>
                  </View>
                </View>
                <View style={styles.messageImageRight}>
                  <Image
                    style={{height: 35, width: 35, borderRadius: 100 / 2}}
                    source={props.pic}
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: '2%',
                  marginRight: '2%',
                }}>
                <View style={styles.messageImage}>
                  <Image
                    style={{height: 35, width: 35, borderRadius: 100 / 2}}
                    source={props.pic}
                  />
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View style={styles.message} key={props.key1}>
                    <Text style={styles.receiverUsername}>
                      {props.username}
                    </Text>
                    <Text style={styles.receiverMessage}>{props.message}</Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        marginRight: '5%',
                        color: 'grey',
                      }}>
                      {props.time}
                    </Text>
                  </View>
                </View>
              </View>
            </>
          )}
    </View>
  );
};

export default SnapComment;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  icon: {
  marginTop: '10%',
  marginRight: '8%',
  marginLeft: '5%'
  },
  header: {
    alignSelf: 'flex-start',
    margin: '5%',
    flexDirection: 'row',
  },
  headerText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  messageImage: {
    // backgroundColor: 'black',
    marginLeft: '5%',
    marginTop: '12%',
    width: 30,
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderRadius: 100 / 2,
  },
  message: {
    backgroundColor: '#dbdbdb',
    marginLeft: '5%',
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
    marginLeft: '20%',
    marginTop: '5%',
    height: 'auto',
    alignSelf: 'flex-end',
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
