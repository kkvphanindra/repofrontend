import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    Pressable,
    TextInput,
    View,
    ImageBackground,
    Dimensions,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { profileUpdate } from '../redux/auth/action';

const { width, height } = Dimensions.get('window');

const ProfileEdit = ({ navigation, route }) => {
    const { profileDetails } = route.params
    const [profileFilepath,
        setProfileFilepath] = useState({ data: '', uri: '' });
    const [profileFileData,
        setProfileFileData] = useState('');
    const [profileFileUri,
        setProfileFileUri] = useState('');
    const [coverFilepath,
        setCoverFilepath] = useState({ data: '', uri: '' });
    const [coverFileData,
        setCoverFileData] = useState('');
    const [coverFileUri,
        setCoverFileUri] = useState('');
    const [photo,
        setPhoto] = useState(null);
        const [res,setRes]=useState(profileDetails)
const dispatch=useDispatch()
    const launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response !== undefined) {
                // console.log('Response = ', response
                //     ?.assets[0]
                //         ?.uri);
                // const getImage = response
                //     ?.assets[0]
                //         ?.uri;
                // setProfileFileUri(getImage);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    console.log(response.customButton);
                } else {
                    const source = {
                        uri: response.uri
                    };
                    console.log('response.uri', response
                        ?.assets[0]
                        ?.uri);
                    setCoverFilepath(response);
                    setProfileFileData(response?.assets[0]);
                    setProfileFileUri(response?.assets[0]?.uri);
                    console.log("profile",response.assets[0])

                }

            }
        })
    }
    const launchCoverImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response !== undefined) {
                // console.log('Response = ', response
                //     ?.assets[0]
                //         ?.uri);
                // const getImage = response
                //     ?.assets[0]
                //         ?.uri;
                // setProfileFileUri(getImage);
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                    console.log(response.customButton);
                } else {
                    const source = {
                        uri: response.uri
                    };
                    console.log('cover response.uri', response
                        ?.assets[0]
                        ?.uri);
                    setCoverFilepath(response);
                    setCoverFileData(response?.assets[0]);
                    setCoverFileUri(response?.assets[0]?.uri);
                    console.log("cover",response?.assets[0])
                }

            }
        })
    }
    let interest = res.interest.map((i) => i)
    let interestText = "";
    interest.forEach(item => {
        interestText += item + " , "
    });
    interestText=interestText.slice(0,-2)
    let hobbies = res.hobbies.map((i) => i)
    let hobbiesText = "";
    hobbies.forEach(item => {
        hobbiesText += item + " , "
    });
    hobbiesText=hobbiesText.slice(0,-2)
    let links = res.links.map((i) => i)
    let linksText = "";
    links.forEach(item => {
        linksText += item + " , "
    });
    linksText=linksText.slice(0,-2)
    const handleChangeEdit = (name,inputValue) => {
        // setRes({...res, [name]: inputValue});
        console.log("lol",name,inputValue)
        // console.log(";pl",val)
      };
    //   console.log("res",res.bio)
    const onSubmit=()=>{
dispatch(profileUpdate(profileFileData,coverFileData))
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Pressable onPress={() => navigation.goBack(profileDetails.userId)} style={styles.iconWrapper}>
                        <Image style={styles.arrowIcon} source={require('../assets/images/left-arrow.png')} />
                    </Pressable>
                    <Text style={styles.title}>Profile Picture</Text>
                    <View style={styles.iconWrapper}></View>
                </View>
                <View style={styles.wrapper}>
                    <ImageBackground
                        source={require('../assets/images/home-profile.png')}
                        resizeMode="cover"
                        style={styles.profileImageContainer}>
                        <Image style={styles.pic} source={profileFileUri === '' ? require('../assets/images/contact-pic.png') : {
                            uri: profileFileUri
                        }} />
                        <Pressable onPress={launchImageLibrary} style={styles.editIcon}>
                            <Image source={require('../assets/images/edit-icon.png')} />
                        </Pressable>
                    </ImageBackground>
                </View>
                <View style={styles.mainWrapper}>
                    <Text style={styles.H1Title}>Cover Picture</Text>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.coverPic} source={coverFileUri === '' ? require('../assets/images/cover-pic.png') : {
                            uri: coverFileUri
                        }} />
                        <Pressable onPress={launchCoverImageLibrary} style={styles.coverEditIcon}>
                            <Image source={require('../assets/images/edit-icon.png')} />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.formFlex}>
                        <Text style={styles.H1Title}>Bio</Text>
                        <TextInput placeholder='Please fill in your BIO'
                            value={res.bio}
                            onChange={(e)=>{handleChangeEdit(e,'bio')}}
                            multiline numberOfLines={4} style={[styles.formField, { height: 200, textAlignVertical: 'top' }]} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.H1Title}>Edit Details</Text>
                        <Text style={styles.formLabel}>Work</Text>
                        <TextInput placeholder='Auto filled can be edited'
                            value={res.occupation}
                            onChange={(e)=>{handleChangeEdit(e,'occupation')}}
                            style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Study</Text>
                        <TextInput placeholder='Auto filled can be edited' 
                        value={res.studiedAt}
                        onChange={(e)=>{handleChangeEdit(e,'study')}}
                        style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Status</Text>
                        <TextInput placeholder='Auto filled can be edited'
                            value={res.status}
                            onChange={(e)=>{handleChangeEdit(e,'status')}}
                            style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>DOB</Text>
                        <TextInput placeholder='Auto filled can be edited'
                            value={res.dob}
                            onChange={(e)=>{handleChangeEdit(e,'dob')}}
                            style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Location</Text>
                        <TextInput placeholder='Auto filled can be edited'
                            value={res.location}
                            onChange={(e)=>{handleChangeEdit(e,'location')}}
                            style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Interests</Text>
                        <TextInput placeholder='Auto filled can be edited'
                            value={interestText}
                            onChange={(e)=>{handleChangeEdit(e,'interest')}}
                            style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Hobbies</Text>
                        <TextInput placeholder='Auto filled can be edited' 
                         value={hobbiesText}
                         onChange={(e)=>{handleChangeEdit(e,'hobbies')}}
                        style={styles.formField} />
                    </View>
                    <View style={styles.formFlex}>
                        <Text style={styles.formLabel}>Links</Text>
                        <TextInput placeholder='Auto filled can be edited' 
                        value={linksText}
                        onChange={(e)=>{handleChangeEdit(e,'links')}}
                        multiline numberOfLines={4} style={[styles.formField, { height: 100, textAlignVertical: 'top' }]} />
                    </View>
                </View>
                <Pressable
                    onPress={() => navigation.navigate('home')}
                    style={styles.buttonContainer}>
                    <LinearGradient style={styles.buttonWrapper} colors={['#5E6BFF', '#212FCC']}>
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
                    </LinearGradient>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flexDirection: 'column',
        alignItems: 'center',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    iconWrapper: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 'auto'
    },
    title: {
        fontFamily: 'Inter',
        fontSize: 22,
        fontWeight: '600',
        color: '#2C2C2C',
        lineHeight: 30,
        textAlign: 'center',
        marginRight: 'auto'
    },
    profileImageContainer: {
        width: 180,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    pic: {
        width: 92,
        height: 92,
        borderRadius: 50
    },
    editIcon: {
        width: 42,
        height: 42,
        borderRadius: 50,
        position: 'absolute',
        right: 30,
        bottom: 40
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 20
    },
    mainWrapper: {
        flexDirection: 'column',
        width: '80%',
    },
    H1Title: {
        fontFamily: 'Inter',
        fontSize: 22,
        fontWeight: '600',
        color: '#2C2C2C',
        lineHeight: 30,
        paddingBottom: 20
    },
    imageWrapper: {
        height: 166,
        position: 'relative',
        borderRadius: 12,
        marginVertical: 20
    },
    coverPic: {
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    coverEditIcon: {
        width: 42,
        height: 42,
        borderRadius: 50,
        position: 'absolute',
        right: 10,
        bottom: 10
    },
    formContainer: {
        flexDirection: 'column',
        marginTop: 10,
        width: '80%'
    },
    formFlex: {
        width: '100%',
        marginVertical: 10
    },
    formLabel: {
        fontFamily: 'Inter',
        fontSize: 15,
        fontWeight: '400',
        color: '#2C2948',
        lineHeight: 25,
        paddingBottom: 10
    },
    formField: {
        fontFamily: 'Inter',
        width: '100%',
        fontSize: 15,
        fontWeight: '400',
        color: '#2C2C2C',
        lineHeight: 25,
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        height: 50,
        paddingHorizontal: 20,
        marginVertical: 10
    },
    buttonContainer: {
        width: '80%',
        height: 60,
        marginTop: 'auto',
        marginBottom: 40
    },
    buttonWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Inter',
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
        lineHeight: 20,
        textAlign: 'center'
    }
})

export default ProfileEdit;