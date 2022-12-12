import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {getContact, groupCreate} from '../redux/Chat/actions';
import Contacts from 'react-native-contacts';
import { ar, fi } from 'date-fns/locale';

const GroupCreation = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const authState = useSelector((state)=>state.authState)
  const chatState = useSelector(state => state.chatState);
  const [res, setRes] = useState(chatState.contacts);
  const [groupName, setGroupName] = useState('')
  const [selectedName, setSelectedName] = useState([authState.name]);
  const [number, setNumber] = useState([authState.userId])
  const [filteredData, setFilteredData] = useState(chatState.contacts);
  const [serachText, setSearchText] = useState('');
  const [name, setName] = useState([])
  const dispatch = useDispatch()
  const handleOnPress = item => {
    if (selectedName.includes(item)) {
      setSelectedName(selectedName.filter(value => value !== item));
    }
  };
  const handleOnChangeText = text => {
    // ? Visible the spinner
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = res.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchText(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredData(res);
      setSearchText(text);
    }
    console.log('filter data', filteredData);
    console.log('search ', serachText);

    // console.log("arr", arr.length, contacts.length)
    // ? After you've done to implement your use-case
    // ? Do not forget to set false to spinner's visibility
  };
  const clearFilter = text => {
    if (text) {
      return data;
    }
  };
  const onSubmit = ()=>{
    dispatch(groupCreate(groupName,number, authState.userId))
    navigation.navigate('Group')
  }

  // console.log('changed', selectedName,number);
  // console.log('chatstate', chatState.contacts);
  return (
    <View style={styles.container}>
      <ScrollView>
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
            <View style={styles.iconImage}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => navigation.navigate('groupEdit')}>
                <Image
                  source={require('../assets/icons/png/pen.png')}
                  style={{
                    height: 15,
                    width: 15,
                    marginTop: '30%',
                    marginLeft: '7%',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/icons/png/actions.png')}
              style={styles.moreOption}
            />
          </View>
        </ImageBackground>
        <View style={{alignSelf: 'center'}}>
          <TextInput
            style={styles.input}
            placeholder="Enter group name"
            placeholderTextColor="#cacaca"
            value={groupName}
            onChangeText={(e)=>setGroupName(e)}
          />
        </View>
        <View>
          <Text style={styles.groupNo}>
            Group.{selectedName.length}participant
          </Text>
        </View>
        <View style={{backgroundColor: '#cccef3', marginTop: '10%'}}>
          <View>
            <Text style={styles.addpar}>Add Participants</Text>
          </View>
          <View>
            <SearchBar
              placeholder="Search here"
              onPress={() => alert('onPress')}
              style={styles.searchbar}
              onPress={()=>navigation.navigate("allContacts",{isGroupChat:true})}
              editable={false}
            />
          </View>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {selectedName.map(item => {
                return (
                  <View>
                    <View style={styles.selectName}>
                      <Text style={styles.selectText}>{item}</Text>
                      <TouchableOpacity
                        onPress={() => handleOnPress(item)}
                        style={{alignSelf: 'center'}}>
                        <Image
                          source={require('../assets/icons/png/wrong.png')}
                          style={{
                            height: 15,
                            width: 15,
                            // marginTop: '19%',
                            // marginLeft: '1%',
                            alignSelf: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <FlatList
            data={filteredData}
            keyExtractor={item => item?.userId}
            renderItem={({item}) => {
              // {console.log("null check", item?.userId==null? 'null': 'not null')}
              return (
                <View>
                  {/* <ScrollView> */}
                  {item?.userId==null?
                  null:
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#cccef3',
                      justifyContent: 'center',
                      marginTop: '2%',
                      borderBottomColor: '#c3c5e3',
                      borderBottomWidth: 1,
                      width: windowWidth / 1.1,
                      alignSelf: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View>
                        <Image
                          source={{
                            uri: item?.profilePicture
                              ? item?.photoPicture
                              : 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
                          }}
                          style={{
                            // backgroundColor: 'black',
                            marginTop: '10%',
                            marginLeft: '5%',
                            marginBottom: '10%',
                            height: 50,
                            width: 50,
                            borderRadius: 100 / 2,
                          }}
                        />
                      </View>
                      <View>
                        <Text
                          style={{
                            marginTop: '5%',
                            marginLeft: '5%',
                            color: '#000',
                          }}>
                          {item?.name }
                        </Text>
                        <Text
                          style={{
                            marginTop: '5%',
                            marginLeft: '5%',
                            color: '#000',
                          }}>
                          {item?.phone}
                        </Text>
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => {
                              if((selectedName.includes(item?.name))&&number.includes(item.userId)){
                                setSelectedName(
                                  selectedName.filter(
                                    value => value !== item?.name
                                  ),
                                  );
                                  setNumber(
                                    number.filter(
                                      value => value !== item?.userId
                                    ),
                                    );
                                  // console.log("bi", selectedName,number)
                              }
                             else {
                              setSelectedName([
                                ...new Set([...selectedName, item?.name]),
                              ]);
                              setNumber([
                                ...new Set([...number, item?.userId]),
                              ]);
                              // console.log("se", selectedName, number)
                            }
                          }}>
                          {/* {console.log("sele", selectedName,number)} */}
                          <View
                            key={item?.userId}
                            style={{
                              borderRadius: 100 / 2,
                              backgroundColor: selectedName.includes(
                                item.name,
                              )&&number.includes(item.userId)
                                ? '#5d6aff'
                                : '#B5B9DD',
                              height: 30,
                              width: 30,
                              marginTop: '10%',
                              marginLeft: '50%',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={require('../assets/icons/png/tick.png')}
                              style={{
                                height: 18,
                                width: 18,
                                marginTop: '19%',
                                marginLeft: '1%',
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                }
                  {/* </ScrollView> */}
                </View>
              );
            }}
          />
          {/* </View> */}
          {/* )} */}
          {/* <View style={{position: 'absolute', bottom: -90, alignSelf: 'center'}}> */}
          <Text style={styles.addpar}>Message</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Writr about your activity or thoughts here"
            placeholderTextColor="#cacaca"
          />
          {/* </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '20%',
            marginLeft: '5%',
            marginBottom: '5%',
          }}>
          <TouchableOpacity
          onPress={()=>onSubmit()}
            style={{
              // backgroundColor: '#000',
              width: '40%',
              borderRadius: 10,
              marginLeft: '5%',
              marginRight: '5%',
              // padding: 12
            }}>
            <LinearGradient
              style={styles.buttonWrapper}
              colors={['#5E6BFF', '#212FCC']}>
              <Text style={styles.buttonText}>Create Group</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              width: '40%',
              borderRadius: 10,
              borderColor: '#636DD9',
              borderWidth: 1,
              height: '20%',
              // marginLeft: '5%',
              marginRight: '5%',
              padding: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#636DD9',
                alignSelf: 'center',
                fontWeight: '500',
              }}>
              Invite Friends
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupCreation;

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
  input: {
    height: 45,
    color: '#000',
    backgroundColor: '#fff',
    marginTop: '10%',
    // marginLeft: '10'
    width: windowWidth / 1.7,
    // borderColor: '#cacaca',
    borderRadius: 10,
    // borderWidth: 1,
    padding: 15,
  },
  groupNo: {
    fontSize: 14,
    marginTop: '5%',
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  addpar: {
    marginTop: '5%',
    marginLeft: '8%',
    fontSize: 16,
    textAlign: 'left',
    color: '#000',
    fontWeight: '700',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    width: windowWidth / 1.5,
    backgroundColor: 'red',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icondropdown: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  searchbar: {
    margin: '5%',
    width: windowWidth / 1.2,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: 'grey',
    elevation: 10,
  },
  selectName: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    // marginBottom: '5%',
    backgroundColor: '#8091e6',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    // width: '35%',
  },
  selectText: {
    flexDirection: 'row',
    fontSize: 14,
    color: '#fff',
    padding: 5,
    textAlign: 'center',
    alignSelf: 'center',
    // width: '40%',
    // marginRight: '5%',
  },
  messageInput: {
    height: windowHeight / 4,
    width: windowWidth / 1.2,
    backgroundColor: '#fff',
    // top: 0,
    // bottom: 0,
    // position: 'absolute',
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 10,
    elevation: 10,
    alignSelf: 'center',
  },
  topContainer: {
    flex: 1,
    // backgroundColor: 'pink',
    width: windowWidth / 1,
    height: windowHeight / 6,
  },
  buttonWrapper: {
    width: '100%',
    height: '20%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 20,
    textAlign: 'center',
  },
});
