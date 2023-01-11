import {
  StyleSheet,
  Text,
  Switch,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, { useState, useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchBar from 'react-native-dynamic-search-bar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessages, editGroup, exitGroupChat, getGroupDetailsbyChatId } from '../redux/Chat/actions';


export default function GroupDetails({ navigation, route }) {
  const { chatId } = route.params;
  const groupNameRef = useRef();
  const authState = useSelector((state) => state.authState)
  const chatState = useSelector((state) => state.chatState)
  const [isEnabled, setIsEnabled] = useState(false);
  const [edit, setEdit] = useState(false)
  const [groupName, setGroupName]=useState('')
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const authId = authState.userId
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGroupDetailsbyChatId(chatId));
  }, [dispatch]);
  // useEffect((chatId, authId) => {
  // console.log("ddddddddddddd", chatState.data[0].users)
  function exit() {

    dispatch(exitGroupChat(chatId, authId));
    navigation.navigate('Chat')
  }
  function clearMessage() {
    console.log("inside function", chatId)
    dispatch(clearMessages(chatId,authState.userId));
    navigation.navigate('Chat')

  }
  const handleChangeEdit = (inputValue,e) => {
    setGroupName(prevres => (prevres,inputValue));
    // setGroupName(e)
  };
  const send = () =>{
    dispatch(editGroup(chatId,groupName))
    navigation.navigate('Group')
    // navigation.goBack()
    // console.log("first", groupName)
  }
  // console.log("first out", groupName)

  // }, [dispatch]);
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <ScrollView> */}
        {chatState.data.map((item) => {
          return (
            <View>
              <ImageBackground
                source={require('../assets/images/home-top-bg.png')}
                resizeMode="cover"
                style={styles.topContainer}>
                <View style={styles.header}>
                  <View style={styles.icon}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Image source={require('../assets/icons/png/backButton.png')} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.iconView}>
                    <Image
                      style={styles.iconImage}
                      source={{
                        uri: item?.groupPhoto ?
                          item?.groupPhoto :
                          'https://cdn.vectorstock.com/i/preview-1x/26/28/group-of-people-icon-vector-15262628.webp'
                      }}
                    />
                    {/* <View style={styles.edit}></View> */}
                  </View>
                  <Image
                    source={require('../assets/icons/png/actions.png')}
                    style={styles.moreOption}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                  {edit ?
                    <TextInput
                    ref={groupNameRef}
                      value={groupName}
                      autoFocus={edit}
                      style={styles.groupNameText}
                      // onChangeText={(e)=>setGroupName({...e})}
                      onSubmitEditing={send}
                      onChangeText={(e)=>handleChangeEdit(e)}
                      // onChangeText={()=>setGroupName()}
                      // onChange={(e)=>setGroupName(e)}
                    />
                    :
                    <Text style={styles.groupName}>{item?.chatName}</Text>
                  }
                  <TouchableOpacity style={{ marginTop: '5%', marginLeft: '3%' }} onPress={()=>setEdit(true)}>
                    <Image
                      source={require('../assets/icons/png/pencil.png')}
                      style={{
                        height: 20,
                        width: 16,
                        marginTop: '30%',
                        alignSelf: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.groupNo}>Group.{'\b'}{item?.users.length}{'\b'}participant</Text>
                </View>
              </ImageBackground>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <SearchBar
                    placeholder="Search Group"
                    onPress={() => alert('onPress')}
                    style={styles.searchbar}
                    onChangeText={text => console.log(text)}
                  />
                </View>
                <TouchableOpacity
                  style={{
                    marginTop: '7%',
                    height: 45,
                    width: 45,
                    backgroundColor: '#5d6aff',
                    elevation: 5,
                    shadowColor: 'grey',
                    borderRadius: 100 / 2,
                  }}>
                  <Image
                    source={require('../assets/icons/png/plus.png')}
                    style={{
                      height: 20,
                      width: 20,
                      marginTop: '30%',
                      alignSelf: 'center',
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.elevationView}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.message}>Mute Notification</Text>
                  <Switch
                    trackColor={{ false: '#767577', true: '#5d6aff' }}
                    thumbColor={isEnabled ? '#fff' : '#fff'}
                    style={{
                      marginLeft: '30%',
                    }}
                    // ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </View>
              <View style={styles.elevationView}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.message}>Group Call</Text>
                  <TouchableOpacity style={styles.call}>
                    <Image
                      source={require('../assets/icons/png/call-icon.png')}
                      style={{
                        height: 35,
                        width: 35,
                        alignSelf: 'center',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.elevationView2}>
                <FlatList
                  // style={{ flex: 1 }}
                  data={chatState.data[0].users}
                  keyExtractor={item => item?.id}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        {/* <ScrollView> */}
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            marginTop: '5%',
                            borderBottomColor: '#cacaca',
                            borderBottomWidth: 1,
                            width: windowWidth / 1.3,
                            alignSelf: 'center',
                          }}>
                          <View style={{ flexDirection: 'row' }}>
                            <View>
                              <Image
                                source={{
                                  uri: item?.profilePicture
                                    ? item?.profilePicture
                                    : 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg',
                                }}
                                style={{
                                  // backgroundColor: 'black',
                                  // marginTop: '5%',
                                  marginLeft: '5%',
                                  marginBottom: '10%',
                                  height: 50,
                                  width: 50,
                                  borderRadius: 100 / 2,
                                }}
                              />
                            </View>
                            <View style={{ alignSelf: 'center', width: '30%' }}>
                              <Text
                                style={{
                                  // marginTop: '5%',
                                  // justifyContent: 'center',
                                  // alignSelf: 'center',
                                  marginBottom: '10%',
                                  // width: '100%',
                                  marginLeft: '5%',
                                  color: '#000',
                                  // textAlign: 'center'
                                }}>
                                {item?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                marginTop: '4%',
                                marginLeft: '30%',
                              }}>
                              <Text
                                style={{
                                  color: '#636DD9',
                                }}>
                                {item?.isAdmin ? 'Admin' : null}
                              </Text>
                            </View>
                          </View>
                        </View>
                        {/* </ScrollView> */}
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          )
        })}
        {/* </ScrollView> */}
        <View style={styles.elevationView2}>
          <TouchableOpacity
            style={{
              borderBottomColor: '#cacaca',
              padding: 10,
              width: windowWidth / 1.3,
              alignSelf: 'center',
              borderBottomWidth: 1,
            }}>
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                // marginLeft:'5%',
                color: '#636DD9',
              }}>
              Export Chat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10 }}>
            <Text
              style={{
                padding: 10,
                fontSize: 16,
                // marginLeft:'5%',
                color: 'red',
              }} onPress={() => clearMessage()}>
              Clear Chat
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#ff8b77',
            width: '85%',
            borderRadius: 10,
            marginBottom: '5%',
            marginLeft: '5%',
            marginRight: '5%',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            alignContent: 'center',
            alignItems: 'center',
            padding: 15,
            flexDirection: 'row',
          }}>
          <Ionicons
            name="exit-outline"
            size={24}
            color="#fff"
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              width: '20%',
              marginLeft: '25%',
            }}
          />
          <Text
            style={{
              textAlign: 'left',
              color: '#fff',
              fontWeight: '500',
            }} onPress={() => exit()}>
            Exit Group
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebecff',
  },
  header: {
    flexDirection: 'row',
    // marginTop: '10%'
  },
  icon: {
    marginLeft: '5%',
    marginTop: '10%',
    marginRight: '5%',
  },
  iconView: {
    // backgroundColor: 'powderblue',
    alignSelf: 'center',
    marginTop: '7%',
    marginLeft: '25%',
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
  },
  iconImage: {
    backgroundColor: 'powderblue',
    alignSelf: 'center',
    marginTop: '7%',
    marginLeft: '25%',
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#636DD9',
    width: 30,
    height: 30,
    borderRadius: 100 / 2,
  },
  moreOption: {
    // backgroundColor: 'powderblue',
    marginLeft: '30%',
    marginTop: '11%',
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
  },
  groupName: {
    fontSize: 22,
    marginTop: '5%',
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginLeft: '5%',
  },
  groupNameText: {
    fontSize: 22,
    // backgroundColor: 'red',
    marginTop: '2.5%',
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginLeft: '5%',
  },
  groupNo: {
    fontSize: 12,
    marginTop: '2%',
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  searchbar: {
    marginTop: '10%',
    marginLeft: '9%',
    marginRight: '5%',
    height: 45,
    width: windowWidth / 1.5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: 'grey',
    elevation: 10,
  },
  plus: {
    fontSize: 45,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: '300',
  },
  elevationView: {
    width: windowWidth / 1.2,
    padding: 10,
    marginTop: '5%',
    elevation: 10,
    shadowColor: 'grey',
    borderRadius: 10,
    marginBottom: '5%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  elevationView2: {
    width: windowWidth / 1.2,
    padding: 10,
    marginTop: '1%',
    elevation: 10,
    shadowColor: 'grey',
    borderRadius: 10,
    marginBottom: '5%',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  message: {
    padding: 5,
    fontSize: 16,
    marginLeft: '5%',
    width: '50%',
    fontWeight: '400',
    color: '#000',
  },
  call: {
    // backgroundColor: 'black',
    marginLeft: '30%',
    width: '50%',
    // marginTop: '9%',
    width: 35,
    height: 35,
    borderRadius: 100 / 2,
  },
  topContainer: {
    flex: 1,
    // backgroundColor: 'pink',
    width: windowWidth / 1,
    height: windowHeight / 3.7,
  },
});
