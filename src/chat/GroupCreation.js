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
  Alert,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {
  getContact,
  groupCreate,
  reqName,
  stateCleanUp,
} from '../redux/Chat/actions';
import ImagePicker from 'react-native-image-crop-picker'
import Contacts from 'react-native-contacts';
import {useNavigation} from '@react-navigation/native';

const GroupCreation = ({route, selectedName}) => {
  // const {name}=route?.params
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation();
  const authState = useSelector(state => state.authState);
  const chatState = useSelector(state => state.chatState);
  const [res, setRes] = useState(chatState.contacts);
  const [groupName, setGroupName] = useState('');
  const [image, setImage] = useState('');
  const [send, setSend]=useState('')
  const [message, setMessage]=useState('')
  const [selectedNames, setSelectedNames] = useState([]);
  const [number, setNumber] = useState([authState.userId]);
  const [filteredData, setFilteredData] = useState(chatState.contacts);
  const [serachText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const handleOnPress = item => {
    if (chatState.name.includes(item)) {
      dispatch(reqName(chatState.name.filter(value => value !== item)));
    }
  };
  const onSubmit = () => {
    if(message!==null||message!==''){
      dispatch(groupCreate(groupName, chatState.userId, authState.userId, send, message, Alert));
      navigation.navigate('Chat');
    }else{
      Alert.alert('Enter the message')
    }
  };
  const launchCameraPhoto = async() => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   console.log(image);
    // });
    ImagePicker.openPicker({
      mediaType: 'photo',
      // multiple: true
    }).then(img => {
      console.log(img.path);
      setImage(img.path);
      setSend(img);
    });
  };
  console.log('changed', message);
  // console.log('chatstate', chatState.name, chatState.userId);
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
            <Image style={styles.iconImageBg}
          source={{uri:image?image:'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg'}}
          />
            {/* </Image> */}
              <TouchableOpacity
                style={styles.edit}
                onPress={() => launchCameraPhoto()}>
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
            onChangeText={e => setGroupName(e)}
          />
        </View>
        <View>
          <Text style={styles.groupNo}>
            Group. {chatState.name?.length} participant
          </Text>
        </View>
        <View style={{backgroundColor: '#cccef3', marginTop: '10%'}}>
          <View>
            <Text style={styles.addpar}>Add Participants</Text>
          </View>
          <View>
            <SearchBar
              placeholder="Search here"
              style={styles.searchbar}
              onPress={() =>
                navigation.navigate('allContacts', {isGroupChat: true})
              }
              editable={false}
            />
          </View>
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {chatState.name?.map(item => {
                return (
                  <View>
                    <View style={styles.selectName}>
                      <Text style={styles.selectText}>{item}</Text>
                      {/* {chatState.name.find(y=>y==authState.name)?
                      null: */}
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
                      {/* } */}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          {/* </View> */}
          {/* )} */}
          {/* <View style={{position: 'absolute', bottom: -90, alignSelf: 'center'}}> */}
          <Text style={styles.addpar}>Message</Text>
          <TextInput
            style={styles.messageInput}
            multiline={true}
            onChangeText={(e)=>setMessage(e)}
            placeholder="Write about your activity or thoughts here"
            placeholderTextColor="#cacaca"
          />
          {/* </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            paddingBottom:30,
            marginLeft: '5%',
            marginBottom: '5%',
            height:300
          }}>
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={{
              // backgroundColor: '#000',
              width: '40%',
              borderRadius: 10,
              marginLeft: '5%',
              marginRight: '5%',
              height:'100%'
              // height:'150%'
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
              alignContent:'center',
              justifyContent:'center',
              marginRight: '5%',
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
    // backgroundColor: 'powderblue',
    alignSelf: 'center',
    marginTop: '7%',
    marginLeft: '25%',
    width: 80,
    height: 80,
    borderRadius: 100/2,
  },
  iconImageBg: {
    // backgroundColor: 'powderblue',
    alignSelf: 'center',
    marginTop: '7%',
    marginLeft: '25%',
    width: 80,
    height: 80,
    borderRadius: 100/2,
  },
  edit: {
    position: 'absolute',
    // bottom: 0,
    // right: 0,
    left:60,
    top:60,
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
