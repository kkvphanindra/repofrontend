import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
const {height} = Dimensions.get('window');
import {openPicker} from 'react-native-image-crop-picker';
import GetLocation from 'react-native-get-location';
import {addNewPost, updateFields} from '../../redux/Post/actions';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const NewSnap = props => {
  const [state, setState] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const postState = useSelector(state => state.postState);

  const launchLibrary = async navigation => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    openPicker({
      multiple: true,
    }).then(images => {
      console.log(images);
    });

    //  await launchImageLibrary(options, async(response) => {

    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //     alert(response.customButton);
    //   } else {
    //     const source = { uri: response.uri };
    //     console.log('response', JSON.stringify(response));
    //     setState({
    //       filePath: response,
    //       fileData: response.data,
    //       fileUri: response.uri
    //     });
    //   }
    // })
  };

  const launchCameraPhoto = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };
  const getLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };

  const checkValidity = (val, fieldId) => {
    let isValid = true;

    if (
      fieldId === 'post' &&
      val.length <= 3 &&
      val != 'Write about your activity or throughts here'
    ) {
      isValid = false;
    }

    console.log(val);

    dispatch(updateFields(val, fieldId, isValid));
  };

  return (
    <View>
      <View style={styles.thoughts}>
        <Text style={styles.thoughtsHeading}>Your thoughts</Text>
        <View style={{}}>
          <View style={styles.thoughtsBox}>
            <View style={styles.thoughtsBoxInputViewBorder}>
              <TouchableOpacity style={styles.thoughtsBoxInputView} onPress={() => navigation.navigate('snapDetails')}>
                <TextInput
                  editable={props.editable ? props.editable : false}
                  multiline={true}
                  style={styles.thoughtsBoxInput}
                  placeholder="Write about your activity or thoughts here"
                  value={postState.inputValues.post}
                  onChangeText={value => checkValidity(value, 'post')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.thoughtBoxAttachments}>
              <View style={styles.attachmentBoxLeftCorner}>
                <TouchableOpacity onPress={() => launchLibrary()}>
                  <Image
                    source={require('../../assets/icons/png/gallery.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.attachmentBox}>
                <Image
                  source={require('../../assets/icons/png/tagPeople.png')}
                />
              </View>
              <View style={styles.attachmentBox}>
                <TouchableOpacity onPress={() => launchCameraPhoto()}>
                  <Image
                    source={require('../../assets/icons/png/camera.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.attachmentBox}>
                <Image
                  source={require('../../assets/icons/png/keywords.png')}
                />
              </View>
              <View style={styles.attachmentBoxRightCorner}>
                <TouchableOpacity onPress={() => getLocation()}>
                  <Image
                    source={require('../../assets/icons/png/location.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity style={styles.shareNowButton}>
            <LinearGradient
              style={styles.buttonWrapper}
              colors={['#5E6BFF', '#212FCC']}>
              <Text style={styles.buttonText}>Share Now</Text>
            </LinearGradient>
          </TouchableOpacity> */}
          {/* <View>
            <Text style={styles.previousPost}>Previous Post</Text>
          </View> */}
          {props.postButton ? (
            <>
              <View style={styles.postButtonView}>
                <TouchableOpacity
                  style={styles.postButton}
                  onPress={() =>{

                    dispatch(
                      addNewPost(
                        postState.inputValues.post,
                        '6dddae20-5925-11ed-a555-c9afc10124e6',
                      ),
                    )
                    navigation.navigate('snap')
                  }
                  }>
                    <LinearGradient
              style={styles.buttonWrapper}
              colors={['#5E6BFF', '#212FCC']}>
              <Text style={styles.buttonText}>Post Now</Text>
            </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const width =Dimensions.get('window').width;
// const wheight = Dimensions.get('window').height
const styles = StyleSheet.create({
  thoughts: {
    // width: '100%',
    // height: "auto",
    // position: 'relative',
    // top: -110,
    // bottom: 0,
    // backgroundColor: 'red',
    // flex: 1,
  },
  thoughtsHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: 'black',
  },
  thoughtsBox: {
    borderColor: 'grey',
    borderRadius: 15,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: '100%',

    borderColor: '#DDDDDD',
    backgroundColor: 'white',
  },
  thoughtsBoxInputViewBorder: {
    width: '100%',
    height: 160,
    backgroundColor: '#DDDDDD',
    borderRadius: 15,
    alignItems: 'center',
  },
  thoughtsBoxInputView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 159,
    backgroundColor: 'white',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    borderTopWidth: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: '#DDDDDD',
  },
  thoughtsBoxInput: {
    width: '98%',
    color: '#000',
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 15,
    fontWeight: '500',
  },
  thoughtBoxAttachments: {
    flexDirection: 'row',
    height: '30%',
    width: '100%',
    height: height / 15,
  },
  attachmentBox: {
    alignItems: 'center',
    borderColor: 'grey',
    flex: 1,
    height: '100%',
    borderLeftWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentBoxLeftCorner: {
    borderColor: 'grey',
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentBoxRightCorner: {
    flex: 1,
    height: '100%',
    borderLeftWidth: 1,
    borderColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButtonView: {
    paddingTop: 30,
  },
  postButton: {
    // backgroundColor: 'black',
    alignItems: 'center',
    height: 65,
    justifyContent: 'center',
    marginBottom: 50,
    borderRadius: 10,
  },
  postButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  shareNowButton:{
    alignSelf: 'flex-end',
    width: width/3,
    height: height/14,
    marginTop: '5%'
      },
  buttonWrapper: {
    width: '100%',
    height: '70%',
    borderRadius: 5,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 20,
    textAlign: 'center',
  },
  previousPost: {
    fontSize: 22,
    color: '#000',
    marginLeft: '2%',
    fontWeight: 'bold'
        },
});

export default NewSnap;
